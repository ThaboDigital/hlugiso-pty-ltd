import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const logoB64 = fs.readFileSync('public/branding/hlugiso-logo-primary.png').toString('base64');
const fridgeB64 = fs.readFileSync('public/images/mobile-fridge.png').toString('base64');
const toiletB64 = fs.readFileSync('public/images/vip-toilet.png').toString('base64');

// Clean inline SVG helper
const svg = {
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  pin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  landmark: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="6" y2="6"/><line x1="2" x2="22" y1="18" y2="18"/><path d="m4 6 8-4 8 4"/><path d="M6 18v-8"/><path d="M10 18v-8"/><path d="M14 18v-8"/><path d="M18 18v-8"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`,
  idCard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h2"/><path d="M15 13h2"/><path d="M6 16c0-1.5 1.5-2 3-2s3 .5 3 2"/></svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
  hardhat: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>`,
  handshake: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-1.3 1.3"/><path d="m14 14 2.5 2.5"/><path d="m3 7 3-3a1 1 0 0 1 1.4 0l4.3 4.3a1 1 0 0 1 0 1.4l-3 3a1 1 0 0 1-1.4 0l-1.3-1.3"/><path d="M7 10 4.5 7.5"/><circle cx="12" cy="12" r="10"/></svg>`,
  tax: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="12" y1="14" y2="14"/><path d="M16 18h.01"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  cogs: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  restroom: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="m9 20 3-6 3 6"/><path d="M6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/></svg>`,
  sound: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  livestock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z"/><path d="M20 7v10"/></svg>`,
  catering: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 2v14"/><path d="M5 2v14a3 3 0 0 0 3 3h1"/><path d="M7 2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2"/><path d="M15 16v6"/><path d="M9 19v3"/></svg>`,
  truck: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5a1 1 0 0 0-.29-.71l-3-3A1 1 0 0 0 18 8h-3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
};

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HLUGISO (PTY) LTD — Company Profile & Commercial Capabilities</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap" rel="stylesheet">
<style>
  :root {
    --brand-primary: #064E3B; /* Deep Forest Teal */
    --brand-dark: #1F2937;    /* Charcoal */
    --brand-accent: #075E54;  /* Accent Green */
    --brand-light: #F0FDF4;   /* Light Green Tint */
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
  }

  @page {
    size: A4;
    margin: 14mm 16mm 14mm 16mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: var(--gray-800);
    background: #F3F4F6;
    line-height: 1.6;
    font-size: 10pt;
    -webkit-font-smoothing: antialiased;
  }

  .page-container {
    max-width: 960px;
    margin: 24px auto;
    background: #FFFFFF;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  /* Header Section */
  .profile-header {
    background: #FFFFFF;
    padding: 36px 44px 28px 44px;
    border-bottom: 4px solid var(--brand-primary);
    position: relative;
  }
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
  .header-logo {
    height: 56px;
    width: auto;
    object-fit: contain;
  }
  .header-tagline {
    color: var(--gray-600);
    font-size: 9pt;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 8px;
  }
  .header-contacts {
    text-align: right;
    font-size: 9pt;
    color: var(--gray-600);
    line-height: 1.5;
    border-left: 3px solid var(--brand-primary);
    padding-left: 18px;
  }
  .header-contact-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: 3px;
  }
  .header-contact-row svg {
    color: var(--brand-primary);
    flex-shrink: 0;
  }
  .header-contact-row a {
    color: inherit;
    text-decoration: none;
  }
  .header-badge {
    display: inline-block;
    background: var(--brand-light);
    color: var(--brand-primary);
    border: 1px solid rgba(6, 78, 59, 0.25);
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 4px 12px;
    border-radius: 4px;
    margin-top: 20px;
  }

  /* Main Document Content */
  .content-body {
    padding: 36px 44px 44px 44px;
  }

  /* Section Styles */
  .profile-section {
    margin-bottom: 36px;
  }
  .section-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18pt;
    font-weight: 700;
    color: var(--brand-dark);
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 2px solid var(--gray-100);
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .section-icon-wrap {
    color: var(--brand-accent);
    display: flex;
    align-items: center;
  }

  /* Section 1: Executive Summary */
  .prose-lead {
    font-size: 10.5pt;
    line-height: 1.68;
    color: var(--gray-700);
    margin-bottom: 18px;
    text-align: justify;
  }
  .quote-callout {
    background: var(--brand-light);
    border-left: 4px solid var(--brand-primary);
    padding: 20px 24px;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: var(--gray-800);
    font-size: 10.5pt;
    line-height: 1.65;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  }

  /* Section 2: Statutory & Governance Grid */
  .gov-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .gov-card {
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 8px;
    padding: 16px 18px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .gov-card-icon {
    color: var(--brand-accent);
    background: #FFFFFF;
    border: 1px solid var(--gray-200);
    border-radius: 6px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gov-card-label {
    font-size: 7.8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--gray-600);
    margin-bottom: 3px;
  }
  .gov-card-val {
    font-size: 10pt;
    font-weight: 700;
    color: var(--gray-900);
    line-height: 1.35;
  }
  .gov-card-sub {
    font-size: 8.5pt;
    font-weight: 500;
    color: var(--gray-600);
    display: block;
    margin-top: 2px;
  }

  /* Section 3: Vision, Mission & Core Values */
  .values-container {
    background: var(--brand-dark);
    color: #FFFFFF;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 36px;
  }
  .vision-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 32px;
  }
  .vision-mission-col h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 14pt;
    color: #FFFFFF;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .vision-mission-col h3 svg {
    color: #34D399; /* emerald */
  }
  .vision-mission-col p {
    font-size: 9.5pt;
    line-height: 1.6;
    color: #E5E7EB;
  }
  .vm-divider {
    margin: 20px 0;
    border: none;
    border-top: 1px solid #374151;
  }
  .core-values-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 15pt;
    color: #FFFFFF;
    margin-bottom: 16px;
    border-bottom: 1px solid #374151;
    padding-bottom: 8px;
  }
  .core-values-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .core-value-card {
    background: var(--brand-primary);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
  .core-value-title {
    font-size: 10pt;
    font-weight: 700;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .core-value-title svg {
    color: #34D399;
  }
  .core-value-desc {
    font-size: 8.8pt;
    color: #D1D5DB;
    line-height: 1.5;
  }

  /* Section 4: Core Commercial Services Grid */
  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }
  .service-card {
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    padding: 24px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    transition: transform 0.2s ease;
  }
  .service-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--gray-100);
  }
  .service-icon-pill {
    background: var(--brand-light);
    color: var(--brand-primary);
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .service-card-title {
    font-size: 12pt;
    font-weight: 700;
    color: var(--brand-dark);
    line-height: 1.35;
  }
  .service-list {
    list-style: none;
    font-size: 9.3pt;
    color: var(--gray-600);
    line-height: 1.6;
  }
  .service-list li {
    margin-bottom: 10px;
    padding-left: 14px;
    position: relative;
  }
  .service-list li:last-child {
    margin-bottom: 0;
  }
  .service-list li::before {
    content: "•";
    color: var(--brand-primary);
    font-weight: bold;
    font-size: 14pt;
    position: absolute;
    left: 0;
    top: -2px;
  }
  .service-list strong {
    color: var(--gray-900);
    font-weight: 700;
  }

  /* Section 5: Fleet & Equipment Table */
  .fleet-table-wrap {
    overflow: hidden;
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    margin-top: 12px;
  }
  .fleet-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    text-align: left;
  }
  .fleet-table th {
    background: var(--brand-light);
    color: var(--brand-primary);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 8.5pt;
    letter-spacing: 0.5px;
    padding: 14px 18px;
    border-bottom: 2px solid var(--brand-primary);
  }
  .fleet-table td {
    padding: 14px 18px;
    border-bottom: 1px solid var(--gray-100);
    vertical-align: middle;
  }
  .fleet-table tr:last-child td {
    border-bottom: none;
  }
  .fleet-table tr:nth-child(even) td {
    background: #FAFAFA;
  }
  .fleet-asset-cell {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .fleet-thumb {
    width: 65px;
    height: 46px;
    object-fit: contain;
    background: #FFFFFF;
    border: 1px solid var(--gray-200);
    border-radius: 6px;
    padding: 3px;
    flex-shrink: 0;
  }
  .capacity-badge {
    display: inline-block;
    background: #FFFFFF;
    color: var(--brand-primary);
    border: 1.5px solid var(--brand-primary);
    font-weight: 700;
    font-size: 8.8pt;
    padding: 4px 12px;
    border-radius: 20px;
    white-space: nowrap;
  }

  /* Section 6: Commercial Partnership Benefits */
  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 18px;
    margin-top: 14px;
  }
  .benefit-card {
    background: var(--brand-light);
    border: 1px solid rgba(6, 78, 59, 0.2);
    border-radius: 10px;
    padding: 20px;
  }
  .benefit-icon-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .benefit-icon-title svg {
    color: var(--brand-primary);
    flex-shrink: 0;
  }
  .benefit-title {
    font-size: 10.5pt;
    font-weight: 700;
    color: var(--brand-dark);
  }
  .benefit-desc {
    font-size: 9pt;
    color: var(--gray-700);
    line-height: 1.55;
  }

  /* Section 7: Official Contact Block & Footer */
  .footer-cta {
    background: var(--brand-dark);
    color: #FFFFFF;
    padding: 40px 44px;
    border-top: 4px solid var(--brand-primary);
  }
  .footer-cta-box {
    text-align: center;
    max-width: 650px;
    margin: 0 auto 32px auto;
    padding-bottom: 28px;
    border-bottom: 1px solid #374151;
  }
  .footer-cta-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20pt;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 10px;
  }
  .footer-cta-desc {
    font-size: 10.5pt;
    color: #D1D5DB;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--brand-primary);
    color: #FFFFFF;
    font-weight: 700;
    font-size: 10pt;
    padding: 12px 28px;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(6, 78, 59, 0.4);
  }
  .contact-quad-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .contact-col-label {
    color: #34D399;
    font-size: 7.8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 6px;
  }
  .contact-col-val {
    font-size: 10.5pt;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.35;
  }
  .contact-col-sub {
    font-size: 8.8pt;
    color: #9CA3AF;
    margin-top: 4px;
    line-height: 1.4;
  }
  .contact-col-sub a {
    color: #D1D5DB;
    text-decoration: none;
  }
  .footer-legal-bar {
    text-align: center;
    font-size: 8pt;
    color: #6B7280;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid #374151;
  }

  /* Print Specific Optimization */
  @media print {
    body {
      background: #FFFFFF !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page-container {
      max-width: 100% !important;
      margin: 0 !important;
      box-shadow: none !important;
    }
    .profile-header {
      padding: 20px 0 16px 0 !important;
    }
    .content-body {
      padding: 20px 0 20px 0 !important;
    }
    .footer-cta {
      padding: 28px 20px !important;
      background: var(--brand-dark) !important;
      color: #FFFFFF !important;
    }
    .avoid-page-break {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .force-page-break {
      page-break-before: always !important;
      break-before: page !important;
    }
    .no-print {
      display: none !important;
    }
    .values-container {
      background: var(--brand-dark) !important;
      color: #FFFFFF !important;
    }
  }
</style>
</head>
<body>

  <div class="page-container">

    <!-- ================= HEADER ================= -->
    <header class="profile-header avoid-page-break">
      <div class="header-top">
        <div>
          <img class="header-logo" src="data:image/png;base64,${logoB64}" alt="HLUGISO (PTY) LTD Logo" />
          <div class="header-tagline">Funeral &amp; Event Infrastructure &bull; Mobile Cold-Chain &bull; Livestock &bull; Sound</div>
        </div>
        <div class="header-contacts">
          <div class="header-contact-row">
            <span>+27 83 597 6462</span>
            ${svg.phone}
          </div>
          <div class="header-contact-row">
            <span>info@hlugiso.co.za</span>
            ${svg.mail}
          </div>
          <div class="header-contact-row">
            <span>www.hlugiso.co.za</span>
            ${svg.globe}
          </div>
          <div class="header-contact-row">
            <span>Tzaneen, Limpopo</span>
            ${svg.pin}
          </div>
        </div>
      </div>
      <div class="header-badge">
        Official Commercial &amp; Tender Profile &bull; Established 2019
      </div>
    </header>

    <!-- ================= MAIN BODY ================= -->
    <main class="content-body">

      <!-- 1. Executive Summary -->
      <section class="profile-section avoid-page-break">
        <h2 class="section-heading">
          <span class="section-icon-wrap">${svg.landmark}</span>
          1. Executive Summary
        </h2>
        <div class="prose-lead">
          <strong style="color: var(--brand-dark);">HLUGISO (Pty) Ltd</strong> is an established, 100% Black-owned private enterprise based in Greater Tzaneen, Limpopo. Established in 2019, the company delivers complete event infrastructure, weekly funeral and memorial logistics, mobile cold-chain rentals, ceremonial livestock, sound reinforcement, and catering support to private funeral groups, corporate clients, municipal protocol units, event planners, and families.
        </div>
        <div class="quote-callout">
          &ldquo;We specialize in supporting the fast-moving, weekly funeral cycle (Thursday through Sunday). By combining localized Limpopo agricultural sourcing with rapid fleet mobilization, HLUGISO guarantees that weekend services, memorial events, and cultural rites are executed with solemn dignity, spotless hygiene, and absolute operational reliability.&rdquo;
        </div>
      </section>

      <!-- 2. Business & Governance Details -->
      <section class="profile-section avoid-page-break">
        <h2 class="section-heading">
          <span class="section-icon-wrap">${svg.building}</span>
          2. Statutory &amp; Governance Records
        </h2>
        
        <div class="gov-cards-grid">
          <div class="gov-card">
            <div class="gov-card-icon">${svg.building}</div>
            <div>
              <div class="gov-card-label">Registered Entity &amp; Trading Name</div>
              <div class="gov-card-val">HLUGISO (PTY) LTD</div>
              <span class="gov-card-sub">t/a Hlugiso Supply &amp; Hire</span>
            </div>
          </div>

          <div class="gov-card">
            <div class="gov-card-icon">${svg.idCard}</div>
            <div>
              <div class="gov-card-label">Registration Number (CIPC)</div>
              <div class="gov-card-val">2019 / 412705 / 07</div>
              <span class="gov-card-sub">Incorporated 20 August 2019</span>
            </div>
          </div>

          <div class="gov-card">
            <div class="gov-card-icon">${svg.database}</div>
            <div>
              <div class="gov-card-label">Central Supplier Database (CSD)</div>
              <div class="gov-card-val">MAAA0818606</div>
              <span class="gov-card-sub">Active &bull; Verified Government Supplier</span>
            </div>
          </div>

          <div class="gov-card">
            <div class="gov-card-icon">${svg.hardhat}</div>
            <div>
              <div class="gov-card-label">CIDB Contractor Grading</div>
              <div class="gov-card-val">Grade 1CE</div>
              <span class="gov-card-sub">Civil Engineering (Max R500,000 Contract)</span>
            </div>
          </div>

          <div class="gov-card">
            <div class="gov-card-icon">${svg.handshake}</div>
            <div>
              <div class="gov-card-label">B-BBEE Accreditation</div>
              <div class="gov-card-val">Level 1 Contributor</div>
              <span class="gov-card-sub">100% Black Owned EME (135% Procurement Recognition)</span>
            </div>
          </div>

          <div class="gov-card">
            <div class="gov-card-icon">${svg.tax}</div>
            <div>
              <div class="gov-card-label">SARS Tax &amp; VAT Classification</div>
              <div class="gov-card-val">Compliant (TCS PIN Active)</div>
              <span class="gov-card-sub">Ref: 9250830230 &bull; Non-VAT (Under Threshold)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Vision, Mission & Core Values -->
      <section class="values-container avoid-page-break">
        <div class="vision-mission-grid">
          <div class="vision-mission-col">
            <div>
              <h3>${svg.eye} Our Vision</h3>
              <p>To be the preferred, most dependable commercial supply and infrastructure partner for funeral parlours, burial societies, and families across Limpopo and surrounding provinces.</p>
            </div>
            <hr class="vm-divider" />
            <div>
              <h3>${svg.target} Our Mission</h3>
              <p>To provide funeral directors and private organizers with seamless, single-source event infrastructure, pristine mobile sanitation, farm-fresh livestock, and crystal-clear audio engineering.</p>
            </div>
          </div>

          <div>
            <div class="core-values-heading">Our Core Values</div>
            <div class="core-values-grid">
              <div class="core-value-card">
                <div class="core-value-title">${svg.heart} Dignity &amp; Respect</div>
                <div class="core-value-desc">Treating every ceremony, memorial, and cultural rite with solemn care and deep cultural understanding.</div>
              </div>
              <div class="core-value-card">
                <div class="core-value-title">${svg.clock} Punctuality &amp; Reliability</div>
                <div class="core-value-desc">Early setups, on-site technical supervision, and generator backup to ensure zero downtime.</div>
              </div>
              <div class="core-value-card">
                <div class="core-value-title">${svg.sparkles} Impeccable Hygiene</div>
                <div class="core-value-desc">Rigorously sanitized VIP restrooms and clean, food-safe mobile cold rooms.</div>
              </div>
              <div class="core-value-card">
                <div class="core-value-title">${svg.shield} Integrity &amp; Value</div>
                <div class="core-value-desc">Clear, transparent commercial pricing and dedicated account support for partner parlours.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Core Commercial Services -->
      <section class="profile-section avoid-page-break">
        <h2 class="section-heading">
          <span class="section-icon-wrap">${svg.cogs}</span>
          4. Core Commercial Services
        </h2>

        <div class="services-grid">
          <!-- Service 1 -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon-pill">${svg.restroom}</div>
              <div class="service-card-title">Funeral &amp; Memorial Infrastructure</div>
            </div>
            <ul class="service-list">
              <li><strong>VIP Mobile Restrooms:</strong> Modern, flushable trailers with basins, running water, mirrors, and solar/battery lighting.</li>
              <li><strong>Mobile Cold Rooms:</strong> Hygienic trailers (-2&deg;C to +4&deg;C) for on-site meat hanging and preservation.</li>
              <li><strong>Tents &amp; Seating:</strong> Waterproof stretch tents, marquees (50&ndash;1,000 seats), draping, and executive seating.</li>
            </ul>
          </div>

          <!-- Service 2 -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon-pill">${svg.sound}</div>
              <div class="service-card-title">Audio-Visual (AV) &amp; Sound</div>
            </div>
            <ul class="service-list">
              <li><strong>Sound Systems:</strong> High-output active PA systems for marquees, halls, and graveside ceremonies (100&ndash;1,000+ attendees).</li>
              <li><strong>Microphones:</strong> Multi-channel UHF wireless microphones with wind protection.</li>
              <li><strong>Power &amp; Engineers:</strong> Low-noise standby backup generators (AVR) and dedicated sound engineers.</li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon-pill">${svg.livestock}</div>
              <div class="service-card-title">Ceremonial Livestock Supply</div>
            </div>
            <ul class="service-list">
              <li><strong>Cattle:</strong> Healthy, disease-free oxen, heifers, and tollies for customary family rites.</li>
              <li><strong>Goats &amp; Sheep:</strong> Indigenous goats, Boer goats, and sheep prepared for traditional rituals.</li>
              <li><strong>Direct Delivery:</strong> Doorstep transit via dedicated livestock trailers (24&ndash;48 hr turnaround in Limpopo).</li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon-pill">${svg.catering}</div>
              <div class="service-card-title">Outsourced Catering &amp; Hygiene</div>
            </div>
            <ul class="service-list">
              <li><strong>Catering:</strong> Traditional funeral feast preparation under strict hygiene standards and VIP buffets.</li>
              <li><strong>Hospitality:</strong> Morning arrival tea, coffee, and refreshment stations.</li>
              <li><strong>Facility Cleaning:</strong> Commercial janitorial, pre/post-event cleanup, and waste management.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 5. Capacity & Equipment Fleet Summary -->
      <section class="profile-section avoid-page-break">
        <h2 class="section-heading">
          <span class="section-icon-wrap">${svg.truck}</span>
          5. Capacity &amp; Equipment Fleet Summary
        </h2>

        <div class="fleet-table-wrap">
          <table class="fleet-table">
            <thead>
              <tr>
                <th style="width: 25%;">Service Category</th>
                <th style="width: 53%;">Asset &amp; Equipment Description</th>
                <th style="width: 22%; text-align: right;">Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: 700; color: var(--brand-dark);">Mobile Sanitation</td>
                <td>
                  <div class="fleet-asset-cell">
                    <img class="fleet-thumb" src="data:image/png;base64,${toiletB64}" alt="VIP Mobile Restroom Trailer" />
                    <div>
                      <strong>VIP Executive Restroom Trailers</strong>
                      <div style="font-size: 8.5pt; color: var(--gray-600); margin-top: 2px;">Flushable units, porcelain basins, solar lighting, full hygiene sanitisation</div>
                    </div>
                  </div>
                </td>
                <td style="text-align: right;">
                  <span class="capacity-badge">2x Units</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: var(--brand-dark);">Cold-Chain Storage</td>
                <td>
                  <div class="fleet-asset-cell">
                    <img class="fleet-thumb" src="data:image/png;base64,${fridgeB64}" alt="Mobile Cold-Room Trailer" />
                    <div>
                      <strong>Mobile Cold-Room Trailers</strong>
                      <div style="font-size: 8.5pt; color: var(--gray-600); margin-top: 2px;">Temperature-controlled (-2&deg;C to +4&deg;C), on-site hanging &amp; food preservation</div>
                    </div>
                  </div>
                </td>
                <td style="text-align: right;">
                  <span class="capacity-badge">2x Units</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: var(--brand-dark);">Sound &amp; Electrical</td>
                <td>
                  <strong>Active PA Sound Systems &bull; 7.5kVA Generator</strong>
                  <div style="font-size: 8.5pt; color: var(--gray-600); margin-top: 2px;">Full mobile audio rigs, wireless mics, low-noise AVR backup power</div>
                </td>
                <td style="text-align: right;">
                  <span class="capacity-badge">2x Rigs + Gen</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: var(--brand-dark);">Shelters &amp; Seating</td>
                <td>
                  <strong>Waterproof Stretch Tents &amp; Marquees</strong>
                  <div style="font-size: 8.5pt; color: var(--gray-600); margin-top: 2px;">All-weather modular canopies, church draping, VIP guest seating</div>
                </td>
                <td style="text-align: right;">
                  <span class="capacity-badge">800+ Chairs</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: var(--brand-dark);">Logistics Fleet</td>
                <td>
                  <strong>Utility Bakkies &amp; Livestock Trailers</strong>
                  <div style="font-size: 8.5pt; color: var(--gray-600); margin-top: 2px;">Dedicated transport for livestock, tents, and urgent weekend dispatch</div>
                </td>
                <td style="text-align: right;">
                  <span class="capacity-badge">Regional Fleet</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. Commercial Partnership Benefits -->
      <section class="profile-section avoid-page-break">
        <h2 class="section-heading">
          <span class="section-icon-wrap">${svg.handshake}</span>
          6. Commercial Partnership Benefits for Funeral Parlours
        </h2>

        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon-title">
              ${svg.check}
              <div class="benefit-title">Single-Source Bundling</div>
            </div>
            <div class="benefit-desc">All-in-one ordering of tent, sound, VIP toilet, cold room, and livestock under one invoice with one accountable team.</div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon-title">
              ${svg.check}
              <div class="benefit-title">Preferential Rates</div>
            </div>
            <div class="benefit-desc">Priority weekend booking quotas and contracted discount structures for partner funeral homes and burial societies.</div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon-title">
              ${svg.check}
              <div class="benefit-title">Rapid Response (24&ndash;48h)</div>
            </div>
            <div class="benefit-desc">Swift mobilization for urgent family arrangements across Greater Tzaneen and the broader Limpopo Province.</div>
          </div>
        </div>
      </section>

    </main>

    <!-- ================= FOOTER / CONTACT / CTA ================= -->
    <footer class="footer-cta avoid-page-break">
      <div class="footer-cta-box">
        <h3 class="footer-cta-title">Ready to Partner with HLUGISO?</h3>
        <p class="footer-cta-desc">Contact us today to request a comprehensive quote or discuss long-term Service Level Agreements (SLAs) for funeral homes, burial societies, and commercial events.</p>
        <a href="mailto:info@hlugiso.co.za?subject=Request%20for%20Quote%20/%20Partnership%20Enquiry" class="cta-btn">
          ${svg.mail}
          Request a Quote &bull; info@hlugiso.co.za
        </a>
      </div>

      <div class="contact-quad-grid">
        <div>
          <div class="contact-col-label">Executive Leadership</div>
          <div class="contact-col-val">Thabo Makola</div>
          <div class="contact-col-sub">Managing Director</div>
        </div>

        <div>
          <div class="contact-col-label">Direct Line / WhatsApp</div>
          <div class="contact-col-val">+27 83 597 6462</div>
          <div class="contact-col-sub">Mon &ndash; Sun: 24/7 Operations</div>
        </div>

        <div>
          <div class="contact-col-label">Corporate Emails</div>
          <div class="contact-col-val"><a href="mailto:info@hlugiso.co.za">info@hlugiso.co.za</a></div>
          <div class="contact-col-sub"><a href="mailto:thabomakola80@gmail.com">thabomakola80@gmail.com</a></div>
        </div>

        <div>
          <div class="contact-col-label">Operating Base</div>
          <div class="contact-col-sub" style="color: #FFFFFF; font-weight: 500;">
            Stand No. 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850
          </div>
        </div>
      </div>

      <div class="footer-legal-bar">
        &copy; ${new Date().getFullYear()} HLUGISO (PTY) LTD &bull; Registration: 2019/412705/07 &bull; CSD: MAAA0818606 &bull; CIDB: 1CE &bull; B-BBEE Level 1 &bull; SARS Tax Compliant. Strictly for commercial use.
      </div>
    </footer>

  </div>

</body>
</html>`;

fs.writeFileSync('company-profile.html', htmlContent);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputPath = path.resolve('HLUGISO_Company_Profile.pdf');
const publicOutputPath = path.resolve('public/HLUGISO_Company_Profile.pdf');
const inputHtml = path.resolve('company-profile.html');

const cmd = `"${chromePath}" --headless --disable-gpu --print-to-pdf="${outputPath}" --no-pdf-header-footer "${inputHtml}"`;

try {
  console.log('Generating publication-grade PDF via Chrome Headless...');
  execSync(cmd, { stdio: 'inherit' });
  fs.copyFileSync(outputPath, publicOutputPath);
  console.log('PDF generated successfully at:', outputPath);
} catch (e) {
  console.error('Error generating PDF:', e.message);
}
