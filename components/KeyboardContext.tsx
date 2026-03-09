
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

export type KeyboardLayout = 'text' | 'numeric' | 'email';

interface KeyboardContextType {
    isVisible: boolean;
    layout: KeyboardLayout;
    activeElement: HTMLInputElement | HTMLTextAreaElement | null;
    showKeyboard: (element: HTMLInputElement | HTMLTextAreaElement) => void;
    hideKeyboard: () => void;
}

const KeyboardContext = createContext<KeyboardContextType>({
    isVisible: false,
    layout: 'text',
    activeElement: null,
    showKeyboard: () => { },
    hideKeyboard: () => { },
});

export const useVirtualKeyboard = () => useContext(KeyboardContext);

function getLayoutForElement(el: HTMLInputElement | HTMLTextAreaElement): KeyboardLayout {
    const type = el.getAttribute('type') || 'text';
    const inputMode = el.getAttribute('inputMode') || el.getAttribute('inputmode') || '';

    if (type === 'tel' || inputMode === 'numeric' || type === 'number') {
        return 'numeric';
    }
    if (type === 'email') {
        return 'email';
    }
    return 'text';
}

export const KeyboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [layout, setLayout] = useState<KeyboardLayout>('text');
    const [activeElement, setActiveElement] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const hideTimeoutRef = useRef<number | null>(null);

    const showKeyboard = useCallback((element: HTMLInputElement | HTMLTextAreaElement) => {
        // Cancel any pending hide
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setActiveElement(element);
        setLayout(getLayoutForElement(element));
        setIsVisible(true);
    }, []);

    const hideKeyboard = useCallback(() => {
        // Small delay to allow clicking keyboard keys without closing
        hideTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(false);
            setActiveElement(null);
        }, 150);
    }, []);

    useEffect(() => {
        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement
            ) {
                // Skip checkbox, radio, date, file inputs etc.
                const type = target.getAttribute('type') || 'text';
                const nonTextTypes = ['checkbox', 'radio', 'file', 'hidden', 'range', 'color', 'date', 'datetime-local', 'month', 'week', 'time'];
                if (target instanceof HTMLInputElement && nonTextTypes.includes(type)) {
                    return;
                }
                showKeyboard(target as HTMLInputElement | HTMLTextAreaElement);
            }
        };

        const handleFocusOut = (e: FocusEvent) => {
            const relatedTarget = e.relatedTarget as HTMLElement | null;
            // If focus is going to the keyboard itself, don't hide
            if (relatedTarget && relatedTarget.closest('[data-virtual-keyboard]')) {
                return;
            }
            hideKeyboard();
        };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);

        return () => {
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [showKeyboard, hideKeyboard]);

    return (
        <KeyboardContext.Provider value={{ isVisible, layout, activeElement, showKeyboard, hideKeyboard }}>
            {children}
        </KeyboardContext.Provider>
    );
};
