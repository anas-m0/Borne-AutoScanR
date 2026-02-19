
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CreditCard, Lock, ShieldCheck, Wifi, Check, Tag, Ticket, Info } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto min-h-full flex flex-col justify-center px-10 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-heading font-bold text-brand-primary mb-4">Paiement Sécurisé</h2>
        <p className="text-slate-500 text-lg">L'empreinte bancaire autorise le lancement immédiat du scan.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="flex justify-between items-baseline mb-8">
            <h3 className="text-2xl font-heading font-bold text-brand-primary">Bilan Complet</h3>
            <span className="text-4xl font-heading font-black text-brand-primary">19,90€</span>
          </div>
          <div className="space-y-4 mb-10">
            <FeatureItem text="Diagnostic 150 points" />
            <FeatureItem text="Rapport PDF immédiat" />
            <FeatureItem text="Effacement des codes" />
          </div>
          <div className="flex gap-3">
            <input type="text" placeholder="CODE PROMO" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold" />
            <Button variant="outline" className="py-3 px-6 !text-[10px]">Appliquer</Button>
          </div>
        </div>

        <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-2xl border-4 border-brand-primary/10 flex flex-col items-center justify-center relative overflow-hidden">
          {processing ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mx-auto mb-6" />
              <p className="text-xl font-heading font-bold text-brand-dark">Autorisation...</p>
            </div>
          ) : (
            <>
              <Wifi size={48} className="text-brand-primary mb-8 rotate-90 animate-pulse" />
              <div className="w-full max-w-sm aspect-[1.6/1] bg-slate-900 rounded-2xl p-6 shadow-2xl relative">
                  <div className="w-12 h-8 bg-amber-400/50 rounded-md mb-8" />
                  <div className="text-white/20 font-mono tracking-widest text-lg mb-4">**** **** **** ****</div>
                  <div className="flex justify-between items-center"><span className="text-[10px] text-white/40 uppercase">LECTEUR SANS CONTACT</span><CreditCard className="text-white/20" /></div>
              </div>
              <p className="mt-8 text-slate-500 text-sm font-medium text-center">Approchez votre carte sous l'écran.</p>
            </>
          )}
          <div className="w-full mt-10">
            <Button onClick={handleSimulatePayment} variant="accent" className="w-full py-5 text-lg" isLoading={processing}>Simuler le Paiement</Button>
          </div>
        </div>
      </div>
      
      <div className="mt-10 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4">
        <Info className="text-brand-primary shrink-0" />
        <p className="text-xs text-slate-400 leading-relaxed font-medium">L'empreinte garantit que le scan peut démarrer. Aucun débit réel n'est effectué avant la fin du processus.</p>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary"><Check size={12} /></div>
        <span className="text-slate-600 font-bold text-sm">{text}</span>
    </div>
);

export default PaymentImprintScreen;
