import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Droplet,
  FileText,
  ArrowRight,
} from 'lucide-react';

interface AdviceResult {
  category: string;
  isAccepted: boolean;
  points: number;
  preparationTip: string;
  dropBoxSlot: string;
}

export const AiWasteAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [advice, setAdvice] = useState<AdviceResult | null>(null);

  const cannedQuestions = [
    'Can I deposit a 1-litre Bisleri water bottle?',
    'Are crushed Red Bull cans accepted?',
    'Can I recycle oily pizza boxes or tea cups?',
    'What do I do with bottle plastic caps?',
  ];

  const handleAsk = (textToAsk: string) => {
    const text = textToAsk.toLowerCase();
    setIsProcessing(true);

    setTimeout(() => {
      if (text.includes('water bottle') || text.includes('bisleri') || text.includes('plastic bottle') || text.includes('coke bottle')) {
        setAdvice({
          category: 'PET Plastic Bottle',
          isAccepted: true,
          points: 10,
          preparationTip: 'Empty any remaining water, crush bottle flat to save bin space, and screw cap back on.',
          dropBoxSlot: 'Left Blue Slot (Plastic Bottles)',
        });
      } else if (text.includes('can') || text.includes('red bull') || text.includes('aluminum') || text.includes('coke can') || text.includes('tin')) {
        setAdvice({
          category: 'Aluminum Beverage Can',
          isAccepted: true,
          points: 15,
          preparationTip: 'Ensure can is fully empty and rinsed if sticky. Drop upright or lightly crushed.',
          dropBoxSlot: 'Right Green Slot (Aluminum Cans)',
        });
      } else if (text.includes('pizza') || text.includes('oily') || text.includes('greasy')) {
        setAdvice({
          category: 'Contaminated Food Packaging',
          isAccepted: false,
          points: 0,
          preparationTip: 'Oily or grease-stained cardboard contaminates paper scrap pulp. Please place in general compost/food bin.',
          dropBoxSlot: 'Not Accepted in Eco-Drop Box',
        });
      } else if (text.includes('paper') || text.includes('cup') || text.includes('box') || text.includes('cardboard') || text.includes('notebook')) {
        setAdvice({
          category: 'Clean Paper / Cardboard',
          isAccepted: true,
          points: 6,
          preparationTip: 'Must be dry and free of wet food residue. Flatten before dropping.',
          dropBoxSlot: 'Top Packaging Slot',
        });
      } else if (text.includes('cap') || text.includes('lid')) {
        setAdvice({
          category: 'Bottle Cap / Lid',
          isAccepted: true,
          points: 2,
          preparationTip: 'Keep attached to the crushed PET bottle so it stays in the plastic recycling stream.',
          dropBoxSlot: 'Attached to PET Bottle',
        });
      } else {
        setAdvice({
          category: 'General Packaging Inquiry',
          isAccepted: true,
          points: 8,
          preparationTip: 'If it is clean, dry PET plastic, aluminum, or clean paper, drop it into the designated campus drop-box slot!',
          dropBoxSlot: 'Refer to drop-box guide',
        });
      }
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            DGU Eco-Drop Assistant
          </h3>
          <p className="text-[11px] text-slate-500">
            Check packaging recyclability, drop-box slot & reward points
          </p>
        </div>
      </div>

      {/* Canned Quick Queries */}
      <div className="flex flex-wrap gap-1.5">
        {cannedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => {
              setQuery(q);
              handleAsk(q);
            }}
            className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask about any item (e.g., Maggi cup, Cold drink can)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) handleAsk(query);
          }}
          className="flex-1 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button
          onClick={() => query.trim() && handleAsk(query)}
          disabled={!query.trim() || isProcessing}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold text-xs rounded-xl transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Result Display */}
      {advice && (
        <div
          className={`p-3.5 rounded-xl border text-xs space-y-2 animate-in fade-in duration-150 ${
            advice.isAccepted
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5">
              {advice.isAccepted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              )}
              {advice.category}
            </span>
            {advice.isAccepted && (
              <span className="font-mono font-bold text-emerald-700">
                +{advice.points} pts / item
              </span>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-slate-700">
            {advice.preparationTip}
          </p>
          <div className="text-[10px] font-semibold text-slate-500 pt-1 border-t border-current/15">
            Target Slot: <span className="font-bold text-slate-800">{advice.dropBoxSlot}</span>
          </div>
        </div>
      )}
    </div>
  );
};
