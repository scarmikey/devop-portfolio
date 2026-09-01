// Single source of truth for the portfolio. All UI renders from this.
// Only verified information — no fabricated metrics, URLs, or resources.

export const PROFILE = {
  name: 'Michael Murombedzi',
  title: 'DevOps Engineer · Cloud Engineer · Linux & Infrastructure Automation',
  roles: ['DevOps Engineer', 'Cloud Engineer', 'Linux & Infrastructure Automation'],
  location: 'Pretoria, Gauteng, South Africa',
  email: 'scarmikey13@gmail.com',
  cv: 'Michael_Murombedzi_Updated_CV_2026.pdf',
  statement:
    'I build cloud infrastructure, automate systems, understand DevOps, and continuously develop my engineering capabilities.',
  links: {
    github: 'https://github.com/scarmikey',
    githubUser: 'scarmikey',
    linkedin: 'https://www.linkedin.com/in/michael-murombedzi-b8231b258',
    credly: 'https://www.credly.com/users/michael-murombedzi',
    site: 'https://digitalmikeypro.com',
    sancs: '', // not yet supplied — never invent
  },
  education: {
    school: 'University of the People',
    degree: 'Associate Degree in Computer Science',
    period: '2024 – Present',
  },
} as const;

export type SkillGroup = { group: string; items: string[] };
export const SKILLS: SkillGroup[] = [
  { group: 'Cloud', items: ['AWS', 'Microsoft Azure', 'GCP fundamentals'] },
  { group: 'DevOps & IaC', items: ['Terraform', 'Ansible', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins'] },
  { group: 'Linux & Systems', items: ['RHEL', 'Ubuntu', 'Bash', 'Windows Server', 'Active Directory', 'Group Policy'] },
  { group: 'Programming', items: ['Python', 'Bash', 'PowerShell'] },
  { group: 'Monitoring', items: ['Prometheus', 'Grafana', 'CloudWatch', 'Loki'] },
  { group: 'Networking', items: ['TCP/IP', 'DNS', 'DHCP', 'VPN', 'VPC', 'VLAN', 'Wi-Fi'] },
  { group: 'Security', items: ['IAM', 'Linux security', 'Container/K8s security', 'ISC2 CC'] },
  { group: 'Virtualization', items: ['VMware', 'vSphere', 'VirtualBox'] },
];

export type Experience = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};
export const EXPERIENCE: Experience[] = [
  {
    role: 'System Administrator',
    company: 'DubeTC Engineering Projects',
    dates: 'January 2023 – January 2025',
    bullets: [
      'Administered and troubleshot Linux and Windows systems.',
      'Managed system configuration, user access, networking, backups and infrastructure troubleshooting.',
      'Applied Bash/Python scripting and automation to repetitive administrative tasks.',
      'Supported cloud and virtualization environments and investigated infrastructure incidents.',
    ],
  },
  {
    role: 'Cloud / DevOps Intern',
    company: 'Exlearn Technologies',
    dates: 'October 2024 – June 2025',
    bullets: [
      'Built hands-on experience with cloud infrastructure, DevOps workflows and infrastructure automation.',
      'Worked with AWS, Docker, Terraform, CI/CD concepts and Linux-based environments.',
      'Practiced container deployment, provisioning and version-controlled workflows.',
      'Supported monitoring with Prometheus and Grafana, plus DNS/infrastructure tasks.',
    ],
  },
  {
    role: 'IT Support Technician',
    company: 'Pat Groove',
    dates: 'January 2022 – December 2023',
    bullets: [
      'Provided technical support across hardware, software, operating systems and networking.',
      'Supported Windows environments, user accounts and workstation configuration.',
      'Assisted with networking, DNS and connectivity troubleshooting.',
      'Installed and configured software and hardware and performed routine maintenance.',
    ],
  },
];

export type ProjectStatus = 'COMPLETED' | 'BUILDING' | 'PROJECT';
export type CaseSection = { label: string; body: string[] };
export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  tagline: string;
  stack: string[];
  featured?: boolean;
  repo?: string;
  sections: CaseSection[];
};

