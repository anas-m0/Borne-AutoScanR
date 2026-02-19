
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden font-heading font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-blue-600 text-white shadow-brand-primary/20",
    secondary: "bg-white border-2 border-brand-primary text-brand-primary hover:bg-blue-50",
    outline: "border-2 border-slate-200 text-slate-600 hover:bg-slate-50",
    accent: "bg-brand-accent hover:bg-amber-500 text-white shadow-brand-accent/20",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {!isLoading && icon}
      {children}
    </button>
  );
};
