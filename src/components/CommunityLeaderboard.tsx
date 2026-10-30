import React from 'react';
import {
  Award,
  Trophy,
  Flame,
  Users,
  Sparkles,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Medal,
  Zap,
} from 'lucide-react';
import { HostelStanding, StudentChampion } from '../types';

interface CommunityLeaderboardProps {
  hostelStandings: HostelStanding[];
  studentChampions: StudentChampion[];
  onOpenDeposit: () => void;
}

export const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({
  hostelStandings,
  studentChampions,
  onOpenDeposit,
}) => {
  return (
    <div className="space-y-8">
      {/* Header & Green Canteen Days Promo Banner (From Week 3 GTM Experiment) */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Week 3 Activation: Green Canteen Days</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              2X Double Reward Points During Lunch Hours!
            </h1>
            <p className="text-emerald-100 text-sm max-w-xl">
              Deposit empty beverage cans and bottles at the Central Canteen Plaza between 12:30 PM and 2:30 PM to earn double points and ₹30 discount vouchers!
            </p>
          </div>

          <button
            onClick={onOpenDeposit}
            className="self-start md:self-auto px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Deposit for 2X Points</span>
          </button>
        </div>
      </div>

      {/* Grid: Hostel Championship & Student Champions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Inter-Hostel Sustainability Cup */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                <span>Campus Inter-Hostel Cup</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Hostel Recycling Standings
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              October 2026
            </span>
          </div>

          <div className="space-y-3">
            {hostelStandings.map((hostel) => (
              <div
                key={hostel.id}
                className={`p-4 rounded-xl border transition-all ${
                  hostel.rank === 1
                    ? 'border-amber-300 bg-amber-50/50 shadow-sm'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        hostel.rank === 1
                          ? 'bg-amber-400 text-slate-900'
                          : hostel.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : hostel.rank === 3
                          ? 'bg-amber-700/60 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      #{hostel.rank}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {hostel.name}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {hostel.participantsCount} active students
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-base font-bold text-slate-900 block tabular-nums">
                      {hostel.totalKg.toFixed(1)} kg
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      {hostel.trend === 'up' ? '▲ Rising' : '● Steady'}
                    </span>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (hostel.totalKg / 250) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* NSS Club Partnership Box (Week 4 Roadmap) */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>NSS & Social Welfare Club Partnership</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The winning hostel wing receives ₹10,000 canteen party sponsorship funded by corporate scrap aggregators at the end of the semester!
            </p>
          </div>
        </div>

        {/* Right: Individual Student Champions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <Medal className="w-4 h-4" />
                <span>Top Recyclers</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Student Eco-Champions
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Top 5 Leaders
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {studentChampions.map((student) => (
              <div
                key={student.email}
                className="p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      student.rank === 1
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : student.rank === 2
                        ? 'bg-slate-100 text-slate-700 border border-slate-300'
                        : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    #{student.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {student.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {student.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{student.hostel}</span>
                      <span>·</span>
                      <span className="font-mono">{student.email}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-base font-bold text-emerald-700 block tabular-nums">
                    {student.points} pts
                  </span>
                  <span className="text-xs text-slate-500">
                    {student.kgRecycled} kg saved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
