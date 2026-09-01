import { useMemo, useState } from 'react';
import { CREDENTIALS, PROFILE, type Credential } from '../data/portfolio';

const statusColor: Record<Credential['status'], string> = {
  EARNED: 'text-green',
  COMPLETED: 'text-green',
  'IN PROGRESS': 'text-amber',
};

function Badge({ preview, issuer }: { preview?: string; issuer: string }) {
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line-strong bg-gradient-to-br from-panel to-panel2 text-center">
      <span className="px-1 font-mono text-[8px] leading-tight tracking-wider text-accent">
        {preview ?? issuer}
      </span>
    </div>
  );
}

export default function CredentialVault() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(CREDENTIALS.map((c) => c.category)))],
    [],
  );
  const [filter, setFilter] = useState('All');
  const featured = CREDENTIALS.filter((c) => c.featured);
  const visible = CREDENTIALS.filter((c) => filter === 'All' || c.category === filter);

  return (
    <div className="space-y-8">
      {/* Verification hub */}
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={PROFILE.links.credly}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-lg border border-line bg-panel/70 px-4 py-3 transition-colors hover:border-line-strong hover:bg-panel2"
        >
          <div>
            <div className="font-mono text-[10px] tracking-widest text-faint">VERIFY</div>
            <div className="font-sans text-sm font-semibold text-fg">View Credly Profile</div>
          </div>
          <span className="text-cyan transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="flex items-center justify-between rounded-lg border border-dashed border-line px-4 py-3">
          <div>
            <div className="font-mono text-[10px] tracking-widest text-faint">SANCS</div>
            <div className="font-sans text-sm text-muted">
              {PROFILE.links.sancs ? 'Verification available' : 'Verification link pending'}
            </div>
          </div>
          <span className="live-dot text-amber">●</span>
        </div>
      </div>

      {/* Featured */}
      <div>
        <div className="mb-3 font-mono text-[11px] tracking-widest text-faint">FEATURED CREDENTIALS</div>
        <div className="grid gap-3 md:grid-cols-2">
          {featured.map((c) => (
            <article
              key={c.name}
              className="flex gap-4 rounded-xl border border-line bg-panel/70 p-4 transition-all hover:border-line-strong hover:bg-panel2"
            >
              <Badge preview={c.preview} issuer={c.issuer} />
              <div className="min-w-0">
                <h4 className="font-sans text-sm font-semibold leading-snug text-fg">{c.name}</h4>
                <p className="mt-0.5 font-mono text-[11px] text-muted">
                  {c.issuer} · {c.category}
                </p>
                {c.issueDate && (
                  <p className="mt-1 font-mono text-[11px] text-faint">Certified {c.issueDate}</p>
                )}
                {c.credentialId && (
                  <p className="font-mono text-[11px] text-faint">ID {c.credentialId}</p>
                )}
                <div className="mt-2 flex items-center gap-3">
                  <span className={`font-mono text-[11px] ${statusColor[c.status]}`}>● {c.status}</span>
                  {c.credlyUrl && (
                    <a
                      href={c.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-cyan hover:underline"
                    >
                      Credly ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full library with filter */}
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] tracking-widest text-faint">LIBRARY</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide transition-colors ${
                filter === cat
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-line text-muted hover:border-line-strong hover:text-fg'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full border-collapse font-mono text-[12px]">
            <thead>
              <tr className="bg-panel2/60 text-left text-faint">
                <th className="px-4 py-2.5 font-medium tracking-wider">CREDENTIAL</th>
                <th className="hidden px-4 py-2.5 font-medium tracking-wider sm:table-cell">ISSUER</th>
                <th className="hidden px-4 py-2.5 font-medium tracking-wider md:table-cell">CATEGORY</th>
                <th className="px-4 py-2.5 font-medium tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => (
                <tr key={c.name} className="border-t border-line transition-colors hover:bg-panel2/40">
                  <td className="px-4 py-2.5 text-fg">
                    {c.name}
                    <span className="text-faint sm:hidden"> · {c.issuer}</span>
                  </td>
                  <td className="hidden px-4 py-2.5 text-muted sm:table-cell">{c.issuer}</td>
                  <td className="hidden px-4 py-2.5 text-muted md:table-cell">{c.category}</td>
                  <td className={`px-4 py-2.5 ${statusColor[c.status]}`}>● {c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
