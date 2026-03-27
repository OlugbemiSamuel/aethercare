import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '',
  ...props 
}) => {
  
  // 2. The "Wardrobe" (Different styles for different jobs)
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  };

  // 3. The "Assembly"
  return (
    <button 
      className={`px-3 py-2 rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2  ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
};