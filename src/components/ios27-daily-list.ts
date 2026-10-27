import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DateTime } from 'luxon';
import type { ActiveViewMode, WeatherForecast } from '@/types';
import hassService from '@/services/hass-service';
import translationService from '@/services/translation-service';
import '@/components/ios27-weather-icon';

@customElement('ios27-daily-list')
export class Ios27DailyList extends LitElement {
  @property() public mode: ActiveViewMode = 'condition';
  @property({ type: Array }) public forecasts: WeatherForecast[] = [];
  @property({ type: Array }) public hourlyForecasts: WeatherForecast[] = [];
  @property({ type: Number }) public currentTemp: number | null = null;
  @property() public currentCondition: string = 'sunny';
  @property() public windUnit: string = 'km/h';
  @property() public precipUnit: string = 'mm';
  @property() public locale: string = 'en';

  protected createRenderRoot() {
    return this;
  }

  public render(): TemplateResult {
    const list = this.prepareDailyList();
    if (list.length === 0) {
      return html`<div style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 10px;">Loading 10-day forecast...</div>`;
    }

    return html`
      <div class="ios-daily-list">
        ${list.map(dayItem => this.renderDayRow(dayItem, list))}
      </div>
    `;
  }

  private prepareDailyList(): Array<{
    dayLabel: string;
    forecast: WeatherForecast;
    isToday: boolean;
    low: number;
    high: number;
  }> {
    if (!this.forecasts || this.forecasts.length === 0) return [];

    const t = translationService.get(this.locale);
    const now = DateTime.now().setLocale(this.locale);

    return this.forecasts.slice(0, 10).map((f, i) => {
      const dt = DateTime.fromISO(f.datetime).setLocale(this.locale);
      const isToday = i === 0 || (dt.isValid && dt.hasSame(now, 'day'));
      const dayLabel = isToday ? t.today : dt.isValid ? dt.toFormat('ccc') : `Day ${i + 1}`;

      const high = f.temperature ?? (f.templow ? f.templow + 5 : 20);
      const low = f.templow ?? (f.temperature ? f.temperature - 5 : 12);

      return {
        dayLabel,
        forecast: f,
        isToday,
        low: Math.min(low, high),
        high: Math.max(low, high),
      };
    });
  }

  private renderDayRow(
    dayItem: { dayLabel: string; forecast: WeatherForecast; isToday: boolean; low: number; high: number },
    allDays: any[]
  ): TemplateResult {
    const { dayLabel, forecast, isToday, low, high } = dayItem;

    if (this.mode === 'precipitation') {
      return html`
        <div class="ios-daily-row ios-daily-row--precip">
          <span class="ios-day-label">${dayLabel}</span>
          ${this.renderPrecipitationRow(forecast, isToday)}
        </div>
      `;
    }

    if (this.mode === 'wind') {
      return html`
        <div class="ios-daily-row ios-daily-row--wind">
          <span class="ios-day-label">${dayLabel}</span>
          ${this.renderWindRow(forecast)}
        </div>
      `;
    }

    return html`
      <div class="ios-daily-row">
        <!-- Day Name -->
        <span class="ios-day-label">${dayLabel}</span>

        <!-- Condition Icon -->
        <div class="ios-daily-icon">
          <ios27-weather-icon
            .condition=${forecast.condition || this.currentCondition}
            .isNight=${false}
            .size=${24}
          ></ios27-weather-icon>
        </div>

        <!-- Temperature Bar -->
        ${this.renderConditionRow(low, high, isToday, allDays)}
      </div>
    `;
  }

