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
  '%c  LIQUID GLASS WEATHER CARD  \n%c Version: 1.0.0 · Apple iOS Design ',
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
    if (cleanConfig.name && cleanConfig.name.trim().toLowerCase() === 'cupertino') {
      delete cleanConfig.name;
    }
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
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('_config')) {
      this._setupSubscription();
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

    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = undefined;
    }
    this._setupSubscription();
    this.requestUpdate();
  }

  private async _resolveLocation(): Promise<void> {
    if (!this.hass) return;
    const locale = this._config?.locale || this.hass.locale?.language || (this.hass as any).language || 'tr';
    const loc = await locationService.resolveLocationName(this.hass, locale);
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
      this._unsubscribeForecast = unsub;
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
    const condition = entityState.state || 'sunny';
    
    const genericNames = [
      'forecast home',
      'weather',
      'home',
      'ev',
      'cupertino',
      'default',
      'hava durumu',
      'weather forecast',
      'forecast',
    ];

    let friendlyName = activeLoc?.name?.trim();
    if (!friendlyName || genericNames.includes(friendlyName.toLowerCase())) {
      if (activeIndex === 0 && this._autoLocationName) {
        friendlyName = this._autoLocationName;
      } else {
        const cached = activeIndex === 0 ? locationService.getCachedLocation() : null;
        if (cached) {
          friendlyName = cached;
        } else {
          const entityName = entityState.attributes?.friendly_name?.trim();
          if (entityName && !genericNames.includes(entityName.toLowerCase())) {
            friendlyName = entityName;
          } else {
            const haLocation = this.hass.config?.location_name?.trim();
            if (haLocation && !genericNames.includes(haLocation.toLowerCase())) {
              friendlyName = haLocation;
            } else {
              friendlyName = activeIndex === 0 ? 'Kırklareli' : activeEntityId.replace('weather.', '');
            }
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

    const highTemp = this._dailyForecasts[0]?.temperature ?? entityState.attributes?.temperature ?? null;
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

    const dynamicBg = this._config.transparent_background
      ? 'transparent'
      : getWeatherBackground(condition, isNight);

    const rawLayout = this._config.card_layout || 'square-scroll';
    const layout = rawLayout === 'square' ? 'square-scroll' : rawLayout;
    const isScrollable = layout === 'square-scroll' || this._config.scrollable !== false || Boolean(this._config.card_height);
    const heightStyle = this._config.card_height ? `height: ${this._config.card_height}; max-height: ${this._config.card_height};` : '';

    const sunTimes = hassService.getSunTimes(this.hass, this._config.sun_entity);

    return html`
      <div
        class="ios27-container layout-${layout} ${this._config.transparent_background ? 'transparent-bg' : ''} ${isScrollable ? 'is-scrollable' : ''}"
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
          ? this._renderSquareFit(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale, windUnit)
          : layout === 'mini'
          ? this._renderMini(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale)
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
    const allWeatherEntities = Object.keys(this.hass.states)
      .filter(id => id.startsWith('weather.') && !locations.some(l => l.entity === id));

    return html`
      <div class="ios-location-drawer" @click=${(e: Event) => e.stopPropagation()}>
        <div class="ios-drawer-header">
          <div class="ios-drawer-title">Hava Durumu · Şehirler</div>
          <button class="ios-drawer-close-btn" @click=${() => { this._showLocationDrawer = false; }}>
            Bitti
          </button>
        </div>

        <div class="ios-city-list">
          ${locations.map((loc, idx) => {
            const st = this.hass.states[loc.entity];
            const cond = st?.state || 'sunny';
            const temp = st?.attributes?.temperature ?? '--';
            const name = loc.name || st?.attributes?.friendly_name || (idx === 0 ? 'Ana Konum' : loc.entity.replace('weather.', ''));
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
                    ${hassService.getFriendlyCondition(cond, this._config?.locale || 'tr')}
                  </div>
                </div>

                <div class="ios-city-right">
                  <ios27-weather-icon .condition=${cond} .isNight=${false} size="30"></ios27-weather-icon>
                  <span class="ios-city-temp">${temp !== '--' ? Math.round(Number(temp)) + '°' : '--'}</span>
                  ${idx > 0 ? html`
                    <button
                      class="ios-city-delete-btn"
                      title="Bu konumu kaldır"
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
              <option value="">+ Başka bir şehir / hava durumu seçin...</option>
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
              Ekle
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
    windUnit: string
  ): TemplateResult {
    const t = translationService.get(locale);
    const formattedCurrent = hassService.formatTemperature(currentTemp);
    const formattedHigh = hassService.formatTemperature(highTemp);
    const formattedLow = hassService.formatTemperature(lowTemp);

    let highLowText = '';
    if (highTemp !== null && lowTemp !== null) {
      highLowText = t.format_high_low(formattedHigh, formattedLow);
    } else if (highTemp !== null) {
      highLowText = `H:${formattedHigh}`;
    }

    const hourlyItems = this._hourlyForecasts.slice(0, 5);

    return html`
      <!-- Header Row: Location & High/Low -->
      <div class="ios-square-fit-header">
        <div class="ios-square-fit-loc-group">
          <span class="ios-square-fit-loc">${friendlyName}</span>
          <svg class="ios-nav-arrow" viewBox="0 0 24 24" style="width: 13px; height: 13px; opacity: 0.85; fill: currentColor;">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
        ${highLowText ? html`<div class="ios-square-fit-highlow">${highLowText}</div>` : ''}
      </div>

      <!-- Current Temperature & Weather Icon -->
      <div class="ios-square-fit-main">
        <div class="ios-square-fit-temp">${formattedCurrent}</div>
        <ios27-weather-icon .condition=${condition} .isNight=${isNight} size="46"></ios27-weather-icon>
      </div>

      <!-- Mini Hourly Row (5 columns) -->
      ${hourlyItems.length > 0 ? html`
        <div class="ios-square-fit-forecast-box">
          <div class="ios-square-fit-hourly-row">
            ${hourlyItems.map(item => {
              const dt = DateTime.fromISO(item.datetime);
              const hourLabel = dt.isValid ? dt.toFormat('H') : '--';
              const temp = hassService.formatTemperature(item.temperature);
              return html`
                <div class="ios-square-fit-hour-col">
                  <span class="ios-square-fit-time">${hourLabel}</span>
                  <ios27-weather-icon .condition=${item.condition || condition} .isNight=${isNight} size="18"></ios27-weather-icon>
                  <span class="ios-square-fit-hour-temp">${temp}</span>
                </div>
              `;
            })}
          </div>
        </div>
      ` : ''}
    `;
  }

  private _renderMini(
    friendlyName: string,
    currentTemp: number | null,
    condition: string,
    highTemp: number | null,
    lowTemp: number | null,
    isNight: boolean,
    locale: string
  ): TemplateResult {
    const t = translationService.get(locale);
    const formattedCurrent = hassService.formatTemperature(currentTemp);
    const formattedHigh = hassService.formatTemperature(highTemp);
    const formattedLow = hassService.formatTemperature(lowTemp);
    const friendlyCondition = hassService.getFriendlyCondition(condition, locale);

    let highLowText = '';
    if (highTemp !== null && lowTemp !== null) {
      highLowText = t.format_high_low(formattedHigh, formattedLow);
    }

    return html`
      <div class="ios-mini-container">
        <div class="ios-mini-left">
          <div class="ios-mini-location">
            <span>${friendlyName}</span>
            <svg class="ios-nav-arrow" viewBox="0 0 24 24" style="width: 12px; height: 12px; opacity: 0.8; fill: currentColor;">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <div class="ios-mini-condition">${friendlyCondition}</div>
          <div class="ios-mini-highlow">
            ${highLowText ? html`
              <span class="ios-highlow">${highLowText}</span>
            ` : ''}
          </div>
        </div>

        <div class="ios-mini-right">
          <div class="ios-mini-temp">${formattedCurrent}</div>
          <ios27-weather-icon .condition=${condition} .isNight=${isNight} size="42"></ios27-weather-icon>
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

  public getCardSize(): number {
    return 7;
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
