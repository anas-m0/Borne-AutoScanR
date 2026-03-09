
import React from 'react';
import { Button } from '../components/Button';
import { ScanLine, Zap, Activity, FileText, Wrench, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    onContinue: () => void;
}

const steps = [
    {
        icon: <ScanLine className="w-7 h-7" />,
        num: '01',
        title: 'Identification',
        desc: 'Identifiez votre véhicule par sa plaque, son numéro VIN ou manuellement.',
        isPrimary: true,
    },
    {
        icon: <Zap className="w-7 h-7" />,
        num: '02',
        title: 'Branchement',
        desc: 'Branchez le câble de la borne à la prise OBD de votre véhicule.',
        isPrimary: false,
    },
    {
        icon: <Activity className="w-7 h-7" />,
        num: '03',
        title: 'Diagnostic',
        desc: 'La borne analyse tous les calculateurs électroniques de votre véhicule.',
        isPrimary: true,
    },
    {
        icon: <FileText className="w-7 h-7" />,
        num: '04',
        title: 'Résultats',
        desc: 'Recevez un rapport clair et détaillé avec des explications vulgarisées.',
        isPrimary: false,
    },
    {
        icon: <Wrench className="w-7 h-7" />,
        num: '05',
        title: 'Accompagnement',
        desc: 'Nous vous mettons en relation avec des réparateurs de confiance.',
        isPrimary: true,
    },
];

const HowItWorksScreen: React.FC<Props> = ({ onContinue }) => {
    return (
        <div className="max-w-5xl mx-auto min-h-full flex flex-col items-center justify-center px-6 py-8 md:py-12 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
            >
                <span className="inline-block px-5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[10px] md:text-xs font-black tracking-widest uppercase mb-4">
                    En 5 étapes simples
                </span>
                <h2 className="text-3xl md:text-5xl font-body font-bold text-slate-900 mb-3 tracking-tight">
                    Comment ça <span className="text-brand-primary">marche ?</span>
                </h2>
                <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">
                    Voici le déroulement de votre diagnostic. C'est simple, rapide et entièrement guidé.
                </p>
            </motion.div>

            {/* Steps */}
            <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-12 relative">
                {/* Progress line (desktop) */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-brand-primary/10 via-brand-primary/30 to-brand-primary/10 -z-10 rounded-full" />

                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
                        className="flex flex-col items-center text-center group cursor-default"
                    >
                        <div className="relative mb-4">
                            {/* Glow on hover */}
                            <div className={`absolute inset-0 ${step.isPrimary ? 'bg-brand-primary/20' : 'bg-[#071538]/20'} blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100`} />

                            {/* Icon */}
                            <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-white group-hover:-translate-y-2 transition-all duration-300 shadow-sm relative z-10 ${step.isPrimary
                                ? 'bg-brand-primary border-brand-primary group-hover:shadow-[0_10px_20px_rgb(0,148,183,0.15)]'
                                : 'bg-[#071538] border-[#071538] group-hover:shadow-[0_10px_20px_rgba(7,21,56,0.3)]'
                                }`}>
                                {step.icon}

                                {/* Number badge */}
                                <span className={`absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md text-white ${step.isPrimary
                                    ? 'bg-[#071538]'
                                    : 'bg-brand-primary'
                                    }`}>
                                    {step.num}
                                </span>
                            </div>
                        </div>

                        <h4 className="text-base md:text-lg font-bold text-slate-800 mb-1 transition-colors group-hover:text-brand-primary">
                            {step.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed md:max-w-[160px] mx-auto">
                            {step.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full max-w-md"
            >
                <Button
                    variant="primary"
                    onClick={onContinue}
                    className="w-full py-6 md:py-7 text-xl shadow-xl !font-body uppercase"
                    icon={<ArrowRight className="w-6 h-6" />}
                >
                    C'est parti !
                </Button>
            </motion.div>
        </div>
    );
};

export default HowItWorksScreen;
