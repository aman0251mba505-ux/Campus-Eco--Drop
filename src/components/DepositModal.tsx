import React, { useState } from 'react';
import {
  X,
  QrCode,
  Droplet,
  Sparkles,
  FileText,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  Ticket,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  WasteCategory,
  DropBoxLocation,
  CanteenPartner,
  DigitalVoucher,
  DepositRecord,
} from '../types';
import { RECYCLABLE_ITEMS } from '../data/initialData';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  dropBoxes: DropBoxLocation[];
  canteens: CanteenPartner[];
  selectedDropBoxId?: string;
  onDepositComplete: (record: DepositRecord, voucher: DigitalVoucher) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  dropBoxes,
  canteens,
  selectedDropBoxId,
  onDepositComplete,
}) => {
  const [activeBoxId, setActiveBoxId] = useState<string>(
    selectedDropBoxId || dropBoxes[0]?.id || 'box-1'
  );
  const [quantities, setQuantities] = useState<Record<WasteCategory, number>>({
    plastic: 2,
    aluminum: 1,
    paper: 0,
  });
  const [selectedCanteenId, setSelectedCanteenId] = useState<string>(
    canteens[0]?.id || 'canteen-1'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedRecord, setCompletedRecord] = useState<{
    record: DepositRecord;
    voucher: DigitalVoucher;
  } | null>(null);

  if (!isOpen) return null;

  const currentBox = dropBoxes.find((b) => b.id === activeBoxId) || dropBoxes[0];
  const targetCanteen = canteens.find((c) => c.id === selectedCanteenId) || canteens[0];

  const updateQuantity = (cat: WasteCategory, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [cat]: Math.max(0, (prev[cat] || 0) + delta),
    }));
  };

  // Calculations
  let totalItems = 0;
  let totalPoints = 0;
  let totalWeightKg = 0;
  let totalCo2Kg = 0;
  let estimatedScrapValueInr = 0;

  RECYCLABLE_ITEMS.forEach((item) => {
    const qty = quantities[item.id] || 0;
    totalItems += qty;
    totalPoints += qty * item.pointsPerUnit;
    const weight = qty * item.unitWeightKg;
    totalWeightKg += weight;
    totalCo2Kg += qty * item.co2SavedPerUnitKg;
    estimatedScrapValueInr += weight * item.marketRatePerKgInr;
  });

  const handleSubmitDeposit = () => {
    if (totalItems === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const voucherCode = `ECO-${targetCanteen.name.slice(0, 4).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      const newVoucher: DigitalVoucher = {
        id: `vouch-${Date.now()}`,
        code: voucherCode,
        canteenId: targetCanteen.id,
        canteenName: targetCanteen.name,
        title: targetCanteen.offerTitle,
        discountValueInr: targetCanteen.discountValueInr,
        minSpendInr: targetCanteen.minSpendInr,
        earnedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
          'en-US',
          { month: 'short', day: 'numeric', year: 'numeric' }
        ),
        isRedeemed: false,
        studentEmail: 'aman.0251mba505@dgu.ac.in',
      };

      const itemBreakdown = RECYCLABLE_ITEMS.filter(
        (i) => (quantities[i.id] || 0) > 0
      ).map((i) => ({
        category: i.id,
        name: i.name,
        quantity: quantities[i.id],
        weightKg: Number((quantities[i.id] * i.unitWeightKg).toFixed(3)),
        points: quantities[i.id] * i.pointsPerUnit,
      }));

      const record: DepositRecord = {
        id: `dep-${Date.now()}`,
        timestamp: 'Just now',
        dropBoxCode: currentBox.code,
        dropBoxName: currentBox.name,
        studentEmail: 'aman.0251mba505@dgu.ac.in',
        studentName: 'Aman',
        items: itemBreakdown,
        totalPoints,
        totalWeightKg: Number(totalWeightKg.toFixed(3)),
        co2OffsetKg: Number(totalCo2Kg.toFixed(2)),
        voucherIssued: newVoucher,
      };

      setCompletedRecord({ record, voucher: newVoucher });
      onDepositComplete(record, newVoucher);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setCompletedRecord(null);
    setQuantities({ plastic: 1, aluminum: 0, paper: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Log Campus Waste Deposit
              </h2>
              <p className="text-xs text-slate-500">
                Scan & verify segregated recyclables at DGU drop-box
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {completedRecord ? (
            /* Success State */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Deposit Verified & Logged!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  You deposited {completedRecord.record.items.reduce((s, i) => s + i.quantity, 0)} items (
                  {completedRecord.record.totalWeightKg} kg) at{' '}
                  <span className="font-semibold text-slate-800">
                    {completedRecord.record.dropBoxName}
                  </span>
                </p>
              </div>

              {/* Reward Highlights */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                <div>
                  <span className="block text-xs text-emerald-800 font-medium">
                    Eco-Points Earned
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                    +{completedRecord.record.totalPoints}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-emerald-800 font-medium">
                    CO2 Diverted
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                    {completedRecord.record.co2OffsetKg} kg
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-emerald-800 font-medium">
                    Scrap Resale Value
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                    ₹{(completedRecord.record.totalWeightKg * 30).toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Generated Voucher Card */}
              <div className="p-4 bg-white rounded-xl border-2 border-dashed border-emerald-500 shadow-sm text-left">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
                      Instant Canteen Micro-Reward
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {completedRecord.voucher.canteenName}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {completedRecord.voucher.title}
                    </p>
                  </div>
                  <div className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                    ₹{completedRecord.voucher.discountValueInr} OFF
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      Voucher Code (Show to Canteen)
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-sm tracking-wider">
                      {completedRecord.voucher.code}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Expires: {completedRecord.voucher.expiresAt}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                >
                  View in My Vouchers Wallet
                </button>
              </div>
            </div>
          ) : (
            /* Deposit Configuration Form */
            <>
              {/* Step 1: Drop-Box Station */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Drop-Box Station (DGU Campus)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dropBoxes.map((box) => (
                    <button
                      key={box.id}
                      onClick={() => setActiveBoxId(box.id)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        activeBoxId === box.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-slate-800">
                          {box.code}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            box.capacityPercent >= 80
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {box.capacityPercent}% Full
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 mt-1 truncate">
                        {box.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {box.landmark}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Item Quantities */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Count Clean Segregated Items
                </label>
                <div className="space-y-2.5">
                  {RECYCLABLE_ITEMS.map((item) => {
                    const count = quantities[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            {item.id === 'plastic' && <Droplet className="w-5 h-5" />}
                            {item.id === 'aluminum' && <Sparkles className="w-5 h-5" />}
                            {item.id === 'paper' && <FileText className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">
                                {item.name}
                              </span>
                              <span className="text-xs font-medium text-emerald-700">
                                +{item.pointsPerUnit} pts
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              {item.itemDescription}
                            </p>
                          </div>
                        </div>

                        {/* Counter Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={count <= 0}
                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center font-mono font-bold text-sm text-slate-900 tabular-nums">
                            {count}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Choose Canteen Discount Partner */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Select Your Instant Reward Voucher
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {canteens.map((canteen) => (
                    <button
                      key={canteen.id}
                      onClick={() => setSelectedCanteenId(canteen.id)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        selectedCanteenId === canteen.id
                          ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {canteen.name}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 font-mono">
                          ₹{canteen.discountValueInr} OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">
                        {canteen.offerTitle}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Min. order ₹{canteen.minSpendInr}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Summary Bar */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Earning</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                      +{totalPoints} Eco-Points
                    </span>
                    <span className="text-xs text-slate-300">
                      ({totalWeightKg.toFixed(2)} kg scrap)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">
                    Instant Voucher
                  </span>
                  <span className="text-sm font-bold text-white">
                    ₹{targetCanteen.discountValueInr} OFF @ {targetCanteen.name.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleSubmitDeposit}
                disabled={totalItems === 0 || isSubmitting}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Verifying Drop-Box & Issuing Voucher...</span>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    <span>Drop {totalItems} Items & Claim Voucher</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
