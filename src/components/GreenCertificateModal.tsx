import React from 'react';
import { X, Award, Printer, ShieldCheck, CheckCircle2, Leaf, Calendar } from 'lucide-react';
import { AuthUser } from '../context/AuthContext';

interface GreenCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
  totalKgRecycled: number;
}

export const GreenCertificateModal: React.FC<GreenCertificateModalProps> = ({
  isOpen,
  onClose,
  user,
  totalKgRecycled,
}) => {
  if (!isOpen) return null;

  const studentName = user?.displayName || 'DGU Student';
  const studentEmail = user?.email || 'aman.0251mba505@dgu.ac.in';
  const hostel = user?.hostel || 'Shivalik Boys Hostel';
  const points = user?.ecoPoints || 0;
  const kg = totalKgRecycled > 0 ? totalKgRecycled : (user?.totalWeightKg || 0);
  const co2Kg = Number((kg * 2.1).toFixed(2));
  const certificateId = `DGU-NAAC-7-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Official NAAC Green Campus Sustainability Certificate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 relative border-8 border-double border-emerald-800/20 m-4 rounded-xl">
          {/* Subtle Watermark Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Leaf className="w-96 h-96 text-emerald-800" />
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              <Leaf className="w-4 h-4" />
              <span>DBS Global University (DGU), Dehradun</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900 font-serif">
              Certificate of Green Excellence
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              National Assessment and Accreditation Council (NAAC) · Criterion 7 Campus Green Audit
            </p>
          </div>

          <div className="my-6 border-b border-slate-200" />

          {/* Body Content */}
          <div className="space-y-4 text-center relative z-10">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              This is officially awarded to
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 font-serif underline decoration-emerald-300 decoration-2 underline-offset-8">
              {studentName}
            </h2>
            <p className="text-xs font-mono text-slate-600">
              Student ID / Email: <strong>{studentEmail}</strong> · {hostel}
            </p>

            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
              For active leadership in zero-waste campus sustainability, clean waste segregation at smart drop-boxes, and driving circular economy recycling at DBS Global University.
            </p>
          </div>

          {/* Verified Metrics Badge Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 my-6 relative z-10 text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">
                Diverted Scrap
              </span>
              <span className="text-lg font-bold font-mono text-emerald-800 tabular-nums">
                {kg.toFixed(2)} kg
              </span>
              <span className="text-[9px] text-slate-400 block">From City Landfill</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">
                Carbon Offset
              </span>
              <span className="text-lg font-bold font-mono text-emerald-800 tabular-nums">
                {co2Kg} kg
              </span>
              <span className="text-[9px] text-slate-400 block">CO₂ Equivalent</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">
                Reward Points
              </span>
              <span className="text-lg font-bold font-mono text-emerald-800 tabular-nums">
                {points} pts
              </span>
              <span className="text-[9px] text-slate-400 block">DGU Eco-Credits</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-left text-xs relative z-10">
            <div>
              <div className="w-32 border-b border-slate-400 pb-1 font-serif text-slate-800 font-bold italic">
                Aman
              </div>
              <span className="text-[10px] text-slate-500 block mt-1 font-medium">
                Student Project Lead
              </span>
              <span className="text-[9px] text-slate-400 block">
                Campus Eco-Drop Initiative
              </span>
            </div>

            {/* Official Seal Emblem */}
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600 flex flex-col items-center justify-center text-center p-1 bg-emerald-50/50">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span className="text-[7px] font-bold text-emerald-800 uppercase tracking-tighter mt-0.5">
                VERIFIED NAAC
              </span>
            </div>

            <div className="text-right">
              <div className="w-32 border-b border-slate-400 pb-1 font-serif text-slate-800 font-bold italic">
                DGU Committee
              </div>
              <span className="text-[10px] text-slate-500 block mt-1 font-medium">
                Sustainability Director
              </span>
              <span className="text-[9px] text-slate-400 block">
                DBS Global University
              </span>
            </div>
          </div>

          {/* Certificate Tracking Footer */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 relative z-10">
            <span>Certificate ID: {certificateId}</span>
            <span>Issued: October 31, 2026 · Dehradun, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};
