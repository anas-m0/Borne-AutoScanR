
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStep, Garage } from './types';
import { Logo } from './components/Logo';
import { ChevronLeft, HelpCircle, X, HeartHandshake } from 'lucide-react';
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

// Components
import { Button } from './components/Button';

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

const FinalSuccessScreen = ({ onRestart }: { onRestart: () => void }) => (
  <div className="min-h-full flex flex-col items-center justify-center text-center px-6 py-12">
    <div className="bg-white rounded-[3rem] p-12 max-w-2xl w-full flex flex-col items-center shadow-xl border border-slate-100">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-3xl mb-10 shadow-lg border border-slate-50"
      >
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AutoScanR-Report-12345" alt="QR Code" className="w-48 h-48" />
      </motion.div>
      
      <h2 className="text-4xl font-heading font-bold text-brand-dark mb-4">Diagnostic Terminé</h2>
      <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
        Merci de votre confiance. Scannez ce code pour emporter votre rapport et votre rendez-vous sur votre mobile.
      </p>
      
      <Button variant="primary" onClick={onRestart} className="px-16 py-6 text-xl">
        Quitter la session
      </Button>
      <p className="mt-6 text-xs text-slate-400 font-medium">Réinitialisation automatique dans 30s.</p>
    </div>
  </div>
);

const HelpModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white w-full max-w-lg rounded-3xl p-10 relative shadow-2xl border border-white"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
        <X size={28} />
      </button>
      <h3 className="text-2xl font-heading font-bold text-brand-primary mb-8 flex items-center gap-3">
        <HelpCircle size={32} /> Centre d'aide
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-brand-dark mb-1">Connexion OBD</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Mettez simplement le contact (voyants allumés) sans démarrer le moteur. Le câble doit être bien enfoncé.</p>
        </div>
        <div>
          <h4 className="font-bold text-brand-dark mb-1">Paiement & Empreinte</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Rien n'est débité tant que le scan n'a pas réussi. Vous recevez un reçu instantanément.</p>
        </div>
        <div>
          <h4 className="font-bold text-brand-dark mb-1">Support Client</h4>
          <p className="text-slate-500 text-sm leading-relaxed font-bold font-heading">Appelez le 0800 123 456 pour une assistance immédiate.</p>
        </div>
      </div>
      <div className="mt-10">
        <Button variant="primary" className="w-full py-5" onClick={onClose}>J'ai compris</Button>
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

  const stepsList = Object.values(AppStep);
  const currentStepIndex = stepsList.indexOf(currentStep);
  const progressPercent = Math.min(((currentStepIndex) / (stepsList.length - 2)) * 100, 100);

  const goBack = () => {
    switch (currentStep) {
      case AppStep.VEHICLE_SELECT: setCurrentStep(AppStep.WELCOME); break;
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
      case AppStep.WELCOME: return <WelcomeScreen onStart={() => setCurrentStep(AppStep.VEHICLE_SELECT)} />;
      case AppStep.VEHICLE_SELECT: return <VehicleSelectScreen onVehicleFound={(info) => { setVehicleInfo(info); setCurrentStep(AppStep.PAYMENT_IMPRINT); }} />;
      case AppStep.PAYMENT_IMPRINT: return <PaymentImprintScreen onAuthorized={() => setCurrentStep(AppStep.INSTRUCTIONS)} />;
      case AppStep.INSTRUCTIONS: return <InstructionsScreen vehicleName={vehicleInfo} onNext={() => setCurrentStep(AppStep.SCANNING)} />;
      case AppStep.SCANNING: return <ScanningScreen onComplete={(count) => { setIssuesCount(count); setCurrentStep(AppStep.UNPLUG); }} />;
      case AppStep.UNPLUG: return <UnplugScreen onComplete={() => setCurrentStep(AppStep.PLAN_SELECTION)} />;
      case AppStep.PLAN_SELECTION: return <PlanSelectionScreen issuesCount={issuesCount} onPlanSelected={() => setCurrentStep(AppStep.RESULTS)} />;
      case AppStep.RESULTS: return <ResultsScreen vehicleName={vehicleInfo} onReceiveReport={() => setCurrentStep(AppStep.COLLECT_CONTACT)} />;
      case AppStep.COLLECT_CONTACT: return <CollectContactScreen onComplete={() => setCurrentStep(AppStep.MAP)} />;
      case AppStep.MAP: return <MapScreen onBook={(garageId) => { setSelectedGarageId(garageId); setCurrentStep(AppStep.BOOKING); }} onSendReport={() => setCurrentStep(AppStep.SEND_REPORT)} />;
      case AppStep.BOOKING: 
        const garage = getSelectedGarage();
        if (!garage) return null;
        return <BookingScreen garage={garage} onComplete={() => setCurrentStep(AppStep.FINAL_SUCCESS)} onBack={goBack} />;
      case AppStep.SEND_REPORT: return <SendReportScreen onComplete={() => setCurrentStep(AppStep.FINAL_SUCCESS)} onBack={goBack} />;
      case AppStep.FINAL_SUCCESS: return <FinalSuccessScreen onRestart={() => setCurrentStep(AppStep.WELCOME)} />;
      default: return null;
    }
  };

  const showHeader = currentStep !== AppStep.WELCOME && currentStep !== AppStep.FINAL_SUCCESS;
  const showBackBtn = showHeader && currentStep !== AppStep.SCANNING;

  return (
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
          
          <button 
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl glass-button text-slate-500 text-xs md:text-sm font-bold hover:text-brand-primary transition-all"
          >
            <HelpCircle size={18} />
            <span>Aide</span>
          </button>
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
        <footer className="shrink-0 py-6 w-full text-center text-slate-400 text-[10px] md:text-xs z-10 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
           <HeartHandshake size={16} className="text-brand-primary/40" />
           <p>Expertise technologique au service de votre sérénité</p>
        </footer>
      )}

      <AnimatePresence>
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      </AnimatePresence>
    </div>
  );
}