  /* Mode 1: Temperature Bar (Apple Weather iOS Gradient) */
  private renderConditionRow(low: number, high: number, isToday: boolean, allDays: any[]): TemplateResult {
    const globalMin = Math.min(...allDays.map(d => d.low));
    const globalMax = Math.max(...allDays.map(d => d.high));
    const range = Math.max(globalMax - globalMin, 1);

    const leftPercent = Math.max(0, Math.min(100, ((low - globalMin) / range) * 100));
    const widthPercent = Math.max(8, Math.min(100 - leftPercent, ((high - low) / range) * 100));

    let currentIndicatorPercent = 0;
    if (isToday && this.currentTemp !== null) {
      currentIndicatorPercent = Math.max(0, Math.min(100, ((this.currentTemp - globalMin) / range) * 100));
    }

    return html`
      <div class="ios-daily-temp-bar-container">
        <span class="ios-temp-low">${hassService.formatTemperature(low)}</span>

        <div class="ios-temp-bar-track">
          <div
            class="ios-temp-bar-fill"
            style="left: ${leftPercent}%; width: ${widthPercent}%;"
          ></div>
          ${isToday && this.currentTemp !== null ? html`
            <div
              class="ios-temp-current-indicator"
              style="left: ${currentIndicatorPercent}%;"
            ></div>
          ` : ''}
        </div>

        <span class="ios-temp-high">${hassService.formatTemperature(high)}</span>
      </div>
    `;
  }

  /* Mode 2: Precipitation Timeline / Rain Bar & Prob (24 Hours) */
  private renderPrecipitationRow(forecast: WeatherForecast, isToday: boolean = false): TemplateResult {
    const t = translationService.get(this.locale);
    const rawPop = forecast.precipitation_probability;
    const precip = forecast.precipitation ?? 0;

    let pop = 0;
    if (rawPop !== undefined && rawPop !== null && rawPop > 0) {
      pop = Math.round(rawPop);
    } else if (precip > 0) {
      if (precip >= 15) pop = 100;
      else if (precip >= 10) pop = 95;
      else if (precip >= 5) pop = 90;
      else if (precip >= 2) pop = 85;
      else if (precip >= 1) pop = 75;
      else if (precip >= 0.5) pop = 65;
      else pop = 50;
    } else {
      const cond = (forecast.condition || '').toLowerCase();
      if (cond.includes('rain') || cond.includes('pouring') || cond.includes('storm')) {
        pop = 70;
      }
    }

    const hasRain = pop > 0 || precip > 0;

    // 24 Hourly Ticks for the full day
    const ticks = this.getHourlyFillsForDay(forecast, isToday, precip, pop);

    // Rainfall amount format (e.g. 3 mm, 15 mm, 2.7 mm, or .35")
    let formattedAmount = '--';
    if (precip > 0) {
      if (this.precipUnit === 'in') {
        formattedAmount = `.${Math.round(precip * 100)}"`;
      } else {
        const rounded = Math.round(precip);
        formattedAmount = `${Math.abs(precip - rounded) < 0.05 ? rounded : precip.toFixed(1)} ${this.precipUnit}`;
      }
    } else {
      formattedAmount = this.precipUnit === 'in' ? '.0"' : `0 ${this.precipUnit}`;
    }

    const formattedPercent = t.format_percent ? t.format_percent(pop) : `${pop}%`;

    return html`
      <div class="ios-daily-rain-container">
        <!-- 24-Hour Segmented Rain Timeline -->
        <div class="ios-daily-rain-gauge">
          ${ticks.map(tick => html`
            <div class="ios-daily-rain-tick ${tick.isCurrent ? 'current-hour' : ''}">
              ${tick.fillPct > 0 ? html`
                <div class="ios-daily-rain-fill" style="height: ${tick.fillPct}%;"></div>
              ` : ''}
            </div>
          `)}
        </div>

        <!-- Precipitation Amount (e.g. 3 mm) -->
        <span class="ios-rain-amount">${formattedAmount}</span>

        <!-- Probability (e.g. 💧 %60) -->
        <span class="ios-rain-prob ${hasRain ? 'has-rain' : ''}">
          ${hasRain ? html`
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          ` : ''}
          ${formattedPercent}
        </span>
      </div>
    `;
  }

