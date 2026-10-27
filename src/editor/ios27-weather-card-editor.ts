import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { Ios27WeatherCardConfig } from '@/types';
import locationService from '@/services/location-service';
import { getEditorTranslation } from './editor-translations';

@customElement('weather-liquid-glass-card-editor')
export class Ios27WeatherCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: Ios27WeatherCardConfig;

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 12px 0;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .form-input, select {
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #ffffff);
      color: var(--primary-text-color, #212121);
      font-size: 14px;
      outline: none;
    }
    .form-input:focus, select:focus {
      border-color: var(--primary-color, #03a9f4);
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .checkbox-row input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      color: var(--primary-text-color, #212121);
    }
    .location-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(125, 125, 125, 0.08));
      gap: 8px;
    }
    .location-name {
      font-size: 13px;
      font-weight: 500;
      flex: 1;
    }
    .btn-remove {
      background: none;
      border: none;
      color: #ff453a;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
    }
    .btn-remove:hover {
      background: rgba(255, 69, 58, 0.1);
    }
  `;

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.hass) {
      locationService.resolveLocationName(this.hass).then(() => this.requestUpdate());
    }
  }

  public setConfig(config: Ios27WeatherCardConfig): void {
    const cleanConfig = { ...config };
    const generic = ['cupertino', 'forecast home', 'home', 'ev'];
    if (cleanConfig.name && generic.includes(cleanConfig.name.trim().toLowerCase())) {
      delete cleanConfig.name;
    }
    if (!cleanConfig.card_layout) {
      cleanConfig.card_layout = 'square-scroll';
    }
    if (cleanConfig.scrollable === undefined) {
      cleanConfig.scrollable = true;
    }
    if (cleanConfig.show_details === undefined) {
      cleanConfig.show_details = true;
    }
    this._config = cleanConfig;
  }

  public render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    const effectiveLocale =
      this._config.locale ||
      this.hass.locale?.language ||
      (this.hass as any).language ||
      'en';
    const t = getEditorTranslation(effectiveLocale);
    const weatherEntities = Object.keys(this.hass.states).filter(id => id.startsWith('weather.'));
    const currentLayout = this._config.card_layout || 'square-scroll';

    return html`
      <div class="card-config">
        <!-- Weather Entity -->
        <div class="form-row">
          <label class="form-label">${t.weather_entity}</label>
          <select
            class="form-input"
            .value=${this._config.entity || ''}
            @change=${(e: Event) => this._valueChanged('entity', (e.target as HTMLSelectElement).value)}
          >
            <option value="" disabled ?selected=${!this._config.entity}>${t.select_weather_entity}</option>
            ${weatherEntities.map(id => html`
              <option value="${id}" ?selected=${this._config?.entity === id}>
                ${this.hass.states[id]?.attributes?.friendly_name || id} (${id})
              </option>
            `)}
          </select>
        </div>

        <!-- Custom Location Name -->
        <div class="form-row">
          <label class="form-label">${t.custom_location_name}</label>
          <input
            type="text"
            class="form-input"
            .placeholder=${locationService.getCachedLocation() || t.location_placeholder}
            .value=${this._config.name && !['cupertino', 'forecast home', 'home', 'ev'].includes(this._config.name.toLowerCase()) ? this._config.name : ''}
            @input=${(e: Event) => this._valueChanged('name', (e.target as HTMLInputElement).value)}
          />
        </div>

        <!-- Additional Locations / Multi-Location -->
        <div class="form-row">
          <label class="section-title">${t.additional_locations_title}</label>
          <div style="font-size: 12px; opacity: 0.7; margin-bottom: 6px;">
            ${t.additional_locations_desc}
          </div>
          ${(this._config.locations || []).map((loc, idx) => {
            const entityId = typeof loc === 'string' ? loc : loc.entity;
            const customName = typeof loc === 'object' ? loc.name : '';
            const friendly = this.hass.states[entityId]?.attributes?.friendly_name || entityId;
            return html`
              <div class="location-item" style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; background: rgba(255,255,255,0.06); padding: 6px 10px; border-radius: 8px;">
                <span class="location-name" style="font-weight: 500;">${customName || friendly} <small style="opacity: 0.6;">(${entityId})</small></span>
                <button type="button" class="btn-remove" style="background: rgba(239,68,68,0.2); color: #ef4444; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer;" @click=${() => this._removeLocation(idx)}>${t.remove}</button>
              </div>
            `;
          })}

          <select
            class="form-input"
            @change=${(e: Event) => {
              const target = e.target as HTMLSelectElement;
              if (target.value) {
                this._addLocation(target.value);
                target.value = '';
              }
            }}
          >
            <option value="">${t.add_location_placeholder}</option>
            ${weatherEntities
              .filter(id => id !== this._config?.entity && !(this._config?.locations || []).some(l => (typeof l === 'string' ? l : l.entity) === id))
              .map(id => html`
                <option value="${id}">${this.hass.states[id]?.attributes?.friendly_name || id} (${id})</option>
              `)}
          </select>

          ${weatherEntities.filter(id => id !== this._config?.entity && !(this._config?.locations || []).some(l => (typeof l === 'string' ? l : l.entity) === id)).length === 0 ? html`
            <div style="font-size: 11px; opacity: 0.8; margin-top: 6px; line-height: 1.45; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); padding: 8px 10px; border-radius: 8px;">
              ${t.add_city_help}
            </div>
          ` : ''}
        </div>

        <!-- Card Layout Shape -->
        <div class="form-row">
          <label class="form-label">${t.card_layout_shape}</label>
          <select
            class="form-input"
            .value=${currentLayout}
            @change=${(e: Event) => this._valueChanged('card_layout', (e.target as HTMLSelectElement).value)}
          >
            <option value="square-scroll" ?selected=${currentLayout === 'square-scroll'}>${t.layout_square_scroll}</option>
            <option value="square-fit" ?selected=${currentLayout === 'square-fit'}>${t.layout_square_fit}</option>
            <option value="default" ?selected=${currentLayout === 'default'}>${t.layout_default}</option>
            <option value="compact" ?selected=${currentLayout === 'compact'}>${t.layout_compact}</option>
            <option value="mini" ?selected=${currentLayout === 'mini'}>${t.layout_mini}</option>
          </select>
        </div>

        <!-- Language / Locale -->
        <div class="form-row">
          <label class="form-label">${t.language}</label>
          <select
            class="form-input"
            .value=${this._config.locale || ''}
            @change=${(e: Event) => this._valueChanged('locale', (e.target as HTMLSelectElement).value)}
          >
            <option value="">${t.language_auto}</option>
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <!-- Default View -->
        <div class="form-row">
          <label class="form-label">${t.default_view_mode}</label>
          <select
            class="form-input"
            .value=${this._config.default_view || 'condition'}
            @change=${(e: Event) => this._valueChanged('default_view', (e.target as HTMLSelectElement).value)}
          >
            <option value="condition">${t.view_condition}</option>
            <option value="precipitation">${t.view_precipitation}</option>
            <option value="wind">${t.view_wind}</option>
          </select>
        </div>

        <!-- Time Format -->
        <div class="form-row">
          <label class="form-label">${t.time_format}</label>
          <select
            class="form-input"
            .value=${this._config.time_format || 'auto'}
            @change=${(e: Event) => this._valueChanged('time_format', (e.target as HTMLSelectElement).value)}
          >
            <option value="auto">${t.time_auto}</option>
            <option value="24">${t.time_24}</option>
            <option value="12">${t.time_12}</option>
          </select>
        </div>

        <!-- Temperature Sensor Override -->
        <div class="form-row">
          <label class="form-label">${t.temp_sensor_override}</label>
          <input
            type="text"
            class="form-input"
            placeholder="sensor.outdoor_temperature"
            .value=${this._config.temp_sensor || ''}
            @input=${(e: Event) => this._valueChanged('temp_sensor', (e.target as HTMLInputElement).value)}
          />
        </div>

        <!-- Highlights Message Override -->
        <div class="form-row">
          <label class="form-label">${t.custom_highlights_text}</label>
          <input
            type="text"
            class="form-input"
            .placeholder=${t.custom_highlights_placeholder}
            .value=${this._config.highlights_text || ''}
            @input=${(e: Event) => this._valueChanged('highlights_text', (e.target as HTMLInputElement).value)}
          />
        </div>

        <!-- Custom Height & Scrollable Options -->
        <div class="form-row">
          <label class="form-label">${t.custom_card_height}</label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. 400px"
            .value=${this._config.card_height || ''}
            @input=${(e: Event) => this._valueChanged('card_height', (e.target as HTMLInputElement).value)}
          />
        </div>

        <!-- Toggles -->
        <div class="checkbox-row">
          <input
            type="checkbox"
            id="scrollable"
            ?checked=${this._config.scrollable !== false}
            @change=${(e: Event) => this._valueChanged('scrollable', (e.target as HTMLInputElement).checked)}
          />
          <label for="scrollable" class="form-label">${t.enable_scroll}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="show_highlights"
            ?checked=${this._config.show_highlights !== false}
            @change=${(e: Event) => this._valueChanged('show_highlights', (e.target as HTMLInputElement).checked)}
          />
          <label for="show_highlights" class="form-label">${t.show_highlights}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="show_details"
            ?checked=${this._config.show_details !== false}
            @change=${(e: Event) => this._valueChanged('show_details', (e.target as HTMLInputElement).checked)}
          />
          <label for="show_details" class="form-label">${t.show_details}</label>
        </div>

        <!-- Map / Radar URL or Path -->
        <div class="form-row">
          <label class="form-label">${t.map_url}</label>
          <input
            type="text"
            class="form-input"
            .placeholder=${t.map_url_placeholder}
            .value=${this._config.map_url || ''}
            @input=${(e: Event) => this._valueChanged('map_url', (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="show_bottom_bar"
            ?checked=${this._config.show_bottom_bar !== false}
            @change=${(e: Event) => this._valueChanged('show_bottom_bar', (e.target as HTMLInputElement).checked)}
          />
          <label for="show_bottom_bar" class="form-label">${t.show_bottom_bar}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="animated_background"
            ?checked=${this._config.animated_background !== false}
            @change=${(e: Event) => this._valueChanged('animated_background', (e.target as HTMLInputElement).checked)}
          />
          <label for="animated_background" class="form-label">${t.animated_background}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="transparent_background"
            ?checked=${this._config.transparent_background === true}
            @change=${(e: Event) => this._valueChanged('transparent_background', (e.target as HTMLInputElement).checked)}
          />
          <label for="transparent_background" class="form-label">${t.transparent_background}</label>
        </div>
      </div>
    `;
  }

  private _valueChanged(key: keyof Ios27WeatherCardConfig, value: any): void {
    if (!this._config) return;
    const newConfig = { ...this._config };
    const generic = ['cupertino', 'forecast home', 'home', 'ev'];
    if (value === '' || value === undefined || (key === 'name' && typeof value === 'string' && generic.includes(value.trim().toLowerCase()))) {
      delete newConfig[key];
    } else {
      newConfig[key] = value;
    }
    this._config = newConfig;

    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    }));
  }

  private _addLocation(entity: string): void {
    if (!this._config) return;
    const locations = [...(this._config.locations || [])];
    const friendlyName = this.hass.states[entity]?.attributes?.friendly_name;
    locations.push(friendlyName ? { entity, name: friendlyName } : { entity });
    this._valueChanged('locations', locations);
  }

  private _removeLocation(index: number): void {
    if (!this._config || !this._config.locations) return;
    const locations = this._config.locations.filter((_, i) => i !== index);
    this._valueChanged('locations', locations);
  }
}

try {
  if (!customElements.get('ios27-weather-card-editor')) {
    customElements.define('ios27-weather-card-editor', class extends Ios27WeatherCardEditor {});
  }
} catch (_) {}
