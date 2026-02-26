
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { mockGarages } from '../services/mockData';
import { Send, CheckSquare, Square, User, Phone, Mail, CheckCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: (action: 'REPORT_SENT' | 'NONE') => void;
  onBack: () => void;
}

const SendReportScreen: React.FC<Props> = ({ onComplete, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherObservations, setOtherObservations] = useState('');

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
      if (symptom === 'Autre...') setOtherObservations(''); // Clear text when unchecking
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const toggleGarage = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSend = () => {
    setSuccess(true);
    setTimeout(() => {
      onComplete('REPORT_SENT');
    }, 5000);
  };

  if (success) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center text-center px-6 py-12 relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-brand-primary to-brand-secondary p-8 rounded-[2.5rem] mb-8 shadow-2xl shadow-brand-primary/30 rotate-3"
        >
          <Send className="w-16 h-16 text-white" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight"
        >
          Demandes envoyées
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 mb-12 max-w-xl leading-relaxed"
        >
          Votre dossier a été transmis aux <strong>{selectedIds.length} experts sélectionnés</strong>.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary" />
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center relative w-4 h-4">
              <div className="absolute inset-0 bg-brand-accent rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-brand-accent rounded-full" />
            </div>
            <p className="text-brand-dark font-black tracking-[0.2em] text-xs uppercase">Analyse en cours</p>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
            Les experts étudient vos données. Vous recevrez leurs estimations chiffrées par SMS d'ici <strong>quelques heures</strong>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col px-6 py-8 md:py-12">
      {/* ── Screen Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-brand-dark tracking-tight">Envoyez votre rapport aux professionnels de la réparation</h2>
          <p className="text-base text-slate-500 max-w-3xl leading-relaxed">
            Sélectionnez les professionnels de votre choix et détaillez vos symptômes. Envoyez-leur votre rapport pour qu'ils analysent votre problème et reviennent vers vous rapidement.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10">

        {/* Left: Garage List */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col h-full relative z-10">
            <div className="p-8 bg-gradient-to-b from-slate-50 to-white/50 border-b border-slate-100 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-black text-brand-primary tracking-tight">Liste des pros</h3>
                <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-[0.2em]">{mockGarages.length} disponibles</p>
              </div>
              <button
                onClick={() => {
                  if (selectedIds.length === mockGarages.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(mockGarages.map(g => g.id));
                  }
                }}
                className="text-[10px] font-bold text-brand-accent uppercase tracking-widest hover:text-brand-primary bg-brand-accent/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                {selectedIds.length === mockGarages.length ? 'Tout décocher' : 'Tout cocher'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-slate-50/30">
              {mockGarages.map((garage) => {
                const isSelected = selectedIds.includes(garage.id);
                return (
                  <div
                    key={garage.id}
                    onClick={() => toggleGarage(garage.id)}
                    className={`p-5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all duration-300 border-2 relative overflow-hidden group ${isSelected ? 'bg-white border-brand-primary shadow-md' : 'bg-white/60 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${isSelected ? 'bg-brand-primary border-brand-primary text-white scale-110' : 'border-slate-300 group-hover:border-slate-400'}`}>
                      {isSelected && <CheckCircle size={14} strokeWidth={3} />}
                    </div>
                    {garage.logo && (
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                        <img src={garage.logo} alt={`Logo ${garage.name}`} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className={`font-black truncate transition-colors ${isSelected ? 'text-brand-primary' : 'text-brand-dark'}`}>{garage.name}</h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md">{garage.distance}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-brand-accent">{garage.rating}/5</span>
                          <span className="text-[10px] text-slate-400 font-medium">⭐</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Contact & Observations */}
        <div className="flex-[1.2] flex flex-col">
          <div className="bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border border-white shadow-xl shadow-slate-200/40 flex flex-col h-full relative z-10">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm"><MessageSquare size={20} className="ml-0.5" /></div>
                Vos coordonnées
              </h3>
              <p className="text-sm text-slate-500 mt-2 ml-14">Elles seront transmises uniquement aux garages sélectionnés.</p>
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

              <div className="space-y-3">
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
                    rows={3}
                    value={otherObservations}
                    onChange={(e) => setOtherObservations(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-brand-dark font-medium shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                    placeholder="Précisez votre problème (ex: bruit de claquement à l'avant droit en tournant le volant)..."
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
          disabled={selectedIds.length === 0}
          onClick={handleSend}
          icon={<Send size={20} />}
        >
          {selectedIds.length > 0 ? `Envoyer à ${selectedIds.length} garage${selectedIds.length > 1 ? 's' : ''}` : 'Envoyer aux garages'}
        </Button>
        <button
          onClick={() => onComplete('NONE')}
          className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
        >
          Non merci
        </button>
      </div>
    </div>
  );
};

export default SendReportScreen;
