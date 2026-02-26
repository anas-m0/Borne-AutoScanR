
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
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherObservations, setOtherObservations] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const MOCK_CODE = '1234';

  const commonSymptoms = [
    'Voyant moteur allumé',
    'Bruit anormal',
    'Perte de puissance',
    'Fumée excessive',
    'Problème de freinage',
    'Fuite de liquide'
  ];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const dates = [
    { label: "Aujourd'hui", val: "today" },
    { label: "Demain", val: "tomorrow" },
    { label: "Lundi", val: "mon" },
  ];
  const times = ["09:00", "10:30", "14:00", "16:30", "17:30"];

  const handleConfirm = () => {
    setVerifying(true);
  };

  const handleVerify = () => {
    if (smsCode === MOCK_CODE) {
      setVerifying(false);
      onComplete();
    } else {
      setCodeError(true);
      setSmsCode('');
    }
  };

  if (success) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center text-center px-6 py-12 relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-[2.5rem] mb-8 shadow-2xl shadow-green-500/30 rotate-3"
        >
          <CheckCircle className="w-16 h-16 text-white" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight"
        >
          Rendez-vous fixé
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 mb-12 max-w-xl leading-relaxed"
        >
          Confirmation transmise à <strong>{garage.name}</strong>. Un SMS de rappel vous a été envoyé.
        </motion.p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto min-h-full flex flex-col px-6 py-8 md:py-12">
        {/* ── Screen Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black text-brand-dark tracking-tight">Planifiez votre rendez-vous</h2>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Choisissez un créneau disponible chez notre partenaire pour faire réparer votre véhicule.
            </p>
          </div>

          {/* Garage Info Badge */}
          <div className="hidden lg:flex items-center gap-4 bg-white border border-slate-100 px-5 py-3.5 rounded-2xl shadow-sm">
            {garage.logo && (
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0">
                <img src={garage.logo} alt={`Logo ${garage.name}`} className="w-full h-full object-contain" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Garage sélectionné</span>
              <span className="text-brand-primary font-black">{garage.name}</span>
            </div>
            <div className="w-px h-8 bg-slate-100 mx-2"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distance</span>
              <span className="text-brand-dark font-black">{garage.distance}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-0">
          {/* Left: Slot Selection */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border border-white shadow-xl shadow-slate-200/40 flex flex-col h-full relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm"><Calendar size={20} className="mb-0.5" /></div>
                  1. Créneau
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {dates.map((d) => (
                  <button
                    key={d.val}
                    onClick={() => setSelectedDate(d.val)}
                    className={`py-3 px-2 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${selectedDate === d.val ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
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
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${selectedTime === t ? 'bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/20' : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-300'} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact details */}
          <div className="flex-[1.2] flex flex-col">
            <div className="bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border border-white shadow-xl shadow-slate-200/40 flex flex-col h-full relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm"><User size={20} /></div>
                  2. Vos informations
                </h3>
              </div>

              <div className="space-y-6 flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nom complet</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-brand-dark font-medium shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Téléphone</label>
                    <input type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-brand-dark font-medium shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="06 12 34 56 78" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Symptômes rencontrés</label>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map(symptom => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          onClick={() => toggleSymptom(symptom)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${isSelected
                            ? 'bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm'
                            }`}
                        >
                          {symptom}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <textarea
                      rows={4}
                      value={otherObservations}
                      onChange={(e) => setOtherObservations(e.target.value)}
                      placeholder="Précisez votre problème (ex: bruit de claquement à l'avant droit en tournant le volant)..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-brand-dark font-medium shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="mt-10 flex flex-col items-center gap-4 shrink-0">
          <Button
            variant="primary"
            className="w-full max-w-md py-5 text-lg"
            disabled={!selectedDate || !selectedTime}
            onClick={handleConfirm}
            icon={<CheckCircle size={20} />}
          >
            Prendre rendez-vous
          </Button>
          <button
            onClick={onBack}
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>

      {/* SMS Verification Overlay */}
      <AnimatePresence>
        {verifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-white text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto mb-6">
                <Phone size={28} />
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-2">Vérification SMS</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Un code à 4 chiffres a été envoyé au numéro fourni. Saisissez-le ci-dessous pour confirmer votre rendez-vous.
              </p>

              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={smsCode}
                onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, '')); setCodeError(false); }}
                placeholder="• • • •"
                className={`w-full text-center text-4xl font-black tracking-[1rem] bg-slate-50 border-2 rounded-2xl px-6 py-5 mb-3 focus:outline-none transition-all ${codeError
                  ? 'border-red-400 text-red-500 shake'
                  : 'border-slate-200 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                  }`}
              />

              {codeError && (
                <p className="text-red-500 text-sm font-bold mb-4">Code incorrect. Réessayez. <span className="text-slate-400 font-normal">(Démo: 1234)</span></p>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <Button
                  variant="primary"
                  className="w-full py-4 text-lg"
                  disabled={smsCode.length !== 4}
                  onClick={handleVerify}
                  icon={<CheckCircle size={20} />}
                >
                  Confirmer
                </Button>
                <button
                  onClick={() => { setVerifying(false); setSmsCode(''); setCodeError(false); }}
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingScreen;
