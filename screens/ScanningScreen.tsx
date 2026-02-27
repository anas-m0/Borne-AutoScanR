
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockIssues } from '../services/mockData';
import { Car, ShieldCheck, Activity, Zap, Info, CheckCircle2 } from 'lucide-react';

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
    const intervalTime = 16;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        const newState = [...scanStates].reverse().find(s => next >= s.threshold);
        if (newState && newState.text !== currentMessage) {
          setCurrentMessage(newState.text);
        }
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(mockIssues.length), 1000);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, currentMessage]);

  return (
    <div className="min-h-[100dvh] md:min-h-full h-full flex flex-col items-center justify-between pt-4 px-8 relative overflow-hidden">

      {/* ── Element 1: Title + Car Scanner ── */}
      <div className="text-center z-10 w-full flex flex-col items-center shrink-0">

        {/* Title above car */}
        <h2 className="text-3xl font-heading font-bold text-brand-primary uppercase tracking-tight mb-2">
          Diagnostic en cours...
        </h2>

        {/* Car Image + Scan Effect */}
        <div className="relative mb-2 w-36 md:w-48 h-16 flex items-center justify-center overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-0 bg-brand-primary/8 blur-3xl rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <img
            src="/images/voiture-scan.png"
            alt="Voiture en cours de scan"
            className="relative z-10 w-full h-full object-contain scale-[0.88]"
          />
          {/* Scan-line texture */}
          <div
            className="absolute inset-0 z-[15] pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,148,183,1) 0px, rgba(0,148,183,1) 1px, transparent 1px, transparent 5px)' }}
          />
          {/* Analyzed zone */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none bg-brand-primary/10"
            animate={{ width: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Laser beam */}
          <motion.div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ width: 3 }}
            animate={{ left: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-white opacity-90" />
            <div className="absolute inset-0 bg-brand-primary shadow-[0_0_20px_8px_rgba(0,148,183,0.8),0_0_40px_16px_rgba(0,148,183,0.4)]" />
            <div className="absolute top-0 bottom-0 left-1/2 w-20 -translate-x-1/2 bg-brand-primary/20 blur-xl" />
          </motion.div>
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 z-40 w-5 h-5 border-l-2 border-t-2 border-brand-primary/60 rounded-tl-sm" />
          <div className="absolute top-2 right-2 z-40 w-5 h-5 border-r-2 border-t-2 border-brand-primary/60 rounded-tr-sm" />
          <div className="absolute bottom-2 left-2 z-40 w-5 h-5 border-l-2 border-b-2 border-brand-primary/60 rounded-bl-sm" />
          <div className="absolute bottom-2 right-2 z-40 w-5 h-5 border-r-2 border-b-2 border-brand-primary/60 rounded-br-sm" />
          {/* Pulse ripple */}
          <motion.div
            className="absolute inset-0 z-[25] border-2 border-brand-primary/30 rounded-2xl pointer-events-none"
            animate={{ opacity: [0, 0.6, 0], scale: [0.96, 1.02, 0.96] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Badge below car */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-4"
        >
          <Activity size={13} /> Diagnostic en cours
        </motion.div>
      </div>

      {/* ── Element 2: Ad Banner (Centered) ── */}
      <div className="flex-1 w-full flex items-center justify-center py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white rounded-[1.5rem] relative overflow-hidden flex shadow-lg border border-slate-200"
        >
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10">
            <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2">Partenaire Sécurité</span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-800 mb-3 leading-tight tracking-tight">
              Pneumatiques<br />
              <span className="text-brand-accent">-20% chez EuroMaster</span>
            </h3>
            <p className="text-slate-500 text-xs max-w-sm mb-6">
              Profitez de <strong className="text-slate-700">-20% sur la pose et l'équilibrage</strong> dans tous les centres EuroMaster.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <ShieldCheck size={16} className="text-brand-accent" />
                <span className="text-[10px] font-bold text-slate-900 uppercase">Pose certifiée</span>
              </div>
            </div>
          </div>
          <div className="w-1/3 relative">
            <img
              src="/images/pub-pneus.avif"
              alt="Pneus EuroMaster"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Element 3: Progress Bar + System Checks (Bottom) ── */}
      <div className="w-full max-w-4xl z-10 px-4 mt-auto shrink-0 pb-1">
        <div className="flex justify-between items-end mb-2">
          <AnimatePresence mode="wait">
            <motion.p key={currentMessage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-700 font-bold italic flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
              {currentMessage}
            </motion.p>
          </AnimatePresence>
          <span className="text-4xl font-heading font-black text-brand-primary leading-none">{Math.round(progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="relative mt-2 mb-4">
          <div className="h-6 w-full bg-slate-100 rounded-full border border-slate-200 shadow-inner overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)', backgroundSize: '20px 100%' }}></div>
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary/40 via-brand-primary to-cyan-400 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent blur-[2px]"></div>
            </motion.div>
          </div>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-[50%] z-20 flex flex-col items-center"
            style={{ left: `${progress}%` }}
          >
            <div className="absolute w-24 h-24 bg-brand-primary/20 rounded-full blur-xl scale-150 animate-pulse"></div>
            <div className="relative group transform hover:scale-110 transition-transform">
              <Car size={64} strokeWidth={1} fill="currentColor" className="text-brand-primary relative z-10 drop-shadow-[0_4px_10px_rgba(0,148,183,0.3)]" />
              <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-md -z-10 animate-pulse"></div>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-brand-primary/50 blur-[1px] shadow-[0_0_8px_rgba(0,148,183,0.5)] z-10"
            style={{ left: 0, width: `calc(${progress}% - 20px)` }}
          ></motion.div>
        </div>

        {/* System Checks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
          {[
            { id: 1, label: 'Moteur & Transmission', segStart: 0, threshold: 15 },
            { id: 2, label: 'Freinage ABS/ESP', segStart: 15, threshold: 35 },
            { id: 3, label: 'Sécurité passive', segStart: 35, threshold: 55 },
            { id: 4, label: 'Calcul. électroniques', segStart: 55, threshold: 75 },
          ].map((sys) => {
            const isDone = progress >= sys.threshold;
            const isLoading = !isDone && progress >= sys.segStart;
            const radius = 13;
            const circ = 2 * Math.PI * radius;
            return (
              <div
                key={sys.id}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all duration-500 ${isDone ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                  : isLoading ? 'bg-brand-primary/5 border-brand-primary/20'
                    : 'bg-white border-slate-100 opacity-50'
                  }`}
              >
                <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
                  {isDone ? (
                    <>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r={radius} fill="none" stroke="#10b981" strokeWidth="3" />
                      </svg>
                      <CheckCircle2 size={11} strokeWidth={2.5} className="relative z-10 text-emerald-500" />
                    </>
                  ) : isLoading ? (
                    <>
                      <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '0.9s' }} viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="16" cy="16" r={radius} fill="none" stroke="#0094b7" strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * 0.75} />
                      </svg>
                      <Zap size={10} strokeWidth={2} className="relative z-10 text-brand-primary animate-pulse" />
                    </>
                  ) : (
                    <>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      </svg>
                      <ShieldCheck size={10} strokeWidth={1.5} className="relative z-10 text-slate-300" />
                    </>
                  )}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 leading-tight ${isDone ? 'text-emerald-700'
                  : isLoading ? 'text-brand-primary'
                    : 'text-slate-400'
                  }`}>
                  {sys.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2 text-slate-900">
            <Info size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Ne pas débrancher le matériel</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ScanningScreen;
