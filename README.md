<p align="center">
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/actions"><img src="https://img.shields.io/github/actions/workflow/status/alte-dev/ha-weather-liquid-glass/validate.yml?branch=main&label=HACS%20Validation&style=for-the-badge" alt="HACS Validation"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/releases"><img src="https://img.shields.io/github/v/release/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="Release"></a>
  <a href="https://github.com/hacs/default"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge" alt="HACS"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/icon.png?v=1.0.18" width="128" height="128" alt="Liquid Glass Weather Card Icon">
</p>

<h1 align="center">🌤️ Liquid Glass Weather Card for Home Assistant</h1>

<p align="center">
  <a href="README.md"><strong>English</strong></a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a>
</p>

Apple iOS 27 inspired glassmorphic weather card for Home Assistant Lovelace dashboards. Featuring an interactive segmented switcher for **Conditions & Temperature**, **Precipitation (Intensity & Chance)**, and **Wind (Speed & Wave Graph)**, **5 distinct card layouts** (**Default Full**, **Square Fitted Widget**, **Square Scrollable**, **Compact**, and **Mini Widget**), dynamic atmospheric sky animations, automatic multi-language localization, and native Home Assistant forecast subscriptions.

---

## 📸 Screenshots & Layouts

### 1. 🔀 3 Interactive Modes
| ⛅ Condition & 10-Day Temp | 💧 24h Rain Timeline & Gauge | 💨 Wind Speed & Waves |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="240" alt="Condition Mode" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-rain.png?v=1.0.17" width="240" alt="Precipitation Mode" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-wind.png?v=1.0.17" width="240" alt="Wind Mode" /> |

### 2. 📐 5 Distinct Card Layouts

| Layout | Screenshot | Description |
|:---|:---:|:---|
| **Default (Full)**<br>`card_layout: default` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="200" /> | Full vertical iOS phone style with header, smart highlights, hourly strip, 10-day forecast, and bottom bar. Supports `scrollable: true` and `card_height`. |
| **Square (Fitted Widget)**<br>`card_layout: square-fit` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-fit.png?v=1.0.17" width="200" /> | 1:1 Square widget with **zero scrolling**! Large temperature, animated icon, mini 3-way switcher, and 5-hour micro forecast box. |
| **Square (Scrollable)**<br>`card_layout: square-scroll` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-scroll.png?v=1.0.17" width="200" /> | 1:1 Square box with **smooth internal scrolling**! Access the entire rich forecast inside a compact square footprint. |
| **Compact (Horizontal)**<br>`card_layout: compact` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-compact.png?v=1.0.17" width="240" /> | Horizontal card (~240px). Side-by-side header with 24h hourly strip, ideal for multi-column dashboards. |
| **Mini Widget**<br>`card_layout: mini` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-mini.png?v=1.0.17" width="220" /> | Ultra-clean minimal glanceable widget (~130px). City, big temp, condition, high/low, and rain chance badge. |

### 3. 🎨 Dynamic Atmospheric Weather Backgrounds

Dynamic Apple Weather gradients and sky animations adapted to weather states:

| ☀️ Sunny | ⛅ Cloudy / Overcast | 🌧️ Rainy |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-sunny.png?v=1.0.17" width="220" alt="Sunny Theme" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-cloudy.png?v=1.0.17" width="220" alt="Cloudy Theme" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-rainy.png?v=1.0.17" width="220" alt="Rainy Theme" /> |
| **❄️ Snowy** | **⚡ Thunderstorm** | **🌙 Clear Night** |
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-snowy.png?v=1.0.17" width="220" alt="Snowy Theme" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-thunderstorm.png?v=1.0.17" width="220" alt="Thunderstorm Theme" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-night.png?v=1.0.17" width="220" alt="Clear Night Theme" /> |

---

- 🌍 **Automatic Multi-Language Localization**:
  - Automatically matches your Home Assistant user profile language (supports **English**, **Türkçe**, **Deutsch**, **Español**, **Français**).
  - Can also be explicitly overridden per card.

- 💡 **Highlights Banner**:
  - Integrated smart summaries and temperature/wind alert cards (e.g., *"The high temperatures will be above normal from Wednesday to Saturday"*).

- ⚡ **Zero-Dependency Vector Weather Icons**:
  - 100% offline inline SVG weather icons matching Apple Weather condition states.
  - No external missing icon assets or broken URLs.

- 🔌 **Modern Home Assistant Architecture**:
  - Full support for Home Assistant 2023.9+ WebSocket forecast subscriptions (`weather/subscribe_forecast`).
  - Automatic fallback to `weather.get_forecasts` service call and entity attribute forecasts.
  - Metric (°C, km/h, mm) and Imperial (°F, mph, in) automatic detection and support.
  - Built-in visual GUI configuration editor in Lovelace.

---

## 🚀 Installation

