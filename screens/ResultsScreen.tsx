
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { mockIssues } from '../services/mockData';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, FileText, HeartPulse, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  vehicleName: string;
  onReceiveReport: () => void;
}

const ResultsScreen: React.FC<Props> = ({ vehicleName, onReceiveReport }) => {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const issuesFound = mockIssues.length > 0;
  const healthScore = 85;

  return (
    <div className="max-w-7xl mx-auto min-h-full flex flex-col px-6 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-lg border border-slate-100">
               <div>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Score de Santé</p>
                   <div className="flex items-baseline gap-1">
                       <span className="text-5xl font-heading font-bold text-brand-primary">{healthScore}</span>
                       <span className="text-slate-300 font-bold">/100</span>
                   </div>
               </div>
               <div className="bg-brand-primary/10 p-4 rounded-2xl text-brand-primary"><HeartPulse size={32} /></div>
          </div>

          <div className="bg-white p-6 rounded-3xl flex flex-col justify-center shadow-lg border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Véhicule</p>
              <h3 className="text-2xl font-bold text-brand-primary truncate">{vehicleName}</h3>
          </div>

          <div className={`p-6 rounded-3xl flex items-center gap-4 shadow-lg border ${issuesFound ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`}>
               <div className={`p-3 rounded-xl ${issuesFound ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
                   {issuesFound ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
               </div>
               <div>
                   <h3 className={`font-bold text-lg ${issuesFound ? 'text-amber-800' : 'text-green-800'}`}>{issuesFound ? 'Vigilance' : 'Sain'}</h3>
                   <p className={`text-sm ${issuesFound ? 'text-amber-700/70' : 'text-green-700/70'}`}>{mockIssues.length} point(s) relevé(s)</p>
               </div>
          </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:flex flex-col w-1/3 bg-white rounded-[2.5rem] p-10 items-center justify-center shadow-xl border border-slate-100 relative overflow-hidden">
            <h3 className="absolute top-8 left-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Zones d'impact</h3>
            <div className="w-full h-full bg-slate-50 rounded-3xl flex items-center justify-center">
                <Stethoscope size={80} className="text-brand-primary/20" />
            </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-4 pb-20">
          {mockIssues.map((issue) => (
            <div key={issue.code} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <button 
                    onClick={() => setExpandedIssue(expandedIssue === issue.code ? null : issue.code)}
                    className="w-full p-6 flex items-center justify-between text-left"
                >
                    <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${issue.severity === 'high' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-brand-primary">{issue.title}</h3>
                            <p className="text-xs font-mono text-slate-400">{issue.code}</p>
                        </div>
                    </div>
                    {expandedIssue === issue.code ? <ChevronUp className="text-brand-primary" /> : <ChevronDown className="text-slate-300" />}
                </button>
                <AnimatePresence>
                    {expandedIssue === issue.code && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-6 pb-6 pt-2 border-t border-slate-50 bg-slate-50/50">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-[10px] font-black text-brand-primary uppercase mb-2">Explication</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{issue.description}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-brand-accent uppercase mb-2">Préconisation</h4>
                                    <p className="text-sm text-slate-900 font-bold">{issue.recommendation}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Dossier #0843-X • Protocole sécurisé</p>
        <Button variant="primary" onClick={onReceiveReport} className="w-full md:w-auto px-12 py-5 text-xl" icon={<FileText />}>
            Recevoir le rapport complet
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
