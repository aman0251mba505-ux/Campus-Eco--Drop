import React, { useState } from 'react';
import { X, QrCode, Camera, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { DropBoxLocation } from '../types';

interface CameraQrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dropBoxes: DropBoxLocation[];
  onBoxScanned: (boxId: string) => void;
}

export const CameraQrScannerModal: React.FC<CameraQrScannerModalProps> = ({
  isOpen,
  onClose,
  dropBoxes,
  onBoxScanned,
}) => {
  const [manualCode, setManualCode] = useState('');
  const [scanningBox, setScanningBox] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (box: DropBoxLocation) => {
    setScanningBox(box.id);
    setTimeout(() => {
      onBoxScanned(box.id);
      setScanningBox(null);
      onClose();
    }, 600);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    const matched = dropBoxes.find(
      (b) => b.code.toLowerCase() === manualCode.trim().toLowerCase()
    );
    if (matched) {
      onBoxScanned(matched.id);
      onClose();
    } else {
      onBoxScanned(dropBoxes[0].id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Scan Drop-Box QR Code
              </h3>
              <p className="text-[11px] text-slate-400">
                Point phone camera at kiosk QR sticker
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Canvas */}
        <div className="p-6 space-y-5">
          <div className="relative aspect-square w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
            {/* Camera Reticle Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400" />

            {/* Scanning Laser Sweep Line */}
            <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[bounce_2s_infinite]" />

            {scanningBox ? (
              <div className="text-center space-y-2 animate-in zoom-in-95 duration-150">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <span className="text-xs font-bold text-white block">
                  QR Code Verified!
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Connecting to Drop-Box Chute...
                </span>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <QrCode className="w-16 h-16 text-slate-600 mx-auto opacity-70" />
                <p className="text-xs text-slate-400">
                  Align QR code inside frame
                </p>
              </div>
            )}
          </div>

          {/* Quick-Scan Buttons for Testing on Laptop / Classroom */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider text-center">
              Tap a campus box to simulate quick scan:
            </span>

            <div className="grid grid-cols-2 gap-2">
              {dropBoxes.map((box) => (
                <button
                  key={box.id}
                  onClick={() => handleSimulateScan(box)}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-800/60 hover:bg-emerald-950/40 hover:border-emerald-500/50 text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-emerald-400">
                      {box.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {box.capacityPercent}%
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 truncate mt-0.5 group-hover:text-white">
                    {box.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Code Input Escape Hatch */}
          <form onSubmit={handleManualSubmit} className="pt-2 border-t border-slate-800/80 flex gap-2">
            <input
              type="text"
              placeholder="Or enter box tag (e.g. DGU-BOX-01)..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            />
            <button
              type="submit"
              disabled={!manualCode.trim()}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
