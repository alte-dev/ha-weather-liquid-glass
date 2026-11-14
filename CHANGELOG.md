# Changelog

All notable changes to the **Liquid Glass Weather Card** (`ha-weather-liquid-glass`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.1.1] - 2026-11-14

### 🇬🇧 English
- **Square Fitted (`square-fit`) Visual Polish & Humidity Fallback**:
  - Unified frosted glass pill and hourly forecast box backgrounds (`var(--ios-glass-bg)` + `var(--ios-glass-blur)`) and scaled sky gradient height (`background-size: 100% 155%`) to match `default` and `square-scroll` brightness.
  - Centered the metric values (**Feels Like**, **Wind**, **Humidity**) inside the 3 quick-stat pills while keeping the labels top-left aligned.
  - Added multi-source humidity/wind/apparent temperature fallbacks (`sensor_humidity` → `entity.attributes.humidity` → hourly forecast → daily forecast → `--`) so the Humidity pill never disappears when a weather integration omits the attribute.

### 🇹🇷 Türkçe
- **Kare Tam Sığan (`square-fit`) Görsel İyileştirme ve Nem Oranı Düzeltmesi**:
  - Bilgi haplarının ve saatlik tahmin kutusunun arka planları `default` ve `square-scroll` görünümleriyle tamamen eşitlendi (`var(--ios-glass-bg)`, `var(--ios-glass-blur)` ve `background-size: 100% 155%`).
  - **Hissedilen**, **Rüzgar** ve **Nem Oranı** kutularındaki metrik değerler kutu içinde ortalandı.
  - Hava durumu entegrasyonu `humidity` özniteliğini boş bıraksa bile Nem Oranı kutusunun kaybolmaması için çoklu yedekleme (`sensor_humidity` → `entity.attributes.humidity` → saatlik tahmin → günlük tahmin → `--`) eklendi.

---

## [v1.1.0] - 2026-11-14

### 🇬🇧 English
- **Redesigned Square Fitted Widget (`square-fit`)**:
  - Upgraded from a sparse miniature layout into a rich, full-bodied 1:1 widget (`min-height: 310px`) that fills the square cleanly without empty gaps.
  - Added prominent `64px` hero temperature, localized weather condition title, smart forecast summary note, and `62px` weather icon.
  - Added a 3-column frosted glass quick-stats pill row (**Feels Like**, **Wind**, **Humidity**).
  - Enhanced the 5-column frosted glass hourly forecast strip (**Now** + next 4 hours) with precipitation probability badges (`%`).
- **Fixed Mini Widget (`mini`) Clipping & Layout**:
  - Fixed zero-padding inheritance caused by `.is-scrollable` being applied to non-scrollable `mini` and `square-fit` layouts, preventing text and numbers from getting clipped at the rounded corners (`border-radius: 28px`).
  - Aligned DOM classes (`.ios-mini-content`, `.ios-mini-loc-row`, `.ios-mini-loc`, `.ios-mini-meta-row`, `.ios-mini-pill`, `.ios-mini-icon-wrap`) with `card-styles.ts` for balanced padding, proper text truncation (`ellipsis`), and a frosted glass precipitation/wind badge.
- **Home Assistant Grid & Sections Compatibility**:
  - Added dynamic `getCardSize()` and `getGridOptions()` methods tailored per `card_layout` (`mini`, `compact`, `square-fit`, `square-scroll`, `default`) for seamless sizing in Lovelace Masonry and Sections dashboards.
- **Localization Fix**:
  - Added missing `thunderstorm` condition key across all 5 supported languages (`tr`, `en`, `de`, `es`, `fr`).

### 🇹🇷 Türkçe
- **Kare Tam Sığan (`square-fit`) Görünümü Baştan Tasarlandı**:
  - Küçük ve boş kalan eski yapı yerine, 1:1 kare alanı dolu dolu kullanan zengin bir widget (`min-height: 310px`) tasarlandı.
  - `64px` büyük ana sıcaklık, yerelleştirilmiş hava durumu başlığı, akıllı tahmin özeti notu ve `62px` hava durumu ikonu eklendi.
  - Orta bölüme 3 sütunlu buzlu cam hızlı bilgi hapları (**Hissedilen**, **Rüzgar**, **Nem**) eklendi.
  - Alt bölüme yağış ihtimali (`%`) rozetli, **Şimdi** + sonraki 4 saati gösteren 5 sütunlu buzlu cam saatlik tahmin şeridi yerleştirildi.
- **Mini Görünüm (`mini`) Yazı Taşması ve Kesilme Sorunu Düzeltildi**:
  - Kaydırılamayan `mini` ve `square-fit` düzenlerine yanlışlıkla `.is-scrollable` sınıfının eklenmesiyle oluşan `padding: 0` sıfırlaması giderildi; metinlerin ve derecenin yuvarlatılmış köşelerden (`border-radius: 28px`) kesilmesi tamamen önlendi.
  - Mini görünüm HTML sınıfları (`.ios-mini-content`, `.ios-mini-loc`, `.ios-mini-meta-row`, `.ios-mini-pill`) stil dosyasıyla eşleştirildi; esnek metin kısaltma (`ellipsis`) ve buzlu cam yağış/rüzgar rozeti eklendi.
- **Home Assistant Grid & Sections Uyumluluğu**:
  - Her görünüm tipine (`mini`, `compact`, `square-fit`, `square-scroll`, `default`) özel dinamik `getCardSize()` ve `getGridOptions()` desteği eklenerek Home Assistant panel ızgaralarında tam boyutta görünmesi sağlandı.
- **Dil Desteği Düzeltmesi**:
  - Tüm 5 dil paketine (`tr`, `en`, `de`, `es`, `fr`) eksik olan `thunderstorm` hava durumu anahtarı eklendi.

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
