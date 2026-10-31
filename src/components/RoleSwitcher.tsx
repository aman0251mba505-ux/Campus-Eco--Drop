import React from 'react';
import { User, Store, Building2, Sparkles } from 'lucide-react';

export type AppRole = 'student' | 'canteen' | 'facilities';

interface RoleSwitcherProps {
  currentRole: AppRole;
  onSelectRole: (role: AppRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onSelectRole,
}) => {
  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">
            DGU Venture Quest Demo Persona:
          </span>
          <span className="text-slate-400 hidden md:inline">
            Switch views to test from any stakeholder perspective
          </span>
        </div>

        {/* Segmented Role Controls */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-800 rounded-lg border border-slate-700/80">
          <button
            onClick={() => onSelectRole('student')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              currentRole === 'student'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student App</span>
          </button>

          <button
            onClick={() => onSelectRole('canteen')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              currentRole === 'canteen'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Canteen POS</span>
          </button>

          <button
            onClick={() => onSelectRole('facilities')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              currentRole === 'facilities'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Facilities & Pitch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
