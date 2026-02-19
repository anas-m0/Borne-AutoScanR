
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Cable, ArrowRight, Zap, PlayCircle, MapPin, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  vehicleName?: string;
  onNext: () => void;
}

const InstructionsScreen: React.FC<Props> = ({ vehicleName = "votre véhicule", onNext }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Localisation OBD",
      desc: `Localisez la prise OBD dans votre ${vehicleName}.`,
      icon: <MapPin className="w-24 h-24 md:w-32 md:h-32 text-brand-primary" />,
      details: [
        "Souvent sous le volant, à gauche.",
        "Parfois derrière un cache plastique.",
        "Proche des fusibles intérieurs."
      ]
    },
    {
      title: "Branchement",
      desc: "Connectez le câble et mettez le contact sans démarrer.",
      icon: <Cable className="w-24 h-24 md:w-32 md:h-32 text-brand-accent" />,
      details: [
        "Branchez fermement le connecteur.",
        "Mettez le contact (bouton Start ou Clé).",
        "Vérifiez l'allumage du tableau de bord."
      ]
    }
  ];

  const handleStepAction = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col items-center px-6 py-8 md:py-16">

      {/* Progress Indicators */}
      <div className="flex gap-4 mb-8 md:mb-12">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-16 md:w-24 bg-brand-primary' : i < step ? 'w-8 md:w-12 bg-green-500' : 'w-4 md:w-6 bg-slate-200'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 w-full pb-12"
        >
          {/* Visual Area */}
          <div className="w-full max-w-sm">
            <div className="relative aspect-square bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-brand-primary/5 opacity-50 animate-pulse" />
              {step === 0 ? <MapPin className="w-24 h-24 text-brand-primary" /> : <Cable className="w-24 h-24 text-brand-accent" />}
            </div>
          </div>

          {/* Text Instructions */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-brand-primary font-heading font-bold text-xs tracking-widest uppercase opacity-70 mb-2 block">Étape {step + 1} / 2</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark mb-4 md:mb-6 leading-tight">{steps[step].title}</h2>
            <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-xl">{steps[step].desc}</p>

            <div className="space-y-3 mb-10">
              {steps[step].details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-6 h-6 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">{idx + 1}</div>
                  <span className="text-slate-700 text-sm md:text-base font-medium">{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStepAction}
                className="flex-1 py-5 text-lg"
                variant={step === steps.length - 1 ? 'accent' : 'primary'}
                icon={step === steps.length - 1 ? <PlayCircle /> : <ArrowRight />}
              >
                {step === steps.length - 1 ? 'Démarrer le Scan' : 'Étape suivante'}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InstructionsScreen;
