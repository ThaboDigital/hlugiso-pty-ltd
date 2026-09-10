import React, { useState } from 'react';
import { 
  Tent, 
  PartyPopper, 
  Snowflake, 
  Volume2, 
  BadgeCheck, 
  Sparkles, 
  HardHat, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Layers,
  MessageSquare
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem, COMPANY_DETAILS } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

interface ServicesPageProps {
  onSelectService: (serviceId: string) => void;
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenQuote,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: 'All Services (8)' },
    { id: 'events', label: 'Events & Infrastructure' },
    { id: 'facilities', label: 'Cleaning & Facilities' },
    { id: 'civil', label: 'Construction & Civil' },
    { id: 'logistics', label: 'Logistics & Supply' },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Tent': return <Tent className="w-5 h-5 text-[#064E3B]" />;
      case 'PartyPopper': return <PartyPopper className="w-5 h-5 text-[#064E3B]" />;
      case 'Snowflake': return <Snowflake className="w-5 h-5 text-[#064E3B]" />;
      case 'Volume2': return <Volume2 className="w-5 h-5 text-[#064E3B]" />;
      case 'BadgeCheck': return <BadgeCheck className="w-5 h-5 text-[#064E3B]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#064E3B]" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#064E3B]" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#064E3B]" />;
      default: return <Layers className="w-5 h-5 text-[#064E3B]" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'events') {
      return ['funeral-infrastructure', 'events-infrastructure', 'sound-equipment'].includes(service.id);
    }
    if (activeFilter === 'facilities') {
      return ['cleaning-maintenance'].includes(service.id);
    }
    if (activeFilter === 'civil') {
      return ['construction-civil'].includes(service.id);
    }
    if (activeFilter === 'logistics') {
      return ['mobile-cold-chain', 'livestock-supply', 'supply-support'].includes(service.id);
    }
    return true;
  });

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Operational Scope & Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Multi-Service Capability
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Explore our 8 specialized service divisions. Each service is supported by trained personnel, quality equipment, and strict OHS safety protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip onNavigateCredentials={() => onNavigate('credentials')} />

      {/* Services List Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200 pb-4">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === cat.id
                    ? 'bg-[#064E3B] text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="space-y-12">
            {filteredServices.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className="bg-gray-50/50 rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-teal-700/50 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Service Visual */}
                  <div className={`lg:col-span-4 relative rounded-xl overflow-hidden h-56 lg:h-full min-h-[220px] ${service.imageUrl.endsWith('.png') ? 'bg-white p-4 border border-gray-200 flex items-center justify-center' : 'bg-gray-900'} group`}>
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className={`w-full h-full ${service.imageUrl.endsWith('.png') ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`} 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.imageUrl.endsWith('.png') ? 'from-black/80 via-black/20 to-transparent pointer-events-none' : 'from-black/80 via-black/20 to-transparent pointer-events-none'}`} />
                    <div className="absolute top-3 left-3 bg-white/95 p-2 rounded-lg text-[#064E3B] shadow">
                      {getIcon(service.iconName)}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                        Pillar #{service.number}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight">HLUGISO {service.title}</h4>
                    </div>
                  </div>

                  {/* Service Text & Capabilities */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                        {service.title}
                      </h3>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        Established Service
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Key capabilities list */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                        Demonstrated Capabilities:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                        {service.capabilities.slice(0, 4).map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-[#064E3B] mr-2 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suitable Clients */}
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Suitable For:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.suitableClients.map((client, clIdx) => (
                          <span 
                            key={clIdx}
                            className="text-xs bg-white text-gray-700 border border-gray-200 px-2.5 py-0.5 rounded-md"
                          >
                            {client}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-gray-200/80 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onSelectService(service.id)}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      >
                        <span>Inspect Full Service Scope</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </button>

                      <button
                        onClick={() => onOpenQuote(service.title)}
                        className="inline-flex items-center px-5 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-1.5" />
                        Request Quote
                      </button>

                      <a
                        href={`${COMPANY_DETAILS.whatsappUrl}%20regarding%20${encodeURIComponent(service.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-emerald-800 hover:text-emerald-950 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-600" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deep Dive Callout for Cleaning */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-[#064E3B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Specialized Division
              </span>
              <h3 className="text-2xl font-bold">Dedicated Cleaning & Facility Services</h3>
              <p className="text-sm text-gray-200 max-w-xl">
                Serving corporate office spaces, municipal centres, and commercial properties with daily maintenance, deep extraction, and executive janitorial standards.
              </p>
            </div>

            <button
              onClick={() => onNavigate('cleaning')}
              className="px-6 py-3 rounded-lg text-sm font-bold text-gray-900 bg-white hover:bg-gray-100 transition-colors shrink-0 shadow"
            >
              Explore Facility Cleaning &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
