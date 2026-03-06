
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, Phone, Send, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const CollectContactScreen: React.FC<Props> = ({ onComplete }) => {
  const [method, setMethod] = useState<'EMAIL' | 'SMS'>('EMAIL');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto min-h-full flex flex-col items-center justify-center px-10 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-body font-bold text-slate-900 mb-4 tracking-tight">Emportez votre rapport</h2>
        <p className="text-slate-500 text-lg">Comment souhaitez-vous recevoir votre bilan complet ?</p>
      </motion.div>

      <div className="w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 relative min-h-[420px] flex flex-col justify-center">
        {!isSent && (
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-12 shrink-0">
            <button onClick={() => setMethod('EMAIL')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${method === 'EMAIL' ? 'bg-white text-brand-primary shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Email</button>
            <button onClick={() => setMethod('SMS')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${method === 'SMS' ? 'bg-white text-brand-primary shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>SMS</button>
          </div>
        )}

        {!isSent ? (
          <div className="space-y-8 flex-1 flex flex-col justify-center">
            <input
              type={method === 'EMAIL' ? 'email' : 'tel'}
              placeholder={method === 'EMAIL' ? 'jean.dupont@gmail.com' : '06 12 34 56 78'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 text-xl text-slate-900 focus:outline-none focus:border-brand-primary transition-all text-center placeholder-slate-300"
            />
            <Button variant="primary" onClick={handleSend} isLoading={loading} disabled={value.length < 5} className="w-full py-6 text-xl !font-body uppercase" icon={<Send />}>
              Envoyer maintenant
            </Button>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center text-center h-full">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 border border-teal-100 shrink-0">
              <CheckCircle2 className="text-teal-500 w-12 h-12" />
            </div>
            <h3 className="text-3xl font-body font-bold text-slate-900 mb-2">C'est envoyé !</h3>
            <p className="text-slate-500 mb-10">Votre rapport arrive dans votre messagerie.</p>
            <Button variant="primary" onClick={onComplete} className="w-full py-6 text-xl !font-body uppercase shrink-0 mt-auto">
              Continuer
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CollectContactScreen;
