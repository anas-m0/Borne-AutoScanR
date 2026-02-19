
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockIssues } from '../services/mockData';
import { Car, ShieldCheck, Activity, Zap, Info, ExternalLink } from 'lucide-react';

interface Props {
  onComplete: (issueCount: number) => void;
}

const scanStates = [
  { threshold: 0, text: "Initialisation du protocole..." },
  { threshold: 20, text: "Interrogation du calculateur..." },
  { threshold: 40, text: "Vérification ABS / ESP..." },
  { threshold: 60, text: "Analyse pollution & sonde lambda..." },
  { threshold: 80, text: "Lecture des défauts fugitifs..." },
  { threshold: 95, text: "Finalisation du rapport..." },
];

const ScanningScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(scanStates[0].text);

  useEffect(() => {
    const duration = 10000;
    const intervalTime = 100;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        const newState = [...scanStates].reverse().find(s => next >= s.threshold);
        if (newState && newState.text !== currentMessage) {
          setCurrentMessage(newState.text);
        }
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(mockIssues.length), 800);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, currentMessage]);

  return (
    <div className="h-full flex flex-col items-center justify-between py-12 px-8 relative overflow-hidden">
      
      <div className="text-center z-10">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Activity size={14} /> Diagnostic actif
        </motion.div>
        <h2 className="text-2xl font-heading font-bold text-brand-dark uppercase tracking-tight">
          Analyse des calculateurs
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl aspect-[16/7] bg-white rounded-[2.5rem] relative overflow-hidden flex shadow-xl border border-slate-200"
      >
        <div className="flex-1 p-8 flex flex-col justify-center relative z-10">
            <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2">Partenaire Sécurité</span>
            <h3 className="text-3xl font-heading font-bold text-brand-dark mb-4 leading-tight">
              Pneumatiques<br/>
              <span className="text-brand-primary">-20% chez EuroMaster</span>
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mb-6">
              Offre exclusive sur présentation du rapport AutoScanR.
            </p>
            <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <ShieldCheck size={16} className="text-brand-primary" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase">Pose certifiée</span>
                </div>
            </div>
        </div>
        
        <div className="w-1/3 relative">
            <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
                alt="Ad"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg">
                    <ExternalLink size={20} />
                </div>
            </div>
        </div>
      </motion.div>

      <div className="w-full max-w-4xl z-10 px-4">
        <div className="flex justify-between items-end mb-6">
            <AnimatePresence mode="wait">
                <motion.p key={currentMessage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-700 font-bold italic flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                    {currentMessage}
                </motion.p>
            </AnimatePresence>
            <span className="text-4xl font-heading font-black text-brand-primary">{Math.round(progress)}%</span>
        </div>

        <div className="relative h-4 bg-slate-100 rounded-full border border-slate-200 shadow-inner">
            <motion.div className="h-full bg-brand-primary rounded-full shadow-lg" style={{ width: `${progress}%` }} />
            <motion.div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${progress}%` }}>
                <div className="bg-brand-dark p-2 rounded-lg shadow-xl">
                    <Car size={16} className="text-brand-primary" />
                </div>
            </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-8 opacity-40">
            <div className="flex items-center gap-2 text-slate-900"><Info size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Ne pas débrancher</span></div>
        </div>
      </div>
    </div>
  );
};

export default ScanningScreen;
