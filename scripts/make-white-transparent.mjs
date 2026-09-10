import sharp from 'sharp';

async function makeWhiteTransparent() {
  const { data, info } = await sharp('public/branding/hlugiso-logo-dark.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // In hlugiso-logo-dark.png, background is dark grey/charcoal (approx r: 40-50, g: 50-60, b: 55-65)
  // The logo text and emblem are pure white (r > 220, g > 220, b > 220)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Check brightness
    const brightness = (r + g + b) / 3;
    if (brightness < 80) {
      data[i + 3] = 0; // Alpha = 0 (transparent background)
    } else if (brightness < 160) {
      const factor = (brightness - 80) / 80;
      data[i + 3] = Math.round(factor * 255);
    } else {
      data[i + 3] = 255;
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile('public/branding/hlugiso-logo-white.png');

  console.log('White transparent logo generated');
}

makeWhiteTransparent().catch(console.error);
