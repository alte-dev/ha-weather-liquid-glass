# Changelog

All notable changes to the **Liquid Glass Weather Card** (`ha-weather-liquid-glass`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.0.5] - 2026-11-08

### 🇬🇧 English
- **Fixed Temperature Number Legibility:** Removed dark/black drop shadows from the main temperature value and header texts that caused smudging and unreadability.
- **Optimized Sun Position:** Repositioned the radiant sunburst to the top edge of the card above the location and temperature, preventing the white sun flare from clashing with the white temperature numbers.

### 🇹🇷 Türkçe
- **Sıcaklık Sayılarının Okunabilirliği Düzeltildi:** Ana derece sayısı ve başlık metinlerinin arkasında karartmaya ve okunaksızlığa yol açan tüm siyah gölgeler (`text-shadow`) kaldırıldı.
- **Güneş Konumu Yukarı Taşındı:** Beyaz güneş parlaması, konum ve derece sayısının tam arkasından yukarıya (kartın tavanına) taşındı. Böylece sayılar mavi gökyüzü üzerinde bembeyaz ve pürüzsüz netliğe kavuştu.

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
  - Header condition text and High/Low temperatures are now rendered in crisp white (`#ffffff`), guaranteeing perfect legibility against bright daytime skies.
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
  - Başlıktaki hava durumu ("Güneşli") ve En Yüksek/En Düşük sıcaklıklar saf beyaz (`#ffffff`) yapılarak gündüz gökyüzünde okunamaz hale gelmesi engellendi.
  - Kart içi tüm yazılardaki gereksiz metin gölgeleri sıfırlanarak temiz, düz ve jilet gibi bir tipografi sağlandı.
  - Kart içi ikincil metinler gündüz için `#a8cdff`, yağmur için `#8f9bb0` olarak güncellendi.
- **3'lü Switcher ve Yağmur Barları:**
  - Segment switcher arka planı yumuşak cam hap tasarımına kavuştu (`rgba(14, 48, 110, 0.45)` gündüz, `rgba(15, 22, 38, 0.45)` yağmur).
  - Yağmur damlaları ve doluluk çubukları `#5cc0f2` canlı mavi vurgu rengine taşındı.
- **Merkezi CSS Değişken Sistemi:** Tüm renk ve tema parametreleri `:host` değişkenleri altına toplanarak `card-mod` ile özelleştirmeye tam uyumlu hale getirildi.

---

## [v1.0.3] - 2026-11-04
