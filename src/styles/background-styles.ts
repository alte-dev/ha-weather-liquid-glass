export function getWeatherBackground(condition: string, isNight: boolean): string {
  const cond = (condition || '').toLowerCase();

  if (isNight) {
    if (cond.includes('thunder') || cond.includes('lightning')) {
      return 'linear-gradient(180deg, #101221 0%, #1c1d33 50%, #282845 100%)';
    }
    if (cond.includes('rain') || cond.includes('pouring')) {
      return 'linear-gradient(180deg, #131b29 0%, #1e2a3d 50%, #29374d 100%)';
    }
    if (cond.includes('cloud')) {
      return 'linear-gradient(180deg, #0f1828 0%, #1a263d 50%, #273854 100%)';
    }
    if (cond.includes('snow')) {
      return 'linear-gradient(180deg, #1a2232 0%, #293448 50%, #3a4860 100%)';
    }
    // Clear night
    return 'linear-gradient(180deg, #0a1122 0%, #121f3b 50%, #1c2e54 100%)';
  }

  // Daytime
  switch (cond) {
    case 'sunny':
    case 'clear':
    case 'clear-day':
      return 'linear-gradient(180deg, #1d5cb6 0%, #2974d6 45%, #4295f5 100%)';

    case 'partlycloudy':
    case 'partly-cloudy':
    case 'partly-cloudy-day':
      return 'linear-gradient(180deg, #1b4d88 0%, #2767b0 45%, #3d87d4 100%)';

    case 'cloudy':
    case 'overcast':
      // Apple iOS dark moody cloudy overcast background
      return 'linear-gradient(180deg, #374151 0%, #2e3745 45%, #1f2631 100%)';

    case 'rainy':
    case 'pouring':
    case 'rain':
    case 'extreme-rain':
      return 'linear-gradient(180deg, #1e293b 0%, #273549 45%, #16202c 100%)';

    case 'lightning':
    case 'lightning-rainy':
    case 'thunderstorm':
      return 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 45%, #16162a 100%)';

    case 'snowy':
    case 'snow':
    case 'snowy-rainy':
    case 'sleet':
    case 'hail':
      return 'linear-gradient(180deg, #334155 0%, #475569 45%, #64748b 100%)';

    case 'fog':
    case 'windy':
    case 'windy-variant':
      return 'linear-gradient(180deg, #374151 0%, #475569 45%, #64748b 100%)';

    default:
      return 'linear-gradient(180deg, #2563eb 0%, #3b82f6 45%, #60a5fa 100%)';
  }
}
