
import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Heart, MessagesSquare, ScanLine, Zap, Activity, FileText, Wrench, ChevronDown, ChevronUp, X, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  const [showSteps, setShowSteps] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Modal states
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  // Language state
  const [currentLanguage, setCurrentLanguage] = useState('FR');

  const languages = [
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-6 py-8 md:py-12 relative z-10 w-full max-w-6xl mx-auto">

      {/* Top right floating button for Language Selection */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <button
          onClick={() => setShowLanguage(true)}
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-primary/30 text-slate-600 hover:text-brand-primary transition-all group"
        >
          <Globe className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
          <span className="font-heading font-bold text-sm">{currentLanguage}</span>
        </button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8 md:mb-12 flex flex-col items-center"
      >
        <Logo size="xl" />
        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="px-5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[10px] md:text-xs font-black tracking-widest uppercase">
            Diagnostic Nouvelle Génération
          </span>
          <p className="text-slate-900 text-lg md:text-3xl font-light tracking-tight max-w-2xl leading-snug">
            Comprenez enfin les problèmes de votre véhicule avec <span className="text-brand-primary font-bold">AutoScanR</span>.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full">
        <FeatureCard
          icon={<Heart className="w-8 h-8 text-rose-500" />}
          title="Bilan de Santé 24h/7j"
          desc="Analysez vous même votre véhicule à n'importe quel moment."
          delay={0.2}
        />
        <FeatureCard
          icon={<MessagesSquare className="w-8 h-8 text-brand-primary" />}
          title="Langage Clair"
          desc="Comprenez les problèmes de votre véhicule grâce à nos explications claires et vulgarisées."
          delay={0.3}
        />
        <FeatureCard
          icon={<ShieldCheck className="w-8 h-8 text-teal-500" />}
          title="Mise en Relation Experte"
          desc="Réparez sereinement votre véhicule chez nos réparateurs partenaires."
          delay={0.4}
        />
      </div>

      {/* Enhanced Service Steps Timeline - Collapsible */}
      {!showSteps ? (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowSteps(true)}
          className="mb-12 flex items-center justify-center gap-2 px-6 pt-3 pb-2.5 bg-[#EDF3F8] rounded-full shadow-md hover:bg-[#dbe6f0] transition-all group hover:shadow-lg border border-[#0094A7]"
        >
          <span className="font-heading font-semibold text-sm text-[#0094A7] leading-none">
            Comment ça marche ?
          </span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform text-[#0094A7]" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="w-full mb-12 bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative"
        >
          <button
            onClick={() => setShowSteps(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-20"
            aria-label="Fermer"
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-800 mb-10 text-center">
            Comment ça <span className="text-brand-primary">marche ?</span>
          </h3>

          <div className="flex flex-col md:flex-row items-start justify-between relative gap-8 md:gap-4 mt-6">
            {/* Desktop Progress Line */}
            <div className="hidden md:block absolute top-8 left-10 right-10 h-1 bg-gradient-to-r from-brand-primary/10 via-brand-primary/30 to-brand-primary/10 -z-10 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-brand-primary/20 animate-pulse-glow"></div>
            </div>

            {[
              { icon: <ScanLine className="w-6 h-6" />, title: "Identification", desc: "Identification du véhicule", num: "01", isPrimaryFilled: true },
              { icon: <Zap className="w-6 h-6" />, title: "Branchement", desc: "Connexion à la prise OBD", num: "02", isPrimaryFilled: false },
              { icon: <Activity className="w-6 h-6" />, title: "Diagnostic", desc: "Analyse des calculateurs", num: "03", isPrimaryFilled: true },
              { icon: <FileText className="w-6 h-6" />, title: "Résultats", desc: "Rapport clair et détaillé", num: "04", isPrimaryFilled: false },
              { icon: <Wrench className="w-6 h-6" />, title: "Accompagnement", desc: "Mise en relation experte", num: "05", isPrimaryFilled: true },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 group w-full md:flex-1 cursor-default pt-2">
                <div className="relative mb-5">
                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 ${step.isPrimaryFilled ? 'bg-brand-primary/20' : 'bg-[#071538]/20'} blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100`}></div>

                  {/* Icon container */}
                  <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-white group-hover:-translate-y-2 transition-all duration-300 shadow-sm relative z-10 ${step.isPrimaryFilled
                    ? 'bg-brand-primary border-brand-primary group-hover:shadow-[0_10px_20px_rgb(0,148,183,0.15)]'
                    : 'bg-[#071538] border-[#071538] group-hover:shadow-[0_10px_20px_rgba(7,21,56,0.3)]'
                    }`}>
                    {step.icon}

                    {/* Number badge */}
                    <span className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-opacity delay-100 opacity-100 text-white ${step.isPrimaryFilled
                      ? 'bg-[#071538]'
                      : 'bg-brand-primary'
                      }`}>
                      {step.num}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm md:text-base font-bold text-slate-800 mb-1 transition-colors group-hover:text-brand-primary">
                  {step.title}
                </h4>
                <p className="text-[10px] md:text-xs text-slate-500 leading-tight md:max-w-[120px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-md flex flex-col items-center gap-4"
      >
        <label className="flex items-center gap-3 cursor-pointer group w-full justify-center">
          <div className={`w-5 h-5 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${hasAcceptedTerms
            ? 'bg-brand-primary border-brand-primary text-white'
            : 'border-slate-300 bg-white group-hover:border-brand-primary'
            }`}>
            {hasAcceptedTerms && <ShieldCheck className="w-3.5 h-3.5" />}
          </div>
          <input
            type="checkbox"
            className="hidden"
            checked={hasAcceptedTerms}
            onChange={(e) => setHasAcceptedTerms(e.target.checked)}
          />
          <span className="text-[10px] md:text-xs text-slate-500 group-hover:text-slate-700 transition-colors whitespace-nowrap">
            J'accepte les <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTerms(true); }}
              className="font-semibold text-brand-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              conditions d'utilisation
            </button> et la <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPrivacy(true); }}
              className="font-semibold text-brand-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              politique de confidentialité
            </button>
          </span>
        </label>

        <Button
          variant="primary"
          onClick={() => hasAcceptedTerms && onStart()}
          className={`w-full py-6 md:py-7 text-xl shadow-xl transition-all ${hasAcceptedTerms
            ? '!bg-[#0094b7] hover:!bg-[#071738] !shadow-[#0094b7]/20 border-transparent text-white'
            : '!bg-[#0094b7]/20 text-white cursor-not-allowed border-transparent shadow-none hover:!bg-[#071738]/20 hover:text-white'
            }`}
          icon={<ArrowRight className="w-6 h-6" />}
        >
          Démarrer l'analyse
        </Button>
      </motion.div>

      {/* Modals for Legal Documents */}
      <LegalModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Conditions d'utilisation"
      >
        <div className="space-y-4 text-left text-sm text-slate-600">
          <p>Bienvenue sur AutoScanR. En utilisant notre borne, vous acceptez les conditions suivantes :</p>
          <h4 className="font-bold text-slate-800 mt-4">1. Description du service</h4>
          <p>AutoScanR fournit un service de diagnostic automobile automatisé. Les résultats sont fournis à titre indicatif et ne remplacent pas l'avis d'un mécanicien professionnel.</p>
          <h4 className="font-bold text-slate-800 mt-4">2. Utilisation de la borne</h4>
          <p>Vous êtes responsable de l'utilisation adéquate du matériel. Tout dommage causé par une mauvaise manipulation, notamment lors du branchement à la prise OBD, est de votre responsabilité.</p>
          <h4 className="font-bold text-slate-800 mt-4">3. Limite de responsabilité</h4>
          <p>AutoScanR ne saurait être tenu responsable des pannes non détectées ou des conseils de réparation suivis par l'utilisateur.</p>
        </div>
      </LegalModal>

      <LegalModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Politique de confidentialité"
      >
        <div className="space-y-4 text-left text-sm text-slate-600">
          <p>Chez AutoScanR, nous accordons une grande importance à la protection de vos données personnelles.</p>
          <h4 className="font-bold text-slate-800 mt-4">1. Données collectées</h4>
          <p>Nous collectons les données techniques de votre véhicule (VIN, codes défauts) ainsi que les informations de contact que vous décidez de nous partager pour recevoir le rapport complet.</p>
          <h4 className="font-bold text-slate-800 mt-4">2. Utilisation des données</h4>
          <p>Vos données sont utilisées exclusivement pour générer votre diagnostic, vous l'envoyer par email ou SMS, et vous proposer la mise en relation avec nos garages partenaires si vous le souhaitez.</p>
          <h4 className="font-bold text-slate-800 mt-4">3. Conservation et sécurité</h4>
          <p>Vos rapports sont stockés de manière sécurisée et ne sont jamais vendus à des tiers à des fins publicitaires non liées à votre réparation.</p>
        </div>
      </LegalModal>

      {/* Language Selection Modal */}
      {showLanguage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowLanguage(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary/10 rounded-xl">
                  <Globe className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-800">Langue</h3>
              </div>
              <button
                onClick={() => setShowLanguage(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setShowLanguage(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${currentLanguage === lang.code
                    ? 'bg-brand-primary/5 border border-brand-primary/20 shadow-sm'
                    : 'bg-white border border-transparent hover:bg-slate-50 hover:border-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className={`font-semibold ${currentLanguage === lang.code ? 'text-brand-primary' : 'text-slate-700'}`}>
                      {lang.name}
                    </span>
                  </div>
                  {currentLanguage === lang.code && (
                    <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" /> {/* Or Check icon if imported, reusing ShieldCheck for now */}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Reusable Legal Modal Component
const LegalModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-heading font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <Button variant="primary" onClick={onClose} className="px-8 py-3 w-full md:w-auto">
            J'ai compris
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay: number }> = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-[2rem] flex flex-col items-center shadow-md border border-slate-100 hover:shadow-lg transition-all"
  >
    <div className="mb-4 p-3 bg-slate-50 rounded-2xl text-brand-primary">{icon}</div>
    <h3 className="text-slate-900 font-body font-bold text-lg md:text-xl mb-1 md:mb-2">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </motion.div>
);

export default WelcomeScreen;
