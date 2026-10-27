import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ActiveViewMode, WeatherForecast } from '@/types';
import translationService from '@/services/translation-service';
import '@/components/ios27-hourly-strip';
import '@/components/ios27-daily-list';

@customElement('ios27-forecast-card')
export class Ios27ForecastCard extends LitElement {
  @property() public activeMode: ActiveViewMode = 'condition';
  @property({ type: Array }) public hourlyForecasts: WeatherForecast[] = [];
  @property({ type: Array }) public dailyForecasts: WeatherForecast[] = [];
  @property({ type: Number }) public currentTemp: number | null = null;
  @property() public currentCondition: string = 'sunny';
  @property({ type: Boolean }) public isNight: boolean = false;
  @property({ type: Object }) public sunTimes?: { nextRising?: string; nextSetting?: string };
  @property() public windUnit: string = 'km/h';
  @property() public precipUnit: string = 'mm';
  @property() public timeFormat: '12' | '24' | 'auto' = 'auto';
  @property() public locale: string = 'en';
  @property({ type: Number }) public hourlyCount: number = 24;

  protected createRenderRoot() {
    return this;
  }

  public render(): TemplateResult {
    const t = translationService.get(this.locale);
    let title = t.hourly_forecast;
    let subtitle = t.overview_24h;

    if (this.activeMode === 'precipitation') {
      title = t.precipitation;
      subtitle = t.rain_subtitle;
    } else if (this.activeMode === 'wind') {
      title = t.wind;
      subtitle = `${t.wind_subtitle} (${this.windUnit})`;
    }

    return html`
      <div class="ios-glass-card">
        <!-- Header with Interactive Segmented Switcher -->
        <div class="ios-forecast-card-header">
          <div class="ios-forecast-meta">
            <span class="ios-forecast-title">${title}</span>
            <span class="ios-forecast-subtitle">${subtitle}</span>
          </div>

          <!-- 3-Segment Switcher (Cloud / Rain / Wind) -->
          <div class="ios-segmented-control" role="tablist">
            <!-- Cloud / Conditions Button -->
            <button
              class="ios-segment-button ${this.activeMode === 'condition' ? 'active' : ''}"
              title="Weather Conditions & Temperature"
              role="tab"
              aria-selected="${this.activeMode === 'condition'}"
              @click=${() => this.setMode('condition')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
            </button>

            <!-- Rain / Precipitation Button -->
            <button
              class="ios-segment-button ${this.activeMode === 'precipitation' ? 'active' : ''}"
              title="Precipitation Intensity & Rain Chance"
              role="tab"
              aria-selected="${this.activeMode === 'precipitation'}"
              @click=${() => this.setMode('precipitation')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </button>

            <!-- Wind Button -->
            <button
              class="ios-segment-button ${this.activeMode === 'wind' ? 'active' : ''}"
              title="Wind Speed & Wave"
              role="tab"
              aria-selected="${this.activeMode === 'wind'}"
              @click=${() => this.setMode('wind')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M14.5 17c0 1.66-1.34 3-3 3s-3-1.34-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.66 0 3 1.34 3 3zm4.5-6c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h14c1.66 0 3-1.34 3-3zm-1-6c-.55 0-1 .45-1 1h-2c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3H2v-2h15c.55 0 1-.45 1-1z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="ios-divider"></div>

        <!-- Hourly Strip -->
        <ios27-hourly-strip
          .mode=${this.activeMode}
          .forecasts=${this.hourlyForecasts}
          .hourlyCount=${this.hourlyCount}
          .currentTemp=${this.currentTemp}
          .currentCondition=${this.currentCondition}
          .isNight=${this.isNight}
          .sunTimes=${this.sunTimes}
          .windUnit=${this.windUnit}
          .precipUnit=${this.precipUnit}
          .timeFormat=${this.timeFormat}
          .locale=${this.locale}
        ></ios27-hourly-strip>

        <div class="ios-divider"></div>

        <!-- 10-Day Forecast Section Header -->
        <div style="font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
          </svg>
          <span>${t.ten_day_forecast}</span>
        </div>

        <!-- 10-Day Daily List -->
        <ios27-daily-list
          .mode=${this.activeMode}
          .forecasts=${this.dailyForecasts}
          .hourlyForecasts=${this.hourlyForecasts}
          .currentTemp=${this.currentTemp}
          .currentCondition=${this.currentCondition}
          .windUnit=${this.windUnit}
          .precipUnit=${this.precipUnit}
          .locale=${this.locale}
        ></ios27-daily-list>
      </div>
    `;
  }

  private setMode(mode: ActiveViewMode) {
    this.activeMode = mode;
    this.dispatchEvent(new CustomEvent('mode-changed', {
      detail: { mode },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }
}
