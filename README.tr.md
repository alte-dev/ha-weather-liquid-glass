<p align="center">
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/actions"><img src="https://img.shields.io/github/actions/workflow/status/alte-dev/ha-weather-liquid-glass/validate.yml?branch=main&label=HACS%20Validation&style=for-the-badge" alt="HACS Validation"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/releases"><img src="https://img.shields.io/github/v/release/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="Release"></a>
  <a href="https://github.com/hacs/default"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge" alt="HACS"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/icon.png?v=1.0.18" width="128" height="128" alt="Liquid Glass Weather Card Icon">
</p>

<h1 align="center">🌤️ Home Assistant İçin Liquid Glass Weather Card</h1>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.tr.md"><strong>Türkçe</strong></a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a>
</p>

Home Assistant Lovelace panelleri için Apple iOS 27 tasarım diline sahip modern ve buzlu cam (glassmorphic) efektli hava durumu kartı. **Hava Koşulları & Sıcaklık**, **Yağış (Yoğunluk & İhtimal)** ve **Rüzgar (Hız & Akış Dalgası Grafiği)** arasında geçiş yapabilen 3 kademeli interaktif butonlar, **5 farklı kart düzeni** (**Tam Boy Dikey**, **Kare Tam Sığan Widget**, **Kare Kaydırılabilir**, **Kompakt Yatay** ve **Mini Widget**), hareketli atmosferik gökyüzü animasyonları, otomatik Türkçe yerelleştirme ve modern Home Assistant tahmin aboneliği içerir.

---

## 📸 Ekran Görüntüleri ve Görünüm Seçenekleri

### 1. 🔀 3 İnteraktif Mod
| ⛅ Koşullar & 10 Günlük Sıcaklık | 💧 24 Saatlik Yağış & Yoğunluk | 💨 Rüzgar Hızı & Dalga Grafiği |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="240" alt="Koşul Modu" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-rain.png?v=1.0.17" width="240" alt="Yağış Modu" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-wind.png?v=1.0.17" width="240" alt="Rüzgar Modu" /> |

### 2. 📐 5 Farklı Kart Düzeni

| Düzen (Layout) | Görsel | Açıklama |
|:---|:---:|:---|
| **Varsayılan (Tam Boy)**<br>`card_layout: default` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="200" /> | Orijinal dikey iPhone arayüzü: Başlık, öne çıkanlar, 24 saatlik şerit, 10 günlük liste ve alt menü. İsteğe bağlı `scrollable: true` ve `card_height` destekler. |
| **Kare (Tam Sığan Widget)**<br>`card_layout: square-fit` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-fit.png?v=1.0.17" width="200" /> | 1:1 Kare kutu ve **sıfır kaydırma (tam sığan)**! Büyük sıcaklık, ikon, 3 modlu mini buton ve 5 saatlik mikro tahmin şeridi. |
| **Kare (Kaydırılabilir)**<br>`card_layout: square-scroll` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-scroll.png?v=1.0.17" width="200" /> | 1:1 Kare alanda **akıcı dikey kaydırma**! Tüm zengin hava durumu ve 10 günlük tahminleri küçük bir kare alanda inceleyin. |
| **Kompakt (Yatay)**<br>`card_layout: compact` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-compact.png?v=1.0.17" width="240" /> | Yatay dikdörtgen kart (~240px). Yan yana konum ve sıcaklık, 24 saatlik şerit. Çok sütunlu paneller için idealdir. |
| **Mini Widget**<br>`card_layout: mini` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-mini.png?v=1.0.17" width="220" /> | Minimalist mikro widget (~130px). Şehir, büyük sıcaklık, durum, en yüksek/en düşük ve yağış ihtimali rozeti. |

### 3. 🎨 Dinamik Atmosferik Hava Durumu Arka Planları

