<p align="center">
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/actions"><img src="https://img.shields.io/github/actions/workflow/status/alte-dev/ha-weather-liquid-glass/validate.yml?branch=main&label=HACS%20Validation&style=for-the-badge" alt="HACS Validation"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/releases"><img src="https://img.shields.io/github/v/release/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="Release"></a>
  <a href="https://github.com/hacs/default"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge" alt="HACS"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/icon.png?v=1.0.18" width="128" height="128" alt="Liquid Glass Weather Card Icon">
</p>

<h1 align="center">🌤️ Tarjeta del Tiempo iOS 27 para Home Assistant</h1>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md"><strong>Español</strong></a> |
  <a href="README.fr.md">Français</a>
</p>

Tarjeta meteorológica inspirada en Apple iOS 27 con estética de cristal translúcido para los paneles de Home Assistant Lovelace. Incluye selector interactivo de 3 modos para **Condiciones y Temperatura**, **Precipitación (Intensidad y Probabilidad)** y **Viento (Velocidad y Curva de Ondas)**, **5 formatos de tarjeta** (**Predeterminado completo**, **Widget cuadrado sin scroll**, **Cuadrado con scroll**, **Compacto** y **Mini Widget**), animaciones dinámicas del cielo (lluvia fina, nieve suave, nubes y relámpagos) y localización automática de idiomas.

---

## 📸 Capturas de pantalla y diseños

### 1. 🔀 3 Modos interactivos
| ⛅ Condiciones y 10 días | 💧 24h Lluvia e intensidad | 💨 Viento y ondas |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="240" alt="Modo Condiciones" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-rain.png?v=1.0.17" width="240" alt="Modo Precipitación" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-wind.png?v=1.0.17" width="240" alt="Modo Viento" /> |

### 2. 📐 5 Diseños de tarjeta

| Diseño (Layout) | Captura | Descripción |
|:---|:---:|:---|
| **Predeterminado (Completo)**<br>`card_layout: default` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="200" /> | Vista vertical completa estilo iPhone con cabecera, destacados, pronóstico por horas, lista de 10 días y barra inferior. Admite `scrollable: true` y `card_height`. |
| **Cuadrado (Ajuste Widget)**<br>`card_layout: square-fit` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-fit.png?v=1.0.17" width="200" /> | Widget cuadrado 1:1 con **cero desplazamiento**! Gran temperatura, icono animado, selector de 3 modos y caja de pronóstico de 5 horas. |
| **Cuadrado (Con Scroll)**<br>`card_layout: square-scroll` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-scroll.png?v=1.0.17" width="200" /> | Tarjeta cuadrada 1:1 con **desplazamiento vertical fluido**! Información completa con animaciones sutiles de lluvia y nieve de fondo. |
| **Compacto (Horizontal)**<br>`card_layout: compact` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-compact.png?v=1.0.17" width="240" /> | Tarjeta rectangular (~240px). Cabecera en paralelo con pronóstico por horas de 24h, ideal para paneles con múltiples columnas. |
| **Mini Widget**<br>`card_layout: mini` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-mini.png?v=1.0.17" width="220" /> | Widget minimalista (~130px). Ciudad, temperatura, estado del tiempo, máximas/mínimas y probabilidad de lluvia. |

### 3. 🎨 Fondos atmosféricos dinámicos

Gradientes Apple Weather adaptados automáticamente a las condiciones meteorológicas y el ciclo día/noche:

| ☀️ Soleado | ⛅ Nublado / Cubierto | 🌧️ Lluvia (Efecto sutil) |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-sunny.png?v=1.0.17" width="220" alt="Tema Soleado" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-cloudy.png?v=1.0.17" width="220" alt="Tema Nublado" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-rainy.png?v=1.0.17" width="220" alt="Tema Lluvioso" /> |
| **❄️ Nieve (Copos suaves)** | **⚡ Tormenta / Rayos** | **🌙 Noche despejada** |
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-snowy.png?v=1.0.17" width="220" alt="Tema Nieve" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-thunderstorm.png?v=1.0.17" width="220" alt="Tema Tormenta" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-night.png?v=1.0.17" width="220" alt="Tema Noche" /> |

