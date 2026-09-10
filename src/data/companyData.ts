export interface ServiceItem {
  id: string;
  number: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  imageUrl: string;
  capabilities: string[];
  suitableClients: string[];
  keyBenefit: string;
}

export interface SectorItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  typicalServices: string[];
}

export interface DirectorItem {
  name: string;
  role: string;
  focus: string;
  bio: string;
}

export const COMPANY_DETAILS = {
  name: 'HLUGISO (PTY) LTD',
  tradingName: 'HLUGISO',
  registrationNumber: '2019 / 412705 / 07',
  incorporationDate: '20 August 2019',
  companyType: 'Private Company',
  businessStatus: 'In Business',
  taxNumber: '9250830230',
  taxStatus: 'Tax Compliance Status PIN Issued',
  csdNumber: 'MAAA0818606',
  bbbeeStatus: 'Level 1 Contributor (100% Black Owned)',
  cidbGrading: 'Grade 1CE (Civil Engineering - Max R500,000)',
  cidbRegistration: 'Active 1CE Contractor',
  phoneDisplay: '083 597 6462',
  phoneCall: '+27835976462',
  whatsappUrl: 'https://wa.me/27835976462?text=Hello%20HLUGISO%20team,%20I%20would%20like%20to%20enquire%20about%20your%20services.',
  email: 'info@hlugiso.co.za',
  address: {
    stand: 'Stand No 01, Tickyline Village',
    town: 'Lenyenye, Tzaneen',
    province: 'Limpopo',
    postalCode: '0850',
    country: 'South Africa',
    fullAddress: 'Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850, South Africa',
  },
  operatingRegions: ['Limpopo (Tzaneen, Polokwane, Mopani & Surrounds)', 'National Capability by Arrangement'],
  directors: [
    {
      name: 'Thabo Makola',
      role: 'Managing Director',
      focus: 'Executive Leadership, Business Strategy, Operations & Procurement Governance',
      bio: 'Directs strategic growth, commercial contract alignment, fleet operations, and tender-ready compliance across the organization.',
    },
  ] as DirectorItem[],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'funeral-infrastructure',
    number: 1,
    title: 'Funeral & Memorial Infrastructure',
    slug: 'funeral-infrastructure',
    shortDescription: 'Respectful, dependable infrastructure and turnkey support for funerals, memorial services, and dignified family or community gatherings.',
    fullDescription: 'HLUGISO provides reliable infrastructure and comprehensive site support solutions for funerals and memorial services. We understand the critical need for dignified, punctual, and weather-resistant structures during solemn occasions, ensuring families and organisations receive seamless service without added stress.',
    iconName: 'Tent',
    imageUrl: '/images/funeral.jpg',
    capabilities: [
      'High-grade marquees, shade canopies and perimeter screening',
      'Executive VIP mobile toilet trailers with safety stairs, grab handles, and flush sanitation',
      'Dignified memorial seating, executive family seating, and podium arrangements',
      'Weather-resistant ground coverings, staging, and ceremonial walkways',
      'Comprehensive setup, on-site operational attendance, and discreet de-rigging',
      'Sanitation facilities, handwash stations, and waste management support',
      'Reliable power generation and backup distribution for lighting and sound',
    ],
    suitableClients: [
      'Bereaved Families and Family Trusts',
      'Funeral Undertakers and Parlours',
      'Government Departments and Municipal Protocol Units',
      'Civic and Traditional Authorities',
      'Community Burial Societies',
    ],
    keyBenefit: 'Punctual, dignified execution with strict adherence to family and cultural protocols.',
  },
  {
    id: 'events-infrastructure',
    number: 2,
    title: 'Weddings, Parties & Events',
    slug: 'weddings-parties-events',
    shortDescription: 'Professional event infrastructure, marquees, venue setup, and logistical coordination for corporate, private, and public celebrations.',
    fullDescription: 'From corporate banquets and municipal inaugurations to elegant weddings and private celebrations, HLUGISO delivers dependable infrastructure that transforms open venues into functional, comfortable, and impressive event spaces.',
    iconName: 'PartyPopper',
    imageUrl: '/images/events.jpg',
    capabilities: [
      'Framed marquees, stretch tents, and weatherproof modular canopies',
      'Executive VIP mobile restroom trailers for outdoor weddings and VIP guest zones',
      'Full table, chair, linen, and decorative setup coordination',
      'VIP lounge structures and demarcated hospitality zones',
      'Staging, ceremonial backdrops, and presentation platforms',
      'Temporary event perimeter fencing and crowd demarcation',
      'On-site event technicians ensuring continuous infrastructure stability',
    ],
    suitableClients: [
      'Corporate Entities & Marketing Agencies',
      'Event Planners and Wedding Organisers',
      'Municipalities and Government Event Committees',
      'Educational Institutions and Sports Bodies',
      'Private Clients hosting landmark celebrations',
    ],
    keyBenefit: 'Full structural reliability, safety compliance, and spotless presentation.',
  },
  {
    id: 'mobile-cold-chain',
    number: 3,
    title: 'Mobile Cold-Chain Solutions',
    slug: 'mobile-cold-chain',
    shortDescription: 'Dependable mobile cold-storage units and temperature-controlled trailers for catering, events, perishable logistics, and ceremonial needs.',
    fullDescription: 'HLUGISO provides mobile cold-chain support to safeguard perishables, catering supplies, beverages, and ceremonial provisions. Our mobile units offer practical, on-site refrigeration where fixed infrastructure is absent or overwhelmed.',
    iconName: 'Snowflake',
    imageUrl: '/images/mobile-fridge.png',
    capabilities: [
      'Mobile cold-room trailers delivered directly to project sites',
      'Hygienic, insulated storage compartments for food and beverage integrity',
      'Multi-day deployment for rural ceremonies, outdoor weddings, and remote work sites',
      'Dual-power compatibility (mains hookup or dedicated generator support)',
      'Clean, pre-sanitised interior surfaces ready for immediate stocking',
      'Scheduled preventive inspections and rapid technical field backup',
    ],
    suitableClients: [
      'Catering Contractors and Large Event Organisers',
      'Funeral Undertakers and Community Ceremonial Organisers',
      'Fresh Food Suppliers, Butchers and Agricultural Producers',
      'Remote Field Operations and Construction Camps',
    ],
    keyBenefit: 'Eliminates spoilage risks at remote locations with dependable mobile cold storage.',
  },
  {
    id: 'sound-equipment',
    number: 4,
    title: 'Sound & Event Equipment',
    slug: 'sound-event-equipment',
    shortDescription: 'Corporate public address (PA) systems, wireless microphones, acoustic reinforcement, and event audio for indoor and outdoor gatherings.',
    fullDescription: 'Clear communication is paramount for speeches, presentations, musical performances, and crowd announcements. HLUGISO supplies professional sound systems engineered for high speech intelligibility and balanced acoustic distribution across any venue size.',
    iconName: 'Volume2',
    imageUrl: '/images/sound.jpg',
    capabilities: [
      'High-fidelity PA systems tailored for indoor halls and outdoor arenas',
      'Reliable UHF wireless handheld, lapel, and podium microphones',
      'Audio mixing consoles with auxiliary inputs for multi-media playback',
      'Sound engineer and technician support throughout proceedings',
      'Independent power generators ensuring zero acoustic interruption',
      'Auxiliary speakers for overflow tents and extended audience areas',
    ],
    suitableClients: [
      'Government Protocol Units and Municipal Press Briefings',
      'Corporate AGMs, Conferences, and Product Launches',
      'Church Services, Community Imbizos, and Rallies',
      'Wedding Ceremonies and Memorial Services',
    ],
    keyBenefit: 'Crystal-clear vocal projection and reliable audio engineering with no feedback or dropouts.',
  },
  {
    id: 'livestock-supply',
    number: 5,
    title: 'Livestock Supply',
    slug: 'livestock-supply',
    shortDescription: 'Ethical, dependable sourcing and transport of healthy livestock for agricultural, traditional, ceremonial, and institutional requirements.',
    fullDescription: 'HLUGISO provides reliable livestock sourcing and transport solutions for approved clients requiring cattle, sheep, goats, or poultry. Sourced through established agricultural networks, our animals meet stringent health, welfare, and logistical standards.',
    iconName: 'BadgeCheck',
    imageUrl: '/images/livestock.jpg',
    capabilities: [
      'Sourcing of healthy, vetted cattle, goats, sheep, and poultry',
      'Transparent sourcing from reputable commercial and communal livestock breeders',
      'Humane, compliant transit using certified livestock-safe transport vehicles',
      'Direct on-time delivery to designated venues, homesteads, or holding facilities',
      'Documentation and stock transit clearance in accordance with regulations',
      'Support for ceremonial slaughter preparations and custom client specifications',
    ],
    suitableClients: [
      'Private Families arranging cultural ceremonies, weddings, and unveilings',
      'Community Groups and Traditional Authorities',
      'Institutional Feeding Programs and Food Processors',
      'Smallholder Farmers and Agricultural Co-operatives',
    ],
    keyBenefit: 'Healthy stock, ethical handling, and dependable point-to-point delivery.',
  },
  {
    id: 'cleaning-maintenance',
    number: 6,
    title: 'Cleaning & Maintenance Services',
    slug: 'cleaning-facility-services',
    shortDescription: 'Commercial cleaning, daily contract janitorial services, deep sanitisation, carpet extraction, and executive facility maintenance.',
    fullDescription: 'HLUGISO operates a high-standard corporate cleaning division serving municipal offices, corporate facilities, educational institutions, and commercial spaces. Our vetted personnel, hospital-grade chemicals, and strict quality auditing guarantee hygienic, welcoming workplaces.',
    iconName: 'Sparkles',
    imageUrl: '/images/cleaning.jpg',
    capabilities: [
      'General commercial and corporate office daily janitorial maintenance',
      'Scheduled deep cleaning, floor stripping, scrubbing, and polymer polishing',
      'Industrial carpet steam extraction and upholstery sanitisation',
      'Complete ablution descaling, disinfection, and continuous hygiene replenishment',
      'Kitchen and canteen sanitisation meeting strict health standards',
      'Consumable inventory management (paper products, soaps, sanitizers, bins)',
      'Executive boardroom and meeting-room staging and post-session turnover',
      'Post-construction and post-event cleanup and waste segregation',
    ],
    suitableClients: [
      'Government Departments and Municipal Civic Centres',
      'Corporate Headquarters, Banks, and Professional Service Offices',
      'Warehouses, Distribution Depots, and Industrial Parks',
      'Schools, Health Clinics, and Public Amenities',
      'Event Venues and Commercial Real Estate Portfolios',
    ],
    keyBenefit: 'Trained, uniformed personnel, documented checklists, and executive-level hygiene assurance.',
  },
  {
    id: 'construction-civil',
    number: 7,
    title: 'Construction & Civil Engineering',
    slug: 'construction-civil-engineering',
    shortDescription: 'CIDB Grade 1CE registered civil engineering, site works, paved surfaces, drainage solutions, and minor building infrastructure.',
    fullDescription: 'HLUGISO is registered with the Construction Industry Development Board (CIDB) under Grade 1CE (Civil Engineering, threshold R500,000) and categorized on the Central Supplier Database (CSD). We execute civil works, site preparation, paving, drainage, and structural refurbishment with safety and precision.',
    iconName: 'HardHat',
    imageUrl: '/images/construction.jpg',
    capabilities: [
      'Site clearing, minor earthworks, and foundation preparation',
      'Concrete paving, interlock block paving, kerbing, and gravel access roads',
      'Stormwater drainage channels, culverts, and erosion control measures',
      'Facility repairs, perimeter walling, security fencing, and gate installations',
      'Structural refurbishment, plastering, painting, and surface protective coatings',
      'Occupational Health & Safety (OHS) compliant site management',
    ],
    suitableClients: [
      'Municipal Infrastructure and Public Works Units',
      'Schools, Clinics, and Public Community Centres',
      'Commercial Property Managers and Industrial Complexes',
      'Agricultural and Farming Infrastructure Projects',
      'Private Developers undertaking perimeter and civil upgrades',
    ],
    keyBenefit: 'Fully compliant CIDB 1CE contractor with stringent on-site safety standards.',
  },
  {
    id: 'supply-support',
    number: 8,
    title: 'Supply & Support Services',
    slug: 'supply-support-services',
    shortDescription: 'Dependable procurement, general operational supplies, PPE, tools, hardware, and logistical support for corporate and public entities.',
    fullDescription: 'HLUGISO leverages its supply chain network to source and deliver essential operational materials, safety gear, office supplies, and hardware consumables. As a CSD-registered supplier, we simplify vendor management through single-source procurement.',
    iconName: 'Truck',
    imageUrl: '/images/supply.jpg',
    capabilities: [
      'Procurement and delivery of personal protective equipment (PPE) and workwear',
      'Commercial janitorial consumables, sanitisation supplies, and dispensers',
      'Office stationery, presentation supplies, and operational essentials',
      'Hardware items, fasteners, maintenance tools, and site consumables',
      'Rapid turnaround delivery across Limpopo and surrounding corridors',
      'Transparent quotation, itemized invoicing, and full audit trail compliance',
    ],
    suitableClients: [
      'Government Municipalities and Sector Education Authorities',
      'Contractors requiring on-site consumable supply',
      'Non-Profit Organisations and Health Institutions',
      'Corporate Offices and Remote Facility Operations',
    ],
    keyBenefit: 'CSD-compliant procurement partner offering transparent pricing and rapid turnaround.',
  },
];

