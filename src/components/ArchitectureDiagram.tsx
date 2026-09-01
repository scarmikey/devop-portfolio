import { useState } from 'react';
import { ARCHITECTURE, type ArchNode } from '../data/portfolio';

export default function ArchitectureDiagram() {
  const [active, setActive] = useState<ArchNode>(ARCHITECTURE[2]); // CloudFront by default

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-xl border border-line bg-panel/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-faint">REQUEST PATH</span>
          <span className="font-mono text-[10px] tracking-widest text-amber">PLANNED · IaC</span>
        </div>
        <ol className="flex flex-col gap-2">
          {ARCHITECTURE.map((node, i) => {
            const on = node.id === active.id;
            return (
              <li key={node.id} className="flex flex-col items-stretch">
                <button
                  onClick={() => setActive(node)}
                  aria-pressed={on}
                  className={`group flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                    on
                      ? 'border-line-strong bg-panel2 shadow-[0_0_0_1px_var(--color-accent)]'
                      : 'border-line bg-transparent hover:border-line-strong hover:bg-panel2/50'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] tabular-nums ${on ? 'text-accent' : 'text-faint'}`}
                  >
                    {String(i).padStart(2, '0')}
                  </span>
                  <span className={`font-sans text-sm font-semibold ${on ? 'text-fg' : 'text-muted group-hover:text-fg'}`}>
                    {node.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tracking-wider text-faint">{node.type}</span>
                </button>
                {i < ARCHITECTURE.length - 1 && (
                  <span aria-hidden className="mx-auto my-0.5 h-3 w-px bg-line-strong" />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-xl border border-line bg-panel2/60 p-5">
        <div className="font-mono text-xs tracking-widest text-faint">SELECTED NODE</div>
        <div className="mt-2 font-sans text-xl font-bold text-fg">{active.label}</div>
        <div className="mt-5 space-y-4 font-mono text-[13px]">
          <Field k="TYPE" v={active.type} />
          <Field k="PURPOSE" v={active.purpose} />
          <Field k="SECURITY" v={active.security} accent="green" />
          <Field k="DEPLOYMENT" v={active.deployment} accent="cyan" />
        </div>
      </div>
    </div>
  );
}

function Field({ k, v, accent }: { k: string; v: string; accent?: 'green' | 'cyan' }) {
  const color = accent === 'green' ? 'text-green' : accent === 'cyan' ? 'text-cyan' : 'text-fg';
  return (
    <div>
      <div className="text-[10px] tracking-widest text-faint">{k}</div>
      <div className={`mt-1 leading-relaxed ${color}`}>{v}</div>
    </div>
  );
}
