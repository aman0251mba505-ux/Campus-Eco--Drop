/**
 * DGU Venture Quest - Complete Venture Plan Data
 * Origin: aman.0251mba505_dgu.ac.in_645b5c0a.pdf
 * DBS Global University, Dehradun
 */

export interface VentureMission {
  missionNumber: number;
  title: string;
  subtitle: string;
  details: Record<string, any>;
}

export const VENTURE_METADATA = {
  name: 'Campus Eco-Drop',
  studentName: 'Aman',
  studentEmail: 'aman.0251mba505@dgu.ac.in',
  university: 'DBS Global University (DGU), Dehradun',
  course: 'Entrepreneurship & Innovation • MBA',
  generatedDate: '10/1/2026',
  pdfPath: '/assets/aistudio/aman.0251mba505_dgu.ac.in_645b5c0a.pdf',
  tagline: 'Smart Campus Recycling & Micro-Rewards Platform',
};

export const DEHRADUN_SCRAP_BENCHMARKS = [
  {
    material: 'PET Plastic Bottles',
    ratePerKg: '₹25 – 35 / kg',
    avgRate: 30,
    unit: 'Bottles (~40 bottles/kg)',
    notes: 'High demand from Uttarakhand textile & flake recycling mills',
  },
  {
    material: 'Aluminum Cans',
    ratePerKg: '₹90 – 110 / kg',
    avgRate: 100,
    unit: 'Cans (~65 cans/kg)',
    notes: 'Premium scrap value with infinite recyclability in Dehradun smelting hubs',
  },
  {
    material: 'Paper & Cardboard Scrap',
    ratePerKg: '₹10 – 15 / kg',
    avgRate: 12.5,
    unit: 'Packaging (~20 packs/kg)',
    notes: 'Aggregated for local paper pulp recycling in Saharanpur/Roorkee cluster',
  },
];

export const VENTURE_SCENARIOS = {
  base: {
    name: 'Base Scenario (Planned Pilot)',
    customers: 1500,
    purchasesPerCustomer: 4,
    sellingPrice: 15,
    variableCost: 3,
    monthlyFixedCost: 12000,
    contributionPerSale: 12,
    monthlyRevenue: 90000,
    operatingSurplus: 60000,
    notes: 'Steady campus participation across hostels and canteens with optimized weekly scrap aggregation and regular canteen partner deals.',
  },
  conservative: {
    name: 'Conservative Scenario',
    customers: 800,
    purchasesPerCustomer: 3,
    sellingPrice: 12,
    variableCost: 3,
    monthlyFixedCost: 10000,
    contributionPerSale: 9,
    monthlyRevenue: 28800,
    operatingSurplus: 18800,
    notes: 'Low initial adoption rate, basic scrap pricing, and minimal vendor discount commissions during semester launch.',
  },
  ambitious: {
    name: 'Ambitious Scenario (Multi-Campus)',
    customers: 2500,
    purchasesPerCustomer: 5,
    sellingPrice: 10,
    variableCost: 3,
    monthlyFixedCost: 15000,
    contributionPerSale: 7,
    monthlyRevenue: 125000,
    operatingSurplus: 72500,
    notes: 'Expansion across neighboring university campuses, premium corporate scrap buyer contracts, and sponsored brand vouchers.',
  },
};

export const MARKET_SIZE_DATA = {
  tam: {
    value: '₹2,46,05,00,000',
    numeric: 2460500000,
    customers: '35,00,000 students',
    description: 'Total population of university students enrolled in residential and semi-residential higher education institutions across India (AISHE data).',
  },
  sam: {
    value: '₹5,62,40,000',
    numeric: 56240000,
    customers: '80,000 students',
    description: 'Total student population across private and deemed university campuses in North India (Dehradun, NCR, Punjab) with active hostel facilities.',
  },
  som: {
    value: '₹24,60,500',
    numeric: 2460500,
    customers: '3,500 students',
    description: 'Targeted initial student base across premier target campuses (DBS Global University and immediately adjacent Dehradun university campuses) in Year 1.',
  },
};

