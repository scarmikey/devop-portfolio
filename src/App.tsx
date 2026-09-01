import { useEffect, useRef, useState } from 'react';
import { PROFILE, PROJECTS, SKILLS, EXPERIENCE, CREDENTIALS, type Project } from './data/portfolio';
import BootSequence from './components/BootSequence';
import CommandConsole, { type ConsoleHandlers } from './components/CommandConsole';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import CredentialVault from './components/CredentialVault';
import ProjectDrawer from './components/ProjectDrawer';

const NAV = [
  { id: 'status', label: 'status' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'architecture', label: 'architecture' },
  { id: 'certs', label: 'certs' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
];

const statusTone: Record<Project['status'], string> = {
  COMPLETED: 'text-green',
  BUILDING: 'text-amber',
  PROJECT: 'text-cyan',
};

export default function App() {
  const [booted, setBooted] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem('mm_booted') === '1';
  });
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [active, setActive] = useState<Project | null>(null);
  const [current, setCurrent] = useState('status');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global shortcut: "/" opens the console
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA';
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setConsoleOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (!booted) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [booted]);

  const goto = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handlers: ConsoleHandlers = {
    goto,
    openProject: (id) => setActive(PROJECTS.find((p) => p.id === id) ?? null),
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    downloadCv: () => window.open(PROFILE.cv, '_blank'),
    openLink: (url) => window.open(url, '_blank', 'noopener'),
  };

  if (!booted) {
    return (
      <BootSequence
        onDone={() => {
          sessionStorage.setItem('mm_booted', '1');
          setBooted(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-full grid-field">
      {/* Top status bar */}
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
          </div>
          <span className="font-mono text-xs text-muted">mikey@devops</span>
          <span className="hidden font-mono text-[11px] text-faint sm:inline">— {PROFILE.location}</span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-green">
            <span className="live-dot">●</span> SYSTEM READY
          </span>
          <button
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className="rounded border border-line px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[180px_1fr]">
        {/* Sidebar nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-20 space-y-1">
            <div className="mb-2 px-2 font-mono text-[10px] tracking-widest text-faint">NAVIGATION</div>
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goto(n.id)}
                className={`block w-full rounded-md px-2.5 py-1.5 text-left font-mono text-[13px] transition-colors ${
                  current === n.id ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-panel2/60 hover:text-fg'
                }`}
              >
                {n.label}
              </button>
            ))}
            <div className="mb-2 mt-4 px-2 font-mono text-[10px] tracking-widest text-faint">EXTERNAL</div>
            <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="block rounded-md px-2.5 py-1.5 font-mono text-[13px] text-muted hover:text-cyan">
              GitHub ↗
            </a>
            <a href={PROFILE.links.credly} target="_blank" rel="noopener noreferrer" className="block rounded-md px-2.5 py-1.5 font-mono text-[13px] text-muted hover:text-cyan">
              Credly ↗
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" className="block rounded-md px-2.5 py-1.5 font-mono text-[13px] text-muted hover:text-cyan">
              LinkedIn ↗
            </a>
          </nav>
        </aside>

        <main className="min-w-0 space-y-16">
          {/* HERO */}
          <section aria-labelledby="hero-h">
            <div className="font-mono text-xs text-faint">mikey@devops:~$ system --profile</div>
            <h1 id="hero-h" className="mt-4 font-sans text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl">
              {PROFILE.name}
            </h1>
            <p className="mt-3 max-w-2xl font-mono text-sm text-accent sm:text-base">
              {PROFILE.roles.join('  ·  ')}
            </p>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">“{PROFILE.statement}”</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <button
                onClick={() => setConsoleOpen(true)}
                className="rounded-lg border border-accent bg-accent/10 px-4 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent/20"
              >
                launch terminal <span className="ml-1 text-faint">/</span>
              </button>
              <button
                onClick={() => goto('projects')}
                className="rounded-lg border border-line-strong bg-panel2 px-4 py-2.5 font-mono text-xs text-fg transition-colors hover:bg-panel"
              >
                view projects
              </button>
              <a
                href={PROFILE.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                download CV ↓
              </a>
            </div>
          </section>

          {/* STATUS — ops center */}
          <Section id="status" title="System Status" note="operational overview">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <StatTile k="Cloud" v="AWS · Azure" sub="IaC-focused cloud engineering" tone="cyan" />
              <StatTile k="DevOps" v="CI/CD" sub="Terraform · Docker · K8s · Actions" tone="accent" />
              <StatTile k="Security" v="ISC2 CC" sub="Security-minded infrastructure" tone="green" />
              <StatTile k="Credentials" v={`${CREDENTIALS.length} tracked`} sub="Verified via Credly" tone="blue" />
              <StatTile k="Projects" v={`${PROJECTS.length} in index`} sub="Cloud & DevOps builds" tone="cyan" />
              <StatTile k="Education" v="CS" sub="Assoc. Degree · in progress" tone="amber" />
            </div>
            <div className="mt-4 grid gap-2 rounded-xl border border-line bg-panel/60 p-4 font-mono text-[12px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['PORTFOLIO', 'ONLINE', 'green'],
                ['CLOUD RESUME', 'BUILDING', 'amber'],
                ['TS DEVOPS', 'COMPLETED', 'green'],
                ['ORACLE AI', 'IN PROGRESS', 'amber'],
              ].map(([k, v, tone]) => (
                <div key={k} className="flex items-center justify-between border-b border-line pb-1.5 sm:border-0 sm:pb-0">
                  <span className="text-faint">{k}</span>
                  <span className={tone === 'green' ? 'text-green' : 'text-amber'}>● {v}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ABOUT */}
          <Section id="about" title="About" note="profile">
            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
              <div className="rounded-xl border border-line bg-panel/60 p-6">
                <p className="text-[15px] leading-relaxed text-fg/90">
                  Cloud and DevOps-focused engineer with hands-on experience in Linux administration, cloud
                  infrastructure, containerization, Infrastructure as Code and CI/CD automation. I care about systems
                  that are repeatable, observable and secure by default.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Currently pursuing an Associate Degree in Computer Science while continuously building practical
                  cloud and DevOps projects — including turning this very portfolio into a Cloud Resume deployment.
                </p>
              </div>
              <dl className="space-y-3 rounded-xl border border-line bg-panel2/50 p-6 font-mono text-[12px]">
                <Meta k="LOCATION" v={PROFILE.location} />
                <Meta k="EDUCATION" v={`${PROFILE.education.degree}, ${PROFILE.education.school}`} />
                <Meta k="PERIOD" v={PROFILE.education.period} />
                <Meta k="EMAIL" v={PROFILE.email} href={`mailto:${PROFILE.email}`} />
              </dl>
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills" title="Technical Stack" note="capabilities">
            <div className="grid gap-3 sm:grid-cols-2">
              {SKILLS.map((g) => (
                <div key={g.group} className="rounded-xl border border-line bg-panel/60 p-4">
                  <div className="mb-2.5 font-mono text-[11px] tracking-widest text-faint">{g.group.toUpperCase()}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="rounded-md border border-line bg-panel2/60 px-2 py-1 font-mono text-[11px] text-fg/85">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* PROJECTS */}
          <Section id="projects" title="Projects" note="case studies">
            <div className="grid gap-4 md:grid-cols-2">
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="group relative overflow-hidden rounded-xl border border-line bg-panel/60 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-panel2"
                >
                  {p.featured && (
                    <span className="absolute right-4 top-4 font-mono text-[9px] tracking-widest text-accent">★ FEATURED</span>
                  )}
                  <span className={`font-mono text-[10px] tracking-widest ${statusTone[p.status]}`}>● {p.status}</span>
                  <h3 className="mt-2 font-sans text-base font-semibold leading-snug text-fg">{p.name}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map((s) => (
                      <span key={s} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-faint">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 6 && (
                      <span className="font-mono text-[10px] text-faint">+{p.stack.length - 6}</span>
                    )}
                  </div>
                  <span className="mt-4 inline-block font-mono text-[11px] text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    inspect case study →
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* ARCHITECTURE */}
          <Section id="architecture" title="Cloud Architecture" note="cloud resume · request path">
            <p className="mb-4 max-w-2xl text-[14px] leading-relaxed text-muted">
              This portfolio is being deployed as a Cloud Resume Challenge project. Select a node to inspect its role.
              Only components that are part of the real design are shown — live status is never faked.
            </p>
            <ArchitectureDiagram />
          </Section>

          {/* CERTS */}
          <Section id="certs" title="Credential Vault" note="verified credentials">
            <CredentialVault />
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience" title="Experience" note="work history">
            <div className="space-y-3">
              {EXPERIENCE.map((e) => (
                <div key={e.company} className="rounded-xl border border-line bg-panel/60 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-sans text-base font-semibold text-fg">{e.role}</h3>
                    <span className="font-mono text-[11px] text-faint">{e.dates}</span>
                  </div>
                  <div className="font-mono text-[12px] text-accent">{e.company}</div>
                  <ul className="mt-3 space-y-1.5">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                        <span className="mt-1 text-line-strong">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* CONTACT */}
          <Section id="contact" title="Contact" note="get in touch">
            <div className="rounded-xl border border-line-strong bg-gradient-to-br from-panel to-panel2 p-6 sm:p-8">
              <p className="max-w-xl text-[15px] leading-relaxed text-fg/90">
                Open to DevOps, Cloud and Infrastructure roles. The fastest way to reach me is email — or run{' '}
                <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[12px] text-accent">sudo hire mikey</code>{' '}
                in the terminal.
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <ContactLink label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
                <ContactLink label="GitHub" value="github.com/scarmikey" href={PROFILE.links.github} external />
                <ContactLink label="LinkedIn" value="michael-murombedzi" href={PROFILE.links.linkedin} external />
                <ContactLink label="Credly" value="credly.com/users/…" href={PROFILE.links.credly} external />
              </div>
            </div>
          </Section>

          <footer className="border-t border-line pt-6 font-mono text-[11px] text-faint">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} {PROFILE.name} · Built as a Cloud Resume project</span>
              <span>
                Press <span className="text-accent">/</span> for terminal · ↑↓ history · reduced-motion aware
              </span>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating console launcher */}
      {!consoleOpen && (
        <button
          onClick={() => setConsoleOpen(true)}
          className="fixed bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border border-line-strong bg-elev/90 px-4 py-2.5 font-mono text-xs text-accent shadow-[var(--shadow)] backdrop-blur transition-colors hover:bg-panel2"
          aria-label="Open terminal console"
        >
          <span className="caret" /> terminal
        </button>
      )}

      <CommandConsole open={consoleOpen} onClose={() => setConsoleOpen(false)} handlers={handlers} />
      <ProjectDrawer project={active} onClose={() => setActive(null)} />
    </div>
  );
}

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-20">
      <div className="mb-5 flex items-baseline gap-3 border-b border-line pb-2.5">
        <h2 id={`${id}-h`} className="font-sans text-lg font-semibold text-fg">
          {title}
        </h2>
        <span className="font-mono text-[11px] tracking-widest text-faint">// {note}</span>
      </div>
      {children}
    </section>
  );
}

function StatTile({ k, v, sub, tone }: { k: string; v: string; sub: string; tone: 'cyan' | 'accent' | 'green' | 'blue' | 'amber' }) {
  const c = { cyan: 'text-cyan', accent: 'text-accent', green: 'text-green', blue: 'text-blue', amber: 'text-amber' }[tone];
  return (
    <div className="rounded-xl border border-line bg-panel/60 p-4 transition-colors hover:border-line-strong">
      <div className="font-mono text-[11px] tracking-widest text-faint">{k.toUpperCase()}</div>
      <div className={`mt-1.5 font-sans text-xl font-bold ${c}`}>{v}</div>
      <div className="mt-1 text-[12px] text-muted">{sub}</div>
    </div>
  );
}

function Meta({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] tracking-widest text-faint">{k}</dt>
      <dd className="text-fg/90">
        {href ? (
          <a href={href} className="text-cyan hover:underline">
            {v}
          </a>
        ) : (
          v
        )}
      </dd>
    </div>
  );
}

function ContactLink({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center justify-between rounded-lg border border-line bg-bg/40 px-4 py-3 transition-colors hover:border-line-strong hover:bg-panel"
    >
      <div>
        <div className="font-mono text-[10px] tracking-widest text-faint">{label.toUpperCase()}</div>
        <div className="font-mono text-[13px] text-fg">{value}</div>
      </div>
      <span className="text-cyan transition-transform group-hover:translate-x-0.5">{external ? '↗' : '→'}</span>
    </a>
  );
}
