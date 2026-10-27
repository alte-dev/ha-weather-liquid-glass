<p align="center">
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/actions"><img src="https://img.shields.io/github/actions/workflow/status/alte-dev/ha-weather-liquid-glass/validate.yml?branch=main&label=HACS%20Validation&style=for-the-badge" alt="HACS Validation"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/releases"><img src="https://img.shields.io/github/v/release/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="Release"></a>
  <a href="https://github.com/hacs/default"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge" alt="HACS"></a>
  <a href="https://github.com/alte-dev/ha-weather-liquid-glass/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alte-dev/ha-weather-liquid-glass?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/icon.png?v=1.0.18" width="128" height="128" alt="Liquid Glass Weather Card Icon">
</p>

<h1 align="center">🌤️ Carte Météo Liquid Glass pour Home Assistant</h1>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md"><strong>Français</strong></a>
</p>

Carte météo glassmorphique inspirée d'Apple iOS 27 pour les tableaux de bord Home Assistant Lovelace. Dispose d'un sélecteur interactif à 3 modes pour les **Conditions et Température**, les **Précipitations (Intensité et Probabilité)** et le **Vent (Vitesse et Courbe d'ondes)**, de **5 formats de carte** (**Défaut complet**, **Widget carré sans défilement**, **Carré avec défilement**, **Compact** et **Mini Widget**), d'animations atmosphériques du ciel (fines lignes de pluie, douce neige, nuages et éclairs) et d'une localisation automatique de la langue.

---

## 📸 Captures d'écran et dispositions

### 1. 🔀 3 Modes interactifs
| ⛅ Conditions & 10 jours | 💧 24h Précipitations & Intensité | 💨 Vitesse du vent & Ondes |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="240" alt="Mode Conditions" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-rain.png?v=1.0.17" width="240" alt="Mode Précipitations" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-wind.png?v=1.0.17" width="240" alt="Mode Vent" /> |

### 2. 📐 5 Dispositions de carte

| Disposition | Capture | Description |
|:---|:---:|:---|
| **Défaut (Complet)**<br>`card_layout: default` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-default.png?v=1.0.17" width="200" /> | Vue verticale complète style iPhone avec en-tête, points forts, prévisions horaires, liste sur 10 jours et barre inférieure. Prend en charge `scrollable: true` et `card_height`. |
| **Carré (Widget Ajusté)**<br>`card_layout: square-fit` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-fit.png?v=1.0.17" width="200" /> | Widget carré 1:1 avec **zéro défilement**! Grande température, icône animée, sélecteur à 3 modes et boîte de prévisions sur 5 heures. |
| **Carré (Avec Défilement)**<br>`card_layout: square-scroll` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-square-scroll.png?v=1.0.17" width="200" /> | Carte carrée 1:1 avec **défilement vertical fluide**! Toutes les informations avec de subtiles animations de pluie et de neige en arrière-plan. |
| **Compact (Horizontal)**<br>`card_layout: compact` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-compact.png?v=1.0.17" width="240" /> | Carte rectangulaire (~240px). En-tête côte à côte avec prévisions sur 24 heures, idéale pour les tableaux de bord à colonnes multiples. |
| **Mini Widget**<br>`card_layout: mini` | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/preview-mini.png?v=1.0.17" width="220" /> | Widget minimaliste épuré (~130px). Ville, température, condition, maximales/minimales et badge de probabilité de pluie. |

### 3. 🎨 Arrières-plans météo atmosphériques dynamiques

Dégradés Apple Weather adaptés automatiquement selon les conditions météorologiques et le cycle jour/nuit:

| ☀️ Ensoleillé | ⛅ Nuageux / Couvert | 🌧️ Pluie (Effet subtil) |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-sunny.png?v=1.0.17" width="220" alt="Thème Ensoleillé" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-cloudy.png?v=1.0.17" width="220" alt="Thème Nuageux" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-rainy.png?v=1.0.17" width="220" alt="Thème Pluie" /> |
| **❄️ Neige (Flocons légers)** | **⚡ Orage / Éclairs** | **🌙 Nuit claire** |
| <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-snowy.png?v=1.0.17" width="220" alt="Thème Neige" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-thunderstorm.png?v=1.0.17" width="220" alt="Thème Orage" /> | <img src="https://raw.githubusercontent.com/alte-dev/ha-weather-liquid-glass/main/images/theme-night.png?v=1.0.17" width="220" alt="Thème Nuit Claire" /> |

---

## ✨ Fonctionnalités

- 📱 **Esthétique Apple iOS Weather authentique**:
  - Verre dépoli translucide (`backdrop-filter: blur(28px)`) avec bordures et ombres subtiles.
  - Grande typographie épurée de température centrée avec en-tête de style Cupertino.
  - Dégradés de ciel dynamiques selon les conditions météo et l'alternance jour/nuit.
  - Barre inférieure avec navigation carte, points d'emplacement et raccourcis.

- 🔀 **Sélecteur de mode interactif à 3 voies**:
  - ⛅ **Conditions & Température**: Prévisions horaires et liste sur 10 jours avec barres de dégradé thermique colorées et indicateur de température actuelle.
  - 💧 **Précipitations**: Capsules d'intensité à contraste élevé et pourcentages, plus chronologie des pluies sur 10 jours avec totaux cumulés (`.35"` / `8.9 mm`).
  - 💨 **Vent**: Colonnes avec séparations en pointillés, courbe fluide de vent turquoise et plages de vitesse sur 10 jours (`1 - 8 mph` / `4 - 24 km/h`).

- 📐 **Formats de carte polyvalents**:
  - **Défaut (Complet)**: Interface verticale complète pour mobile.
  - **Compact (Rectangle)**: Hauteur réduite, parfaite pour les grilles de tableau de bord.
  - **Carré (Widget 1:1)**: Format widget iOS d'accueil avec prévisions condensées.

- 🌍 **Localisation multilingue automatique**:
  - Détecte automatiquement la langue de l'utilisateur Home Assistant (**Français**, **Anglais**, **Turc**, **Allemand**, **Espagnol**).

---

## 🚀 Installation

**Prérequis:** Home Assistant et **[HACS](https://hacs.xyz/)**. Aucune autre carte ou thème personnalisé n'est requis.

### 1. Installation via HACS (Recommandé - En 1 clic)

Le moyen le plus simple consiste à cliquer sur le bouton My Home Assistant ci-dessous. Il vous demandera l'adresse de votre Home Assistant une seule fois, puis ouvrira le dépôt directement dans HACS:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=alte-dev&repository=ha-weather-liquid-glass&category=plugin)

1. Cliquez sur le bouton **Télécharger (Download)** en bas à droite de la fenêtre HACS.
2. Choisissez la version souhaitée et confirmez en cliquant à nouveau sur **Télécharger**.
3. Videz le cache de votre navigateur (`Ctrl + F5` ou glisser vers le bas sur mobile pour actualiser).

<details>
<summary>▶ <strong>Si le bouton ne fonctionne pas: Dépôt personnalisé HACS manuel</strong></summary>

1. Dans Home Assistant, ouvrez l'onglet **HACS**.
2. Cliquez sur les trois points verticaux (⋮) en haut à droite et sélectionnez **Dépôts personnalisés**.
3. URL du dépôt:
   ```text
   https://github.com/alte-dev/ha-weather-liquid-glass
   ```
4. Catégorie: **Dashboard** (ou **Lovelace / Plugin**).
5. Cliquez sur **Ajouter**, recherchez **Liquid Glass Weather Card** et cliquez sur **Télécharger**.
6. Videz le cache de votre navigateur.
</details>

### 2. Installation manuelle (Sans HACS)

1. Téléchargez `weather-liquid-glass-card.js` depuis la page [Releases](https://github.com/alte-dev/ha-weather-liquid-glass/releases).
2. Copiez le fichier `weather-liquid-glass-card.js` sur votre serveur Home Assistant dans:
   ```text
   /config/www/weather-liquid-glass-card.js
   ```
3. Ajoutez la ressource dans Home Assistant (**Paramètres** -> **Tableaux de bord** -> **Menu à trois points** -> **Ressources**):
   - **URL:** `/local/weather-liquid-glass-card.js`
   - **Type de ressource:** `Module JavaScript`
4. Videz le cache de votre navigateur.

---

## 📄 Licence

Ce projet est sous **Licence MIT** - consultez le fichier [LICENSE](LICENSE) pour plus de détails.
