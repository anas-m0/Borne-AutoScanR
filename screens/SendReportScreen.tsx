
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { mockGarages } from '../services/mockData';
import { Send, CheckSquare, Square, User, Phone, Mail, CheckCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const SendReportScreen: React.FC<Props> = ({ onComplete, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [observations, setObservations] = useState('');

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
      onComplete();
    }, 5000);
  };

  if (success) {
      return (
        <div className="min-h-full flex flex-col items-center justify-center text-center px-6 py-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brand-primary/10 p-8 rounded-full mb-6 border border-brand-primary/20 shadow-lg"
          >
            <Send className="w-16 h-16 text-brand-primary" />
          </motion.div>
          <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4 italic uppercase">Demandes envoyées !</h2>
          <p className="text-lg text-slate-500 mb-8 max-w-xl">
            Votre rapport technique et vos précisions ont été transmis aux <strong>{selectedIds.length} garages</strong>.
          </p>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
            <p className="text-brand-accent font-black mb-3 uppercase tracking-widest text-[10px]">Analyse en cours :</p>
            <p className="text-sm text-slate-500 max-w-sm font-medium">
              Les experts étudient vos données. Vous recevrez des estimations par SMS d'ici quelques heures.
            </p>
          </div>
        </div>
      );
    }

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col px-6 py-8 md:py-12">
       <div className="mb-10 border-b border-slate-100 pb-8">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark mb-3">Appel d'offres</h2>
        <p className="text-slate-500 text-lg">
          Sélectionnez les garages pour obtenir des devis précis.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10">
        
        {/* Left: Garage List */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col h-full shadow-xl">
            <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professionnels</span>
               <button 
                 onClick={() => setSelectedIds(mockGarages.map(g => g.id))}
                 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:text-brand-secondary"
               >
                 Tout sélectionner
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {mockGarages.map((garage) => {
                const isSelected = selectedIds.includes(garage.id);
                return (
                  <div 
                    key={garage.id}
                    onClick={() => toggleGarage(garage.id)}
                    className={`p-5 rounded-2xl border-2 flex items-center gap-5 cursor-pointer transition-all duration-300 ${isSelected ? 'bg-brand-primary/5 border-brand-primary shadow-sm' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-slate-300'}`}>
                      {isSelected && <CheckCircle size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-brand-dark truncate">{garage.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-brand-primary uppercase">{garage.distance}</span>
                        <span className="text-[10px] font-black text-brand-accent uppercase">{garage.rating}/5 ⭐</span>
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
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col h-full shadow-xl">
             <h3 className="text-xl font-bold text-brand-dark mb-8 flex items-center gap-3 font-heading">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary"><MessageSquare size={18} /></div>
                Détails
             </h3>
             
             <div className="space-y-6 flex-1">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom complet</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-brand-dark focus:outline-none focus:border-brand-primary transition-all" placeholder="Votre nom" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                   <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-brand-dark focus:outline-none focus:border-brand-primary transition-all" placeholder="06..." />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Symptômes</label>
                 <textarea 
                   rows={5}
                   value={observations}
                   onChange={(e) => setObservations(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-brand-dark focus:outline-none focus:border-brand-primary transition-all resize-none text-sm font-medium" 
                   placeholder="Ex: Vibration au freinage, fumée noire..." 
                 />
               </div>
             </div>

             <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 py-5" onClick={onBack}>Annuler</Button>
                <Button 
                  variant="primary" 
                  className="flex-[2] py-5 text-lg"
                  disabled={selectedIds.length === 0}
                  onClick={handleSend}
                  icon={<Send size={20} />}
                >
                  Envoyer à {selectedIds.length} garages
                </Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SendReportScreen;
