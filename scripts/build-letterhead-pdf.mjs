import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const inputHtml = path.resolve('public/templates/hlugiso-official-letterhead.html');
const outputPdf = path.resolve('public/HLUGISO_Official_Letterhead.pdf');
const outputPng = path.resolve('C:/Users/thabo/.gemini/antigravity/brain/3f60b67f-f127-4f7b-b0db-c515cda3d608/letterhead-preview.png');

const cmdPdf = `"${chromePath}" --headless --disable-gpu --print-to-pdf="${outputPdf}" --no-pdf-header-footer "${inputHtml}"`;
const cmdPng = `"${chromePath}" --headless --disable-gpu --screenshot="${outputPng}" --window-size=1200,1600 "${inputHtml}"`;

try {
  execSync(cmdPdf, { stdio: 'inherit' });
  console.log('PDF rendered successfully:', fs.statSync(outputPdf).size, 'bytes');
  execSync(cmdPng, { stdio: 'inherit' });
  console.log('PNG rendered successfully:', fs.statSync(outputPng).size, 'bytes');
} catch (e) {
  console.error('Error rendering:', e.message);
}
