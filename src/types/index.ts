import type { HomeAssistant } from 'custom-card-helpers';

export type ActiveViewMode = 'condition' | 'precipitation' | 'wind';

export interface WeatherForecast {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  wind_speed?: number;
  wind_bearing?: number | string;
  wind_gust_speed?: number;
  humidity?: number;
  pressure?: number;
  uv_index?: number;
  is_daytime?: boolean;
}

export type CardLayout = 'default' | 'square-scroll' | 'square-fit' | 'compact' | 'mini' | 'square';

export interface WeatherLocationConfig {
  entity: string;
  name?: string;
  temp_sensor?: string;
}

export interface Ios27WeatherCardConfig {
  type: string;
  entity: string;
  name?: string;
  temp_sensor?: string;
  entities?: Array<string | WeatherLocationConfig>;
  locations?: Array<string | WeatherLocationConfig>;
  sun_entity?: string;
  hourly_forecast_type?: 'hourly' | 'daily';
  daily_forecast_type?: 'daily';
  hourly_count?: number;
  daily_count?: number;
  card_layout?: CardLayout;
  card_height?: string;
  scrollable?: boolean;
  default_view?: ActiveViewMode;
  show_highlights?: boolean;
  highlights_text?: string;
  show_details?: boolean;
  show_bottom_bar?: boolean;
  map_url?: string;
  sensor_apparent_temp?: string;
  sensor_humidity?: string;
  sensor_pressure?: string;
  sensor_wind_speed?: string;
  sensor_wind_bearing?: string;
  sensor_wind_gust?: string;
  sensor_uv?: string;
  sensor_visibility?: string;
  sensor_precipitation?: string;
  sensor_moon?: string;
  animated_background?: boolean;
  transparent_background?: boolean;
  time_format?: '12' | '24' | 'auto';
  temp_unit?: '°C' | '°F' | 'auto';
  wind_unit?: string;
  precip_unit?: string;
  locale?: string;
  tap_action?: any;
}

export interface WeatherCardState {
  currentTemp: number | null;
  highTemp: number | null;
  lowTemp: number | null;
  condition: string;
  friendlyCondition: string;
  locationName: string;
  isNight: boolean;
  hourlyForecasts: WeatherForecast[];
  dailyForecasts: WeatherForecast[];
  tempUnit: string;
  windSpeedUnit: string;
  precipUnit: string;
}
