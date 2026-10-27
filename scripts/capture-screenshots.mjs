import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('images');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const scenarios = [
  {
    name: 'preview-default.png',
    url: 'http://localhost:5175/?hideControls=true&layout=default&condition=cloudy&view=condition',
    width: 600,
    height: 1000,
  },
  {
    name: 'preview-square-fit.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-fit&condition=cloudy&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'preview-square-scroll.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=rainy&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'preview-compact.png',
    url: 'http://localhost:5175/?hideControls=true&layout=compact&condition=sunny&view=condition',
    width: 600,
    height: 480,
  },
  {
    name: 'preview-mini.png',
    url: 'http://localhost:5175/?hideControls=true&layout=mini&condition=rainy&view=condition',
    width: 500,
    height: 300,
  },
  {
    name: 'preview-rain.png',
    url: 'http://localhost:5175/?hideControls=true&layout=default&condition=rainy&view=precipitation',
    width: 600,
    height: 1000,
  },
  {
    name: 'preview-wind.png',
    url: 'http://localhost:5175/?hideControls=true&layout=default&condition=cloudy&view=wind',
    width: 600,
    height: 1000,
  },
  // Atmospheric Themes Showcase (Sunny, Cloudy, Rainy, Snowy, Thunderstorm, Clear Night)
  {
    name: 'theme-sunny.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=sunny&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'theme-cloudy.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=cloudy&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'theme-rainy.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=rainy&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'theme-snowy.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=snowy&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'theme-thunderstorm.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=thunderstorm&view=condition',
    width: 500,
    height: 520,
  },
  {
    name: 'theme-night.png',
    url: 'http://localhost:5175/?hideControls=true&layout=square-scroll&condition=clear-night&view=condition',
    width: 500,
    height: 520,
  },
];

async function run() {
  console.log('Launching Edge for screenshots...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 1000, deviceScaleFactor: 2 });

  for (const item of scenarios) {
    console.log(`Capturing ${item.name}...`);
    await page.setViewport({ width: item.width, height: item.height, deviceScaleFactor: 2 });
    await page.goto(item.url, { waitUntil: 'networkidle0' });
    
    // Wait for custom element & animations
    await new Promise(r => setTimeout(r, 1200));

    const card = await page.$('#test-card');
    if (card) {
      const filePath = path.join(outDir, item.name);
      await card.screenshot({ path: filePath });
      console.log(`Saved ${item.name} (${filePath})`);
    } else {
      console.error(`Could not find #test-card for ${item.name}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
