import type { HomeAssistant } from 'custom-card-helpers';
import type { WeatherForecast } from '@/types';
import { DateTime } from 'luxon';

type ForecastCallback = (forecasts: WeatherForecast[]) => void;

class ForecastService {
  /**
   * Subscribe to weather forecast updates with multi-level resilient fallbacks.
   * Supports:
   * 1. WebSocket `weather/subscribe_forecast` (Home Assistant 2023.9+)
   * 2. `forecast_type: 'daily'` with fallback to `twice_daily`
   * 3. WebSocket `weather/get_forecasts` query
   * 4. Legacy `entity.attributes.forecast` attribute inspection
   * 5. Hourly-to-Daily automatic synthesis if daily forecast is not provided by integration
   */
  public async subscribeForecasts(
    hass: HomeAssistant,
    entityId: string,
    onHourlyUpdate: ForecastCallback,
    onDailyUpdate: ForecastCallback
  ): Promise<() => void> {
    if (!hass || !entityId) return () => {};

    const entity = hass.states[entityId];
    if (!entity) return () => {};

    const unsubs: Array<() => void> = [];
    let isDisposed = false;
    let hasReceivedDaily = false;
    let latestHourly: WeatherForecast[] = [];

    const handleHourly = (forecasts: WeatherForecast[]) => {
      if (isDisposed || !Array.isArray(forecasts)) return;
      latestHourly = forecasts;
      onHourlyUpdate(forecasts);

      // If daily forecast has not arrived yet, synthesize daily forecast from hourly data as self-healing fallback
      if (!hasReceivedDaily && latestHourly.length >= 8) {
        const synthDaily = this.synthesizeDailyFromHourly(latestHourly);
        if (synthDaily.length > 0) {
          onDailyUpdate(synthDaily);
        }
      }
    };

    const handleDaily = (forecasts: WeatherForecast[]) => {
      if (isDisposed || !Array.isArray(forecasts) || forecasts.length === 0) return;
      hasReceivedDaily = true;
      onDailyUpdate(forecasts);
    };

    // 1. Subscribe to Hourly Forecast
    try {
      if (hass.connection && typeof hass.connection.subscribeMessage === 'function') {
        const unsub = await hass.connection.subscribeMessage(
          (event: any) => {
            if (event?.forecast) {
              handleHourly(event.forecast);
            }
          },
          {
            type: 'weather/subscribe_forecast',
            forecast_type: 'hourly',
            entity_id: entityId,
          }
        );
        if (isDisposed) {
          try { unsub(); } catch {}
        } else {
          unsubs.push(unsub);
        }
      }
    } catch {
      this.fetchForecastFallback(hass, entityId, 'hourly', handleHourly);
    }

    // 2. Subscribe to Daily Forecast (with automatic fallback to twice_daily)
    try {
      if (hass.connection && typeof hass.connection.subscribeMessage === 'function') {
        const unsub = await hass.connection.subscribeMessage(
          (event: any) => {
            if (event?.forecast && Array.isArray(event.forecast) && event.forecast.length > 0) {
              handleDaily(event.forecast);
            }
          },
          {
            type: 'weather/subscribe_forecast',
            forecast_type: 'daily',
            entity_id: entityId,
          }
        );
        if (isDisposed) {
          try { unsub(); } catch {}
        } else {
          unsubs.push(unsub);
        }
      }
    } catch {
      // If 'daily' subscription is unsupported by entity, attempt 'twice_daily' subscription
      try {
        if (hass.connection && typeof hass.connection.subscribeMessage === 'function') {
          const unsubTwice = await hass.connection.subscribeMessage(
            (event: any) => {
              if (event?.forecast && Array.isArray(event.forecast)) {
                handleDaily(this.convertTwiceDailyToDaily(event.forecast));
              }
            },
            {
              type: 'weather/subscribe_forecast',
              forecast_type: 'twice_daily',
              entity_id: entityId,
            }
          );
          if (isDisposed) {
            try { unsubTwice(); } catch {}
          } else {
            unsubs.push(unsubTwice);
          }
        }
      } catch {
        this.fetchForecastFallback(hass, entityId, 'daily', handleDaily);
      }
    }

    // 3. Check legacy entity attributes only if daily forecast has not arrived yet
    if (!hasReceivedDaily && entity.attributes?.forecast && Array.isArray(entity.attributes.forecast) && entity.attributes.forecast.length > 0) {
      handleDaily(entity.attributes.forecast);
    }

    // 4. One-time fallback query via weather/get_forecasts if still not loaded
    setTimeout(() => {
      if (!isDisposed && !hasReceivedDaily) {
        this.fetchForecastFallback(hass, entityId, 'daily', (f) => {
          if (isDisposed || hasReceivedDaily) return;
          if (f.length > 0) handleDaily(f);
          else {
            // Try twice_daily query
            this.fetchForecastFallback(hass, entityId, 'twice_daily', (tf) => {
              if (isDisposed || hasReceivedDaily) return;
              if (tf.length > 0) handleDaily(this.convertTwiceDailyToDaily(tf));
            });
          }
        });
      }
    }, 1500);

    return () => {
      isDisposed = true;
      for (const unsub of unsubs) {
        try { unsub(); } catch {}
      }
    };
  }

