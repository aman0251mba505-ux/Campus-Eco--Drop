import React from 'react';
import {
  QrCode,
  Droplet,
  Sparkles,
  FileText,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  Ticket,
  ChevronRight,
  ExternalLink,
  Award,
} from 'lucide-react';
import { DropBoxLocation, DepositRecord, DigitalVoucher } from '../types';
import { AiWasteAdvisor } from './AiWasteAdvisor';

interface DepositDashboardViewProps {
  dropBoxes: DropBoxLocation[];
  recentDeposits: DepositRecord[];
  activeVouchers: DigitalVoucher[];
  ecoPoints: number;
  onOpenDeposit: (boxId?: string) => void;
  onOpenScanner: () => void;
  onOpenCertificate: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DepositDashboardView: React.FC<DepositDashboardViewProps> = ({
  dropBoxes,
  recentDeposits,
  activeVouchers,
  ecoPoints,
  onOpenDeposit,
  onOpenScanner,
  onOpenCertificate,
  onNavigateTab,
}) => {
  const totalScrapKg = dropBoxes.reduce((acc, b) => acc + b.totalCollectedKg, 0);

  return (
    <div className="space-y-8">
      {/* Hero Visual Banner Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>DBS Global University (DGU) • Campus Pilot</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Turn Empty Bottles Into Canteen Discounts
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Deposit clean PET bottles, beverage cans, and snack packaging at smart campus drop-boxes. Get instant digital vouchers for Nescafe, Central Canteen, and Doon Snacks while driving zero-waste campus sustainability.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={onOpenScanner}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Drop-Box & Deposit</span>
            </button>

            <button
              onClick={() => onNavigateTab('wallet')}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-emerald-600" />
              <span>My Vouchers ({activeVouchers.length})</span>
            </button>

            <button
              onClick={onOpenCertificate}
              className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>NAAC Certificate</span>
            </button>
          </div>

          {/* 3-Step Flow Micro Explainer */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-100 text-left">
            <div>
              <span className="text-xs font-bold text-slate-900 block">1. Scan QR</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">At campus drop-box</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">2. Drop Clean Items</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Bottles & soda cans</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">3. Instant Food Vouchers</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Deduct from bill</span>
            </div>
          </div>
        </div>

        {/* Hero Campus Photo Showcase */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-slate-200 min-h-[320px] bg-slate-900 shadow-sm flex flex-col justify-end">
          <img
            src="/src/assets/images/hero_campus_ecodrop_1793385450620.jpg"
            alt="Campus Eco-Drop at University"
            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 p-6 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent text-white space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              DBS Global University Pilot
            </span>
            <h3 className="text-lg font-bold text-white">
              Campus Eco-Drop Hub 01
            </h3>
            <p className="text-xs text-slate-300">
              Placed at high-footfall canteen quad to capture packaging before landfills.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Proof Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 block font-medium">Campus Scrap Diverted</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
              {totalScrapKg.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-slate-400">kg</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Zero landfill dump</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 block font-medium">Student Rewards Issued</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              ₹{(totalScrapKg * 15).toFixed(0)}
            </span>
            <span className="text-xs font-bold text-slate-400">INR</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Subsidized via scrap sales
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 block font-medium">Your Eco-Points</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
              {ecoPoints}
            </span>
            <span className="text-xs font-bold text-slate-400">pts</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {ecoPoints > 0 ? 'Active Eco Champion' : 'Ready for first deposit'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 block font-medium">Active Drop Stations</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {dropBoxes.length}
            </span>
            <span className="text-xs font-bold text-slate-400">boxes</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            All stations operational
          </span>
        </div>
      </div>

      {/* Main 2-Column Section: Campus Drop-Boxes & AI Advisor + Recent Deposits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Campus Drop-Boxes Snapshot */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Campus Drop Stations
                </h2>
                <p className="text-xs text-slate-500">
                  Select a location to deposit recyclables & get instant vouchers
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('dropboxes')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View Full Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {dropBoxes.map((box) => (
                <div
                  key={box.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {box.code}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {box.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500">{box.landmark}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-800">
                        {box.capacityPercent}% Full
                      </span>
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${box.capacityPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenDeposit(box.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm shrink-0"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Deposit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deposits Feed */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Campus Verified Deposits
                </h3>
                <p className="text-xs text-slate-500">
                  Live verification log from student community
                </p>
              </div>
              <span className="text-xs text-emerald-700 font-semibold">
                ● Live Updates
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {recentDeposits.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No deposits logged yet today. Scan a drop-box to make your first deposit!
                </div>
              ) : (
                recentDeposits.slice(0, 5).map((dep) => (
                  <div key={dep.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono text-xs font-bold">
                        +{dep.totalPoints}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {dep.studentName} deposited {dep.items.map((i) => `${i.quantity} ${i.name.split(' ')[0]}`).join(', ')}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {dep.dropBoxName} · {dep.timestamp}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold text-slate-600">
                      {dep.totalWeightKg} kg
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Waste Sorting Advisor + Quick Links */}
        <div className="lg:col-span-5 space-y-6">
          <AiWasteAdvisor />

          {/* Venture Plan Banner Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 border border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                DGU Venture Quest
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Explore Aman's Full Venture Plan
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Review the complete 12 Missions, Dehradun scrap unit economics simulator, and 30-day GTM roadmap.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('venture')}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore 12 Missions & Financials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
