
import React, { useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, CornerDownLeft, Space, ChevronUp, Globe, X } from 'lucide-react';
import { useVirtualKeyboard, KeyboardLayout } from './KeyboardContext';

// ── AZERTY Layouts ──

const AZERTY_ROWS = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['SHIFT', 'w', 'x', 'c', 'v', 'b', 'n', ',', '.', 'BACKSPACE'],
    ['123', 'SPACE', 'ENTER'],
];

const AZERTY_ROWS_NUMBERS = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['-', '/', ':', ';', '(', ')', '€', '&', '@', '"'],
    ['#+=', '.', ',', '?', '!', "'", 'BACKSPACE'],
    ['ABC', 'SPACE', 'ENTER'],
];

const EMAIL_ROWS = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['SHIFT', 'w', 'x', 'c', 'v', 'b', 'n', ',', '.', 'BACKSPACE'],
    ['123', '@', 'SPACE', '.com', 'ENTER'],
];

const NUMERIC_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['+', '0', 'BACKSPACE'],
];

function getRows(layout: KeyboardLayout, showNumbers: boolean): string[][] {
    if (layout === 'numeric') return NUMERIC_ROWS;
    if (showNumbers) {
        return layout === 'email'
            ? [...AZERTY_ROWS_NUMBERS.slice(0, 3), ['ABC', '@', 'SPACE', '.com', 'ENTER']]
            : AZERTY_ROWS_NUMBERS;
    }
    return layout === 'email' ? EMAIL_ROWS : AZERTY_ROWS;
}