export const PROJECTS: Project[] = [
  {
    id: 'cloud-resume',
    name: 'Cloud Resume Challenge — This Portfolio',
    status: 'BUILDING',
    featured: true,
    tagline: 'The portfolio is the product; the cloud infrastructure behind it is the engineering project.',
    stack: ['AWS', 'Terraform', 'S3', 'CloudFront', 'Route 53', 'Lambda', 'DynamoDB', 'Python'],
    repo: PROFILE.links.github,
    sections: [
      {
        label: 'Overview',
        body: [
          'This site is being developed into a full Cloud Resume Challenge implementation.',
          'The portfolio you are reading is the deliverable; the AWS infrastructure that serves it is the engineering work being showcased.',
        ],
      },
      {
        label: 'Planned Architecture',
        body: [
          'Static frontend hosted on S3 and delivered globally through CloudFront.',
          'Route 53 for DNS and custom domain, HTTPS enforced end-to-end.',
          'A serverless visitor counter (Lambda + DynamoDB) exposed via API Gateway.',
        ],
      },
      {
        label: 'CI/CD',
        body: ['GitHub Actions pipeline to build and deploy on push, with Terraform managing every resource as code.'],
      },
      {
        label: 'Status',
        body: ['Only services that are actually deployed will ever be shown as live. Live status is verified, never faked.'],
      },
    ],
  },
  {
    id: 'phoenix',
    name: 'Phoenix Cloud / DevOps Capstone',
    status: 'COMPLETED',
    featured: true,
    tagline: 'End-to-end cloud/DevOps project built around source control, automation and cloud deployment.',
    stack: ['Azure', 'GitHub', 'CI/CD', 'Automation'],
    repo: PROFILE.links.github,
    sections: [
      { label: 'Overview', body: ['A practical Azure-focused DevOps workflow, treated as a flagship case study.'] },
      { label: 'Implementation', body: ['Used GitHub-based CI/CD practices to manage project changes and delivery.'] },
      {
        label: 'Roadmap',
        body: ['Will be expanded with deployment evidence as the infrastructure is finalized.'],
      },
    ],
  },
  {
    id: 'ts-capstone',
    name: 'TS Academy — DevOps Capstone',
    status: 'COMPLETED',
    featured: true,
    tagline: 'Integrated DevOps capstone spanning provisioning, configuration, containers, CI/CD and monitoring.',
    stack: ['Linux', 'Git', 'AWS', 'Terraform', 'Ansible', 'Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
    repo: PROFILE.links.github,
    sections: [
      {
        label: 'Overview',
        body: ['A practical, end-to-end DevOps capstone covering the full lifecycle from infrastructure to observability.'],
      },
      {
        label: 'Infrastructure & Config',
        body: ['Terraform for Infrastructure as Code.', 'Ansible for configuration management and automation.'],
      },
      {
        label: 'Containers & Delivery',
        body: ['Docker and Kubernetes for containerized workloads.', 'GitHub Actions for CI/CD.'],
      },
      { label: 'Monitoring', body: ['Prometheus and Grafana for monitoring and observability.'] },
      {
        label: 'Outcome',
        body: ['Evaluator feedback: “Great job.” Grade recorded as 50 — the grading scale is not specified.'],
      },
    ],
  },
  {
    id: 'multicloud',
    name: 'Multi-Cloud Infrastructure',
    status: 'PROJECT',
    tagline: 'Multi-cloud infrastructure practice using Terraform and repeatable deployment principles.',
    stack: ['AWS', 'Azure', 'Terraform', 'Linux', 'Networking'],
    repo: PROFILE.links.github,
    sections: [
      { label: 'Overview', body: ['Worked across AWS and Microsoft Azure using Infrastructure as Code.'] },
      {
        label: 'Focus',
        body: ['Applied cloud networking and security concepts.', 'Emphasis on repeatable, version-controlled configuration.'],
      },
    ],
  },
  {
    id: 'nginx',
    name: 'Terraform + Docker + NGINX Deployment',
    status: 'PROJECT',
    tagline: 'Infrastructure deployment using Terraform and a containerized NGINX workload.',
    stack: ['Terraform', 'Docker', 'NGINX', 'Linux', 'Git'],
    repo: PROFILE.links.github,
    sections: [
      { label: 'Overview', body: ['Applied Infrastructure as Code to make deployment repeatable.'] },
      { label: 'Implementation', body: ['Configured and deployed a containerized NGINX app in a Linux environment.', 'Version-controlled with Git.'] },
    ],
  },
  {
    id: 'serverless',
    name: 'Serverless Cloud Application',
    status: 'PROJECT',
    tagline: 'Event-driven serverless application using AWS Lambda and API Gateway with Python.',
    stack: ['AWS Lambda', 'API Gateway', 'Python'],
    repo: PROFILE.links.github,
    sections: [
      { label: 'Overview', body: ['Applied event-driven architecture with cloud-native deployment concepts.'] },
      { label: 'Implementation', body: ['Worked with API integration through API Gateway and Python-based Lambda functions.'] },
    ],
  },
];

export type Credential = {
  name: string;
  issuer: string;
  category: string;
  issueDate?: string;
  credentialId?: string;
  status: 'EARNED' | 'COMPLETED' | 'IN PROGRESS';
  featured?: boolean;
  verificationUrl?: string;
  credlyUrl?: string;
  sancsUrl?: string;
  preview?: string; // short label used until a real asset exists
};

// Individual Credly badge URLs are intentionally omitted — the profile link is authoritative.
export const CREDENTIALS: Credential[] = [
  {
    name: 'DevOps Engineering — 4-Month Training Programme',
    issuer: 'TS Academy',
    category: 'DevOps',
    issueDate: 'August 31, 2026',
    credentialId: 'TSX5BZ8LM3947W',
    status: 'COMPLETED',
    featured: true,
    preview: 'TS ACADEMY · DEVOPS',
  },
  { name: 'Certified in Cybersecurity (CC)', issuer: 'ISC2', category: 'Security', status: 'EARNED', featured: true, credlyUrl: PROFILE.links.credly, preview: 'ISC2 · CC' },
  { name: 'Red Hat System Administration I & II', issuer: 'Red Hat', category: 'Linux', status: 'EARNED', featured: true, credlyUrl: PROFILE.links.credly, preview: 'RHCSA I & II' },
  { name: 'Introduction to Kubernetes (LFS158)', issuer: 'Linux Foundation', category: 'Kubernetes', status: 'EARNED', featured: true, credlyUrl: PROFILE.links.credly, preview: 'LF · K8S' },
  { name: 'Multicloud Network Associate', issuer: 'Aviatrix', category: 'Networking', status: 'EARNED', credlyUrl: PROFILE.links.credly },
  { name: 'Terraform Challenges', issuer: 'KodeKloud', category: 'DevOps', status: 'EARNED' },
  { name: 'Certified AI Email Security Specialist', issuer: 'Proofpoint', category: 'Security', status: 'EARNED' },
  { name: 'SnowPro Associate: Platform Certification', issuer: 'Snowflake', category: 'Data / Cloud', status: 'EARNED', credlyUrl: PROFILE.links.credly },
  { name: 'Data Streaming Engineer', issuer: 'Confluent', category: 'Data', status: 'EARNED', credlyUrl: PROFILE.links.credly },
  { name: 'Verified Foundation', issuer: 'New Relic', category: 'Observability', status: 'EARNED' },
  { name: 'AI Practitioner', issuer: 'Oracle', category: 'AI', status: 'IN PROGRESS' },
];

// Cloud Resume architecture nodes — only components that are part of the planned/real design.
export type ArchNode = {
  id: string;
  label: string;
  type: string;
  purpose: string;
  security: string;
  deployment: string;
};
export const ARCHITECTURE: ArchNode[] = [
  { id: 'user', label: 'User', type: 'Client', purpose: 'A visitor requests the portfolio in their browser.', security: 'HTTPS only', deployment: '—' },
  { id: 'route53', label: 'Route 53', type: 'DNS', purpose: 'Resolves the custom domain to the CDN distribution.', security: 'DNSSEC-capable', deployment: 'Terraform' },
  { id: 'cloudfront', label: 'CloudFront', type: 'CDN', purpose: 'Global, cached, low-latency content delivery.', security: 'HTTPS / TLS enforced', deployment: 'Terraform' },
  { id: 's3', label: 'S3', type: 'Object Storage', purpose: 'Hosts the static frontend assets.', security: 'Private bucket, OAC access', deployment: 'Terraform' },
  { id: 'apigw', label: 'API Gateway', type: 'API', purpose: 'Exposes the visitor-counter endpoint.', security: 'HTTPS, throttling', deployment: 'Terraform' },
  { id: 'lambda', label: 'Lambda', type: 'Compute', purpose: 'Serverless function that updates the visitor count.', security: 'Scoped IAM role', deployment: 'Terraform' },
  { id: 'dynamodb', label: 'DynamoDB', type: 'Database', purpose: 'Stores the persistent visitor count.', security: 'IAM-restricted access', deployment: 'Terraform' },
];