---

## ✨ Características

- 📱 **Estética auténtica de Apple iOS Weather**:
  - Vidrio esmerilado translúcido (`backdrop-filter: blur(28px)`) con bordes y sombras refinadas.
  - Temperatura grande y tipografía elegante con cabecera centrada al estilo de Cupertino.
  - Fondos de cielo dinámicos según el estado del tiempo y el ciclo día/noche.
  - Barra inferior de navegación con mapa, selector de ubicación y accesos directos.

- 🔀 **Selector interactivo de 3 modos**:
  - ⛅ **Condiciones y Temperatura**: Pronóstico por horas y lista de 10 días con barras degradadas de temperatura con punto de temperatura actual.
  - 💧 **Precipitación**: Cápsulas verticales de alta visibilidad para la intensidad de lluvia y porcentajes, más línea temporal de lluvia a 10 días con acumulados (`.35"` / `8.9 mm`).
  - 💨 **Viento**: Columnas con líneas discontinuas, curva fluida de viento en color turquesa y rangos de velocidad a 10 días (`1 - 8 mph` / `4 - 24 km/h`).

- 📐 **Formatos y diseños de tarjeta**:
  - **Predeterminado (Completo)**: Vista vertical estilo iPhone.
  - **Compacto (Rectángulo)**: Altura reducida, perfecto para cuadrículas.
  - **Cuadrado (Widget 1:1)**: Formato widget de iOS con vista compacta.

- 🌍 **Localización multilingüe automática**:
  - Detección automática del idioma del usuario de Home Assistant (**Español**, **Inglés**, **Turco**, **Alemán**, **Francés**).

---

## 🚀 Instalación

**Requisitos:** Home Assistant y **[HACS](https://hacs.xyz/)**. No se requieren otras tarjetas o temas adicionales.

### 1. Instalar a través de HACS (Recomendado - 1 Clic)

La forma más sencilla es hacer clic en el botón de My Home Assistant a continuación. Le solicitará la dirección de su Home Assistant una sola vez y abrirá el repositorio directamente en HACS:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=alte-dev&repository=ha-weather-liquid-glass&category=plugin)

1. En el diálogo de HACS, haga clic en el botón **Descargar (Download)** en la esquina inferior derecha.
2. Seleccione la versión más reciente y haga clic de nuevo en **Descargar**.
3. Limpie la caché de su navegador (`Ctrl + F5` o deslice hacia abajo en el móvil).

<details>
<summary>▶ <strong>Si el botón no funciona: Repositorio personalizado manual en HACS</strong></summary>

1. Abra **HACS** en Home Assistant.
2. Haga clic en los tres puntos (⋮) de la esquina superior derecha y seleccione **Repositorios personalizados**.
3. URL del repositorio:
   ```text
   https://github.com/alte-dev/ha-weather-liquid-glass
   ```
4. Categoría: **Dashboard** (o **Lovelace / Plugin**).
5. Haga clic en **Añadir**, busque **Liquid Glass Weather Card** y haga clic en **Descargar**.
6. Limpie la caché de su navegador.
</details>

### 2. Instalación manual (Sin HACS)

1. Descargue `weather-liquid-glass-card.js` desde la página de [Releases](https://github.com/alte-dev/ha-weather-liquid-glass/releases).
2. Copie `weather-liquid-glass-card.js` en su servidor de Home Assistant en `/config/www/weather-liquid-glass-card.js`.
3. Añada el recurso en Home Assistant (**Ajustes** -> **Paneles** -> **Menú de tres puntos** -> **Recursos**):
   - **URL:** `/local/weather-liquid-glass-card.js`
   - **Tipo de recurso:** `Módulo JavaScript`
4. Limpie la caché de su navegador.

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - consulte [LICENSE](LICENSE) para más detalles.
