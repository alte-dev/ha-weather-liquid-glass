import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hassService from '@/services/hass-service';
import translationService from '@/services/translation-service';
@customElement('ios27-header')
export class Ios27Header extends LitElement {
  @property() public locationName: string = '';
  @property({ type: Number }) public currentTemp: number | null = null;
  @property() public condition: string = 'Sunny';
  @property({ type: Number }) public highTemp: number | null = null;
  @property({ type: Number }) public lowTemp: number | null = null;
  @property() public conditionNote: string = '';
  @property() public locale: string = 'en';

  protected createRenderRoot() {
    return this; // Render light DOM so CSS variables and host styles apply cleanly
  }

  public render(): TemplateResult {
    const t = translationService.get(this.locale);
    const formattedCurrent = hassService.formatTemperature(this.currentTemp);
    const formattedHigh = hassService.formatTemperature(this.highTemp);
    const formattedLow = hassService.formatTemperature(this.lowTemp);
    const friendlyCondition = hassService.getFriendlyCondition(this.condition, this.locale);

    let highLowText = '';
    if (this.highTemp !== null && this.lowTemp !== null) {
      highLowText = t.format_high_low(formattedHigh, formattedLow);
    } else if (this.highTemp !== null) {
      highLowText = `H:${formattedHigh}`;
    }

    const displayName = this.locationName?.trim() && this.locationName.toLowerCase() !== 'cupertino'
      ? this.locationName
      : (this.locale === 'tr' ? 'Hava Durumu' : 'Weather');

    return html`
      <div class="ios-header">
        <div class="ios-header-location-row">
          <span class="ios-location-name">${displayName}</span>
        </div>

        <div class="ios-current-temp">${formattedCurrent}</div>
        <div class="ios-condition-row">
          <span class="ios-condition-text">${friendlyCondition}</span>
          ${highLowText ? html`<span class="ios-high-low">${highLowText}</span>` : ''}
        </div>

        ${this.conditionNote ? html`<div class="ios-condition-summary">${this.conditionNote}</div>` : ''}
      </div>
    `;
  }
}
