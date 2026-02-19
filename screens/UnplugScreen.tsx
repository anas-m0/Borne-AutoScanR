
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { CheckCircle2, PowerOff, RotateCcw, Info, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const UnplugScreen: React.FC<Props> = ({ onComplete }) => {
  const [isHatchClosed, setIsHatchClosed] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsHatchClosed(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto min-h-full flex flex-col items-center justify-center px-10 py-16 text-center">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-primary mb-4">Récupération</h2>
        <p className="text-slate-500 text-xl font-light">Le scan est terminé, merci de libérer le matériel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center">
           <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 shadow-inner"><PowerOff size={40} /></div>
           <h3 className="text-2xl font-heading font-bold text-brand-primary mb-4">1. Débranchez</h3>
           <p className="text-slate-500 text-sm">Retirez le câble et coupez le contact du véhicule.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center">
           <div className="w-20 h-20 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 shadow-inner"><RotateCcw size={40} /></div>
           <h3 className="text-2xl font-heading font-bold text-brand-primary mb-4">2. Rangez</h3>
           <p className="text-slate-500 text-sm">Replacez le câble et refermez la trappe de la borne.</p>
        </div>
      </div>

      <div className="w-full max-w-md mb-12">
        <div className="flex justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capteur Trappe</span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${isHatchClosed ? 'text-green-600' : 'text-brand-accent'}`}>{isHatchClosed ? 'Verrouillée' : 'Détection...'}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div className={`h-full ${isHatchClosed ? 'bg-green-500' : 'bg-brand-primary'}`} initial={{ width: 0 }} animate={{ width: `${simulationProgress}%` }} />
        </div>
      </div>

      <Button variant={isHatchClosed ? "accent" : "outline"} onClick={onComplete} disabled={!isHatchClosed} className="px-20 py-6 text-xl">Continuer</Button>
    </div>
  );
};

export default UnplugScreen;
