
import React from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Heart, MessagesSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-6 py-8 md:py-12 relative z-10 w-full max-w-6xl mx-auto">

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
            Comprenez enfin les besoins de votre véhicule avec <span className="text-brand-primary font-bold">AutoScanR</span>.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full">
        <FeatureCard
          icon={<Heart className="w-8 h-8 text-rose-500" />}
          title="Bilan de Santé"
          desc="Analyse de 150 points de contrôle électronique."
          delay={0.2}
        />
        <FeatureCard
          icon={<MessagesSquare className="w-8 h-8 text-brand-primary" />}
          title="Langage Clair"
          desc="Les codes erreurs traduits en conseils simples."
          delay={0.3}
        />
        <FeatureCard
          icon={<ShieldCheck className="w-8 h-8 text-teal-500" />}
          title="Certifié Expert"
          desc="Résultats reconnus par nos partenaires."
          delay={0.4}
        />
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-md"
      >
        <Button
          variant="primary"
          onClick={onStart}
          className="w-full py-6 md:py-7 text-xl shadow-xl"
          icon={<ArrowRight className="w-6 h-6" />}
        >
          Démarrer l'analyse
        </Button>
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
    <h3 className="text-slate-900 font-heading font-bold text-base mb-2">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </motion.div>
);

export default WelcomeScreen;
