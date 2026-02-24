
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { PowerOff, RotateCcw, CheckCircle2, LockKeyhole, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const UnplugScreen: React.FC<Props> = ({ onComplete }) => {
  const [isHatchClosed, setIsHatchClosed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto min-h-full flex flex-col items-center justify-center px-10 py-16 text-center">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-primary mb-4">Récupération</h2>
        <p className="text-slate-500 text-xl font-light">Le scan est terminé, merci de libérer le matériel.</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 shadow-inner">
            <PowerOff size={40} />
          </div>
          <h3 className="text-2xl font-heading font-bold text-brand-primary mb-4">1. Débranchez</h3>
          <p className="text-slate-500 text-sm">Coupez le contact du véhicule et débranchez le câble.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 shadow-inner">
            <RotateCcw size={40} />
          </div>
          <h3 className="text-2xl font-heading font-bold text-brand-primary mb-4">2. Rangez</h3>
          <p className="text-slate-500 text-sm">Replacez le câble et refermez la trappe de la borne.</p>
        </div>
      </div>

      {/* Hatch status indicator */}
      <div className="w-full max-w-md mb-10">
        <AnimatePresence mode="wait">
          {!isHatchClosed ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <AlertCircle size={28} className="text-amber-500 shrink-0" />
              </motion.div>
              <div className="text-left">
                <p className="text-sm font-black text-amber-700 uppercase tracking-widest">En attente</p>
                <p className="text-xs text-amber-600 mt-0.5">La trappe n'est pas encore fermée</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-4"
            >
              <CheckCircle2 size={28} className="text-emerald-500 shrink-0" />
              <div className="text-left">
                <p className="text-sm font-black text-emerald-700 uppercase tracking-widest">Trappe verrouillée</p>
                <p className="text-xs text-emerald-600 mt-0.5">Vous pouvez continuer</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simulation button — small, discreet */}
        {!isHatchClosed && (
          <button
            onClick={() => setIsHatchClosed(true)}
            className="mt-4 flex items-center gap-1.5 mx-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          >
            <LockKeyhole size={11} />
            Simuler fermeture trappe
          </button>
        )}
      </div>

      <Button
        variant={isHatchClosed ? 'accent' : 'outline'}
        onClick={onComplete}
        disabled={!isHatchClosed}
        className="px-20 py-6 text-xl"
      >
        Continuer
      </Button>
    </div>
  );
};

export default UnplugScreen;
