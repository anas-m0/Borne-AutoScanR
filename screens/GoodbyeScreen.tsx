import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

interface Props {
    onComplete: () => void;
}

const GoodbyeScreen: React.FC<Props> = ({ onComplete }) => {
    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="min-h-full flex flex-col items-center justify-center px-6 py-12 relative z-10 w-full max-w-3xl mx-auto text-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-24 h-24 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto mb-8 shadow-inner"
            >
                <HeartHandshake className="w-12 h-12" />
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black font-body text-brand-dark mb-6 tracking-tight"
            >
                Merci de votre confiance !
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed"
            >
                AutoScanR vous souhaite une excellente route. À très bientôt !
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-2"
            >
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-brand-primary transition-all duration-1000 ease-linear"
                            strokeDasharray="125"
                            strokeDashoffset={125 - (125 * countdown) / 15}
                        />
                    </svg>
                    <span className="text-sm font-bold text-slate-500 absolute">{countdown}</span>
                </div>
                <button
                    onClick={onComplete}
                    className="text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors mt-4"
                >
                    Retourner à l'accueil
                </button>
            </motion.div>
        </div>
    );
};

export default GoodbyeScreen;
