import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Truck,
  Droplet,
  Sparkles,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { DropBoxLocation, DepositRecord } from '../types';
import { DEHRADUN_SCRAP_BENCHMARKS } from '../data/ventureData';

interface FacilitiesPortalProps {
  dropBoxes: DropBoxLocation[];
  depositRecords: DepositRecord[];
}

export const FacilitiesPortal: React.FC<FacilitiesPortalProps> = ({
  dropBoxes,
  depositRecords,
}) => {
  const [dispatchScheduled, setDispatchScheduled] = useState(false);

  // Compute total weights
  let totalPlasticKg = 240.5;
  let totalAluminumKg = 92.4;
  let totalPaperKg = 188.2;

  // Add recorded deposits to totals
  depositRecords.forEach((rec) => {
    rec.items.forEach((item) => {
      if (item.category === 'plastic') totalPlasticKg += item.weightKg;
      if (item.category === 'aluminum') totalAluminumKg += item.weightKg;
      if (item.category === 'paper') totalPaperKg += item.weightKg;
    });
  });

  const totalAggregatedKg = totalPlasticKg + totalAluminumKg + totalPaperKg;

  // Value calculation using Dehradun market rates
  const plasticValueInr = totalPlasticKg * 30; // avg ₹30/kg
  const aluminumValueInr = totalAluminumKg * 100; // avg ₹100/kg
  const paperValueInr = totalPaperKg * 12.5; // avg ₹12.5/kg
  const totalCommercialScrapValue =
    plasticValueInr + aluminumValueInr + paperValueInr;

  // Estimated municipal hauling fee saved (approx ₹8/kg municipal tipping fee)
  const municipalDisposalFeeSaved = totalAggregatedKg * 8;

  const handleSchedulePickup = () => {
    setDispatchScheduled(true);
    setTimeout(() => {
      setDispatchScheduled(false);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Facilities Overview Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>DGU Facilities & Sustainability Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Campus Scrap Aggregation & Resale Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real-time material recovery tracking, Dehradun scrap market valuations, and bulk B2B pickup logistics for DBS Global University.
          </p>
        </div>

        <button
          onClick={handleSchedulePickup}
          className="self-start md:self-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
        >
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>Schedule Recycler Dispatch</span>
        </button>
      </div>

      {dispatchScheduled && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">B2B Dispatch Confirmed:</span> Dehradun Green Aggregators truck scheduled for campus collection this Friday, 10:00 AM. Expected payout: ₹{totalCommercialScrapValue.toFixed(0)}.
          </div>
        </div>
      )}

      {/* Top Level Valuation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-medium">
            Total Aggregated Scrap
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {totalAggregatedKg.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-slate-500">kg collected</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block pt-1">
            Across 4 campus drop stations
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-medium">
            B2B Commercial Value
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
              ₹{totalCommercialScrapValue.toFixed(0)}
            </span>
            <span className="text-xs text-slate-400">INR</span>
          </div>
          <span className="text-[11px] text-slate-500 block pt-1">
            Benchmark Dehradun scrap rates
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-medium">
            Municipal Fee Saved
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              ₹{municipalDisposalFeeSaved.toFixed(0)}
            </span>
            <span className="text-xs text-slate-400">saved</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block pt-1">
            Zero landfill dumping surcharge
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-medium">
            Campus Segregation Ratio
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              94.6%
            </span>
            <span className="text-xs text-slate-400">clean</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block pt-1">
            NAAC Green Campus audit ready
          </span>
        </div>
      </div>

      {/* Material Breakdown & Dehradun Market Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PET Plastic */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                ₹30 / kg avg
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-3">
              PET Plastic Bottles
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Water, soft drink, and beverage bottles collected at hostel and canteen drop-boxes.
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Aggregated Weight:</span>
              <span className="font-mono font-bold text-slate-900">
                {totalPlasticKg.toFixed(1)} kg
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Gross Scrap Value:</span>
              <span className="font-mono font-bold text-emerald-700">
                ₹{plasticValueInr.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Recycler Channel:</span>
              <span className="text-slate-700 font-medium">
                Uttarakhand Flake Mills
              </span>
            </div>
          </div>
        </div>

        {/* Aluminum Cans */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                ₹100 / kg avg
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-3">
              Aluminum Beverage Cans
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cold soda and energy drink cans with highest market resale density.
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Aggregated Weight:</span>
              <span className="font-mono font-bold text-slate-900">
                {totalAluminumKg.toFixed(1)} kg
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Gross Scrap Value:</span>
              <span className="font-mono font-bold text-emerald-700">
                ₹{aluminumValueInr.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Recycler Channel:</span>
              <span className="text-slate-700 font-medium">
                Dehradun Metal Smelters
              </span>
            </div>
          </div>
        </div>

        {/* Paper & Packaging */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                ₹12.5 / kg avg
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-3">
              Paper & Cardboard Packaging
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Clean takeaway snack boxes, tea cups, notebook sheets, and courier cardboard.
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Aggregated Weight:</span>
              <span className="font-mono font-bold text-slate-900">
                {totalPaperKg.toFixed(1)} kg
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Gross Scrap Value:</span>
              <span className="font-mono font-bold text-emerald-700">
                ₹{paperValueInr.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Recycler Channel:</span>
              <span className="text-slate-700 font-medium">
                Saharanpur Pulp Mills
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dehradun Local Scrap Market Evidence Reference */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            Price Evidence Source & Commercial Feasibility (Mission 7 & 11)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Data benchmarked from local Dehradun scrap aggregators and commercial recycler quotes. The resale revenue generated from bulk scrap resale fully covers student discount vouchers (average ₹12 contribution per deposit sale) while generating an operating surplus for box hardware amortization and maintenance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEHRADUN_SCRAP_BENCHMARKS.map((b) => (
            <div key={b.material} className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block">{b.material}</span>
              <span className="font-mono font-bold text-emerald-700 text-sm block mt-0.5">
                {b.ratePerKg}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">{b.notes}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
