
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Search, CheckCircle2, FileText, ScanLine, Keyboard, Zap, Droplets, Calendar, ShieldCheck, CarFront, Settings2, Activity, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Car3DViewer from '../components/Car3DViewer';

interface Props {
  onVehicleFound: (vehicleInfo: string) => void;
}

type SearchMethod = 'PLATE' | 'VIN' | 'MANUAL';

interface VehicleDetails {
  brand: string;
  model: string;
  logo: string;
  name: string;
  image: string;
  specs: { engine: string; power_ch: string; power_cv: string; fuel: string; year: string; gearbox: string; };
}

const VehicleSelectScreen: React.FC<Props> = ({ onVehicleFound }) => {
  const [method, setMethod] = useState<SearchMethod>('PLATE');
  const [status, setStatus] = useState<'IDLE' | 'SEARCHING' | 'FOUND'>('IDLE');
  const [vehicleData, setVehicleData] = useState<VehicleDetails | null>(null);

  // Form states
  const [plate, setPlate] = useState('');
  const [vin, setVin] = useState('');
  const [manualData, setManualData] = useState({ brand: '', model: '', year: new Date().getFullYear().toString() });
  const [manualStep, setManualStep] = useState<'BRAND' | 'MODEL' | 'YEAR'>('BRAND');

  const popularBrands = [
    { id: 'peugeot', name: 'Peugeot', logo: '/brands/peugeot.png' },
    { id: 'renault', name: 'Renault', logo: '/brands/renault.svg' },
    { id: 'volkswagen', name: 'Volkswagen', logo: '/brands/volkswagen.png' },
    { id: 'mercedes', name: 'Mercedes', logo: '/brands/mercedes.png' },
    { id: 'audi', name: 'Audi', logo: '/brands/audi.svg' },
    { id: 'bmw', name: 'BMW', logo: '/brands/bmw.svg' },
  ];

  const modelsByBrand: Record<string, string[]> = {
    peugeot: ['208', '2008', '308', '3008', '5008'],
    renault: ['Clio', 'Captur', 'Megane', 'Arkana', 'Austral'],
    volkswagen: ['Polo', 'Golf', 'Tiguan', 'T-Roc'],
    mercedes: ['Classe A', 'Classe C', 'GLA', 'GLC'],
    audi: ['A1', 'A3', 'Q2', 'Q3'],
    bmw: ['Série 1', 'X1', 'Série 3', 'X3'],
  };

  const years = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleSearch = () => {
    setStatus('SEARCHING');
    setTimeout(() => {
      let name = 'VÉHICULE IDENTIFIÉ';
      let brand = '';
      let model = '';
      let logo = '';

      if (method === 'MANUAL') {
        name = `${manualData.brand} ${manualData.model}`.toUpperCase();
        brand = manualData.brand;
        model = manualData.model;
        const brandObj = popularBrands.find(b => b.name.toLowerCase() === brand.toLowerCase());
        logo = brandObj ? brandObj.logo : '';
      } else if (method === 'PLATE') {
        name = 'RENAULT CLIO V';
        brand = 'Renault';
        model = 'Clio V';
        logo = '/brands/renault.svg';
      } else {
        name = 'PEUGEOT 3008';
        brand = 'Peugeot';
        model = '3008';
        logo = '/brands/peugeot.png';
      }

      setVehicleData({
        brand,
        model,
        logo,
        name,
        image: 'https://images.unsplash.com/photo-1619105470502-099d25b18408?auto=format&fit=crop&q=80&w=1200',
        specs: {
          engine: method === 'MANUAL' ? 'Standard' : '1.5 BlueHDi',
          power_ch: '100 ch',
          power_cv: '5 CV',
          fuel: 'Diesel',
          year: method === 'MANUAL' ? manualData.year : '2020',
          gearbox: 'Manuelle'
        }
      });
      setStatus('FOUND');
    }, 1500);
  };

  const isFormValid = () => {
    if (method === 'PLATE') {
      const plateRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
      return plateRegex.test(plate);
    }
    if (method === 'VIN') return vin.length === 17;
    if (method === 'MANUAL') return manualData.brand.length > 2 && manualData.model.length > 1;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto min-h-full flex flex-col items-center px-6 md:px-10 py-4 md:py-8">

      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-4xl md:text-5xl !font-body font-bold text-brand-dark mb-2">Identification.</h2>
        <p className="text-slate-500 text-sm md:text-lg">
          {status === 'FOUND'
            ? "Confirmez les informations de votre véhicule récupérées."
            : "Identifiez votre véhicule par un des trois moyens ci-dessous."}
        </p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl pb-4 md:pb-0">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200 flex flex-col md:flex-row">
              <div className="md:w-1/2 h-56 md:h-auto bg-slate-100 relative">
                <Car3DViewer />
              </div>
              <div className="flex-1 pt-6 px-6 md:pt-8 md:px-8 pb-4 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 self-start bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full mb-6 border border-emerald-100 shadow-sm">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Compatible Diagnostic Électronique</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  {vehicleData.logo && (
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shrink-0 p-2 shadow-sm">
                      <img src={vehicleData.logo} alt={vehicleData.brand} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1 block">Véhicule identifié</span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight">
                      {vehicleData.brand && vehicleData.model ? (
                        <>
                          <span className="text-[#071738]">{vehicleData.brand.toUpperCase()}</span>{' '}
                          <span className="text-[#0094b7]">{vehicleData.model.toUpperCase()}</span>
                        </>
                      ) : (
                        <span className="text-brand-dark">{vehicleData.name}</span>
                      )}
                    </h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  <SpecItem icon={<Zap size={16} />} label="Moteur" value={vehicleData.specs.engine} />
                  <SpecItem icon={<Activity size={16} />} label="Puissance DIN" value={vehicleData.specs.power_ch} />
                  <SpecItem icon={<Wallet size={16} />} label="Puissance Fisc." value={vehicleData.specs.power_cv} />
                  <SpecItem icon={<Droplets size={16} />} label="Énergie" value={vehicleData.specs.fuel} />
                  <SpecItem icon={<Calendar size={16} />} label="Année" value={vehicleData.specs.year} />
                  <SpecItem icon={<Settings2 size={16} />} label="Boîte" value={vehicleData.specs.gearbox} />
                </div>
                <div className="flex flex-col gap-3">
                  <Button variant="primary" onClick={() => onVehicleFound(vehicleData.name)} className="w-full py-5 text-2xl transition-colors hover:!bg-[#071738] !font-body">Confirmer et Continuer</Button>
                  <button
                    onClick={() => {
                      setStatus('IDLE');
                      setPlate('');
                      setVin('');
                    }}
                    className="text-slate-500 hover:text-slate-800 text-sm font-semibold py-2 transition-colors"
                  >
                    Ce n'est pas mon véhicule
                  </button>
                </div>
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
                    <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-7 md:h-7 mt-1 opacity-90 overflow-visible">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const x = 50 + 35 * Math.sin(angle);
                        const y = 50 - 35 * Math.cos(angle);
                        return (
                          <path
                            key={i}
                            d="M0,-6 L1.3,-1.8 L5.7,-1.8 L2.2,0.7 L3.5,4.9 L0,2.3 L-3.5,4.9 L-2.2,0.7 L-5.7,-1.8 L-1.3,-1.8 Z"
                            fill="#FBBF24"
                            transform={`translate(${x}, ${y})`}
                          />
                        );
                      })}
                    </svg>
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

              </div>
            )}

            {method === 'VIN' && (
              <div className="w-full max-w-2xl mx-auto mb-10">
                <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.06)] mb-6 relative overflow-hidden group">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <FileText size={12} className="text-brand-primary" />
                      Numéro de série
                    </label>
                    <div className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border transition-colors ${vin.length === 17 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      {vin.length}/17
                    </div>
                  </div>

                  <div className="relative bg-slate-50/50 rounded-lg border border-slate-200 p-1 md:p-1.5 transition-colors focus-within:border-brand-primary/40 focus-within:bg-white">
                    <input
                      type="text"
                      maxLength={17}
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                      placeholder="VF3.............."
                      className="w-full text-center py-1 md:py-1.5 text-lg md:text-xl font-mono font-bold text-slate-800 bg-transparent outline-none tracking-[0.1em] md:tracking-[0.15em] placeholder-slate-300"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Où trouver le numéro VIN ?</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Windshield Illustration */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col items-center text-center group hover:border-brand-primary/20 transition-colors">
                      <div className="w-full h-32 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                        <img
                          src="/images/pare-brise.png"
                          alt="VIN sur pare-brise"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Sur le pare-brise</p>
                      <p className="text-xs text-slate-400">En bas à droite, visible de l'extérieur.</p>
                    </div>

                    {/* Carte Grise Illustration */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col items-center text-center group hover:border-brand-primary/20 transition-colors">
                      <div className="w-full h-32 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                        <img
                          src="/images/carte-grise.png"
                          alt="VIN sur carte grise"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Sur la carte grise</p>
                      <p className="text-xs text-slate-400">Repère E (Numéro d'identification).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {method === 'MANUAL' && (
              <div className="w-full max-w-2xl mx-auto mb-8 bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
                  <div
                    className="absolute left-0 top-1/2 h-1 bg-brand-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{ width: manualStep === 'BRAND' ? '0%' : manualStep === 'MODEL' ? '50%' : '100%' }}
                  ></div>

                  <StepIndicator active={true} completed={manualStep !== 'BRAND'} label="Marque" onClick={() => setManualStep('BRAND')} />
                  <StepIndicator active={manualStep === 'MODEL' || manualStep === 'YEAR'} completed={manualStep === 'YEAR'} label="Modèle" onClick={() => manualData.brand && setManualStep('MODEL')} />
                  <StepIndicator active={manualStep === 'YEAR'} completed={false} label="Année" onClick={() => manualData.model && setManualStep('YEAR')} />
                </div>

                <AnimatePresence mode="wait">
                  {manualStep === 'BRAND' && (
                    <motion.div key="brand" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <h3 className="text-center font-bold text-slate-800 mb-6 font-heading">Sélectionnez la marque</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {popularBrands.map(brand => (
                          <button
                            key={brand.id}
                            onClick={() => {
                              setManualData({ ...manualData, brand: brand.name, model: '' });
                              setManualStep('MODEL');
                            }}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all group ${manualData.brand === brand.name
                              ? 'border-brand-primary bg-brand-primary/5 shadow-md'
                              : 'border-slate-100 hover:border-brand-primary/30 hover:bg-slate-50'
                              }`}
                          >
                            <img
                              src={brand.logo}
                              alt={`Logo ${brand.name}`}
                              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className={`font-bold text-sm transition-colors ${manualData.brand === brand.name ? 'text-brand-primary' : 'text-slate-700 group-hover:text-brand-primary'
                              }`}>
                              {brand.name}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-col pt-6 border-t border-slate-100">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Autre marque</label>
                        <input
                          type="text"
                          value={manualData.brand && !popularBrands.find(b => b.name === manualData.brand) ? manualData.brand : ''}
                          onChange={(e) => setManualData({ ...manualData, brand: e.target.value })}
                          placeholder="Saisissez la marque..."
                          className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-800 font-bold focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        />
                        {manualData.brand && !popularBrands.find(b => b.name === manualData.brand) && (
                          <Button variant="secondary" onClick={() => setManualStep('MODEL')} className="mt-3 py-2 text-sm">Continuer</Button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {manualStep === 'MODEL' && (
                    <motion.div key="model" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <h3 className="text-center font-bold text-slate-800 mb-6 font-heading">Modèle {manualData.brand}</h3>
                      {modelsByBrand[manualData.brand.toLowerCase()] ? (
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {modelsByBrand[manualData.brand.toLowerCase()].map(model => (
                            <button
                              key={model}
                              onClick={() => {
                                setManualData({ ...manualData, model });
                                setManualStep('YEAR');
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${manualData.model === model ? 'border-brand-primary bg-brand-primary/5 shadow-md' : 'border-slate-100 hover:border-brand-primary/30 hover:bg-slate-50'}`}
                            >
                              <span className="font-bold text-slate-700">{model}</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                      <div className="flex flex-col pt-2 border-t border-slate-100">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Saisie manuelle</label>
                        <input
                          type="text"
                          value={manualData.model}
                          onChange={(e) => setManualData({ ...manualData, model: e.target.value })}
                          placeholder="Saisissez le modèle..."
                          className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-800 font-bold focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                        />
                        {manualData.model && (
                          <Button variant="secondary" onClick={() => setManualStep('YEAR')} className="mt-3 py-2 text-sm">Continuer</Button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {manualStep === 'YEAR' && (
                    <motion.div key="year" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <h3 className="text-center font-bold text-slate-800 mb-6 font-heading">Année d'immatriculation</h3>
                      <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto custom-scrollbar p-1">
                        {years.map(year => (
                          <button
                            key={year}
                            onClick={() => setManualData({ ...manualData, year })}
                            className={`py-3 rounded-lg border-2 text-center transition-all ${manualData.year === year ? 'border-brand-primary bg-brand-primary text-white font-bold shadow-md' : 'border-slate-100 text-slate-600 hover:border-brand-primary/50'}`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <Button
              variant="primary"
              onClick={handleSearch}
              disabled={!isFormValid()}
              className="w-full py-5 text-2xl shadow-xl !font-body"
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

const StepIndicator = ({ active, completed, label, onClick }: any) => (
  <button onClick={onClick} disabled={!active && !completed} className="flex flex-col items-center gap-2 group outline-none">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm
      ${completed ? 'bg-brand-primary text-white border-none' :
        active ? 'bg-white border-2 border-brand-primary text-brand-primary' :
          'bg-white border-2 border-slate-200 text-slate-300'}`}
    >
      {completed ? <CheckCircle2 size={16} /> : <div className={`w-2 h-2 rounded-full ${active ? 'bg-brand-primary' : 'bg-transparent'}`} />}
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-widest ${active || completed ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
  </button>
);

export default VehicleSelectScreen;
