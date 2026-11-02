import {
  BookOpen,
  BrainCircuit,
  Code2,
  CodeXml,
  Database,
  Hash,
  LayoutTemplate,
  MessagesSquare,
  Server,
  Sparkles,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SkillGroup = {
  title: string
  description: string
  skills: string[]
  icon: LucideIcon
  span: string
  highlighted?: boolean
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    description:
      'The languages I use to reason through problems, structure logic, and build solutions.',
    skills: ['Python', 'C++', 'Java', 'PHP'],
    icon: Code2,
    span: 'md:col-span-1 xl:col-span-7',
  },
  {
    title: 'Frontend Development',
    description: 'Turning layouts and interactions into responsive, considered interfaces.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    icon: LayoutTemplate,
    span: 'md:col-span-1 xl:col-span-5',
  },
  {
    title: 'Backend & Frameworks',
    description: 'Connecting interfaces to application logic, APIs, and local environments.',
    skills: ['Flask', 'JSON APIs', 'XAMPP'],
    icon: Server,
    span: 'xl:col-span-4',
  },
  {
    title: 'Data Processing',
    description: 'Shaping and preparing data before it reaches a model or application.',
    skills: ['SQL', 'pandas', 'Data Preprocessing'],
    icon: Database,
    span: 'xl:col-span-4',
  },
  {
    title: 'Machine Learning',
    description: 'Exploring practical classification and prediction through data-driven projects.',
    skills: ['Random Forest', 'Predictive Modeling'],
    icon: BrainCircuit,
    span: 'md:col-span-2 xl:col-span-4',
    highlighted: true,
  },
]

export type Certification = {
  title: string
  issuer: string
  category: string
  icon: LucideIcon
}

export const certifications: Certification[] = [
  {
    title: 'HTML, CSS and JavaScript',
    issuer: 'Coursera',
    category: 'Certificate',
    icon: CodeXml,
  },
  {
    title: 'Interpersonal Skills',
    issuer: 'NPTEL',
    category: 'Certificate',
    icon: MessagesSquare,
  },
  {
    title: "Neuroverse'26",
    issuer: 'KPR Institute of Engineering and Technology',
    category: 'Participant',
    icon: Sparkles,
  },
]

export type ProjectVisualKey = 'crop' | 'heart' | 'parking'

export type ProjectMeta = {
  icon: LucideIcon
  label: string
  value: string
}

export type Project = {
  number: string
  category: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  tags: string[]
  visual: ProjectVisualKey
  featured?: boolean
  badge?: string
  meta?: ProjectMeta[]
}

export const projects: Project[] = [
  {
    number: '01',
    category: 'Agriculture · Food Tech · Rural Development',
    title: 'CropSentinel AI',
    subtitle: 'Smart Crop Health Early Warning System',
    description:
      'A hackathon concept that combines multiple signals into one early warning system for crop health risks.',
    bullets: [
      'Collaborated with Team Code Bites on an early-warning concept for crop disease and pests.',
      'Explored combining crop imagery, weather data, regional records, and outbreak history for risk assessment.',
      'Contributed to risk alerts, crop recommendations, expert escalation, and hotspot tracking.',
    ],
    tags: ['AI', 'Crop Health', 'Risk Alerts', 'Hotspot Tracking'],
    visual: 'crop',
    featured: true,
    badge: 'Smart India Hackathon 2026 Finalist',
    meta: [
      { icon: Users, label: 'Team', value: 'Code Bites' },
      { icon: Hash, label: 'Problem ID', value: '26131' },
      { icon: BookOpen, label: 'Focus', value: 'Early warning' },
    ],
  },
  {
    number: '02',
    category: 'Individual Project',
    title: 'Heart Disease Prediction',
    subtitle: 'Using Machine Learning',
    description:
      'A Flask app that turns 13 health-related inputs into a classification and estimated probability.',
    bullets: [
      'Built an interactive Flask prediction flow around a trained Random Forest classifier.',
      'Prepared and preprocessed health data with pandas.',
      'Exposed predictions through a JSON API endpoint.',
    ],
    tags: ['Python', 'Flask', 'pandas', 'Random Forest', 'JSON API'],
    visual: 'heart',
  },
  {
    number: '03',
    category: 'Individual Project',
    title: 'Smart Parking',
    subtitle: 'Management System',
    description:
      'A practical parking management system with PHP backend logic and a responsive HTML, CSS, and JavaScript frontend.',
    bullets: [
      'Built the application flow and backend logic in PHP.',
      'Set up XAMPP for local server execution and testing.',
      'Created responsive interfaces with HTML, CSS, and JavaScript.',
    ],
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    visual: 'parking',
  },
]
