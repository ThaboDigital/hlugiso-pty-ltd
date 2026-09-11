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
    margin: 10mm 14mm 10mm 14mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1F2937;
    background: #E5E7EB;
    line-height: 1.48;
    font-size: 9.8pt;
  }

  /* Page Wrapper for Screen & Print */
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 10mm 14mm 10mm 14mm;
    margin: 20px auto;
    background: #FFFFFF;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    break-after: page;
  }

  @media print {
    body {
      background: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 100%;
      min-height: 0;
      padding: 0;
      margin: 0;
      box-shadow: none;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .page:not(:last-child) {
      page-break-after: always;
      break-after: page;
    }
    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
  }

  .page-content {
    flex-grow: 1;
  }

  /* Header Styles */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2.5px solid #064E3B;
    padding-bottom: 8px;
    margin-bottom: 14px;
  }
  .header-logo {
    height: 48px;
    width: auto;
    object-fit: contain;
  }
  .header-contact {
    text-align: right;
    font-size: 8.5pt;
    color: #4B5563;
    line-height: 1.4;
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
    border-left: 4px solid #064E3B;
    padding: 8px 14px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .doc-title-bar h1 {
    font-size: 13pt;
    font-weight: 800;
    color: #064E3B;
    letter-spacing: -0.2px;
  }
  .doc-title-bar .subtitle {
    font-size: 8.8pt;
    color: #065F46;
    font-weight: 600;
    margin-top: 2px;
  }
  .doc-badge {
    background: #064E3B;
    color: #FFFFFF;
    font-size: 7.8pt;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* Section Titles with Square Number Badge */
  .section {
    margin-bottom: 18px;
  }
  .section-title {
    font-size: 11.5pt;
    font-weight: 800;
    color: #064E3B;
    border-bottom: 1.5px solid #D1D5DB;
    padding-bottom: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .section-title span.num {
    background: #064E3B;
    color: #FFFFFF;
    font-size: 8.5pt;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 3px;
    margin-right: 8px;
    display: inline-block;
  }

  /* Paragraph & Typography */
  p {
    color: #374151;
    margin-bottom: 8px;
    text-align: justify;
    font-size: 9.8pt;
    line-height: 1.55;
  }
  .quote-box {
    background: #F0FDF4;
    border-left: 3.5px solid #064E3B;
    padding: 10px 14px;
    margin-top: 8px;
    margin-bottom: 12px;
    border-radius: 0 4px 4px 0;
    font-style: italic;
    font-size: 9.6pt;
    color: #1F2937;
    line-height: 1.5;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
    margin-bottom: 10px;
    font-size: 9.5pt;
    line-height: 1.48;
  }
  th, td {
    padding: 8px 12px;
    border: 1px solid #E5E7EB;
    text-align: left;
    vertical-align: middle;
  }
  th {
    background: #F3F4F6;
    color: #111827;
    font-weight: 700;
    font-size: 8.8pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  tr:nth-child(even) td {
    background: #FAFAFA;
  }
  td strong {
    color: #111827;
  }

  /* Governance 2-Column Key-Value Grid */
  .gov-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 8px;
    margin-top: 8px;
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    padding: 12px 16px;
  }
  .gov-item {
    font-size: 9.2pt;
    line-height: 1.45;
    display: flex;
    border-bottom: 1px solid #F3F4F6;
    padding-bottom: 5px;
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

  /* Core Values (Section 3) */
  .value-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 12px;
    margin-top: 10px;
    margin-bottom: 6px;
  }
  .value-card {
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-left: 3.5px solid #064E3B;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 9.3pt;
    line-height: 1.48;
  }
  .value-card strong {
    color: #064E3B;
    display: block;
    margin-bottom: 3px;
    font-size: 9.8pt;
    font-weight: 800;
  }

  /* Service Subsections (Section 4) */
  .service-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    row-gap: 16px;
    margin-top: 8px;
  }
  .service-block {
    background: #FAFAFA;
    border: 1px solid #E5E7EB;
    border-left: 3.5px solid #064E3B;
    border-radius: 4px;
    padding: 12px 16px;
  }
  .service-heading {
    font-size: 10.5pt;
    font-weight: 800;
    color: #064E3B;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px dotted #D1D5DB;
  }
  .service-desc {
    color: #4B5563;
    font-size: 9.3pt;
    line-height: 1.5;
  }
  .service-item {
    margin-bottom: 6px;
  }
  .service-item:last-child {
    margin-bottom: 0;
  }
  .service-item strong {
    font-weight: 800;
    font-size: 9.5pt;
    color: #111827;
  }

  /* Fleet Photos & Cell */
  .table-fleet-img {
    width: 52px;
    height: 38px;
    object-fit: contain;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    padding: 2px;
    background: #FFFFFF;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .fleet-item-cell {
    display: flex;
    align-items: center;
  }

  /* Footer */
  .footer {
    border-top: 1px solid #E5E7EB;
    padding-top: 8px;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    font-size: 8.2pt;
    color: #6B7280;
  }
  .footer strong {
    color: #064E3B;
  }
</style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="page">
    <div class="page-content">
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
        <div class="quote-box">
          &ldquo;We specialize in supporting the fast-moving, weekly funeral cycle (Thursday through Sunday). By combining localized Limpopo agricultural sourcing with rapid fleet mobilization, HLUGISO guarantees that weekend services, memorial events, and cultural rites are executed with solemn dignity, spotless hygiene, and absolute operational reliability.&rdquo;
        </div>
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
            <span class="gov-val"><strong>Grade 1CE</strong> (Civil Engineering &bull; Max R500,000)</span>
          </div>
          <div class="gov-item">
            <span class="gov-label">Trading Name:</span>
            <span class="gov-val">Hlugiso Supply &amp; Hire</span>
          </div>
          <div class="gov-item">
            <span class="gov-label">B-BBEE Accreditation:</span>
            <span class="gov-val"><strong>Level 1 Contributor</strong> (100% Black Owned EME &bull; 135%)</span>
          </div>
          <div class="gov-item">
            <span class="gov-label">Registration Number (CIPC):</span>
            <span class="gov-val"><strong>2019 / 412705 / 07</strong> (Inc. 20 Aug 2019)</span>
          </div>
          <div class="gov-item">
            <span class="gov-label">VAT Classification:</span>
            <span class="gov-val">Non-VAT (Exempt Micro Enterprise / Under R1m)</span>
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
            <span class="gov-val">Supplier Number: <strong>MAAA0818606</strong> (Active &bull; Verified)</span>
          </div>
          <div class="gov-item">
            <span class="gov-label">Operating Base:</span>
            <span class="gov-val">Stand No. 01, Tickyline Village, Lenyenye, Tzaneen, 0850</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>HLUGISO (PTY) LTD &bull; Company Profile &amp; Commercial Capabilities</span>
      <span>CSD: MAAA0818606 &bull; Tel: +27 83 597 6462</span>
      <span>Page 1 of 3</span>
    </div>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page">
    <div class="page-content">
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

      <!-- 3. Vision, Mission & Core Values -->
      <div class="section">
        <div class="section-title">
          <span class="num">3</span> Vision, Mission &amp; Core Values
        </div>
        <p style="margin-bottom: 4px;"><strong>Vision:</strong> To be the preferred, most dependable commercial supply and infrastructure partner for funeral parlours, burial societies, and families across Limpopo and surrounding provinces.</p>
        <p style="margin-bottom: 8px;"><strong>Mission:</strong> To provide funeral directors and private organizers with seamless, single-source event infrastructure, pristine mobile sanitation, farm-fresh livestock, and crystal-clear audio engineering.</p>
        
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

      <!-- 4. Core Commercial Services -->
      <div class="section" style="margin-top: 20px;">
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
    </div>

    <div class="footer">
      <span>HLUGISO (PTY) LTD &bull; Core Commercial Services</span>
      <span>Tender &amp; Municipal Supplier &bull; CIDB Grade 1CE</span>
      <span>Page 2 of 3</span>
    </div>
  </div>

  <!-- ================= PAGE 3 ================= -->
  <div class="page">
    <div class="page-content">
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

      <!-- 5. Capacity & Equipment Fleet Summary -->
      <div class="section">
        <div class="section-title">
          <span class="num">5</span> Capacity &amp; Equipment Fleet Summary
        </div>

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
                  <div>
                    <strong>VIP Executive Restroom Trailers</strong><br>
                    <span style="font-size: 8.8pt; color: #6B7280;">Flushable, washbasins, mirrors, solar lighting</span>
                  </div>
                </div>
              </td>
              <td><strong>2x Dedicated units</strong></td>
            </tr>
            <tr>
              <td><strong>Cold-Chain Storage</strong></td>
              <td>
                <div class="fleet-item-cell">
                  <img class="table-fleet-img" src="data:image/png;base64,${fridgeB64}" alt="Mobile Cold-Room" />
                  <div>
                    <strong>Mobile Cold-Room Trailers</strong><br>
                    <span style="font-size: 8.8pt; color: #6B7280;">Temperature-Controlled (-2&deg;C to +4&deg;C)</span>
                  </div>
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
      <div class="section" style="margin-top: 18px;">
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
              <td style="width: 28%;"><strong>Rapid Response (24&ndash;48h)</strong></td>
              <td>Rapid mobilization for urgent family arrangements across Greater Tzaneen and the broader Limpopo Province.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 7. Contact Details -->
      <div class="section" style="margin-top: 18px; margin-bottom: 0;">
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
    </div>

    <div class="footer">
      <span>HLUGISO (PTY) LTD &bull; Reg No: 2019/412705/07 &bull; CSD: MAAA0818606</span>
      <span>SARS Tax Compliant &bull; B-BBEE Level 1</span>
      <span>Page 3 of 3</span>
    </div>
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
