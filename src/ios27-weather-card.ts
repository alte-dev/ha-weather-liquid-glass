import { html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { DateTime } from 'luxon';
import type { ActiveViewMode, Ios27WeatherCardConfig, WeatherForecast, WeatherLocationConfig } from '@/types';
import { cardStyles } from '@/styles/card-styles';
import { getWeatherBackground } from '@/styles/background-styles';
import hassService from '@/services/hass-service';
import forecastService from '@/services/forecast-service';
import locationService from '@/services/location-service';
import translationService from '@/services/translation-service';
import { generateWeatherSummary } from '@/services/weather-summary';

import '@/components/ios27-header';
import '@/components/ios27-highlights';
import '@/components/ios27-forecast-card';
import '@/components/ios27-detail-tiles';
import '@/components/ios27-bottom-bar';
import '@/components/ios27-sky-animation';
import '@/components/ios27-weather-icon';
import '@/editor/ios27-weather-card-editor';

// Register card with Home Assistant custom card registry
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === 'weather-liquid-glass-card')) {
  window.customCards.push({
    type: 'weather-liquid-glass-card',
    name: 'Weather Card (Liquid Glass)',
    description: 'Ultra-modern frosted Liquid Glass weather card with dynamic sky animations, hourly forecasts, and 10-day overview.',
    preview: true,
    documentationURL: 'https://github.com/alte-dev/ha-weather-liquid-glass',
  });
}

// Log banner to browser console
console.info(
  '%c  LIQUID GLASS WEATHER CARD  \n%c Version: 1.1.1 · Apple iOS Design ',
  'color: #38bdf8; font-weight: bold; background: #0f172a; padding: 4px 8px; border-radius: 4px 4px 0 0;',
  'color: #ffffff; font-weight: normal; background: #1e293b; padding: 4px 8px; border-radius: 0 0 4px 4px;'
);

