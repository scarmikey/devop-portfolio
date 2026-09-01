import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolio';

const STEPS = [
  ['BIOS', 'OK'],
  ['Kernel', 'LOADED'],
  ['Network', 'CONNECTED'],
  ['Cloud services', 'READY'],
  ['Security checks', 'PASSED'],
  ['Portfolio services', 'ONLINE'],
] as const;

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [reveal, setReveal] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  useEffect(() => {
    if (prefersReduced) {
      setStep(STEPS.length);
      setReveal(true);
      const t = setTimeout(finish, 650);
      return () => clearTimeout(t);
    }
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 230 + Math.random() * 120);
      return () => clearTimeout(t);
    }
    const r = setTimeout(() => setReveal(true), 260);
    const d = setTimeout(finish, 1900);
    return () => {
      clearTimeout(r);
      clearTimeout(d);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div
      className="fixed inset-0 z-50 grid-field flex items-center justify-center bg-bg px-6"
      role="dialog"
      aria-label="System boot sequence"
    >
      <button
        onClick={finish}
        className="absolute right-4 top-4 font-mono text-xs text-muted hover:text-cyan border border-line hover:border-line-strong rounded px-3 py-1.5 transition-colors"
      >
        skip →
      </button>

      <div className="w-full max-w-md font-mono text-sm">
        <div className="text-faint mb-4 text-xs tracking-widest">MUROMBEDZI://boot — v2.6</div>

        <div className="space-y-1.5" aria-hidden={reveal}>
          {STEPS.slice(0, step).map(([label, state]) => (
            <div key={label} className="flex items-baseline gap-2 rise">
              <span className="text-fg">{label}</span>
              <span className="flex-1 overflow-hidden text-line-strong select-none">
                {'.'.repeat(28)}
              </span>
              <span className="text-green">{state}</span>
            </div>
          ))}
          {step < STEPS.length && (
            <div className="text-accent">
              <span className="caret" />
            </div>
          )}
        </div>

        {reveal && (
          <div className="mt-8 rise">
            <div className="text-faint text-xs tracking-widest mb-2">system --identity</div>
            <h1 className="font-sans font-bold text-2xl sm:text-3xl text-fg tracking-tight">
              {PROFILE.name.toUpperCase()}
            </h1>
            <div className="mt-2 space-y-0.5 text-accent text-xs sm:text-sm">
              {PROFILE.roles.map((r) => (
                <div key={r}>{r}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
