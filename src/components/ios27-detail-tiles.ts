import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { Ios27WeatherCardConfig, WeatherForecast } from '@/types';
import translationService from '@/services/translation-service';

@customElement('ios27-detail-tiles')
export class Ios27DetailTiles extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public entityState?: any;
  @property({ type: Number }) public currentTemp: number | null = null;
  @property({ type: Object }) public dailyForecast?: WeatherForecast;
  @property({ type: Array }) public hourlyForecasts: WeatherForecast[] = [];
  @property({ type: Object }) public sunTimes?: { nextRising?: string; nextSetting?: string };
  @property() public windUnit: string = 'km/h';
  @property() public precipUnit: string = 'mm';
  @property() public locale: string = 'tr';
  @property() public timeFormat: '12' | '24' | 'auto' = 'auto';
  @property({ type: Object }) public config?: Ios27WeatherCardConfig;

  protected createRenderRoot() {
    return this;
  }

  // Helper to extract a number from an entity attribute or sensor override
  private _getSensorOrAttr(sensorId?: string, attrName?: string): number | null {
    if (sensorId && this.hass?.states[sensorId]) {
      const val = parseFloat(this.hass.states[sensorId].state);
      if (!isNaN(val)) return val;
    }
    if (attrName && this.entityState?.attributes?.[attrName] !== undefined) {
      const val = parseFloat(this.entityState.attributes[attrName]);
      if (!isNaN(val)) return val;
    }
    return null;
  }

  // Calculate Apparent (Feels Like) temperature via Australian Steadman formula
  private _getApparentTemp(actualTemp: number, humidity: number, windSpeedKmH: number): number {
    const attrVal = this._getSensorOrAttr(this.config?.sensor_apparent_temp, 'apparent_temperature');
    if (attrVal !== null) return Math.round(attrVal);

    // Steadman formula
    const e = (humidity / 100) * 6.105 * Math.exp((17.27 * actualTemp) / (237.7 + actualTemp));
    const w = (windSpeedKmH || 0) / 3.6; // km/h to m/s
    const at = actualTemp + 0.33 * e - 0.70 * w - 4.0;
    return Math.round(at);
  }

  // Dew point formula (Magnus-Tetens)
  private _getDewPoint(temp: number, humidity: number): number {
    const attrVal = this._getSensorOrAttr(undefined, 'dew_point');
    if (attrVal !== null) return Math.round(attrVal);
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(Math.max(1, humidity) / 100.0);
    return Math.round((b * alpha) / (a - alpha));
  }

  // Parse wind bearing to degrees
  private _parseBearing(bearing: number | string | undefined | null): number {
    if (typeof bearing === 'number') return bearing;
    if (!bearing) return 0;
    const map: Record<string, number> = {
      n: 0, nne: 22.5, ne: 45, ene: 67.5,
      e: 90, ese: 112.5, se: 135, sse: 157.5,
      s: 180, ssw: 202.5, sw: 225, wsw: 247.5,
      w: 270, wnw: 292.5, nw: 315, nnw: 337.5,
      k: 0, kd: 45, d: 90, gd: 135, g: 180, gb: 225, b: 270, kb: 315
    };
    return map[String(bearing).toLowerCase()] ?? 0;
  }

  // Astronomical Moon Phase calculation (synodic month = 29.53058867 days)
  private _getMoonData(): { phase: number; illumination: number; phaseKey: string } {
    const now = new Date();
    // Known new moon: Jan 11, 2024, 11:57 UTC
    const knownNewMoon = 1704974220000;
    const synodicMonth = 29.53058867 * 86400000;
    const diff = now.getTime() - knownNewMoon;
    const phase = (((diff % synodicMonth) + synodicMonth) % synodicMonth) / synodicMonth;
    const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);

    let phaseKey = 'new_moon';
    if (phase < 0.03 || phase >= 0.97) phaseKey = 'new_moon';
    else if (phase < 0.22) phaseKey = 'waxing_crescent';
    else if (phase < 0.28) phaseKey = 'first_quarter';
    else if (phase < 0.47) phaseKey = 'waxing_gibbous';
    else if (phase < 0.53) phaseKey = 'full_moon';
    else if (phase < 0.72) phaseKey = 'waning_gibbous';
    else if (phase < 0.78) phaseKey = 'last_quarter';
    else phaseKey = 'waning_crescent';

    return { phase, illumination, phaseKey };
  }

  // Calculate sun progress along daylight curve
  private _getSunProgress(): { isDay: boolean; progress: number; riseTimeStr: string; setTimeStr: string } {
    const now = new Date();
    const nextRising = this.sunTimes?.nextRising;
    const nextSetting = this.sunTimes?.nextSetting;

    let rise = nextRising ? new Date(nextRising) : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 30);
    let set = nextSetting ? new Date(nextSetting) : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 45);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const riseTimeStr = `${pad(rise.getHours())}:${pad(rise.getMinutes())}`;
    const setTimeStr = `${pad(set.getHours())}:${pad(set.getMinutes())}`;

    const nowMs = now.getTime();
    const riseMs = rise.getTime();
    const setMs = set.getTime();

    // Determine whether currently day or night
    const isDay = setMs > riseMs ? (nowMs >= riseMs && nowMs <= setMs) : (nowMs < riseMs && nowMs > setMs);
    let progress = 0.5;

    if (setMs > riseMs) {
      if (nowMs >= riseMs && nowMs <= setMs) {
        progress = (nowMs - riseMs) / (setMs - riseMs);
      } else {
        progress = 0.5;
      }
    }

    return { isDay, progress: Math.min(1, Math.max(0, progress)), riseTimeStr, setTimeStr };
  }

  public render(): TemplateResult {
    const t = translationService.get(this.locale);
    const d = t.details;

    const actualTemp = this.currentTemp !== null ? Math.round(this.currentTemp) : 10;
    const humidity = this._getSensorOrAttr(this.config?.sensor_humidity, 'humidity') ?? 65;
    const windSpeed = this._getSensorOrAttr(this.config?.sensor_wind_speed, 'wind_speed') ?? 12;
    const windBearingRaw = this.config?.sensor_wind_bearing && this.hass?.states[this.config.sensor_wind_bearing]
      ? this.hass.states[this.config.sensor_wind_bearing].state
      : this.entityState?.attributes?.wind_bearing;
    const windBearing = this._parseBearing(windBearingRaw);
    const windGust = this._getSensorOrAttr(this.config?.sensor_wind_gust, 'wind_gust_speed');
    const apparentTemp = this._getApparentTemp(actualTemp, humidity, windSpeed);
    const dewPoint = this._getDewPoint(actualTemp, humidity);

    const pressure = this._getSensorOrAttr(this.config?.sensor_pressure, 'pressure') ?? 1015;
    const pressureUnit = this.entityState?.attributes?.pressure_unit || 'hPa';

    const uvIndex = this._getSensorOrAttr(this.config?.sensor_uv, 'uv_index') ?? 0;
    const visibility = this._getSensorOrAttr(this.config?.sensor_visibility, 'visibility') ?? 10;
    const visUnit = this.entityState?.attributes?.visibility_unit || (this.hass?.config?.unit_system?.length === 'mi' ? 'mi' : 'km');

    // Precipitation: from sensor, entity, or daily forecast
    const precipVal = this._getSensorOrAttr(this.config?.sensor_precipitation, 'precipitation')
      ?? this.dailyForecast?.precipitation
      ?? 0;

    return html`
      <div class="ios-detail-grid">
        <!-- 1. HİSSEDİLEN (Feels Like) -->
        ${this._renderFeelsLikeTile(d, actualTemp, apparentTemp)}

        <!-- 2. RÜZGÂR (Wind Compass) -->
        ${this._renderWindTile(d, windSpeed, windBearing, windGust)}

        <!-- 3. AY EVRESİ (Moon Phase) -->
        ${this._renderMoonTile(d)}

        <!-- 4. GÜN BATIMI / GÜN DOĞUMU (Sunrise / Sunset Curve) -->
        ${this._renderSunTile(d)}

        <!-- 5. UV İNDEKSİ (UV Index Gauge) -->
        ${this._renderUvTile(d, uvIndex)}

        <!-- 6. YAĞIŞ (Precipitation) -->
        ${this._renderPrecipTile(d, precipVal)}

        <!-- 7. GÖRÜŞ MESAFESİ (Visibility) -->
        ${this._renderVisibilityTile(d, visibility, visUnit)}

        <!-- 8. NEM ORANI & ÇİY NOKTASI (Humidity & Dew Point) -->
        ${this._renderHumidityTile(d, humidity, dewPoint)}

        <!-- 9. BASINÇ (Pressure Barometer Dial) -->
        ${this._renderPressureTile(d, pressure, pressureUnit)}
      </div>
    `;
  }

  // 1. FEELS LIKE TILE
  private _renderFeelsLikeTile(d: any, actual: number, apparent: number): TemplateResult {
    const diff = apparent - actual;
    let badgeText = `${diff > 0 ? '+' : ''}${diff}°`;
    let badgeClass = 'neutral';
    let footerNote = d.feels_similar;

    if (diff <= -2) {
      badgeText = `↓${Math.abs(diff)}°`;
      badgeClass = 'cooler';
      footerNote = d.feels_wind_cooler;
    } else if (diff >= 2) {
      badgeText = `↑${diff}°`;
      badgeClass = 'warmer';
      footerNote = d.feels_humidity_warmer;
    }

    // Relative slider gauge position
    const minRange = Math.min(actual, apparent) - 4;
    const maxRange = Math.max(actual, apparent) + 4;
    const rangeSpan = Math.max(1, maxRange - minRange);
    const actualPct = Math.round(((actual - minRange) / rangeSpan) * 100);
    const appPct = Math.round(((apparent - minRange) / rangeSpan) * 100);
    const leftPct = Math.min(actualPct, appPct);
    const widthPct = Math.max(10, Math.abs(appPct - actualPct));

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0zm-3-10a1 1 0 0 1 1 1v4h-2V4a1 1 0 0 1 1-1z" />
          </svg>
          <span class="ios-tile-title">${d.feels_like}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${apparent}°</div>
          <div class="ios-stat-sub">${d.actual}: ${actual}°</div>

          <div class="ios-diff-bar-container">
            <div class="ios-diff-track">
              <div
                class="ios-diff-fill ${badgeClass}"
                style="left: ${leftPct}%; width: ${widthPct}%;"
              ></div>
            </div>
            <span class="ios-diff-badge ${badgeClass}">${badgeText}</span>
          </div>
        </div>

        <div class="ios-tile-footer">${footerNote}</div>
      </div>
    `;
  }

  // 2. WIND COMPASS TILE
  private _renderWindTile(d: any, speed: number, bearing: number, gust: number | null): TemplateResult {
    // Cardinal labels based on locale
    const north = d.cardinal_n || 'K';
    const east = d.cardinal_e || 'D';
    const south = d.cardinal_s || 'G';
    const west = d.cardinal_w || 'B';

    let footer = gust && gust > speed
      ? d.gusts(Math.round(gust), this.windUnit)
      : speed > 25
      ? d.strong_wind
      : d.calm_wind;

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.5 17c0 1.66-1.34 3-3 3s-3-1.34-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.66 0 3 1.34 3 3zm4.5-6c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h14c1.66 0 3-1.34 3-3zm-1-6c-.55 0-1 .45-1 1h-2c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3H2v-2h15c.55 0 1-.45 1-1z" />
          </svg>
          <span class="ios-tile-title">${d.wind}</span>
        </div>

        <div class="ios-tile-body center-content">
          <div class="ios-compass-dial">
            <svg viewBox="0 0 100 100" class="ios-compass-svg">
              <!-- Radial outer ticks -->
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                stroke-width="1.5"
                stroke-dasharray="2 5.3"
              />

              <!-- Cardinal Letters -->
              <text x="50" y="15" class="ios-cardinal" text-anchor="middle">${north}</text>
              <text x="88" y="54" class="ios-cardinal" text-anchor="middle">${east}</text>
              <text x="50" y="93" class="ios-cardinal" text-anchor="middle">${south}</text>
              <text x="12" y="54" class="ios-cardinal" text-anchor="middle">${west}</text>

              <!-- Rotating Arrow & Indicator Pip -->
              <g transform="rotate(${bearing}, 50, 50)">
                <!-- Compass outer dot -->
                <circle cx="50" cy="11" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 4px rgba(255,255,255,0.8))"/>
                <!-- Direction Arrow -->
                <polygon points="50,19 54,29 50,26 46,29" fill="#ffffff" />
              </g>

              <!-- Center Speed & Unit -->
              <text x="50" y="49" class="ios-compass-speed" text-anchor="middle">${Math.round(speed)}</text>
              <text x="50" y="63" class="ios-compass-unit" text-anchor="middle">${this.windUnit}</text>
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${footer}</div>
      </div>
    `;
  }

  // 3. MOON PHASE TILE
  private _renderMoonTile(d: any): TemplateResult {
    const { phase, illumination, phaseKey } = this._getMoonData();
    const phaseTitle = d.moon_phases[phaseKey] || d.moon_phase;

    // Draw realistic mathematical terminator SVG
    // R = 32, Center = (40, 40)
    // Waxing: phase <= 0.5. Waning: phase > 0.5.
    const theta = phase * 2 * Math.PI;
    const cosVal = Math.cos(theta);
    const rX = Math.abs(cosVal) * 32;

    let pathD = '';
    if (phase < 0.5) {
      // Waxing: right limb is lit (semicircle from top 40,8 to bottom 40,72 sweeping right)
      // Terminator goes from bottom (40,72) back to top (40,8)
      // sweep-flag is 0 if cosVal < 0 (bulging left), 1 if cosVal >= 0 (bulging right)
      const sweep = cosVal <= 0 ? 0 : 1;
      pathD = `M 40 8 A 32 32 0 0 1 40 72 A ${rX} 32 0 0 ${sweep} 40 8 Z`;
    } else {
      // Waning: left limb is lit (semicircle from top 40,8 to bottom 40,72 sweeping left)
      const sweep = cosVal <= 0 ? 1 : 0;
      pathD = `M 40 8 A 32 32 0 0 0 40 72 A ${rX} 32 0 0 ${sweep} 40 8 Z`;
    }

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" />
          </svg>
          <span class="ios-tile-title">${phaseTitle}</span>
        </div>

        <div class="ios-tile-body center-content">
          <div class="ios-moon-container">
            <svg viewBox="0 0 80 80" class="ios-moon-svg">
              <defs>
                <radialGradient id="darkSide" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#2a303c" />
                  <stop offset="100%" stop-color="#12161f" />
                </radialGradient>
                <radialGradient id="litSide" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="65%" stop-color="#e2e8f0" />
                  <stop offset="100%" stop-color="#94a3b8" />
                </radialGradient>
                <filter id="moonGlow">
                  <feGaussianBlur stdDeviation="1.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Dark lunar sphere base -->
              <circle cx="40" cy="40" r="32" fill="url(#darkSide)" />

              <!-- Subtle crater details on dark sphere -->
              <circle cx="34" cy="30" r="5" fill="rgba(0,0,0,0.25)" />
              <circle cx="48" cy="46" r="6" fill="rgba(0,0,0,0.22)" />
              <circle cx="30" cy="52" r="4" fill="rgba(0,0,0,0.18)" />

              <!-- Illuminated Phase Segment -->
              <path d="${pathD}" fill="url(#litSide)" filter="url(#moonGlow)" />

              <!-- Outer subtle limb ring -->
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255, 255, 255, 0.25)" stroke-width="0.8" />
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${d.illumination(illumination)}</div>
      </div>
    `;
  }

  // 4. SUNSET / SUNRISE TILE
  private _renderSunTile(d: any): TemplateResult {
    const { isDay, progress, riseTimeStr, setTimeStr } = this._getSunProgress();
    const title = isDay ? d.sunset : d.sunrise;
    const mainTime = isDay ? setTimeStr : riseTimeStr;
    const subTime = isDay ? `${d.sunrise}: ${riseTimeStr}` : `${d.sunset}: ${setTimeStr}`;

    // Calculate glowing sun dot coordinate along smooth sine curve
    // SVG viewBox: 0 0 130 55. Horizon at Y = 38.
    // X goes from 10 to 120. Y goes from 38 down to 6.
    const dotX = 10 + 110 * progress;
    const dotY = 38 - 30 * Math.sin(Math.PI * progress);

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-10a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H13a1 1 0 0 1-1-1zm-7 7a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v.01a1 1 0 0 1-1 1zm14 0a1 1 0 0 1-1-1v-.01a1 1 0 0 1 2 0V11a1 1 0 0 1-1 1zm-3-13a1 1 0 0 1 1.41 0l.01.01a1 1 0 0 1 0 1.41l-.01.01a1 1 0 0 1-1.41-1.43zm-10.82 0a1 1 0 0 1 0 1.41l-.01.01a1 1 0 0 1-1.41 0l-.01-.01a1 1 0 0 1 0-1.41l.01-.01a1 1 0 0 1 1.42 0z"/>
          </svg>
          <span class="ios-tile-title">${title}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${mainTime}</div>

          <div class="ios-sun-arc-box">
            <svg viewBox="0 0 130 50" class="ios-sun-arc-svg">
              <defs>
                <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Horizon dashed line -->
              <line x1="5" y1="38" x2="125" y2="38" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>

              <!-- Sun arc curve -->
              <path d="M 10 38 Q 65 2 120 38" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>

              <!-- Sun glowing dot positioned at current time progress -->
              <circle cx="${dotX}" cy="${dotY}" r="4.5" fill="#ffffff" filter="url(#sunGlow)"/>
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${subTime}</div>
      </div>
    `;
  }

  // 5. UV INDEX TILE
  private _renderUvTile(d: any, uv: number): TemplateResult {
    let uvCategory = d.uv_levels.low;
    let advice = d.uv_advice_low;

    if (uv >= 11) {
      uvCategory = d.uv_levels.extreme;
      advice = d.uv_advice_extreme;
    } else if (uv >= 8) {
      uvCategory = d.uv_levels.very_high;
      advice = d.uv_advice_high;
    } else if (uv >= 6) {
      uvCategory = d.uv_levels.high;
      advice = d.uv_advice_high;
    } else if (uv >= 3) {
      uvCategory = d.uv_levels.moderate;
      advice = d.uv_advice_mod;
    }

    const pct = Math.min(100, Math.max(0, Math.round((uv / 11) * 100)));

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
          </svg>
          <span class="ios-tile-title">${d.uv_index}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${Math.round(uv)}</div>
          <div class="ios-stat-sub">${uvCategory}</div>

          <div class="ios-uv-bar-wrapper">
            <div class="ios-uv-bar">
              <div class="ios-uv-marker" style="left: ${pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="ios-tile-footer">${advice}</div>
      </div>
    `;
  }

  // 6. PRECIPITATION TILE
  private _renderPrecipTile(d: any, precip: number): TemplateResult {
    const formattedPrecip = precip > 0 ? (precip >= 10 ? Math.round(precip) : precip.toFixed(1)) : 0;
    const footer = precip > 0
      ? d.precip_expected_24h(formattedPrecip, this.precipUnit)
      : d.no_precip_expected;

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span class="ios-tile-title">${d.precipitation}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${formattedPrecip} ${this.precipUnit}</div>
          <div class="ios-stat-sub">${d.precip_in_24h}</div>
        </div>

        <div class="ios-tile-footer">${footer}</div>
      </div>
    `;
  }

  // 7. VISIBILITY TILE
  private _renderVisibilityTile(d: any, visibility: number, unit: string): TemplateResult {
    let footer = d.vis_perfect;
    if (visibility < 2) {
      footer = d.vis_fog;
    } else if (visibility < 5) {
      footer = d.vis_haze;
    } else if (visibility < 10) {
      footer = d.vis_good;
    }

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <span class="ios-tile-title">${d.visibility}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${Math.round(visibility)} ${unit}</div>
        </div>

        <div class="ios-tile-footer">${footer}</div>
      </div>
    `;
  }

  // 8. HUMIDITY & DEW POINT TILE
  private _renderHumidityTile(d: any, humidity: number, dewPoint: number): TemplateResult {
    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-5.33 6.67-8 10-8 13.5a8 8 0 1 0 16 0c0-3.5-2.67-6.83-8-13.5zm0 19a5.5 5.5 0 0 1-5.5-5.5c0-2.45 1.76-4.97 5.5-9.64 3.74 4.67 5.5 7.19 5.5 9.64 0 3.04-2.46 5.5-5.5 5.5z"/>
          </svg>
          <span class="ios-tile-title">${d.humidity}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">%${Math.round(humidity)}</div>
        </div>

        <div class="ios-tile-footer">${d.dew_point(dewPoint)}</div>
      </div>
    `;
  }

  // 9. PRESSURE TILE
  private _renderPressureTile(d: any, pressure: number, unit: string): TemplateResult {
    // Normal barometer gauge range: 960 to 1060 hPa
    const pVal = Math.round(pressure);
    const pNorm = Math.min(1060, Math.max(960, pVal));
    const needleDeg = 140 + ((pNorm - 960) / 100) * 260;

    // Format like Apple Weather: e.g. "1.015 hPa" or "1015 hPa"
    const displayP = pVal >= 1000 ? `${(pVal / 1000).toFixed(3).replace('.', '.')}` : String(pVal);

    return html`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v5l4.25 2.52.77-1.28-3.02-1.79V7z"/>
          </svg>
          <span class="ios-tile-title">${d.pressure}</span>
        </div>

        <div class="ios-tile-body center-content">
          <div class="ios-pressure-gauge">
            <svg viewBox="0 0 100 80" class="ios-pressure-svg">
              <!-- Radial dashed arc ticks -->
              <circle
                cx="50"
                cy="46"
                r="36"
                fill="none"
                stroke="rgba(255, 255, 255, 0.28)"
                stroke-width="2.5"
                stroke-dasharray="2 6"
              />

              <!-- Needle pointing to pressure -->
              <g transform="rotate(${needleDeg}, 50, 46)">
                <line x1="50" y1="46" x2="50" y2="12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <circle cx="50" cy="46" r="3" fill="#ffffff"/>
              </g>

              <!-- Center readout -->
              <text x="50" y="44" class="ios-pressure-symbol" text-anchor="middle">=</text>
              <text x="50" y="56" class="ios-pressure-val" text-anchor="middle">${displayP}</text>
              <text x="50" y="67" class="ios-pressure-unit" text-anchor="middle">${unit}</text>

              <!-- Trend arrows -->
              <text x="24" y="74" class="ios-pressure-arrow" text-anchor="middle">↓</text>
              <text x="76" y="74" class="ios-pressure-arrow" text-anchor="middle">↑</text>
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${d.pressure_stable}</div>
      </div>
    `;
  }
}
