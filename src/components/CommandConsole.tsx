import { useEffect, useRef, useState } from 'react';
import { PROFILE, PROJECTS } from '../data/portfolio';

type Line = { kind: 'in' | 'out' | 'ok' | 'warn' | 'err'; text: string };

export type ConsoleHandlers = {
  goto: (section: string) => void;
  openProject: (id: string) => void;
  toggleTheme: () => void;
  downloadCv: () => void;
  openLink: (url: string) => void;
};

const SECTIONS = ['status', 'about', 'skills', 'projects', 'architecture', 'certs', 'experience', 'contact'];

const HELP: Line[] = [
  { kind: 'out', text: 'NAVIGATION' },
  { kind: 'ok', text: '  status        jump to system status' },
  { kind: 'ok', text: '  about         professional profile' },
  { kind: 'ok', text: '  skills        technical stack' },
  { kind: 'ok', text: '  projects      project index' },
  { kind: 'ok', text: '  project <id>  open a case study' },
  { kind: 'ok', text: '  architecture  cloud architecture' },
  { kind: 'ok', text: '  certs         credential vault' },
  { kind: 'ok', text: '  experience    work history' },
  { kind: 'ok', text: '  contact       contact + links' },
  { kind: 'out', text: 'ACTIONS' },
  { kind: 'ok', text: '  github · linkedin · credly   open profiles' },
  { kind: 'ok', text: '  resume        download CV' },
  { kind: 'ok', text: '  theme         toggle light / dark' },
  { kind: 'ok', text: '  clear         reset console' },
];

export default function CommandConsole({
  open,
  onClose,
  handlers,
}: {
  open: boolean;
  onClose: () => void;
  handlers: ConsoleHandlers;
}) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: `${PROFILE.name} — interactive shell. Type "help" for commands.` },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hidx, setHidx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  const push = (...l: Line[]) => setLines((prev) => [...prev, ...l]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHidx(history.length + 1);
    push({ kind: 'in', text: cmd });

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(' ');

    if (head === 'help') return push(...HELP);
    if (head === 'clear') return setLines([]);
    if (head === 'theme') {
      handlers.toggleTheme();
      return push({ kind: 'ok', text: 'display theme toggled.' });
    }
    if (head === 'resume' || head === 'cv') {
      handlers.downloadCv();
      return push({ kind: 'ok', text: 'downloading CV…' });
    }
    if (head === 'github') return handlers.openLink(PROFILE.links.github), push({ kind: 'ok', text: 'opening GitHub ↗' });
    if (head === 'linkedin') return handlers.openLink(PROFILE.links.linkedin), push({ kind: 'ok', text: 'opening LinkedIn ↗' });
    if (head === 'credly') return handlers.openLink(PROFILE.links.credly), push({ kind: 'ok', text: 'opening Credly ↗' });
    if (head === 'whoami') return push({ kind: 'out', text: `${PROFILE.name} · ${PROFILE.location}` });
    if (head === 'project') {
      const p = PROJECTS.find((x) => x.id === arg);
      if (!p) return push({ kind: 'err', text: `unknown project: "${arg}". try: ${PROJECTS.map((x) => x.id).join(', ')}` });
      handlers.openProject(p.id);
      onClose();
      return push({ kind: 'ok', text: `opening case study: ${p.name}` });
    }
    if (cmd.toLowerCase() === 'sudo hire mikey') {
      push(
        { kind: 'out', text: 'checking authorization…' },
        { kind: 'ok', text: 'technical foundation .......... PASS' },
        { kind: 'ok', text: 'cloud & DevOps projects ....... PASS' },
        { kind: 'ok', text: 'security fundamentals ......... PASS' },
        { kind: 'ok', text: 'ACCESS GRANTED — reach out via contact.' },
      );
      handlers.goto('contact');
      return;
    }
    if (SECTIONS.includes(head)) {
      handlers.goto(head);
      onClose();
      return push({ kind: 'ok', text: `→ ${head}` });
    }
    push({ kind: 'err', text: `command not found: ${cmd}. type "help".` });
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.max(0, hidx - 1);
      setHidx(i);
      setValue(history[i] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = Math.min(history.length, hidx + 1);
      setHidx(i);
      setValue(history[i] ?? '');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const tone: Record<Line['kind'], string> = {
    in: 'text-fg',
    out: 'text-muted',
    ok: 'text-green',
    warn: 'text-amber',
    err: 'text-red',
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ${
        open ? 'translate-y-0' : 'translate-y-[calc(100%+2rem)]'
      }`}
      aria-hidden={!open}
    >
      <div className="mx-auto max-w-4xl px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="overflow-hidden rounded-xl border border-line-strong bg-elev/95 shadow-[var(--shadow)] backdrop-blur">
          <div className="flex items-center gap-2 border-b border-line bg-panel2/70 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
            <span className="ml-2 font-mono text-[11px] text-muted">mikey@devops — zsh</span>
            <button
              onClick={onClose}
              className="ml-auto font-mono text-[11px] text-faint transition-colors hover:text-fg"
              aria-label="Close console"
            >
              esc
            </button>
          </div>

          <div ref={logRef} className="max-h-[38vh] min-h-[9rem] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className={tone[l.kind]}>
                {l.kind === 'in' ? (
                  <>
                    <span className="text-accent">mikey@devops</span>
                    <span className="text-faint">:</span>
                    <span className="text-cyan">~</span>
                    <span className="text-faint">$ </span>
                    {l.text}
                  </>
                ) : (
                  <span className="whitespace-pre-wrap">{l.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-[13px]">
            <span className="text-accent">mikey@devops</span>
            <span className="text-faint">:</span>
            <span className="text-cyan">~</span>
            <span className="text-faint">$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
              placeholder="help"
              className="min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-faint"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
