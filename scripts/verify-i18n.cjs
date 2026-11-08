const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1000 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. TEST TURKISH MODE
  await page.evaluate(() => {
    const langSelect = document.getElementById('lang-picker');
    langSelect.value = 'tr';
    langSelect.dispatchEvent(new Event('change'));
  });
  await new Promise(r => setTimeout(r, 600));

  const trData = await page.evaluate(() => {
    const card = document.querySelector('weather-liquid-glass-card');
    const sr = card?.shadowRoot;
    if (!sr) return { error: 'No shadowRoot' };

    // Get text content of forecast card header
    const forecastHeader = sr.querySelector('ios27-forecast-card .ios-forecast-title')?.textContent?.trim();
    // Daily section header
    const dailySectionTitle = sr.querySelector('ios27-forecast-card [style*="uppercase"] span')?.textContent?.trim();
    // All day labels in daily list
    const dayLabels = Array.from(sr.querySelectorAll('ios27-daily-list .ios-day-label')).map(el => el.textContent.trim());
    // Highlights header
    const highlightsTitle = sr.querySelector('ios27-highlights .ios-highlights-title-left span')?.textContent?.trim();
    // Header location name
    const locName = sr.querySelector('ios27-header .ios-location-name')?.textContent?.trim();
    // Detail tiles titles
    const detailTitles = Array.from(sr.querySelectorAll('ios27-detail-tiles .ios-tile-title')).map(el => el.textContent.trim());

    return {
      forecastHeader,
      dailySectionTitle,
      dayLabels,
      highlightsTitle,
      locName,
      detailTitles,
      fullShadowText: sr.textContent,
    };
  });

  console.log('--- TURKISH TEST RESULTS ---');
  console.log('Forecast Header:', trData.forecastHeader);
  console.log('Daily Section Title:', trData.dailySectionTitle);
  console.log('Day Labels:', trData.dayLabels);
  console.log('Highlights Title:', trData.highlightsTitle);
  console.log('Detail Tiles:', trData.detailTitles);

  const trBugunCount = trData.dayLabels.filter(l => l === 'Bugün').length;
  console.log('Count of "Bugün" in daily list:', trBugunCount);

  // Take screenshot in TR
  await page.screenshot({
    path: 'C:\\Users\\umutd\\.gemini\\antigravity\\brain\\83adb9a2-3834-4579-99bc-82d32719e704\\test-tr-card.png',
  });

  // 2. TEST ENGLISH MODE
  await page.evaluate(() => {
    const langSelect = document.getElementById('lang-picker');
    langSelect.value = 'en';
    langSelect.dispatchEvent(new Event('change'));
  });
  await new Promise(r => setTimeout(r, 600));

  const enData = await page.evaluate(() => {
    const card = document.querySelector('weather-liquid-glass-card');
    const sr = card?.shadowRoot;
    if (!sr) return { error: 'No shadowRoot' };

    const forecastHeader = sr.querySelector('ios27-forecast-card .ios-forecast-title')?.textContent?.trim();
    const dailySectionTitle = sr.querySelector('ios27-forecast-card [style*="uppercase"] span')?.textContent?.trim();
    const dayLabels = Array.from(sr.querySelectorAll('ios27-daily-list .ios-day-label')).map(el => el.textContent.trim());
    const highlightsTitle = sr.querySelector('ios27-highlights .ios-highlights-title-left span')?.textContent?.trim();
    const detailTitles = Array.from(sr.querySelectorAll('ios27-detail-tiles .ios-tile-title')).map(el => el.textContent.trim());

    return {
      forecastHeader,
      dailySectionTitle,
      dayLabels,
      highlightsTitle,
      detailTitles,
    };
  });

  console.log('\n--- ENGLISH TEST RESULTS ---');
  console.log('Forecast Header:', enData.forecastHeader);
  console.log('Daily Section Title:', enData.dailySectionTitle);
  console.log('Day Labels:', enData.dayLabels);
  console.log('Highlights Title:', enData.highlightsTitle);
  console.log('Detail Tiles:', enData.detailTitles);

  const enTodayCount = enData.dayLabels.filter(l => l === 'Today').length;
  console.log('Count of "Today" in daily list:', enTodayCount);

  // Take screenshot in EN
  await page.screenshot({
    path: 'C:\\Users\\umutd\\.gemini\\antigravity\\brain\\83adb9a2-3834-4579-99bc-82d32719e704\\test-en-card.png',
  });

  // 3. TEST EDITOR HELP TEXT (TR and EN)
  const editorResults = await page.evaluate(async () => {
    // Dynamically import editor if not loaded
    // already imported

    const editorTr = document.createElement('weather-liquid-glass-card-editor');
    editorTr.hass = {
      states: {
        'weather.babaeski': { state: 'sunny', attributes: { friendly_name: 'Babaeski' } }
      },
      locale: { language: 'tr' }
    };
    editorTr.setConfig({ entity: 'weather.babaeski', locale: 'tr', daily_count: 10 });
    document.body.appendChild(editorTr);

    await editorTr.updateComplete;
    const trEditorText = editorTr.shadowRoot?.textContent || editorTr.textContent;

    const editorEn = document.createElement('weather-liquid-glass-card-editor');
    editorEn.hass = {
      states: {
        'weather.babaeski': { state: 'sunny', attributes: { friendly_name: 'Babaeski' } }
      },
      locale: { language: 'en' }
    };
    editorEn.setConfig({ entity: 'weather.babaeski', locale: 'en', daily_count: 10 });
    document.body.appendChild(editorEn);

    await editorEn.updateComplete;
    const enEditorText = editorEn.shadowRoot?.textContent || editorEn.textContent;

    return { trEditorText, enEditorText };
  });

  console.log('\n--- EDITOR RESULTS ---');
  const trHasHelp = editorResults.trEditorText.includes('kaç günlük veri sağlıyorsa en fazla o kadar gün listelenebilir');
  const enHasHelp = editorResults.enEditorText.includes('will only show as many days as your weather integration provides');
  console.log('TR Editor has help message:', trHasHelp);
  console.log('EN Editor has help message:', enHasHelp);

  await browser.close();

  const success =
    trBugunCount === 1 &&
    enTodayCount === 1 &&
    trHasHelp &&
    enHasHelp &&
    trData.dailySectionTitle.includes('Günlük') &&
    enData.dailySectionTitle.includes('Forecast');

  if (success) {
    console.log('\n========================================');
    console.log('SUCCESS: ALL LOCALIZATION AND DEDUPLICATION TESTS PASSED PERFECTLY!');
    console.log('========================================');
  } else {
    console.error('\nFAILURE: One or more assertions failed!');
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
