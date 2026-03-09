
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStep, Garage } from './types';
import { Logo } from './components/Logo';
import { ChevronLeft, HelpCircle, X, HeartHandshake, CheckCircle, ShieldCheck, Phone, Info, Mail } from 'lucide-react';
import { mockGarages } from './services/mockData';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import VehicleSelectScreen from './screens/VehicleSelectScreen';
import PaymentImprintScreen from './screens/PaymentImprintScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import ScanningScreen from './screens/ScanningScreen';
import UnplugScreen from './screens/UnplugScreen';
import PlanSelectionScreen from './screens/PlanSelectionScreen';
import ResultsScreen from './screens/ResultsScreen';
import CollectContactScreen from './screens/CollectContactScreen';
import MapScreen from './screens/MapScreen';
import BookingScreen from './screens/BookingScreen';
import SendReportScreen from './screens/SendReportScreen';
import GoodbyeScreen from './screens/GoodbyeScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';

// Components
import { Button } from './components/Button';
import { Clock } from './components/Clock';
import { KeyboardProvider } from './components/KeyboardContext';
import VirtualKeyboard from './components/VirtualKeyboard';

const BackgroundElements = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1], x: [0, 50, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05], x: [0, -30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[80px]"
    />
  </div>
);

const FinalSuccessScreen = ({ onRestart, action }: { onRestart: () => void; action: 'BOOKED' | 'REPORT_SENT' | 'NONE' }) => {
  const title = action === 'BOOKED' ? 'Rendez-vous Confirmé !'
    : action === 'REPORT_SENT' ? 'Demandes Envoyées !'
      : 'Diagnostic Terminé';

  const message = action === 'BOOKED' ? (
    <>Scannez ce QR code pour emporter votre <strong className="text-brand-primary">rapport détaillé</strong> et les informations de votre <strong className="text-brand-accent">rendez-vous</strong> sur votre mobile.</>
  ) : action === 'REPORT_SENT' ? (
    <>Scannez ce QR code pour emporter votre <strong className="text-brand-primary">rapport détaillé</strong>. Les garages sélectionnés vous contacteront <strong className="text-brand-accent">très rapidement</strong>.</>
  ) : (
    <>Scannez ce QR code pour conserver votre <strong className="text-brand-primary">rapport détaillé</strong> sur votre mobile et le consulter à tout moment.</>
  );

  const socials = [
    {
      label: 'Instagram', color: '#E1306C',
      href: 'https://instagram.com/autoscanr',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
      ),
    },
    {
      label: 'Facebook', color: '#1877F2',
      href: 'https://facebook.com/autoscanr',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.418c0-3.027 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.932-1.956 1.888v2.258h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
      ),
    },
    {
      label: 'LinkedIn', color: '#0A66C2',
      href: 'https://linkedin.com/company/autoscanr',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
      ),
    },
    {
      label: 'TikTok', color: '#000000',
      href: 'https://tiktok.com/@autoscanr',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
      ),
    },
  ];

  return (
    <div className="min-h-full flex items-center justify-center px-6 py-8 relative z-10 w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/95 backdrop-blur-2xl rounded-[3rem] w-full shadow-2xl shadow-brand-primary/10 border border-white overflow-hidden"
      >
        {/* ── Header band ── */}
        <div className="relative bg-gradient-to-r from-brand-primary to-brand-secondary px-10 py-8 flex items-center gap-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', damping: 12 }}
            className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 backdrop-blur-sm"
          >
            <CheckCircle className="w-9 h-9 text-white" />
          </motion.div>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-white/70 text-xs font-black uppercase tracking-[0.25em] mb-1">Session terminée</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">{title}</h2>
          </motion.div>
        </div>

        <div className="p-8 md:p-10">

          {/* ── Two QR columns ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {/* Report QR */}
            <div className="flex flex-col items-center gap-4 bg-slate-50 rounded-[1.75rem] p-7 border border-slate-100">
              <div className="flex flex-col items-center gap-1 w-full">
                <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.25em]">Votre rapport</span>
                <h3 className="text-lg font-black text-brand-dark">Scannez pour emporter</h3>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-2xl blur-xl scale-110" />
                <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fautoscanr.fr%2Frapport%2F12345&color=0-120-200"
                    alt="QR Code rapport"
                    className="w-36 h-36 object-contain"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center leading-relaxed">{message}</p>
            </div>

            {/* Website QR + Socials */}
            <div className="flex flex-col items-center gap-4 bg-brand-dark rounded-[1.75rem] p-7 border border-brand-dark/50">
              <div className="flex flex-col items-center gap-1 w-full">
                <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.25em]">Notre site</span>
                <h3 className="text-lg font-black text-white">autoscanr.fr</h3>
              </div>
              <div className="relative">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fautoscanr.fr"
                    alt="QR Code site"
                    className="w-36 h-36 object-contain"
                  />
                </div>
              </div>
              <p className="text-xs text-white/50 text-center">Découvrez tous nos services</p>
            </div>
          </motion.div>

          {/* ── Social row ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Retrouvez-nous</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all"
                >
                  <span style={{ color: s.color }}>{s.icon}</span>
                  <span className="text-sm font-black text-brand-dark">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Button
              variant="primary"
              onClick={onRestart}
              className="w-full py-5 text-2xl !font-body uppercase shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Quitter la session
            </Button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};


const HelpModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-white w-full max-w-md md:max-w-lg rounded-[2rem] p-8 md:p-10 relative shadow-2xl overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 bg-slate-50 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
      >
        <X size={20} strokeWidth={2.5} />
      </button>

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 shadow-sm">
          <HelpCircle size={24} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-black font-body text-brand-dark tracking-tight">Besoin d'aide ?</h3>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex gap-4 items-start group">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:border-brand-primary/30 transition-colors shrink-0">
            <Info size={16} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-brand-dark mb-1 text-base">Connexion de la borne</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Mettez simplement le contact (voyants allumés) sans démarrer le moteur. Assurez-vous que le câble est bien enfoncé.</p>
          </div>
        </div>

        <div className="flex gap-4 items-start group">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-colors shrink-0">
            <ShieldCheck size={16} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-brand-dark mb-1 text-base">Paiement 100% sécurisé</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Rien n'est débité tant que le diagnostic n'est pas terminé. Vous recevez un reçu instantanément.</p>
          </div>
        </div>

        <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-5 mt-8 flex flex-col items-center text-center">
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm">
              <Phone size={18} strokeWidth={2.5} className="animate-pulse" />
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm">
              <Mail size={18} strokeWidth={2.5} />
            </div>
          </div>
          <h4 className="font-black text-brand-dark text-lg mb-1">Assistance immédiate</h4>
          <p className="text-slate-500 text-sm mb-4">Notre équipe technique est à votre écoute.</p>
          <div className="space-y-1">
            <a href="tel:0800123456" className="block text-xl md:text-2xl font-black text-brand-primary tracking-wider hover:text-brand-dark transition-colors">
              0800 123 456
            </a>
            <a href="mailto:support@autoscanr.fr" className="block text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors">
              support@autoscanr.fr
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <Button variant="primary" className="w-full py-4 text-lg !font-body uppercase shadow-md shadow-brand-primary/20" onClick={onClose}>
          Fermer
        </Button>
      </div>
    </motion.div>
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.WELCOME);
  const [vehicleInfo, setVehicleInfo] = useState<string>('');
  const [issuesCount, setIssuesCount] = useState<number>(0);
  const [selectedGarageId, setSelectedGarageId] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [finalAction, setFinalAction] = useState<'BOOKED' | 'REPORT_SENT' | 'NONE'>('NONE');
  const [promoApplied, setPromoApplied] = useState(false);

  const stepsList = Object.values(AppStep);
  const currentStepIndex = stepsList.indexOf(currentStep);
  const progressPercent = Math.min(((currentStepIndex) / (stepsList.length - 2)) * 100, 100);

  const goBack = () => {
    switch (currentStep) {
      case AppStep.HOW_IT_WORKS: setCurrentStep(AppStep.WELCOME); break;
      case AppStep.VEHICLE_SELECT: setCurrentStep(AppStep.HOW_IT_WORKS); break;
      case AppStep.PAYMENT_IMPRINT: setCurrentStep(AppStep.VEHICLE_SELECT); break;
      case AppStep.INSTRUCTIONS: setCurrentStep(AppStep.PAYMENT_IMPRINT); break;
      case AppStep.UNPLUG: setCurrentStep(AppStep.SCANNING); break;
      case AppStep.PLAN_SELECTION: setCurrentStep(AppStep.UNPLUG); break;
      case AppStep.RESULTS: setCurrentStep(AppStep.PLAN_SELECTION); break;
      case AppStep.COLLECT_CONTACT: setCurrentStep(AppStep.RESULTS); break;
      case AppStep.MAP: setCurrentStep(AppStep.COLLECT_CONTACT); break;
      case AppStep.BOOKING: setCurrentStep(AppStep.MAP); break;
      case AppStep.SEND_REPORT: setCurrentStep(AppStep.MAP); break;
      default: break;
    }
  };

  const getSelectedGarage = (): Garage | undefined => {
    return mockGarages.find(g => g.id === selectedGarageId);
  }

  const renderScreen = () => {
    switch (currentStep) {
      case AppStep.WELCOME: return <WelcomeScreen onStart={() => setCurrentStep(AppStep.HOW_IT_WORKS)} />;
      case AppStep.HOW_IT_WORKS: return <HowItWorksScreen onContinue={() => setCurrentStep(AppStep.VEHICLE_SELECT)} />;
      case AppStep.VEHICLE_SELECT: return <VehicleSelectScreen onVehicleFound={(info) => { setVehicleInfo(info); setCurrentStep(AppStep.PAYMENT_IMPRINT); }} />;
      case AppStep.PAYMENT_IMPRINT: return <PaymentImprintScreen onAuthorized={() => setCurrentStep(AppStep.INSTRUCTIONS)} onPromoApplied={(applied) => setPromoApplied(applied)} />;
      case AppStep.INSTRUCTIONS: return <InstructionsScreen vehicleName={vehicleInfo} onNext={() => setCurrentStep(AppStep.SCANNING)} />;
      case AppStep.SCANNING: return <ScanningScreen onComplete={(count) => { setIssuesCount(count); setCurrentStep(AppStep.UNPLUG); }} />;
      case AppStep.UNPLUG: return <UnplugScreen onComplete={() => setCurrentStep(AppStep.PLAN_SELECTION)} />;
      case AppStep.PLAN_SELECTION: return <PlanSelectionScreen issuesCount={issuesCount} promoApplied={promoApplied} onPlanSelected={() => setCurrentStep(AppStep.RESULTS)} />;
      case AppStep.RESULTS: return <ResultsScreen vehicleName={vehicleInfo} onReceiveReport={() => setCurrentStep(AppStep.COLLECT_CONTACT)} />;
      case AppStep.COLLECT_CONTACT: return <CollectContactScreen onComplete={() => setCurrentStep(AppStep.MAP)} />;
      case AppStep.MAP: return <MapScreen onBook={(garageId) => { setSelectedGarageId(garageId); setCurrentStep(AppStep.BOOKING); }} onSendReport={() => setCurrentStep(AppStep.SEND_REPORT)} />;
      case AppStep.BOOKING:
        const garage = getSelectedGarage();
        if (!garage) return null;
        return <BookingScreen garage={garage} onComplete={() => { setFinalAction('BOOKED'); setCurrentStep(AppStep.FINAL_SUCCESS); }} onBack={goBack} />;
      case AppStep.SEND_REPORT: return <SendReportScreen onComplete={(actionType) => { setFinalAction(actionType || 'NONE'); setCurrentStep(AppStep.FINAL_SUCCESS); }} onBack={goBack} />;
      case AppStep.FINAL_SUCCESS: return <FinalSuccessScreen action={finalAction} onRestart={() => setCurrentStep(AppStep.GOODBYE)} />;
      case AppStep.GOODBYE: return <GoodbyeScreen onComplete={() => setCurrentStep(AppStep.WELCOME)} />;
      default: return null;
    }
  };

  const showHeader = currentStep !== AppStep.WELCOME && currentStep !== AppStep.FINAL_SUCCESS && currentStep !== AppStep.GOODBYE;
  const showBackBtn = showHeader;

  return (
    <KeyboardProvider>
      <div className="min-h-screen bg-brand-light text-slate-800 flex flex-col relative font-body selection:bg-brand-primary/10">

        <BackgroundElements />

        {/* Header */}
        <header className={`relative z-50 px-6 md:px-10 py-6 md:py-8 flex flex-col transition-all duration-500 shrink-0 ${showHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none absolute w-full'}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4 md:gap-8">
              {showBackBtn && (
                <button
                  onClick={goBack}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass-button flex items-center justify-center text-slate-400 hover:text-brand-primary hover:scale-105"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <div className="scale-75 md:scale-90 origin-left">
                <Logo size="sm" />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <Clock />
              <button
                onClick={() => setShowHelp(true)}
                className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl glass-button text-slate-500 text-xs md:text-sm font-bold hover:text-brand-primary transition-all"
              >
                <HelpCircle size={18} />
                <span>Aide</span>
              </button>
            </div>
          </div>

          {showHeader && (
            <div className="w-full h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-[0_0_15px_rgba(0,163,255,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "circOut" }}
              />
            </div>
          )}
        </header>

        <main className="flex-1 relative z-10 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 w-full flex flex-col h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {currentStep === AppStep.WELCOME && (
          <footer className="shrink-0 py-3 w-full text-center text-slate-400 text-[10px] md:text-xs z-10 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
            <HeartHandshake size={16} className="text-brand-primary/40" />
            <p>Expertise technologique au service de votre sérénité</p>
          </footer>
        )}

        <AnimatePresence>
          {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        </AnimatePresence>

        <VirtualKeyboard />
      </div>
    </KeyboardProvider>
  );
}