Hava durumuna ve gündüz/geceye göre otomatik değişen Apple renk gradyanları ve hareketli gökyüzü animasyonları (bulut geçişleri, yağmur çizgileri, güneş halesi, kar taneleri, şimşek parlamaları, yıldızlı gece):

| ☀️ Güneşli | ⛅ Bulutlu / Kapalı | 🌧️ Yağmurlu |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-sunny.png?v=1.0.17" width="220" alt="Güneşli Tema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-cloudy.png?v=1.0.17" width="220" alt="Bulutlu Tema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-rainy.png?v=1.0.17" width="220" alt="Yağmurlu Tema" /> |
| **❄️ Karlı** | **⚡ Fırtına / Şimşek** | **🌙 Açık Gece** |
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-snowy.png?v=1.0.17" width="220" alt="Karlı Tema" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-thunderstorm.png?v=1.0.17" width="220" alt="Fırtına Teması" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-night.png?v=1.0.17" width="220" alt="Açık Gece Teması" /> |

---

- 🌍 **Otomatik Çoklu Dil Desteği**:
  - Home Assistant kullanıcı profil dilinize göre otomatik olarak kendini ayarlar (**Türkçe**, **İngilizce**, **Almanca**, **İspanyolca**, **Fransızca**).
  - İstenirse kart bazında manuel olarak da seçilebilir.

- 💡 **Öne Çıkanlar (Highlights) Banner'ı**:
  - Akıllı tahmin özetleri ve sıcaklık/rüzgar uyarı kartı (örneğin: *"Önümüzdeki günlerde sıcaklıklar mevsim normallerinin üzerinde seyredecek"*).

- ⚡ **Sıfır Bağımlılıklı Dahili Vektör İkonlar**:
  - Dışarıdan resim indirmeye gerek duymayan, 100% offline çalışan SVG hava durumu ikonları.

- 🔌 **Modern Home Assistant Altyapısı**:
  - Home Assistant 2023.9+ WebSocket tahmin abonelikleri (`weather/subscribe_forecast`) ile tam uyum.
  - Metrik (°C, km/h, mm) ve İngiliz (°F, mph, in) birimlerini otomatik tanıma.
  - Lovelace içinde görsel arayüz düzenleyicisi (Visual GUI Editor).

---

## 🚀 Kurulum

**Gerekenler:** Home Assistant ve **[HACS](https://hacs.xyz/)**. Başka kart, tema ya da eklenti gerekmez.

### 1. HACS ile İndir (Önerilen - Tek Tıkla)

En kolay yol aşağıdaki My Home Assistant düğmesidir. Home Assistant adresinizi bir kez sorar, ardından depoyu doğrudan HACS içinde açar:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=alte-dev&repository=ha-weather-liquid-glass&category=plugin)

1. Açılan pencerede sağ alttaki **İndir (Download)** düğmesine basın.
2. Sürüm seçme ekranında tekrar **İndir**'e tıklayın.
3. Tarayıcı önbelleğinizi yenileyin (`Ctrl + F5` veya mobilde panoyu aşağı çekerek).

<details>
<summary>▶ <strong>Düğme çalışmazsa: HACS ile Manuel Depo Ekleme</strong></summary>

1. Home Assistant arayüzünüzde **HACS** sekmesini açın.
2. Sağ üst köşedeki üç noktaya (⋮) tıklayın ve **Özel depolar (Custom repositories)** seçeneğini seçin.
3. Depo adresi:
   ```text
   https://github.com/alte-dev/ha-weather-liquid-glass
   ```
4. Kategori: **Dashboard** (veya **Lovelace / Plugin**).
5. **Ekle**'ye tıklayın, ardından **Liquid Glass Weather Card** kartını bulup **İndir** butonuna basın.
6. Tarayıcı önbelleğinizi yenileyin.
</details>

### 2. Manuel Kurulum (HACS Olmadan)