@customElement('weather-liquid-glass-card')
export class Ios27WeatherCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: Ios27WeatherCardConfig;

  @state() private _activeMode: ActiveViewMode = 'condition';
  @state() private _hourlyForecasts: WeatherForecast[] = [];
  @state() private _dailyForecasts: WeatherForecast[] = [];
  @state() private _unsubscribeForecast?: () => void;
  private _subscribedEntity?: string;
  @state() private _autoLocationName: string = '';

  // Multi-location states
  @state() private _currentLocationIndex: number = 0;
  @state() private _showLocationDrawer: boolean = false;
  @state() private _selectedNewEntityToAdd: string = '';

  // Touch swipe states
  private _touchStartX: number = 0;
  private _touchStartY: number = 0;
  private _touchStartTime: number = 0;

  static styles = cardStyles;

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('weather-liquid-glass-card-editor');
  }

  public static getStubConfig(hass: HomeAssistant): Record<string, unknown> {
    const weatherEntity = hass?.states ? Object.keys(hass.states).find(id => id.startsWith('weather.')) : undefined;
    return {
      type: 'custom:weather-liquid-glass-card',
      entity: weatherEntity || 'weather.forecast_home',
      card_layout: 'square-scroll',
      scrollable: true,
      show_details: true,
      default_view: 'condition',
      show_highlights: true,
      show_bottom_bar: true,
      animated_background: true,
    };
  }

  public setConfig(config: Ios27WeatherCardConfig): void {
    if (!config.entity) {
      throw new Error('Please specify a weather entity in the card configuration.');
    }
    const cleanConfig = { ...config };
    
    this._config = {
      card_layout: 'square-scroll',
      scrollable: true,
      show_details: true,
      default_view: 'condition',
      show_highlights: true,
      show_bottom_bar: true,
      animated_background: true,
      time_format: 'auto',
      ...cleanConfig,
    };
    if (this._config.default_view) {
      this._activeMode = this._config.default_view;
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._setupSubscription();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = undefined;
    }
    this._subscribedEntity = undefined;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('_config')) {
      this._subscribedEntity = undefined;
      this._setupSubscription();
    } else if (!this._subscribedEntity) {
      this._setupSubscription();
    }
    if (this._config?.reverse_geocode) {
      this._resolveLocation();
    }
  }

  private _getLocations(): WeatherLocationConfig[] {
    const list: WeatherLocationConfig[] = [];
    if (this._config?.entity) {
      list.push({
        entity: this._config.entity,
        name: this._config.name,
        temp_sensor: this._config.temp_sensor,
        reverse_geocode: this._config.reverse_geocode,
      });
    }
    const extras = this._config?.locations || this._config?.entities || [];
    for (const item of extras) {
      const loc: WeatherLocationConfig = typeof item === 'string' ? { entity: item } : item;
      if (loc && loc.entity && !list.some(l => l.entity === loc.entity)) {
        list.push(loc);
      }
    }
    return list;
  }

  private _switchLocation(newIndex: number): void {
    const locations = this._getLocations();
    if (newIndex < 0 || newIndex >= locations.length) return;
    if (this._currentLocationIndex === newIndex) return;

    this._currentLocationIndex = newIndex;
    this._hourlyForecasts = [];
    this._dailyForecasts = [];
    this._subscribedEntity = undefined;

    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = undefined;
    }
    this._setupSubscription();
    this.requestUpdate();
  }

  private async _resolveLocation(): Promise<void> {
    if (!this.hass) return;
    const locations = this._getLocations();
    const activeLoc = locations[this._currentLocationIndex] || locations[0];

    // Only resolve if explicitly enabled and user has not provided a custom name
    const isOptIn = activeLoc?.reverse_geocode ?? this._config?.reverse_geocode;
    if (!isOptIn) return;
    if (activeLoc?.name && activeLoc.name.trim().length > 0) return;

    const locale = this._config?.locale || this.hass.locale?.language || (this.hass as any).language || 'en';
    const loc = await locationService.reverseGeocode(this.hass, locale);
    if (loc && loc !== this._autoLocationName) {
      this._autoLocationName = loc;
      this.requestUpdate();
    }
  }

  private _setupSubscription(): void {
    if (!this.hass) return;
    const locations = this._getLocations();
    const activeLoc = locations[this._currentLocationIndex] || locations[0];
    if (!activeLoc?.entity) return;

    const subKey = `${activeLoc.entity}_${this._currentLocationIndex}`;
    if (this._subscribedEntity === subKey) {
      return; // Already subscribed to this location/entity
    }
    this._subscribedEntity = subKey;

    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = undefined;
    }

    forecastService.subscribeForecasts(
      this.hass,
      activeLoc.entity,
      (hourly) => {
        this._hourlyForecasts = hourly;
        this.requestUpdate();
      },
      (daily) => {
        this._dailyForecasts = daily;
        this.requestUpdate();
      }
    ).then(unsub => {
      if (this._subscribedEntity !== subKey) {
        try { unsub(); } catch {}
      } else {
        this._unsubscribeForecast = unsub;
      }
    });
  }

  // Touch swipe handling to switch locations left/right
  private _handleTouchStart(e: TouchEvent): void {
    if (e.touches.length !== 1) return;
    const target = e.target as HTMLElement;
    // Don't hijack swipe if user is dragging the hourly forecast strip or interacting with bottom buttons or drawer
    if (
      target.closest('.ios-hourly-strip') ||
      target.closest('.ios-bottom-btn') ||
      target.closest('.ios-location-drawer') ||
      target.closest('.ios-add-city-section')
    ) {
      return;
    }
    this._touchStartX = e.touches[0].clientX;
    this._touchStartY = e.touches[0].clientY;
    this._touchStartTime = Date.now();
  }

  private _handleTouchEnd(e: TouchEvent): void {
    if (!this._touchStartX) return;
    const deltaX = e.changedTouches[0].clientX - this._touchStartX;
    const deltaY = e.changedTouches[0].clientY - this._touchStartY;
    const elapsed = Date.now() - this._touchStartTime;
    this._touchStartX = 0;

    // Fast horizontal swipe (< 600ms, > 45px distance, horizontal > vertical)
    if (elapsed < 600 && Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      const locations = this._getLocations();
      if (locations.length <= 1) return;

      if (deltaX < 0) {
        // Swipe Left -> Next location
        if (this._currentLocationIndex < locations.length - 1) {
          this._switchLocation(this._currentLocationIndex + 1);
        }
      } else {
        // Swipe Right -> Previous location
        if (this._currentLocationIndex > 0) {
          this._switchLocation(this._currentLocationIndex - 1);
        }
      }
    }
  }

  public render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const locations = this._getLocations();
    const activeIndex = Math.min(this._currentLocationIndex, Math.max(0, locations.length - 1));
    const activeLoc = locations[activeIndex] || locations[0];
    const activeEntityId = activeLoc?.entity || this._config.entity;

    const entityState = this.hass.states[activeEntityId];
    if (!entityState) {
      return html`
        <ha-card style="padding: 16px; color: #ef4444; background: rgba(0,0,0,0.4); border-radius: 20px;">
          Entity not found: <strong>${activeEntityId}</strong>
        </ha-card>
      `;
    }

    // Resolve weather data
    const isNight = hassService.isNight(this.hass, this._config.sun_entity);
    let condition = entityState.state || 'sunny';
    if (!condition || condition === 'unavailable' || condition === 'unknown') {
      condition = this._hourlyForecasts[0]?.condition || this._dailyForecasts[0]?.condition || 'sunny';
    }
    
    let friendlyName = activeLoc?.name?.trim();
    // Only resolve a fallback if user did not provide a custom name
    if (!friendlyName) {
      const isOptIn = activeLoc?.reverse_geocode ?? this._config?.reverse_geocode;
      if (isOptIn && this._autoLocationName) {
        friendlyName = this._autoLocationName;
      } else {
        const entityFriendly = entityState.attributes?.friendly_name?.trim();
        if (entityFriendly) {
          friendlyName = entityFriendly;
        } else {
          const haLocation = this.hass.config?.location_name?.trim();
          if (haLocation) {
            friendlyName = haLocation;
          } else {
            const rawId = activeEntityId.replace(/^weather\./, '').replace(/_/g, ' ');
            friendlyName = rawId ? rawId.charAt(0).toUpperCase() + rawId.slice(1) : 'Weather';
          }
        }
      }
    }

    let currentTemp = entityState.attributes?.temperature ?? null;
    const activeTempSensor = activeLoc?.temp_sensor || (activeIndex === 0 ? this._config.temp_sensor : undefined);
    if (activeTempSensor && this.hass.states[activeTempSensor]) {
      const sensorVal = parseFloat(this.hass.states[activeTempSensor].state);
      if (!isNaN(sensorVal)) {
        currentTemp = sensorVal;
      }
    }
    // Fallback if entity state is unavailable or temperature attribute is missing
    if (currentTemp === null || isNaN(currentTemp)) {
      if (this._hourlyForecasts.length > 0 && typeof this._hourlyForecasts[0].temperature === 'number') {
        currentTemp = this._hourlyForecasts[0].temperature;
      } else if (this._dailyForecasts.length > 0 && typeof this._dailyForecasts[0].temperature === 'number') {
        currentTemp = this._dailyForecasts[0].temperature;
      }
    }

    const highTemp = this._dailyForecasts[0]?.temperature ?? entityState.attributes?.temperature ?? currentTemp;
    const lowTemp = this._dailyForecasts[0]?.templow ?? (currentTemp !== null ? currentTemp - 5 : null);

    const windUnit = this._config.wind_unit || hassService.getWindSpeedUnit(this.hass, entityState);
    const precipUnit = this._config.precip_unit || hassService.getPrecipitationUnit(this.hass, entityState);
    const locale = this._config.locale || this.hass.locale?.language || (this.hass as any).language || 'tr';

    // Summary & highlights
    const { conditionNote, highlightsTitle, highlightsText } = generateWeatherSummary(
      this._hourlyForecasts,
      this._dailyForecasts,
      condition,
      currentTemp,
      locale,
      windUnit
    );

    const themeMode = this._resolveThemeMode(condition, isNight);
    this.dataset.theme = themeMode;

    const dynamicBg = this._config.transparent_background
      ? 'transparent'
      : getWeatherBackground(condition, isNight);

    const rawLayout = this._config.card_layout || 'square-scroll';
    const layout = rawLayout === 'square' ? 'square-scroll' : rawLayout;
    const isScrollable =
      layout === 'square-scroll' ||
      (layout !== 'square-fit' && layout !== 'mini' && (this._config.scrollable !== false || Boolean(this._config.card_height)));
    const heightStyle = this._config.card_height ? `height: ${this._config.card_height}; max-height: ${this._config.card_height};` : '';

    const sunTimes = hassService.getSunTimes(this.hass, this._config.sun_entity);

    return html`
      <div
        class="ios27-container layout-${layout} theme-${themeMode} ${this._config.transparent_background ? 'transparent-bg' : ''} ${isScrollable ? 'is-scrollable' : ''}"
        data-theme="${themeMode}"
        style="background: ${dynamicBg}; ${heightStyle}; position: relative;"
        @touchstart=${this._handleTouchStart}
        @touchend=${this._handleTouchEnd}
      >
        <!-- Atmospheric Animated Sky Background (Clouds, Sun Glow, Moon, Stars, Rain) -->
        ${this._config.animated_background !== false && !this._config.transparent_background ? html`
          <ios27-sky-animation
            .condition=${condition}
            .isNight=${isNight}
          ></ios27-sky-animation>
        ` : ''}

        ${layout === 'square-fit'
          ? this._renderSquareFit(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale, windUnit, entityState, conditionNote)
          : layout === 'mini'
          ? this._renderMini(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale, windUnit, entityState)
          : html`
            <div class="ios27-scroll-wrapper">
              <!-- Centered / Compact iOS Header -->
              <ios27-header
                .locationName=${friendlyName}
                .currentTemp=${currentTemp}
                .condition=${condition}
                .highTemp=${highTemp}
                .lowTemp=${lowTemp}
                .conditionNote=${conditionNote}
                .locale=${locale}
              ></ios27-header>

              <!-- Highlights Card (Optional) -->
              ${layout !== 'compact' && this._config.show_highlights !== false ? html`
                <ios27-highlights
                  .title=${highlightsTitle}
                  .message=${this._config.highlights_text || highlightsText}
                ></ios27-highlights>
              ` : ''}

              <!-- Main Forecast Glass Card with 3-Way Segmented Switcher -->
              <ios27-forecast-card
                .activeMode=${this._activeMode}
                .hourlyForecasts=${this._hourlyForecasts}
                .dailyForecasts=${this._dailyForecasts}
                .dailyCount=${this._config.daily_count || 10}
                .hourlyCount=${this._config.hourly_count || 24}
                .currentTemp=${currentTemp}
                .currentCondition=${condition}
                .isNight=${isNight}
                .sunTimes=${sunTimes}
                .windUnit=${windUnit}
                .precipUnit=${precipUnit}
                .timeFormat=${this._config.time_format || 'auto'}
                .locale=${locale}
                @mode-changed=${(e: CustomEvent) => {
                  this._activeMode = e.detail.mode;
                }}
              ></ios27-forecast-card>

              <!-- Apple Weather Detail Tiles Grid (Scroll down to view) -->
              ${this._config.show_details !== false ? html`
                <ios27-detail-tiles
                  .hass=${this.hass}
                  .entityState=${entityState}
                  .currentTemp=${currentTemp}
                  .dailyForecast=${this._dailyForecasts[0]}
                  .hourlyForecasts=${this._hourlyForecasts}
                  .sunTimes=${sunTimes}
                  .windUnit=${windUnit}
                  .precipUnit=${precipUnit}
                  .locale=${locale}
                  .timeFormat=${this._config.time_format || 'auto'}
                  .config=${this._config}
                ></ios27-detail-tiles>
              ` : ''}

              <!-- iOS Bottom Bar (Multi-location pager dots & list button - only shown when > 1 locations exist) -->
              ${layout !== 'compact' && this._config.show_bottom_bar !== false && locations.length > 1 ? html`
                <ios27-bottom-bar
                  .totalLocations=${locations.length}
                  .activeIndex=${activeIndex}
                  .locale=${locale}
                  @location-select=${(e: CustomEvent) => this._switchLocation(e.detail.index)}
                  @map-click=${this._handleMapClick}
                  @list-click=${() => { this._showLocationDrawer = true; }}
                ></ios27-bottom-bar>
              ` : ''}
            </div>
          `}

        <!-- Apple Weather Location Drawer / Modal -->
        ${this._showLocationDrawer ? this._renderLocationDrawer(locations, activeIndex) : ''}
      </div>
    `;
  }

  private _renderLocationDrawer(locations: WeatherLocationConfig[], activeIndex: number): TemplateResult {
    const locale = this._config?.locale || this.hass?.locale?.language || (this.hass as any)?.language || 'en';
    const t = translationService.get(locale);
    const allWeatherEntities = Object.keys(this.hass.states)
      .filter(id => id.startsWith('weather.') && !locations.some(l => l.entity === id));

    return html`
      <div class="ios-location-drawer" @click=${(e: Event) => e.stopPropagation()}>
        <div class="ios-drawer-header">
          <div class="ios-drawer-title">${t.drawer_title}</div>
          <button class="ios-drawer-close-btn" @click=${() => { this._showLocationDrawer = false; }}>
            ${t.done}
          </button>
        </div>

        <div class="ios-city-list">
          ${locations.map((loc, idx) => {
            const st = this.hass.states[loc.entity];
            const cond = st?.state || 'sunny';
            const temp = st?.attributes?.temperature ?? '--';
            const name = loc.name || st?.attributes?.friendly_name || (idx === 0 ? t.primary_location : loc.entity.replace('weather.', ''));
            const isCurrent = idx === activeIndex;

            return html`
              <div
                class="ios-city-card ${isCurrent ? 'active' : ''}"
                @click=${() => {
                  this._switchLocation(idx);
                  this._showLocationDrawer = false;
                }}
              >
                <div class="ios-city-left">
                  <div class="ios-city-name">
                    ${idx === 0 ? html`
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8" style="vertical-align: middle;">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                      </svg>
                    ` : ''}
                    <span>${name}</span>
                  </div>
                  <div class="ios-city-condition">
                    ${hassService.getFriendlyCondition(cond, locale)}
                  </div>
                </div>

                <div class="ios-city-right">
                  <ios27-weather-icon .condition=${cond} .isNight=${false} size="30"></ios27-weather-icon>
                  <span class="ios-city-temp">${temp !== '--' ? Math.round(Number(temp)) + '°' : '--'}</span>
                  ${idx > 0 ? html`
                    <button
                      class="ios-city-delete-btn"
                      title="${t.remove_location}"
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._removeLocation(idx);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          })}
        </div>

        <!-- Add new location dropdown -->
        ${allWeatherEntities.length > 0 ? html`
          <div class="ios-add-city-section">
            <select
              class="ios-add-city-select"
              .value=${this._selectedNewEntityToAdd}
              @change=${(e: Event) => { this._selectedNewEntityToAdd = (e.target as HTMLSelectElement).value; }}
            >
              <option value="">${t.select_city_to_add}</option>
              ${allWeatherEntities.map(id => html`
                <option value="${id}">
                  ${this.hass.states[id]?.attributes?.friendly_name || id}
                </option>
              `)}
            </select>
            <button
              class="ios-add-city-btn"
              @click=${this._handleAddSelectedCity}
            >
              ${t.add}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _handleAddSelectedCity(): void {
    if (!this._selectedNewEntityToAdd) return;
    const newEntity = this._selectedNewEntityToAdd;
    this._selectedNewEntityToAdd = '';

    const currentLocations = this._getLocations();
    const newName = this.hass.states[newEntity]?.attributes?.friendly_name || newEntity.replace('weather.', '');
    const updated = [
      ...currentLocations.slice(1),
      { entity: newEntity, name: newName }
    ];

    const newConfig = {
      ...this._config!,
      locations: updated,
    };
    this.setConfig(newConfig);

    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: newConfig }
    }));

    this._switchLocation(currentLocations.length);
  }

  private _removeLocation(indexToRemove: number): void {
    const currentLocations = this._getLocations();
    if (indexToRemove <= 0 || indexToRemove >= currentLocations.length) return;

    const updated = currentLocations.slice(1).filter((_, i) => i + 1 !== indexToRemove);
    const newConfig = {
      ...this._config!,
      locations: updated,
    };
    this.setConfig(newConfig);

    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: newConfig }
    }));

    if (this._currentLocationIndex >= indexToRemove) {
      this._switchLocation(Math.max(0, this._currentLocationIndex - 1));
    }
  }

  private _renderSquareFit(
    friendlyName: string,
    currentTemp: number | null,
    condition: string,
    highTemp: number | null,
    lowTemp: number | null,
    isNight: boolean,
    locale: string,
    windUnit: string,
    entityState?: any,
    conditionNote?: string
  ): TemplateResult {
    const t = translationService.get(locale);
    const d = t.details;
    const formattedCurrent = hassService.formatTemperature(currentTemp);
    const formattedHigh = hassService.formatTemperature(highTemp);
    const formattedLow = hassService.formatTemperature(lowTemp);
    const friendlyCondition = hassService.getFriendlyCondition(condition, locale);

    let highLowText = '';
    if (highTemp !== null && lowTemp !== null) {
      highLowText = t.format_high_low(formattedHigh, formattedLow);
    } else if (highTemp !== null) {
      highLowText = t.format_high ? t.format_high(formattedHigh) : `H:${formattedHigh}`;
    }

    // Metrics: Feels Like, Wind, Humidity (with custom sensor & forecast fallbacks)
    const getNum = (sensorId?: string, attrVal?: unknown, forecastVal?: unknown): number | null => {
      if (sensorId && this.hass?.states?.[sensorId]) {
        const parsed = parseFloat(this.hass.states[sensorId].state);
        if (!isNaN(parsed)) return Math.round(parsed);
      }
      if (attrVal !== undefined && attrVal !== null && attrVal !== '') {
        const parsed = Number(attrVal);
        if (!isNaN(parsed)) return Math.round(parsed);
      }
      if (forecastVal !== undefined && forecastVal !== null && forecastVal !== '') {
        const parsed = Number(forecastVal);
        if (!isNaN(parsed)) return Math.round(parsed);
      }
      return null;
    };

    const actualTemp = currentTemp !== null ? Math.round(currentTemp) : 18;
    const humidity = getNum(
      this._config?.sensor_humidity,
      entityState?.attributes?.humidity,
      this._hourlyForecasts?.[0]?.humidity ?? this._dailyForecasts?.[0]?.humidity
    );
    const windSpeed = getNum(
      this._config?.sensor_wind_speed,
      entityState?.attributes?.wind_speed,
      this._hourlyForecasts?.[0]?.wind_speed ?? this._dailyForecasts?.[0]?.wind_speed
    );
    let apparentTemp = getNum(
      this._config?.sensor_apparent_temp,
      entityState?.attributes?.apparent_temperature
    );

    if (apparentTemp === null && currentTemp !== null) {
      const hum = humidity ?? 65;
      const w = (windSpeed ?? 10) / 3.6;
      const e = (hum / 100) * 6.105 * Math.exp((17.27 * actualTemp) / (237.7 + actualTemp));
      apparentTemp = Math.round(actualTemp + 0.33 * e - 0.70 * w - 4.0);
    }

    // Prepare 5-hour strip (starting with "Now" + next 4 hours)
    const nowDt = DateTime.now().setLocale(locale);
    const is24 = this._config?.time_format === '24' || (this._config?.time_format !== '12' && ['tr', 'de', 'fr', 'es'].includes(locale));
    const futureHours = this._hourlyForecasts.filter(f => {
      const dt = DateTime.fromISO(f.datetime);
      return dt.isValid && dt > nowDt.minus({ minutes: 30 });
    }).slice(0, 4);

    const hourlyCols = [
      {
        label: t.now,
        condition,
        temp: formattedCurrent,
        pop: this._hourlyForecasts[0]?.precipitation_probability ?? 0,
        isNight,
      },
      ...futureHours.map(item => {
        const dt = DateTime.fromISO(item.datetime);
        const h = dt.isValid ? dt.hour : 12;
        return {
          label: dt.isValid ? (is24 ? dt.toFormat('H') : dt.toFormat('ha')) : '--',
          condition: item.condition || condition,
          temp: hassService.formatTemperature(item.temperature),
          pop: item.precipitation_probability ?? 0,
          isNight: h < 6 || h >= 21,
        };
      }),
    ];

    return html`
      <div class="ios-square-fit-wrapper">
        <!-- Header Row: Location & High/Low Pill -->
        <div class="ios-square-fit-header">
          <div class="ios-square-fit-loc-group">
            <span class="ios-square-fit-loc">${friendlyName}</span>
            <svg class="ios-nav-arrow" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          ${highLowText ? html`<div class="ios-square-fit-highlow">${highLowText}</div>` : ''}
        </div>

        <!-- Hero Section: Big Temp + Condition Text + Weather Icon -->
        <div class="ios-square-fit-main">
          <div class="ios-square-fit-temp-col">
            <div class="ios-square-fit-temp">${formattedCurrent}</div>
            <div class="ios-square-fit-condition">${friendlyCondition}</div>
            ${conditionNote ? html`<div class="ios-square-fit-note">${conditionNote}</div>` : ''}
          </div>
          <div class="ios-square-fit-icon-col">
            <ios27-weather-icon .condition=${condition} .isNight=${isNight} .size=${62}></ios27-weather-icon>
          </div>
        </div>

        <!-- Quick Stats Pills Row (Feels Like, Wind, Humidity) -->
        <div class="ios-square-fit-stats-row">
          <div class="ios-square-fit-stat-pill">
            <span class="ios-square-fit-stat-label">${d.feels_like}</span>
            <span class="ios-square-fit-stat-val">${apparentTemp !== null ? `${apparentTemp}°` : '--'}</span>
          </div>
          <div class="ios-square-fit-stat-pill">
            <span class="ios-square-fit-stat-label">${d.wind}</span>
            <span class="ios-square-fit-stat-val">${windSpeed !== null ? html`${windSpeed} <small>${windUnit}</small>` : '--'}</span>
          </div>
          <div class="ios-square-fit-stat-pill">
            <span class="ios-square-fit-stat-label">${d.humidity}</span>
            <span class="ios-square-fit-stat-val">${humidity !== null ? (t.format_percent ? t.format_percent(humidity) : `${humidity}%`) : '--'}</span>
          </div>
        </div>

        <!-- Frosted Glass Hourly Strip (5 Columns) -->
        <div class="ios-square-fit-forecast-box">
          <div class="ios-square-fit-hourly-row">
            ${hourlyCols.map(col => {
              const popVal = Math.round(col.pop || 0);
              return html`
                <div class="ios-square-fit-hour-col">
                  <span class="ios-square-fit-hour-time">${col.label}</span>
                  <div class="ios-square-fit-hour-icon-wrap">
                    <ios27-weather-icon .condition=${col.condition} .isNight=${col.isNight} .size=${24}></ios27-weather-icon>
                    ${popVal >= 20 ? html`
                      <span class="ios-square-fit-hour-pop">
                        ${t.format_percent ? t.format_percent(popVal) : `${popVal}%`}
                      </span>
                    ` : ''}
                  </div>
                  <span class="ios-square-fit-hour-temp">${col.temp}</span>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  private _renderMini(
    friendlyName: string,
    currentTemp: number | null,
    condition: string,
    highTemp: number | null,
    lowTemp: number | null,
    isNight: boolean,
    locale: string,
    windUnit?: string,
    entityState?: any
  ): TemplateResult {
    const t = translationService.get(locale);
    const formattedCurrent = hassService.formatTemperature(currentTemp);
    const formattedHigh = hassService.formatTemperature(highTemp);
    const formattedLow = hassService.formatTemperature(lowTemp);
    const friendlyCondition = hassService.getFriendlyCondition(condition, locale);

    let highLowText = '';
    if (highTemp !== null && lowTemp !== null) {
      highLowText = t.format_high_low(formattedHigh, formattedLow);
    } else if (highTemp !== null) {
      highLowText = t.format_high ? t.format_high(formattedHigh) : `H:${formattedHigh}`;
    }

    const rawPop = this._hourlyForecasts[0]?.precipitation_probability ?? this._dailyForecasts[0]?.precipitation_probability ?? 0;
    const pop = Math.round(rawPop);
    const windSpeed = entityState?.attributes?.wind_speed !== undefined ? Math.round(Number(entityState.attributes.wind_speed)) : null;

    return html`
      <div class="ios-mini-content">
        <div class="ios-mini-left">
          <div class="ios-mini-loc-row">
            <span class="ios-mini-loc">${friendlyName}</span>
            <svg class="ios-nav-arrow" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <div class="ios-mini-condition">${friendlyCondition}</div>
          <div class="ios-mini-meta-row">
            ${highLowText ? html`<span class="ios-mini-highlow">${highLowText}</span>` : ''}
            ${pop >= 20 ? html`
              <span class="ios-mini-pill">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                ${t.format_percent ? t.format_percent(pop) : `${pop}%`}
              </span>
            ` : windSpeed !== null && windSpeed >= 15 ? html`
              <span class="ios-mini-pill">
                ${windSpeed} ${windUnit || 'km/h'}
              </span>
            ` : ''}
          </div>
        </div>

        <div class="ios-mini-right">
          <div class="ios-mini-temp">${formattedCurrent}</div>
          <div class="ios-mini-icon-wrap">
            <ios27-weather-icon .condition=${condition} .isNight=${isNight} .size=${48}></ios27-weather-icon>
          </div>
        </div>
      </div>
    `;
  }

  private _handleMapClick(e: Event): void {
    e.stopPropagation();
    if (this._config?.map_url) {
      const url = this._config.map_url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank');
        return;
      }
      if (url.startsWith('/')) {
        window.history.pushState(null, '', url);
        window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true }));
        return;
      }
    }
    this._fireHassMoreInfo();
  }

  private _fireHassMoreInfo(): void {
    const locations = this._getLocations();
    const activeLoc = locations[this._currentLocationIndex] || locations[0];
    const entityId = activeLoc?.entity || this._config?.entity;
    if (!entityId) return;
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

    private _resolveThemeMode(condition: string, isNight: boolean): string {
    if (isNight) return 'night';
    const cond = (condition || '').toLowerCase();
    if (cond.includes('rain') || cond.includes('pouring') || cond.includes('lightning') || cond.includes('thunder')) {
      return 'rainy';
    }
    if (cond === 'cloudy' || cond === 'overcast' || cond.includes('fog') || cond.includes('snow') || cond.includes('sleet') || cond.includes('hail')) {
      return 'cloudy';
    }
    // Sunny, clear-day, partlycloudy, partly-cloudy all share the bright daytime blue sky theme
    return 'sunny';
  }

  public getCardSize(): number {
    const layout = this._config?.card_layout || 'square-scroll';
    if (layout === 'mini') return 2;
    if (layout === 'compact') return 4;
    if (layout === 'square-fit' || layout === 'square-scroll' || layout === 'square') return 5;
    return 7;
  }

  public getGridOptions() {
    const layout = this._config?.card_layout || 'square-scroll';
    if (layout === 'mini') {
      return {
        columns: 12,
        min_columns: 6,
        rows: 2,
        min_rows: 2,
      };
    }
    if (layout === 'square-fit' || layout === 'square-scroll' || layout === 'square') {
      return {
        columns: 12,
        min_columns: 6,
        rows: 6,
        min_rows: 4,
      };
    }
    if (layout === 'compact') {
      return {
        columns: 12,
        min_columns: 6,
        rows: 4,
        min_rows: 3,
      };
    }
    return {
      columns: 12,
      min_columns: 6,
      rows: 8,
      min_rows: 5,
    };
  }
}

try {
  if (!customElements.get('ios27-weather-card')) {
    customElements.define('ios27-weather-card', class extends Ios27WeatherCard {});
  }
  if (!customElements.get('ha-weather-liquid-glass')) {
    customElements.define('ha-weather-liquid-glass', class extends Ios27WeatherCard {});
  }
} catch (_) {}

// Self-healing: Notify Lovelace to rebuild in case the DOM rendered before module load
window.dispatchEvent(new CustomEvent('ll-rebuild', { composed: true, bubbles: true }));
setTimeout(() => {
  window.dispatchEvent(new CustomEvent('ll-rebuild', { composed: true, bubbles: true }));
}, 200);
