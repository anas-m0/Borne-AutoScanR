
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Lock, CreditCard, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  issuesCount: number;
  onPlanSelected: () => void;
}

const PlanSelectionScreen: React.FC<Props> = ({ onPlanSelected }) => {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [price, setPrice] = useState('19,90');

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setPromoCode(code);
    if (code === 'LANCEMENT') {
      setPrice('15,90');
    } else {
      setPrice('19,90');
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => onPlanSelected(), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-full flex flex-col items-center px-10 py-16">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Rapport disponible</h2>
        <p className="text-slate-500 text-lg">Nous avons terminé l'analyse. Déverrouillez votre rapport complet pour 19,90€.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div>
            <h3 className="text-3xl font-heading font-bold text-slate-900">Bilan Expert</h3>
            <p className="text-brand-primary font-bold uppercase tracking-widest text-sm mt-2">Accès complet à vie</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-heading font-black text-brand-primary">{price}€</div>
            <div className="mt-2 flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <input
                type="text"
                placeholder="Code promo"
                value={promoCode}
                onChange={handlePromoCodeChange}
                className="bg-transparent text-xs font-bold uppercase w-24 px-2 outline-none text-brand-dark placeholder-slate-400"
              />
              {promoCode === 'LANCEMENT' && <Check size={14} className="text-green-500" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FeatureItem text="Lecture complète des calculateurs" />
          <FeatureItem text="Traduction des codes erreurs" />
          <FeatureItem text="Estimations de réparation" />
          <FeatureItem text="Envoi du rapport par PDF" />
          <FeatureItem text="Prise de RDV prioritaire" />
          <FeatureItem text="Support expert par chat" />
        </div>

        <Button variant="primary" onClick={handleConfirm} isLoading={loading} className="w-full py-6 text-2xl mb-6" icon={<Lock />}>
          Accéder à mon rapport
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
