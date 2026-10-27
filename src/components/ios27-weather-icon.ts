import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ios27-weather-icon')
export class Ios27WeatherIcon extends LitElement {
  @property() public condition: string = 'sunny';
  @property({ type: Boolean }) public isNight: boolean = false;
  @property({ type: Number }) public size: number = 28;

  protected createRenderRoot() {
    return this; // Render directly to avoid shadow DOM styling overhead for SVG
  }

  public render(): TemplateResult {
    const s = (this.condition || '').toLowerCase().replace(/_/g, '-');
    const isNight = this.isNight;
    const w = this.size;
    const h = this.size;

    return html`
      <div style="width: ${w}px; height: ${h}px; display: inline-flex; align-items: center; justify-content: center;">
        ${this.renderIconSvg(s, isNight, w, h)}
      </div>
    `;
  }

  private renderIconSvg(s: string, isNight: boolean, w: number, h: number): TemplateResult {
    if (s === 'sunny' || s === 'clear' || s === 'clear-day') {
      if (isNight) {
        return this.svgMoon(w, h);
      }
      return this.svgSun(w, h);
    }

    if (s === 'clear-night') {
      return this.svgMoon(w, h);
    }

    if (s === 'partlycloudy' || s === 'partly-cloudy' || s === 'partly-cloudy-day') {
      return isNight ? this.svgPartlyCloudyNight(w, h) : this.svgPartlyCloudyDay(w, h);
    }

    if (s === 'partly-cloudy-night') {
      return this.svgPartlyCloudyNight(w, h);
    }

    if (s === 'cloudy' || s === 'overcast') {
      return this.svgCloudy(w, h);
    }

    if (s === 'rainy' || s === 'rain' || s === 'light-rain') {
      return this.svgRain(w, h);
    }

    if (s === 'pouring' || s === 'heavy-rain' || s === 'extreme-rain') {
      return this.svgPouring(w, h);
    }

    if (s === 'lightning' || s === 'lightning-rainy' || s === 'thunderstorm') {
      return this.svgThunderstorm(w, h);
    }

    if (s === 'snowy' || s === 'snow') {
      return this.svgSnow(w, h);
    }

    if (s === 'snowy-rainy' || s === 'sleet' || s === 'hail') {
      return this.svgSleet(w, h);
    }

    if (s === 'fog' || s === 'mist') {
      return this.svgFog(w, h);
    }

    if (s === 'windy' || s === 'windy-variant') {
      return this.svgWind(w, h);
    }

    // Default fallback
    return isNight ? this.svgMoon(w, h) : this.svgSun(w, h);
  }

