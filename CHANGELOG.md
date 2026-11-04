# Changelog

All notable changes to the **Liquid Glass Weather Card** (`ha-weather-liquid-glass`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.0.3] - 2026-11-04

### 🎨 Visual & Contrast Improvements
- **Dark Tinted Glass Containers:** Replaced the previous white translucent glass layer (`rgba(255, 255, 255, 0.15)`) with a deep, dark-frosted glass tint (`rgba(10, 22, 40, 0.28)`) true to native Apple iOS Weather design. This completely eliminates white glare and blooming over daylight gradients.
- **High-Contrast Precipitation Percentage:** Precipitation chance text (`.ios-hourly-pop`) upgraded to bold `#67e8f9` cyan with a dark drop shadow (`text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85)`). The rain drop SVG icon now features a dedicated drop shadow, ensuring 100% legibility on bright sky backgrounds.
- **Atmospheric Sky Gradients:** Toned down overly bright, washed-out daylight blue backgrounds (`#4295f5`) to deep, rich, elegant sky gradients (`#18488a` to `#276fc4`) for both clear and partly-cloudy conditions.
- **Enhanced Typography & Text Shadows:** Added subtle text shadows (`0 1px 2px rgba(0, 0, 0, 0.45)`) to hourly timestamps and temperatures, preventing text from washing out against complex background animations.

---

## [v1.0.2] - 2026-11-04

### ⚡ Resiliency & UX
- **Automatic Fallback for Unavailable States:** When Home Assistant's underlying weather entity (`weather.*`) temporarily enters an `unavailable` or `unknown` state (e.g. during restart, network reconnections, or rate-limited API polling), the card automatically falls back to cached hourly/daily forecast data (`_hourlyForecasts[0]`) instead of displaying `--` and raw `Unavailable`.
- **Localized Loading States:** Replaced raw `Unavailable` text with friendly, localized loading messages:
  - 🇹🇷 Türkçe: `"Veriler bekleniyor..."`
  - 🇬🇧 English: `"Waiting for data..."`
  - 🇩🇪 Deutsch: `"Daten werden geladen..."`
  - 🇪🇸 Español: `"Esperando datos..."`
  - 🇫🇷 Français: `"En attente de données..."`
- **Header Layout Polish:** Suppressed high/low temperature row when data is not yet available to avoid overlapping text during initial load.

---

## [v1.0.1] - 2026-11-04

### 🔒 Privacy & HACS Compliance
- **Opt-In Reverse Geocoding:** Reverse geocoding via BigDataCloud client API is now strictly **opt-in** (`reverse_geocode: false` by default). The card never sends instance coordinates to third parties unless explicitly enabled.
- **Local Location Resolution:** Location names are resolved strictly locally in priority order:
  1. Manually specified `name` on the card / location.
  2. Weather entity's `friendly_name` in Home Assistant.
  3. Home Assistant instance location name (`hass.config.location_name`).
  4. Formatted weather entity ID.
- **Preserved Custom Names:** Configured custom names (such as "Home" or "Ev") are always respected and never discarded or overwritten by geocoding fallbacks.
- **Visual Card Editor Privacy Switch:** Added a toggle switch with clear explanations for reverse geocoding in all 5 supported languages.
- **MIT License Notice:** Added Patrick Kissling's copyright notice and MIT license for `clock-weather-card` into a dedicated [NOTICE.md](NOTICE.md) file, preserving the root [LICENSE](LICENSE) file for automated SPDX detection.

---

## [v1.0.0] - 2026-10-28

### 🎉 Initial Release
- Ultra-modern frosted Liquid Glass Weather Card inspired by Apple iOS Weather.
- Interactive multi-mode switcher: Condition, Precipitation, and Wind views.
- Dynamic atmospheric sky backgrounds with animated rain, snow, lightning, and sunbeams.
- Multi-location swipe and pagination support.
- Comprehensive visual card editor for Home Assistant Lovelace.
- Multi-language support: English, Turkish, German, Spanish, French.
