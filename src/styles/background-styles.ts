export function getWeatherBackground(condition: string, isNight: boolean): string {
  const cond = (condition || '').toLowerCase();

  if (isNight) {
    if (cond.includes('thunder') || cond.includes('lightning')) {
      return 'linear-gradient(180deg, #141726 0%, #1c1a33 50%, #0d0f1a 100%)';
    }
    if (cond.includes('rain') || cond.includes('pouring')) {
      return 'linear-gradient(180deg, #1c2436 0%, #161c2b 50%, #0e1320 100%)';
    }
    if (cond.includes('cloud')) {
      return 'linear-gradient(180deg, #1f2738 0%, #182030 50%, #101622 100%)';
    }
    if (cond.includes('snow')) {
      return 'linear-gradient(180deg, #1a2232 0%, #293448 50%, #3a4860 100%)';
    }
    // Clear night (iOS deep indigo to midnight black-blue)
    return 'linear-gradient(180deg, #1c2340 0%, #151b32 45%, #0e1428 100%)';
  }

  // Daytime: Rich, vibrant, saturated Apple California sky blue
  switch (cond) {
    case 'sunny':
    case 'clear':
    case 'clear-day':
      return 'linear-gradient(180deg, #4d82c8 0%, #447ec5 30%, #4a84cf 65%, #5993dc 100%)';

    case 'partlycloudy':
    case 'partly-cloudy':
    case 'partly-cloudy-day':
      return 'linear-gradient(180deg, #4a7cb9 0%, #4379bf 30%, #4982cc 65%, #5790d8 100%)';

    case 'cloudy':
    case 'overcast':
      // Apple iOS overcast slate blue-grey
      return 'linear-gradient(180deg, #6b7a90 0%, #5c6b80 40%, #4d5b70 100%)';

    case 'rainy':
    case 'pouring':
    case 'rain':
    case 'extreme-rain':
      // Apple iOS rainy moody grey-blue
      return 'linear-gradient(180deg, #5a6479 0%, #414c61 30%, #384358 100%)';

    case 'lightning':
    case 'lightning-rainy':
    case 'thunderstorm':
      return 'linear-gradient(180deg, #3d4659 0%, #2e3646 40%, #202633 100%)';

    case 'snowy':
    case 'snow':
    case 'snowy-rainy':
    case 'sleet':
    case 'hail':
      return 'linear-gradient(180deg, #7b8ea6 0%, #64758d 50%, #53647a 100%)';

    case 'fog':
    case 'windy':
    case 'windy-variant':
      return 'linear-gradient(180deg, #6b7a90 0%, #5c6b80 40%, #4d5b70 100%)';

    default:
      return 'linear-gradient(180deg, #4d82c8 0%, #447ec5 30%, #4a84cf 65%, #5993dc 100%)';
  }
}
