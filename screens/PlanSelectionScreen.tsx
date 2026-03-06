import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../components/Button';
import { Lock, CreditCard, ShieldCheck, Check, X, Printer, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  issuesCount: number;
  onPlanSelected: () => void;
}

const PlanSelectionScreen: React.FC<Props> = ({ onPlanSelected }) => {
  const [promoCode, setPromoCode] = useState('');
  const [price, setPrice] = useState('19,90');
  const [showModal, setShowModal] = useState(false);
  const [receiptChoice, setReceiptChoice] = useState<'print' | 'email' | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setPromoCode(code);
    setPrice(code === 'LANCEMENT' ? '15,90' : '19,90');
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPlanSelected();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-full flex flex-col items-center justify-center px-10 py-6 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 shrink-0">
        <h2 className="text-4xl md:text-5xl font-body font-bold text-slate-900 mb-2">Résultats disponibles</h2>
        <p className="text-slate-500 text-base">Nous avons terminé l'analyse. Confirmez votre achat pour accéder aux résultats.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-50 relative shrink-0">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
          <div>
            <img src="/logo.png" alt="AutoScanR" className="h-10 object-contain mb-1" />
            <p className="text-brand-primary font-bold uppercase tracking-widest text-xs mt-1">Diagnostic clair</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-body font-black text-brand-primary leading-none">{price}€</div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FeatureItem text="Rapport de diagnostic complet" />
          <FeatureItem text="Envoi du rapport par PDF" />
          <FeatureItem text="Traduction et interprétation des codes défauts" />
          <FeatureItem text="Médias explicatifs" />
          <FeatureItem text="Mise en relation avec professionnels de la réparation" />
          <FeatureItem text="Prise de RDV" />
        </div>

        <Button variant="primary" onClick={() => setShowModal(true)} className="w-full py-5 text-xl mb-4 !font-body uppercase" icon={<Lock />}>
          Confirmer le paiement
        </Button>

        <div className="flex items-center justify-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <CreditCard size={18} className="text-slate-400" />
          <p className="text-[11px] text-slate-500 font-medium">Débit sécurisé sur votre empreinte bancaire enregistrée.</p>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center gap-8 opacity-40 grayscale shrink-0 mb-[5vh]">
        <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={16} /> Secure</div>
        <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={16} /> PCI DSS</div>
      </div>

      {/* ── Payment confirmation modal ── */}
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 relative"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
              >
                {/* Close */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={22} />
                </button>

                {/* Header */}
                <img src="/logo.png" alt="AutoScanR" className="h-8 object-contain mb-6" />
                <h3 className="text-2xl font-body font-bold text-slate-900 mb-1">Confirmer le paiement</h3>
                <p className="text-slate-500 text-sm mb-8">
                  Montant débité : <strong className="text-brand-primary">{price}€</strong> sur votre empreinte bancaire.
                </p>

                {/* Receipt choice */}
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Recevoir mon reçu par</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button
                    onClick={() => setReceiptChoice('print')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${receiptChoice === 'print'
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                  >
                    <Printer size={24} />
                    <span className="text-xs font-black uppercase tracking-wider">Impression</span>
                  </button>
                  <button
                    onClick={() => setReceiptChoice('email')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${receiptChoice === 'email'
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                  >
                    <Mail size={24} />
                    <span className="text-xs font-black uppercase tracking-wider">E-mail</span>
                  </button>
                </div>

                {/* Email input if mail selected */}
                <AnimatePresence>
                  {receiptChoice === 'email' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Confirm button */}
                <Button
                  variant="primary"
                  onClick={handleConfirm}
                  isLoading={loading}
                  disabled={!receiptChoice || (receiptChoice === 'email' && !email)}
                  className="w-full py-4 text-lg !font-body"
                  icon={<Lock />}
                >
                  Confirmer et payer
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 shrink-0 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
      <Check size={14} />
    </div>
    <span className="text-slate-700 font-medium text-sm leading-snug">{text}</span>
  </div>
);

export default PlanSelectionScreen;
