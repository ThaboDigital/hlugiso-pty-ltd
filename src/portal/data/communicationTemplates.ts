export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  type?: 'text' | 'email' | 'textarea';
}

export interface CommunicationTemplate {
  id: string;
  title: string;
  category: 'procurement' | 'funeral_parlours' | 'clients' | 'civils' | 'emergency';
  badge: string;
  badgeColor: string;
  description: string;
  fields: TemplateField[];
  getSubject: (values: Record<string, string>) => string;
  getBody: (values: Record<string, string>) => string;
  checklistTitle?: string;
  checklist?: string[];
}

export const COMMUNICATION_TEMPLATES: CommunicationTemplate[] = [
  {
    id: 'vendor_application',
    title: 'Vendor Database Application & Onboarding',
    category: 'procurement',
    badge: 'Statutory Onboarding',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Formal submission to get listed on approved vendor lists for funeral homes (Icebolethu, AVBOB, Doves), corporate procurement portals, and municipalities.',
    fields: [
      { id: 'recipient', label: 'Procuring Entity / Recipient', placeholder: 'e.g. Icebolethu Group Procurement Team', defaultValue: 'Icebolethu Group Procurement Team' },
      { id: 'email', label: 'Recipient Email Address', placeholder: 'e.g. procurement@icebolethu.co.za', defaultValue: 'procurement@icebolethu.co.za', type: 'email' },
      { id: 'region', label: 'Target Service District', placeholder: 'e.g. Greater Tzaneen & Mopani District', defaultValue: 'Greater Tzaneen & Mopani District' },
    ],
    getSubject: (v) => `Vendor Database Application & Onboarding – HLUGISO (Pty) Ltd`,
    getBody: (v) => `Dear ${v.recipient || 'Procurement Team'},

Please find attached the completed Supplier Onboarding Form and statutory compliance documentation for HLUGISO (Pty) Ltd to be formally listed on your Approved Vendor Database for ${v.region || 'Greater Tzaneen & Mopani District'}.

HLUGISO (Pty) Ltd is an established, 100% Black-owned EME (Level 1 B-BBEE) providing turnkey infrastructure, mobile hygiene, and cold-chain logistics with direct operational readiness in Tzaneen and across Limpopo.

PROPOSED GOODS & SERVICES:
• Weekly Funeral & Memorial Infrastructure Hire: Heavy-duty marquees, stretch tents, executive draping, VIP furnishings, and décor
• Mobile Sanitation: Executive VIP Flushable Restroom Trailers with integrated handwash basins, running water, and solar illumination
• Mobile Cold-Chain: Temperature-controlled mobile cold room trailers (-2°C to +4°C) with backup generator power
• Audio-Visual & Sound Reinforcement: High-output PA systems, wireless microphones, podiums, and silent backup power generators
• Ceremonial & Cultural Livestock Supply: Quality-inspected cattle, goats, and sheep sourced directly from Limpopo farms with reliable delivery
• Outsourced Funeral Catering & Hospitality Services: Large-scale bereavement feasts, dignitary arrival refreshments, and post-event cleanup

ATTACHED SUPPORTING COMPLIANCE DOCUMENTS:
1. Completed & Signed Supplier Onboarding Form
2. Official HLUGISO Company Profile (2026 Edition with Equipment Fleet Portfolio)
3. CIPC Company Registration Certificate (Reg: 2019/412705/07)
4. Certified ID Copy of Managing Director
5. SARS Tax Compliance Status (PIN Active: 9250830230)
6. Stamped Bank Account Confirmation Letter (First National Bank)
7. B-BBEE Sworn Affidavit (Level 1 Contributor • 100% Black Owned EME)
8. Proof of Business Operating Address (Lenyenye, Tzaneen)

We maintain full operational capacity and localized inventory readiness to support your weekly funeral scheduling requirements with guaranteed delivery and setup timelines.

Please advise if any further verification or documentation is required to finalize our listing.

Kind regards,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Direct Line / WhatsApp: +27 83 597 6462
Emails: info@hlugiso.co.za / thabomakola80@gmail.com
Central Supplier Database (CSD): MAAA0818606
CIDB Registration: Grade 1CE (CRS: 11116631)
Website: www.hlugiso.co.za
Depot: Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo`,
  },
  {
    id: 'parlour_sla',
    title: 'Funeral Parlour Preferred Weekly Subcontractor SLA Proposal',
    category: 'funeral_parlours',
    badge: 'Weekly Retainer / SLA',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Propose an exclusive or preferred weekly logistics partnership to undertakers (AVBOB, Icebolethu, Martins, Doves) with guaranteed setup times, standby generators, and corporate 30-day billing.',
    fields: [
      { id: 'recipient', label: 'Funeral Undertaker / Executive', placeholder: 'e.g. Branch Manager, AVBOB Tzaneen & Polokwane', defaultValue: 'Branch Manager, Icebolethu / AVBOB Funeral Services' },
      { id: 'email', label: 'Recipient Email Address', placeholder: 'e.g. manager@funeralhome.co.za', defaultValue: 'branches@icebolethu.co.za', type: 'email' },
      { id: 'district', label: 'Operational Coverage Territory', placeholder: 'e.g. Tzaneen, Nkowankowa, Lenyenye, Modjadjiskloof, Bolobedu', defaultValue: 'Tzaneen, Nkowankowa, Lenyenye, Modjadjiskloof, Bolobedu & Surrounds' },
    ],
    getSubject: (v) => `Partnership Proposal: Dedicated Weekly Funeral Infrastructure & Cold-Chain Logistics – HLUGISO (Pty) Ltd`,
    getBody: (v) => `Dear ${v.recipient || 'Funeral Undertaker Management'},

RE: PROPOSAL FOR PREFERRED REGIONAL INFRASTRUCTURE & COLD-CHAIN SERVICE LEVEL AGREEMENT (SLA)

I am writing to formally present HLUGISO (Pty) Ltd as your dedicated, localized subcontractor for weekly funeral infrastructure, cold-chain refrigeration, and mobile sanitation across ${v.district || 'the Mopani & Capricorn districts'}.

We recognize that the reputation of your esteemed funeral brand depends on flawless, zero-failure Friday setups and absolute dignity on Saturday mornings. HLUGISO is structured to eliminate all logistical bottlenecks for your branch:

KEY SERVICE LEVEL COMMITMENTS (OUR SLA GUARANTEE):
1. Guaranteed Setup Timelines: Complete tent erection, draping, and VIP restroom placement completed by 15:00 on Friday afternoon, ready for family arrival and night vigils.
2. Dual-Power Mobile Cold Rooms: Dual 220V grid and silent onboard generator backup, keeping ceremonial bodies and refreshments strictly at -2°C to +4°C regardless of load shedding.
3. Luxury VIP Sanitation: Fresh-water flushable restroom trailers with porcelain bowls, solar interior lighting, running water basins, and dedicated sanitation attendants.
4. Livestock Sourcing Direct from Farm: Inspected cattle, goats, and sheep delivered directly to the homestead on Thursday/Friday with veterinary transit compliance.
5. 24/7 Rapid Emergency Response: Dedicated standby vehicle and technician on call within a 45-minute radius of Tzaneen.

COMMERCIAL BENEFIT TO YOUR UNDERTAKING:
• Preferential Subcontractor Rate Card: Up to 15% discount on bundled weekly bookings (Tent + VIP Restroom + Cold Room).
• Single Point of Contact & Consolidated 30-Day Billing: One itemized statement at month-end, reducing your administration overhead.
• 100% B-BBEE Level 1 Recognition: Enhancing your enterprise procurement scorecard (135% procurement recognition).

We would appreciate 15 minutes of your time this week for a brief meeting or depot visit to inspect our fleet and discuss a tailored weekly rate schedule.

Kind regards,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Direct Line / WhatsApp: +27 83 597 6462
Email: info@hlugiso.co.za
Operating Depot: Tzaneen / Lenyenye, Limpopo
Website: www.hlugiso.co.za`,
  },
  {
    id: 'municipal_rfq',
    title: 'Formal Municipal RFQ / Tender Submission Cover Email',
    category: 'procurement',
    badge: 'Municipal SCM / PPPFA',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Submission cover email for municipal 7-day RFQs and tenders. Maximizes specific goals points (100% Tzaneen local preference, Level 1 B-BBEE, 100% Black EME).',
    fields: [
      { id: 'recipient', label: 'Procuring Entity / Municipality', placeholder: 'e.g. Greater Tzaneen Municipality Supply Chain Unit', defaultValue: 'Greater Tzaneen Municipality Supply Chain Unit' },
      { id: 'email', label: 'SCM Email / Bid Submission Box', placeholder: 'e.g. scm@tzaneen.gov.za', defaultValue: 'quotes@tzaneen.gov.za', type: 'email' },
      { id: 'rfqNumber', label: 'RFQ / Tender Notice Number', placeholder: 'e.g. SCM/GTM/08/2026', defaultValue: 'RFQ: SCM/GTM/INFRA/2026' },
      { id: 'scopeTitle', label: 'Procurement Scope Description', placeholder: 'e.g. Provision of Event Marquees, Sound & Mobile Sanitation for Mayoral Imbizo', defaultValue: 'Provision of Marquee Infrastructure, VIP Sanitation & Power Support' },
    ],
    getSubject: (v) => `FORMAL SUBMISSION: ${v.rfqNumber || 'RFQ SUBMISSION'} – ${v.scopeTitle || 'Event Infrastructure'} – HLUGISO (Pty) Ltd`,
    getBody: (v) => `TO: The Supply Chain Management / Bid Adjudication Committee
${v.recipient || 'Greater Tzaneen Municipality'}

ATTENTION: SCM Procurement Officer

RE: FORMAL QUOTATION SUBMISSION FOR:
Tender / RFQ Reference: ${v.rfqNumber || 'RFQ-2026'}
Scope of Works: ${v.scopeTitle || 'Commercial Supply of Infrastructure & Fleet Services'}

HLUGISO (Pty) Ltd (Registration No: 2019/412705/07) is pleased to submit our formal price quotation, technical specification, and statutory compliance documentation for the above-referenced procurement call.

STATUTORY REGULARITY & PREFERENTIAL PROCUREMENT STATUS:
• CSD Verified Supplier Number: MAAA0818606 (Tax Compliant)
• CIDB Contractor Grading: Grade 1CE (CRS Number: 11116631)
• SARS Tax Compliance Status: PIN Active (Ref: 9250830230)
• B-BBEE Contribution Level: Level 1 Contributor (135% Procurement Recognition)
• Enterprise Classification: 100% Black Owned / Youth Owned EME
• Local Economic Footprint: Registered Head Office & Operating Depot located within Greater Tzaneen Municipality (Stand No 01, Tickyline Village, Lenyenye, Tzaneen). HLUGISO qualifies for MAXIMUM SPECIFIC GOALS POINTS for local enterprise preference under the Preferential Procurement Policy Framework Act (PPPFA 2022 Regulations).

ATTACHED PROCUREMENT PACK CONTENTS:
1. Completed, Signed & Stamped Official MBD / SBD Forms (SBD 4 Declaration of Interest & SBD 6.1 Preference Points Claim)
2. Itemized Official Price Quotation (Inclusive of Delivery, Setup, Operational Attendance & Striking)
3. National Treasury CSD Master Registration Report
4. Active SARS Tax Compliance PIN Verification Certificate
5. CIPC Company Registration Certificate (CoR 14.3)
6. Certified Identity Document of Managing Director
7. Sworn B-BBEE EME Affidavit
8. Proof of Municipal Business Rates / Tribal Authority Proof of Residence (Lenyenye Depot)
9. HLUGISO Executive Corporate Profile & Past Performance Experience

We confirm our complete operational readiness, vehicle availability, and capacity to deliver strictly within the stipulated commencement deadline upon receipt of official municipal purchase order (PO).

Yours faithfully,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Mobile / WhatsApp: +27 83 597 6462
Corporate Email: info@hlugiso.co.za
Official Portal: www.hlugiso.co.za`,
  },
  {
    id: 'client_quote',
    title: 'Official Client Quotation & Pro-Forma Invoice Email',
    category: 'clients',
    badge: 'Private & Corporate Quotes',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Professional quote presentation for private families, wedding planners, and corporate organizers with FNB bank verification and booking deposit terms.',
    fields: [
      { id: 'recipient', label: 'Client / Family Representative', placeholder: 'e.g. Mr. & Mrs. Chauke / Kgatla Family', defaultValue: 'The Family Representative / Event Committee' },
      { id: 'email', label: 'Client Email', placeholder: 'e.g. client@gmail.com', defaultValue: 'client@gmail.com', type: 'email' },
      { id: 'eventDate', label: 'Event Date & Location', placeholder: 'e.g. 24-25 October 2026, Nkowankowa Section A', defaultValue: 'Upcoming Weekend, Tzaneen / Surrounds' },
      { id: 'quoteRef', label: 'Quote / Pro-Forma Invoice Ref', placeholder: 'e.g. HLG-Q-2026-084', defaultValue: 'HLG-Q-2026-084' },
      { id: 'quoteTotal', label: 'Total Quoted Amount (ZAR)', placeholder: 'e.g. R 18,500.00', defaultValue: 'R 18,500.00' },
    ],
    getSubject: (v) => `Official Quotation ${v.quoteRef || ''}: Infrastructure & Event Hire – HLUGISO (Pty) Ltd`,
    getBody: (v) => `Dear ${v.recipient || 'Valued Client'},

Thank you for contacting HLUGISO (Pty) Ltd for your upcoming event on ${v.eventDate || 'your scheduled date'}.

Please find attached your detailed, itemized Official Quotation (Ref: ${v.quoteRef || 'HLG-Q-2026'}).

QUOTATION SUMMARY:
• Quoted Scope: Turnkey Event & Memorial Infrastructure (Tents, Executive Seating, VIP Sanitation, Cold Room & Power)
• Event Location & Date: ${v.eventDate || 'As specified'}
• Total Quoted Value: ${v.quoteTotal || 'R 0.00'} (Inclusive of transport, setup, and strike-down)

WHAT MAKES HLUGISO DIFFERENT:
✓ Punctual Setup Guarantee: Our crew arrives strictly on schedule, ensuring your venue is fully ready well in advance.
✓ Pristine Equipment: Sanitized flush VIP mobile restrooms with running water, clean commercial-grade tents, and executive draping.
✓ Reliable Cold-Chain: Mobile cold rooms equipped with silent generators to safeguard food and beverages during any power interruption.

CONFIRMATION & PAYMENT TERMS:
To secure your equipment reservation on our fleet allocation schedule:
1. A 50% booking deposit is required to confirm reservation.
2. The remaining 50% balance is payable prior to site setup.

OFFICIAL BANKING DETAILS (FNB):
• Bank Name: First National Bank (FNB)
• Account Name: HLUGISO (PTY) LTD
• Account Type: Business Cheque Account
• Account Number: 62828282828 (Refer to attached PDF invoice for full verified details)
• Branch Code: 250655
• Payment Reference: ${v.quoteRef || 'Invoice-Number'} + Your Surname

Please reply to this email or send your Proof of Payment (POP) via WhatsApp to +27 83 597 6462 so our dispatch team can immediately lock your booking.

Warm regards,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Direct Line / WhatsApp: +27 83 597 6462
Email: info@hlugiso.co.za
Website: www.hlugiso.co.za`,
  },
  {
    id: 'contractor_jv',
    title: 'Tier-1 Contractor 30% Local Subcontractor / JV Pitch',
    category: 'civils',
    badge: 'CIDB 1CE Subcontracting',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Pitch HLUGISO to Tier-1 construction contractors (Grade 5CE to 9CE) executing SANRAL, RAL, or CoGHSTA civil projects in Limpopo as their 30% local subcontractor.',
    fields: [
      { id: 'recipient', label: 'Main Contractor / Contracts Director', placeholder: 'e.g. Raubex / Stefanutti Stocks Project Director', defaultValue: 'Contracts Director & Procurement Committee' },
      { id: 'email', label: 'Contractor Email', placeholder: 'e.g. tenders@maincontractor.co.za', defaultValue: 'procurement@contractor.co.za', type: 'email' },
      { id: 'projectName', label: 'Project Name / Road Tender Ref', placeholder: 'e.g. SANRAL R36 Road Rehabilitation / Mopani District Pipeline', defaultValue: 'SANRAL / Roads Agency Limpopo (RAL) Infrastructure Upgrade' },
    ],
    getSubject: (v) => `Subcontracting & Joint Venture Expression of Interest: 30% Local Content Partner – HLUGISO (Pty) Ltd`,
    getBody: (v) => `Dear ${v.recipient || 'Contracts Director'},

RE: EXPRESSION OF INTEREST – 30% MANDATORY LOCAL SUBCONTRACTING & SITE LOGISTICS PARTNER
Project: ${v.projectName || 'Mopani District Civil Infrastructure Project'}

I am writing on behalf of HLUGISO (Pty) Ltd (CIDB Grade 1CE, CRS: 11116631), a 100% Black-owned civil and event logistics company headquartered in Tzaneen, Limpopo.

With major road, stormwater, and civil engineering upgrades being executed across the Mopani and Capricorn corridors, HLUGISO offers Tier-1 contractors a trusted, fully compliant, and localized subcontractor partner to satisfy your 30% local participation and B-BBEE scorecard goals.

OUR OPERATIONAL CIVIL & SITE LOGISTICS CAPABILITIES:
1. Civil Subcontracting (CIDB 1CE): Bulk earthworks, site clearing, bush cutting, trench excavation, concrete kerbing, and gabion installation.
2. Temporary Site Camp Infrastructure: High-capacity site office marquees, perimeter safety fencing, shaded worker rest stations, and high-output site lighting towers.
3. Mobile Site Sanitation: Scheduled servicing of mobile restroom trailers and chemical toilets for site personnel and engineering staff.
4. Water Tankering & Dust Suppression: Potable water delivery for construction camps and non-potable water tankers for compaction and dust suppression.
5. Community Liaison & Local Labour Mobilization: Strong, respectful working relationships with local tribal authorities and community forums across Greater Tzaneen, ensuring frictionless community buy-in and zero site stoppages.

STATUTORY COMPLIANCE CREDENTIALS:
• CIDB: Grade 1CE Active Contractor
• CSD Supplier Number: MAAA0818606 (Tax Compliant)
• B-BBEE Level: Level 1 Contributor (135% Recognition)
• COIDA: Letter of Good Standing (Compensation Fund)
• Registered Operating Depot: Tzaneen / Lenyenye, Limpopo

We welcome the opportunity to meet with your Contracts Manager or Commercial Team to review our plant and discuss how we can support your site establishment and local subcontractor requirements.

Yours sincerely,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Direct Line / WhatsApp: +27 83 597 6462
Email: info@hlugiso.co.za
Website: www.hlugiso.co.za`,
  },
  {
    id: 'livestock_spec',
    title: 'Ceremonial Livestock Supply & Farm-Direct Delivery Spec Sheet',
    category: 'funeral_parlours',
    badge: 'Livestock & Cultural Supply',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Official confirmation and health spec sheet for cultural and ceremonial livestock orders (cattle, goats, sheep) direct from Limpopo farms.',
    fields: [
      { id: 'recipient', label: 'Client / Cultural Committee', placeholder: 'e.g. Mr. Modiba / Ceremonial Elders', defaultValue: 'The Family & Ceremonial Committee' },
      { id: 'email', label: 'Recipient Email', placeholder: 'e.g. client@gmail.com', defaultValue: 'client@gmail.com', type: 'email' },
      { id: 'livestockDetails', label: 'Livestock Specifications', placeholder: 'e.g. 1x Brahman Cross Heifer (~380kg) + 2x Large Boer Goats', defaultValue: '1x Brahman Cross Slaughter Heifer (~380-420kg) + 2x Large Boer Goats' },
      { id: 'deliveryAddress', label: 'Homestead / Delivery Address', placeholder: 'e.g. Stand 104, Dan Village, Nkowankowa', defaultValue: 'Specified Homestead, Greater Tzaneen' },
      { id: 'deliveryTime', label: 'Scheduled Delivery Time', placeholder: 'e.g. Thursday 22 October at 14:00', defaultValue: 'Thursday afternoon prior to ceremony' },
    ],
    getSubject: (v) => `Livestock Order Confirmation & Transit Health Certificate – HLUGISO (Pty) Ltd`,
    getBody: (v) => `Dear ${v.recipient || 'Ceremonial Representative'},

RE: CEREMONIAL LIVESTOCK ORDER CONFIRMATION & FARM-DIRECT TRANSIT NOTICE

HLUGISO (Pty) Ltd confirms the reservation and transit schedule for your cultural and ceremonial livestock order.

ORDER SPECIFICATIONS:
• Animals Reserved: ${v.livestockDetails || 'Inspected Cattle / Goats'}
• Delivery Destination: ${v.deliveryAddress || 'Client Homestead'}
• Scheduled Farm Transit & Delivery: ${v.deliveryTime || 'As scheduled'}

HEALTH & CULTURAL QUALITY GUARANTEE:
1. Direct Limpopo Farm Sourcing: Animals are pasture-reared and veterinary inspected for optimal health and condition.
2. Safe Transit & Humane Transport: Delivered in sanitized, purpose-built livestock trailers with non-slip bedding, minimizing stress during transit.
3. On-Site Inspection & Acceptance: You and your family elders inspect the livestock upon offloading. Only upon full satisfaction does the handover conclude.
4. Holding & Slaughter Assistance: Water troughs and secure holding halters provided. Professional slaughter and quartering assistance available upon prior request.

EMERGENCY LOGISTICS LINE:
Our livestock transport driver will contact you 2 hours prior to arrival at the homestead. If you need any directions or gate clearance updates, contact our dispatch office at +27 83 597 6462.

With respect and best wishes for your ceremonial gathering,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Direct Line / WhatsApp: +27 83 597 6462
Email: info@hlugiso.co.za
Website: www.hlugiso.co.za`,
  },
  {
    id: 'review_request',
    title: 'Post-Service Bereavement Follow-up & 5-Star Google Review',
    category: 'clients',
    badge: 'Client Care & Reputation',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    description: 'Compassionate follow-up sent to families or organizers on Monday/Tuesday after an event, ensuring satisfaction, settling deposits, and requesting a 5-star Google review.',
    fields: [
      { id: 'recipient', label: 'Family Representative / Client', placeholder: 'e.g. The Mathebula Family', defaultValue: 'The Family Representative' },
      { id: 'email', label: 'Client Email', placeholder: 'e.g. mathebula@gmail.com', defaultValue: 'client@gmail.com', type: 'email' },
      { id: 'eventLocation', label: 'Event Venue / Village', placeholder: 'e.g. Lenyenye / Tzaneen', defaultValue: 'Tzaneen / Surrounding Villages' },
    ],
    getSubject: (v) => `With Heartfelt Appreciation from the HLUGISO Team`,
    getBody: (v) => `Dear ${v.recipient || 'Valued Family'},

On behalf of the entire management and operations team at HLUGISO (Pty) Ltd, we extend our sincere gratitude for trusting us to provide infrastructure and site support for your gathering in ${v.eventLocation || 'Limpopo'}.

During solemn and important family milestones, our primary goal is to carry the operational burden so your family can focus on honouring your loved one and receiving guests with pride and peace of mind.

We trust that our team served you with the dignity, punctuality, and excellence you deserved.

A QUICK REQUEST TO HELP OTHER FAMILIES:
If you were satisfied with our tents, VIP restrooms, cold storage, or staff, would you mind taking 30 seconds to share a brief review on Google? 

Your feedback helps other families across Tzaneen and Limpopo know that they can count on HLUGISO during their times of need.

👉 Click here to leave a quick Google Review: https://g.page/r/hlugiso-pty-ltd/review

If there was anything that did not meet your expectations, please message me directly on WhatsApp at +27 83 597 6462 so I can personally attend to it.

May peace and comfort remain with your family.

Warm regards,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD

Direct Line / WhatsApp: +27 83 597 6462
Email: info@hlugiso.co.za
Website: www.hlugiso.co.za`,
  },
  {
    id: 'disaster_relief',
    title: 'Municipal Emergency Disaster & Water Tankering Dispatch Notice',
    category: 'emergency',
    badge: 'Disaster Relief / Water',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    description: 'Rapid-response notice to Municipal Disaster Management, Ward Councillors, and Water Services Authorities confirming emergency water tankers, shelter marquees, and sanitation availability.',
    fields: [
      { id: 'recipient', label: 'Municipal Disaster Manager / Authority', placeholder: 'e.g. Mopani District Disaster Management Centre', defaultValue: 'Mopani District / Greater Tzaneen Disaster Management Unit' },
      { id: 'email', label: 'Disaster Unit Email', placeholder: 'e.g. disaster@mopani.gov.za', defaultValue: 'disaster@mopani.gov.za', type: 'email' },
      { id: 'incidentArea', label: 'Affected Ward / Community', placeholder: 'e.g. Ward 14, Mariveni / Tickyline flood relief', defaultValue: 'Greater Tzaneen Municipal Wards' },
    ],
    getSubject: (v) => `EMERGENCY DISPATCH NOTICE: Potable Water Tankering & Humanitarian Sanitation Relief – HLUGISO (Pty) Ltd`,
    getBody: (v) => `ATTENTION: Head of Disaster Management / Municipal Water Services Authority
${v.recipient || 'Mopani District Municipality'}

RE: RAPID-RESPONSE DISASTER RELIEF CAPACITY: POTABLE WATER & SANITATION DEPLOYMENT
Target Relief Zone: ${v.incidentArea || 'Mopani District / Greater Tzaneen Area'}

HLUGISO (Pty) Ltd (CSD: MAAA0818606 • CIDB: Grade 1CE) confirms immediate fleet readiness to support your municipal disaster management unit with emergency water supply, temporary shelter, and sanitation facilities.

EMERGENCY DISPATCH FLEET SPECIFICATIONS:
1. Potable Water Tanker Trailers: SABS food-grade certified tanks for drinking water distribution to affected clinics, schools, and displaced households.
2. Temporary Humanitarian Shelter: Fast-erecting commercial marquees and disaster response tents equipped with storm tie-downs and weather walling.
3. Mobile Emergency Sanitation: Self-contained, solar-lit VIP toilet trailers requiring zero municipal sewer connection, preventing disease outbreaks in crisis areas.
4. Mobile Cold-Chain Support: Refrigerated units for pharmaceutical storage or emergency food parcel preservation.
5. Silent Diesel Generators: Mobile backup power generation (5kVA - 50kVA) for temporary emergency coordination camps and boreholes.

OPERATIONAL DISPATCH LEAD TIME:
• Standby Location: Tzaneen / Lenyenye Depot (Immediate road access to R36 & R71).
• Rapid Deployment: First convoy able to roll out within 2 to 4 hours of official emergency municipal instruction.

DIRECT 24/7 EMERGENCY CONTACT:
Thabo Makola (Managing Director)
Direct Mobile / WhatsApp: +27 83 597 6462
Secondary Emergency Line: +27 83 597 6462
Email: info@hlugiso.co.za
Operating Base: Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo`,
  }
];
