import type { HomeAssistant } from 'custom-card-helpers';
import type { WeatherForecast } from '@/types';

type ForecastCallback = (forecasts: WeatherForecast[]) => void;

class ForecastService {
  private hourlyUnsubscribe: (() => void) | null = null;
  private dailyUnsubscribe: (() => void) | null = null;
  private currentEntityId: string | null = null;

  public async subscribeForecasts(
    hass: HomeAssistant,
    entityId: string,
    onHourlyUpdate: ForecastCallback,
    onDailyUpdate: ForecastCallback
  ): Promise<() => void> {
    this.unsubscribeAll();
    this.currentEntityId = entityId;

    // Check if weather entity exists
    const entity = hass.states[entityId];
    if (!entity) return () => {};

    // 1. Subscribe to Hourly Forecast
    try {
      if (hass.connection && typeof hass.connection.subscribeMessage === 'function') {
        const unsubHourly = await hass.connection.subscribeMessage(
          (event: any) => {
            if (event?.forecast) {
              onHourlyUpdate(event.forecast);
            }
          },
          {
            type: 'weather/subscribe_forecast',
            forecast_type: 'hourly',
            entity_id: entityId,
          }
        );
        this.hourlyUnsubscribe = unsubHourly;
      }
    } catch (e) {
      // Fallback for older Home Assistant versions
      this.fetchForecastFallback(hass, entityId, 'hourly', onHourlyUpdate);
    }

    // 2. Subscribe to Daily Forecast
    try {
      if (hass.connection && typeof hass.connection.subscribeMessage === 'function') {
        const unsubDaily = await hass.connection.subscribeMessage(
          (event: any) => {
            if (event?.forecast) {
              onDailyUpdate(event.forecast);
            }
          },
          {
            type: 'weather/subscribe_forecast',
            forecast_type: 'daily',
            entity_id: entityId,
          }
        );
        this.dailyUnsubscribe = unsubDaily;
      }
    } catch (e) {
      // Fallback
      this.fetchForecastFallback(hass, entityId, 'daily', onDailyUpdate);
    }

    // If forecasts are in attributes (legacy HA weather entities)
    if (entity.attributes?.forecast && Array.isArray(entity.attributes.forecast)) {
      onDailyUpdate(entity.attributes.forecast);
    }

    return () => this.unsubscribeAll();
  }

  private async fetchForecastFallback(
    hass: HomeAssistant,
    entityId: string,
    forecastType: 'hourly' | 'daily',
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
      // If service fails, check attributes
      const entity = hass.states[entityId];
      if (entity?.attributes?.forecast) {
        callback(entity.attributes.forecast);
      }
    }
  }

  public unsubscribeAll() {
    if (this.hourlyUnsubscribe) {
      try {
        this.hourlyUnsubscribe();
      } catch {}
      this.hourlyUnsubscribe = null;
    }
    if (this.dailyUnsubscribe) {
      try {
        this.dailyUnsubscribe();
      } catch {}
      this.dailyUnsubscribe = null;
    }
  }
}

export default new ForecastService();
