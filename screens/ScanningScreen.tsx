
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
    // We update every 30ms for 60fps-like fluid movement
    const duration = 10000;
    const intervalTime = 16;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        // Find current state text
        const newState = [...scanStates].reverse().find(s => next >= s.threshold);
        if (newState && newState.text !== currentMessage) {
          setCurrentMessage(newState.text);
        }
        if (next >= 100) {
          clearInterval(timer);
          // Wait slightly after 100% to let animation catch up nicely before completing
          setTimeout(() => onComplete(mockIssues.length), 1000);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, currentMessage]);

  return (
    <div className="h-full flex flex-col items-center justify-between py-12 px-8 relative overflow-hidden">

      {/* Element 1: Top Title */}
      <div className="text-center z-10 w-full mt-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Activity size={14} /> Diagnostic en cours
        </motion.div>
        <h2 className="text-3xl font-heading font-bold text-brand-primary uppercase tracking-tight">
          Analyse des calculateurs
        </h2>
      </div>

      {/* Element 2: Ad Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl aspect-[16/6] bg-white rounded-[2.5rem] relative overflow-hidden flex shadow-xl border border-slate-200 mt-12 mb-12"
      >
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative z-10">
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-3">Partenaire Sécurité</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-4 leading-tight">
            Pneumatiques<br />
            <span className="text-brand-primary">-20% chez EuroMaster</span>
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mb-8">
            Offre exclusive sur présentation du rapport AutoScanR.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-xl border border-slate-100">
              <ShieldCheck size={18} className="text-brand-primary" />
              <span className="text-xs font-bold text-slate-900 uppercase">Pose certifiée</span>
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

      {/* Element 3: Bottom Progress Bar */}
      <div className="w-full max-w-4xl z-10 px-4 mb-4">
        <div className="flex justify-between items-end mb-3">
          <AnimatePresence mode="wait">
            <motion.p key={currentMessage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-700 font-bold italic flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
              {currentMessage}
            </motion.p>
          </AnimatePresence>
          <span className="text-4xl font-heading font-black text-brand-primary leading-none">{Math.round(progress)}%</span>
        </div>

        {/* Fluid, High-Tech Progress Bar */}
        <div className="relative mt-4 mb-6">
          {/* The Track */}
          <div className="h-6 w-full bg-slate-900 rounded-full border border-slate-700 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] overflow-hidden relative">
            {/* Background Grid Pattern inside track */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '20px 100%' }}></div>

            {/* Filler */}
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary/20 via-brand-primary to-cyan-300 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing head of the filler */}
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/60 to-transparent blur-[2px]"></div>
            </motion.div>
          </div>

          {/* The Moving Car Avatar */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-[50%] z-20 flex flex-col items-center"
            style={{ left: `${progress}%` }}
          >
            {/* Floating Holographic Glow behind car */}
            <div className="absolute w-24 h-24 bg-brand-primary/30 rounded-full blur-xl scale-150 animate-pulse"></div>

            {/* The Floating Car Icon */}
            <div className="relative group transform hover:scale-110 transition-transform">
              <Car
                size={64}
                strokeWidth={1}
                fill="currentColor"
                className="text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]"
              />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md -z-10 animate-pulse"></div>
            </div>
          </motion.div>

          {/* Data trailing particles (static visual representation) */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-cyan-400 blur-[1px] shadow-[0_0_8px_rgb(34,211,238)] z-10"
            style={{ left: 0, width: `calc(${progress}% - 20px)` }}
          ></motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2 text-slate-900"><Info size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Ne pas débrancher</span></div>
        </div>
      </div>
    </div>
  );
};

export default ScanningScreen;
