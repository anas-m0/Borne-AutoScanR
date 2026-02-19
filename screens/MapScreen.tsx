
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { mockGarages } from '../services/mockData';
import { MapPin, Star, Calendar, ArrowRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBook: (garageId: string) => void;
  onSendReport: () => void;
}

const MapScreen: React.FC<Props> = ({ onBook, onSendReport }) => {
  const [selectedGarage, setSelectedGarage] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col md:flex-row glass-panel rounded-3xl overflow-hidden mx-4 mb-4 border-slate-200">
      
      {/* List / Sidebar */}
      <div className="w-full md:w-1/3 bg-white border-r border-slate-100 flex flex-col z-20 shadow-xl relative">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
          <h2 className="text-xl font-heading font-bold text-brand-dark">Garages Partenaires</h2>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-widest">3 pros à proximité</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
          {mockGarages.map((garage) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={garage.id}
              onClick={() => setSelectedGarage(garage.id)}
              className={`p-6 border-b border-slate-50 cursor-pointer transition-all duration-300 hover:bg-slate-50 ${selectedGarage === garage.id ? 'bg-brand-primary/5 border-l-4 border-l-brand-primary' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-brand-dark">{garage.name}</h3>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-lg">
                  {garage.distance}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-brand-accent mb-3">
                <Star className="fill-current w-4 h-4" />
                <span className="text-xs font-bold">{garage.rating}</span>
                <span className="text-[10px] text-slate-400 ml-1 font-medium">(124 avis)</span>
              </div>

              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-brand-primary" />
                  <span>Dispo: <span className="text-brand-dark font-bold">{garage.nextAvailability}</span></span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="font-black text-brand-primary">{garage.priceEstimate}</span>
                   <span className="text-[9px] font-bold uppercase opacity-50">estimé</span>
                </div>
              </div>

              <AnimatePresence>
                {selectedGarage === garage.id && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 pt-4 border-t border-slate-100 overflow-hidden"
                    >
                        <Button variant="primary" className="w-full text-[10px] py-3" onClick={() => onBook(garage.id)}>
                            Réserver ce créneau
                        </Button>
                    </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Global Action Footer */}
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4">
           <Button 
             variant="secondary" 
             className="w-full text-[10px] py-4" 
             onClick={onSendReport}
             icon={<Send size={14} />}
           >
             Demander des devis
           </Button>
        </div>
      </div>

      {/* Map Area (Visual Mock) */}
      <div className="flex-1 bg-slate-50 relative overflow-hidden hidden md:block">
        
        {/* Map Grid Style */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
        
        {/* You (The Kiosk) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-30" />
            <div className="w-6 h-6 bg-brand-primary rounded-full border-4 border-white shadow-xl relative z-10" />
          </div>
          <div className="mt-3 bg-brand-dark px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg">Ma position</div>
        </div>

        {/* Garage Pins */}
        {mockGarages.map((garage) => (
           <motion.div 
             key={garage.id}
             className="absolute cursor-pointer"
             style={{ top: `${garage.coords.y}%`, left: `${garage.coords.x}%` }}
             onClick={() => setSelectedGarage(garage.id)}
           >
              <div className={`relative flex flex-col items-center transition-all duration-300 ${selectedGarage === garage.id ? 'z-50 scale-125' : 'z-10 hover:scale-110'}`}>
                <MapPin 
                    className={`w-10 h-10 drop-shadow-md ${selectedGarage === garage.id ? 'text-brand-accent fill-brand-accent/20' : 'text-slate-400 fill-slate-100'}`} 
                />
              </div>
           </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MapScreen;
