import type { HomeAssistant } from 'custom-card-helpers';

class LocationService {
  private _cachedLocation: string | null = null;
  private _fetchPromise: Promise<string | null> | null = null;

  /**
   * Resolves location name locally from companion app sensors without any external network calls.
   */
  public resolveFromSensors(hass: HomeAssistant): string | null {
    if (!hass?.states) return null;

    const geocodedSensors = Object.keys(hass.states).filter(
      id => id.startsWith('sensor.') && (id.includes('geocoded_location') || id.includes('geo_location'))
    );
    for (const sensorId of geocodedSensors) {
      const stateObj = hass.states[sensorId];
      if (stateObj?.attributes) {
        const locality =
          stateObj.attributes.Locality ||
          stateObj.attributes.locality ||
          stateObj.attributes.City ||
          stateObj.attributes.city;
        if (locality && typeof locality === 'string' && locality.trim()) {
          return locality.trim();
        }
      }
      if (stateObj?.state && stateObj.state !== 'unknown' && stateObj.state !== 'unavailable') {
        const parts = stateObj.state.split(',');
        if (parts.length > 0 && parts[0].trim().length > 1) {
          return parts[0].trim();
        }
      }
    }
    return null;
  }

  /**
   * Opt-in reverse geocoding using BigDataCloud API.
   * MUST ONLY be called when reverse_geocode is explicitly enabled by the user in card configuration.
   */
  public async reverseGeocode(hass: HomeAssistant, locale: string = 'en'): Promise<string | null> {
    if (this._cachedLocation) {
      return this._cachedLocation;
    }

    // 1. Try local sensors first to avoid unnecessary network calls
    const sensorLoc = this.resolveFromSensors(hass);
    if (sensorLoc) {
      this._cachedLocation = sensorLoc;
      return sensorLoc;
    }

    // 2. Extract latitude & longitude from HA configuration or zone.home
    const rawLat = hass.config?.latitude ?? (hass.states?.['zone.home']?.attributes?.latitude as number | undefined);
    const rawLon = hass.config?.longitude ?? (hass.states?.['zone.home']?.attributes?.longitude as number | undefined);

    if (rawLat === undefined || rawLon === undefined || rawLat === null || rawLon === null) {
      return null;
    }

    // Round coordinates to 3 decimal places (~110m precision) to avoid sending exact GPS pinpoint coordinates
    const lat = Number(rawLat).toFixed(3);
    const lon = Number(rawLon).toFixed(3);

    // 3. Check localStorage cache
    const cacheKey = `ios27_geo_${lat}_${lon}_${locale}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached && cached.trim()) {
        this._cachedLocation = cached.trim();
        return this._cachedLocation;
      }
    } catch {
      // localStorage may be disabled
    }

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
        console.warn('Weather Liquid Glass: Reverse geocoding request failed', err);
      } finally {
        this._fetchPromise = null;
      }
      return null;
    })();

    return this._fetchPromise;
  }

  /**
   * Alias for backward compatibility. Reverse geocodes only when invoked.
   */
  public async resolveLocationName(hass: HomeAssistant, locale: string = 'en'): Promise<string | null> {
    return this.reverseGeocode(hass, locale);
  }

  /**
   * Synchronous check if location is already cached
   */
  public getCachedLocation(): string | null {
    return this._cachedLocation;
  }

  public clearCache(): void {
    this._cachedLocation = null;
  }
}

export default new LocationService();
