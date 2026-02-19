
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Garage } from '../types';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Car, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  garage: Garage;
  onComplete: () => void;
  onBack: () => void;
}

const BookingScreen: React.FC<Props> = ({ garage, onComplete, onBack }) => {
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'SLOT' | 'FORM'>('SLOT');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [observations, setObservations] = useState('');

  const dates = [
    { label: "Aujourd'hui", val: "today" },
    { label: "Demain", val: "tomorrow" },
    { label: "Lundi", val: "mon" },
  ];
  const times = ["09:00", "10:30", "14:00", "16:30", "17:30"];

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => onComplete(), 3000);
  };

  if (success) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="bg-green-100 p-8 rounded-full mb-8 text-green-600 shadow-inner">
          <CheckCircle className="w-24 h-24" />
        </div>
        <h2 className="text-4xl font-heading font-bold text-brand-primary mb-4 uppercase italic">Rendez-vous fixé</h2>
        <p className="text-xl text-slate-500 mb-8 max-w-xl">
          Confirmation transmise à <strong>{garage.name}</strong>. Un SMS de rappel vous a été envoyé.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col px-6 py-12">
      <div className="mb-10 border-b border-slate-100 pb-8">
        <h2 className="text-4xl font-heading font-bold text-brand-primary mb-3">Planification</h2>
        <div className="flex items-center gap-3">
           <div className="bg-brand-primary/10 px-4 py-1.5 rounded-full border border-brand-primary/20 text-brand-primary text-xs font-black uppercase">{garage.name}</div>
           <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{garage.distance}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold text-brand-primary mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary"><Calendar size={18} /></div>
              1. Créneau
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-10">
              {dates.map((d) => (
                <button
                  key={d.val}
                  onClick={() => setSelectedDate(d.val)}
                  className={`p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${selectedDate === d.val ? 'bg-brand-primary text-white border-brand-primary shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
               {times.map((t) => (
                  <button
                    key={t}
                    disabled={!selectedDate}
                    onClick={() => { setSelectedTime(t); setStep('FORM'); }}
                    className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${selectedTime === t ? 'bg-brand-accent text-white border-brand-accent' : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-brand-primary/30'} disabled:opacity-20`}
                  >
                    {t}
                  </button>
               ))}
            </div>
        </div>

        <div className="flex-[1.2] bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold text-brand-primary mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent"><User size={18} /></div>
              2. Coordonnées
            </h3>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <input type="text" placeholder="Nom complet" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-brand-dark focus:outline-none focus:border-brand-primary" />
              <input type="tel" placeholder="Téléphone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-brand-dark focus:outline-none focus:border-brand-primary" />
            </div>
            <textarea 
              rows={4} 
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observations : bruits suspects, voyants, historique..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-brand-dark focus:outline-none focus:border-brand-primary resize-none mb-8"
            />
            <div className="flex gap-4">
               <Button variant="outline" className="flex-1 py-5" onClick={onBack}>Annuler</Button>
               <Button 
                 className="flex-[2] py-5 text-lg" 
                 variant="accent" 
                 disabled={!selectedDate || !selectedTime}
                 onClick={handleConfirm}
               >
                 Confirmer le RDV
               </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;
