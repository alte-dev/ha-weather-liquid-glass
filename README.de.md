<p align="center">
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/actions"><img src="https://img.shields.io/github/actions/workflow/status/alte-dev/ha-weather-liquid-glass/validate.yml?branch=main&label=HACS%20Validation&style=for-the-badge" alt="HACS Validation"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/releases"><img src="https://img.shields.io/github/v/release/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="Release"></a>
  <a href="https://github.com/hacs/default"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge" alt="HACS"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/icon.png?v=1.0.18" width="128" height="128" alt="Liquid Glass Weather Card Icon">
</p>

<h1 align="center">🌤️ Liquid Glass Wetterkarte für Home Assistant</h1>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.de.md"><strong>Deutsch</strong></a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a>
</p>

Von Apple iOS 27 inspirierte Wetterkarte im Glasmorphismus-Design für Home Assistant Lovelace-Dashboards. Mit interaktivem 3-Wege-Umschalter für **Bedingungen & Temperatur**, **Niederschlag (Intensität & Wahrscheinlichkeit)** und **Wind (Geschwindigkeit & Wellendiagramm)**, **5 verschiedenen Kartenlayouts** (**Standard Vollansicht**, **Quadratisches Widget ohne Scrollen**, **Quadratisch mit Scrollen**, **Kompakt** und **Mini-Widget**), dynamischen Himmelsanimationen (feine Regenstreifen, sanfter Schneefall, Wolkendrift, Blitze) und automatischer Sprachlokalisierung.

---

## 📸 Screenshots & Kartenlayouts

### 1. 🔀 3 Interaktive Modi
| ⛅ Bedingungen & 10-Tage-Temp | 💧 24h Regenzeitachse & Pegel | 💨 Windgeschwindigkeit & Wellen |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="240" alt="Bedingungsmodus" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-rain.png?v=1.0.17" width="240" alt="Niederschlagsmodus" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-wind.png?v=1.0.17" width="240" alt="Windmodus" /> |

### 2. 📐 5 Verschiedene Kartenlayouts

| Layout | Screenshot | Beschreibung |
|:---|:---:|:---|
| **Standard (Vollansicht)**<br>`card_layout: default` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="200" /> | Vollständige vertikale iOS-Smartphone-Ansicht mit Kopfzeile, Highlights, 24h-Stundenleiste, 10-Tage-Vorhersage und Fußzeile. Unterstützt `scrollable: true` und `card_height`. |
| **Quadrat (Angepasstes Widget)**<br>`card_layout: square-fit` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-fit.png?v=1.0.17" width="200" /> | 1:1 Quadratisches Widget mit **Null Scrollen**! Große Temperatur, animiertes Symbol, 3-Wege-Umschalter und 5-Stunden-Kompaktleiste. |
| **Quadrat (Scrollbar)**<br>`card_layout: square-scroll` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-scroll.png?v=1.0.17" width="200" /> | 1:1 Quadratisches Feld mit **flüssigem vertikalen Scrollen**! Alle Vorhersagen in kompakter quadratischer Größe mit dezenten Regen- und Schnee-Hintergrundanimationen. |
| **Kompakt (Horizontal)**<br>`card_layout: compact` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-compact.png?v=1.0.17" width="240" /> | Horizontale Rechteckkarte (~240px). Nebeneinanderliegende Kopfzeile mit 24h-Stundenleiste, ideal für Spalten-Dashboards. |
| **Mini-Widget**<br>`card_layout: mini` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-mini.png?v=1.0.17" width="220" /> | Minimalistisches Widget (~130px). Stadt, große Temperatur, Wetterzustand, Höchst-/Tiefstwert und Regenwahrscheinlichkeitsplakette. |

### 3. 🎨 Dynamische atmosphärische Wetterhintergründe

Automatische Apple Weather-Farbverläufe und lebendige Himmelsanimationen angepasst an Wetter und Tageszeit:

| ☀️ Sonnig | ⛅ Bewölkt / Bedeckt | 🌧️ Regen (Subtile Animation) |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-sunny.png?v=1.0.17" width="220" alt="Sonniges Thema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-cloudy.png?v=1.0.17" width="220" alt="Bewölktes Thema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-rainy.png?v=1.0.17" width="220" alt="Regen-Thema" /> |
| **❄️ Schnee (Sanfte Flocken)** | **⚡ Gewitter / Blitz** | **🌙 Klare Nacht** |
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-snowy.png?v=1.0.17" width="220" alt="Schnee-Thema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-thunderstorm.png?v=1.0.17" width="220" alt="Gewitter-Thema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-night.png?v=1.0.17" width="220" alt="Klare Nacht-Thema" /> |

