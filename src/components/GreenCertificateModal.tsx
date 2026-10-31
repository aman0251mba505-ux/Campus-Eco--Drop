import React, { useEffect } from 'react';
import { X, Award, Printer, ShieldCheck, CheckCircle2, Leaf, ArrowLeft, Download } from 'lucide-react';
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
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const studentName = user?.displayName || 'Aman';
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
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 flex flex-col max-h-[92vh]"
      >
        {/* Sticky Top Header Navigation */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-white/95 backdrop-blur-sm print:hidden">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
              title="Close window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Certificate Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {/* Printable Canvas */}
          <div className="p-6 sm:p-10 bg-white text-slate-900 relative border-8 border-double border-emerald-800/20 rounded-xl shadow-sm">
            {/* Subtle Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Leaf className="w-80 h-80 text-emerald-800" />
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-1.5 relative z-10">
              <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
                <Leaf className="w-4 h-4" />
                <span>DBS Global University (DGU), Dehradun</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900 font-serif">
                Certificate of Green Excellence
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                National Assessment and Accreditation Council (NAAC) · Criterion 7 Campus Green Audit
              </p>
            </div>

            <div className="my-5 border-b border-slate-200" />

            {/* Body Content */}
            <div className="space-y-3 text-center relative z-10">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                This is proudly presented to
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
            <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 my-5 relative z-10 text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">
                  Diverted Scrap
                </span>
                <span className="text-base sm:text-lg font-bold font-mono text-emerald-800 tabular-nums">
                  {kg.toFixed(2)} kg
                </span>
                <span className="text-[9px] text-slate-400 block">From City Landfill</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">
                  Carbon Offset
                </span>
                <span className="text-base sm:text-lg font-bold font-mono text-emerald-800 tabular-nums">
                  {co2Kg} kg
                </span>
                <span className="text-[9px] text-slate-400 block">CO₂ Equivalent</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">
                  Reward Points
                </span>
                <span className="text-base sm:text-lg font-bold font-mono text-emerald-800 tabular-nums">
                  {points} pts
                </span>
                <span className="text-[9px] text-slate-400 block">DGU Eco-Credits</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-5 border-t border-slate-200 flex items-end justify-between text-left text-xs relative z-10">
              <div>
                <div className="w-28 sm:w-32 border-b border-slate-400 pb-1 font-serif text-slate-800 font-bold italic">
                  Aman
                </div>
                <span className="text-[10px] text-slate-500 block mt-1 font-medium">
                  Student Project Lead
                </span>
                <span className="text-[9px] text-slate-400 block">
                  Campus Eco-Drop
                </span>
              </div>

              {/* Official Seal Emblem */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-emerald-600 flex flex-col items-center justify-center text-center p-1 bg-emerald-50/50">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="text-[7px] font-bold text-emerald-800 uppercase tracking-tighter mt-0.5">
                  VERIFIED NAAC
                </span>
              </div>

              <div className="text-right">
                <div className="w-28 sm:w-32 border-b border-slate-400 pb-1 font-serif text-slate-800 font-bold italic">
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
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 relative z-10">
              <span>ID: {certificateId}</span>
              <span>Issued: October 31, 2026 · Dehradun, India</span>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Footer Navigation Bar */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-t border-slate-200 bg-slate-50 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to App</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Save / Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