1. [Releases](https://github.com/alte-dev/ha-weather-liquid-glass/releases) sayfasından `weather-liquid-glass-card.js` dosyasını indirin.
2. `weather-liquid-glass-card.js` dosyasını Home Assistant sunucunuzda şu klasöre kopyalayın:
   ```text
   /config/www/weather-liquid-glass-card.js
   ```
3. Home Assistant'ta kaynağı ekleyin (**Ayarlar** -> **Panolar** -> **Üç nokta menüsü** -> **Kaynaklar**):
   - **URL:** `/local/weather-liquid-glass-card.js`
   - **Kaynak türü:** `JavaScript Modülü`
4. Tarayıcı önbelleğinizi yenileyin.

---

## ⚙️ Kart Konfigürasyonu

### Temel Örnek

```yaml
type: custom:weather-liquid-glass-card
entity: weather.forecast_home
```

### Kapsamlı Örnek

```yaml
type: custom:weather-liquid-glass-card
entity: weather.forecast_home
name: İstanbul
card_layout: default           # 'default' | 'compact' | 'square'
default_view: condition        # 'condition' | 'precipitation' | 'wind'
locale: auto                   # 'auto' | 'tr' | 'en' | 'de' | 'es' | 'fr'
show_highlights: true
highlights_text: "Sıcaklıklar hafta sonuna kadar mevsim normallerinin üzerinde olacak."
show_bottom_bar: true
animated_background: true
transparent_background: false  # Temanıza gömmek isterseniz 'true' yapabilirsiniz
time_format: auto              # 'auto' | '12' | '24'
temp_sensor: sensor.outdoor_temperature  # İsteğe bağlı harici sıcaklık sensörü
```

---

## 🛠️ Seçenekler Tablosu

| Seçenek | Tür | Varsayılan | Açıklama |
| :--- | :---: | :---: | :--- |
| `entity` | `string` | **Zorunlu** | Hava durumu entity ID'si (örn. `weather.home`). |
| `name` | `string` | Entity İsmi | Başlıkta gösterilecek özel konum ismi (örn. `İstanbul`, `Cupertino`). |
| `card_layout` | `string` | `default` | Kart şekli: `default` (tam dikey), `compact` (dikdörtgen) veya `square` (kare widget). |
| `default_view` | `string` | `condition` | Varsayılan açık sekme: `condition`, `precipitation` veya `wind`. |
| `locale` | `string` | `auto` | Kart dili: `auto` (HA dilinden), `tr`, `en`, `de`, `es`, `fr`. |
| `show_highlights` | `boolean` | `true` | Öne çıkanlar kartını göster/gizle. |
| `highlights_text` | `string` | Otomatik | Özel öne çıkanlar metni (girilmezse akıllı tahmin üretilir). |
| `show_details` | `boolean` | `true` | Apple Weather detay kutucuklarını (Hissedilen, Rüzgar pusulası, Gün Batımı/Doğumu, UV, Nem, Basınç vb.) göster/gizle. |
| `show_bottom_bar` | `boolean` | `true` | Alt gezinme çubuğunu göster/gizle. |
| `animated_background`| `boolean` | `true` | Hava durumuna göre renk değiştiren dinamik gökyüzü zemini. |
| `transparent_background`| `boolean` | `false` | Zemin rengini saydam yaparak panel temasıyla bütünleştirir. |
| `time_format` | `string` | `auto` | Saat formatı: `auto`, `12` (12AM/1PM) veya `24` (13, 14). |
| `temp_sensor` | `string` | `isteğe bağlı`| Sıcaklık değerini harici bir sensörden almak için entity ID'si. |

---

## 🤝 Kaynak & Teşekkür

- Tahmin abonelikleri ve servis altyapısının temel kavramları için **Patrick Kissling**'in [clock-weather-card](https://github.com/pkissling/clock-weather-card) (MIT Lisansı) projesinden esinlenilmiştir.
- Arayüz ve kullanıcı deneyimi **Apple iOS Weather** uygulamasından esinlenilmiştir.

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.
