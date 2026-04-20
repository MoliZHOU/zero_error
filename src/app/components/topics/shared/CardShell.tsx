import type { ReactNode } from 'react';

interface CardShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  contentClassName?: string;
}

export function CardShell({ title, subtitle, children, contentClassName }: CardShellProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-4">
        <h3 style={{ color: '#4B286D' }}>{title}</h3>
        {subtitle && <p className="text-slate-500 mt-1 text-sm">{subtitle}</p>}
      </div>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