  private async fetchForecastFallback(
    hass: HomeAssistant,
    entityId: string,
    forecastType: 'hourly' | 'daily' | 'twice_daily',
    callback: ForecastCallback
  ) {
    try {
      const response = await hass.callWS<Record<string, { forecast: WeatherForecast[] }>>({
        type: 'weather/get_forecasts',
        entity_ids: [entityId],
        forecast_type: forecastType,
      });
      if (response && response[entityId]?.forecast) {
        callback(response[entityId].forecast);
      }
    } catch {
      // Check legacy attribute as last resort
      const entity = hass.states[entityId];
      if (entity?.attributes?.forecast && Array.isArray(entity.attributes.forecast)) {
        callback(entity.attributes.forecast);
      }
    }
  }

  /**
   * Converts Home Assistant twice_daily forecast items (day/night pairs) into consolidated daily forecast items.
   */
  public convertTwiceDailyToDaily(forecasts: any[]): WeatherForecast[] {
    const dailyMap = new Map<string, any>();

    for (const item of forecasts) {
      if (!item.datetime) continue;
      const dateKey = DateTime.fromISO(item.datetime).toISODate() || item.datetime.split('T')[0];
      const existing = dailyMap.get(dateKey);

      if (!existing) {
        dailyMap.set(dateKey, {
          datetime: item.datetime,
          condition: item.condition,
          temperature: item.temperature,
          templow: item.templow ?? item.temperature,
          precipitation: item.precipitation ?? 0,
          precipitation_probability: item.precipitation_probability ?? 0,
          wind_speed: item.wind_speed,
        });
      } else {
        if (typeof item.temperature === 'number') {
          existing.temperature = Math.max(existing.temperature, item.temperature);
        }
        if (typeof item.templow === 'number') {
          existing.templow = Math.min(existing.templow, item.templow);
        } else if (typeof item.temperature === 'number') {
          existing.templow = Math.min(existing.templow, item.temperature);
        }
        if (item.is_daytime && item.condition) {
          existing.condition = item.condition;
        }
      }
    }

    return Array.from(dailyMap.values());
  }

  /**
   * Synthesize daily forecasts from hourly data if the underlying weather integration
   * only exposes hourly forecasts. Groups hours by day and derives High, Low, and primary condition.
   */
  public synthesizeDailyFromHourly(hourly: WeatherForecast[]): WeatherForecast[] {
    const dayGroups = new Map<string, WeatherForecast[]>();

    for (const h of hourly) {
      if (!h.datetime) continue;
      const dayKey = DateTime.fromISO(h.datetime).toISODate() || h.datetime.split('T')[0];
      const list = dayGroups.get(dayKey) || [];
      list.push(h);
      dayGroups.set(dayKey, list);
    }

    const syntheticDaily: WeatherForecast[] = [];

    for (const [dayKey, hours] of dayGroups.entries()) {
      if (hours.length === 0) continue;
      const temps = hours.map(h => h.temperature).filter((t): t is number => typeof t === 'number');
      const highs = temps.length > 0 ? Math.max(...temps) : 20;
      const lows = temps.length > 0 ? Math.min(...temps) : highs - 5;

      // Pick midday condition or first daytime condition
      const midday = hours.find(h => {
        const hour = DateTime.fromISO(h.datetime).hour;
        return hour >= 11 && hour <= 15;
      }) || hours[0];

      const maxPrecipProb = Math.max(...hours.map(h => h.precipitation_probability || 0));
      const totalPrecip = hours.reduce((sum, h) => sum + (h.precipitation || 0), 0);

      syntheticDaily.push({
        datetime: hours[0].datetime,
        condition: midday.condition,
        temperature: highs,
        templow: lows,
        precipitation: Math.round(totalPrecip * 10) / 10,
        precipitation_probability: maxPrecipProb,
        wind_speed: midday.wind_speed,
      });
    }

    return syntheticDaily;
  }
}

export default new ForecastService();
