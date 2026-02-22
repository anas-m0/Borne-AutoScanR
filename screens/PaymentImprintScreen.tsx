import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { CreditCard, Lock, ShieldCheck, Wifi, Check, Tag, Ticket, Info, PlayCircle, BookOpen, AlertCircle, Activity, FileText, Wrench } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto min-h-full flex flex-col justify-center px-4 py-2 md:px-8 md:py-4">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#071738] mb-1 md:mb-2">Lancement du Service</h2>
        <p className="text-slate-500 text-sm md:text-base">Une empreinte bancaire est requise pour démarrer l'analyse de votre véhicule.</p>
      </div>

      {/* Zero Risk Guarantee Box (Moved Up) */}
      {/* Box and Container */}
      <div className="w-full max-w-4xl mx-auto bg-emerald-50 border border-emerald-200 rounded-[2rem] p-3 md:px-5 flex gap-3 shadow-sm items-center mb-4 md:mb-6">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <ShieldCheck className="text-emerald-600 w-4 h-4" />
        </div>
        <div>
          <h4 className="text-emerald-800 font-bold mb-0 text-sm md:text-base">Passage sans risque</h4>
          <p className="text-emerald-700/80 text-xs md:text-sm leading-relaxed">
            Aucun débit ne sera effectué avant la fin du processus. <span className="font-bold">Si le processus n'arrive pas à sa fin, vous ne paierez rien.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-5xl mx-auto lg:items-center">
        {/* Left Block: Diagnostic AutoScanR */}
        <div className="flex-1 bg-white p-4 md:p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col justify-between">
          <div>
            {/* Row 1: Title */}
            <div className="flex justify-center items-center pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg md:text-xl font-heading font-bold text-[#0094B7] flex items-center gap-2">
                Diagnostic <Logo size="sm" />
              </h3>
            </div>

            {/* Row 2: Features */}
            <div className="w-full mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FeatureItem
                  icon={<Activity size={20} className="text-brand-primary" />}
                  title="Analyse complète du véhicule"
                  desc="Examen approfondi des calculateurs électroniques."
                />
                <FeatureItem
                  icon={<FileText size={20} className="text-brand-primary" />}
                  title="Rapport de diagnostic clair"
                  desc="Un document vulgarisé, simple à comprendre."
                />
                <FeatureItem
                  icon={<PlayCircle size={20} className="text-brand-primary" />}
                  title="Médias explicatifs"
                  desc="Vidéos, BDs pour comprendre chaque problème."
                />
                <FeatureItem
                  icon={<Wrench size={20} className="text-brand-primary" />}
                  title="Réparateurs de confiance"
                  desc="Mise en relation pour réparer sereinement."
                />
              </div>
            </div>
          </div>

          {/* Row 3: Price & Promo */}
          <div className="flex flex-col xl:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-4 mt-auto">
            <div className="flex flex-col justify-center text-center xl:text-left pt-2 mt-1">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total à régler</span>
              <span className="text-4xl md:text-5xl font-heading font-black text-brand-primary leading-none tracking-tight">19,90€</span>
            </div>

            <div className="w-full xl:w-auto flex flex-col gap-2 min-w-[240px]">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 text-center xl:text-left">Code promo</h4>
              <div className="flex gap-2 w-full">
                <input type="text" placeholder="CODE" className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all uppercase" />
                <Button variant="outline" className="py-3 px-4 text-xs whitespace-nowrap !bg-white">Appliquer</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Block: Payment Terminal Simulator */}
        <div className="w-full lg:w-[40%] bg-white p-4 md:p-6 rounded-[2rem] shadow-2xl border-4 border-brand-primary/10 flex flex-col items-center justify-between relative overflow-hidden gap-4">
          <div className="flex-1 flex flex-col items-center justify-center z-10 relative w-full pt-2">
            {processing ? (
              <div className="text-center my-auto">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mx-auto mb-6" />
                <p className="text-xl font-heading font-bold text-brand-dark">Vérification...</p>
                <p className="text-xs text-slate-500 mt-2">Veuillez patienter</p>
              </div>
            ) : (
              <div className="flex flex-col items-center my-auto w-full max-w-[200px]">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-[10px] font-bold mb-3 border border-emerald-200">
                  <Lock size={10} />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <Wifi size={32} className="text-brand-primary mb-3 rotate-90 animate-pulse" />
                <div className="w-full aspect-[1.6/1] bg-slate-900 rounded-xl p-4 shadow-2xl relative transform transition-transform hover:scale-105 duration-300">
                  <div className="w-8 h-5 bg-amber-400/50 rounded-md mb-3" />
                  <div className="text-white/20 font-mono tracking-widest text-xs mb-3 text-center">**** **** **** ****</div>
                  <div className="flex justify-between items-center mt-auto absolute bottom-3 left-4 right-4">
                    <span className="text-[7px] text-white/40 uppercase tracking-widest font-bold">Sans Contact</span>
                    <CreditCard className="text-white/20 w-5 h-5" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="z-10 relative flex flex-col justify-center items-center text-center mt-auto w-full">
            <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-1">Autorisation bancaire</h4>
            <p className="text-slate-500 mb-3 text-xs md:text-sm max-w-[320px] leading-tight"><strong>Insérez</strong> ou <strong>approchez</strong> votre carte sur le lecteur <strong>en dessous de l'écran</strong>.</p>
            <Button onClick={handleSimulatePayment} variant="accent" className="w-full py-3 md:py-4 text-sm md:text-base shadow-lg" isLoading={processing}>Simuler l'empreinte</Button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full z-0 pointer-events-none hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-slate-800 font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-snug">{desc}</p>
    </div>
  </div>
);

export default PaymentImprintScreen;