export const COMPETITOR_BATTLEFIELD = [
  {
    name: 'Standard Campus Dustbins & Municipal Services',
    type: 'Do Nothing',
    axisX: 2, // Reward & Financial Incentive (1-10)
    axisY: 1, // Campus Convenience (1-10)
    offer: 'Traditional garbage bins for unsegregated trash disposal',
    strength: 'Highly convenient, placed everywhere across campus, requires zero effort',
    weakness: 'No segregation, zero rewards/discounts for students, all waste goes to landfills',
  },
  {
    name: 'Local Scrap Dealers (Kabadiwala)',
    type: 'Substitute',
    axisX: 8,
    axisY: 3,
    offer: 'Cash in exchange for bulk scrap paper, cardboard, and metal',
    strength: 'Gives direct cash payout for scrap',
    weakness: 'Inconvenient for individual students, requires hoarding high bulk weight, no presence inside campus hostels',
  },
  {
    name: 'Digital Eco-Apps & Green Student Clubs',
    type: 'Indirect Competitor',
    axisX: 3,
    axisY: 6,
    offer: 'Awareness campaigns, voluntary cleanup drives, and eco-tracking apps',
    strength: 'High social proof and strong community/environmental messaging',
    weakness: 'Relies purely on volunteer effort with no recurring monetary or food discount incentives',
  },
  {
    name: 'Campus Eco-Drop (Our Venture)',
    type: 'Positioning Target',
    axisX: 9,
    axisY: 9,
    offer: 'Smart drop-box network with instant digital canteen micro-rewards and B2B scrap monetization',
    strength: 'High financial incentive + direct inside-campus convenience, closed-loop sustainability',
    weakness: 'Requires maintaining physical drop-box hardware & initial vendor trust',
  },
];

export const GTM_ROADMAP_WEEKS = [
  {
    week: 'Week 1',
    channel: 'On-Ground Drop-Box Signage',
    action: 'Install 3 branded Eco-Drop boxes and QR banners across main campus canteen and hostel entrances.',
    owner: 'Operations Lead',
    metric: 'Number of initial QR code scans',
    target: '500 impressions / scans',
    learningQuestion: 'Do students notice and scan the QR code at the drop-box during lunch/dinner hours?',
  },
  {
    week: 'Week 2',
    channel: 'Student WhatsApp & Campus Community Groups',
    action: 'Broadcast promotional poster and video demo across campus student WhatsApp/Telegram groups.',
    owner: 'Marketing Lead',
    metric: 'App downloads / user account registrations',
    target: '800 student views',
    learningQuestion: 'Which message drives higher registration: environmental impact or canteen food savings?',
  },
  {
    week: 'Week 3',
    channel: 'On-Ground Canteen Activation',
    action: 'Launch "Green Canteen Days" promotion offering double discount points for bottle deposits during lunch hours.',
    owner: 'Campus Ambassador / Student Lead',
    metric: 'Number of successful recyclable deposits made',
    target: '300 active deposits',
    learningQuestion: 'Does doubling reward points significantly increase repeat deposits among hostel residents?',
  },
  {
    week: 'Week 4',
    channel: 'Student Club Partnership Events',
    action: 'Partner with NSS / Social Welfare Club for a campus-wide hostel recycling drive with leaderboard rewards.',
    owner: 'Project Lead',
    metric: 'Repeat deposit rate and total scrap weight collected (kg)',
    target: '500 active users',
    learningQuestion: 'Can student club competition drive sustained weekly usage without continuous promo spending?',
  },
];

