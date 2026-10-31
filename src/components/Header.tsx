import React, { useState } from 'react';
import {
  Leaf,
  QrCode,
  Ticket,
  MapPin,
  Award,
  Store,
  FileText,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  ecoPoints: number;
  activeVouchersCount: number;
  onOpenDeposit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  ecoPoints,
  activeVouchersCount,
  onOpenDeposit,
}) => {
  const { currentUser, firebaseUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 h-16">
            {/* Zone 1: Single text wordmark */}
            <button
              onClick={() => setActiveTab('deposit')}
              className="flex items-center gap-2.5 text-left group shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                  Campus Eco-Drop
                </span>
                <span className="text-[11px] font-medium text-slate-500 block leading-none">
                  DGU Dehradun
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'deposit'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Deposit & Scan</span>
              </button>

              <button
                onClick={() => setActiveTab('wallet')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'wallet'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>My Vouchers</span>
                {activeVouchersCount > 0 && (
                  <span className="ml-1 text-[11px] font-bold px-1.5 py-0.2 bg-emerald-600 text-white rounded-full">
                    {activeVouchersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('dropboxes')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'dropboxes'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Campus Boxes</span>
              </button>

              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'leaderboard'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Leaderboard</span>
              </button>

              <button
                onClick={() => setActiveTab('canteen-pos')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'canteen-pos'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Canteen POS</span>
              </button>

              <button
                onClick={() => setActiveTab('venture')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'venture'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Venture Plan</span>
              </button>
            </nav>

            {/* Zone 3: Primary Actions & Auth Profile */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Quick Points Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                <span className="text-slate-500">Pts:</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums">
                  {currentUser ? currentUser.ecoPoints : ecoPoints}
                </span>
              </div>

              {/* Quick Deposit CTA */}
              <button
                onClick={onOpenDeposit}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>Deposit</span>
              </button>

              {/* Auth Profile Button / Sign In */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 pl-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-xs font-semibold text-slate-800"
                  >
                    <span className="max-w-[100px] truncate hidden md:inline">
                      {currentUser?.displayName || 'Student'}
                    </span>
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        {currentUser?.displayName?.charAt(0) || 'A'}
                      </div>
                    )}
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-3 px-4 z-50 text-xs space-y-2.5">
                      <div className="border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900 block truncate">
                          {currentUser?.displayName}
                        </span>
                        <span className="font-mono text-slate-500 block truncate text-[11px]">
                          {currentUser?.email}
                        </span>
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified DGU Account</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600">
                        <div>Hostel: <strong>{currentUser?.hostel}</strong></div>
                        <div>Eco-Points: <strong className="font-mono text-emerald-700">{currentUser?.ecoPoints} pts</strong></div>
                        <div>Recycled: <strong className="font-mono text-slate-800">{currentUser?.totalWeightKg} kg</strong></div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            setIsAuthModalOpen(true);
                          }}
                          className="w-full py-1 text-center text-slate-700 hover:bg-slate-50 rounded font-medium transition-colors"
                        >
                          Switch Account
                        </button>
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            logout();
                          }}
                          className="w-full py-1 text-center text-rose-600 hover:bg-rose-50 rounded font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Sign in with college Google account"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                  <span>College Sign-In</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sub-bar for mobile navigation */}
        <div className="lg:hidden border-t border-slate-200 overflow-x-auto py-2 px-4 flex items-center gap-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'deposit' ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Deposit & Scan
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'wallet' ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-700'
            }`}
          >
            My Vouchers ({activeVouchersCount})
          </button>
          <button
            onClick={() => setActiveTab('dropboxes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'dropboxes' ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Boxes & Map
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'leaderboard' ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('canteen-pos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'canteen-pos' ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Canteen POS
          </button>
          <button
            onClick={() => setActiveTab('venture')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'venture' ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Venture Plan (PDF)
          </button>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