---

## ✨ Funktionen

- 📱 **Authentische Apple iOS Wetterästhetik**:
  - Mattiertes Glasdesign (`backdrop-filter: blur(28px)`) mit subtilen Rändern und Schatten.
  - Große zentrierte Temperaturanzeige im eleganten Apple-Schriftstil und dynamischen Zustandsnotizen.
  - Dynamische Himmelsfarben passend zu Wetterlage und Tageszeit.
  - Apple Wetter-Bodenleiste mit Navigation, Pager-Punkten und Detailansicht.

- 🔀 **Interaktiver 3-Wege-Modusumschalter**:
  - ⛅ **Bedingungen & Temperatur**: Stündliche Wetter-Icons und Temperaturen sowie 10-Tage-Vorhersage mit Farbtemperatur-Farbverlaufsbalken und aktuellem Temperaturindikator.
  - 💧 **Niederschlag**: Kontrastreiche stündliche Intensitätskapseln und Wahrscheinlichkeitsprozente sowie 10-Tage-Regenzeitachse mit Gesamtniederschlag (`.35"` / `8.9 mm`).
  - 💨 **Wind**: Gestrichelte Stundenspalten und fließende türkisfarbene Windwellenkurve sowie 10-Tage-Windbereiche (`1 - 8 mph` / `4 - 24 km/h`).

- 📐 **Mehrere Kartenlayouts**:
  - **Standard (Vollansicht)**: Vollständige vertikale iOS-Smartphone-Ansicht.
  - **Kompakt (Rechteck)**: Platzsparende Höhe, ideal für Raster-Dashboards.
  - **Quadratisch (1:1 Widget)**: Apple iOS Widget-Format mit kompakter Vorhersage.

- 🌍 **Automatische Mehrsprachigkeit**:
  - Erkennt automatisch die Home Assistant-Sprache (**Deutsch**, **Englisch**, **Türkisch**, **Spanisch**, **Französisch**).

---

## 🚀 Installation

**Voraussetzungen:** Home Assistant und **[HACS](https://hacs.xyz/)**. Keine weiteren Karten oder Themes erforderlich.

### 1. Installation über HACS (Empfohlen - 1 Klick)

Der einfachste Weg ist ein Klick auf die folgende My Home Assistant-Schaltfläche. Sie fragt einmalig nach Ihrer Home Assistant-Adresse und öffnet das Repository direkt in HACS:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=alte-dev&repository=ha-weather-liquid-glass&category=plugin)

1. Klicken Sie im HACS-Dialog unten rechts auf **Herunterladen (Download)**.
2. Wählen Sie die gewünschte Version und bestätigen Sie mit **Herunterladen**.
3. Leeren Sie Ihren Browser-Cache (`Strg + F5`).

<details>
<summary>▶ <strong>Falls die Schaltfläche nicht funktioniert: Manuelles HACS-Repository</strong></summary>

1. Öffnen Sie **HACS** in Home Assistant.
2. Klicken Sie oben rechts auf das Drei-Punkte-Menü (⋮) und wählen Sie **Benutzerdefinierte Repositories**.
3. Repository-URL:
   ```text
   https://github.com/alte-dev/ha-weather-liquid-glass
   ```
4. Kategorie: **Dashboard** (oder **Lovelace / Plugin**).
5. Klicken Sie auf **Hinzufügen**, suchen Sie nach **Liquid Glass Weather Card** und laden Sie es herunter.
6. Leeren Sie Ihren Browser-Cache.
</details>

### 2. Manuelle Installation (Ohne HACS)

1. Laden Sie `weather-liquid-glass-card.js` aus den [Releases](https://github.com/alte-dev/ha-weather-liquid-glass/releases) herunter.
2. Kopieren Sie `weather-liquid-glass-card.js` auf Ihrem Home Assistant-Server nach `/config/www/weather-liquid-glass-card.js`.
3. Fügen Sie die Ressource in Home Assistant hinzu (**Einstellungen** -> **Dashboards** -> **Drei-Punkte-Menü** -> **Ressourcen**):
   - **URL:** `/local/weather-liquid-glass-card.js`
   - **Ressourcentyp:** `JavaScript-Modul`
4. Leeren Sie Ihren Browser-Cache.

---

## 📄 Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert - siehe [LICENSE](LICENSE) für Details.
