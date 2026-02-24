
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { mockIssues } from '../services/mockData';
import {
    AlertTriangle, CheckCircle2, FileText, HeartPulse, X,
    ChevronRight, Zap, Settings, Wind, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    vehicleName: string;
    onReceiveReport: () => void;
}

// ── Vehicle systems definition ─────────────────────────────────────────────
// Position is expressed as % of the car image container (left, top)
const SYSTEMS = [
    { id: 'engine', label: 'Moteur', icon: Settings, x: 74, y: 38 },
    { id: 'transmission', label: 'Boîte de vitesses', icon: Settings, x: 55, y: 60 },
    { id: 'brakes', label: 'Freinage / ABS', icon: ShieldAlert, x: 30, y: 62 },
    { id: 'exhaust', label: 'Échappement & Dépollution', icon: Wind, x: 42, y: 75 },
    { id: 'electrical', label: 'Électronique', icon: Zap, x: 62, y: 42 },
    { id: 'suspension', label: 'Suspension', icon: Settings, x: 20, y: 58 },
];

const SEVERITY_LABEL: Record<string, string> = {
    high: 'Critique',
    medium: 'Modéré',
    low: 'Mineur',
};
const SEVERITY_COLOR: Record<string, string> = {
    high: 'text-rose-600 bg-rose-50 border-rose-200',
    medium: 'text-amber-600 bg-amber-50 border-amber-200',
    low: 'text-sky-600 bg-sky-50 border-sky-200',
};

