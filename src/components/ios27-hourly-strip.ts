import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DateTime } from 'luxon';
import type { ActiveViewMode, WeatherForecast } from '@/types';
import hassService from '@/services/hass-service';
import translationService from '@/services/translation-service';
import '@/components/ios27-weather-icon';

interface HourlyStripItem {
  label: string;
  forecast: WeatherForecast;
  isCurrent: boolean;
  isNight: boolean;
  isSunEvent?: boolean;
  sunType?: 'sunset' | 'sunrise';
  sunTitle?: string;
  epoch: number;
}

@customElement('ios27-hourly-strip')
export class Ios27HourlyStrip extends LitElement {
  @property() public mode: ActiveViewMode = 'condition';
  @property({ type: Array }) public forecasts: WeatherForecast[] = [];
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

  protected updated() {
    const strips = this.querySelectorAll<HTMLElement>('.ios-hourly-strip');
    strips.forEach(strip => this._attachScrollListeners(strip));
  }

  private _attachScrollListeners(el: HTMLElement) {
    if ((el as any)._hasDragScroll) return;
    (el as any)._hasDragScroll = true;

    // 1. Mouse Drag Scrolling (Left Click & Drag)
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = 'grab';
      el.style.removeProperty('user-select');
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 2. Middle Mouse Wheel Scrolling (Vertical mouse wheel -> Smooth Horizontal scroll)
    el.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
        if (delta === 0) return;

        let distance = delta;
        if (e.deltaMode === 1) {
          // Line mode (Windows standard mouse wheel step)
          distance *= 35;
        } else if (e.deltaMode === 2) {
          // Page mode
          distance *= 300;
        }

        // Prevent vertical card scrolling while cursor is hovering over the hourly strip
        e.preventDefault();
        e.stopPropagation();

        el.scrollLeft += distance;
      },
      { passive: false }
    );
  }

  public render(): TemplateResult {
    const list = this.prepareHourlyList();
    if (list.length === 0) {
      return html`<div class="ios-hourly-strip" style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 10px;">Loading hourly forecast...</div>`;
    }

    if (this.mode === 'precipitation') {
      return this.renderPrecipitationStrip(list);
    }
    if (this.mode === 'wind') {
      return this.renderWindStrip(list);
    }
    return this.renderConditionStrip(list);
  }

  private prepareHourlyList(): HourlyStripItem[] {
    if (!this.forecasts || this.forecasts.length === 0) return [];

    const t = translationService.get(this.locale);
    const now = DateTime.now().setLocale(this.locale);
    const result: HourlyStripItem[] = [];

    // 1. First item: "Now" / "Şu An"
    result.push({
      label: t.now,
      forecast: {
        datetime: now.toISO() || '',
        condition: this.currentCondition,
        temperature: this.currentTemp ?? this.forecasts[0]?.temperature,
        precipitation: this.forecasts[0]?.precipitation ?? 0,
        precipitation_probability: this.forecasts[0]?.precipitation_probability ?? 0,
        wind_speed: this.forecasts[0]?.wind_speed ?? 0,
        wind_gust_speed: this.forecasts[0]?.wind_gust_speed ?? 0,
      },
      isCurrent: true,
      isNight: this.isNight,
      epoch: now.toMillis(),
    });

    const is24 = this.timeFormat === '24' || (this.timeFormat === 'auto' && ['tr', 'de', 'fr', 'es'].includes(this.locale));
    const targetCount = Math.max(12, this.hourlyCount || 24);

    // 2. Add forecast hours (Up to full targetCount future forecast hours)
    for (const f of this.forecasts) {
      const dt = DateTime.fromISO(f.datetime);
      if (!dt.isValid) continue;

      // Skip past hours (older than 30 mins ago)
      if (dt <= now.minus({ minutes: 30 })) continue;

      const timeLabel = is24 ? dt.toFormat('H') : dt.toFormat('ha');
      const hour = dt.hour;
      const isNightHour = hour < 6 || hour >= 21;

      result.push({
        label: timeLabel,
        forecast: f,
        isCurrent: false,
        isNight: isNightHour,
        epoch: dt.toMillis(),
      });

      // Stop once we have collected full 24 future hours (plus 1 "Now" = targetCount + 1)
      if (result.length >= targetCount + 1) {
        break;
      }
    }

    // 3. Insert Sunset / Sunrise event if it falls within the next 24 hours
    const maxEpoch = result[result.length - 1]?.epoch ?? now.plus({ hours: 24 }).toMillis();

    if (this.sunTimes?.nextSetting) {
      const setDt = DateTime.fromISO(this.sunTimes.nextSetting);
      if (setDt.isValid && setDt > now && setDt.toMillis() <= maxEpoch) {
        const setLabel = is24 ? setDt.toFormat('HH:mm') : setDt.toFormat('h:mma');
        result.push({
          label: setLabel,
          forecast: {
            datetime: setDt.toISO() || '',
            condition: 'sunset',
            temperature: undefined,
            precipitation: 0,
            precipitation_probability: 0,
            wind_speed: 0,
          },
          isCurrent: false,
          isNight: false,
          isSunEvent: true,
          sunType: 'sunset',
          sunTitle: t.sunset,
          epoch: setDt.toMillis(),
        });
      }
    }

    if (this.sunTimes?.nextRising) {
      const riseDt = DateTime.fromISO(this.sunTimes.nextRising);
      if (riseDt.isValid && riseDt > now && riseDt.toMillis() <= maxEpoch) {
        const riseLabel = is24 ? riseDt.toFormat('HH:mm') : riseDt.toFormat('h:mma');
        result.push({
          label: riseLabel,
          forecast: {
            datetime: riseDt.toISO() || '',
            condition: 'sunrise',
            temperature: undefined,
            precipitation: 0,
            precipitation_probability: 0,
            wind_speed: 0,
          },
          isCurrent: false,
          isNight: true,
          isSunEvent: true,
          sunType: 'sunrise',
          sunTitle: t.sunrise,
          epoch: riseDt.toMillis(),
        });
      }
    }

    // Sort chronologically (First item "Now" remains at index 0)
    const first = result[0];
    const rest = result.slice(1).sort((a, b) => a.epoch - b.epoch);

    return [first, ...rest].slice(0, targetCount + 3);
  }

  /* Mode 1: Conditions & Temperature */
  private renderConditionStrip(list: HourlyStripItem[]): TemplateResult {
    const t = translationService.get(this.locale);
    return html`
      <div class="ios-hourly-strip">
        ${list.map(item => {
          if (item.isSunEvent) {
            return html`
              <div class="ios-hourly-col ios-sun-event-col" style="min-width: 60px;">
                <span class="ios-hourly-time">${item.label}</span>
                <div class="ios-hourly-icon" style="display: flex; align-items: center; justify-content: center; height: 32px;">
                  ${this.renderSunEventIcon(item.sunType || 'sunset')}
                </div>
                <span class="ios-hourly-temp" style="font-size: 11px; font-weight: 500; color: rgba(255, 255, 255, 0.85); white-space: nowrap;">
                  ${item.sunTitle}
                </span>
              </div>
            `;
          }

          const temp = hassService.formatTemperature(item.forecast.temperature);
          const rawPop = item.forecast.precipitation_probability;
          const precip = item.forecast.precipitation ?? 0;
          let pop = 0;
          if (rawPop !== undefined && rawPop !== null && rawPop > 0) {
            pop = Math.round(rawPop);
          } else if (precip > 0) {
            if (precip >= 2.0) pop = 95;
            else if (precip >= 1.0) pop = 85;
            else if (precip >= 0.4) pop = 70;
            else pop = 50;
          } else if (
            (item.forecast.condition || '').includes('rain') ||
            (item.forecast.condition || '').includes('pouring') ||
            (item.forecast.condition || '').includes('snow')
          ) {
            pop = 60;
          }

          return html`
            <div class="ios-hourly-col">
              <span class="ios-hourly-time">${item.label}</span>
              <div class="ios-hourly-icon">
                <ios27-weather-icon
                  .condition=${item.forecast.condition || this.currentCondition}
                  .isNight=${item.isNight}
                  .size=${26}
                ></ios27-weather-icon>
              </div>
              <span class="ios-hourly-temp">${temp}</span>
              ${pop > 0 ? html`
                <span class="ios-hourly-pop">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                  ${t.format_percent ? t.format_percent(pop) : `${pop}%`}
                </span>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  /* Mode 2: Precipitation Intensity & Rain Chance */
  private renderPrecipitationStrip(list: HourlyStripItem[]): TemplateResult {
    const t = translationService.get(this.locale);

    return html`
      <div class="ios-hourly-strip">
        ${list.map(item => {
          if (item.isSunEvent) {
            return html`
              <div class="ios-rain-gauge-col ios-sun-event-col" style="min-width: 50px; justify-content: space-between;">
                <span class="ios-hourly-time">${item.label}</span>
                <div style="display: flex; align-items: center; justify-content: center; height: 50px;">
                  ${this.renderSunEventIcon(item.sunType || 'sunset')}
                </div>
                <span class="ios-rain-percent-label" style="font-size: 11px; font-weight: 500; color: rgba(255, 255, 255, 0.85); white-space: nowrap;">
                  ${item.sunTitle}
                </span>
              </div>
            `;
          }

          const rawPop = item.forecast.precipitation_probability;
          const precip = item.forecast.precipitation ?? 0;
          let pop = 0;
          if (rawPop !== undefined && rawPop !== null && rawPop > 0) {
            pop = Math.round(rawPop);
          } else if (precip > 0) {
            if (precip >= 2.0) pop = 95;
            else if (precip >= 1.0) pop = 85;
            else if (precip >= 0.4) pop = 70;
            else pop = 50;
          }

          const hasRain = pop > 0 || precip > 0;
          const fillRatio = Math.min(Math.max(precip / 3.0, pop / 100), 1.0);
          const fillPercent = Math.round(fillRatio * 100);
          const formattedPercent = t.format_percent ? t.format_percent(pop) : `${pop}%`;

          return html`
            <div class="ios-rain-gauge-col">
              <span class="ios-hourly-time">${item.label}</span>
              <div class="ios-rain-intensity-bar">
                <div
                  class="ios-rain-liquid-fill"
                  style="height: ${hasRain ? Math.max(14, fillPercent) : 0}%;"
                ></div>
                <div class="ios-rain-gauge-ticks">
                  <span class="ios-tick-line"></span>
                  <span class="ios-tick-line"></span>
                  <span class="ios-tick-line"></span>
                </div>
              </div>
              <span class="ios-rain-percent-label ${hasRain ? 'has-rain' : ''}">
                ${formattedPercent}
              </span>
            </div>
          `;
        })}
      </div>
    `;
  }

  /* Mode 3: Wind Speed & Fluid Wave Curve */
  private renderWindStrip(list: HourlyStripItem[]): TemplateResult {
    const windItems = list.filter(item => !item.isSunEvent);
    const speeds = windItems.map(item => Math.round(item.forecast.wind_speed ?? 0));
    const minSpeed = Math.min(...speeds, 0);
    const maxSpeed = Math.max(...speeds, 12);
    const range = Math.max(maxSpeed - minSpeed, 1);

    const colWidth = 56;
    const totalWidth = list.length * colWidth;
    const height = 36;
    const paddingY = 6;

    const points = list.map((item, idx) => {
      const x = idx * colWidth + colWidth / 2;
      const speed = item.isSunEvent ? 0 : Math.round(item.forecast.wind_speed ?? 0);
      const normalized = (speed - minSpeed) / range;
      const y = height - paddingY - normalized * (height - 2 * paddingY);
      return { x, y, isSun: item.isSunEvent };
    });

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }

    const fillD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    return html`
      <div class="ios-hourly-strip ios-wind-strip-wrapper" style="overflow-x: auto;">
        <div style="display: flex; flex-direction: column; width: ${totalWidth}px; min-width: ${totalWidth}px;">
          <div style="display: flex; gap: 0;">
            ${list.map((item, idx) => {
              if (item.isSunEvent) {
                return html`
                  <div
                    class="ios-wind-col ios-sun-event-col"
                    style="width: ${colWidth}px; min-width: ${colWidth}px; ${idx < list.length - 1 ? 'border-right: 1px dashed rgba(255, 255, 255, 0.16);' : ''}"
                  >
                    <span class="ios-hourly-time">${item.label}</span>
                    <div style="display: flex; align-items: center; justify-content: center; height: 26px;">
                      ${this.renderSunEventIcon(item.sunType || 'sunset')}
                    </div>
                    <span style="font-size: 11px; font-weight: 500; color: rgba(255, 255, 255, 0.85);">${item.sunTitle}</span>
                  </div>
                `;
              }

              const speed = Math.round(item.forecast.wind_speed ?? 0);
              return html`
                <div
                  class="ios-wind-col"
                  style="width: ${colWidth}px; min-width: ${colWidth}px; ${idx < list.length - 1 ? 'border-right: 1px dashed rgba(255, 255, 255, 0.16);' : ''}"
                >
                  <span class="ios-hourly-time">${item.label}</span>
                  <span class="ios-wind-speed-val">${speed}</span>
                  <span class="ios-wind-speed-unit">${this.windUnit}</span>
                </div>
              `;
            })}
          </div>

          <div class="ios-wind-wave-container" style="overflow: hidden; width: ${totalWidth}px;">
            <svg width="${totalWidth}" height="${height}" style="display: block;">
              <defs>
                <linearGradient id="wind-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.0" />
                </linearGradient>
              </defs>
              <path d="${fillD}" fill="url(#wind-gradient)" />
              <path d="${pathD}" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round" />
              ${points[0] ? html`
                <circle cx="${points[0].x}" cy="${points[0].y}" r="4" fill="#ffffff" stroke="#0891b2" stroke-width="2" />
              ` : ''}
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  /* Exact Apple Weather Sunset and Sunrise SVG Icons */
  private renderSunEventIcon(type: 'sunset' | 'sunrise'): TemplateResult {
    if (type === 'sunset') {
      return html`
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none" style="display: block;">
          <path d="M16 4v7m0 0l-2.5-2.5M16 11l2.5 2.5" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="7" y1="20" x2="4.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="25" y1="20" x2="27.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="9.5" y1="15" x2="7.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="22.5" y1="15" x2="24.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <path d="M10 21a6 6 0 0 1 12 0" fill="#f59e0b" stroke="#facc15" stroke-width="1.8"/>
          <line x1="4" y1="22" x2="28" y2="22" stroke="rgba(255, 255, 255, 0.85)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
    return html`
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" style="display: block;">
        <path d="M16 11V4m0 0l-2.5 2.5M16 4l2.5 2.5" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="7" y1="20" x2="4.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <line x1="25" y1="20" x2="27.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <line x1="9.5" y1="15" x2="7.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <line x1="22.5" y1="15" x2="24.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 21a6 6 0 0 1 12 0" fill="#f59e0b" stroke="#facc15" stroke-width="1.8"/>
        <line x1="4" y1="22" x2="28" y2="22" stroke="rgba(255, 255, 255, 0.85)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }
}