export const SECTORS_DATA: SectorItem[] = [
  {
    id: 'government-public',
    title: 'Government & Public Sector',
    description: 'Tender-ready supplier supporting provincial departments, district municipalities, civic protocols, and public facility management.',
    iconName: 'Building2',
    typicalServices: ['CSD Compliant Procurement', 'Facility Cleaning', 'Civil Works (1CE)', 'Public Ceremonies & Imbizos'],
  },
  {
    id: 'corporate-business',
    title: 'Corporate & Business',
    description: 'Structured contract cleaning, boardroom hygiene, executive events, and dependable equipment supply for private enterprises.',
    iconName: 'Briefcase',
    typicalServices: ['Daily Office Janitorial', 'Corporate Functions', 'Carpet & Upholstery Care', 'Consumables Supply'],
  },
  {
    id: 'community-organisations',
    title: 'Community Organisations',
    description: 'Supportive infrastructure and respectful logistical delivery for burial societies, religious assemblies, and local gatherings.',
    iconName: 'Users',
    typicalServices: ['Funeral Infrastructure', 'Sound & Audio Systems', 'Livestock Supply', 'Temporary Shelters'],
  },
  {
    id: 'event-hospitality',
    title: 'Event & Hospitality',
    description: 'Turnkey event setups, mobile refrigeration, marquee structures, and acoustic systems for coordinators and venue operators.',
    iconName: 'Sparkles',
    typicalServices: ['Stretch & Frame Marquees', 'Mobile Cold-Chain', 'High-Output Sound', 'Post-Event Sanitisation'],
  },
  {
    id: 'construction-infrastructure',
    title: 'Construction & Infrastructure',
    description: 'CIDB Grade 1CE registered contractor for minor civil engineering, paving, site clearing, fencing, and operational support.',
    iconName: 'HardHat',
    typicalServices: ['CIDB 1CE Civil Works', 'Stormwater & Drainage', 'Site Fencing', 'Post-Build Clean-Out'],
  },
  {
    id: 'private-clients',
    title: 'Private Clients',
    description: 'Personalized service for landmark family milestones, traditional weddings, unveilings, and home infrastructure projects.',
    iconName: 'HeartHandshake',
    typicalServices: ['Wedding Marquees', 'Solemn Funeral Setups', 'Livestock Sourcing', 'Audio & Cold Storage'],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Reliable & Professional',
    description: 'Documented processes, punctual deployment, and dedicated site supervision ensure commitments are met with zero compromise.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Multi-Service Capability',
    description: 'Consolidate multiple vendor relationships under one accountable partner across infrastructure, logistics, cleaning, and civil works.',
    icon: 'Layers',
  },
  {
    title: 'Established South African Entity',
    description: 'Incorporated in 2019 in Tzaneen, Limpopo, with deep regional knowledge and an expanding provincial footprint.',
    icon: 'MapPin',
  },
  {
    title: 'Government & Tender Ready',
    description: 'CSD registered (MAAA0818606), CIDB accredited (Grade 1CE), B-BBEE Level 1, with an active SARS Tax Compliance Status PIN.',
    icon: 'FileCheck2',
  },
  {
    title: 'Practical, Client-Focused Delivery',
    description: 'Flexible solutions built around real operational constraints, realistic lead times, and budget transparency.',
    icon: 'Target',
  },
  {
    title: 'Strict Quality & Hygiene Assurance',
    description: 'Hospital-grade sanitisation chemicals, audited cleaning checklists, and safe, well-maintained event structures.',
    icon: 'Sparkles',
  },
];

