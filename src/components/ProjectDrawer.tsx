import { useEffect } from 'react';
import type { Project } from '../data/portfolio';

const statusTone: Record<Project['status'], string> = {
  COMPLETED: 'text-green border-green/30 bg-green/10',
  BUILDING: 'text-amber border-amber/30 bg-amber/10',
  PROJECT: 'text-cyan border-cyan/30 bg-cyan/10',
};

export default function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label={project.name}>
      <button
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-line-strong bg-elev rise">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-elev/90 px-6 py-4 backdrop-blur">
          <span className="font-mono text-xs tracking-widest text-faint">CASE STUDY</span>
          <button
            onClick={onClose}
            className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            esc ✕
          </button>
        </div>

        <div className="px-6 py-6">
          <span
            className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider ${statusTone[project.status]}`}
          >
            {project.status}
          </span>
          <h2 className="mt-3 font-sans text-2xl font-bold leading-tight text-fg">{project.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-7 space-y-6">
            {project.sections.map((sec) => (
              <section key={sec.label}>
                <h3 className="mb-2 border-b border-line pb-1.5 font-mono text-[11px] tracking-widest text-faint">
                  {sec.label.toUpperCase()}
                </h3>
                <ul className="space-y-1.5">
                  {sec.body.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-fg/90">
                      <span className="mt-1 text-accent">▪</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line-strong bg-panel2 px-4 py-2.5 font-mono text-xs text-cyan transition-colors hover:bg-panel"
            >
              Open on GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
