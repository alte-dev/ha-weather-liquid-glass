import type { HomeAssistant } from 'custom-card-helpers';

class LocationService {
  private _cachedLocation: string | null = null;
  private _fetchPromise: Promise<string | null> | null = null;

  /**
   * Automatically resolves the district, city, or town name from Home Assistant's
   * coordinates (reverse geocoding) or geocoded companion app sensors.
   */
  public async resolveLocationName(hass: HomeAssistant, locale: string = 'tr'): Promise<string | null> {
    if (this._cachedLocation) {
      return this._cachedLocation;
    }

    // 1. Check if a companion app geocoded location sensor exists
    const geocodedSensors = Object.keys(hass.states).filter(
      id => id.startsWith('sensor.') && (id.includes('geocoded_location') || id.includes('geo_location'))
    );
    for (const sensorId of geocodedSensors) {
      const stateObj = hass.states[sensorId];
      if (stateObj?.attributes) {
        const locality = stateObj.attributes.Locality || stateObj.attributes.locality || stateObj.attributes.City || stateObj.attributes.city;
        if (locality && typeof locality === 'string' && locality.trim()) {
          this._cachedLocation = locality.trim();
          return this._cachedLocation;
        }
      }
      if (stateObj?.state && stateObj.state !== 'unknown' && stateObj.state !== 'unavailable') {
        const parts = stateObj.state.split(',');
        if (parts.length > 0 && parts[0].trim().length > 1) {
          this._cachedLocation = parts[0].trim();
          return this._cachedLocation;
        }
      }
    }

    // 2. Extract latitude & longitude from HA configuration or zone.home
    const lat = hass.config?.latitude ?? (hass.states['zone.home']?.attributes?.latitude as number | undefined);
    const lon = hass.config?.longitude ?? (hass.states['zone.home']?.attributes?.longitude as number | undefined);

    if (!lat || !lon) {
      return null;
    }

    // 3. Check localStorage cache for instantaneous display
    const cacheKey = `ios27_geo_${lat.toFixed(3)}_${lon.toFixed(3)}_${locale}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached && cached.trim()) {
        this._cachedLocation = cached.trim();
        return this._cachedLocation;
      }
    } catch {
      // localStorage may be disabled in some environments
    }

    // 4. Reverse geocode via BigDataCloud client API (free, CORS-enabled, no API key needed)
    if (this._fetchPromise) {
      return this._fetchPromise;
    }

    this._fetchPromise = (async () => {
      try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${locale}`;
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          const place = data.city || data.locality || data.principalSubdivision;
          if (place && typeof place === 'string') {
            const cleanPlace = place.trim();
            this._cachedLocation = cleanPlace;
            try {
              localStorage.setItem(cacheKey, cleanPlace);
            } catch {
              // Ignore localStorage errors
            }
            return cleanPlace;
          }
        }
      } catch (err) {
        console.warn('iOS 27 Weather: Reverse geocoding failed', err);
      } finally {
        this._fetchPromise = null;
      }
      return null;
    })();

    return this._fetchPromise;
  }

  /**
   * Synchronous check if location is already cached
   */
  public getCachedLocation(): string | null {
    return this._cachedLocation;
  }
}

export default new LocationService();
