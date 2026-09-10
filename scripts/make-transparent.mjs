import sharp from 'sharp';

async function makeTransparent() {
  const { data, info } = await sharp('public/branding/hlugiso-logo-primary.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Make near-white transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // If pixel is white or almost white (e.g. > 245 in all channels)
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // Alpha = 0
    } else if (r > 220 && g > 220 && b > 220) {
      // Soft antialiasing edge
      const factor = (255 - Math.max(r, g, b)) / 35;
      data[i + 3] = Math.round(factor * 255);
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
  .toFile('public/branding/hlugiso-logo-transparent.png');

  console.log('Transparent logo generated successfully');
}

makeTransparent().catch(console.error);
