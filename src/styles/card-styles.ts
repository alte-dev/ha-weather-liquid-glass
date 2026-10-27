import { css } from 'lit';

export const cardStyles = css`
  :host {
    --ios-font: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    --ios-glass-bg: rgba(255, 255, 255, 0.16);
    --ios-glass-bg-hover: rgba(255, 255, 255, 0.22);
    --ios-glass-border: rgba(255, 255, 255, 0.22);
    --ios-glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.28);
    --ios-text-primary: #ffffff;
    --ios-text-secondary: rgba(255, 255, 255, 0.72);
    --ios-text-tertiary: rgba(255, 255, 255, 0.5);
    --ios-blue-accent: #38bdf8;
    --ios-cyan-wind: #22d3ee;
    --ios-pill-active: rgba(255, 255, 255, 0.32);
    --ios-divider: rgba(255, 255, 255, 0.14);
    display: block;
    font-family: var(--ios-font);
    color: var(--ios-text-primary);
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
  }

  * {
    box-sizing: border-box;
  }

  .ios27-container {
    position: relative;
    border-radius: 28px;
    padding: 24px 18px 20px 18px;
    overflow: hidden;
    min-height: 440px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    transition: background 0.8s ease;
  }

  .ios27-container.transparent-bg {
    background: transparent !important;
    box-shadow: none !important;
    padding: 12px 6px;
  }

  /* Internal Scroll Wrapper for Scrollable layouts */
  .ios27-scroll-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 18px 20px 18px;
    width: 100%;
    box-sizing: border-box;
  }

  /* ----------------------------------------------------
     LAYOUT: SQUARE SCROLLABLE & SQUARE FIT (Strict 1:1 Aspect Ratio)
     ---------------------------------------------------- */
  .ios27-container.layout-square-scroll,
  .ios27-container.layout-square,
  .ios27-container.layout-square-fit {
    aspect-ratio: 1 / 1 !important;
    min-height: 0 !important;
    height: auto !important;
    max-height: none !important;
    padding: 0 !important;
  }

  .ios27-container.is-scrollable:not(.layout-square-scroll):not(.layout-square):not(.layout-square-fit) {
    padding: 0 !important;
  }

  .ios27-container.layout-square-scroll .ios27-scroll-wrapper,
  .ios27-container.layout-square .ios27-scroll-wrapper,
  .ios27-container.is-scrollable .ios27-scroll-wrapper {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
  }

  .ios27-container.layout-square-scroll .ios27-scroll-wrapper,
  .ios27-container.layout-square .ios27-scroll-wrapper {
    padding: 14px 14px 20px 14px !important;
    gap: 12px !important;
    scrollbar-width: none; /* Hide default scrollbar bar for clean iOS look */
  }

  .ios27-container.layout-square-scroll .ios27-scroll-wrapper::-webkit-scrollbar,
  .ios27-container.layout-square .ios27-scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  /* Compact Refined Hero Header inside Square Layout */
  .ios27-container.layout-square-scroll .ios-header,
  .ios27-container.layout-square .ios-header {
    padding: 4px 0 2px 0;
    gap: 2px;
  }

  .ios27-container.layout-square-scroll .ios-header-location-row,
  .ios27-container.layout-square .ios-header-location-row {
    margin-bottom: 2px;
    gap: 5px;
  }

  .ios27-container.layout-square-scroll .ios-location-name,
  .ios27-container.layout-square .ios-location-name {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.35);
  }

  .ios27-container.layout-square-scroll .ios-nav-arrow,
  .ios27-container.layout-square .ios-nav-arrow {
    width: 13px;
    height: 13px;
  }

  .ios27-container.layout-square-scroll .ios-current-temp,
  .ios27-container.layout-square .ios-current-temp {
    font-size: 60px;
    font-weight: 200;
    letter-spacing: -2px;
    margin: 2px 0 2px 0;
    padding-left: 0;
    line-height: 1;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.25);
  }

  /* Condition & High/Low unified on ONE sleek horizontal row */
  .ios27-container.layout-square-scroll .ios-condition-row,
  .ios27-container.layout-square .ios-condition-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin: 2px 0 0 0;
  }

  .ios27-container.layout-square-scroll .ios-condition-text,
  .ios27-container.layout-square .ios-condition-text {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.98);
    margin: 0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios27-container.layout-square-scroll .ios-high-low,
  .ios27-container.layout-square .ios-high-low {
    font-size: 13.5px;
    font-weight: 500;
    opacity: 0.95;
    margin: 0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios27-container.layout-square-scroll .ios-high-low::before,
  .ios27-container.layout-square .ios-high-low::before {
    content: "· ";
    opacity: 0.7;
    font-weight: bold;
    margin-right: 2px;
  }

  .ios27-container.layout-square-scroll .ios-condition-summary,
  .ios27-container.layout-square .ios-condition-summary {
    font-size: 11px;
    margin-top: 2px;
    line-height: 1.25;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* Compact Highlights Card inside Square Layout (if visible) */
  .ios27-container.layout-square-scroll .ios-highlights-card,
  .ios27-container.layout-square .ios-highlights-card {
    padding: 6px 12px;
    gap: 3px;
    border-radius: 14px;
    background: rgba(15, 23, 42, 0.22);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.28);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.25);
  }

  .ios27-container.layout-square-scroll .ios-highlights-header,
  .ios27-container.layout-square .ios-highlights-header {
    font-size: 9.5px;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  .ios27-container.layout-square-scroll .ios-highlights-body,
  .ios27-container.layout-square .ios-highlights-body {
    font-size: 11px;
    line-height: 1.25;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  /* Compact Glass Forecast Card inside Square Layout */
  /* Compact Glass Forecast Card inside Square Layout */
  .ios27-container.layout-square-scroll .ios-glass-card,
  .ios27-container.layout-square .ios-glass-card {
    padding: 12px 14px 14px 14px;
    gap: 10px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 4px 22px rgba(0, 0, 0, 0.18);
  }

  .ios27-container.layout-square-scroll .ios-forecast-card-header,
  .ios27-container.layout-square .ios-forecast-card-header {
    padding: 0 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .ios27-container.layout-square-scroll .ios-forecast-title,
  .ios27-container.layout-square .ios-forecast-title {
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  .ios27-container.layout-square-scroll .ios-forecast-subtitle,
  .ios27-container.layout-square .ios-forecast-subtitle {
    display: none !important;
  }

  .ios27-container.layout-square-scroll .ios-segmented-control,
  .ios27-container.layout-square .ios-segmented-control {
    padding: 2.5px;
    gap: 3px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.24);
    border: 1px solid rgba(255, 255, 255, 0.16);
  }

  .ios27-container.layout-square-scroll .ios-segment-button,
  .ios27-container.layout-square .ios-segment-button {
    width: 32px;
    height: 24px;
    border-radius: 12px;
  }

  .ios27-container.layout-square-scroll .ios-segment-button svg,
  .ios27-container.layout-square .ios-segment-button svg {
    width: 13px;
    height: 13px;
  }

  .ios27-container.layout-square-scroll .ios-divider,
  .ios27-container.layout-square .ios-divider {
    margin: 2px 0;
  }

  .ios27-container.layout-square-scroll .ios-hourly-strip,
  .ios27-container.layout-square .ios-hourly-strip {
    padding: 4px 0 2px 0;
    gap: 8px;
    min-height: 76px;
  }

  .ios27-container.layout-square-scroll .ios-hourly-col,
  .ios27-container.layout-square .ios-hourly-col {
    min-width: 42px;
    gap: 3px;
  }

  .ios27-container.layout-square-scroll .ios-hourly-time,
  .ios27-container.layout-square .ios-hourly-time {
    font-size: 11px;
    font-weight: 500;
  }

  .ios27-container.layout-square-scroll .ios-hourly-icon,
  .ios27-container.layout-square .ios-hourly-icon {
    width: 24px;
    height: 24px;
  }

  .ios27-container.layout-square-scroll .ios-hourly-temp,
  .ios27-container.layout-square .ios-hourly-temp {
    font-size: 13px;
    font-weight: 600;
  }

  .ios27-container.layout-square-scroll .ios-hourly-pop,
  .ios27-container.layout-square .ios-hourly-pop {
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
  }

  .ios27-container.layout-square-scroll .ios-rain-gauge-col,
  .ios27-container.layout-square .ios-rain-gauge-col {
    min-width: 42px;
    height: 78px;
    padding: 1px 0;
  }

  .ios27-container.layout-square-scroll .ios-rain-intensity-bar,
  .ios27-container.layout-square .ios-rain-intensity-bar {
    width: 20px;
    height: 42px;
    border-radius: 10px;
    padding: 1.5px;
  }

  .ios27-container.layout-square-scroll .ios-rain-liquid-fill,
  .ios27-container.layout-square .ios-rain-liquid-fill {
    border-radius: 7px;
  }

  .ios27-container.layout-square-scroll .ios-rain-percent-label,
  .ios27-container.layout-square .ios-rain-percent-label {
    font-size: 10.5px;
  }

  /* Compact 10-Day Daily Forecast inside Square Layout */
  .ios27-container.layout-square-scroll .ios-daily-list,
  .ios27-container.layout-square .ios-daily-list {
    gap: 4px;
    padding: 3px 0;
  }

  .ios27-container.layout-square-scroll .ios-daily-row,
  .ios27-container.layout-square .ios-daily-row {
    font-size: 13px;
    grid-template-columns: 50px 24px 1fr;
    gap: 8px;
    padding: 4.5px 0;
  }

  .ios27-container.layout-square-scroll .ios-day-label,
  .ios27-container.layout-square .ios-day-label {
    font-size: 13px;
    font-weight: 600;
  }

  .ios27-container.layout-square-scroll .ios-daily-icon,
  .ios27-container.layout-square .ios-daily-icon {
    width: 22px;
    height: 22px;
  }

  .ios27-container.layout-square-scroll .ios-daily-icon svg,
  .ios27-container.layout-square .ios-daily-icon svg {
    width: 19px;
    height: 19px;
  }

  .ios27-container.layout-square-scroll .ios-temp-low,
  .ios27-container.layout-square .ios-temp-low {
    font-size: 12.5px;
    min-width: 24px;
  }

  .ios27-container.layout-square-scroll .ios-temp-high,
  .ios27-container.layout-square .ios-temp-high {
    font-size: 13px;
    min-width: 24px;
  }

  .ios27-container.layout-square-scroll .ios-temp-bar-track,
  .ios27-container.layout-square .ios-temp-bar-track {
    height: 5px;
    border-radius: 3px;
  }

  .ios27-container.layout-square-scroll .ios-daily-row--precip,
  .ios27-container.layout-square .ios-daily-row--precip {
    display: flex !important;
    align-items: center;
    gap: 6px;
    width: 100%;
    min-height: 28px !important;
    padding: 4.5px 0;
    box-sizing: border-box;
  }

  .ios27-container.layout-square-scroll .ios-daily-row--precip .ios-day-label,
  .ios27-container.layout-square .ios-daily-row--precip .ios-day-label {
    width: 50px;
    flex: 0 0 50px;
    font-size: 13px;
  }

  .ios27-container.layout-square-scroll .ios-daily-row--wind,
  .ios27-container.layout-square .ios-daily-row--wind {
    display: grid !important;
    grid-template-columns: 50px 1fr !important;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 28px !important;
    padding: 4.5px 0;
    box-sizing: border-box;
  }

  /* Compact Detail Grid inside Square Layout */
  .ios27-container.layout-square-scroll .ios-detail-grid,
  .ios27-container.layout-square .ios-detail-grid {
    gap: 8px;
    margin-top: 0;
    margin-bottom: 4px;
  }

  .ios27-container.layout-square-scroll .ios-detail-tile,
  .ios27-container.layout-square .ios-detail-tile {
    min-height: 115px;
    padding: 9px 10px 8px 10px;
    border-radius: 16px;
  }

  .ios27-container.layout-square-scroll .ios-stat-value,
  .ios27-container.layout-square .ios-stat-value {
    font-size: 20px;
  }

  .ios27-container.layout-square-scroll .ios-tile-header,
  .ios27-container.layout-square .ios-tile-header {
    font-size: 9.5px;
    margin-bottom: 3px;
    letter-spacing: 0.4px;
  }

  .ios27-container.layout-square-scroll .ios-tile-footer,
  .ios27-container.layout-square .ios-tile-footer {
    font-size: 9.5px;
  }

  .ios27-container.layout-square-scroll .ios-compass-dial,
  .ios27-container.layout-square .ios-compass-dial {
    width: 72px;
    height: 72px;
  }

  .ios27-container.layout-square-scroll .ios-moon-container,
  .ios27-container.layout-square .ios-moon-container {
    width: 68px;
    height: 68px;
  }



  /* ----------------------------------------------------
     LAYOUT: SQUARE FIT (1:1 Widget, Perfectly Fitted, Zero Scroll)
     ---------------------------------------------------- */
  .ios27-container.layout-square-fit {
    aspect-ratio: 1 / 1;
    min-height: auto;
    max-height: 420px;
    padding: 16px 18px !important;
    justify-content: space-between;
    gap: 10px;
  }

  .ios-square-fit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
  }

  .ios-square-fit-loc-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .ios-square-fit-loc {
    font-size: 20px;
    font-weight: 600;
    color: var(--ios-text-primary);
    letter-spacing: -0.3px;
  }

  .ios-square-fit-highlow {
    font-size: 13px;
    font-weight: 500;
    color: var(--ios-text-secondary);
    background: rgba(0, 0, 0, 0.22);
    padding: 3px 9px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .ios-square-fit-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
    padding: 2px 0;
  }

  .ios-square-fit-temp-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ios-square-fit-temp {
    font-size: 58px;
    font-weight: 200;
    line-height: 1;
    letter-spacing: -2px;
    color: var(--ios-text-primary);
  }

  .ios-square-fit-condition {
    font-size: 15px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.95;
  }

  .ios-square-fit-icon-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  .ios-square-fit-forecast-box {
    background: var(--ios-glass-bg);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid var(--ios-glass-border);
    border-radius: 20px;
    padding: 10px 8px;
    box-shadow: var(--ios-glass-shadow);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ios-square-fit-hourly-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .ios-square-fit-hour-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
    flex: 1;
  }

  .ios-square-fit-hour-time {
    font-size: 11px;
    font-weight: 500;
    color: var(--ios-text-secondary);
  }

  .ios-square-fit-hour-temp {
    font-size: 13px;
    font-weight: 600;
    color: var(--ios-text-primary);
  }

  .ios-square-fit-hour-pop {
    font-size: 10px;
    font-weight: 600;
    color: var(--ios-blue-accent);
  }

  /* ----------------------------------------------------
     LAYOUT: COMPACT (Rectangle Horizontal Card)
     ---------------------------------------------------- */
  .ios27-container.layout-compact {
    min-height: auto;
    padding: 16px 18px 14px 18px !important;
    gap: 12px;
  }

  .ios27-container.layout-compact .ios-header {
    display: grid !important;
    grid-template-columns: auto 1fr auto !important;
    grid-template-areas:
      "loc loc temp"
      "cond hl temp" !important;
    align-items: center !important;
    text-align: left !important;
    padding: 0 4px !important;
    margin-bottom: 2px !important;
    column-gap: 8px !important;
    row-gap: 3px !important;
  }

  .ios27-container.layout-compact .ios-header-location-row {
    grid-area: loc !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    margin: 0 !important;
  }

  .ios27-container.layout-compact .ios-location-name {
    font-size: 22px !important;
    font-weight: 600 !important;
    color: var(--ios-text-primary) !important;
    letter-spacing: -0.3px !important;
  }

  .ios27-container.layout-compact .ios-condition-text {
    grid-area: cond !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: var(--ios-text-primary) !important;
    opacity: 0.92 !important;
    margin: 0 !important;
    white-space: nowrap !important;
  }

  .ios27-container.layout-compact .ios-high-low {
    grid-area: hl !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    color: var(--ios-text-secondary) !important;
    margin: 0 !important;
    white-space: nowrap !important;
  }

  .ios27-container.layout-compact .ios-current-temp {
    grid-area: temp !important;
    font-size: 52px !important;
    font-weight: 200 !important;
    line-height: 1 !important;
    letter-spacing: -2px !important;
    margin: 0 !important;
    padding: 0 0 0 12px !important;
    text-align: right !important;
  }

  .ios27-container.layout-compact .ios-condition-summary {
    display: none !important;
  }

  .ios27-container.layout-compact .ios-daily-list,
  .ios27-container.layout-compact .ios-bottom-bar,
  .ios27-container.layout-compact .ios-highlights-card {
    display: none !important;
  }

  .ios27-container.layout-compact .ios-glass-card {
    padding: 12px 14px;
    gap: 10px;
  }

  /* ----------------------------------------------------
     LAYOUT: MINI (Minimalist Widget, ~130px)
     ---------------------------------------------------- */
  .ios27-container.layout-mini {
    min-height: auto;
    padding: 16px 20px !important;
    border-radius: 22px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  }

  .ios-mini-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .ios-mini-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ios-mini-loc {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--ios-text-primary);
  }

  .ios-mini-condition {
    font-size: 14px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.95;
  }

  .ios-mini-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 2px;
  }

  .ios-mini-highlow {
    font-size: 13px;
    font-weight: 500;
    color: var(--ios-text-secondary);
  }

  .ios-mini-pill {
    font-size: 11px;
    font-weight: 600;
    color: var(--ios-blue-accent);
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 2px 7px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }

  .ios-mini-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ios-mini-temp {
    font-size: 52px;
    font-weight: 200;
    line-height: 1;
    letter-spacing: -2px;
    color: var(--ios-text-primary);
  }

  /* Centered Apple Header */
  .ios-header {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0 8px 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  }

  .ios-header-location-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 2px;
  }

  .ios-location-name {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.4px;
    color: var(--ios-text-primary);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.35);
  }

  .ios-nav-arrow {
    width: 14px;
    height: 14px;
    fill: currentColor;
    opacity: 0.85;
  }

  .ios-current-temp {
    font-size: 78px;
    font-weight: 200;
    line-height: 1;
    letter-spacing: -2px;
    margin: 4px 0 6px 0;
    padding-left: 12px;
    color: var(--ios-text-primary);
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), 0 4px 18px rgba(0, 0, 0, 0.3);
  }

  .ios-condition-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .ios-condition-text {
    font-size: 19px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.98;
    margin-bottom: 4px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios-high-low {
    font-size: 16px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.95;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios-condition-summary {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.92);
    margin-top: 6px;
    max-width: 320px;
    line-height: 1.35;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* Highlights Card */
  .ios-highlights-card {
    position: relative;
    z-index: 2;
    background: rgba(15, 23, 42, 0.22);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 20px;
    padding: 12px 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.25);
    display: flex;
    flex-direction: column;
    gap: 6px;
    animation: fadeIn 0.4s ease;
  }

  .ios-highlights-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.92);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  .ios-highlights-title-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ios-highlights-body {
    font-size: 14px;
    line-height: 1.38;
    color: #ffffff;
    font-weight: 400;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  /* Main Weather Glass Card (Holds switcher, hourly strip, 10-day forecast) */
  .ios-glass-card {
    position: relative;
    z-index: 2;
    background: var(--ios-glass-bg);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid var(--ios-glass-border);
    border-radius: 24px;
    padding: 16px;
    box-shadow: var(--ios-glass-shadow);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* Forecast Card Header with Segmented Switcher */
  .ios-forecast-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
  }

  .ios-forecast-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ios-forecast-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--ios-text-primary);
    letter-spacing: -0.2px;
  }

  .ios-forecast-subtitle {
    font-size: 12px;
    color: var(--ios-text-secondary);
    font-weight: 400;
  }

  /* Segmented Pill Switcher */
  .ios-segmented-control {
    display: inline-flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    padding: 3px;
    gap: 2px;
  }

  .ios-segment-button {
    background: transparent;
    border: none;
    border-radius: 20px;
    width: 38px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    outline: none;
    padding: 0;
  }

  .ios-segment-button:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.12);
  }

  .ios-segment-button.active {
    background: rgba(255, 255, 255, 0.35);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }

  .ios-segment-button svg {
    width: 17px;
    height: 17px;
    fill: currentColor;
  }

  /* Divider */
  .ios-divider {
    height: 1px;
    background: var(--ios-divider);
    width: 100%;
    margin: 2px 0;
  }

  /* Hourly Strip */
  .ios-hourly-strip {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 14px;
    padding: 6px 4px 8px 4px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE */
    cursor: grab;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x pan-y;
    user-select: none;
  }

  .ios-hourly-strip:active {
    cursor: grabbing;
  }

  .ios-hourly-strip::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .ios-hourly-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 48px;
    flex: 0 0 auto;
    text-align: center;
    gap: 8px;
  }

  .ios-hourly-time {
    font-size: 13px;
    font-weight: 500;
    color: var(--ios-text-secondary);
  }

  .ios-hourly-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-hourly-temp {
    font-size: 15px;
    font-weight: 600;
    color: var(--ios-text-primary);
  }

  .ios-hourly-pop {
    font-size: 11px;
    font-weight: 600;
    color: var(--ios-blue-accent);
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* Precipitation Hourly View - Apple iOS Capsule Tube */
  .ios-rain-gauge-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 48px;
    height: 94px;
    flex: 0 0 auto;
    padding: 2px 0;
    box-sizing: border-box;
  }

  .ios-rain-intensity-bar {
    width: 22px;
    height: 50px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 11px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    padding: 2px;
    box-sizing: border-box;
  }

  .ios-rain-liquid-fill {
    width: 100%;
    background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
    border-radius: 8px;
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ios-rain-gauge-ticks {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    pointer-events: none;
    padding: 4px 2px;
  }

  .ios-tick-line {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }

  .ios-rain-percent-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    border-top: none;
    padding-top: 0;
  }

  .ios-rain-percent-label.has-rain {
    color: #38bdf8;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
  }

  /* Wind Hourly View */
  .ios-wind-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 48px;
    flex: 0 0 auto;
    gap: 4px;
  }

  .ios-wind-speed-val {
    font-size: 16px;
    font-weight: 600;
    color: var(--ios-text-primary);
  }

  .ios-wind-speed-unit {
    font-size: 11px;
    color: var(--ios-text-secondary);
    margin-top: -2px;
  }

  .ios-wind-wave-container {
    width: 100%;
    height: 40px;
    position: relative;
    margin-top: 6px;
  }

  /* Daily Forecast List Rows */
  .ios-daily-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ios-daily-row {
    display: grid;
    grid-template-columns: 56px 28px 1fr;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 500;
    min-height: 30px;
    box-sizing: border-box;
  }

  .ios-daily-row--precip {
    display: flex !important;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 30px !important;
    box-sizing: border-box;
  }

  .ios-daily-row--precip .ios-day-label {
    width: 56px;
    flex: 0 0 56px;
  }

  .ios-daily-row--wind {
    display: grid !important;
    grid-template-columns: 56px 1fr !important;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 30px !important;
    box-sizing: border-box;
  }

  .ios-day-label {
    color: var(--ios-text-primary);
    font-weight: 600;
  }

  .ios-daily-icon {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Mode 1: Daily Temperature Bar */
  .ios-daily-temp-bar-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ios-temp-low {
    font-size: 14px;
    color: var(--ios-text-secondary);
    min-width: 28px;
    text-align: right;
  }

  .ios-temp-high {
    font-size: 14px;
    color: var(--ios-text-primary);
    min-width: 28px;
    text-align: left;
  }

  .ios-temp-bar-track {
    flex: 1;
    height: 5px;
    background: rgba(0, 0, 0, 0.28);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .ios-temp-bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 4px;
    background: linear-gradient(90deg, #38bdf8 0%, #34d399 25%, #fbbf24 60%, #f97316 85%, #ef4444 100%);
  }

  .ios-temp-current-indicator {
    position: absolute;
    top: 50%;
    width: 7px;
    height: 7px;
    background: #ffffff;
    border: 1.5px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.9);
    z-index: 2;
  }

  /* Mode 2: Daily Precipitation List Row - High Contrast 24h Timeline */
  .ios-daily-rain-container {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    gap: 8px;
  }

  .ios-daily-rain-gauge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 auto;
    min-width: 0;
    height: 20px;
    background: transparent;
    border-radius: 0;
    padding: 0;
    gap: 2px;
  }

  .ios-daily-rain-tick {
    flex: 1 1 0;
    min-width: 0;
    height: 16px;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .ios-daily-rain-fill {
    width: 100%;
    background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
    box-shadow: 0 0 3px rgba(56, 189, 248, 0.7);
    border-radius: 1px;
    transition: height 0.3s ease;
  }

  .ios-daily-rain-tick.current-hour {
    border: 1.5px solid #ffffff !important;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.95), inset 0 0 2px rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.22);
    height: 20px;
    z-index: 2;
    border-radius: 3px;
    overflow: visible;
  }

  .ios-rain-amount {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    text-align: right;
    white-space: nowrap;
    min-width: 48px;
    flex: 0 0 48px;
  }

  .ios-rain-prob {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3px;
    white-space: nowrap;
    min-width: 54px;
    flex: 0 0 54px;
  }

  .ios-rain-prob.has-rain {
    color: #38bdf8;
    font-weight: 600;
    text-shadow: 0 0 6px rgba(56, 189, 248, 0.7);
  }

  /* Mode 3: Daily Wind List Row */
  .ios-daily-wind-container {
    display: grid;
    grid-template-columns: 1fr 78px;
    align-items: center;
    gap: 8px;
  }

  .ios-daily-wind-wave {
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .ios-daily-wind-range {
    font-size: 14px;
    font-weight: 500;
    color: var(--ios-text-primary);
    text-align: right;
  }

  /* Bottom Navigation Bar (iOS Weather Style) */
  .ios-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px 2px 4px;
    margin-top: -4px;
  }

  .ios-bottom-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--ios-glass-bg);
    border: 1px solid var(--ios-glass-border);
    backdrop-filter: blur(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ios-text-primary);
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .ios-bottom-btn:hover {
    background: var(--ios-glass-bg-hover);
    transform: scale(1.05);
  }

  .ios-bottom-btn svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  .ios-pager-pill {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 6px 14px;
    gap: 8px;
    user-select: none;
  }

  .ios-pager-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .ios-pager-dot:hover {
    transform: scale(1.3);
    background: rgba(255, 255, 255, 0.7);
  }

  .ios-pager-dot.active {
    background: #ffffff;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.85);
    transform: scale(1.15);
  }

  .ios-pager-arrow {
    width: 10px;
    height: 10px;
    fill: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: transform 0.2s, fill 0.2s;
  }

  .ios-pager-arrow:hover {
    transform: scale(1.2);
    fill: rgba(255, 255, 255, 0.75);
  }

  .ios-pager-arrow.active {
    fill: #ffffff;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.85));
    transform: scale(1.15);
  }

  /* Location Drawer (Apple Weather Style City List Modal) */
  .ios-location-drawer {
    position: absolute;
    inset: 0;
    z-index: 50;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-radius: 28px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    overflow-y: auto;
    animation: fadeIn 0.2s ease-out;
  }

  .ios-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .ios-drawer-title {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
  }

  .ios-drawer-close-btn {
    padding: 6px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .ios-drawer-close-btn:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .ios-city-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ios-city-card {
    position: relative;
    padding: 14px 16px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
    border: 1px solid rgba(255, 255, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s, border-color 0.2s;
  }

  .ios-city-card:hover {
    transform: scale(1.015);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .ios-city-card.active {
    border-color: #38bdf8;
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.4), inset 0 0 12px rgba(56, 189, 248, 0.15);
  }

  .ios-city-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ios-city-name {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ios-city-condition {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
  }

  .ios-city-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ios-city-temp {
    font-size: 24px;
    font-weight: 300;
    color: #ffffff;
  }

  .ios-city-delete-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: color 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-city-delete-btn:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.2);
  }

  .ios-add-city-section {
    margin-top: 6px;
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .ios-add-city-select {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-radius: 12px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
  }

  .ios-add-city-select option {
    background: #0f172a;
    color: #ffffff;
  }

  .ios-add-city-btn {
    padding: 8px 14px;
    border-radius: 12px;
    background: #0284c7;
    border: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .ios-add-city-btn:hover {
    background: #0369a1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ----------------------------------------------------
     APPLE WEATHER DETAIL TILES (2-Column Grid)
     ---------------------------------------------------- */
  .ios-detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    width: 100%;
    margin-top: 2px;
    margin-bottom: 8px;
  }

  @media (max-width: 280px) {
    .ios-detail-grid {
      grid-template-columns: 1fr;
    }
  }

  .ios-detail-tile {
    background: var(--ios-glass-bg);
    border: 1px solid var(--ios-glass-border);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 20px;
    padding: 13px 13px 11px 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 140px;
    box-shadow: var(--ios-glass-shadow);
    transition: transform 0.2s ease, background 0.2s ease;
    box-sizing: border-box;
  }

  /* Handle odd last tile (e.g. tile #9 - Pressure) so it stretches gracefully across full width */
  .ios-detail-tile:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .ios-detail-tile:last-child:nth-child(odd) .ios-tile-footer {
    text-align: center;
  }

  .ios-detail-tile:hover {
    background: var(--ios-glass-bg-hover);
  }

  .ios-tile-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--ios-text-secondary);
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .ios-tile-icon {
    width: 13px;
    height: 13px;
    fill: currentColor;
    opacity: 0.85;
    flex-shrink: 0;
  }

  .ios-tile-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ios-tile-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .ios-tile-body.center-content {
    align-items: center;
    justify-content: center;
  }

  .ios-stat-value {
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -0.5px;
    line-height: 1.1;
    color: #ffffff;
  }

  .ios-stat-sub {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--ios-text-secondary);
    margin-top: 2px;
  }

  /* Feels Like Gauge */
  .ios-diff-bar-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .ios-diff-track {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .ios-diff-fill {
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: 2px;
  }

  .ios-diff-fill.cooler {
    background: #38bdf8;
  }

  .ios-diff-fill.warmer {
    background: #fb923c;
  }

  .ios-diff-fill.neutral {
    background: rgba(255, 255, 255, 0.6);
  }

  .ios-diff-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 8px;
    white-space: nowrap;
  }

  .ios-diff-badge.cooler {
    background: rgba(56, 189, 248, 0.25);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.4);
  }

  .ios-diff-badge.warmer {
    background: rgba(249, 115, 22, 0.25);
    color: #fdba74;
    border: 1px solid rgba(249, 115, 22, 0.4);
  }

  .ios-diff-badge.neutral {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  /* Wind Compass Dial */
  .ios-compass-dial {
    width: 86px;
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-compass-svg {
    width: 100%;
    height: 100%;
  }

  .ios-cardinal {
    font-size: 9px;
    font-weight: 700;
    fill: rgba(255, 255, 255, 0.85);
  }

  .ios-compass-speed {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.5px;
    fill: #ffffff;
  }

  .ios-compass-unit {
    font-size: 9px;
    font-weight: 500;
    fill: var(--ios-text-secondary);
  }

  /* Moon Phase Sphere */
  .ios-moon-container {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-moon-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  }

  /* Sun Arc Curve */
  .ios-sun-arc-box {
    width: 100%;
    height: 48px;
    margin-top: 4px;
  }

  .ios-sun-arc-svg {
    width: 100%;
    height: 100%;
  }

  /* UV Gradient Bar */
  .ios-uv-bar-wrapper {
    margin-top: 8px;
  }

  .ios-uv-bar {
    height: 5px;
    border-radius: 3px;
    background: linear-gradient(90deg, #22c55e 0%, #eab308 25%, #f97316 50%, #ef4444 75%, #a855f7 100%);
    position: relative;
  }

  .ios-uv-marker {
    position: absolute;
    top: -2.5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    transform: translateX(-50%);
  }

  /* Pressure Barometer Dial */
  .ios-pressure-gauge {
    width: 90px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-pressure-svg {
    width: 100%;
    height: 100%;
  }

  .ios-pressure-symbol {
    font-size: 11px;
    fill: rgba(255, 255, 255, 0.7);
  }

  .ios-pressure-val {
    font-size: 13px;
    font-weight: 600;
    fill: #ffffff;
  }

  .ios-pressure-unit {
    font-size: 9px;
    font-weight: 500;
    fill: var(--ios-text-secondary);
  }

  .ios-pressure-arrow {
    font-size: 12px;
    fill: rgba(255, 255, 255, 0.6);
  }

  /* Tile Footer Note */
  .ios-tile-footer {
    font-size: 11.5px;
    line-height: 1.3;
    color: var(--ios-text-secondary);
    margin-top: 6px;
    padding-top: 4px;
    white-space: normal;
  }
`;

