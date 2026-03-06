
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
      video: '/videos/instructions/recuperation-cable.mp4',
      details: [
        <>La trappe s'est <strong>déverrouillée</strong>.</>,
        <>Munissez-vous du <strong>câble OBD</strong>.</>,
        <>Déroulez la longueur <strong>nécessaire</strong>.</>
      ]
    },
    {
      title: "Branchement OBD",
      desc: <>Branchez le <strong>câble</strong> à la <strong>prise OBD</strong> de votre <strong>{vehicleName}</strong>.</>,
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
      desc: <>Mettez le <strong>contact</strong> de votre véhicule <strong>sans démarrer le moteur</strong>.</>,
      icon: <Key className="w-24 h-24 md:w-32 md:h-32 text-emerald-500" />,
      video: '/videos/instructions/mise-en-contact.mp4',
      details: [
        <>Insérez et tournez la <strong>clé</strong> ou appuyez sur <strong>Start</strong> pour mettre le <strong>contact</strong>.</>,
        <>Le tableau de bord doit <strong>s'allumer</strong>.</>,
        <>Vous pouvez maintenant <strong>démarrer le diagnostic</strong>.</>
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
        <div className="text-center mb-4">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1">Préparation du Diagnostic</span>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-[#071738] mb-0.5 tracking-tight">Connexion au véhicule</h1>
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
          className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-5xl mx-auto pb-0"
        >
          {/* Visual Area */}
          <div className="w-full max-w-sm md:max-w-lg shrink-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] bg-slate-50 border border-slate-200 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-brand-primary/5 opacity-50 animate-pulse" />

              {/* Dynamic Video or Fallback Icon */}
              {steps[step].video ? (
                <>
                  {/* Attempt to load the step specific video */}
                  <video
                    src={steps[step].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full z-10 object-cover"
                    style={{ backgroundColor: '#ffffff' }} // White background for letterboxing
                    onError={(e) => {
                      // If video fails to load, hide the video element and show the fallback div
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('media-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />

                  {/* Fallback block (hidden by default unless video fails) */}
                  <div id="media-fallback" className="absolute inset-0 hidden flex-col items-center justify-center bg-slate-50 z-20 p-4 text-center">
                    <div className="opacity-30 scale-100 md:scale-125 mb-4">
                      {steps[step].icon}
                    </div>
                    <p className="text-sm md:text-base text-slate-500 font-bold mb-1">Visuel introuvable</p>
                    {step === 1 && <p className="text-xs md:text-sm text-slate-400 block mb-2">{vehicleName}</p>}
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
          <div className="flex-1 text-center lg:text-left flex flex-col justify-center">
            <span className="text-brand-primary font-heading font-bold text-[10px] md:text-xs tracking-widest uppercase opacity-70 mb-1 block">Étape {step + 1} / {steps.length}</span>
            <h2 className="text-4xl md:text-5xl font-body font-bold text-brand-primary mb-2 md:mb-3 leading-tight w-full">{steps[step].title}</h2>
            <p className="text-base md:text-lg text-slate-500 mb-4 w-full">{steps[step].desc}</p>

            <div className="space-y-2 mb-6">
              {steps[step].details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-6 h-6 shrink-0 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">{idx + 1}</div>
                  <span className="text-slate-700 text-sm md:text-base font-medium">{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {step > 0 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  className="sm:w-1/3 py-3 text-lg md:text-xl !font-body whitespace-nowrap"
                  variant="outline"
                >
                  Retour
                </Button>
              )}
              <Button
                onClick={handleStepAction}
                className="flex-1 py-3 text-lg md:text-xl !font-body whitespace-nowrap"
                variant={step === steps.length - 1 ? 'accent' : 'primary'}
                icon={step === steps.length - 1 ? <PlayCircle size={22} /> : <ArrowRight size={22} />}
              >
                {step === steps.length - 1 ? 'Démarrer' : 'Étape suivante'}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InstructionsScreen;
