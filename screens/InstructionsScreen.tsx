
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Cable, ArrowRight, PlayCircle, MapPin, PackageOpen, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  vehicleName?: string;
  onNext: () => void;
}

const InstructionsScreen: React.FC<Props> = ({ vehicleName = "votre véhicule", onNext }) => {
  const [step, setStep] = useState(0);

  // Example of how dynamic images/videos could be formatted from the vehicle name
  const vehicleSlug = vehicleName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const dynamicObdVideo = `/videos/obd-locations/${vehicleSlug}.mp4`; // Path to video in public folder

  const steps = [
    {
      title: "Récupération du câble",
      desc: <>Récupérez le <strong>câble</strong> dans la <strong>trappe</strong> de la <strong>borne</strong>.</>,
      icon: <PackageOpen className="w-24 h-24 md:w-32 md:h-32 text-brand-primary" />,
      details: [
        "La trappe s'est déverrouillée.",
        "Munissez-vous du câble avec l'embout OBD.",
        "Déroulez la longueur nécessaire."
      ]
    },
    {
      title: "Branchement OBD",
      desc: `Branchez le câble sur la prise OBD de votre ${vehicleName}.`,
      icon: <Cable className="w-24 h-24 md:w-32 md:h-32 text-brand-accent" />,
      video: dynamicObdVideo, // Fallback logic is handled in the render
      details: [
        <>Localisez la <strong>prise OBD</strong> sur votre véhicule.</>,
        <>Branchez le câble en faisant attention au <strong>sens de l'embout</strong>.</>,
        <>Un <span className="text-emerald-500 font-bold">témoin vert</span> s'allumera sur celui-ci si le branchement est <strong>correct</strong>.</>
      ]
    },
    {
      title: "Mise en contact",
      desc: "Mettez le contact de votre véhicule sans démarrer le moteur.",
      icon: <Key className="w-24 h-24 md:w-32 md:h-32 text-emerald-500" />,
      details: [
        "Insérez et tournez la clé ou appuyez sur 'Start'.",
        "Le tableau de bord doit s'allumer.",
        "Lancez le diagnostic."
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
    <div className="max-w-6xl mx-auto min-h-full flex flex-col items-center px-6 py-4 md:py-8">

      {/* Prettier Header & Stepper */}
      <div className="w-full max-w-3xl mb-16 md:mb-24">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3">Préparation du Diagnostic</span>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-[#071738] mb-2 tracking-tight">Connexion au véhicule</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto">Suivez ces 3 étapes pour relier la borne à votre voiture.</p>
        </div>

        {/* Premium Progress Tracker */}
        <div className="relative flex justify-between items-center w-full px-4 md:px-12">
          {/* Background Connecting Line */}
          <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-slate-100 rounded-full z-0" />
          {/* Active Connecting Line */}
          <div
            className="absolute left-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-brand-primary rounded-full z-0 transition-all duration-700 ease-in-out"
            style={{ width: `${(step / (steps.length - 1)) * 80}%` }}
          />

          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-500 shadow-sm border-2
                  ${i === step
                    ? 'bg-white border-brand-primary text-brand-primary scale-110 shadow-md shadow-brand-primary/20'
                    : i < step
                      ? 'bg-brand-primary border-brand-primary text-white'
                      : 'bg-white border-slate-200 text-slate-300'}`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span
                className={`hidden md:block absolute top-[130%] text-[10px] md:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300
                ${i === step ? 'text-brand-primary' : i < step ? 'text-slate-600' : 'text-slate-400'}`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl mx-auto pb-12"
        >
          {/* Visual Area */}
          <div className="w-full max-w-sm md:max-w-md shrink-0">
            <div className="relative aspect-square bg-slate-50 border border-slate-200 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-brand-primary/5 opacity-50 animate-pulse" />

              {/* Dynamic Video or Fallback Icon */}
              {step === 1 ? (
                <>
                  {/* Attempt to load the car specific video */}
                  <video
                    src={dynamicObdVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    style={{ backgroundColor: '#0f172a' }} // bg-slate-900 so letterboxing looks ok
                    onError={(e) => {
                      // If video fails to load, hide the video element and show the fallback div
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('obd-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />

                  {/* Fallback block (hidden by default unless video fails) */}
                  <div id="obd-fallback" className="absolute inset-0 hidden flex-col items-center justify-center bg-slate-50 z-20 p-4 text-center">
                    <MapPin className="text-slate-400 w-16 h-16 mb-2 md:mb-4" />
                    <p className="text-sm md:text-base text-slate-500 font-bold mb-1">Visuel de l'emplacement introuvable</p>
                    <p className="text-xs md:text-sm text-slate-400 block mb-6">{vehicleName}</p>
                    <div className="opacity-30 scale-100 md:scale-125">
                      {steps[step].icon}
                    </div>
                  </div>
                </>
              ) : (
                <div className="z-10 relative scale-110 md:scale-150 transform transition-transform duration-500">
                  {steps[step].icon}
                </div>
              )}
            </div>
          </div>

          {/* Text Instructions */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-brand-primary font-heading font-bold text-xs tracking-widest uppercase opacity-70 mb-2 block">Étape {step + 1} / {steps.length}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-primary mb-4 md:mb-6 leading-tight">{steps[step].title}</h2>
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
              {step > 0 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  className="sm:w-1/3 py-5 text-lg"
                  variant="outline"
                >
                  Retour
                </Button>
              )}
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
