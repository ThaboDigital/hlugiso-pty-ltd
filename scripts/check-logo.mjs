import sharp from 'sharp';

async function processLogo() {
  const inputPath = 'public/branding/hlugiso-logo.jpg';
  const img = sharp(inputPath);
  const meta = await img.metadata();
  console.log('Image metadata:', meta.width, 'x', meta.height);
}

processLogo().catch(console.error);
