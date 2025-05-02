import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
};

const base = 'px-4 py-2 rounded font-semibold transition-colors duration-200 shadow-sm';

const variants = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700',
  secondary: 'bg-white text-purple-800 border border-purple-400 hover:bg-purple-100',
  outline: 'bg-transparent border border-white text-white hover:bg-white hover:text-purple-900',
};

export const Button = ({ variant = 'primary', className = '', ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
};

export default Button;