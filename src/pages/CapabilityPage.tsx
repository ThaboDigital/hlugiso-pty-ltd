import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HardHat, 
  Snowflake, 
  Volume2, 
  Tent, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { COMPANY_DETAILS, MOBILE_FLEET_DATA } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

interface CapabilityPageProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (page: string) => void;
}

export const CapabilityPage: React.FC<CapabilityPageProps> = ({ onOpenQuote, onNavigate }) => {
  const capabilityAreas = [
    {
      category: 'Infrastructure & Venues',
      title: 'Dignified Event & Memorial Setup',
      icon: Tent,
      scope: 'Turnkey structural deployment for solemn funerals, memorial services, civic ceremonies, and private celebrations.',
      equippedToDeliver: [
        'Modular high-capacity marquees, stretch canopies, and sidewall screening',
        'Executive VIP mobile toilet trailers with aluminium safety stairs, grab handles, and flush sanitation',
        'Staging, ceremonial podiums, and executive family seating configurations',
        'Weatherproof perimeter barriers, temporary ground mats, and ceremonial pathways',
        'On-site standby technical crews for continuous structural integrity',
      ],
    },
    {
      category: 'Cold-Chain & Logistics',
      title: 'Mobile Temperature-Controlled Storage',
      icon: Snowflake,
      scope: 'Mobile refrigeration and on-site perishable safeguarding deployed directly to remote and rural sites.',
      equippedToDeliver: [
        'Heavy-duty mobile cold-room trailers designed for rough road transit',
        'Dual-power operation (mains electrical or generator coupling)',
        'Hygienic food, beverage, and catering preservation before and during events',
        'Pre-chilled delivery with full thermal integrity checks before stocking',
      ],
    },
    {
      category: 'Audio & Acoustics',
      title: 'Speech & Event Acoustic Reinforcement',
      icon: Volume2,
      scope: 'Acoustic clarity and speech intelligibility for outdoor imbizos, indoor halls, and formal presentations.',
      equippedToDeliver: [
        'Commercial PA loudspeaker systems with directional acoustic coverage',
        'Multi-channel wireless microphone units (handheld, lapel, and podium)',
        'Audio mixing and sound engineer management throughout proceedings',
        'Independent backup power solutions preventing speech interruptions',
      ],
    },
    {
      category: 'Commercial Hygiene',
      title: 'Corporate Office & Facility Maintenance',
      icon: Sparkles,
      scope: 'Daily janitorial management, high-volume deep cleaning, and executive meeting-room hygiene.',
      equippedToDeliver: [
        'Supervised daily janitorial contracts for municipal and corporate offices',
        'Industrial hot-water carpet extraction and fabric upholstery sanitisation',
        'Ablution descaling, microbial disinfection, and consumable stock management',
        'Post-construction and post-event turnaround cleaning teams',
      ],
    },
    {
      category: 'Civil & Works',
      title: 'CIDB Grade 1CE Civil Engineering',
      icon: HardHat,
      scope: 'Minor civil engineering, paving, site clearing, and infrastructure refurbishment up to R500,000 threshold.',
      equippedToDeliver: [
        'Site clearing, foundation preparation, and minor earthworks',
        'Interlock paving, concrete walkways, kerbing, and gravel maintenance',
        'Stormwater runoff control, drainage trenching, and erosion barriers',
        'Perimeter walling, security fencing installation, and structural repairs',
      ],
    },
    {
      category: 'Procurement & Supply',
      title: 'General Supply & Livestock Logistics',
      icon: Truck,
      scope: 'CSD-registered procurement of operational consumables, PPE, hardware, and healthy livestock supply.',
      equippedToDeliver: [
        'Ethical sourcing and compliant transit of cattle, sheep, goats, and poultry',
        'Commercial janitorial chemicals, paper consumables, and dispenser systems',
        'Personal protective equipment (PPE), safety workwear, and tools',
        'Transparent quotation, itemized delivery receipts, and full audit trails',
      ],
    },
  ];

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Operational Capacity
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Demonstrated Service Capability
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              A factual overview of the types of work, logistics, and infrastructure HLUGISO is equipped to undertake for institutional, corporate, and private clients.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip onNavigateCredentials={() => onNavigate('credentials')} />

      {/* Capability Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              Field Execution Systems
            </span>
            <h2 className="text-3xl font-extrabold text-gray-950">
              Equipment, Personnel & Logistics Readiness
            </h2>
            <p className="text-base text-gray-600">
              HLUGISO maintains dedicated equipment reserves and field procedures designed for dependable deployment without relying on speculative subcontractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilityAreas.map((area, idx) => {
              const AreaIcon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50/60 rounded-2xl p-7 border border-gray-200/80 shadow-xs hover:bg-white hover:border-teal-700/40 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-emerald-100/80 flex items-center justify-center text-[#064E3B]">
                        <AreaIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-white px-2.5 py-1 rounded border border-gray-200">
                        {area.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{area.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        {area.scope}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">
                        Equipped to Undertake:
                      </span>
                      <ul className="space-y-2">
                        {area.equippedToDeliver.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start text-xs text-gray-700 leading-normal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenQuote(area.title)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-emerald-50 hover:text-[#064E3B] border border-gray-200 transition-colors text-center"
                    >
                      Enquire on this Capability &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Specialized Mobile Fleet Inventory */}
          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">
                Verified Roadworthy Inventory
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                Mobile Cold-Room & VIP Restroom Fleet
              </h3>
              <p className="text-sm text-gray-600">
                Direct deployment of purpose-built trailers equipped for high-temperature resilience and dignified sanitation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {MOBILE_FLEET_DATA.map((unit) => (
                <div 
                  key={unit.id}
                  className="bg-gray-50/70 rounded-2xl border border-gray-200 shadow-xs hover:bg-white hover:border-teal-700/40 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-64 w-full bg-white p-6 flex items-center justify-center border-b border-gray-200/80">
                    <img
                      src={unit.imageUrl}
                      alt={unit.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md"
                    />
                    <div className="absolute top-4 left-4 bg-[#064E3B] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full">
                      {unit.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                          {unit.tagline}
                        </span>
                        <h4 className="text-xl font-bold text-gray-900 mt-1">
                          {unit.name}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {unit.overview}
                      </p>

                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">
                          Standard Equipment & Configuration:
                        </span>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {unit.specs.map((spec, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] mr-2 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => onOpenQuote(unit.name)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
                      >
                        Request Trailer RFQ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Standards Banner */}
          <div className="mt-16 bg-gray-900 text-white rounded-2xl p-8 sm:p-10 border border-gray-800 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Quality & Governance</span>
              </div>
              <h3 className="text-xl font-bold text-white">OHS Compliance & Site Safety</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Every site operation—from event rigging to civil construction—follows strict Occupational Health & Safety guidelines, ensuring worker safety and zero client liability.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Geographic Scope</span>
              </div>
              <h3 className="text-xl font-bold text-white">Limpopo & National Readiness</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Operating actively across Tzaneen, Polokwane, Mopani District, and surrounding provincial hubs, with capacity to deploy for larger national projects by arrangement.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Direct Oversight</span>
              </div>
              <h3 className="text-xl font-bold text-white">Executive Director Attendance</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Managing Director Thabo Makola personally oversees strategic compliance and tactical site delivery, maintaining direct line communication with clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
