import React from 'react';
import {
  MapPin,
  Clock,
  Sparkles,
  Droplet,
  FileText,
  AlertTriangle,
  CheckCircle2,
  QrCode,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { DropBoxLocation } from '../types';
import kioskImg from '../assets/images/smart_dropbox_kiosk_1793385451172.jpg';

interface DropBoxDirectoryProps {
  dropBoxes: DropBoxLocation[];
  onSelectBoxForDeposit: (boxId: string) => void;
}

export const DropBoxDirectory: React.FC<DropBoxDirectoryProps> = ({
  dropBoxes,
  onSelectBoxForDeposit,
}) => {
  const totalCampusScrapKg = dropBoxes.reduce(
    (sum, b) => sum + b.totalCollectedKg,
    0
  );

  return (
    <div className="space-y-8">
      {/* Overview & Physical Kiosk Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Campus Drop-Box Network • DGU Dehradun</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Smart Reverse-Vending Drop Stations
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equipped with quick QR authentication and dual-slot mechanical sorting for clean PET bottles and aluminum cans. Deployed at high-traffic student thoroughfares to eliminate mixed trash bin dumping.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">
                Active Stations
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {dropBoxes.length} Hubs
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">
                Total Campus Scrap
              </span>
              <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                {totalCampusScrapKg.toFixed(1)} kg
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">
                Recycler Pickup
              </span>
              <span className="text-xs font-bold text-slate-900 block mt-1">
                Dehradun Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              100% segregated recyclables sold directly to certified Dehradun re-processors to self-fund student canteen discounts.
            </span>
          </div>
        </div>

        {/* Visual Kiosk Preview with Generated High-Res Photo */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 min-h-[260px] bg-slate-900 shadow-sm flex flex-col justify-end">
          <img
            src={kioskImg}
            alt="Smart Campus Recycling Hub"
            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/images/smart_dropbox_kiosk_1793385451172.jpg';
            }}
          />
          <div className="relative z-10 p-5 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent text-white">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Physical Hardware Pilot
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Eco-Drop Model DGU-1
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Dual-slot anti-jam intake with student QR quick-scan sensor.
            </p>
          </div>
        </div>
      </div>

      {/* Drop-Boxes List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Campus Drop-Box Stations
            </h2>
            <p className="text-xs text-slate-500">
              Live capacity monitoring & accepted material categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dropBoxes.map((box) => {
            const isHigh = box.capacityPercent >= 80;
            return (
              <div
                key={box.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {box.code}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {box.campusZone}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5">
                        {box.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {box.landmark}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
                          isHigh
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isHigh ? (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        )}
                        <span>{box.capacityPercent}% Full</span>
                      </span>
                    </div>
                  </div>

                  {/* Fill Level Gauge */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Bin Fill Capacity</span>
                      <span className="font-mono font-semibold text-slate-800">
                        {box.capacityPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHigh
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${box.capacityPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Accepted Materials Badges */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Accepts:
                      </span>
                      {box.acceptedMaterials.includes('plastic') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-700">
                          <Droplet className="w-3 h-3 text-emerald-600" />
                          <span>PET Bottles</span>
                        </span>
                      )}
                      {box.acceptedMaterials.includes('aluminum') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-700">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Cans</span>
                        </span>
                      )}
                      {box.acceptedMaterials.includes('paper') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-700">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span>Packaging</span>
                        </span>
                      )}
                    </div>

                    <span className="font-mono text-xs font-semibold text-slate-700">
                      {box.totalCollectedKg} kg total
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Emptied {box.lastEmptied}</span>
                  </div>

                  <button
                    onClick={() => onSelectBoxForDeposit(box.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Drop Items Here</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
