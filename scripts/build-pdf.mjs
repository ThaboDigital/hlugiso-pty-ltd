import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const logoB64 = fs.readFileSync('public/branding/hlugiso-logo-primary.png').toString('base64');
const fridgeB64 = fs.readFileSync('public/images/mobile-fridge.png').toString('base64');
const toiletB64 = fs.readFileSync('public/images/vip-toilet.png').toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>HLUGISO (PTY) LTD — Company Profile</title>
<style>
  @page {
    size: A4;
    margin: 10mm 12mm 10mm 12mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1F2937;
    background: #FFFFFF;
    line-height: 1.36;
    font-size: 8.8pt;
  }

  /* Header Styles */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #064E3B;
    padding-bottom: 4px;
    margin-bottom: 8px;
  }
  .header-logo {
    height: 38px;
    width: auto;
    object-fit: contain;
  }
  .header-contact {
    text-align: right;
    font-size: 7.6pt;
    color: #4B5563;
    line-height: 1.30;
  }
  .header-contact strong {
    color: #064E3B;
  }
  .header-contact a {
    color: #064E3B;
    text-decoration: none;
  }

  /* Document Title Banner */
  .doc-title-bar {
    background: #F0FDF4;
    border-left: 3.5px solid #064E3B;
    padding: 4.5px 9px;
    margin-bottom: 9px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .doc-title-bar h1 {
    font-size: 11pt;
    font-weight: 800;
    color: #064E3B;
    letter-spacing: -0.2px;
  }
  .doc-title-bar .subtitle {
    font-size: 7.5pt;
    color: #065F46;
    font-weight: 600;
    margin-top: 1px;
  }
  .doc-badge {
    background: #064E3B;
    color: #FFFFFF;
    font-size: 6.8pt;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 3px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* Section Styling - Generous Section Spacing */
  .section {
    margin-bottom: 11px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .section-title {
    font-size: 9.3pt;
    font-weight: 800;
    color: #064E3B;
    border-bottom: 1px solid #D1D5DB;
    padding-top: 0;
    padding-bottom: 2px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    page-break-after: avoid;
    break-after: avoid;
  }
  .section-title span.num {
    background: #064E3B;
    color: #FFFFFF;
    font-size: 6.8pt;
    font-weight: 700;
    padding: 0.5px 3.5px;
    border-radius: 2px;
    margin-right: 6px;
  }

  p {
    color: #374151;
    margin-bottom: 4px;
    text-align: justify;
    font-size: 8.8pt;
    line-height: 1.36;
  }

  /* Compact Governance Grid (Section 2) with 24px Column Spacing */
  .gov-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    row-gap: 4px;
    margin-top: 4px;
    margin-bottom: 5px;
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    padding: 6px 10px;
  }
  .gov-item {
    font-size: 8.2pt;
    line-height: 1.30;
    display: flex;
    border-bottom: 1px solid #F3F4F6;
    padding-bottom: 2.5px;
  }
  .gov-item:last-child, .gov-item:nth-last-child(2) {
    border-bottom: none;
    padding-bottom: 0;
  }
  .gov-label {
    color: #4B5563;
    font-weight: 700;
    width: 44%;
    flex-shrink: 0;
  }
  .gov-val {
    color: #111827;
    width: 56%;
  }

  /* Tables with comfortable cell padding */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 3px;
    margin-bottom: 4px;
    font-size: 8.5pt;
    line-height: 1.34;
  }
  th, td {
    padding: 3.5px 8px;
    border: 1px solid #E5E7EB;
    text-align: left;
  }
  th {
    background: #F3F4F6;
    color: #111827;
    font-weight: 700;
    font-size: 7.8pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  tr:nth-child(even) td {
    background: #FAFAFA;
  }
  td strong {
    color: #111827;
  }

  /* Core Values (Section 3) with 20px column gap and 6px row gap */
  .value-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 6px;
    margin-top: 5px;
  }
  .value-card {
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-left: 2.5px solid #064E3B;
    padding: 5px 9px;
    border-radius: 3px;
    font-size: 8.5pt;
    line-height: 1.32;
  }
  .value-card strong {
    color: #064E3B;
    display: block;
    margin-bottom: 2px;
    font-size: 8.8pt;
  }

  /* Service Subsections (Section 4) with generous 28px column gap and 11px row gap */
  .service-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 28px;
    row-gap: 10px;
    margin-top: 4px;
  }
  .service-block {
    background: #FAFAFA;
    border: 1px solid #E5E7EB;
    border-left: 2.5px solid #064E3B;
    border-radius: 3px;
    padding: 5px 9px;
  }
  .service-heading {
    font-size: 8.9pt;
    font-weight: 800;
    color: #064E3B;
    margin-bottom: 3px;
    padding-bottom: 1.5px;
    border-bottom: 1px dotted #D1D5DB;
  }
  .service-desc {
    color: #4B5563;
    font-size: 8.4pt;
    line-height: 1.34;
  }
  .service-item {
    margin-bottom: 4.5px;
  }
  .service-item:last-child {
    margin-bottom: 0;
  }
  .service-item strong {
    font-weight: 800;
    font-size: 8.6pt;
    color: #111827;
  }

  /* Integrated Fleet Table Photos */
  .table-fleet-img {
    width: 38px;
    height: 27px;
    object-fit: contain;
    border: 1px solid #E5E7EB;
    border-radius: 2px;
    padding: 1px;
    background: #FFFFFF;
    margin-right: 7px;
    flex-shrink: 0;
  }
  .fleet-item-cell {
    display: flex;
    align-items: center;
  }

  /* Footer */
  .footer {
    border-top: 1px solid #E5E7EB;
    padding-top: 3px;
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    font-size: 7.2pt;
    color: #6B7280;
  }
  .footer strong {
    color: #064E3B;
  }

  .page-break {
    page-break-before: always;
  }
