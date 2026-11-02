export const site = {
  name: 'Benedict Naldo P',
  displayName: 'Benedict Naldo',
  wordmark: 'BENEDICT NALDO',
  initials: 'BN',
  role: 'MCA Student · Aspiring Software Developer',
  email: 'benedictnaldo1209@gmail.com',
  phone: '+91 6379663117',
  phoneHref: 'tel:+916379663117',
  location: 'Coimbatore, Tamil Nadu, India',
  shortLocation: 'Coimbatore, India',
  linkedin: 'https://www.linkedin.com/in/benedict-naldo-834b91410/',
  github: 'https://github.com/Benedict1209',
  resume: '/resume/Benedict-Naldo-Resume.pdf',
  objective:
    'To pursue a career in software development where I can apply my programming knowledge, problem-solving abilities, and technical skills to develop effective solutions. Eager to gain practical experience, learn emerging technologies, and contribute to organizational growth while continuously improving my expertise.',
} as const

export const contactSubject = 'Portfolio inquiry'
export const contactMessage =
  "Hi Benedict,\n\nI came across your portfolio and would like to connect with you about an opportunity, collaboration, or idea.\n\nLooking forward to hearing from you."

export function gmailComposeUrl(
  subject: string = contactSubject,
  body: string = contactMessage,
): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: site.email,
    su: subject,
    body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

export type EducationItem = {
  degree: string
  abbreviation: string
  institution: string
  affiliation?: string
  location: string
  period: string
  status: string
  detail: string
}

export const education: EducationItem[] = [
  {
    degree: 'Master of Computer Applications',
    abbreviation: 'MCA',
    institution: 'Karpagam Academy of Higher Education',
    location: 'Coimbatore, Tamil Nadu',
    period: '2026 — Present',
    status: 'Currently pursuing',
    detail: 'Deepening my foundation in software development and emerging technologies.',
  },
  {
    degree: 'B.Sc. Computer Science and Application',
    abbreviation: 'B.Sc.',
    institution: 'Sri Krishna Arts and Science College',
    affiliation: 'Bharathiar University',
    location: 'Coimbatore, Tamil Nadu',
    period: '2023 — 2026',
    status: 'CGPA 7.9 / 10',
    detail: 'Built a foundation in programming, databases, and computer science fundamentals.',
  },
  {
    degree: 'Higher Secondary Certificate',
    abbreviation: 'HSC',
    institution: 'Lisieux Matriculation Higher Secondary School',
    location: 'Tamil Nadu',
    period: '2023',
    status: '65.67%',
    detail: 'Completed Class XII with a focus on core academic subjects.',
  },
  {
    degree: 'Secondary School Leaving Certificate',
    abbreviation: 'SSLC',
    institution: 'Lisieux Matriculation Higher Secondary School',
    location: 'Tamil Nadu',
    period: '2021',
    status: 'Pass',
    detail: 'Completed Class X and continued into higher secondary education.',
  },
]
