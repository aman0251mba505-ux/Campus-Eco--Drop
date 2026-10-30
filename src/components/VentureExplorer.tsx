import React, { useState } from 'react';
import {
  FileText,
  Sliders,
  TrendingUp,
  Download,
  ExternalLink,
  Target,
  BarChart2,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  VENTURE_METADATA,
  VENTURE_MISSIONS,
  VENTURE_SCENARIOS,
  MARKET_SIZE_DATA,
  COMPETITOR_BATTLEFIELD,
  GTM_ROADMAP_WEEKS,
} from '../data/ventureData';

export const VentureExplorer: React.FC = () => {
  const [selectedMissionId, setSelectedMissionId] = useState(0);

  // Live Unit Economics Simulator State (Initialized to Base Scenario from PDF)
  const [activeScenario, setActiveScenario] = useState<'base' | 'conservative' | 'ambitious' | 'custom'>('base');
  const [customers, setCustomers] = useState(1500);
  const [purchasesPerCustomer, setPurchasesPerCustomer] = useState(4);
  const [sellingPrice, setSellingPrice] = useState(15);
  const [variableCost, setVariableCost] = useState(3);
  const [fixedCost, setFixedCost] = useState(12000);

  const applyPreset = (presetKey: 'base' | 'conservative' | 'ambitious') => {
    const s = VENTURE_SCENARIOS[presetKey];
    setActiveScenario(presetKey);
    setCustomers(s.customers);
    setPurchasesPerCustomer(s.purchasesPerCustomer);
    setSellingPrice(s.sellingPrice);
    setVariableCost(s.variableCost);
    setFixedCost(s.monthlyFixedCost);
  };

  // Calculations
  const totalMonthlyDeposits = customers * purchasesPerCustomer;
  const contributionPerSale = sellingPrice - variableCost;
  const monthlyRevenue = totalMonthlyDeposits * sellingPrice;
  const totalVariableCosts = totalMonthlyDeposits * variableCost;
  const totalCosts = totalVariableCosts + fixedCost;
  const operatingSurplus = monthlyRevenue - totalCosts;
  const annualSurplus = operatingSurplus * 12;

  const currentMission = VENTURE_MISSIONS.find((m) => m.id === selectedMissionId) || VENTURE_MISSIONS[0];

  return (
    <div className="space-y-8">
      {/* Top Banner: Venture Identity */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>DGU Venture Quest • Official Venture Plan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {VENTURE_METADATA.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span>Student: <strong className="text-white">{VENTURE_METADATA.studentName}</strong></span>
            <span>·</span>
            <span className="font-mono text-emerald-300">{VENTURE_METADATA.studentEmail}</span>
            <span>·</span>
            <span>{VENTURE_METADATA.university}</span>
          </div>
        </div>

        {/* View / Download Original PDF Button */}
        <a
          href={VENTURE_METADATA.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          <ExternalLink className="w-4 h-4 text-emerald-400" />
          <span>Open Full Venture PDF</span>
        </a>
      </div>

      {/* Interactive Unit Economics Live Simulator (Mission 7) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Mission 7: Revenue & Pricing Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Interactive Unit Economics Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust student adoption, recycling frequency, and scrap price per deposit to forecast monthly cash flows.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => applyPreset('conservative')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeScenario === 'conservative'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Conservative
            </button>
            <button
              onClick={() => applyPreset('base')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeScenario === 'base'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Base (Planned)
            </button>
            <button
              onClick={() => applyPreset('ambitious')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeScenario === 'ambitious'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ambitious
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Active Student Recyclers */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Active Students</span>
              <span className="font-mono font-bold text-slate-900">{customers.toLocaleString()} users</span>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={customers}
              onChange={(e) => {
                setCustomers(Number(e.target.value));
                setActiveScenario('custom');
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">DGU Campus Beachhead</span>
          </div>

          {/* Slider 2: Deposits Per Month */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Deposits / Student / Month</span>
              <span className="font-mono font-bold text-slate-900">{purchasesPerCustomer} deposits</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={purchasesPerCustomer}
              onChange={(e) => {
                setPurchasesPerCustomer(Number(e.target.value));
                setActiveScenario('custom');
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">Weekly drop rate</span>
          </div>

          {/* Slider 3: Selling Price (Value generated per deposit) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Average Scrap Value / Deposit</span>
              <span className="font-mono font-bold text-emerald-700">₹{sellingPrice}</span>
            </div>
            <input
              type="range"
              min={8}
              max={25}
              step={1}
              value={sellingPrice}
              onChange={(e) => {
                setSellingPrice(Number(e.target.value));
                setActiveScenario('custom');
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block">PET + Al cans resale mix</span>
          </div>
        </div>

        {/* Live Forecast Results Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Monthly Transactions
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              {totalMonthlyDeposits.toLocaleString()} drops
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Total campus volume
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Monthly Revenue
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              ₹{monthlyRevenue.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              B2B scrap + commissions
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Contribution Margin
            </span>
            <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
              ₹{contributionPerSale} / sale
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {((contributionPerSale / sellingPrice) * 100).toFixed(0)}% gross margin
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Operating Surplus (Profit)
            </span>
            <span
              className={`text-xl font-bold font-mono tabular-nums ${
                operatingSurplus >= 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              ₹{operatingSurplus.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              ₹{annualSurplus.toLocaleString()} annual run-rate
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 2x2 Competitor Battlefield (Mission 5) & Market Size (Mission 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 2x2 Competitor Battlefield Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Mission 5: Competitor Battlefield</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Positioning Grid: Incentive vs Convenience
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              X: Student Reward (1-10) · Y: Campus Convenience & Accessibility (1-10)
            </p>
          </div>

          {/* 2x2 Visual Quadrant Chart */}
          <div className="relative w-full aspect-square max-h-[340px] bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            {/* Axis Labels */}
            <div className="absolute top-2 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              ▲ High Convenience (On-Campus)
            </div>
            <div className="absolute bottom-2 right-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              High Incentive (Cash/Discounts) ▶
            </div>

            {/* Grid Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full border-l border-slate-200" />
            </div>

            {/* Competitor Nodes */}
            {COMPETITOR_BATTLEFIELD.map((comp) => {
              // Map score 1-10 to percentage 10%-90%
              const leftPercent = (comp.axisX / 10) * 80 + 10;
              const bottomPercent = (comp.axisY / 10) * 80 + 10;
              const isEcoDrop = comp.type === 'Positioning Target';

              return (
                <div
                  key={comp.name}
                  className="absolute transform -translate-x-1/2 translate-y-1/2 group"
                  style={{
                    left: `${leftPercent}%`,
                    bottom: `${bottomPercent}%`,
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-transform group-hover:scale-125 ${
                      isEcoDrop
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {isEcoDrop ? '★' : comp.name.charAt(0)}
                  </div>

                  {/* Tooltip Card */}
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 hidden group-hover:block w-48 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-20 pointer-events-none">
                    <p className="font-bold">{comp.name}</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">
                      Score: ({comp.axisX}, {comp.axisY})
                    </p>
                    <p className="text-slate-300 text-[10px] mt-1">{comp.strength}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            <strong>Target Position (9, 9):</strong> Campus Eco-Drop occupies the coveted Top-Right Quadrant by combining immediate canteen food discounts with inside-hostel drop-box placement.
          </div>
        </div>

        {/* Right: TAM / SAM / SOM Market Sizing (Mission 8) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <BarChart2 className="w-4 h-4" />
              <span>Mission 8: Market Sizing & Demand</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              TAM · SAM · SOM Validation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on AISHE higher education data & Dehradun student cluster benchmarks
            </p>
          </div>

          <div className="space-y-3.5">
            {/* TAM */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  TAM: Total Addressable Market
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {MARKET_SIZE_DATA.tam.value}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {MARKET_SIZE_DATA.tam.customers} across residential campuses in India
              </p>
            </div>

            {/* SAM */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  SAM: Serviceable Addressable Market
                </span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  {MARKET_SIZE_DATA.sam.value}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {MARKET_SIZE_DATA.sam.customers} across North India private university hubs
              </p>
            </div>

            {/* SOM */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">
                  SOM: Serviceable Obtainable Market (Year 1)
                </span>
                <span className="font-mono font-bold text-emerald-800 text-base">
                  {MARKET_SIZE_DATA.som.value}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700">
                {MARKET_SIZE_DATA.som.customers} at DBS Global University & Dehradun cluster
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Average monetary value generated per student annually: <strong className="text-slate-800">₹720 / student / year</strong> (4 monthly deposits × ₹15 value × 12 months).
          </div>
        </div>
      </div>

      {/* 30-Day Go-To-Market Roadmap (Mission 9) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Mission 9: Go-To-Market Execution</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            30-Day Pilot Experiment Roadmap
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            4-week structured campus launch at DBS Global University
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GTM_ROADMAP_WEEKS.map((w, idx) => (
            <div
              key={w.week}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                  {w.week}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{w.channel}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{w.action}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Owner:</span>
                  <span className="font-medium text-slate-700">{w.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target:</span>
                  <span className="font-semibold text-emerald-700">{w.target}</span>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-1">
                  Q: {w.learningQuestion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Missions 0-12 Navigator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Full Venture Plan Dossier</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Browse All 12 Venture Missions
            </h3>
          </div>
        </div>

        {/* Mission Tabs Horizontal Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {VENTURE_MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMissionId(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                selectedMissionId === m.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              M{m.id}: {m.title.split(':')[1] || m.title}
            </button>
          ))}
        </div>

        {/* Selected Mission Card */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                {currentMission.tag}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {currentMission.title}
              </h4>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {currentMission.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentMission.highlights.map((h, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {h.label}
                </span>
                <span className="text-xs text-slate-800 font-medium block mt-0.5">
                  {h.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
