import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [16, 48, 128];
const inputFile = path.join(__dirname, 'icon-master.png');
const outputDir = path.join(__dirname, 'dist');

async function generateIcons() {
  try {
    for (const size of sizes) {
      const outputFile = path.join(outputDir, `icon${size}.png`);
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      console.log(`Generated icon${size}.png`);
    }
    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();