  private svgSun(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="7" fill="url(#sun-grad)" />
        <g stroke="#ffca28" stroke-width="2" stroke-linecap="round">
          <line x1="16" y1="2" x2="16" y2="5" />
          <line x1="16" y1="27" x2="16" y2="30" />
          <line x1="2" y1="16" x2="5" y2="16" />
          <line x1="27" y1="16" x2="30" y2="16" />
          <line x1="6.1" y1="6.1" x2="8.2" y2="8.2" />
          <line x1="23.8" y1="23.8" x2="25.9" y2="25.9" />
          <line x1="6.1" y1="25.9" x2="8.2" y2="23.8" />
          <line x1="23.8" y1="8.2" x2="25.9" y2="6.1" />
        </g>
        <defs>
          <radialGradient id="sun-grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#fff176" />
            <stop offset="100%" stop-color="#f57f17" />
          </radialGradient>
        </defs>
      </svg>
    `;
  }

  private svgMoon(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M24 18.5C23.5 24 19 28 13.5 28C7.5 28 3 23.5 3 17.5C3 11.5 7.5 6.8 13.2 6.5C12.5 8.2 12.2 10.2 12.5 12.2C13.2 16.5 16.8 19.8 21.2 20.2C22.1 20.2 23.1 20 24 18.5Z" fill="url(#moon-grad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
        <circle cx="23" cy="8" r="1" fill="#ffffff" opacity="0.9" />
        <circle cx="27" cy="13" r="0.75" fill="#ffffff" opacity="0.7" />
        <defs>
          <linearGradient id="moon-grad" x1="4" y1="6" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFF9C4" />
            <stop offset="1" stop-color="#FFD54F" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgPartlyCloudyDay(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <!-- Sun in background -->
        <circle cx="21" cy="11" r="5.5" fill="#FFA000" />
        <g stroke="#FFB300" stroke-width="1.8" stroke-linecap="round">
          <line x1="21" y1="2" x2="21" y2="4" />
          <line x1="28" y1="11" x2="30" y2="11" />
          <line x1="26" y1="6" x2="27.5" y2="4.5" />
          <line x1="26" y1="16" x2="27.5" y2="17.5" />
        </g>
        <!-- Cloud in foreground -->
        <path d="M8.5 25C6 25 4 23 4 20.5C4 18.2 5.6 16.3 7.8 16.1C8.6 12.6 11.8 10 15.5 10C19.8 10 23.3 13.2 23.5 17.5C25.5 17.8 27 19.5 27 21.5C27 23.8 25.2 25 23 25L8.5 25Z" fill="url(#pcloud-grad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <defs>
          <linearGradient id="pcloud-grad" x1="4" y1="10" x2="27" y2="25" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#CFD8DC" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgPartlyCloudyNight(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <!-- Moon behind -->
        <path d="M23 14C22.6 17.5 19.5 20.2 16 20.2C14.8 20.2 13.6 19.8 12.6 19.2C13.2 17.2 14.5 15.4 16.5 14.4C18.2 13.6 20 13.4 21.6 13.8C22.2 13.3 22.8 13.6 23 14Z" fill="#FFE082" />
        <circle cx="21" cy="7" r="4.5" fill="#FFE082" />
        <!-- Cloud in front -->
        <path d="M8.5 25C6 25 4 23 4 20.5C4 18.2 5.6 16.3 7.8 16.1C8.6 12.6 11.8 10 15.5 10C19.8 10 23.3 13.2 23.5 17.5C25.5 17.8 27 19.5 27 21.5C27 23.8 25.2 25 23 25L8.5 25Z" fill="url(#pcloud-night)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
        <defs>
          <linearGradient id="pcloud-night" x1="4" y1="10" x2="27" y2="25" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECEFF1" />
            <stop offset="1" stop-color="#90A4AE" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgCloudy(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M19 19C17.5 19 16.2 18.2 15.5 17C14.5 17.6 13.3 18 12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C14.7 6 17 7.8 17.7 10.3C18.4 10.1 19.2 10 20 10C23.3 10 26 12.7 26 16C26 17.7 25.3 19 24.2 19.8C23.6 19.9 23 20 22.5 20L19 19Z" fill="#B0BEC5" opacity="0.6"/>
        <path d="M8.5 26C6 26 4 24 4 21.5C4 19.2 5.6 17.3 7.8 17.1C8.6 13.6 11.8 11 15.5 11C19.8 11 23.3 14.2 23.5 18.5C25.5 18.8 27 20.5 27 22.5C27 24.8 25.2 26 23 26L8.5 26Z" fill="url(#cloud-main)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <defs>
          <linearGradient id="cloud-main" x1="4" y1="11" x2="27" y2="26" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#CFD8DC" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgRain(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 21C6 21 4 19 4 16.5C4 14.2 5.6 12.3 7.8 12.1C8.6 8.6 11.8 6 15.5 6C19.8 6 23.3 9.2 23.5 13.5C25.5 13.8 27 15.5 27 17.5C27 19.8 25.2 21 23 21L8.5 21Z" fill="url(#cloud-rain)" />
        <!-- Rain Drops -->
        <line x1="10" y1="23" x2="8" y2="27" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <line x1="16" y1="23" x2="14" y2="27" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <line x1="22" y1="23" x2="20" y2="27" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-rain" x1="4" y1="6" x2="27" y2="21" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECEFF1" />
            <stop offset="1" stop-color="#90A4AE" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgPouring(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 20C6 20 4 18 4 15.5C4 13.2 5.6 11.3 7.8 11.1C8.6 7.6 11.8 5 15.5 5C19.8 5 23.3 8.2 23.5 12.5C25.5 12.8 27 14.5 27 16.5C27 18.8 25.2 20 23 20L8.5 20Z" fill="url(#cloud-dark)" />
        <!-- Heavy Rain Streaks -->
        <line x1="9" y1="22" x2="6" y2="28" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="14" y1="22" x2="11" y2="28" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <line x1="19" y1="22" x2="16" y2="28" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="24" y1="22" x2="21" y2="28" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-dark" x1="4" y1="5" x2="27" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B0BEC5" />
            <stop offset="1" stop-color="#607D8B" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgThunderstorm(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 19C6 19 4 17 4 14.5C4 12.2 5.6 10.3 7.8 10.1C8.6 6.6 11.8 4 15.5 4C19.8 4 23.3 7.2 23.5 11.5C25.5 11.8 27 13.5 27 15.5C27 17.8 25.2 19 23 19L8.5 19Z" fill="url(#cloud-storm)" />
        <!-- Lightning bolt -->
        <polygon points="17,17 12,24 16,24 14,29 20,22 16,22" fill="#FFD600" stroke="#FFAB00" stroke-width="0.5" filter="drop-shadow(0 0 3px rgba(255,214,0,0.8))"/>
        <!-- Rain Drops -->
        <line x1="9" y1="22" x2="7" y2="26" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" />
        <line x1="23" y1="22" x2="21" y2="26" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-storm" x1="4" y1="4" x2="27" y2="19" gradientUnits="userSpaceOnUse">
            <stop stop-color="#90A4AE" />
            <stop offset="1" stop-color="#455A64" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgSnow(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 20C6 20 4 18 4 15.5C4 13.2 5.6 11.3 7.8 11.1C8.6 7.6 11.8 5 15.5 5C19.8 5 23.3 8.2 23.5 12.5C25.5 12.8 27 14.5 27 16.5C27 18.8 25.2 20 23 20L8.5 20Z" fill="url(#cloud-snow)" />
        <circle cx="10" cy="24" r="1.5" fill="#FFFFFF" filter="drop-shadow(0 0 2px #fff)" />
        <circle cx="16" cy="26" r="1.5" fill="#FFFFFF" filter="drop-shadow(0 0 2px #fff)" />
        <circle cx="22" cy="24" r="1.5" fill="#FFFFFF" filter="drop-shadow(0 0 2px #fff)" />
        <defs>
          <linearGradient id="cloud-snow" x1="4" y1="5" x2="27" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#CFD8DC" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgSleet(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 20C6 20 4 18 4 15.5C4 13.2 5.6 11.3 7.8 11.1C8.6 7.6 11.8 5 15.5 5C19.8 5 23.3 8.2 23.5 12.5C25.5 12.8 27 14.5 27 16.5C27 18.8 25.2 20 23 20L8.5 20Z" fill="url(#cloud-sleet)" />
        <line x1="10" y1="22" x2="8" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <circle cx="16" cy="24" r="1.5" fill="#FFFFFF" />
        <line x1="22" y1="22" x2="20" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-sleet" x1="4" y1="5" x2="27" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECEFF1" />
            <stop offset="1" stop-color="#90A4AE" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private svgFog(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="10" width="22" height="2.5" rx="1.25" fill="#ECEFF1" opacity="0.9" />
        <rect x="3" y="15" width="26" height="2.5" rx="1.25" fill="#CFD8DC" opacity="0.9" />
        <rect x="6" y="20" width="20" height="2.5" rx="1.25" fill="#B0BEC5" opacity="0.9" />
      </svg>
    `;
  }

  private svgWind(w: number, h: number): TemplateResult {
    return html`
      <svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
        <path d="M4 12H18C20.2 12 22 10.2 22 8C22 5.8 20.2 4 18 4C15.8 4 14 5.8 14 8" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 17H23C25.2 17 27 18.8 27 21C27 23.2 25.2 25 23 25C20.8 25 19 23.2 19 21" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
        <path d="M6 22H14C15.1 22 16 22.9 16 24C16 25.1 15.1 26 14 26C12.9 26 12 25.1 12 24" stroke="#B3E5FC" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }
}
