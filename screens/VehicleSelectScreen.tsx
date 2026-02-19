
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Search, CheckCircle2, FileText, ScanLine, Keyboard, Zap, Droplets, Calendar, ShieldCheck, CarFront } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Car3DViewer from '../components/Car3DViewer';

interface Props {
  onVehicleFound: (vehicleInfo: string) => void;
}

type SearchMethod = 'PLATE' | 'VIN' | 'MANUAL';

interface VehicleDetails {
  name: string;
  image: string;
  specs: { engine: string; power: string; fuel: string; year: string; };
}

const VehicleSelectScreen: React.FC<Props> = ({ onVehicleFound }) => {
  const [method, setMethod] = useState<SearchMethod>('PLATE');
  const [status, setStatus] = useState<'IDLE' | 'SEARCHING' | 'FOUND'>('IDLE');
  const [vehicleData, setVehicleData] = useState<VehicleDetails | null>(null);

  // Form states
  const [plate, setPlate] = useState('');
  const [vin, setVin] = useState('');
  const [manualData, setManualData] = useState({ brand: '', model: '', year: '2024' });

  const handleSearch = () => {
    setStatus('SEARCHING');
    setTimeout(() => {
      let name = 'VÉHICULE IDENTIFIÉ';
      if (method === 'MANUAL') {
        name = `${manualData.brand} ${manualData.model}`.toUpperCase();
      } else if (method === 'PLATE') {
        name = 'RENAULT CLIO V';
      } else {
        name = 'PEUGEOT 3008';
      }

      setVehicleData({
        name: name,
        image: 'https://images.unsplash.com/photo-1619105470502-099d25b18408?auto=format&fit=crop&q=80&w=1200',
        specs: {
          engine: method === 'MANUAL' ? 'Standard' : '1.5 BlueHDi',
          power: '100 ch',
          fuel: 'Diesel',
          year: method === 'MANUAL' ? manualData.year : '2020'
        }
      });
      setStatus('FOUND');
    }, 1500);
  };

  const isFormValid = () => {
    if (method === 'PLATE') return plate.length >= 5;
    if (method === 'VIN') return vin.length === 17;
    if (method === 'MANUAL') return manualData.brand.length > 2 && manualData.model.length > 1;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col items-center px-6 md:px-10 py-4 md:py-8">

      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-brand-dark mb-2">Identification</h2>
        <p className="text-slate-500 text-sm md:text-lg">Calibrez le scan avec les informations de votre véhicule.</p>
      </div>

      {status === 'IDLE' && (
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200 w-full max-w-xl overflow-x-auto">
          <TabButton active={method === 'PLATE'} onClick={() => setMethod('PLATE')} icon={<ScanLine size={18} />} label="Plaque" />
          <TabButton active={method === 'VIN'} onClick={() => setMethod('VIN')} icon={<FileText size={18} />} label="N° VIN" />
          <TabButton active={method === 'MANUAL'} onClick={() => setMethod('MANUAL')} icon={<Keyboard size={18} />} label="Manuel" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {status === 'SEARCHING' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-12">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mb-6" />
            <p className="text-brand-primary font-heading font-bold tracking-widest uppercase text-xs">Recherche...</p>
          </motion.div>
        )}

        {status === 'FOUND' && vehicleData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl pb-10">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200 flex flex-col md:flex-row">
              <div className="md:w-1/2 h-56 md:h-auto bg-slate-100 relative">
                <Car3DViewer />
              </div>
              <div className="flex-1 p-8 md:p-10">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full mb-6 border border-emerald-100 shadow-sm">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Compatible Diagnostic Électronique</span>
                </div>
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2 block">Véhicule identifié</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark mb-6 leading-tight">{vehicleData.name}</h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <SpecItem icon={<Zap size={16} />} label="Moteur" value={vehicleData.specs.engine} />
                  <SpecItem icon={<Droplets size={16} />} label="Énergie" value={vehicleData.specs.fuel} />
                  <SpecItem icon={<Calendar size={16} />} label="Année" value={vehicleData.specs.year} />
                  <SpecItem icon={<ShieldCheck size={16} />} label="Status" value="OK" />
                </div>
                <Button variant="primary" onClick={() => onVehicleFound(vehicleData.name)} className="w-full py-5 text-lg">Confirmer et Continuer</Button>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'IDLE' && (
          <motion.div
            key={method}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full max-w-xl pb-10"
          >
            {method === 'PLATE' && (
              <div className="relative w-full max-w-lg mx-auto mb-12">
                <div className="relative bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex h-20 md:h-24 overflow-hidden ring-1 ring-slate-100 transform transition-transform hover:scale-[1.01]">
                  {/* Left Blue Band (EU) */}
                  <div className="w-10 md:w-14 bg-[#0545a8] flex flex-col items-center justify-between py-2 shrink-0">
                    <div className="flex flex-wrap justify-center w-6 gap-0.5 mt-1 opacity-90">
                      {Array(12).fill(0).map((_, i) => <div key={i} className="w-0.5 h-0.5 bg-yellow-400 rounded-full" />)}
                    </div>
                    <span className="text-white font-bold text-lg leading-none mb-1">F</span>
                  </div>

                  {/* Center Input */}
                  <div className="flex-1 bg-white relative flex items-center justify-center">
                    <input
                      type="text"
                      value={plate}
                      onChange={(e) => {
                        let val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
                        if (val.length > 2 && val[2] !== '-' && val.length < 7) val = val.slice(0, 2) + '-' + val.slice(2);
                        if (val.length > 6 && val[6] !== '-') val = val.slice(0, 6) + '-' + val.slice(6);
                        if (val.length <= 9) setPlate(val);
                      }}
                      placeholder="AA-123-AA"
                      className="w-full text-center text-3xl md:text-5xl font-bold text-slate-800 bg-transparent outline-none tracking-widest font-mono uppercase placeholder-slate-200"
                    />
                  </div>

                  {/* Right Blue Band (Region) */}
                  <div className="w-10 md:w-14 bg-[#0545a8] flex flex-col items-center justify-between py-2 shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mt-1">
                      <span className="text-[10px]">🇫🇷</span>
                    </div>
                    <span className="text-white font-bold text-lg leading-none mb-1">83</span>
                  </div>
                </div>

                {method === 'PLATE' && plate.length < 9 && (
                  <div className="text-center mt-4">
                    <span className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full">Format : AA-123-AA</span>
                  </div>
                )}
              </div>
            )}

            {method === 'VIN' && (
              <div className="w-full max-w-2xl mx-auto mb-12">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-8">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block text-center">Numéro de série (VIN)</label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={17}
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                      placeholder="VF3..."
                      className="w-full text-center py-4 text-3xl md:text-4xl font-mono font-bold text-slate-800 outline-none tracking-[0.3em] placeholder-slate-200 border-b-2 border-slate-100 focus:border-brand-primary transition-all"
                    />
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors ${vin.length === 17 ? 'text-emerald-500' : 'text-slate-300'}`}>
                      {vin.length}/17
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Où trouver le numéro VIN ?</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Windshield Illustration */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col items-center text-center group hover:border-brand-primary/20 transition-colors">
                      <div className="w-32 h-20 bg-slate-100 rounded-t-xl rounded-b-md border-4 border-slate-300 relative mb-4 overflow-hidden">
                        <div className="absolute inset-0 bg-sky-50/50"></div>
                        {/* Wiper */}
                        <div className="absolute bottom-0 right-8 w-16 h-1 bg-slate-400 -rotate-12 origin-bottom-right"></div>
                        {/* VIN Highlight */}
                        <div className="absolute bottom-1 right-2 w-10 h-2 bg-brand-primary/20 border border-brand-primary rounded-sm flex items-center justify-center">
                          <div className="w-full h-0.5 bg-brand-primary/50 mx-1"></div>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Sur le pare-brise</p>
                      <p className="text-xs text-slate-400">En bas à droite, visible de l'extérieur.</p>
                    </div>

                    {/* Carte Grise Illustration */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col items-center text-center group hover:border-brand-primary/20 transition-colors">
                      <div className="w-24 h-20 bg-orange-50 rounded-md border border-orange-200 relative mb-4 p-2 flex flex-col gap-1.5 shadow-sm">
                        <div className="w-full h-2 bg-orange-200/50 rounded-sm"></div>
                        <div className="w-2/3 h-2 bg-orange-200/50 rounded-sm"></div>
                        <div className="w-full h-6 bg-white border border-brand-primary/30 rounded-sm mt-1 flex items-center px-1 gap-1">
                          <span className="text-[6px] font-bold text-brand-primary">E.</span>
                          <div className="flex-1 h-1.5 bg-brand-primary/10 rounded-sm"></div>
                        </div>
                        <div className="w-1/2 h-2 bg-orange-200/50 rounded-sm"></div>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Sur la carte grise</p>
                      <p className="text-xs text-slate-400">Repère E (Numéro d'identification).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {method === 'MANUAL' && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Marque</label>
                  <input
                    type="text"
                    value={manualData.brand}
                    onChange={(e) => setManualData({ ...manualData, brand: e.target.value })}
                    placeholder="Ex: Peugeot, Tesla..."
                    className="w-full py-2 text-lg font-bold text-brand-dark outline-none border-b border-slate-50 focus:border-brand-primary"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Modèle</label>
                  <input
                    type="text"
                    value={manualData.model}
                    onChange={(e) => setManualData({ ...manualData, model: e.target.value })}
                    placeholder="Ex: 208, Model 3..."
                    className="w-full py-2 text-lg font-bold text-brand-dark outline-none border-b border-slate-50 focus:border-brand-primary"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Année</label>
                  <select
                    value={manualData.year}
                    onChange={(e) => setManualData({ ...manualData, year: e.target.value })}
                    className="w-full py-2 text-lg font-bold text-brand-dark bg-transparent outline-none cursor-pointer"
                  >
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <Button
              variant="primary"
              onClick={handleSearch}
              disabled={!isFormValid()}
              className="w-full py-5 text-lg shadow-xl"
              icon={<Search size={20} />}
            >
              {method === 'MANUAL' ? 'Valider les infos' : 'Rechercher le véhicule'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-xs transition-all whitespace-nowrap ${active ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
    {icon} <span>{label}</span>
  </button>
);

const SpecItem = ({ icon, label, value }: any) => (
  <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
    <div className="text-brand-primary shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[9px] text-slate-400 font-bold uppercase truncate">{label}</p>
      <p className="text-xs md:text-sm font-bold text-brand-dark truncate">{value}</p>
    </div>
  </div>
);

export default VehicleSelectScreen;
