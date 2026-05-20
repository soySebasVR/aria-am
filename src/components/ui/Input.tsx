import { cn } from '../../lib/utils';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-text-secondary">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full bg-navy-700 border border-subtle rounded px-3 py-2 text-sm text-text-primary',
          'placeholder:text-text-secondary/50 outline-none',
          'focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors',
          error && 'border-red-500/60',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  ),
);
Input.displayName = 'Input';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-text-secondary">{label}</label>}
      <select
        ref={ref}
        className={cn(
          'w-full bg-navy-700 border border-subtle rounded px-3 py-2 text-sm text-text-primary',
          'outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors',
          error && 'border-red-500/60',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  ),
);
Select.displayName = 'Select';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-text-secondary">{label}</label>}
      <textarea
        ref={ref}
        rows={3}
        className={cn(
          'w-full bg-navy-700 border border-subtle rounded px-3 py-2 text-sm text-text-primary resize-none',
          'placeholder:text-text-secondary/50 outline-none',
          'focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors',
          error && 'border-red-500/60',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  ),
);
Textarea.displayName = 'Textarea';
