import sharp from 'sharp';

async function extractLogos() {
  const input = 'public/branding/hlugiso-logo.jpg';
  
  // Crop 1: Primary Full Logo (Top Left)
  // Let's inspect coordinates: The top logo with teal icon and "HLUGISO (PTY) LTD"
  // Let's crop x: 220, y: 70, width: 920, height: 180
  await sharp(input)
    .extract({ left: 240, top: 75, width: 890, height: 175 })
    .png()
    .toFile('public/branding/hlugiso-logo-primary.png');

  // Crop 2: Dark Background Logo (Bottom Right)
  // From roughly x: 730, y: 530, width: 660, height: 200
  await sharp(input)
    .extract({ left: 740, top: 540, width: 640, height: 180 })
    .png()
    .toFile('public/branding/hlugiso-logo-dark.png');

  // Crop 3: Emblem / Icon only (Standalone)
  await sharp(input)
    .extract({ left: 240, top: 80, width: 240, height: 160 })
    .png()
    .toFile('public/branding/hlugiso-emblem.png');

  console.log('Logos extracted');
}

extractLogos().catch(console.error);