export const VENTURE_MISSIONS = [
  {
    id: 0,
    title: 'Mission 0: Your Venture',
    tag: 'Core Concept',
    summary: 'A tech-enabled campus recycling and sustainability platform that turns segregated recyclable waste into instant canteen discounts for students at DBS Global University.',
    highlights: [
      { label: 'Initial Customer', text: 'Eco-conscious college students, campus food stalls/canteens, university facilities' },
      { label: 'Geography', text: 'Dehradun & North India Tier-2 Education Hubs (starting with DBS Global University)' },
      { label: 'Why Chosen', text: 'Monetizes segregated bulk scrap directly with local recyclers, funding student discounts with zero net cost to university' },
      { label: 'Problem Solved', text: 'Massive unsegregated daily waste ending in landfills + students lack financial incentive to recycle' },
    ],
  },
  {
    id: 1,
    title: 'Mission 1: Customer Friction',
    tag: 'Problem Validation',
    summary: 'Students and campus food vendors throw away massive amounts of recyclable plastic bottles and cans into single dumpsters because there is no direct incentive or convenient system.',
    highlights: [
      { label: 'Primary Friction Id', text: 'f-1: No tangible reward, unhygienic sorting, contaminated recyclables' },
      { label: 'Who Experiences', text: 'Hostel-residing students, campus canteen operators, and university facility staff' },
      { label: 'When Occurs', text: 'Daily after lunch/dinner hours and late-night hostel study sessions' },
      { label: 'Current Workaround', text: 'Throwing everything into general dustbins or informal manual sorting' },
    ],
  },
  {
    id: 2,
    title: 'Mission 2: Jobs To Be Done',
    tag: 'JTBD Framework',
    summary: 'Dispose of everyday recyclable waste conveniently on campus while earning tangible rewards and peer recognition.',
    highlights: [
      { label: 'Functional Job', text: 'Dispose of plastic bottles, aluminum cans, cardboard easily while earning savings' },
      { label: 'Emotional Job', text: 'Feel good about making an effortless, positive contribution to campus sustainability' },
      { label: 'Social Job', text: 'Be recognized among peers and campus clubs as an environmentally responsible student' },
      { label: 'Primary Desired Outcome', text: 'Instant reward points redeemable for discounts on canteen food, coffee, or stationery' },
    ],
  },
  {
    id: 3,
    title: 'Mission 3: Customer & Beachhead',
    tag: 'Target Market',
    summary: 'Hostel-residing undergraduate and postgraduate students at DBS Global University who frequently purchase bottled drinks and packaged snacks from campus canteens.',
    highlights: [
      { label: 'Target Demographics', text: 'Ages 18–24, spending 6+ hours daily on campus' },
      { label: 'Buying Behavior', text: 'High smartphone usage, frequent low-value canteen orders, highly responsive to micro-discounts' },
      { label: 'Willingness to Pay', text: 'Zero direct cost for students; Canteens co-fund via promotions to drive footfall' },
      { label: 'Reach Strategy', text: 'QR-code signage at canteen tables, hostel exit doors, WhatsApp groups, NSS student club tie-ups' },
    ],
  },
  {
    id: 4,
    title: 'Mission 4: Value Proposition',
    tag: 'CVP Statement',
    summary: 'Turns everyday campus waste disposal into immediate financial savings for students while enabling the university to achieve zero-waste green campus targets.',
    highlights: [
      { label: 'Core CVP', text: 'For students who want to save on canteen food and help the environment, Campus Eco-Drop turns packaging into instant discounts' },
      { label: 'Desired Gain', text: 'A quick, seamless way to recycle packaging on campus and get instant canteen food cash-back' },
      { label: 'Why Choose Over Doing Nothing', text: 'Doing nothing literally throws away money for students and costs the university high disposal fees' },
      { label: 'Reason To Believe', text: 'Bulk recyclable scrap has guaranteed market resale value through Dehradun scrap processors' },
    ],
  },
  {
    id: 5,
    title: 'Mission 5: Competitor Battlefield',
    tag: 'Competitive Edge',
    summary: 'Standard dustbins offer high convenience but zero incentive (Score 2, 1). Local kabadiwalas offer cash but low campus convenience (Score 8, 3). Eco-Drop dominates the top-right quadrant (Score 9, 9).',
    highlights: [
      { label: 'Axis X', text: 'Student Reward & Financial Incentive (1 = None, 10 = High Micro-Rewards)' },
      { label: 'Axis Y', text: 'Campus Convenience & Accessibility (1 = Hard/Off-Campus, 10 = On-Campus Drops)' },
      { label: 'Dominant Position', text: 'Top-Right Quadrant: The premier campus eco-rewards platform (Score 9/10, 9/10)' },
    ],
  },
  {
    id: 6,
    title: 'Mission 6: Positioning Statement',
    tag: 'Brand Strategy',
    summary: 'For university students and canteen visitors who want a quick, rewarding way to dispose of recyclable waste, Campus Eco-Drop provides instant canteen discounts for every item deposited.',
    highlights: [
      { label: 'Category', text: 'Smart campus recycling and micro-rewards platform' },
      { label: 'Main Differentiation', text: 'Immediate micro-rewards and instant digital discount vouchers for every single deposit directly inside campus' },
      { label: 'Monetization Engine', text: 'Monetizes bulk recyclable scrap streams directly through local recycling processors' },
    ],
  },
  {
    id: 7,
    title: 'Mission 7: Revenue & Pricing',
    tag: 'Unit Economics',
    summary: 'Dual revenue stream: B2B bulk scrap resale to local recyclers + small commission/listing fees from campus food vendors for driven footfall.',
    highlights: [
      { label: 'Selling Price per Deposit', text: '₹15 average value' },
      { label: 'Variable Cost per Deposit', text: '₹3' },
      { label: 'Contribution Margin', text: '₹12 (80% margin)' },
      { label: 'Base Monthly Revenue', text: '₹90,000 (1,500 students × 4 deposits × ₹15)' },
      { label: 'Operating Surplus', text: '₹60,000 / month after ₹12,000 fixed overhead' },
    ],
  },
  {
    id: 8,
    title: 'Mission 8: Market Size & Demand',
    tag: 'TAM / SAM / SOM',
    summary: 'Calculated market sizing across India, North India private university clusters, and the initial DBS Global University beachhead.',
    highlights: [
      { label: 'TAM (India Higher Ed)', text: '₹2,46,05,00,000 (35 Lakh students across residential institutions)' },
      { label: 'SAM (North India Hubs)', text: '₹5,62,40,000 (80,000 students in Dehradun, NCR, Punjab)' },
      { label: 'SOM (Year 1 Beachhead)', text: '₹24,60,500 (3,500 students at DGU & neighboring campuses)' },
      { label: 'Annual Value Generated', text: '₹720 / student / year (₹15 × 4 deposits × 12 months)' },
    ],
  },
  {
    id: 9,
    title: 'Mission 9: Go-To-Market',
    tag: 'Customer Acquisition',
    summary: 'Multi-touch on-ground activation at campus food courts, hostel mess gates, WhatsApp groups, and NSS social welfare drives.',
    highlights: [
      { label: 'Primary Channel', text: 'On-Ground QR Banner & Drop-Box Signage (placed right at point-of-disposal)' },
      { label: 'Initial Budget', text: '₹2,500 for signage, stickers, and launch flyers' },
      { label: 'Expected Conversion', text: '1,200 leads -> 600 active student recyclers' },
      { label: 'Core Message', text: 'Turn your empty drink bottles and paper packaging into instant canteen food discounts and cash-back rewards!' },
    ],
  },
  {
    id: 10,
    title: 'Mission 10: MVP Scope',
    tag: 'Product Specification',
    summary: 'Smart QR Code Drop-Box & Mobile Verification Web-App. Eliminates app store download friction, tracking deposits and issuing instant discount vouchers.',
    highlights: [
      { label: 'Core MVP Feature', text: 'Smart QR Code Drop-Box & Mobile Verification Web-App' },
      { label: 'Success Metric', text: '300+ registered active students & 60% repeat deposit rate in first 30 days' },
      { label: 'Excluded Features', text: 'Expensive AI optical sorters, cash payouts, complex hardware load cells' },
      { label: 'Purpose', text: 'Validate user adoption, repeat deposit behavior, and scrap collection feasibility' },
    ],
  },
  {
    id: 11,
    title: 'Mission 11: Evidence Review',
    tag: 'Critical Assumptions',
    summary: 'De-risking the top three venture assumptions through structured campus pilot experiments.',
    highlights: [
      { label: 'Assumption 1 (Convenience)', text: 'Students will walk to drop-boxes rather than using nearest trash bin (Test: 3 boxes, 14 days, 300 deposits)' },
      { label: 'Assumption 2 (Canteen Buy-in)', text: 'Campus canteens will accept vouchers for footfall (Test: Signed agreements with 3+ vendors for 5-10% off)' },
      { label: 'Assumption 3 (Scrap Monetization)', text: 'Local scrap aggregators will buy PET/cans at commercial rates (Test: 50kg batch quote in Dehradun)' },
    ],
  },
  {
    id: 12,
    title: 'Mission 12: Pilot Execution Plan',
    tag: 'Next Steps',
    summary: '14-day physical pilot at DBS Global University to deploy 3 drop-boxes, onboard 3 canteen vendors, partner with NSS Club, and establish bulk recycler contract.',
    highlights: [
      { label: 'Hardware Rollout', text: '3 prototype drop-boxes at Canteen Plaza, Hostel Block B, and Central Lawn' },
      { label: 'Vendor Onboarding', text: 'Nescafe Hub, Campus Central Canteen, and Student Stationery' },
      { label: 'Student Outreach', text: 'Hostel recycling competition organized with NSS unit and Social Welfare Club' },
      { label: 'Commercial Contract', text: 'Formal bulk scrap buyer agreement with Dehradun industrial aggregator' },
    ],
  },
];