**Requirements:** Home Assistant and **[HACS](https://hacs.xyz/)**. No other custom cards or themes required.

### 1. Install via HACS (Recommended - One Click)

The easiest way is clicking the My Home Assistant button below. It will ask for your Home Assistant URL once and open the repository directly inside HACS:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=alte-dev&repository=ha-weather-liquid-glass&category=plugin)

1. Click the **Download** button in the bottom right corner of the HACS dialog.
2. Select the latest version and click **Download** again.
3. Refresh your browser cache (`Ctrl + F5` or pull down to refresh on mobile).

<details>
<summary>▶ <strong>If the button doesn't work: Manual HACS Custom Repository</strong></summary>

1. In Home Assistant, open **HACS**.
2. Click the three dots menu (⋮) in the top-right corner and select **Custom repositories**.
3. Repository URL:
   ```text
   https://github.com/alte-dev/ha-weather-liquid-glass
   ```
4. Category: **Dashboard** (or **Lovelace** / **Plugin**).
5. Click **Add**, find **Liquid Glass Weather Card**, and click **Download**.
6. Refresh your browser cache.
</details>

### 2. Manual Installation (Without HACS)

1. Download `weather-liquid-glass-card.js` from the [Releases](https://github.com/alte-dev/ha-weather-liquid-glass/releases) page.
2. Copy `weather-liquid-glass-card.js` to your Home Assistant directory under:
   ```text
   /config/www/weather-liquid-glass-card.js
   ```
3. Add the resource in Home Assistant (**Settings** -> **Dashboards** -> **Three dots menu** -> **Resources**):
   - **URL:** `/local/weather-liquid-glass-card.js`
   - **Resource type:** `JavaScript Module`
4. Refresh your browser cache.

---

## ⚙️ Configuration

### Minimal Example

```yaml
type: custom:weather-liquid-glass-card
entity: weather.forecast_home
```

### Complete Example

```yaml
type: custom:weather-liquid-glass-card
entity: weather.forecast_home
name: Cupertino
card_layout: default           # 'default' | 'compact' | 'square'
default_view: condition        # 'condition' | 'precipitation' | 'wind'
locale: auto                   # 'auto' | 'en' | 'tr' | 'de' | 'es' | 'fr'
show_highlights: true
highlights_text: "High temperatures will remain above normal through Saturday."
show_bottom_bar: true
animated_background: true
transparent_background: false  # Set true to blend with existing dashboard theme
time_format: auto              # 'auto' | '12' | '24'
temp_sensor: sensor.outdoor_temperature  # Optional high-precision sensor override
```

---

## 🛠️ Options Reference

| Option | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `entity` | `string` | **Required** | Weather entity ID (e.g. `weather.forecast_home` or `weather.home`). |
| `name` | `string` | Entity Name | Custom location title displayed at the top (e.g. `Cupertino`). |
| `card_layout` | `string` | `default` | Layout shape: `default` (full), `compact` (rectangle), or `square` (1:1 widget). |
| `default_view` | `string` | `condition` | Initial active tab: `condition`, `precipitation`, or `wind`. |
| `locale` | `string` | `auto` | Card language: `auto` (from Home Assistant), `en`, `tr`, `de`, `es`, `fr`. |
| `show_highlights` | `boolean` | `true` | Show or hide the iOS Highlights card banner. |
| `highlights_text` | `string` | Auto | Custom message for the Highlights card (auto-generated if omitted). |
| `show_details` | `boolean` | `true` | Show or hide the Apple Weather detail widgets grid (Feels like, Wind compass, Sunset, UV index, Humidity, Pressure, etc.). |
| `show_bottom_bar` | `boolean` | `true` | Show or hide the Apple Weather bottom navigation bar. |
| `animated_background`| `boolean` | `true` | Use dynamic Apple sky gradients based on weather and sun position. |
| `transparent_background`| `boolean` | `false` | Enable to make the card background transparent for custom themes. |
| `time_format` | `string` | `auto` | Time format for hourly strip: `auto`, `12` (12AM/1PM), or `24` (13, 14). |
| `temp_sensor` | `string` | `optional` | Temperature sensor entity ID to override current temperature. |
| `sun_entity` | `string` | `sun.sun` | Sun entity used to determine day/night sky themes and icons. |
| `wind_unit` | `string` | Auto from HA | Override wind unit (`km/h`, `mph`, `m/s`). |
| `precip_unit` | `string` | Auto from HA | Override precipitation unit (`mm`, `in`). |

---

## 🎨 Visual Card Editor

You can configure all options directly through Home Assistant's visual UI card picker without writing YAML!

---

## 🤝 Attribution & Credits

- Portions of the service layer and forecast subscription concepts are adapted and inspired by the excellent work of **Patrick Kissling** in [clock-weather-card](https://github.com/pkissling/clock-weather-card) (MIT License).
- UI and UX concept inspired by **Apple iOS Weather**.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
