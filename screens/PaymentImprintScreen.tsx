import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { CreditCard, Lock, ShieldCheck, Wifi, Check, Tag, Ticket, Info, PlayCircle, BookOpen, AlertCircle, Activity, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onAuthorized: () => void;
}

const PaymentImprintScreen: React.FC<Props> = ({ onAuthorized }) => {
  const [processing, setProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => onAuthorized(), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col justify-center px-6 py-12 md:px-10 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-4">Lancement du Service</h2>
        <p className="text-slate-500 text-sm md:text-lg">Une empreinte bancaire est requise pour démarrer l'analyse de votre véhicule.</p>
      </div>

      <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto">
        {/* Top Block: Diagnostic AutoScanR */}
        <div className="w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col gap-8 md:gap-10">
          {/* Row 1: Title */}
          <div className="flex justify-center items-center pb-6 border-b border-slate-100">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 flex items-center gap-3">
              Diagnostic <Logo size="sm" />
            </h3>
          </div>

          {/* Row 2: Features */}
          <div className="w-full">
            <p className="text-sm md:text-base text-center text-slate-500 mb-8 font-medium">Ce que vous obtenez avec ce service :</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureItem
                icon={<Activity size={24} className="text-brand-primary" />}
                title="Analyse complète du véhicule"
                desc="Examen approfondi de tous les calculateurs électroniques."
              />
              <FeatureItem
                icon={<FileText size={24} className="text-brand-primary" />}
                title="Rapport de diagnostic clair"
                desc="Un document vulgarisé et simple à comprendre pour tous."
              />
              <FeatureItem
                icon={<PlayCircle size={24} className="text-brand-primary" />}
                title="Accès aux médias explicatifs"
                desc="Vidéos, BDs et articles pour comprendre chaque problème."
              />
            </div>
          </div>

          {/* Row 3: Price & Promo */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-6">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total à régler</span>
              <span className="text-4xl md:text-5xl font-heading font-black text-brand-primary">19,90€</span>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-2 min-w-[280px]">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Code promotionnel</h4>
              <div className="flex gap-2">
                <input type="text" placeholder="CODE PROMO" className="flex-1 max-w-[200px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all uppercase" />
                <Button variant="outline" className="py-3 px-6 text-xs whitespace-nowrap !bg-white">Appliquer</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Block: Zero Risk Guarantee Box */}
        <div className="w-full bg-emerald-50 border border-emerald-200 rounded-[2rem] p-6 md:p-8 flex gap-4 md:gap-6 shadow-sm items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-emerald-600 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-emerald-800 font-bold mb-1 text-lg">Passage sans risque</h4>
            <p className="text-emerald-700/80 text-sm leading-relaxed">
              Cette étape réalise <strong>uniquement une empreinte bancaire</strong>. Aucun débit ne sera effectué avant la réussite totale de l'analyse. <span className="underline font-bold">Si le processus échoue, vous ne paierez rien.</span>
            </p>
          </div>
        </div>

        {/* Bottom Block: Payment Terminal Simulator */}
        <div className="w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border-4 border-brand-primary/10 flex flex-col md:flex-row items-center justify-center md:justify-between relative overflow-hidden min-h-[300px] gap-10">
          <div className="flex-1 z-10 relative flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h4 className="text-2xl font-bold text-slate-800 mb-4">Autorisation bancaire</h4>
            <p className="text-slate-500 mb-8 max-w-sm">Insérez votre carte ou approchez-la sous l'écran du terminal sans contact.</p>
            <Button onClick={handleSimulatePayment} variant="accent" className="w-full md:w-auto py-5 px-10 text-lg shadow-lg" isLoading={processing}>Simuler l'empreinte</Button>
          </div>

          <div className="flex-1 flex flex-col items-center z-10 relative w-full max-w-[300px]">
            {processing ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mx-auto mb-6" />
                <p className="text-xl font-heading font-bold text-brand-dark">Vérification de la carte...</p>
                <p className="text-xs text-slate-500 mt-2">Veuillez patienter quelques instants</p>
              </div>
            ) : (
              <>
                <Wifi size={48} className="text-brand-primary mb-8 rotate-90 animate-pulse" />
                <div className="w-full aspect-[1.6/1] bg-slate-900 rounded-2xl p-6 shadow-2xl relative mx-auto transform transition-transform hover:scale-105 duration-300">
                  <div className="w-10 h-7 bg-amber-400/50 rounded-md mb-6" />
                  <div className="text-white/20 font-mono tracking-widest text-base md:text-lg mb-4">**** **** **** ****</div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Sans Contact</span>
                    <CreditCard className="text-white/20 w-5 h-5" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Background design element */}
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full z-0 pointer-events-none hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center gap-3">
    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-slate-800 font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-snug">{desc}</p>
    </div>
  </div>
);

export default PaymentImprintScreen;