const VirtualKeyboard: React.FC = () => {
    const { isVisible, layout, activeElement, hideKeyboard } = useVirtualKeyboard();
    const [isShift, setIsShift] = useState(false);
    const [showNumbers, setShowNumbers] = useState(false);
    const keyboardRef = useRef<HTMLDivElement>(null);

    const triggerInputEvent = useCallback((el: HTMLInputElement | HTMLTextAreaElement, newValue: string) => {
        // Use native setter to bypass React's synthetic event system
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
            'value'
        )?.set;

        if (nativeInputValueSetter) {
            nativeInputValueSetter.call(el, newValue);
        }

        // Dispatch both input and change events
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }, []);

    const handleKeyPress = useCallback((key: string) => {
        if (!activeElement) return;

        // Keep focus on the input
        activeElement.focus();

        const start = activeElement.selectionStart ?? activeElement.value.length;
        const end = activeElement.selectionEnd ?? activeElement.value.length;
        const currentValue = activeElement.value;

        switch (key) {
            case 'BACKSPACE': {
                if (start === end && start > 0) {
                    const newValue = currentValue.slice(0, start - 1) + currentValue.slice(end);
                    triggerInputEvent(activeElement, newValue);
                    requestAnimationFrame(() => {
                        activeElement.setSelectionRange(start - 1, start - 1);
                    });
                } else if (start !== end) {
                    const newValue = currentValue.slice(0, start) + currentValue.slice(end);
                    triggerInputEvent(activeElement, newValue);
                    requestAnimationFrame(() => {
                        activeElement.setSelectionRange(start, start);
                    });
                }
                break;
            }
            case 'ENTER': {
                if (activeElement instanceof HTMLTextAreaElement) {
                    const newValue = currentValue.slice(0, start) + '\n' + currentValue.slice(end);
                    triggerInputEvent(activeElement, newValue);
                    requestAnimationFrame(() => {
                        activeElement.setSelectionRange(start + 1, start + 1);
                    });
                } else {
                    hideKeyboard();
                    activeElement.blur();
                }
                break;
            }
            case 'SPACE': {
                const newValue = currentValue.slice(0, start) + ' ' + currentValue.slice(end);
                triggerInputEvent(activeElement, newValue);
                requestAnimationFrame(() => {
                    activeElement.setSelectionRange(start + 1, start + 1);
                });
                break;
            }
            case 'SHIFT': {
                setIsShift(prev => !prev);
                return;
            }
            case '123': {
                setShowNumbers(true);
                return;
            }
            case 'ABC': {
                setShowNumbers(false);
                return;
            }
            case '#+=': {
                // Secondary symbols — could expand later
                return;
            }
            default: {
                const char = isShift ? key.toUpperCase() : key;
                const newValue = currentValue.slice(0, start) + char + currentValue.slice(end);
                const expectedLength = newValue.length;
                triggerInputEvent(activeElement, newValue);
                // Use setTimeout to let React process the onChange (which may transform
                // the value, e.g. auto-inserting dashes in the license plate field).
                // We then adjust cursor position based on any extra characters added.
                setTimeout(() => {
                    const actualLength = activeElement.value.length;
                    const extraChars = actualLength - expectedLength;
                    const cursorPos = start + char.length + Math.max(0, extraChars);
                    activeElement.setSelectionRange(cursorPos, cursorPos);
                }, 0);
                if (isShift) setIsShift(false);
                break;
            }
        }
    }, [activeElement, isShift, triggerInputEvent, hideKeyboard]);

    const renderKey = (key: string, rowIndex: number) => {
        // Determine key styling and content
        let content: React.ReactNode = isShift && key.length === 1 ? key.toUpperCase() : key;
        let className = 'flex items-center justify-center rounded-xl font-bold transition-all active:scale-95 select-none touch-manipulation ';
        let flex = 'flex-1';

        switch (key) {
            case 'BACKSPACE':
                content = <Delete size={20} />;
                className += 'bg-slate-200 text-slate-600 hover:bg-slate-300 active:bg-slate-400 ';
                flex = layout === 'numeric' ? 'flex-1' : 'flex-[1.3]';
                break;
            case 'ENTER':
                content = <CornerDownLeft size={20} />;
                className += 'bg-brand-primary text-white hover:bg-brand-primary/90 active:bg-brand-primary/80 ';
                flex = layout === 'numeric' ? 'flex-1' : 'flex-[1.3]';
                break;
            case 'SPACE':
                content = <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">espace</span>;
                className += 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 active:bg-slate-100 ';
                flex = 'flex-[4]';
                break;
            case 'SHIFT':
                content = <ChevronUp size={20} className={isShift ? 'text-white' : ''} />;
                className += isShift
                    ? 'bg-brand-primary text-white '
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300 active:bg-slate-400 ';
                flex = 'flex-[1.3]';
                break;
            case '123':
            case 'ABC':
                className += 'bg-slate-200 text-slate-700 hover:bg-slate-300 active:bg-slate-400 text-xs font-black ';
                flex = 'flex-[1.2]';
                break;
            case '@':
                className += 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/20 font-bold text-lg ';
                flex = 'flex-[0.8]';
                break;
            case '.com':
                className += 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300 text-xs font-bold ';
                flex = 'flex-[1.2]';
                break;
            default:
                if (layout === 'numeric') {
                    className += 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 active:bg-slate-100 text-xl font-bold shadow-sm ';
                } else {
                    className += 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 active:bg-slate-100 shadow-sm ';
                }
                break;
        }

        const height = layout === 'numeric' ? 'h-14' : 'h-12';

        return (
            <button
                key={`${rowIndex}-${key}`}
                className={`${className} ${height} ${flex === 'flex-1' ? 'flex-1' : ''}`}
                style={flex !== 'flex-1' ? { flex: parseFloat(flex.replace('flex-[', '').replace(']', '')) } : undefined}
                onMouseDown={(e) => {
                    e.preventDefault(); // Prevent stealing focus from the input
                    handleKeyPress(key);
                }}
                onTouchStart={(e) => {
                    e.preventDefault();
                    handleKeyPress(key);
                }}
                tabIndex={-1}
                type="button"
            >
                {content}
            </button>
        );
    };

    const rows = getRows(layout, showNumbers);

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    data-virtual-keyboard
                    ref={keyboardRef}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    className="fixed bottom-0 left-0 right-0 z-[9999]"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {/* Backdrop shadow */}
                    <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

                    <div className="bg-slate-100/95 backdrop-blur-xl border-t border-slate-200 px-2 pb-2 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                        {/* Close button row */}
                        <div className="flex justify-end mb-1 px-1">
                            <button
                                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    hideKeyboard();
                                    activeElement?.blur();
                                }}
                                tabIndex={-1}
                                type="button"
                            >
                                Fermer
                                <X size={14} />
                            </button>
                        </div>

                        {/* Keyboard rows */}
                        <div className={`flex flex-col gap-1.5 ${layout === 'numeric' ? 'max-w-xs mx-auto' : 'max-w-3xl mx-auto'}`}>
                            {rows.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex gap-1.5">
                                    {row.map((key) => renderKey(key, rowIndex))}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default VirtualKeyboard;