</style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="header-container">
    <div>
      <img class="header-logo" src="data:image/png;base64,${logoB64}" alt="HLUGISO (PTY) LTD" />
    </div>
    <div class="header-contact">
      <strong>HLUGISO (PTY) LTD</strong> &bull; Registration: <strong>2019/412705/07</strong><br>
      CSD: <strong>MAAA0818606</strong> &bull; CIDB: <strong>Grade 1CE</strong> &bull; B-BBEE: <strong>Level 1 (100% Black Owned)</strong><br>
      Direct/WhatsApp: <strong>+27 83 597 6462</strong> &bull; Email: <strong>info@hlugiso.co.za</strong><br>
      Web: <a href="https://www.hlugiso.co.za">www.hlugiso.co.za</a> &bull; Tzaneen, Limpopo
    </div>
  </div>

  <div class="doc-title-bar">
    <div>
      <h1>COMPANY PROFILE &amp; COMMERCIAL CAPABILITIES</h1>
      <div class="subtitle">Funeral &amp; Event Infrastructure &bull; Mobile Cold-Chain &bull; Sound Reinforcement &bull; Livestock Supply</div>
    </div>
    <div class="doc-badge">Official Profile</div>
  </div>

  <!-- 1. Executive Summary -->
  <div class="section">
    <div class="section-title">
      <span class="num">1</span> Executive Summary
    </div>
    <p>
      <strong>HLUGISO (Pty) Ltd</strong> is an established, 100% Black-owned private enterprise based in Greater Tzaneen, Limpopo. Established in 2019, the company delivers complete event infrastructure, weekly funeral and memorial logistics, mobile cold-chain rentals, ceremonial livestock, sound reinforcement, and catering support to private funeral groups, corporate clients, municipal protocol units, event planners, and families.
    </p>
    <p>
      We specialize in supporting the fast-moving, weekly funeral cycle (Thursday through Sunday). By combining localized Limpopo agricultural sourcing with rapid fleet mobilization, HLUGISO guarantees that weekend services, memorial events, and cultural rites are executed with solemn dignity, spotless hygiene, and absolute operational reliability.
    </p>
  </div>

  <!-- 2. Business & Governance Details -->
  <div class="section">
    <div class="section-title">
      <span class="num">2</span> Business &amp; Governance Details
    </div>
    <div class="gov-grid">
      <div class="gov-item">
        <span class="gov-label">Registered Legal Entity:</span>
        <span class="gov-val">HLUGISO (PTY) LTD</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">CIDB Contractor Grading:</span>
        <span class="gov-val"><strong>Grade 1CE</strong> (Civil Engineering &bull; Max Contract R500,000)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">Trading Name:</span>
        <span class="gov-val">Hlugiso Supply &amp; Hire</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">B-BBEE Accreditation:</span>
        <span class="gov-val"><strong>Level 1 Contributor</strong> (100% Black Owned EME &bull; 135% Procurement Recognition)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">Registration Number (CIPC):</span>
        <span class="gov-val"><strong>2019 / 412705 / 07</strong> (Incorporated 20 August 2019)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">VAT Classification:</span>
        <span class="gov-val">Non-VAT Registered (Exempt Micro Enterprise / Under R1m Statutory Threshold)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">SARS Tax Compliance Status:</span>
        <span class="gov-val">Compliant &bull; Tax Reference: <strong>9250830230</strong> (TCS PIN Active)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">Executive Leadership:</span>
        <span class="gov-val"><strong>Thabo Makola</strong> (Managing Director)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">Central Supplier Database (CSD):</span>
        <span class="gov-val">Supplier Number: <strong>MAAA0818606</strong> (Active &bull; Verified Supplier)</span>
      </div>
      <div class="gov-item">
        <span class="gov-label">Operating Base:</span>
        <span class="gov-val">Stand No. 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850</span>
      </div>
    </div>
  </div>

  <!-- 3. Vision, Mission & Core Values -->
  <div class="section" style="margin-bottom: 0;">
    <div class="section-title">
      <span class="num">3</span> Vision, Mission &amp; Core Values
    </div>
    <p style="margin-bottom: 2px;"><strong>Vision:</strong> To be the preferred, most dependable commercial supply and infrastructure partner for funeral parlours, burial societies, and families across Limpopo and surrounding provinces.</p>
    <p style="margin-bottom: 4px;"><strong>Mission:</strong> To provide funeral directors and private organizers with seamless, single-source event infrastructure, pristine mobile sanitation, farm-fresh livestock, and crystal-clear audio engineering.</p>
    
    <div class="value-grid">
      <div class="value-card">
        <strong>Dignity &amp; Respect</strong>
        Treating every ceremony, memorial, and cultural rite with solemn care and deep cultural understanding.
      </div>
      <div class="value-card">
        <strong>Punctuality &amp; Reliability</strong>
        Early setups, on-site technical supervision, and generator backup to ensure zero downtime.
      </div>
      <div class="value-card">
        <strong>Impeccable Hygiene</strong>
        Rigorously sanitized VIP restrooms and clean, food-safe mobile cold rooms.
      </div>
      <div class="value-card">
        <strong>Integrity &amp; Value</strong>
        Clear, transparent commercial pricing and dedicated account support for partner parlours.
      </div>
    </div>
  </div>

  <div class="footer">
    <span>HLUGISO (PTY) LTD &bull; Company Profile &amp; Commercial Capabilities</span>
    <span>CSD: MAAA0818606 &bull; Tel: +27 83 597 6462</span>
    <span>Page 1 of 2</span>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page-break"></div>

  <div class="header-container">
    <div>
      <img class="header-logo" src="data:image/png;base64,${logoB64}" alt="HLUGISO (PTY) LTD" />
    </div>
    <div class="header-contact">
      <strong>HLUGISO (PTY) LTD</strong> &bull; Commercial Capabilities &bull; Est. 2019<br>
      Tel/WhatsApp: <strong>+27 83 597 6462</strong> &bull; Email: <strong>info@hlugiso.co.za</strong><br>
      Official Website: <strong>www.hlugiso.co.za</strong>
    </div>
  </div>

  <!-- 4. Core Commercial Services -->
  <div class="section">
    <div class="section-title">
      <span class="num">4</span> Core Commercial Services
    </div>

    <div class="service-grid">
      <div class="service-block">
        <div class="service-heading">4.1. Weekly Funeral &amp; Memorial Infrastructure</div>
        <div class="service-desc">
          <div class="service-item">&bull; <strong>VIP Mobile Restrooms:</strong> Modern, flushable mobile toilet trailers equipped with handwash basins, running water, mirrors, soap dispensers, and solar/battery lighting.</div>
          <div class="service-item">&bull; <strong>Mobile Cold Rooms:</strong> Hygienic, temperature-controlled trailers (-2&deg;C to +4&deg;C) for on-site meat hanging, food preservation, and beverage cooling.</div>
          <div class="service-item">&bull; <strong>Tents &amp; Seating:</strong> Waterproof stretch tents, marquees (50 to 1,000 seats), dignified church draping, executive seating, and tables.</div>
        </div>
      </div>

      <div class="service-block">
        <div class="service-heading">4.2. Audio-Visual (AV) &amp; Sound Reinforcement</div>
        <div class="service-desc">
          <div class="service-item">&bull; <strong>Sound Systems:</strong> High-output active PA systems for marquees, halls, and graveside ceremonies (100 to 1,000+ attendees).</div>
          <div class="service-item">&bull; <strong>Microphones:</strong> Multi-channel UHF wireless microphones with wind protection for officiants and family speakers.</div>
          <div class="service-item">&bull; <strong>Power &amp; Engineers:</strong> Low-noise standby backup generators (with automatic voltage regulation) and dedicated sound engineers.</div>
        </div>
      </div>

      <div class="service-block">
        <div class="service-heading">4.3. Ceremonial &amp; Cultural Livestock Supply</div>
        <div class="service-desc">
          <div class="service-item">&bull; <strong>Cattle:</strong> Healthy, disease-free oxen, heifers, and tollies for customary family rites and funeral catering.</div>
          <div class="service-item">&bull; <strong>Goats &amp; Sheep:</strong> Indigenous goats, Boer goats, and sheep prepared for traditional family rituals.</div>
          <div class="service-item">&bull; <strong>Direct Delivery:</strong> Doorstep transit via dedicated livestock trailers, fulfilling short-notice orders within 24 to 48 hours across Limpopo.</div>
        </div>
      </div>

      <div class="service-block">
        <div class="service-heading">4.4. Outsourced Catering, Hygiene &amp; Facilities</div>
        <div class="service-desc">
          <div class="service-item">&bull; <strong>Catering:</strong> Traditional funeral feast preparation under strict hygiene standards and VIP buffet line setups.</div>
          <div class="service-item">&bull; <strong>Hospitality:</strong> Morning arrival tea, coffee, and refreshment stations.</div>
          <div class="service-item">&bull; <strong>Facility Cleaning:</strong> Commercial janitorial, pre- and post-event cleanup, waste management, and office maintenance.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 5. Capacity & Equipment Fleet Summary -->
  <div class="section">
    <div class="section-title">
      <span class="num">5</span> Capacity &amp; Equipment Fleet Summary
    </div>

    <!-- Fleet Photos -->
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Service Category</th>
          <th style="width: 51%;">Asset / Equipment Description</th>
          <th style="width: 24%;">Fleet Capacity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mobile Sanitation</strong></td>
          <td>
            <div class="fleet-item-cell">
              <img class="table-fleet-img" src="data:image/png;base64,${toiletB64}" alt="VIP Mobile Restroom" />
              <div>VIP Executive Restroom Trailers (Flushable, washbasins, solar lighting)</div>
            </div>
          </td>
          <td><strong>2x Dedicated units</strong></td>
        </tr>
        <tr>
          <td><strong>Cold-Chain Storage</strong></td>
          <td>
            <div class="fleet-item-cell">
              <img class="table-fleet-img" src="data:image/png;base64,${fridgeB64}" alt="Mobile Cold-Room" />
              <div>Temperature-Controlled Mobile Cold-Room Trailers (-2&deg;C to +4&deg;C)</div>
            </div>
          </td>
          <td><strong>2x Dedicated units</strong></td>
        </tr>
        <tr>
          <td><strong>Sound &amp; Electrical</strong></td>
          <td>Active PA Audio Systems &bull; 7.5kVA Low-Noise AVR Backup Generator</td>
          <td><strong>2x Full rigs + generator</strong></td>
        </tr>
        <tr>
          <td><strong>Shelters &amp; Seating</strong></td>
          <td>Waterproof Stretch Tents, Marquees &bull; VIP Guest Seating</td>
          <td><strong>800+ Chairs &amp; tents</strong></td>
        </tr>
        <tr>
          <td><strong>Logistics &amp; Delivery</strong></td>
          <td>Heavy-Duty Utility Bakkies &bull; Specialized Livestock Trailers</td>
          <td><strong>Regional Limpopo fleet</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 6. Commercial Partnership Benefits -->
  <div class="section" style="margin-top: 13px;">
    <div class="section-title">
      <span class="num">6</span> Commercial Partnership Benefits for Funeral Parlours
    </div>
    <table>
      <tbody>
        <tr>
          <td style="width: 28%;"><strong>Single-Source Bundling</strong></td>
          <td>All-in-one ordering of tent, sound, VIP toilet, cold room, and livestock under one invoice and one accountable team.</td>
        </tr>
        <tr>
          <td style="width: 28%;"><strong>Preferential Partner Rates</strong></td>
          <td>Priority weekend booking quotas and contracted discount structures for partner funeral homes and burial societies.</td>
        </tr>
        <tr>
          <td style="width: 28%;"><strong>Rapid Response (24–48h)</strong></td>
          <td>Rapid mobilization for urgent family arrangements across Greater Tzaneen and the broader Limpopo Province.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 7. Contact Details -->
  <div class="section" style="margin-top: 13px; margin-bottom: 0;">
    <div class="section-title">
      <span class="num">7</span> Contact Details
    </div>
    <table>
      <tbody>
        <tr>
          <td style="width: 50%;"><strong>Managing Director:</strong> Thabo Makola</td>
          <td style="width: 50%;"><strong>Direct Line / WhatsApp:</strong> +27 83 597 6462</td>
        </tr>
        <tr>
          <td><strong>Corporate Emails:</strong> info@hlugiso.co.za / thabomakola80@gmail.com</td>
          <td><strong>Official Website:</strong> <a href="https://www.hlugiso.co.za" style="color: #064E3B; font-weight: bold; text-decoration: none;">www.hlugiso.co.za</a></td>
        </tr>
        <tr>
          <td colspan="2" style="width: 100%;"><strong>Physical Address:</strong> Stand No. 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <span>HLUGISO (PTY) LTD &bull; Reg No: 2019/412705/07 &bull; CSD: MAAA0818606</span>
    <span>SARS Tax Compliant &bull; B-BBEE Level 1</span>
    <span>Page 2 of 2</span>
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
  execSync(cmd, { stdio: 'inherit' });
  fs.copyFileSync(outputPath, publicOutputPath);
  console.log('PDF generated successfully at:', outputPath);
} catch (e) {
  console.error('Error generating PDF:', e.message);
}
