import type { HomeAssistant } from 'custom-card-helpers';
import type { WeatherForecast } from '@/types';
import translationService from '@/services/translation-service';

class HassService {
  public isNight(hass: HomeAssistant, sunEntityId?: string): boolean {
    const sunId = sunEntityId || 'sun.sun';
    const sun = hass.states[sunId];
    if (sun) {
      return sun.state === 'below_horizon';
    }
    const hour = new Date().getHours();
    return hour < 6 || hour >= 20;
  }

  public getSunTimes(hass: HomeAssistant, sunEntityId?: string): { nextRising?: string; nextSetting?: string } {
    const sunId = sunEntityId || 'sun.sun';
    const sun = hass.states[sunId];
    if (!sun || !sun.attributes) return {};
    return {
      nextRising: sun.attributes.next_rising,
      nextSetting: sun.attributes.next_setting,
    };
  }

  public getFriendlyCondition(condition: string, locale?: string): string {
    return translationService.translateCondition(condition, locale);
  }

  public getTemperatureUnit(hass: HomeAssistant, entityState?: any): string {
    if (entityState?.attributes?.temperature_unit) {
      return entityState.attributes.temperature_unit;
    }
    return (hass?.config?.unit_system?.temperature as string) || '°C';
  }

  public getWindSpeedUnit(hass: HomeAssistant, entityState?: any): string {
    if (entityState?.attributes?.wind_speed_unit) {
      return entityState.attributes.wind_speed_unit;
    }
    const isImperial = hass?.config?.unit_system?.length === 'mi';
    return isImperial ? 'mph' : 'km/h';
  }

  public getPrecipitationUnit(hass: HomeAssistant, entityState?: any): string {
    if (entityState?.attributes?.precipitation_unit) {
      return entityState.attributes.precipitation_unit;
    }
    const isImperial = hass?.config?.unit_system?.length === 'mi';
    return isImperial ? 'in' : 'mm';
  }

  public formatTemperature(temp: number | undefined | null, round: boolean = true): string {
    if (temp === undefined || temp === null || isNaN(temp)) return '--';
    return round ? `${Math.round(temp)}°` : `${temp.toFixed(1)}°`;
  }
}

export default new HassService();