export const CREDENTIALS_LIST = [
  { label: 'Registered Entity Name', value: COMPANY_DETAILS.name, highlight: true },
  { label: 'Registration Number', value: COMPANY_DETAILS.registrationNumber, highlight: true },
  { label: 'Incorporation Date', value: '20 August 2019 (Established 2019)' },
  { label: 'Enterprise Type', value: COMPANY_DETAILS.companyType },
  { label: 'Current Trading Status', value: COMPANY_DETAILS.businessStatus, badge: 'Active' },
  { label: 'Central Supplier Database (CSD)', value: COMPANY_DETAILS.csdNumber, highlight: true, badge: 'Verified' },
  { label: 'B-BBEE Contributor Status', value: COMPANY_DETAILS.bbbeeStatus, highlight: true, badge: '100% Black Owned' },
  { label: 'CIDB Contractor Grading', value: COMPANY_DETAILS.cidbGrading, highlight: true, badge: 'Grade 1CE' },
  { label: 'SARS Income Tax Number', value: COMPANY_DETAILS.taxNumber },
  { label: 'Tax Compliance Status (TCS)', value: COMPANY_DETAILS.taxStatus, badge: 'Good Standing' },
  { label: 'Principal Registered Address', value: COMPANY_DETAILS.address.fullAddress },
  { label: 'Managing Director', value: 'Thabo Makola' },
];