  /* Compute 24 hourly fill levels (0-100%) for a given day */
  private getHourlyFillsForDay(
    forecast: WeatherForecast,
    isToday: boolean,
    precip: number,
    pop: number
  ): Array<{ fillPct: number; isCurrent: boolean }> {
    const currentHour = new Date().getHours();
    const dt = DateTime.fromISO(forecast.datetime);
    const dayStr = dt.isValid ? dt.toISODate() : null;

    // Check if we have matching hourly forecasts for this day
    const hourMap = new Map<number, WeatherForecast>();
    if (this.hourlyForecasts && this.hourlyForecasts.length > 0 && dayStr) {
      for (const hf of this.hourlyForecasts) {
        const hdt = DateTime.fromISO(hf.datetime);
        if (hdt.isValid && hdt.toISODate() === dayStr) {
          hourMap.set(hdt.hour, hf);
        }
      }
    }

    const ticks: Array<{ fillPct: number; isCurrent: boolean }> = [];

    // If day is completely dry (0 mm and 0% pop)
    if (precip === 0 && pop === 0) {
      for (let h = 0; h < 24; h++) {
        ticks.push({ fillPct: 0, isCurrent: isToday && h === currentHour });
      }
      return ticks;
    }

    // Prepare synthetic distribution parameters for realistic rain periods
    const dayNum = dt.isValid ? dt.day : 1;
    // Disperse rain peaks across different times of day (morning, afternoon, evening)
    const peakHour = (dayNum % 3 === 0) ? 14 : (dayNum % 3 === 1) ? 8 : 17;
    const spread = precip >= 15 ? 8 : precip >= 10 ? 6 : precip >= 5 ? 4 : precip >= 2 ? 3 : 2;

    for (let h = 0; h < 24; h++) {
      const isCurrent = isToday && h === currentHour;
      let fillPct = 0;

      if (hourMap.has(h)) {
        // Use real hourly data from integration
        const hf = hourMap.get(h)!;
        const hPop = hf.precipitation_probability ?? 0;
        const hPrecip = hf.precipitation ?? 0;

        if (hPrecip >= 2.0 || hPop >= 85) fillPct = 100;
        else if (hPrecip >= 1.0 || hPop >= 65) fillPct = 75;
        else if (hPrecip >= 0.3 || hPop >= 40) fillPct = 50;
        else if (hPrecip > 0 || hPop > 0) fillPct = 25;
      } else {
        // Realistic Gaussian/diurnal distribution for hours without explicit hourly data
        const dist = Math.abs(h - peakHour);
        if (dist <= spread) {
          const factor = Math.cos((dist / (spread + 0.5)) * (Math.PI / 2));
          if (precip >= 15) {
            fillPct = Math.round(55 + 45 * factor);
          } else if (precip >= 10) {
            fillPct = Math.round(45 + 50 * factor);
          } else if (precip >= 5) {
            fillPct = Math.round(35 + 45 * factor);
          } else if (precip >= 2) {
            fillPct = Math.round(25 + 40 * factor);
          } else {
            fillPct = Math.round(20 + 25 * factor);
          }
        }
      }

      ticks.push({
        fillPct: Math.max(0, Math.min(100, fillPct)),
        isCurrent,
      });
    }

    return ticks;
  }

  /* Mode 3: Wind Curve & Speed Range */
  private renderWindRow(forecast: WeatherForecast): TemplateResult {
    const avgSpeed = Math.round(forecast.wind_speed ?? 5);
    const gustSpeed = Math.round(forecast.wind_gust_speed ?? (avgSpeed + Math.max(3, Math.round(avgSpeed * 0.4))));
    const minRange = Math.max(1, Math.round(avgSpeed * 0.6));
    const maxRange = Math.max(gustSpeed, avgSpeed);

    return html`
      <div class="ios-daily-wind-container">
        <!-- Mini Wind Curve -->
        <div class="ios-daily-wind-wave">
          <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M 0 12 Q 30 4, 60 11 T 100 9"
              fill="none"
              stroke="#22d3ee"
              stroke-width="2.5"
              stroke-linecap="round"
              opacity="0.85"
            />
            <circle cx="60" cy="11" r="3.5" fill="#ffffff" stroke="#0891b2" stroke-width="1.5" />
          </svg>
        </div>

        <!-- Speed Range -->
        <span class="ios-daily-wind-range">
          ${minRange} - ${maxRange} ${this.windUnit}
        </span>
      </div>
    `;
  }
}
