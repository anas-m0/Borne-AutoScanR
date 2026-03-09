
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { mockIssues } from '../services/mockData';
import {
    AlertTriangle, CheckCircle2, FileText, HeartPulse,
    ArrowLeft, Zap, Settings, Wind, ShieldAlert,
    Lightbulb, Wrench, CircleDollarSign, Clock, ChevronRight, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    vehicleName: string;
    onReceiveReport: () => void;
}

const SYSTEMS = [
    { id: 'engine', label: 'Moteur', icon: Settings, x: 75, y: 35 },
    { id: 'transmission', label: 'Boîte de vitesses', icon: Settings, x: 60, y: 55 },
    { id: 'brakes', label: 'Freinage / ABS', icon: ShieldAlert, x: 28, y: 65 },
    { id: 'exhaust', label: 'Échappement', icon: Wind, x: 45, y: 72 },
    { id: 'electrical', label: 'Électronique', icon: Zap, x: 65, y: 45 },
    { id: 'suspension', label: 'Suspension', icon: Settings, x: 18, y: 58 },
];

const SEVERITY_BADGE: Record<string, string> = {
    high: 'bg-rose-100 text-rose-700 border-rose-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-sky-100 text-sky-700 border-sky-200',
};
const SEVERITY_LABEL: Record<string, string> = {
    high: 'Critique', medium: 'Modéré', low: 'Mineur',
};
const URGENCY_CONFIG: Record<string, { label: string; color: string }> = {
    immediate: { label: '⚠️ Intervention immédiate', color: 'text-rose-600 bg-rose-50 border-rose-200' },
    soon: { label: '🕐 À faire rapidement', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    monitor: { label: '👁 À surveiller', color: 'text-sky-600 bg-sky-50 border-sky-200' },
};

const ResultsScreen: React.FC<Props> = ({ vehicleName, onReceiveReport }) => {
    const [activeSystem, setActiveSystem] = useState<string | null>(null);
    const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

    const issuesFor = (id: string) => mockIssues.filter(i => i.system === id);
    const hasIssues = (id: string) => issuesFor(id).length > 0;

    const totalIssues = mockIssues.length;
    const healthScore = Math.max(0, 100 - totalIssues * 10);
    const activeSystemDef = SYSTEMS.find(s => s.id === activeSystem);
    const activeIssues = activeSystem ? issuesFor(activeSystem) : [];

    return (
        <div className="max-w-7xl mx-auto flex flex-col px-6 py-4 xl:py-6 gap-4" style={{ height: '100%' }}>

            {/* ── KPI bar ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                {/* Health score */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-4 md:p-5 flex items-center gap-4 shadow-xl shadow-slate-200/40 border border-white/60 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors duration-500" />
                    <div className="relative w-16 h-16 shrink-0 drop-shadow-sm">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                            <circle
                                cx="24" cy="24" r="20" fill="none"
                                stroke={healthScore >= 70 ? '#10b981' : healthScore >= 40 ? '#f59e0b' : '#ef4444'}
                                strokeWidth="6" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${2 * Math.PI * 20 * (1 - healthScore / 100)}`}
                                className="drop-shadow-md"
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-700">{healthScore}</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xl font-black text-slate-800 uppercase tracking-tight">Score santé</p>
                    </div>
                </div>

                {/* Vehicle */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-4 md:p-5 flex flex-col justify-center shadow-xl shadow-slate-200/40 border border-white/60 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl translate-y-1/2 translate-x-1/2 group-hover:bg-brand-accent/10 transition-colors duration-500" />
                    <div className="relative z-10 flex items-center gap-3">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Véhicule analysé</p>
                            <h3 className="text-2xl font-black text-brand-dark tracking-tight truncate max-w-[150px] md:max-w-[200px]">{vehicleName}</h3>
                        </div>
                        {(() => {
                            const nameLower = vehicleName.toLowerCase();
                            let logoSrc = null;
                            if (nameLower.includes('peugeot')) logoSrc = '/brands/peugeot.png';
                            else if (nameLower.includes('renault')) logoSrc = '/brands/renault.svg';
                            else if (nameLower.includes('audi')) logoSrc = '/brands/audi.svg';
                            else if (nameLower.includes('bmw')) logoSrc = '/brands/bmw.svg';
                            else if (nameLower.includes('citroen') || nameLower.includes('citroën')) logoSrc = '/brands/citroen.svg';
                            else if (nameLower.includes('mercedes')) logoSrc = '/brands/mercedes.png';
                            else if (nameLower.includes('volkswagen') || nameLower.includes('vw')) logoSrc = '/brands/volkswagen.png';

                            return logoSrc ? (
                                <div className="w-12 h-12 ml-auto shrink-0 flex items-center justify-center p-1 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm">
                                    <img src={logoSrc} alt={vehicleName} className="w-full h-full object-contain" />
                                </div>
                            ) : null;
                        })()}
                    </div>
                </div>

                {/* Issues */}
                <div className={`rounded-3xl p-4 md:p-5 flex items-center gap-4 shadow-xl border relative overflow-hidden group ${totalIssues > 0 ? 'bg-gradient-to-br from-amber-50 to-white border-amber-100/50 shadow-amber-900/5' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100/50 shadow-emerald-900/5'}`}>
                    <div className={`absolute -right-4 -top-4 w-32 h-32 rounded-full blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-70 ${totalIssues > 0 ? 'bg-amber-400/20' : 'bg-emerald-400/20'}`} />
                    <div className={`relative z-10 p-3 lg:p-4 rounded-xl shadow-inner ${totalIssues > 0 ? 'bg-amber-500 text-white shadow-amber-600/50' : 'bg-emerald-500 text-white shadow-emerald-600/50'}`}>
                        {totalIssues > 0 ? <AlertTriangle size={24} strokeWidth={2.5} /> : <CheckCircle2 size={24} strokeWidth={2.5} />}
                    </div>
                    <div className="relative z-10">
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${totalIssues > 0 ? 'text-amber-700/60' : 'text-emerald-700/60'}`}>Anomalies</p>
                        <p className={`text-3xl font-black tracking-tight ${totalIssues > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {totalIssues} <span className="text-lg font-bold opacity-60">relevée{totalIssues !== 1 ? 's' : ''}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Single main card ── */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex-1 min-h-[450px]">
                <AnimatePresence mode="wait">

                    {/* ── Car diagram view ── */}
                    {!activeSystem && (
                        <motion.div
                            key="car"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 flex flex-col"
                        >
                            <p className="absolute top-6 left-7 text-[10px] font-black text-slate-400 uppercase tracking-widest z-10">
                                Sélectionnez un système
                            </p>

                            {/* Car + hotspots */}
                            <div className="flex-1 flex items-center justify-center p-10 pt-14">
                                <div className="relative w-full max-w-2xl">
                                    <img
                                        src="/images/voiture-scan.png"
                                        alt="Schéma véhicule"
                                        className="w-full h-auto object-contain select-none pointer-events-none"
                                        draggable={false}
                                    />
                                    {SYSTEMS.map(sys => {
                                        const faulty = hasIssues(sys.id);
                                        const Icon = sys.icon;
                                        return (
                                            <button
                                                key={sys.id}
                                                onClick={() => setActiveSystem(sys.id)}
                                                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                                                style={{ left: `${sys.x}%`, top: `${sys.y}%` }}
                                            >
                                                {faulty && (
                                                    <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-30 scale-150" />
                                                )}
                                                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${faulty ? 'bg-rose-500 border-white/80 shadow-rose-500/40 text-white hover:bg-rose-400 hover:border-white' : 'bg-emerald-500 border-white/80 shadow-emerald-500/40 text-white hover:bg-emerald-400 hover:border-white'
                                                    }`}>
                                                    <Icon size={18} strokeWidth={2.5} />
                                                </div>
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                                                    <div className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-white/10">
                                                        {sys.label}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center justify-center gap-6 pb-5 text-xs font-bold text-slate-400">
                                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Aucun défaut</span>
                                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Défaut(s) détecté(s)</span>
                            </div>
                        </motion.div>
                    )}

                    {/* ── System detail view ── */}
                    {activeSystem && (
                        <motion.div
                            key={activeSystem}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className={`flex items-center gap-5 px-8 py-6 border-b z-10 relative bg-white/80 backdrop-blur-md`}>
                                <button onClick={() => { setActiveSystem(null); setExpandedIssue(null); }} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-brand-primary hover:bg-brand-primary/10 transition-all mr-2 shrink-0 group">
                                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${hasIssues(activeSystem) ? 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-600/50' : 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-600/50'} text-white shrink-0`}>
                                    {hasIssues(activeSystem) ? <AlertTriangle size={24} strokeWidth={2.5} /> : <CheckCircle2 size={24} strokeWidth={2.5} />}
                                </div>
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${hasIssues(activeSystem) ? 'text-rose-500' : 'text-emerald-500'}`}>
                                        {hasIssues(activeSystem) ? `${activeIssues.length} défaut(s) critique(s)` : 'Statut optimal'}
                                    </p>
                                    <h3 className="text-2xl font-black text-brand-dark tracking-tight">{activeSystemDef?.label}</h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
                                {hasIssues(activeSystem) ? (
                                    activeIssues.map(issue => {
                                        const isExpanded = expandedIssue === issue.code;
                                        return (
                                            <div key={issue.code} className="bg-white rounded-[1.5rem] border border-slate-200/60 shadow-lg shadow-slate-200/20 overflow-hidden flex flex-col transition-all duration-300 hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-200/40">

                                                {/* ── Card header: toggleable button ── */}
                                                <button
                                                    onClick={() => setExpandedIssue(isExpanded ? null : issue.code)}
                                                    className={`px-6 py-5 flex items-start justify-between gap-4 text-left transition-colors border-b border-transparent ${isExpanded ? (SEVERITY_BADGE[issue.severity].includes('rose') ? 'bg-gradient-to-r from-white to-rose-50/30 border-b-rose-100' : SEVERITY_BADGE[issue.severity].includes('amber') ? 'bg-gradient-to-r from-white to-amber-50/30 border-b-amber-100' : 'bg-gradient-to-r from-white to-sky-50/30 border-b-sky-100') : 'hover:bg-slate-50/50'}`}
                                                >
                                                    <div className="flex-1 mt-0.5">
                                                        <div className="flex items-center flex-wrap gap-2.5 mb-2.5">
                                                            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">{issue.code}</span>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${SEVERITY_BADGE[issue.severity]}`}>
                                                                {SEVERITY_LABEL[issue.severity]}
                                                            </span>
                                                            <div className={`text-[10px] font-black px-2.5 py-1 rounded-lg border whitespace-nowrap shrink-0 ${URGENCY_CONFIG[issue.urgency]?.color}`}>
                                                                {URGENCY_CONFIG[issue.urgency]?.label}
                                                            </div>
                                                        </div>
                                                        <h4 className="font-black text-slate-800 text-lg leading-tight tracking-tight">{issue.title}</h4>
                                                    </div>
                                                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/30 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                                        <ChevronDown size={20} strokeWidth={2.5} />
                                                    </div>
                                                </button>

                                                {/* ── Collapsible Content ── */}
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden bg-gradient-to-b from-white to-slate-50/30"
                                                        >
                                                            <div className="p-8 space-y-8">
                                                                {/* ── Ce que ça veut dire ── */}
                                                                <div className="flex gap-4">
                                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                                                                        <Lightbulb size={20} className="text-blue-500" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Ce que ça veut dire</p>
                                                                        <p className="text-[15px] text-slate-600 leading-relaxed">{issue.simplifiedExplanation}</p>
                                                                    </div>
                                                                </div>

                                                                {/* ── Comment ça fonctionne ── */}
                                                                <div className="flex gap-4">
                                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-100 flex items-center justify-center shrink-0 shadow-sm">
                                                                        <Settings size={20} className="text-purple-500" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Le principe</p>
                                                                        <p className="text-[15px] text-slate-600 leading-relaxed">{issue.howItWorks}</p>
                                                                    </div>
                                                                </div>

                                                                {/* ── Pièces concernées ── */}
                                                                <div className="flex gap-4">
                                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-sm">
                                                                        <Wrench size={20} className="text-orange-500" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Éléments impliqués</p>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {issue.partsAffected.map(part => (
                                                                                <span key={part} className="text-xs font-bold bg-white text-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                                                                                    {part}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* ── Préconisation ── */}
                                                                <div className="bg-brand-accent/5 rounded-2xl p-5 border border-brand-accent/20 flex gap-4 items-start">
                                                                    <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                                                        <ChevronRight size={18} className="text-brand-accent" strokeWidth={3} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-1">Recommandation expert</p>
                                                                        <p className="text-sm font-bold text-slate-800 leading-relaxed">{issue.recommendation}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                                        <CheckCircle2 size={56} className="text-emerald-400 mb-4" />
                                        <p className="text-xl font-black text-slate-700">Aucun défaut détecté</p>
                                        <p className="text-sm text-slate-400 mt-2">Ce système fonctionne correctement</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* ── Footer CTA ── */}
            <div className="bg-white/80 backdrop-blur-xl p-4 md:p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col xl:flex-row items-center justify-between gap-4 relative z-10 shrink-0 mb-4 xl:mb-0">
                <div className="flex flex-col gap-2 w-full xl:w-auto">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inclus dans le rapport complet</p>
                    <div className="flex gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-xl shadow-sm"><span className="text-sm">🎬</span> Vidéos explicatives</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-xl shadow-sm"><span className="text-sm">📖</span> BDs & schémas</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl shadow-sm"><span className="text-sm">🎫</span> Articles spécialisés</span>
                    </div>
                </div>
                <Button variant="primary" onClick={onReceiveReport} className="w-full xl:w-auto px-10 py-5 text-lg shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/30 shrink-0 !font-body uppercase" icon={<FileText size={22} className="opacity-80" />}>
                    Recevoir mon rapport complet
                </Button>
            </div>
        </div>
    );
};

export default ResultsScreen;
