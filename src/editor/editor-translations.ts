export interface EditorTranslations {
  weather_entity: string;
  select_weather_entity: string;
  custom_location_name: string;
  location_placeholder: string;
  additional_locations_title: string;
  additional_locations_desc: string;
  add_location_placeholder: string;
  remove: string;
  add_city_help: string;
  card_layout_shape: string;
  layout_square_scroll: string;
  layout_square_fit: string;
  layout_default: string;
  layout_compact: string;
  layout_mini: string;
  language: string;
  language_auto: string;
  default_view_mode: string;
  view_condition: string;
  view_precipitation: string;
  view_wind: string;
  time_format: string;
  time_auto: string;
  time_12: string;
  time_24: string;
  temp_sensor_override: string;
  custom_highlights_text: string;
  custom_highlights_placeholder: string;
  custom_card_height: string;
  enable_scroll: string;
  show_highlights: string;
  show_details: string;
  map_url: string;
  map_url_placeholder: string;
  show_bottom_bar: string;
  animated_background: string;
  transparent_background: string;
}

export const editorTranslations: Record<string, EditorTranslations> = {
  tr: {
    weather_entity: 'Hava Durumu Varlığı (Entity) *',
    select_weather_entity: 'Hava durumu varlığı seçin...',
    custom_location_name: 'Özel Şehir / Konum Adı (İsteğe bağlı)',
    location_placeholder: 'Örn. Kırklareli',
    additional_locations_title: '🌍 Diğer Konumlar / Şehirler (Çoklu Konum)',
    additional_locations_desc: 'Kart üzerinde sağa/sola kaydırarak veya alt noktalarla geçiş yapılabilecek diğer hava durumu konumları.',
    add_location_placeholder: '+ Yeni Konum / Şehir Ekle...',
    remove: 'Kaldır',
    add_city_help: '💡 Farklı şehirler eklemek için: Home Assistant\'ta Ayarlar > Cihazlar ve Hizmetler > Entegrasyon Ekle bölümünden Met.no veya Open-Meteo ile istediğiniz şehri ekleyin. Oluşturulan yeni weather.sehir varlığı burada otomatik listelenecektir.',
    card_layout_shape: 'Kart Düzeni (Format)',
    layout_square_scroll: '🔄 Kare - Kaydırılabilir (1:1 İçten Kaydırmalı Zengin Görünüm)',
    layout_square_fit: '⏹ Kare - Tam Sığan (1:1 Sıfır Kaydırmalı Kompakt Widget)',
    layout_default: '📱 Varsayılan (Orijinal Dikey iPhone Boyutu)',
    layout_compact: '▭ Kompakt (Yatay Dikdörtgen)',
    layout_mini: '🏷 Mini (Minimalist Hızlı Bakış Widget\'ı)',
    language: 'Kart Dili',
    language_auto: 'Otomatik (Home Assistant Dili)',
    default_view_mode: 'Varsayılan Görünüm Modu',
    view_condition: '⛅ Hava Koşulları ve Sıcaklık',
    view_precipitation: '💧 Yağış ve Yağmur İhtimali',
    view_wind: '💨 Rüzgar Hızı ve Dalga Grafiği',
    time_format: 'Saat Formatı',
    time_auto: 'Otomatik (Bölgeye göre)',
    time_12: '12 Saat (12AM, 1PM)',
    time_24: '24 Saat (13:00, 14:00)',
    temp_sensor_override: 'Harici Sıcaklık Sensörü (İsteğe bağlı)',
    custom_highlights_text: 'Özel Öne Çıkanlar Metni (İsteğe bağlı)',
    custom_highlights_placeholder: 'Özel duyuru veya akıllı hava özeti',
    custom_card_height: 'Özel Kart Yüksekliği (İsteğe bağlı, örn. 400px)',
    enable_scroll: 'Dahili Kaydırmayı Etkinleştir (Akıcı Kaydırma)',
    show_highlights: 'Öne Çıkanlar Kartını Göster (Smart Highlights)',
    show_details: 'Detay Kutularını Göster (Apple Weather Rüzgar, Nem, Basınç, Hissedilen vb.)',
    map_url: 'Harita / Radar Bağlantısı veya Yolu (İsteğe bağlı)',
    map_url_placeholder: 'Örn. /map veya https://embed.windy.com',
    show_bottom_bar: 'iOS Alt Menü Çubuğunu Göster (Sadece 2+ konumda görünür)',
    animated_background: 'Dinamik Atmosferik Gökyüzü Arka Planı (Yağmur, Kar, Şimşek, Güneş Işıltısı)',
    transparent_background: 'Şeffaf Arka Plan (Home Assistant panosuyla harmanla)',
  },
  en: {
    weather_entity: 'Weather Entity *',
    select_weather_entity: 'Select weather entity...',
    custom_location_name: 'Custom Location Name (Optional)',
    location_placeholder: 'e.g. Kırklareli',
    additional_locations_title: '🌍 Additional Locations (Multi-Location)',
    additional_locations_desc: 'Additional weather locations switchable by swiping left/right or tapping bottom dots.',
    add_location_placeholder: '+ Add New Location / City...',
    remove: 'Remove',
    add_city_help: '💡 To add different cities: In Home Assistant, go to Settings > Devices & Services > Add Integration and add Met.no or Open-Meteo for your desired cities. The created weather.city entities will appear here automatically.',
    card_layout_shape: 'Card Layout Shape',
    layout_square_scroll: '🔄 Square - Scrollable (1:1 with Internal Scroll)',
    layout_square_fit: '⏹ Square - Fitted (1:1 Zero-scroll Widget)',
    layout_default: '📱 Default (Full Vertical Phone Style)',
    layout_compact: '▭ Compact (Horizontal Rectangle)',
    layout_mini: '🏷 Mini (Minimalist Glanceable Widget)',
    language: 'Card Language',
    language_auto: 'Auto (Home Assistant Language)',
    default_view_mode: 'Default View Mode',
    view_condition: '⛅ Conditions & Temperature',
    view_precipitation: '💧 Precipitation & Chance of Rain',
    view_wind: '💨 Wind Speed & Waves',
    time_format: 'Time Format',
    time_auto: 'Auto (from locale)',
    time_12: '12-hour (12AM, 1PM)',
    time_24: '24-hour (13:00, 14:00)',
    temp_sensor_override: 'Temperature Sensor Override (Optional)',
    custom_highlights_text: 'Custom Highlights Text (Optional)',
    custom_highlights_placeholder: 'Custom announcement or smart summary',
    custom_card_height: 'Custom Card Height (Optional, e.g. 400px)',
    enable_scroll: 'Enable Internal Scrolling (Smooth Scroll)',
    show_highlights: 'Show Highlights Card (Smart Highlights)',
    show_details: 'Show Detail Tiles (Apple Weather Wind, Humidity, Pressure, Feels Like, etc.)',
    map_url: 'Map / Radar URL or Path (Optional)',
    map_url_placeholder: 'e.g. /map or https://embed.windy.com',
    show_bottom_bar: 'Show iOS Bottom Bar (Visible only when 2+ locations configured)',
    animated_background: 'Dynamic Weather Sky Background (Rain, Snow, Thunder, Sunlight)',
    transparent_background: 'Transparent Background (Blend with HA theme)',
  },
  de: {
    weather_entity: 'Wetter-Entität *',
    select_weather_entity: 'Wetter-Entität auswählen...',
    custom_location_name: 'Benutzerdefinierter Standortname (Optional)',
    location_placeholder: 'z. B. Berlin',
    additional_locations_title: '🌍 Weitere Standorte (Multi-Standort)',
    additional_locations_desc: 'Weitere Standorte, zwischen denen durch Wischen oder Tippen auf die unteren Punkte gewechselt werden kann.',
    add_location_placeholder: '+ Neuen Standort hinzufügen...',
    remove: 'Entfernen',
    add_city_help: '💡 Um weitere Städte hinzuzufügen: Fügen Sie in Home Assistant unter Einstellungen > Geräte & Dienste > Integration hinzufügen Met.no oder Open-Meteo hinzu.',
    card_layout_shape: 'Kartenlayout-Format',
    layout_square_scroll: '🔄 Quadrat - Scrollbar (1:1 mit internem Scrollen)',
    layout_square_fit: '⏹ Quadrat - Angepasst (1:1 Widget ohne Scrollen)',
    layout_default: '📱 Standard (Vollständige vertikale Ansicht)',
    layout_compact: '▭ Kompakt (Horizontales Rechteck)',
    layout_mini: '🏷 Mini (Minimalistisches Schnellansicht-Widget)',
    language: 'Kartensprache',
    language_auto: 'Automatisch (Home Assistant-Sprache)',
    default_view_mode: 'Standardansichtsmodus',
    view_condition: '⛅ Bedingungen & Temperatur',
    view_precipitation: '💧 Niederschlag & Regenwahrscheinlichkeit',
    view_wind: '💨 Windgeschwindigkeit & Wellen',
    time_format: 'Zeitformat',
    time_auto: 'Automatisch (nach Sprache)',
    time_12: '12-Stunden (12AM, 1PM)',
    time_24: '24-Stunden (13:00, 14:00)',
    temp_sensor_override: 'Temperatursensor überschreiben (Optional)',
    custom_highlights_text: 'Benutzerdefinierter Highlight-Text (Optional)',
    custom_highlights_placeholder: 'Eigene Ankündigung oder smarte Wetterzusammenfassung',
    custom_card_height: 'Benutzerdefinierte Kartenhöhe (Optional, z. B. 400px)',
    enable_scroll: 'Internes Scrollen aktivieren (Flüssiges Scrollen)',
    show_highlights: 'Highlight-Karte anzeigen',
    show_details: 'Detailkacheln anzeigen (Apple Weather Wind, Feuchtigkeit, Druck usw.)',
    map_url: 'Karten- / Radar-URL oder Pfad (Optional)',
    map_url_placeholder: 'z. B. /map oder https://embed.windy.com',
    show_bottom_bar: 'iOS-Untenleiste anzeigen (Nur sichtbar bei 2+ Standorten)',
    animated_background: 'Dynamischer Himmelshintergrund (Regen, Schnee, Gewitter)',
    transparent_background: 'Transparenter Hintergrund (Mit HA-Dashboard verschmelzen)',
  },
  es: {
    weather_entity: 'Entidad meteorológica *',
    select_weather_entity: 'Seleccionar entidad meteorológica...',
    custom_location_name: 'Nombre de ubicación personalizado (Opcional)',
    location_placeholder: 'ej. Madrid',
    additional_locations_title: '🌍 Ubicaciones adicionales (Multi-ubicación)',
    additional_locations_desc: 'Ubicaciones adicionales intercambiables deslizando o tocando los puntos inferiores.',
    add_location_placeholder: '+ Añadir nueva ubicación...',
    remove: 'Eliminar',
    add_city_help: '💡 Para añadir diferentes ciudades: En Home Assistant vaya a Ajustes > Dispositivos y Servicios > Añadir integración y configure Met.no u Open-Meteo.',
    card_layout_shape: 'Diseño de la tarjeta',
    layout_square_scroll: '🔄 Cuadrado - Con scroll (1:1 con desplazamiento interno)',
    layout_square_fit: '⏹ Cuadrado - Ajustado (1:1 Widget sin desplazamiento)',
    layout_default: '📱 Predeterminado (Estilo vertical teléfono completo)',
    layout_compact: '▭ Compacto (Rectángulo horizontal)',
    layout_mini: '🏷 Mini (Widget minimalista de vistazo rápido)',
    language: 'Idioma de la tarjeta',
    language_auto: 'Automático (Idioma de Home Assistant)',
    default_view_mode: 'Modo de vista predeterminado',
    view_condition: '⛅ Condiciones y Temperatura',
    view_precipitation: '💧 Precipitación y Probabilidad de lluvia',
    view_wind: '💨 Velocidad del viento y Ondas',
    time_format: 'Formato de hora',
    time_auto: 'Automático (según región)',
    time_12: '12 horas (12AM, 1PM)',
    time_24: '24 horas (13:00, 14:00)',
    temp_sensor_override: 'Anulación de sensor de temperatura (Opcional)',
    custom_highlights_text: 'Texto personalizado de destacados (Opcional)',
    custom_highlights_placeholder: 'Anuncio personalizado o resumen inteligente',
    custom_card_height: 'Altura personalizada de tarjeta (Opcional, ej. 400px)',
    enable_scroll: 'Habilitar desplazamiento interno (Scroll fluido)',
    show_highlights: 'Mostrar tarjeta de destacados',
    show_details: 'Mostrar fichas de detalles (Apple Weather Viento, Humedad, Presión, etc.)',
    map_url: 'URL o ruta de Mapa / Radar (Opcional)',
    map_url_placeholder: 'ej. /map o https://embed.windy.com',
    show_bottom_bar: 'Mostrar barra inferior de iOS (Visible solo con 2+ ubicaciones)',
    animated_background: 'Fondo de cielo dinámico (Lluvia, Nieve, Tormenta)',
    transparent_background: 'Fondo transparente (Combinar con el tema de HA)',
  },
  fr: {
    weather_entity: 'Entité météo *',
    select_weather_entity: 'Sélectionner une entité météo...',
    custom_location_name: 'Nom de localisation personnalisé (Optionnel)',
    location_placeholder: 'ex. Paris',
    additional_locations_title: '🌍 Emplacements supplémentaires (Multi-emplacement)',
    additional_locations_desc: 'Emplacements météo supplémentaires accessibles par balayage ou via les points inférieurs.',
    add_location_placeholder: '+ Ajouter un nouvel emplacement...',
    remove: 'Supprimer',
    add_city_help: '💡 Pour ajouter d\'autres villes: Dans Home Assistant, allez dans Paramètres > Appareils et services > Ajouter une intégration et ajoutez Met.no ou Open-Meteo.',
    card_layout_shape: 'Disposition de la carte',
    layout_square_scroll: '🔄 Carré - Avec défilement (1:1 avec défilement interne)',
    layout_square_fit: '⏹ Carré - Ajusté (1:1 Widget sans défilement)',
    layout_default: '📱 Défaut (Style vertical complet type iPhone)',
    layout_compact: '▭ Compact (Rectangle horizontal)',
    layout_mini: '🏷 Mini (Widget minimaliste d\'aperçu rapide)',
    language: 'Langue de la carte',
    language_auto: 'Automatique (Langue de Home Assistant)',
    default_view_mode: 'Mode d\'affichage par défaut',
    view_condition: '⛅ Conditions et Température',
    view_precipitation: '💧 Précipitations et Probabilité de pluie',
    view_wind: '💨 Vitesse du vent et Ondes',
    time_format: 'Format de l\'heure',
    time_auto: 'Automatique (selon la région)',
    time_12: '12 heures (12AM, 1PM)',
    time_24: '24 heures (13:00, 14:00)',
    temp_sensor_override: 'Remplacement du capteur de température (Optionnel)',
    custom_highlights_text: 'Texte personnalisé des points forts (Optionnel)',
    custom_highlights_placeholder: 'Annonce personnalisée ou résumé météo intelligent',
    custom_card_height: 'Hauteur personnalisée de carte (Optionnel, ex. 400px)',
    enable_scroll: 'Activer le défilement interne (Défilement fluide)',
    show_highlights: 'Afficher la carte des points forts',
    show_details: 'Afficher les tuiles de détail (Apple Weather Vent, Humidité, Pression, etc.)',
    map_url: 'URL ou chemin Carte / Radar (Optionnel)',
    map_url_placeholder: 'ex. /map ou https://embed.windy.com',
    show_bottom_bar: 'Afficher la barre inférieure iOS (Visible uniquement avec 2+ emplacements)',
    animated_background: 'Arrière-plan céleste dynamique (Pluie, Neige, Orage)',
    transparent_background: 'Arrière-plan transparent (Fusionner avec le thème HA)',
  },
};

export function getEditorTranslation(lang?: string): EditorTranslations {
  if (!lang) return editorTranslations.en;
  const clean = lang.toLowerCase().split(/[-_]/)[0];
  return editorTranslations[clean] || editorTranslations.en;
}