export interface FleetUnitItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  imageUrl: string;
  overview: string;
  specs: string[];
  applications: string[];
}

export const MOBILE_FLEET_DATA: FleetUnitItem[] = [
  {
    id: 'mobile-cold-room',
    name: 'Mobile Cold-Room Refrigeration Trailer',
    tagline: 'Reliable Temperature-Controlled Mobile Storage',
    category: 'Mobile Cold-Chain Solutions',
    imageUrl: '/images/mobile-fridge.png',
    overview: 'High-performance mobile cold-storage trailer engineered for rapid on-site deployment. Keeps perishables, meats, fresh produce, and beverages at safe, dependable temperatures during events, ceremonies, and field operations.',
    specs: [
      'Heavy-duty insulated polyurethane thermal body for maximum cooling retention',
      'Front-mounted cooling condenser unit with protective steel mesh housing',
      'Single-axle roadworthy trailer chassis with jockey wheel and safety coupling',
      'Dual-power capability: runs on standard 220V mains or on-site generator support',
      'Hygienic food-grade interior surfaces with internal storage space',
      'Lockable insulated rear doors ensuring complete thermal containment',
    ],
    applications: [
      'Funerals, memorial services and family ceremonial catering',
      'Weddings, family unveilings and community celebrations',
      'Commercial catering and outdoor event food preservation',
      'Remote civil, construction, and agricultural field camps',
    ],
  },
  {
    id: 'vip-mobile-toilet',
    name: 'Executive VIP Mobile Toilet Trailer',
    tagline: 'Dignified, Self-Contained Mobile Sanitation',
    category: 'Event & Memorial Infrastructure',
    imageUrl: '/images/vip-toilet.png',
    overview: 'Premium dual-cubicle mobile restroom trailer providing discreet, hygienic, and dignified sanitation facilities where fixed amenities are unavailable or insufficient.',
    specs: [
      'Independent dual private cubicles (dedicated Ladies and Gents entrances)',
      'Aluminium treadplate safety stairs with dual stainless-steel grab handles',
      'Porcelain flush toilets with self-contained freshwater & waste containment tanks',
      'Interior vanity mirror, solar/battery lighting, and natural ventilation louvres',
      'Clean white composite panel exterior suitable for formal and corporate settings',
      'Fully roadworthy trailer with stabilizer jacks for level, stable positioning',
    ],
    applications: [
      'VIP protocol and executive guest areas at official government events',
      'Solemn funerals and memorial services requiring dignified amenities',
      'Outdoor weddings, private receptions and corporate functions',
      'Civic imbizos, community gatherings and public inaugurations',
    ],
  },
];

