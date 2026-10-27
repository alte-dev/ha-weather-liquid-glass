import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ios27-sky-animation')
export class Ios27SkyAnimation extends LitElement {
  @property() public condition: string = 'sunny';
  @property({ type: Boolean }) public isNight: boolean = false;
  @property({ reflect: true }) public layer: 'back' | 'front' | 'all' = 'all';

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .sky-stage {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    /* =========================================
       CLOUDY / OVERCAST REALISTIC ANIMATION
       ========================================= */
    .cloud-canvas {
      position: absolute;
      top: -30px;
      left: 0;
      width: 200%;
      height: 240px;
      pointer-events: none;
    }

    /* Cloud layer 1: Slow background heavy cloud mass */
    .cloud-back {
      animation: driftClouds 65s linear infinite;
      opacity: 0.35;
      filter: blur(14px);
    }

    /* Cloud layer 2: Mid-ground billowy cloud formation */
    .cloud-mid {
      top: -10px;
      animation: driftClouds 42s linear infinite reverse;
      opacity: 0.45;
      filter: blur(8px);
    }

    /* Cloud layer 3: Foreground softer drifting mists */
    .cloud-front {
      top: 10px;
      animation: driftClouds 28s linear infinite;
      opacity: 0.3;
      filter: blur(5px);
    }

    @keyframes driftClouds {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-50%, 0, 0);
      }
    }

    /* =========================================
       RAIN ANIMATION (SUBTLE APPLE WEATHER TOP SKY BEHIND LOCATION)
       ========================================= */
    .rain-top-stage {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 240px;
      overflow: hidden;
      pointer-events: none;
      -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
    }

    .rain-streak {
      position: absolute;
      top: -50px;
      width: 1px;
      border-radius: 1px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.75) 100%);
      animation: rainFallTop linear infinite;
      pointer-events: none;
    }

    @keyframes rainFallTop {
      0% {
        transform: translateY(0) translateX(0) rotate(8deg);
      }
      100% {
        transform: translateY(300px) translateX(-42px) rotate(8deg);
      }
    }

    /* =========================================
       SNOW ANIMATION (ATMOSPHERIC TOP SKY BEHIND LOCATION)
       ========================================= */
    .snow-top-stage {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 250px;
      overflow: hidden;
      pointer-events: none;
      -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 100%);
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 100%);
    }

    .snowflake {
      position: absolute;
      top: -30px;
      background: #ffffff;
      border-radius: 50%;
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.85));
      animation: snowDriftTop linear infinite;
      pointer-events: none;
    }

    @keyframes snowDriftTop {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0.95;
      }
      50% {
        transform: translateY(140px) translateX(15px);
        opacity: 0.9;
      }
      100% {
        transform: translateY(300px) translateX(-10px);
        opacity: 0.2;
      }
    }

    /* Subtle top vignette for crystal-clear text contrast on light/sunny skies */
    .sky-vignette {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 240px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.12) 50%, rgba(0, 0, 0, 0) 100%);
      pointer-events: none;
      z-index: 2;
    }

    /* =========================================
       SUNNY / SUN HALO ANIMATION
       ========================================= */
    .sun-halo {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(255, 230, 140, 0.26) 0%, rgba(255, 190, 40, 0.12) 45%, rgba(255, 255, 255, 0) 75%);
      border-radius: 50%;
      animation: sunPulse 7s ease-in-out infinite alternate;
      filter: blur(16px);
    }

    .sun-flare {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 170px;
      height: 170px;
      background: radial-gradient(circle, rgba(255, 250, 220, 0.32) 0%, rgba(255, 255, 255, 0) 65%);
      border-radius: 50%;
      filter: blur(12px);
    }

    @keyframes sunPulse {
      0% {
        transform: translateX(-50%) scale(0.95);
        opacity: 0.75;
      }
      100% {
        transform: translateX(-50%) scale(1.15);
        opacity: 1;
      }
    }

    /* =========================================
       NIGHT & STARS ANIMATION
       ========================================= */
    .star {
      position: absolute;
      background: #ffffff;
      border-radius: 50%;
      animation: starTwinkle 3.5s ease-in-out infinite alternate;
    }

    @keyframes starTwinkle {
      0%, 100% {
        opacity: 0.2;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.95;
        transform: scale(1.2);
        box-shadow: 0 0 4px #ffffff;
      }
    }

    .moon-glow {
      position: absolute;
      top: -30px;
      right: 15%;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(224, 242, 254, 0.25) 0%, rgba(186, 230, 253, 0.08) 50%, transparent 75%);
      border-radius: 50%;
      filter: blur(12px);
    }

    /* =========================================
       THUNDERSTORM LIGHTNING FLASH
       ========================================= */
    .lightning-flash {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.6);
      opacity: 0;
      animation: lightning 8s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes lightning {
      0%, 94%, 98%, 100% {
        opacity: 0;
      }
      95% {
        opacity: 0.7;
      }
      96% {
        opacity: 0.1;
      }
      97% {
        opacity: 0.9;
      }
    }
  `;

  public render(): TemplateResult {
    const s = (this.condition || '').toLowerCase().replace(/_/g, '-');
    const isNight = this.isNight;
    const isRain = s.includes('rain') || s.includes('pouring') || s.includes('drizzle') || s.includes('thunder') || s.includes('lightning');
    const isSnow = s.includes('snow') || s.includes('sleet') || s.includes('hail');

    if (s.includes('thunder') || s.includes('lightning')) {
      return this.renderThunderstorm(isNight);
    }
    if (isRain) {
      return this.renderRain(isNight);
    }
    if (isSnow) {
      return this.renderSnow(isNight);
    }
    if (isNight) {
      return this.renderNight(s);
    }
    if (s.includes('partly')) {
      return this.renderPartlyCloudy();
    }
    if (s.includes('cloud') || s === 'overcast' || s.includes('fog')) {
      return this.renderCloudy();
    }
    return this.renderSunny();
  }

  /* Rain Animation (Storm Clouds in Background + Top Rain Streaks behind Location) */
  private renderRain(isNight: boolean = false): TemplateResult {
    return html`
      <div class="sky-stage">
        ${isNight ? html`<div class="moon-glow" style="opacity: 0.35;"></div>` : this.renderCloudsContent()}
        ${this.renderTopRain()}
      </div>
    `;
  }

  /* Thunderstorm Animation: Clouds + Lightning Sheet Flash + Top Rain */
  private renderThunderstorm(isNight: boolean = false): TemplateResult {
    return html`
      <div class="sky-stage">
        ${isNight ? html`<div class="moon-glow" style="opacity: 0.35;"></div>` : this.renderCloudsContent()}
        <div class="lightning-flash"></div>
        ${this.renderTopRain()}
      </div>
    `;
  }

  /* Snow Animation: Clouds + Gentle Drifting Snow in Top Sky */
  private renderSnow(isNight: boolean = false): TemplateResult {
    return html`
      <div class="sky-stage">
        ${isNight ? html`<div class="moon-glow" style="opacity: 0.35;"></div>` : this.renderCloudsContent()}
        ${this.renderTopSnow()}
      </div>
    `;
  }

  /* Rain Streaks in the Top Sky Area (Subtle, fine authentic Apple Weather rain) */
  private renderTopRain(): TemplateResult {
    const streaks = [
      { left: '2%', height: '32px', delay: '-0.12s', duration: '0.72s', width: '1px', opacity: '0.45' },
      { left: '4%', height: '24px', delay: '-0.45s', duration: '0.80s', width: '0.8px', opacity: '0.35' },
      { left: '7%', height: '42px', delay: '-0.28s', duration: '0.68s', width: '1.1px', opacity: '0.6' },
      { left: '9%', height: '28px', delay: '-0.65s', duration: '0.75s', width: '0.9px', opacity: '0.4' },
      { left: '12%', height: '36px', delay: '-0.18s', duration: '0.70s', width: '1px', opacity: '0.5' },
      { left: '14%', height: '22px', delay: '-0.52s', duration: '0.82s', width: '0.8px', opacity: '0.35' },
      { left: '17%', height: '44px', delay: '-0.05s', duration: '0.66s', width: '1.1px', opacity: '0.55' },
      { left: '19%', height: '30px', delay: '-0.38s', duration: '0.74s', width: '1px', opacity: '0.45' },
      { left: '22%', height: '26px', delay: '-0.72s', duration: '0.78s', width: '0.8px', opacity: '0.35' },
      { left: '25%', height: '40px', delay: '-0.22s', duration: '0.69s', width: '1px', opacity: '0.5' },
      { left: '27%', height: '34px', delay: '-0.58s', duration: '0.73s', width: '0.9px', opacity: '0.4' },
      { left: '30%', height: '46px', delay: '-0.14s', duration: '0.67s', width: '1.2px', opacity: '0.6' },
      { left: '32%', height: '25px', delay: '-0.48s', duration: '0.81s', width: '0.8px', opacity: '0.35' },
      { left: '35%', height: '38px', delay: '-0.31s', duration: '0.71s', width: '1px', opacity: '0.5' },
      { left: '38%', height: '28px', delay: '-0.62s', duration: '0.76s', width: '0.9px', opacity: '0.4' },
      { left: '40%', height: '44px', delay: '-0.08s', duration: '0.68s', width: '1.1px', opacity: '0.55' },
      { left: '43%', height: '32px', delay: '-0.42s', duration: '0.74s', width: '1px', opacity: '0.45' },
      { left: '45%', height: '22px', delay: '-0.75s', duration: '0.83s', width: '0.8px', opacity: '0.35' },
      { left: '48%', height: '42px', delay: '-0.25s', duration: '0.70s', width: '1.1px', opacity: '0.55' },
      { left: '51%', height: '35px', delay: '-0.55s', duration: '0.72s', width: '1px', opacity: '0.45' },
      { left: '53%', height: '27px', delay: '-0.16s', duration: '0.79s', width: '0.8px', opacity: '0.35' },
      { left: '56%', height: '45px', delay: '-0.35s', duration: '0.67s', width: '1.2px', opacity: '0.6' },
      { left: '58%', height: '30px', delay: '-0.68s', duration: '0.75s', width: '0.9px', opacity: '0.4' },
      { left: '61%', height: '36px', delay: '-0.04s', duration: '0.71s', width: '1px', opacity: '0.5' },
      { left: '64%', height: '24px', delay: '-0.46s', duration: '0.80s', width: '0.8px', opacity: '0.35' },
      { left: '66%', height: '43px', delay: '-0.29s', duration: '0.69s', width: '1.1px', opacity: '0.55' },
      { left: '69%', height: '31px', delay: '-0.61s', duration: '0.73s', width: '1px', opacity: '0.45' },
      { left: '72%', height: '26px', delay: '-0.19s', duration: '0.78s', width: '0.8px', opacity: '0.35' },
      { left: '74%', height: '40px', delay: '-0.51s', duration: '0.70s', width: '1px', opacity: '0.5' },
      { left: '77%', height: '33px', delay: '-0.11s', duration: '0.72s', width: '0.9px', opacity: '0.4' },
      { left: '80%', height: '45px', delay: '-0.41s', duration: '0.66s', width: '1.1px', opacity: '0.6' },
      { left: '82%', height: '25px', delay: '-0.74s', duration: '0.81s', width: '0.8px', opacity: '0.35' },
      { left: '85%', height: '37px', delay: '-0.21s', duration: '0.71s', width: '1px', opacity: '0.5' },
      { left: '87%', height: '29px', delay: '-0.57s', duration: '0.76s', width: '0.9px', opacity: '0.4' },
      { left: '90%', height: '42px', delay: '-0.07s', duration: '0.68s', width: '1.1px', opacity: '0.55' },
      { left: '93%', height: '31px', delay: '-0.39s', duration: '0.74s', width: '1px', opacity: '0.45' },
      { left: '95%', height: '23px', delay: '-0.71s', duration: '0.82s', width: '0.8px', opacity: '0.35' },
      { left: '97%', height: '38px', delay: '-0.24s', duration: '0.70s', width: '1px', opacity: '0.5' },
    ];

    return html`
      <div class="rain-top-stage">
        ${streaks.map(st => html`
          <div
            class="rain-streak"
            style="left: ${st.left}; height: ${st.height}; width: ${st.width}; animation-delay: ${st.delay}; animation-duration: ${st.duration}; opacity: ${st.opacity};"
          ></div>
        `)}
      </div>
    `;
  }

  /* Snow in Top Sky Area */
  private renderTopSnow(): TemplateResult {
    const flakes = [
      { left: '4%', size: '5px', duration: '4.5s', delay: '-0.5s', opacity: '0.9' },
      { left: '9%', size: '7px', duration: '6.2s', delay: '-2.1s', opacity: '0.95' },
      { left: '15%', size: '4px', duration: '4.8s', delay: '-3.7s', opacity: '0.85' },
      { left: '22%', size: '6px', duration: '5.5s', delay: '-1.4s', opacity: '0.9' },
      { left: '29%', size: '5px', duration: '6.8s', delay: '-4.2s', opacity: '0.9' },
      { left: '36%', size: '8px', duration: '5.1s', delay: '-0.9s', opacity: '0.95' },
      { left: '43%', size: '4px', duration: '4.9s', delay: '-3.1s', opacity: '0.85' },
      { left: '50%', size: '6px', duration: '6.5s', delay: '-2.6s', opacity: '0.9' },
      { left: '57%', size: '5px', duration: '5.2s', delay: '-1.8s', opacity: '0.9' },
      { left: '64%', size: '7px', duration: '6.0s', delay: '-3.4s', opacity: '0.95' },
      { left: '71%', size: '4px', duration: '4.6s', delay: '-0.7s', opacity: '0.85' },
      { left: '78%', size: '6px', duration: '5.8s', delay: '-2.9s', opacity: '0.9' },
      { left: '85%', size: '5px', duration: '6.4s', delay: '-1.2s', opacity: '0.9' },
      { left: '92%', size: '7px', duration: '5.4s', delay: '-3.8s', opacity: '0.95' },
    ];

    return html`
      <div class="snow-top-stage">
        ${flakes.map(fl => html`
          <div
            class="snowflake"
            style="left: ${fl.left}; width: ${fl.size}; height: ${fl.size}; animation-duration: ${fl.duration}; animation-delay: ${fl.delay}; opacity: ${fl.opacity};"
          ></div>
        `)}
      </div>
    `;
  }

  /* Shared Cloud Canvas Layers */
  private renderCloudsContent(): TemplateResult {
    const darkCloudSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300' fill='%2364748b'><ellipse cx='120' cy='220' rx='160' ry='110'/><ellipse cx='320' cy='180' rx='190' ry='130'/><ellipse cx='520' cy='200' rx='170' ry='120'/><ellipse cx='720' cy='160' rx='200' ry='140'/><ellipse cx='920' cy='210' rx='160' ry='110'/><ellipse cx='1120' cy='190' rx='180' ry='120'/></svg>")`;
    const lightCloudSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300' fill='%2394a3b8'><ellipse cx='160' cy='240' rx='140' ry='90'/><ellipse cx='380' cy='210' rx='160' ry='110'/><ellipse cx='600' cy='230' rx='150' ry='100'/><ellipse cx='820' cy='200' rx='170' ry='120'/><ellipse cx='1040' cy='220' rx='150' ry='100'/></svg>")`;

    return html`
      <div class="cloud-canvas cloud-back" style="background-image: ${darkCloudSvg};"></div>
      <div class="cloud-canvas cloud-mid" style="background-image: ${lightCloudSvg};"></div>
      <div class="cloud-canvas cloud-front" style="background-image: ${darkCloudSvg};"></div>
    `;
  }

  /* Background Cloudy Sky */
  private renderCloudy(): TemplateResult {
    return html`
      <div class="sky-stage">
        ${this.renderCloudsContent()}
      </div>
    `;
  }

  /* Partly Cloudy Background */
  private renderPartlyCloudy(): TemplateResult {
    const softCloudSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 260' fill='rgba(255,255,255,0.7)'><circle cx='140' cy='180' r='90'/><circle cx='280' cy='140' r='110'/><circle cx='460' cy='160' r='100'/><circle cx='640' cy='130' r='120'/><circle cx='800' cy='170' r='90'/><circle cx='980' cy='150' r='110'/></svg>")`;

    return html`
      <div class="sky-stage">
        <div class="sky-vignette"></div>
        <div class="sun-halo" style="opacity: 0.4; top: -85px;"></div>
        <div class="cloud-canvas cloud-back" style="background-image: ${softCloudSvg}; opacity: 0.18; top: 15px;"></div>
        <div class="cloud-canvas cloud-front" style="background-image: ${softCloudSvg}; opacity: 0.24; top: 30px;"></div>
      </div>
    `;
  }

  /* Sunny / Clear Background */
  private renderSunny(): TemplateResult {
    return html`
      <div class="sky-stage">
        <div class="sky-vignette"></div>
        <div class="sun-halo"></div>
        <div class="sun-flare"></div>
      </div>
    `;
  }

  /* Night Sky with Twinkling Stars Background */
  private renderNight(condition: string): TemplateResult {
    const stars = [
      { top: '8%', left: '12%', size: '2px', delay: '0s' },
      { top: '15%', left: '32%', size: '3px', delay: '1.2s' },
      { top: '22%', left: '78%', size: '1.5px', delay: '0.4s' },
      { top: '28%', left: '48%', size: '2.5px', delay: '2.1s' },
      { top: '35%', left: '88%', size: '3px', delay: '0.8s' },
      { top: '42%', left: '18%', size: '2px', delay: '1.5s' },
      { top: '55%', left: '62%', size: '2.5px', delay: '2.7s' },
      { top: '65%', left: '28%', size: '1.5px', delay: '0.9s' },
      { top: '75%', left: '82%', size: '3px', delay: '1.8s' },
      { top: '85%', left: '15%', size: '2px', delay: '2.4s' },
    ];

    return html`
      <div class="sky-stage">
        <div class="moon-glow"></div>
        ${stars.map(st => html`
          <div
            class="star"
            style="top: ${st.top}; left: ${st.left}; width: ${st.size}; height: ${st.size}; animation-delay: ${st.delay};"
          ></div>
        `)}
        ${condition.includes('cloud') ? this.renderCloudsContent() : ''}
      </div>
    `;
  }
}
