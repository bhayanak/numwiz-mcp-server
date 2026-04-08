import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="20" fill="url(#bg)"/>
  <!-- color should be gradient not solid fill and more than colorfull for text 4 and 2 and also add some small circles and lines to make it more dynamic and interesting -->
  <text x="42" y="58" font-family="Arial Black, sans-serif" font-size="60"
        font-weight="900" fill="rgba(0, 255, 132, 0.77)" text-anchor="middle">4</text>
  <text x="80" y="58" font-family="Arial Black, sans-serif" font-size="60"
        font-weight="900" fill="rgba(251, 222, 0, 0.77)" text-anchor="middle">2</text>
  <text x="64" y="90" font-family="Arial, sans-serif" font-size="16"
        fill="rgba(0, 255, 183, 0.9)" text-anchor="middle" font-weight="600">NumWiz</text>
  <text x="64" y="105" font-family="Arial, sans-serif" font-size="10"
        fill="rgba(0, 238, 255, 0.9)" text-anchor="middle" font-weight="600">MCP Server</text>
  <circle cx="20" cy="20" r="3" fill="rgb(228, 214, 81)"/>
  <circle cx="108" cy="25" r="7" fill="rgba(126, 243, 87, 0.74)"/>
  <circle cx="100" cy="105" r="3" fill="rgba(232, 239, 121, 0.91)"/>
  <path d="M15 100 l4-8 l4 8" stroke="rgba(221, 221, 88, 0.88)" fill="none" stroke-width="1.5"/>
</svg>`;

async function generateLogo() {
  const rootDir = resolve(__dirname, '..');
  writeFileSync(resolve(rootDir, 'logo.svg'), SVG);
  await sharp(Buffer.from(SVG))
    .resize(128, 128)
    .png()
    .toFile(resolve(rootDir, 'logo.png'));
  await sharp(Buffer.from(SVG))
    .resize(128, 128)
    .png()
    .toFile(resolve(rootDir, 'packages/numwiz-vscode-extension/logo.png'));
  console.log('✅ Logo generated: logo.svg, logo.png');
}

generateLogo();
