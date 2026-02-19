
import React from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Heart, MessagesSquare, ScanLine, Zap, Activity, FileText, Wrench } from 'lucide-react';
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

      {/* Enhanced Service Steps Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full mb-12 bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-800 mb-10 text-center">
          Comment ça <span className="text-brand-primary">marche ?</span>
        </h3>

        <div className="flex flex-col md:flex-row items-start justify-between relative gap-8 md:gap-4">
          {/* Desktop Progress Line */}
          <div className="hidden md:block absolute top-8 left-10 right-10 h-1 bg-gradient-to-r from-brand-primary/10 via-brand-primary/30 to-brand-primary/10 -z-10 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-brand-primary/20 animate-pulse-glow"></div>
          </div>

          {[
            { icon: <ScanLine className="w-6 h-6" />, title: "Identification", desc: "Identification du véhicule", num: "01" },
            { icon: <Zap className="w-6 h-6" />, title: "Branchement", desc: "Connexion à la prise OBD", num: "02" },
            { icon: <Activity className="w-6 h-6" />, title: "Diagnostic", desc: "Analyse des calculateurs", num: "03" },
            { icon: <FileText className="w-6 h-6" />, title: "Résultats", desc: "Rapport clair et détaillé", num: "04" },
            { icon: <Wrench className="w-6 h-6" />, title: "Accompagnement", desc: "Mise en relation experte", num: "05" },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative z-10 group w-full md:flex-1">
              <div className="relative mb-5">
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>

                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-brand-primary group-hover:text-brand-primary group-hover:-translate-y-2 transition-all duration-300 shadow-sm group-hover:shadow-[0_10px_20px_rgb(0,148,183,0.15)] relative z-10">
                  {step.icon}
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {step.num}
                  </span>
                </div>
              </div>

              <h4 className="text-sm md:text-base font-bold text-slate-800 mb-1 group-hover:text-brand-primary transition-colors">
                {step.title}
              </h4>
              <p className="text-[10px] md:text-xs text-slate-500 leading-tight md:max-w-[120px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

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
