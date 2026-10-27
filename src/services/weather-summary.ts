import type { WeatherForecast } from '@/types';
import { DateTime } from 'luxon';
import translationService from '@/services/translation-service';

export function generateWeatherSummary(
  hourly: WeatherForecast[],
  daily: WeatherForecast[],
  currentCondition: string,
  currentTemp: number | null,
  locale: string = 'en',
  windUnit: string = 'km/h'
): { conditionNote: string; highlightsTitle: string; highlightsText: string } {
  const t = translationService.get(locale);

  // 1. Check for upcoming precipitation in the next 12 hours
  const upcomingRain = hourly.slice(0, 12).find(h => {
    const pop = h.precipitation_probability ?? 0;
    const precip = h.precipitation ?? 0;
    const cond = (h.condition || '').toLowerCase();
    return pop >= 30 || precip > 0.2 || cond.includes('rain') || cond.includes('pouring');
  });

  let conditionNote = '';
  if (upcomingRain) {
    const dt = DateTime.fromISO(upcomingRain.datetime).setLocale(locale);
    const is24 = locale === 'tr' || locale === 'de' || locale === 'fr';
    const hourLabel = dt.isValid ? (is24 ? dt.toFormat('HH:mm') : dt.toFormat('h a')) : 'soon';
    conditionNote = t.summaries.rain_expected(hourLabel);
  } else if (currentCondition.toLowerCase().includes('cloud')) {
    conditionNote = t.summaries.cloudy_evening;
  } else if (currentCondition.toLowerCase().includes('rain')) {
    conditionNote = t.summaries.showers_taper;
  } else {
    conditionNote = t.summaries.clear_comfortable;
  }

  // 2. Highlights generation (temperature / wind / rain alerts)
  let highlightsTitle = t.highlights;
  let highlightsText = t.summaries.temp_steady;

  // Check wind gusts
  const highWind = hourly.slice(0, 24).find(h => (h.wind_gust_speed ?? h.wind_speed ?? 0) > 28);
  if (highWind) {
    const gustVal = Math.round(highWind.wind_gust_speed ?? highWind.wind_speed ?? 0);
    highlightsText = t.summaries.wind_gusts(gustVal, windUnit);
  } else if (daily.length >= 4) {
    // Check if temperatures are rising or falling
    const temps = daily.slice(0, 4).map(d => d.temperature).filter((temp): temp is number => typeof temp === 'number');
    if (temps.length >= 3) {
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      if (currentTemp !== null && avgTemp > currentTemp + 2) {
        highlightsText = t.summaries.temp_above_normal;
      } else if (currentTemp !== null && avgTemp < currentTemp - 2) {
        highlightsText = t.summaries.temp_cooler;
      } else {
        highlightsText = t.summaries.temp_steady;
      }
    }
  }

  return {
    conditionNote,
    highlightsTitle,
    highlightsText,
  };
}