const ResultsScreen: React.FC<Props> = ({ vehicleName, onReceiveReport }) => {
    const [activeSystem, setActiveSystem] = useState<string | null>(null);

    const issuesBySystem = (sysId: string) =>
        mockIssues.filter(i => i.system === sysId);

    const hasIssues = (sysId: string) => issuesBySystem(sysId).length > 0;

    const totalIssues = mockIssues.length;
    const healthScore = Math.max(0, 100 - totalIssues * 10);

    const activeIssues = activeSystem ? issuesBySystem(activeSystem) : [];
    const activeSystemDef = SYSTEMS.find(s => s.id === activeSystem);

    return (
        <div className="max-w-7xl mx-auto min-h-full flex flex-col px-6 py-8 gap-6">

            {/* ── Top KPI bar ── */}
            <div className="grid grid-cols-3 gap-4">
                {/* Health score */}
                <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-md border border-slate-100">
                    <div className="relative w-14 h-14 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                            <circle
                                cx="24" cy="24" r="20" fill="none"
                                stroke={healthScore >= 70 ? '#10b981' : healthScore >= 40 ? '#f59e0b' : '#ef4444'}
                                strokeWidth="5" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${2 * Math.PI * 20 * (1 - healthScore / 100)}`}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-700">
                            {healthScore}
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score santé</p>
                        <p className="text-lg font-black text-slate-800">
                            {healthScore >= 70 ? 'Bon état' : healthScore >= 40 ? 'Vigilance' : 'Critique'}
                        </p>
                    </div>
                </div>

                {/* Vehicle */}
                <div className="bg-white rounded-3xl p-5 flex flex-col justify-center shadow-md border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Véhicule analysé</p>
                    <h3 className="text-xl font-bold text-brand-primary truncate">{vehicleName}</h3>
                </div>

                {/* Issues count */}
                <div className={`rounded-3xl p-5 flex items-center gap-4 shadow-md border ${totalIssues > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div className={`p-3 rounded-2xl ${totalIssues > 0 ? 'bg-amber-500' : 'bg-emerald-500'} text-white`}>
                        {totalIssues > 0 ? <AlertTriangle size={22} /> : <CheckCircle2 size={22} />}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Anomalies</p>
                        <p className={`text-2xl font-black ${totalIssues > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                            {totalIssues} relevée{totalIssues !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Main area: Car diagram + side panel ── */}
            <div className="flex-1 flex gap-6 min-h-0">

                {/* Car diagram */}
                <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden flex flex-col">
                    <p className="absolute top-6 left-7 text-[10px] font-black text-slate-400 uppercase tracking-widest z-10">
                        Cliquez sur un système
                    </p>

                    {/* Car image */}
                    <div className="relative flex-1 flex items-center justify-center p-10 pt-14">
                        <div className="relative w-full max-w-2xl">
                            <img
                                src="/images/voiture-scan.png"
                                alt="Schéma véhicule"
                                className="w-full h-auto object-contain opacity-90 select-none pointer-events-none"
                                draggable={false}
                            />

                            {/* System hotspots */}
                            {SYSTEMS.map((sys) => {
                                const faulty = hasIssues(sys.id);
                                const isActive = activeSystem === sys.id;
                                const Icon = sys.icon;
                                return (
                                    <button
                                        key={sys.id}
                                        onClick={() => setActiveSystem(isActive ? null : sys.id)}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                                        style={{ left: `${sys.x}%`, top: `${sys.y}%` }}
                                    >
                                        {/* Pulse ring (only for faulty) */}
                                        {faulty && (
                                            <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-30 scale-150" />
                                        )}
                                        {/* Dot */}
                                        <div className={`relative w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-200 ${isActive
                                                ? faulty ? 'bg-rose-500 border-white scale-125' : 'bg-emerald-500 border-white scale-125'
                                                : faulty ? 'bg-rose-500 border-rose-300 hover:scale-110' : 'bg-emerald-500 border-emerald-300 hover:scale-110'
                                            }`}>
                                            <Icon size={14} className="text-white" />
                                        </div>
                                        {/* Tooltip label */}
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                            {sys.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 pb-5 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Aucun défaut
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Défaut(s) détecté(s)
                        </span>
                    </div>
                </div>

                {/* Side panel — detail of selected system */}
                <AnimatePresence mode="wait">
                    {activeSystem ? (
                        <motion.div
                            key={activeSystem}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
                            className="w-80 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col overflow-hidden"
                        >
                            {/* Panel header */}
                            <div className={`p-6 flex items-center justify-between ${hasIssues(activeSystem) ? 'bg-rose-50' : 'bg-emerald-50'}`}>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                        {hasIssues(activeSystem) ? `${activeIssues.length} défaut(s)` : 'Système OK'}
                                    </p>
                                    <h3 className="text-lg font-black text-slate-800">{activeSystemDef?.label}</h3>
                                </div>
                                <button onClick={() => setActiveSystem(null)} className="text-slate-400 hover:text-slate-700 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Issues list or OK state */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {hasIssues(activeSystem) ? (
                                    activeIssues.map(issue => (
                                        <div key={issue.code} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                            {/* Severity badge */}
                                            <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mb-2 ${SEVERITY_COLOR[issue.severity]}`}>
                                                {SEVERITY_LABEL[issue.severity]}
                                            </span>
                                            <p className="text-xs font-mono text-slate-400 mb-1">{issue.code}</p>
                                            <h4 className="font-black text-slate-800 text-sm mb-2">{issue.title}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-3">{issue.description}</p>
                                            <div className="border-t border-slate-200 pt-3">
                                                <p className="text-[9px] font-black text-brand-accent uppercase tracking-widest mb-1">Préconisation</p>
                                                <p className="text-xs font-bold text-slate-700">{issue.recommendation}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                                        <CheckCircle2 size={40} className="text-emerald-400 mb-3" />
                                        <p className="font-black text-slate-700">Aucun défaut</p>
                                        <p className="text-xs text-slate-400 mt-1">Ce système est en bon état</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-80 bg-white/60 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                                <HeartPulse size={28} className="text-slate-300" />
                            </div>
                            <p className="font-black text-slate-400 text-sm">Sélectionnez</p>
                            <p className="text-xs text-slate-300 mt-1">un système sur la voiture pour voir ses défauts</p>

                            {/* Quick system list */}
                            <div className="mt-6 w-full space-y-2">
                                {SYSTEMS.map(sys => {
                                    const faulty = hasIssues(sys.id);
                                    return (
                                        <button
                                            key={sys.id}
                                            onClick={() => setActiveSystem(sys.id)}
                                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group"
                                        >
                                            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{sys.label}</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-2 h-2 rounded-full ${faulty ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                                <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Bottom CTA bar ── */}
            <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Dossier #0843-X • Protocole sécurisé
                </p>
                <Button variant="primary" onClick={onReceiveReport} className="w-full md:w-auto px-12 py-4 text-lg" icon={<FileText />}>
                    Recevoir le rapport complet
                </Button>
            </div>
        </div>
    );
};

export default ResultsScreen;
