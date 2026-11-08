# Changelog

All notable changes to the **Liquid Glass Weather Card** (`ha-weather-liquid-glass`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.0.4] - 2026-11-08

### 🇬🇧 English

#### 🎨 Apple iOS Weather Theme & Legibility Redesign
- **Native iOS Color Palette:** Aligned sky gradients and glass styling with the native Apple iOS 18/27 Weather app.
  - **Sunny / Clear:** Vibrant, saturated California sky blue (`#4d82c8` to `#5993dc`) with an authentic white sunburst and subtle rainbow halo.
  - **Rainy:** Moody, atmospheric slate grey-blue (`#5a6479` to `#384358`) matching real-world storm skies.
  - **Cloudy / Overcast:** Refined slate overcast palette (`#6b7a90` to `#4d5b70`).
  - **Night:** Deep midnight indigo-to-black gradient (`#1c2340` to `#0e1428`).
- **Liquid Glass Without White Borders:** Removed harsh white card borders (`border: none`) and interior glare (`inset` shadows). Cards now dynamically adapt to the sky tone with rich, dark-frosted saturation and `blur(24px) saturate(160%)`.
- **Text Readability & Contrast:**
  - Header condition text and High/Low temperatures are now rendered in crisp white (`#ffffff`) with subtle drop shadows (`0 1px 3px rgba(0, 0, 0, 0.25)`), guaranteeing perfect legibility against bright daytime skies.
  - Stripped redundant text shadows from interior card elements for a razor-sharp, modern look.
  - Replaced secondary text colors with airy ice-blue (`#a8cdff` on sunny, `#8f9bb0` on rain).
- **Interactive Switcher & Precipitation Polish:**
  - Segmented controls redesigned with seamless pill backgrounds (`rgba(14, 48, 110, 0.45)` for sunny, `rgba(15, 22, 38, 0.45)` for rain).
  - Rain gauges and timeline bars restyled with high-contrast `#5cc0f2` cyan accents and clean empty tracks.
- **Dynamic CSS Variable Theming:** Centralized all theme colors under `:host` and `:host([data-theme="..."])` CSS custom properties for effortless user styling and `card-mod` overrides.

### 🇹🇷 Türkçe

#### 🎨 Apple iOS Hava Durumu Teması ve Okunabilirlik Yenilemesi
- **Orijinal iOS Renk Paleti:** Gökyüzü gradyanları ve cam stilleri doğrudan Apple iOS 18/27 Hava Durumu uygulamasıyla eşitlendi.
  - **Güneşli / Açık:** Canlı ve doygun California gökyüzü mavisi (`#4d82c8` → `#5993dc`), tepede parlak beyaz güneş ışığı ve yumuşak gökkuşağı halesi.
  - **Yağmurlu:** Orijinal iOS ekranındaki fırtınalı koyu gri-mavi gökyüzü tonları (`#5a6479` → `#384358`).
  - **Bulutlu:** Slate gri-mavi tonları (`#6b7a90` → `#4d5b70`).
  - **Gece:** Gece yarısı derin lacivert-siyah gradyanı (`#1c2340` → `#0e1428`).
- **Bordersız Saf Liquid Glass:** Cam kartlardaki sert beyaz kenarlıklar (`border: none`) ve iç parlama gölgeleri kaldırıldı. Kartlar gökyüzünün doygun yarı saydam tonunu alacak şekilde `blur(24px) saturate(160%)` ile güncellendi.
- **Mükemmel Metin Okunabilirliği:**
  - Başlıktaki hava durumu ("Güneşli") ve En Yüksek/En Düşük sıcaklıklar saf beyaz (`#ffffff`) ve hafif gölgeli yapılarak gündüz gökyüzünde okunamaz hale gelmesi engellendi.
  - Kart içi tüm yazılardaki gereksiz metin gölgeleri sıfırlanarak temiz, düz ve jilet gibi bir tipografi sağlandı.
  - Kart içi ikincil metinler gündüz için `#a8cdff`, yağmur için `#8f9bb0` olarak güncellendi.
- **3'lü Switcher ve Yağmur Barları:**
  - Segment switcher arka planı yumuşak cam hap tasarımına kavuştu (`rgba(14, 48, 110, 0.45)` gündüz, `rgba(15, 22, 38, 0.45)` yağmur).
  - Yağmur damlaları ve doluluk çubukları `#5cc0f2` canlı mavi vurgu rengine taşındı.
- **Merkezi CSS Değişken Sistemi:** Tüm renk ve tema parametreleri `:host` değişkenleri altına toplanarak `card-mod` ile özelleştirmeye tam uyumlu hale getirildi.

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
- **Localized Loading States:** Replaced raw `Unavailable` text with friendly, localized loading messages.
- **Header Layout Polish:** Suppressed high/low temperature row when data is not yet available to avoid overlapping text during initial load.

---

## [v1.0.1] - 2026-11-04

### 🔒 Privacy & HACS Compliance
- **Opt-In Reverse Geocoding:** Reverse geocoding via BigDataCloud client API is now strictly **opt-in** (`reverse_geocode: false` by default). The card never sends instance coordinates to third parties unless explicitly enabled.
- **Local Location Resolution:** Location names are resolved strictly locally.
- **Preserved Custom Names:** Configured custom names are always respected.
- **MIT License Notice:** Added Patrick Kissling's copyright notice and MIT license for `clock-weather-card` into a dedicated [NOTICE.md](NOTICE.md) file.

---

## [v1.0.0] - 2026-10-28

### 🎉 Initial Release
