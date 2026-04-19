export type NodeIconKey =
  | 'compute' | 'lidar' | 'mapping' | 'tier1' | 'eye' | 'oem' | 'service'
  | 'cloud' | 'bank' | 'hospital' | 'factory'
  | 'card' | 'scale' | 'truck' | 'users' | 'pill' | 'briefcase'
  | 'store' | 'network' | 'shield';

export type NodeCriticality = 'critical' | 'recommended' | 'optional';

export interface NodeDetail {
  iconKey?: NodeIconKey;
  location?: string;
  category: string;
  criticality: NodeCriticality;
  description: string;
  complianceAlignment: string[];
}

export interface ValueChainNode {
  name: string;
  sublabel?: string;
  detail?: NodeDetail;
}

export interface ValueChainLayer {
  label: string;
  nodes: ValueChainNode[];
  accent: string;
}

export interface GeoRegion {
  name: string;
  x: number;
  y: number;
  count: number;
}

export interface IndustryLandscape {
  valueChain: {
    title: string;
    subtitle: string;
    layers: ValueChainLayer[];
  };
  geoDensity: {
    title: string;
    subtitle: string;
    metricLabel: string;
    regions: GeoRegion[];
  };
}

const LAYER_COLORS = ['#4B286D', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export const INDUSTRY_LANDSCAPE: Record<string, IndustryLandscape> = {
  'ad-adas': {
    valueChain: {
      title: 'AV Supply Chain & Deployment Network',
      subtitle: 'Tier 2 suppliers → Tier 1 integrators → OEM customers → Service network',
      layers: [
        {
          label: 'Tier 2 Suppliers',
          accent: LAYER_COLORS[0],
          nodes: [
            {
              name: 'Luminar',
              sublabel: 'LiDAR',
              detail: {
                iconKey: 'lidar', location: 'Orlando, FL',
                category: 'LiDAR Sensor — Tier 2', criticality: 'critical',
                description: 'Automotive-grade 1550nm LiDAR already integrated on the Volvo EX90 platform. Established perception-stack partnerships lower integration risk for US deployment.',
                complianceAlignment: ['IATF 16949', 'ISO 26262 ASIL-B', 'FMVSS 111'],
              },
            },
            {
              name: 'NVIDIA Orin', sublabel: 'Compute',
              detail: {
                iconKey: 'compute', location: 'Santa Clara, CA',
                category: 'Compute Platform — Tier 2', criticality: 'critical',
                description: 'NVIDIA DRIVE Orin SoC is the industry-standard compute platform for Level 2+ ADAS. US-based design with CUDA toolchain and mature automotive QA process.',
                complianceAlignment: ['ISO 26262 ASIL-D', 'IATF 16949', 'SOC 2 Type II'],
              },
            },
            {
              name: 'HERE HD Maps', sublabel: 'Mapping',
              detail: {
                iconKey: 'mapping', location: 'Chicago, IL',
                category: 'HD Mapping — Tier 2', criticality: 'recommended',
                description: 'SENSORIS-compliant HD map coverage across all 50 US states with fleet-sourced real-time updates. Alternative to Google HD Maps with stronger automotive privacy posture.',
                complianceAlignment: ['ISO 27001', 'GDPR', 'CCPA'],
              },
            },
            {
              name: 'Qualcomm Ride', sublabel: 'SoC',
              detail: {
                iconKey: 'compute', location: 'San Diego, CA',
                category: 'SoC Platform — Tier 2', criticality: 'recommended',
                description: 'Snapdragon Ride offers an ARM-based alternative to NVIDIA Orin with tighter thermal envelope. Dominant in entry-level ADAS; strong in Hyundai/GM design wins.',
                complianceAlignment: ['ISO 26262 ASIL-B', 'IATF 16949', 'SOC 2'],
              },
            },
          ],
        },
        {
          label: 'Tier 1 Integrators',
          accent: LAYER_COLORS[1],
          nodes: [
            {
              name: 'Bosch',
              detail: {
                iconKey: 'tier1', location: 'Plymouth, MI',
                category: 'Integrator — Tier 1', criticality: 'critical',
                description: 'Largest automotive Tier 1 in North America. Handles ECU integration, ASIL-D functional safety verification, and OEM supply logistics — the default gateway to Ford & GM programs.',
                complianceAlignment: ['IATF 16949', 'ISO 26262 ASIL-D', 'Automotive SPICE L3'],
              },
            },
            {
              name: 'Aptiv',
              detail: {
                iconKey: 'tier1', location: 'Troy, MI',
                category: 'Integrator — Tier 1', criticality: 'recommended',
                description: 'Wind River + SmartVehicle architecture for software-defined vehicles. Strong in high-voltage wiring + electrical, common GM and Stellantis partner.',
                complianceAlignment: ['IATF 16949', 'ISO 26262', 'Automotive SPICE L2'],
              },
            },
            {
              name: 'Mobileye',
              detail: {
                iconKey: 'eye', location: 'San Jose, CA',
                category: 'ADAS System — Tier 1', criticality: 'critical',
                description: 'Direct perception-stack competitor AND dominant Tier 1 integrator. Essential benchmark for OEM RFPs — plan for co-existence in the short term, displacement in the long term.',
                complianceAlignment: ['ISO 26262', 'NHTSA NCAP', 'UNECE R157'],
              },
            },
            {
              name: 'Continental',
              detail: {
                iconKey: 'tier1', location: 'Auburn Hills, MI',
                category: 'Integrator — Tier 1', criticality: 'recommended',
                description: 'Legacy German Tier 1 expanding ADAS software portfolio via Elektrobit. Strong in domain controllers and brake-by-wire systems.',
                complianceAlignment: ['IATF 16949', 'ISO 26262', 'Automotive SPICE L3'],
              },
            },
          ],
        },
        {
          label: 'OEM Customers',
          accent: LAYER_COLORS[2],
          nodes: [
            {
              name: 'Ford',
              detail: {
                iconKey: 'oem', location: 'Dearborn, MI',
                category: 'OEM Customer', criticality: 'recommended',
                description: 'Ford BlueCruise hands-free program is actively sourcing additional AD software partners. Open RFP for Level 3 eyes-off highway — an immediate commercial opening.',
                complianceAlignment: ['FMVSS', 'NHTSA FMVSS 126', 'SOC 2'],
              },
            },
            {
              name: 'GM',
              detail: {
                iconKey: 'oem', location: 'Detroit, MI',
                category: 'OEM Customer', criticality: 'critical',
                description: 'Super Cruise (Level 2+) deployed across Cadillac/Chevrolet fleet. Recently sunset Cruise robotaxi — AV software resources now redirected to consumer ADAS, creating RFP opportunities.',
                complianceAlignment: ['FMVSS', 'NHTSA', 'CCPA'],
              },
            },
            {
              name: 'Stellantis',
              detail: {
                iconKey: 'oem', location: 'Auburn Hills, MI',
                category: 'OEM Customer', criticality: 'recommended',
                description: '14-brand portfolio (Jeep, Ram, Chrysler, etc.) with AutoDrive 1.0/2.0/3.0 staged roadmap. Opportunity in commercial-vehicle AD (Ram ProMaster).',
                complianceAlignment: ['FMVSS', 'NHTSA', 'GDPR'],
              },
            },
            {
              name: 'Volvo',
              detail: {
                iconKey: 'oem', location: 'Charleston, SC',
                category: 'OEM Customer — Strategic', criticality: 'critical',
                description: 'US assembly in Charleston, SC. Volvo\'s fully-electric strategy on the modular SPA2 platform has open slots for AD software partners. Natural Nordic beachhead for US expansion.',
                complianceAlignment: ['FMVSS', 'NHTSA', 'CCPA', 'SOC 2 Type II'],
              },
            },
          ],
        },
        {
          label: 'Service Network',
          accent: LAYER_COLORS[3],
          nodes: [
            {
              name: 'Dealer Networks',
              detail: {
                iconKey: 'service', location: 'Nationwide (US)',
                category: 'Service — Aftermarket', criticality: 'recommended',
                description: 'Ford 3,100+, GM 4,300+, Volvo 280+ authorized dealers. Technician certification programs required for OTA flashing, ADAS calibration, and recall execution.',
                complianceAlignment: ['OSHA', 'State DMV licensing', 'NHTSA 573'],
              },
            },
            {
              name: 'OTA Service',
              detail: {
                iconKey: 'service', location: 'Cloud-delivered',
                category: 'Aftermarket OTA Platform', criticality: 'recommended',
                description: 'Sibros, Excelfore, and Aurora Labs provide over-the-air update orchestration. Critical for managing CI/CD of safety-certified binaries at fleet scale.',
                complianceAlignment: ['ISO 21434 (Cybersecurity)', 'UNECE R155', 'ISO 26262'],
              },
            },
            {
              name: 'Recall Logistics',
              detail: {
                iconKey: 'truck', location: 'Nationwide (US)',
                category: 'Field Action & Recall', criticality: 'optional',
                description: 'Stericycle + recall specialists manage 573-compliant notification and dealer coordination for AD software fixes. Required within 60 days of NHTSA defect determination.',
                complianceAlignment: ['NHTSA 573', 'FMVSS', 'State AG notice rules'],
              },
            },
          ],
        },
      ],
    },
    geoDensity: {
      title: 'US Dealer & Service Network Density',
      subtitle: 'Concentration of Volvo + Ford + GM authorized dealers by state',
      metricLabel: 'Dealer count',
      regions: [
        { name: 'California', x: 80,  y: 170, count: 320 },
        { name: 'Texas',      x: 320, y: 240, count: 280 },
        { name: 'Florida',    x: 520, y: 270, count: 230 },
        { name: 'New York',   x: 560, y: 130, count: 210 },
        { name: 'Illinois',   x: 370, y: 160, count: 180 },
        { name: 'Ohio',       x: 440, y: 170, count: 170 },
        { name: 'Michigan',   x: 420, y: 120, count: 160 },
        { name: 'Georgia',    x: 470, y: 230, count: 140 },
      ],
    },
  },

  'fintech': {
    valueChain: {
      title: 'Fintech Rails, Partners & Distribution',
      subtitle: 'Core banking platforms → payment rails → sponsor banks → end users',
      layers: [
        {
          label: 'Core Banking',
          accent: LAYER_COLORS[0],
          nodes: [
            {
              name: 'FIS',
              detail: {
                iconKey: 'bank', location: 'Jacksonville, FL',
                category: 'Core Banking Platform', criticality: 'critical',
                description: 'Legacy core banking for ~50% of top-50 US banks. Entry point for ACH/Wire origination. Deep integration with regulated institutions.',
                complianceAlignment: ['SOC 1/2', 'PCI DSS', 'FFIEC', 'SOX'],
              },
            },
            {
              name: 'Fiserv',
              detail: {
                iconKey: 'bank', location: 'Brookfield, WI',
                category: 'Core Banking Platform', criticality: 'critical',
                description: 'Owns Clover POS + First Data. Only vendor offering full stack from card issuing to merchant acquiring. Dominant in community-bank tier.',
                complianceAlignment: ['PCI DSS', 'SOC 2', 'FFIEC CAT'],
              },
            },
            {
              name: 'Jack Henry',
              detail: {
                iconKey: 'bank', location: 'Monett, MO',
                category: 'Core Banking Platform', criticality: 'recommended',
                description: 'Serves ~1,200 community banks + 800 credit unions. Open-banking-friendly architecture, easier API access than FIS/Fiserv for fintech partners.',
                complianceAlignment: ['SOC 2', 'FFIEC', 'NACHA'],
              },
            },
          ],
        },
        {
          label: 'Payment Rails',
          accent: LAYER_COLORS[1],
          nodes: [
            {
              name: 'Visa',
              detail: {
                iconKey: 'card', location: 'Foster City, CA',
                category: 'Card Network', criticality: 'critical',
                description: 'Largest global card network. Interchange + Visa Direct push-payment rails. Required for consumer-facing fintech that touches card flows.',
                complianceAlignment: ['PCI DSS', 'SOC 2', 'EMVCo'],
              },
            },
            {
              name: 'Mastercard',
              detail: {
                iconKey: 'card', location: 'Purchase, NY',
                category: 'Card Network', criticality: 'critical',
                description: 'Second-largest card network. Leading in B2B (Mastercard Track), Send (push payments), and cross-border. Faster API velocity than Visa.',
                complianceAlignment: ['PCI DSS', 'SOC 2', 'EMVCo'],
              },
            },
            {
              name: 'ACH / Fedwire',
              detail: {
                iconKey: 'scale', location: 'Federal Reserve Banks',
                category: 'Payment Rails — Federal', criticality: 'critical',
                description: 'ACH (Automated Clearing House) for batch payments + Fedwire for real-time large-value transfers. Operated by the Fed and NACHA — required for bank-to-bank settlement.',
                complianceAlignment: ['NACHA Operating Rules', 'Reg E', 'Reg CC', 'OFAC'],
              },
            },
            {
              name: 'RTP',
              detail: {
                iconKey: 'network', location: 'The Clearing House, NY',
                category: 'Real-Time Payment Rails', criticality: 'recommended',
                description: 'Real-Time Payments network by The Clearing House. Instant settlement 24/7, competing with FedNow. Critical for modern fintech UX.',
                complianceAlignment: ['NACHA', 'Reg J', 'OFAC', 'SOC 2'],
              },
            },
          ],
        },
        {
          label: 'Sponsor Banks',
          accent: LAYER_COLORS[2],
          nodes: [
            {
              name: 'Cross River',
              detail: {
                iconKey: 'bank', location: 'Fort Lee, NJ',
                category: 'Sponsor Bank — BaaS', criticality: 'critical',
                description: 'Most popular sponsor bank for fintechs (Affirm, Stripe, Coinbase). NJ state-chartered. Post-2023 consent order tightened BSA/AML — diligence heavier than before.',
                complianceAlignment: ['FFIEC', 'BSA/AML', 'Reg E', 'NYDFS Part 500'],
              },
            },
            {
              name: 'Evolve',
              detail: {
                iconKey: 'bank', location: 'Memphis, TN',
                category: 'Sponsor Bank — BaaS', criticality: 'optional',
                description: 'Former BaaS leader (Mercury, Stripe). Synapse collapse in 2024 forced major customer attrition. Rebuilding under Fed consent order — approach with caution.',
                complianceAlignment: ['FFIEC', 'BSA/AML', 'Fed Consent Order (2024)'],
              },
            },
            {
              name: 'Column',
              detail: {
                iconKey: 'bank', location: 'San Francisco, CA',
                category: 'Sponsor Bank — BaaS', criticality: 'recommended',
                description: 'Nationally-chartered bank built by Plaid founders for fintech. API-first core, no legacy tech debt. Selective customer vetting — higher-quality but smaller customer book.',
                complianceAlignment: ['OCC', 'BSA/AML', 'Reg E', 'SOC 2'],
              },
            },
            {
              name: 'Lead Bank',
              detail: {
                iconKey: 'bank', location: 'Kansas City, MO',
                category: 'Sponsor Bank — BaaS', criticality: 'recommended',
                description: 'Jackie Reses-led rebuild of Lead Bank. Strict fintech underwriting, preferred by post-Synapse fintechs. Fast-growing but limited seat capacity.',
                complianceAlignment: ['FDIC', 'BSA/AML', 'FFIEC'],
              },
            },
          ],
        },
        {
          label: 'Merchants & Users',
          accent: LAYER_COLORS[3],
          nodes: [
            {
              name: 'SMB Merchants',
              detail: {
                iconKey: 'store', location: 'Nationwide',
                category: 'End Customer — SMB', criticality: 'recommended',
                description: '~33M US SMBs. Highly fragmented channel — usually reached via POS vendors (Toast, Square, Clover) rather than direct sales.',
                complianceAlignment: ['PCI DSS', 'CCPA (if applicable)', 'State consumer protection'],
              },
            },
            {
              name: 'Consumer Apps',
              detail: {
                iconKey: 'users', location: 'Direct-to-Consumer',
                category: 'End Customer — Consumer', criticality: 'recommended',
                description: 'Neobanks, investing apps, BNPL, crypto wallets. Highest litigation risk — plaintiffs bar actively filing CCPA/TCPA class actions.',
                complianceAlignment: ['CCPA', 'TCPA', 'Reg E', 'FDIC Part 328'],
              },
            },
            {
              name: 'Embedded Finance',
              detail: {
                iconKey: 'network', location: 'Platform-embedded',
                category: 'Distribution Channel', criticality: 'recommended',
                description: 'Non-financial platforms (Shopify, Uber, etc.) embedding financial products. Highest-growth channel, but compliance ownership is murky between platform + BaaS + program manager.',
                complianceAlignment: ['Tripartite agreements', 'Reg E', 'UDAAP'],
              },
            },
          ],
        },
      ],
    },
    geoDensity: {
      title: 'Licensed Sponsor Bank Density',
      subtitle: 'BaaS-friendly state charters supporting fintech programs',
      metricLabel: 'Chartered banks',
      regions: [
        { name: 'Delaware',      x: 555, y: 155, count: 85 },
        { name: 'New York',      x: 560, y: 130, count: 78 },
        { name: 'Utah',          x: 170, y: 180, count: 65 },
        { name: 'Nevada',        x: 95,  y: 160, count: 55 },
        { name: 'Wyoming',       x: 205, y: 145, count: 48 },
        { name: 'California',    x: 80,  y: 180, count: 42 },
        { name: 'South Dakota',  x: 290, y: 130, count: 35 },
      ],
    },
  },

  'healthcare': {
    valueChain: {
      title: 'Healthcare Payer–Provider Network',
      subtitle: 'Payers → providers → distribution → patients (with FDA/CMS oversight)',
      layers: [
        {
          label: 'Payers',
          accent: LAYER_COLORS[0],
          nodes: [
            {
              name: 'UnitedHealth',
              detail: {
                iconKey: 'shield', location: 'Minnetonka, MN',
                category: 'Payer — Insurance', criticality: 'critical',
                description: 'Largest US health insurer — 50M+ members across UHC. Sets HIT vendor standards via Optum subsidiary. Payer contract is de facto national distribution.',
                complianceAlignment: ['HIPAA', 'HITECH', 'SOC 2', 'HITRUST'],
              },
            },
            {
              name: 'Anthem',
              detail: {
                iconKey: 'shield', location: 'Indianapolis, IN',
                category: 'Payer — Blue Cross Blue Shield', criticality: 'critical',
                description: 'Licensee of Blue Cross Blue Shield in 14 states (now Elevance Health). ~47M members. Strong in employer-sponsored plans; tech stack modernization underway.',
                complianceAlignment: ['HIPAA', 'NIST 800-53', 'HITRUST'],
              },
            },
            {
              name: 'Aetna',
              detail: {
                iconKey: 'shield', location: 'Hartford, CT',
                category: 'Payer — Insurance (CVS Health)', criticality: 'critical',
                description: 'CVS Health subsidiary since 2018. 22M medical members + 75K pharmacies integration. Strong in Medicare Advantage — fastest-growing payer segment.',
                complianceAlignment: ['HIPAA', 'HITECH', 'SOC 2'],
              },
            },
            {
              name: 'CVS Health',
              detail: {
                iconKey: 'pill', location: 'Woonsocket, RI',
                category: 'Payer + PBM + Retail Pharmacy', criticality: 'critical',
                description: 'Vertically integrated: Aetna (payer) + Caremark (PBM) + 9,000 pharmacies + MinuteClinic. Unique distribution control across the full healthcare stack.',
                complianceAlignment: ['HIPAA', 'DEA Controlled Substances Act', 'State pharmacy boards'],
              },
            },
          ],
        },
        {
          label: 'Providers',
          accent: LAYER_COLORS[1],
          nodes: [
            {
              name: 'HCA Healthcare',
              detail: {
                iconKey: 'hospital', location: 'Nashville, TN',
                category: 'Provider — Hospital System', criticality: 'critical',
                description: 'Largest for-profit hospital system: 186 hospitals, 2,400 care sites across 20 states. Driver of clinical IT procurement — influential reference account.',
                complianceAlignment: ['HIPAA', 'CMS Conditions of Participation', 'Joint Commission'],
              },
            },
            {
              name: 'Ascension',
              detail: {
                iconKey: 'hospital', location: 'St. Louis, MO',
                category: 'Provider — Non-profit', criticality: 'recommended',
                description: 'Largest Catholic non-profit health system: 140 hospitals across 19 states. Post-2024 ransomware attack raised security posture bar — higher diligence required.',
                complianceAlignment: ['HIPAA', 'HITECH', 'NIST 800-171'],
              },
            },
            {
              name: 'Kaiser Permanente',
              detail: {
                iconKey: 'hospital', location: 'Oakland, CA',
                category: 'Provider + Payer (Integrated)', criticality: 'recommended',
                description: 'Vertically integrated system: 12.7M members + 39 hospitals. Closed EHR platform (Epic + KP HealthConnect) — integration paths limited but well-defined.',
                complianceAlignment: ['HIPAA', 'HITECH', 'CCPA', 'CMIA (California)'],
              },
            },
            {
              name: 'CommonSpirit',
              detail: {
                iconKey: 'hospital', location: 'Chicago, IL',
                category: 'Provider — Catholic Health System', criticality: 'recommended',
                description: 'Merger of Dignity Health + Catholic Health Initiatives. 140 hospitals + 1,000 care sites. Diverse geographic footprint — useful testbed for multi-state deployments.',
                complianceAlignment: ['HIPAA', 'CMS CoPs', 'ERD (Religious)'],
              },
            },
          ],
        },
        {
          label: 'PBM & Distribution',
          accent: LAYER_COLORS[2],
          nodes: [
            {
              name: 'Express Scripts',
              detail: {
                iconKey: 'pill', location: 'St. Louis, MO',
                category: 'PBM — Pharmacy Benefit Manager', criticality: 'critical',
                description: 'Largest PBM (Cigna/Evernorth). 100M members. Formulary + rebate negotiations. FTC + state AGs scrutinizing PBM market power — regulatory headwinds mounting.',
                complianceAlignment: ['HIPAA', 'DEA CSA', 'State insurance dept.'],
              },
            },
            {
              name: 'OptumRx',
              detail: {
                iconKey: 'pill', location: 'Irvine, CA',
                category: 'PBM — Pharmacy Benefit Manager', criticality: 'critical',
                description: 'UnitedHealth-owned PBM. 65M members. Vertically integrated with UHC payer + Optum provider network. IRA drug-pricing reform directly impacts margins.',
                complianceAlignment: ['HIPAA', 'IRA drug pricing', 'DEA CSA'],
              },
            },
            {
              name: 'Cardinal Health',
              detail: {
                iconKey: 'truck', location: 'Dublin, OH',
                category: 'Pharmaceutical Distributor', criticality: 'recommended',
                description: 'One of the "Big 3" drug distributors. 60,000+ pharmacy/hospital customers. Critical for pharma supply chain visibility — post-DSCSA compliance mandatory 2024+.',
                complianceAlignment: ['DSCSA (Drug Supply Chain)', 'DEA', 'FDA GDP'],
              },
            },
          ],
        },
        {
          label: 'Patients & Regulators',
          accent: LAYER_COLORS[3],
          nodes: [
            {
              name: 'Patients',
              detail: {
                iconKey: 'users', location: 'Nationwide',
                category: 'End Beneficiaries', criticality: 'recommended',
                description: '330M US population, 91% insured. Growing preference for digital-first care delivery. Patient consent + access rules (21st Century Cures Act) govern data use.',
                complianceAlignment: ['HIPAA', '21st Century Cures Act', 'ADA'],
              },
            },
            {
              name: 'FDA',
              detail: {
                iconKey: 'scale', location: 'Silver Spring, MD',
                category: 'Regulator — Drugs & Devices', criticality: 'critical',
                description: 'Food & Drug Administration. De novo / 510(k) / PMA pathways for medical devices. SaMD (Software-as-Medical-Device) framework applicable to clinical AI.',
                complianceAlignment: ['21 CFR 820 (QSR)', 'SaMD guidance', '21 CFR Part 11 (e-records)'],
              },
            },
            {
              name: 'CMS',
              detail: {
                iconKey: 'scale', location: 'Baltimore, MD',
                category: 'Regulator — Medicare/Medicaid', criticality: 'critical',
                description: 'Centers for Medicare & Medicaid Services. Reimbursement codes (CPT/HCPCS) + value-based care programs. Without CMS coverage, adoption stalls regardless of clinical efficacy.',
                complianceAlignment: ['Conditions of Participation', 'MACRA/QPP', 'Stark Law', 'Anti-Kickback'],
              },
            },
          ],
        },
      ],
    },
    geoDensity: {
      title: 'Hospital System Density',
      subtitle: 'Registered hospitals by state — largest care delivery footprints',
      metricLabel: 'Hospitals',
      regions: [
        { name: 'Texas',        x: 320, y: 240, count: 410 },
        { name: 'California',   x: 80,  y: 180, count: 340 },
        { name: 'Pennsylvania', x: 520, y: 140, count: 240 },
        { name: 'New York',     x: 560, y: 130, count: 220 },
        { name: 'Ohio',         x: 440, y: 170, count: 215 },
        { name: 'Florida',      x: 520, y: 270, count: 210 },
        { name: 'Illinois',     x: 370, y: 160, count: 195 },
      ],
    },
  },

  'saas': {
    valueChain: {
      title: 'SaaS Distribution & Partner Stack',
      subtitle: 'Cloud infra → integrators → marketplaces → enterprise customers',
      layers: [
        {
          label: 'Cloud Infra',
          accent: LAYER_COLORS[0],
          nodes: [
            {
              name: 'AWS',
              detail: {
                iconKey: 'cloud', location: 'Seattle, WA',
                category: 'Cloud Infrastructure — Hyperscaler', criticality: 'critical',
                description: 'Dominant US cloud (~32% market share). GovCloud regions (US-West, US-East) handle FedRAMP High + IL5/IL6 workloads. Marketplace is #1 software procurement channel.',
                complianceAlignment: ['SOC 2 Type II', 'FedRAMP High', 'ISO 27001', 'HIPAA eligible'],
              },
            },
            {
              name: 'Azure',
              detail: {
                iconKey: 'cloud', location: 'Redmond, WA',
                category: 'Cloud Infrastructure — Hyperscaler', criticality: 'critical',
                description: 'Strong in enterprise (Office 365 integration) + government. Azure Gov + IL4/IL5 certified. Preferred by regulated industries tied to Windows/AD ecosystems.',
                complianceAlignment: ['FedRAMP High', 'DoD IL5', 'ISO 27001', 'HIPAA BAA'],
              },
            },
            {
              name: 'GCP',
              detail: {
                iconKey: 'cloud', location: 'Mountain View, CA',
                category: 'Cloud Infrastructure — Hyperscaler', criticality: 'recommended',
                description: 'Leader in data analytics + ML (Vertex AI, BigQuery). Smallest hyperscaler US footprint but highest throughput networking. Strong appeal for AI-native SaaS.',
                complianceAlignment: ['FedRAMP High', 'SOC 2', 'HIPAA', 'ISO 27001'],
              },
            },
          ],
        },
        {
          label: 'Integrators',
          accent: LAYER_COLORS[1],
          nodes: [
            {
              name: 'Accenture',
              detail: {
                iconKey: 'briefcase', location: 'New York, NY',
                category: 'System Integrator — Global', criticality: 'recommended',
                description: 'Largest global SI. Federal + Fortune 500 gatekeeper. Partnership opens deals but dilutes margin 20-30%. Slow cycle (9-18 mo) but enterprise-scale ACV.',
                complianceAlignment: ['ISO 27001', 'SOC 2', 'FedRAMP authorized'],
              },
            },
            {
              name: 'Deloitte Digital',
              detail: {
                iconKey: 'briefcase', location: 'New York, NY',
                category: 'System Integrator — Big 4', criticality: 'recommended',
                description: 'Big 4 consulting digital arm. Strong in CRM (Salesforce), cloud transformation. Audit-vs-advisory conflicts-of-interest limit some banking deals.',
                complianceAlignment: ['ISO 27001', 'SOC 2 Type II', 'PCAOB'],
              },
            },
            {
              name: 'Slalom',
              detail: {
                iconKey: 'briefcase', location: 'Seattle, WA',
                category: 'System Integrator — Regional', criticality: 'optional',
                description: 'Mid-market SI with strong AWS + Salesforce practices. Faster turnaround than Big 4. Good for proof-of-concept before committing to Accenture/Deloitte.',
                complianceAlignment: ['SOC 2', 'ISO 27001'],
              },
            },
          ],
        },
        {
          label: 'Marketplaces',
          accent: LAYER_COLORS[2],
          nodes: [
            {
              name: 'Salesforce AppExchange',
              detail: {
                iconKey: 'store', location: 'San Francisco, CA',
                category: 'Marketplace — CRM', criticality: 'critical',
                description: 'Largest enterprise SaaS marketplace (~9,000 apps). Required channel for CRM-adjacent SaaS. 15% rev share + mandatory security review (Chimera, 3-6 months).',
                complianceAlignment: ['Security Review (Chimera)', 'SOC 2', 'GDPR'],
              },
            },
            {
              name: 'AWS Marketplace',
              detail: {
                iconKey: 'store', location: 'AWS-hosted',
                category: 'Marketplace — Cloud', criticality: 'critical',
                description: 'Procurement bypass for enterprise (uses existing AWS credits). Private Offers unlock negotiated deals. Fastest-growing B2B SaaS distribution channel.',
                complianceAlignment: ['AWS Security Best Practices', 'SOC 2'],
              },
            },
            {
              name: 'HubSpot',
              detail: {
                iconKey: 'store', location: 'Cambridge, MA',
                category: 'Marketplace — SMB CRM', criticality: 'recommended',
                description: 'SMB/mid-market CRM with growing app marketplace. Lower bar to entry than Salesforce, 20% rev share. Ideal for SMB-focused SaaS.',
                complianceAlignment: ['SOC 2', 'GDPR', 'CCPA'],
              },
            },
          ],
        },
        {
          label: 'Enterprise Customers',
          accent: LAYER_COLORS[3],
          nodes: [
            {
              name: 'Fortune 500',
              detail: {
                iconKey: 'briefcase', location: 'Nationwide',
                category: 'Enterprise — Top Tier', criticality: 'critical',
                description: 'Long sales cycles (9-24 mo), 7-figure ACV, procurement + InfoSec + legal reviews. Prerequisite: SOC 2 Type II + FedRAMP Ready at minimum.',
                complianceAlignment: ['SOC 2', 'ISO 27001', 'FedRAMP Ready', 'GDPR'],
              },
            },
            {
              name: 'Mid-Market',
              detail: {
                iconKey: 'briefcase', location: 'Nationwide',
                category: 'Enterprise — Mid-Market', criticality: 'recommended',
                description: 'Revenue $50M-$1B. Faster decisions (3-6 mo), 5-6 figure ACV. SOC 2 Type I sufficient at entry. Best initial US landing segment.',
                complianceAlignment: ['SOC 2 Type I/II', 'CCPA', 'GDPR'],
              },
            },
            {
              name: 'Verticals (Fin / Health)',
              detail: {
                iconKey: 'shield', location: 'Regulated Industries',
                category: 'Vertical-Specific Customers', criticality: 'recommended',
                description: 'Regulated vertical customers (banks, hospitals, govt). Premium pricing justified by compliance depth, but long certification timelines (HIPAA BAA + FedRAMP = 12-18 mo).',
                complianceAlignment: ['HIPAA BAA', 'FedRAMP', 'SOC 2 Type II', 'PCI DSS'],
              },
            },
          ],
        },
      ],
    },
    geoDensity: {
      title: 'US Cloud Region Density',
      subtitle: 'Hyperscaler availability zones by state — data residency anchors',
      metricLabel: 'Availability zones',
      regions: [
        { name: 'Virginia',   x: 525, y: 175, count: 12 },
        { name: 'California', x: 80,  y: 180, count: 10 },
        { name: 'Oregon',     x: 90,  y: 110, count: 8 },
        { name: 'Ohio',       x: 440, y: 170, count: 6 },
        { name: 'Texas',      x: 320, y: 240, count: 5 },
        { name: 'Georgia',    x: 470, y: 230, count: 4 },
        { name: 'Arizona',    x: 170, y: 220, count: 3 },
      ],
    },
  },

  'manufacturing': {
    valueChain: {
      title: 'Manufacturing Supply Chain & Logistics',
      subtitle: 'Raw materials → components → plants → logistics → distribution',
      layers: [
        {
          label: 'Raw Materials',
          accent: LAYER_COLORS[0],
          nodes: [
            {
              name: 'Steel',
              detail: {
                iconKey: 'factory', location: 'Rust Belt (OH / IN / PA)',
                category: 'Raw Material — Metals', criticality: 'critical',
                description: 'Nucor + Cleveland-Cliffs + US Steel dominate domestic supply. Section 232 tariffs continue (25% on imports). IRA battery programs require 40%+ US-sourced materials.',
                complianceAlignment: ['Section 232 tariffs', 'Buy American Act', 'IRA sourcing rules'],
              },
            },
            {
              name: 'Silicon',
              detail: {
                iconKey: 'factory', location: 'Arizona / Texas',
                category: 'Raw Material — Semiconductors', criticality: 'critical',
                description: 'CHIPS Act investment driving TSMC AZ + Samsung TX fabs. 2025+ US-made wafers coming online. Critical for auto-grade chip supply continuity.',
                complianceAlignment: ['CHIPS Act compliance', 'Export Controls (EAR)', 'IATF 16949'],
              },
            },
            {
              name: 'Chemicals',
              detail: {
                iconKey: 'factory', location: 'Gulf Coast (TX / LA)',
                category: 'Raw Material — Chemicals', criticality: 'recommended',
                description: 'Dow + DuPont + LyondellBasell. Houston Ship Channel concentrates 40% of US petrochemicals. REACH-equivalent substance restrictions applicable.',
                complianceAlignment: ['TSCA', 'EPA RMP', 'DHS CFATS', 'OSHA PSM'],
              },
            },
          ],
        },
        {
          label: 'Component Suppliers',
          accent: LAYER_COLORS[1],
          nodes: [
            {
              name: 'Foxconn',
              detail: {
                iconKey: 'factory', location: 'Mount Pleasant, WI',
                category: 'Electronics Contract Manufacturer', criticality: 'recommended',
                description: 'Taiwanese EMS giant. Wisconsin plant (partial) for auto-electronics + EV components. Apple + NVIDIA relationships cascade to subcontractor opportunities.',
                complianceAlignment: ['IATF 16949', 'ISO 14001', 'RBA Code of Conduct'],
              },
            },
            {
              name: 'Flex',
              detail: {
                iconKey: 'factory', location: 'Austin, TX',
                category: 'Electronics Contract Manufacturer', criticality: 'recommended',
                description: 'Diversified EMS (auto + medical + industrial). Nearshoring-friendly US + Mexico footprint. Flexible MOQ — suitable for ramp-up phase.',
                complianceAlignment: ['IATF 16949', 'ISO 13485', 'AS9100'],
              },
            },
            {
              name: 'Jabil',
              detail: {
                iconKey: 'factory', location: 'St. Petersburg, FL',
                category: 'Electronics Contract Manufacturer', criticality: 'recommended',
                description: 'Vertically integrated EMS + supply chain services. Strong in healthcare + automotive. Direct API visibility into manufacturing lines for quality analytics.',
                complianceAlignment: ['IATF 16949', 'ISO 13485', 'ISO 14001'],
              },
            },
          ],
        },
        {
          label: 'Manufacturing',
          accent: LAYER_COLORS[2],
          nodes: [
            {
              name: 'Assembly Plants',
              detail: {
                iconKey: 'factory', location: 'US Manufacturing Belt',
                category: 'Final Assembly', criticality: 'recommended',
                description: 'Final-stage assembly facilities. Union/non-union mix (UAW in Midwest, non-union in South). OSHA audits + CBA negotiations shape capacity planning.',
                complianceAlignment: ['OSHA', 'NLRA', 'EPA air quality'],
              },
            },
            {
              name: 'Sub-Assembly',
              detail: {
                iconKey: 'factory', location: 'OEM supplier parks',
                category: 'Sub-Assembly', criticality: 'optional',
                description: 'Tier 2 sub-assemblers located adjacent to OEM plants (just-in-sequence delivery). Typically non-union, tight JIT windows.',
                complianceAlignment: ['IATF 16949', 'OSHA'],
              },
            },
            {
              name: 'QA / Testing',
              detail: {
                iconKey: 'shield', location: 'On-site + Third-party labs',
                category: 'Quality Assurance', criticality: 'recommended',
                description: 'SGS, Bureau Veritas, TÜV for third-party product certification. On-site SPC + final inspection critical for IATF audits and NHTSA compliance.',
                complianceAlignment: ['ISO 17025 (lab)', 'IATF 16949', 'Nadcap (aerospace)'],
              },
            },
          ],
        },
        {
          label: 'Logistics',
          accent: LAYER_COLORS[3],
          nodes: [
            {
              name: 'LA / Long Beach',
              detail: {
                iconKey: 'truck', location: 'San Pedro Bay, CA',
                category: 'Port — Pacific Gateway', criticality: 'critical',
                description: 'Largest US port complex — 40% of Pacific container traffic. 2021-22 congestion drove shippers to diversify; costs 15-20% above East Coast alternatives.',
                complianceAlignment: ['C-TPAT', 'ISF / 10+2', 'EPA CAA (San Pedro Bay)'],
              },
            },
            {
              name: 'Houston',
              detail: {
                iconKey: 'truck', location: 'Houston, TX',
                category: 'Port — Gulf of Mexico', criticality: 'recommended',
                description: 'Largest US port by foreign tonnage. Dominant in petrochemicals + energy. Faster customs than West Coast for South America + Europe trade.',
                complianceAlignment: ['C-TPAT', 'ISF', 'TSA MTSA'],
              },
            },
            {
              name: 'Savannah',
              detail: {
                iconKey: 'truck', location: 'Savannah, GA',
                category: 'Port — South Atlantic', criticality: 'recommended',
                description: 'Fastest-growing US port (post-Panamax dredging 2024). Single-terminal + rail-ready — faster drayage than LA/LB. Preferred for Atlanta/SE distribution.',
                complianceAlignment: ['C-TPAT', 'ISF'],
              },
            },
            {
              name: 'NY / NJ',
              detail: {
                iconKey: 'truck', location: 'Newark / Elizabeth, NJ',
                category: 'Port — North Atlantic', criticality: 'recommended',
                description: 'East Coast flagship. Bayonne Bridge raising enabled post-Panamax vessels. Higher costs than Savannah but direct Northeast market access.',
                complianceAlignment: ['C-TPAT', 'ISF', 'NY-NJ Port Authority rules'],
              },
            },
          ],
        },
        {
          label: 'Distribution',
          accent: LAYER_COLORS[4],
          nodes: [
            {
              name: '3PL Networks',
              detail: {
                iconKey: 'truck', location: 'Nationwide',
                category: 'Third-Party Logistics', criticality: 'recommended',
                description: 'XPO, Schneider, J.B. Hunt, and hundreds of regional 3PLs. Drayage + warehouse + last-mile bundled. Driver shortage persists — capacity-constrained.',
                complianceAlignment: ['FMCSA', 'DOT Safety Rating', 'C-TPAT'],
              },
            },
            {
              name: 'Retail Channels',
              detail: {
                iconKey: 'store', location: 'Nationwide',
                category: 'End Distribution', criticality: 'optional',
                description: 'Walmart, Amazon, Target, Costco dominate. Slotting fees + chargebacks + compliance portals add 8-15% to COGS. EDI + SPS Commerce integration required.',
                complianceAlignment: ['EDI 856/810/940', 'GS1 barcoding', 'Walmart OTIF'],
              },
            },
          ],
        },
      ],
    },
    geoDensity: {
      title: 'US Port Throughput',
      subtitle: 'Container throughput (million TEU) — critical import/export nodes',
      metricLabel: 'TEU (millions)',
      regions: [
        { name: 'LA / Long Beach', x: 90,  y: 210, count: 180 },
        { name: 'NY / NJ',         x: 565, y: 135, count: 95 },
        { name: 'Savannah, GA',    x: 490, y: 240, count: 55 },
        { name: 'Houston, TX',     x: 340, y: 260, count: 40 },
        { name: 'Norfolk, VA',     x: 540, y: 180, count: 37 },
        { name: 'Seattle, WA',     x: 105, y: 95,  count: 33 },
      ],
    },
  },
};

export function getIndustryLandscape(industry: string): IndustryLandscape {
  return INDUSTRY_LANDSCAPE[industry] || INDUSTRY_LANDSCAPE['ad-adas'];
}
