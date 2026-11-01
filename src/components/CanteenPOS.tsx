import React, { useState } from 'react';
import {
  Store,
  QrCode,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Search,
  BadgeIndianRupee,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { CanteenPartner, DigitalVoucher } from '../types';
import canteenImg from '../assets/images/canteen_campus_hub_1793385452733.jpg';

interface CanteenPOSProps {
  canteens: CanteenPartner[];
  vouchers: DigitalVoucher[];
  onRedeemVoucher: (voucherId: string) => void;
}

export const CanteenPOS: React.FC<CanteenPOSProps> = ({
  canteens,
  vouchers,
  onRedeemVoucher,
}) => {
  const [selectedCanteenId, setSelectedCanteenId] = useState<string>(
    canteens[0]?.id || 'canteen-1'
  );
  const [inputCode, setInputCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'error' | 'already_redeemed';
    message: string;
    voucher?: DigitalVoucher;
  } | null>(null);

  const activeCanteen =
    canteens.find((c) => c.id === selectedCanteenId) || canteens[0];

  const handleVerifyAndRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const trimmed = inputCode.trim().toUpperCase();
    const matched = vouchers.find(
      (v) => v.code.toUpperCase() === trimmed
    );

    if (!matched) {
      setVerificationResult({
        status: 'error',
        message: `Voucher "${trimmed}" not found in system. Please verify the code on the student's app.`,
      });
      return;
    }

    if (matched.isRedeemed) {
      setVerificationResult({
        status: 'already_redeemed',
        message: `Voucher "${trimmed}" was already redeemed on ${
          matched.redeemedAt || 'earlier today'
        }. Cannot be reused.`,
        voucher: matched,
      });
      return;
    }

    // Success! Mark as redeemed
    onRedeemVoucher(matched.id);
    setVerificationResult({
      status: 'success',
      message: `Valid! Applied ₹${matched.discountValueInr} discount for ${matched.studentEmail}.`,
      voucher: { ...matched, isRedeemed: true },
    });
    setInputCode('');
  };

  const canteenSpecificVouchers = vouchers.filter(
    (v) => v.canteenId === selectedCanteenId
  );
  const redeemedForThisCanteen = canteenSpecificVouchers.filter((v) => v.isRedeemed);
  const totalDiscountHonored = redeemedForThisCanteen.reduce(
    (sum, v) => sum + v.discountValueInr,
    0
  );

  return (
    <div className="space-y-8">
      {/* Merchant Header & Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Store className="w-4 h-4" />
            <span>Campus Merchant Partner Terminal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Canteen Voucher Redemption POS
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Verify and redeem student Eco-Drop discount vouchers at the point of sale. All discounts are subsidized via campus scrap aggregation revenue.
          </p>
        </div>

        {/* Vendor Selector Dropdown */}
        <div className="self-start md:self-auto min-w-[240px]">
          <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
            Current Canteen Outlet
          </label>
          <select
            value={selectedCanteenId}
            onChange={(e) => {
              setSelectedCanteenId(e.target.value);
              setVerificationResult(null);
            }}
            className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {canteens.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* POS Interaction & Cafe Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Scanner Terminal */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-600" />
              <span>Scan or Enter Student Voucher Code</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter the alphanumeric code shown on student's mobile wallet (e.g. ECO-NESC-4921)
            </p>

            {/* Input Form */}
            <form onSubmit={handleVerifyAndRedeem} className="mt-5 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. ECO-NESC-4921"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full py-3.5 pl-4 pr-24 font-mono font-bold text-base text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputCode.trim()}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Verify
                </button>
              </div>

              {/* Quick Preset Buttons for Testing */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-medium">Quick Test:</span>
                {vouchers
                  .filter((v) => !v.isRedeemed)
                  .slice(0, 3)
                  .map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setInputCode(v.code)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-[11px] text-slate-700 transition-colors"
                    >
                      {v.code} ({v.canteenName.split(' ')[0]})
                    </button>
                  ))}
              </div>
            </form>

            {/* Verification Result Callout */}
            {verificationResult && (
              <div
                className={`mt-5 p-4 rounded-xl border flex items-start gap-3 animate-in fade-in duration-150 ${
                  verificationResult.status === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : verificationResult.status === 'already_redeemed'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {verificationResult.status === 'success' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {verificationResult.status === 'already_redeemed' && (
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                {verificationResult.status === 'error' && (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1">
                  <h4 className="text-sm font-bold">
                    {verificationResult.status === 'success'
                      ? 'Discount Applied Successfully!'
                      : verificationResult.status === 'already_redeemed'
                      ? 'Voucher Already Redeemed'
                      : 'Verification Failed'}
                  </h4>
                  <p className="text-xs">{verificationResult.message}</p>

                  {verificationResult.voucher && (
                    <div className="mt-2 text-xs font-mono pt-2 border-t border-current/20 flex gap-4">
                      <span>Value: ₹{verificationResult.voucher.discountValueInr} OFF</span>
                      <span>Min Order: ₹{verificationResult.voucher.minSpendInr}</span>
                      <span>Student: {verificationResult.voucher.studentEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics for Active Canteen */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">
                Footfall Driven
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                +{activeCanteen.vouchersRedeemedCount}
              </span>
              <span className="text-[10px] text-slate-400 block">Student visits</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">
                Discounts Honored
              </span>
              <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                ₹{totalDiscountHonored + activeCanteen.vouchersRedeemedCount * 15}
              </span>
              <span className="text-[10px] text-slate-400 block">Total subsidised</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">
                Reimbursement
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                Settled Weekly
              </span>
            </div>
          </div>
        </div>

        {/* Canteen Atmosphere Showcase */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 min-h-[300px] bg-slate-900 shadow-sm flex flex-col justify-end">
          <img
            src={canteenImg}
            alt="Campus Canteen Hub"
            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/images/canteen_campus_hub_1793385452733.jpg';
            }}
          />
          <div className="relative z-10 p-5 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent text-white">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Partner Hub
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {activeCanteen.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {activeCanteen.location} · {activeCanteen.offerTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Redemptions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Redemptions Log
            </h3>
            <p className="text-xs text-slate-500">
              Validated customer transactions for {activeCanteen.name}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {redeemedForThisCanteen.length} Processed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-3">Voucher Code</th>
                <th className="px-6 py-3">Student User</th>
                <th className="px-6 py-3">Discount Value</th>
                <th className="px-6 py-3">Redemption Time</th>
                <th className="px-6 py-3 text-right">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {redeemedForThisCanteen.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No active redemptions logged for this canteen today. Enter a student code above to test verification.
                  </td>
                </tr>
              ) : (
                redeemedForThisCanteen.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5 font-mono font-bold text-slate-900">
                      {voucher.code}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600">
                      {voucher.studentEmail}
                    </td>
                    <td className="px-6 py-3.5 font-mono font-bold text-emerald-700">
                      ₹{voucher.discountValueInr} OFF
                    </td>
                    <td className="px-6 py-3.5 text-slate-500">
                      {voucher.redeemedAt || 'Today'}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
