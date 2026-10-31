import React, { useState } from 'react';
import {
  X,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  User,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginAsDemoStudent, loginWithCustomCollegeEmail, authError, clearAuthError } = useAuth();
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customHostel, setCustomHostel] = useState('Shivalik Boys Hostel');
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  const handleGoogleClick = async () => {
    setIsSigningIn(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch {
      // Error handled in context state
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleDemoAman = () => {
    loginAsDemoStudent();
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    const name = customName.trim() || customEmail.split('@')[0];
    loginWithCustomCollegeEmail(customEmail.trim(), name, customHostel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <LogIn className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Student College Sign-In
              </h3>
              <p className="text-xs text-slate-500">
                DBS Global University (DGU) Authentication
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              clearAuthError();
              onClose();
            }}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Detailed Error Banner if Google Auth popup fails */}
          {authError && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2">
              <div className="flex items-start gap-2 text-amber-900 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Google Sign-In Note:</span>
              </div>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                {authError.includes('unauthorized-domain')
                  ? 'Your Vercel domain is not yet added to Firebase Console Authorized Domains. To use real Google popup, add your Vercel URL in Firebase Console -> Auth -> Settings -> Authorized Domains. Meanwhile, you can use 1-click College Sign-In below!'
                  : authError}
              </p>
            </div>
          )}

          {/* Option 1: Real Google Sign-In */}
          <div>
            <button
              onClick={handleGoogleClick}
              disabled={isSigningIn}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-1.5">
              Supports any student Google or @dgu.ac.in email
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute px-3 bg-white text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or Instant Demo Sign-In
            </span>
          </div>

          {/* Option 2: 1-Click Fast Student Logins */}
          <div className="space-y-2">
            <button
              onClick={handleDemoAman}
              className="w-full p-3 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 text-left transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      Aman (Project Lead)
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-semibold">
                      Student
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800 block">
                    aman.0251mba505@dgu.ac.in
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>

          {/* Option 3: Custom College Email Login Form */}
          <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-slate-100 space-y-3">
            <span className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">
              Log in with custom college ID:
            </span>

            <div className="space-y-2">
              <input
                type="email"
                placeholder="your.roll@dgu.ac.in"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />

                <select
                  value={customHostel}
                  onChange={(e) => setCustomHostel(e.target.value)}
                  className="w-full py-2 px-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Shivalik Boys Hostel">Shivalik Hostel</option>
                  <option value="Mandakini Girls Hostel">Mandakini Hostel</option>
                  <option value="Doon Scholars Residency">Doon Residency</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!customEmail.trim()}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Sign In with College Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
