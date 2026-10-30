import React, { useState } from 'react';
import {
  Ticket,
  CheckCircle2,
  Clock,
  Store,
  QrCode,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Coffee,
  ShoppingBag,
} from 'lucide-react';
import { DigitalVoucher } from '../types';

interface VoucherWalletProps {
  vouchers: DigitalVoucher[];
  ecoPoints: number;
  totalKgRecycled: number;
  onRedeemVoucher: (voucherId: string) => void;
  onOpenDeposit: () => void;
}

export const VoucherWallet: React.FC<VoucherWalletProps> = ({
  vouchers,
  ecoPoints,
  totalKgRecycled,
  onRedeemVoucher,
  onOpenDeposit,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'redeemed'>('active');
  const [activeModalVoucher, setActiveModalVoucher] = useState<DigitalVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeVouchers = vouchers.filter((v) => !v.isRedeemed);
  const redeemedVouchers = vouchers.filter((v) => v.isRedeemed);

  const filteredVouchers =
    filter === 'all'
      ? vouchers
      : filter === 'active'
      ? activeVouchers
      : redeemedVouchers;

  const totalSavingsInr = vouchers
    .filter((v) => v.isRedeemed)
    .reduce((sum, v) => sum + v.discountValueInr, 0);

  const potentialSavingsInr = activeVouchers.reduce(
    (sum, v) => sum + v.discountValueInr,
    0
  );

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Ticket className="w-4 h-4" />
              <span>DGU Student Eco-Rewards Wallet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Aman's Canteen Savings
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Turn segregated bottles and cans into direct meal discounts across DBS Global University campus food hubs.
            </p>
          </div>

          <button
            onClick={onOpenDeposit}
            className="self-start md:self-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Deposit Recyclables</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60">
          <div>
            <span className="text-xs text-slate-400 block">Eco-Points Balance</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {ecoPoints}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Ready to Spend</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              ₹{potentialSavingsInr}
            </span>
            <span className="text-[11px] text-slate-400">({activeVouchers.length} vouchers)</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Total Lifetime Savings</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              ₹{totalSavingsInr}
            </span>
            <span className="text-[11px] text-slate-400">({redeemedVouchers.length} redeemed)</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Material Diverted</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {totalKgRecycled.toFixed(1)} kg
            </span>
            <span className="text-[11px] text-slate-400">From city landfill</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Digital Discount Vouchers</h2>
          <p className="text-xs text-slate-500">
            Show voucher code or barcode to the campus canteen cashier to deduct from your bill
          </p>
        </div>

        {/* Interactive Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter('active')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'active'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({activeVouchers.length})
          </button>
          <button
            onClick={() => setFilter('redeemed')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'redeemed'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Redeemed ({redeemedVouchers.length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({vouchers.length})
          </button>
        </div>
      </div>

      {/* Vouchers Grid */}
      {filteredVouchers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No vouchers in this view</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
            Deposit clean plastic bottles or cans at any campus drop-box to earn an instant discount voucher!
          </p>
          <button
            onClick={onOpenDeposit}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Make a Deposit Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className={`relative rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                voucher.isRedeemed
                  ? 'bg-slate-50/80 border-slate-200 opacity-75'
                  : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className={`h-2 w-full ${
                  voucher.isRedeemed ? 'bg-slate-300' : 'bg-emerald-500'
                }`}
              />

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Canteen & Title */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {voucher.canteenName}
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          Min order ₹{voucher.minSpendInr}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        voucher.isRedeemed
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      ₹{voucher.discountValueInr} OFF
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-800 mt-3">
                    {voucher.title}
                  </p>
                </div>

                {/* Perforation Divider */}
                <div className="relative py-2">
                  <div className="border-t border-dashed border-slate-200" />
                  <div className="absolute -left-7 top-1 w-4 h-4 rounded-full bg-slate-50 border-r border-slate-200" />
                  <div className="absolute -right-7 top-1 w-4 h-4 rounded-full bg-slate-50 border-l border-slate-200" />
                </div>

                {/* Voucher Code & Action */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        CODE
                      </span>
                      <span className="font-mono font-bold text-xs text-slate-900 tracking-wider">
                        {voucher.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(voucher.code)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors text-[11px] flex items-center gap-1"
                      title="Copy code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedCode === voucher.code ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {voucher.isRedeemed
                        ? `Redeemed ${voucher.redeemedAt || 'recently'}`
                        : `Valid until ${voucher.expiresAt}`}
                    </span>
                  </div>

                  {voucher.isRedeemed ? (
                    <div className="py-2 px-3 bg-slate-100 rounded-xl text-center text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Used at Canteen Counter</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveModalVoucher(voucher)}
                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Show QR Code</span>
                      </button>
                      <button
                        onClick={() => onRedeemVoucher(voucher.id)}
                        className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors border border-emerald-200"
                        title="Simulate cashier redeeming this"
                      >
                        Redeem
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Barcode / QR Code Detail Modal */}
      {activeModalVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Ticket className="w-5 h-5" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 font-mono">
                {activeModalVoucher.canteenName}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                ₹{activeModalVoucher.discountValueInr} OFF
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeModalVoucher.title}
              </p>
            </div>

            {/* Simulated QR Code Canvas */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl inline-block mx-auto">
              <div className="w-48 h-48 bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center">
                <QrCode className="w-36 h-36 text-slate-900" />
                <span className="font-mono text-[11px] font-bold text-slate-700 mt-1">
                  {activeModalVoucher.code}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Present this screen to the cashier at {activeModalVoucher.canteenName} before ordering. Minimum order ₹{activeModalVoucher.minSpendInr}.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  onRedeemVoucher(activeModalVoucher.id);
                  setActiveModalVoucher(null);
                }}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Mark as Redeemed
              </button>
              <button
                onClick={() => setActiveModalVoucher(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
