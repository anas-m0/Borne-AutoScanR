
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Lock, CreditCard, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  issuesCount: number;
  onPlanSelected: () => void;
}

const PlanSelectionScreen: React.FC<Props> = ({ onPlanSelected }) => {
  const [price] = useState('19,90');

  return (
    <div className="max-w-4xl mx-auto min-h-full flex flex-col items-center px-10 py-16">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-body font-bold text-slate-900 mb-4">Résultats disponibles</h2>
        <p className="text-slate-500 text-lg">Nous avons terminé l'analyse. Confirmez votre achat pour accéder aux résultats.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div>
            <img src="/logo.png" alt="AutoScanR" className="h-12 object-contain mb-1" />
            <p className="text-brand-primary font-bold uppercase tracking-widest text-sm mt-2">Diagnostic clair</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-body font-black text-brand-primary">{price}€</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FeatureItem text="Rapport de diagnostic complet" />
          <FeatureItem text="Envoi du rapport par PDF" />
          <FeatureItem text="Traduction et interprétation des codes défauts" />
          <FeatureItem text="Médias explicatifs" />
          <FeatureItem text="Mise en relation avec professionnels de la réparation" />
          <FeatureItem text="Prise de RDV" />
        </div>

        <Button variant="primary" onClick={onPlanSelected} className="w-full py-6 text-2xl mb-6 !font-body uppercase" icon={<Lock />}>
          Confirmer le paiement
        </Button>

        <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <CreditCard size={20} className="text-slate-400" />
          <p className="text-xs text-slate-500 font-medium">Débit sécurisé sur votre empreinte bancaire enregistrée.</p>
        </div>
      </motion.div>

      <div className="mt-12 flex items-center gap-10 opacity-40 grayscale">
        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest"><ShieldCheck size={18} /> Stripe Secure</div>
        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest"><ShieldCheck size={18} /> PCI DSS</div>
      </div>

    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-7 h-7 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
      <Check size={16} />
    </div>
    <span className="text-slate-700 font-medium">{text}</span>
  </div>
);

export default PlanSelectionScreen;
