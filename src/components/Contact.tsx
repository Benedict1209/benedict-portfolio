import {
  ArrowUpRight,
  CircleAlert,
  Mail,
  MailCheck,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { site } from '../lib/site'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import { Reveal } from './ui/Reveal'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const contactLinks = [
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'Phone',
    value: site.phone,
    href: site.phoneHref,
    icon: Phone,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'benedict-naldo',
    href: site.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'Benedict1209',
    href: site.github,
    icon: GitHubIcon,
    external: true,
  },
]

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Please add a subject (at least 3 characters).'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please add a little more detail (at least 10 characters).'
  }

  return errors
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [draftHref, setDraftHref] = useState('')

  const handleChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValues = { ...values, [field]: event.target.value }
      setValues(nextValues)

      if (errors[field]) {
        const nextErrors = validateForm(nextValues)
        setErrors((current) => ({ ...current, [field]: nextErrors[field] }))
      }
    }

  const handleBlur = (field: keyof FormValues) => () => {
    const nextErrors = validateForm(values)
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateForm(values)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0] as keyof FormValues | undefined
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus()
      setDraftHref('')
      return
    }

    const subject = `Portfolio inquiry — ${values.subject.trim()}`
    const body = `Hi Benedict,\n\n${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setDraftHref(href)
    window.location.href = href
  }

  const fields: {
    field: keyof FormValues
    label: string
    placeholder: string
    type: string
    autoComplete: string
    span?: string
    rows?: number
  }[] = [
    {
      field: 'name',
      label: 'Name',
      placeholder: 'Your name',
      type: 'text',
      autoComplete: 'name',
    },
    {
      field: 'email',
      label: 'Email',
      placeholder: 'you@example.com',
      type: 'email',
      autoComplete: 'email',
    },
    {
      field: 'subject',
      label: 'Subject',
      placeholder: 'What would you like to talk about?',
      type: 'text',
      autoComplete: 'off',
      span: 'sm:col-span-2',
    },
    {
      field: 'message',
      label: 'Message',
      placeholder: 'Tell me about the role, project, or idea...',
      type: 'text',
      autoComplete: 'off',
      span: 'sm:col-span-2',
      rows: 5,
    },
  ]

  return (
    <section id="contact" className="section-shell">
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[36rem] w-[36rem] translate-x-1/3 rounded-full bg-sky/[0.055] blur-[130px]"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.92fr] lg:gap-16 xl:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="eyebrow text-accent">07</span>
                <span className="h-px w-9 bg-white/20" aria-hidden="true" />
                <span className="eyebrow text-faint">Contact</span>
              </div>

              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[1.01] font-semibold tracking-[-0.055em] text-balance text-white">
                Have an idea?
                <br />
                Let's <span className="font-serif font-normal text-accent italic">build something</span>
                <br />
                together.
              </h2>

              <p className="mt-6 max-w-md text-[0.96rem] leading-7 text-muted">
                Whether it's an opportunity, a collaboration, or a conversation about building
                better software, I'd be glad to hear from you.
              </p>

              <div className="mt-7 flex items-center gap-2 text-[0.73rem] text-faint">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to opportunities
                <span className="mx-1 h-1 w-1 rounded-full bg-white/15" aria-hidden="true" />
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                  Coimbatore, India
                </span>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-2 sm:grid-cols-2">
              {contactLinks.map(({ label, value, href, icon: Icon, external }, index) => (
                <Reveal key={label} delay={0.06 + index * 0.04}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className="group flex h-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 transition hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.035]"
                  >
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition group-hover:border-accent/25 group-hover:bg-accent/[0.05]">
                      <Icon
                        className="h-3.5 w-3.5 text-accent/70 transition group-hover:text-accent"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[0.45rem] tracking-[0.12em] text-faint uppercase">
                        {label}
                      </span>
                      <span className="mt-1 block truncate text-[0.74rem] font-semibold text-white/75">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 flex-none text-white/20 transition group-hover:text-accent"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.16}>
              <p className="mt-6 text-[0.72rem] leading-5 text-faint">
                Prefer a direct note? Email me at{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-accent hover:decoration-accent/40"
                >
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.09}>
            <div className="glass relative overflow-hidden rounded-[1.6rem] p-5 sm:p-7">
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-accent/[0.05] blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[0.53rem] tracking-[0.15em] text-faint uppercase">
                    Send a message
                  </span>
                  <h3 className="mt-2 font-display text-[1.25rem] font-semibold tracking-[-0.03em] text-white">
                    Start a conversation
                  </h3>
                </div>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-accent/15 bg-accent/[0.05]">
                  <Mail className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} aria-hidden="true" />
                </span>
              </div>

              <form className="relative mt-6" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map(
                    ({ field, label, placeholder, type, autoComplete, span, rows }) => (
                      <div key={field} className={span ?? ''}>
                        <label
                          htmlFor={`contact-${field}`}
                          className="mb-2 flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.01em] text-white/65"
                        >
                          {label}
                          <span className="text-accent/60" aria-hidden="true">
                            *
                          </span>
                        </label>

                        {rows ? (
                          <textarea
                            id={`contact-${field}`}
                            name={field}
                            value={values[field]}
                            onChange={handleChange(field)}
                            onBlur={handleBlur(field)}
                            placeholder={placeholder}
                            rows={rows}
                            autoComplete={autoComplete}
                            required
                            aria-invalid={Boolean(errors[field])}
                            aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                            className="field resize-none"
                          />
                        ) : (
                          <input
                            id={`contact-${field}`}
                            name={field}
                            type={type}
                            value={values[field]}
                            onChange={handleChange(field)}
                            onBlur={handleBlur(field)}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            required
                            aria-invalid={Boolean(errors[field])}
                            aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                            className="field"
                          />
                        )}

                        {errors[field] ? (
                          <p
                            id={`contact-${field}-error`}
                            className="mt-1.5 flex items-start gap-1.5 text-[0.66rem] leading-4 text-[#ff9d9d]"
                          >
                            <CircleAlert className="mt-px h-3 w-3 flex-none" strokeWidth={1.8} aria-hidden="true" />
                            {errors[field]}
                          </p>
                        ) : null}
                      </div>
                    ),
                  )}
                </div>

                <p className="mt-4 text-[0.64rem] leading-5 text-faint">
                  This form opens your email app with the message ready to send. Nothing is sent or
                  stored by this website.
                </p>

                <button type="submit" className="btn btn-primary mt-5 w-full">
                  Open email draft
                  <Send className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
                </button>

                <div aria-live="polite" aria-atomic="true">
                  {draftHref ? (
                    <div className="mt-4 flex gap-3 rounded-xl border border-accent/20 bg-accent/[0.055] p-3.5">
                      <MailCheck className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.8} aria-hidden="true" />
                      <div>
                        <p className="text-[0.72rem] font-bold text-white/85">Email draft ready.</p>
                        <p className="mt-1 text-[0.66rem] leading-5 text-muted">
                          No message has been sent from this site. If your email app didn't open,{' '}
                          <a
                            href={draftHref}
                            className="font-semibold text-accent underline decoration-accent/30 underline-offset-2"
                          >
                            open the draft manually
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
