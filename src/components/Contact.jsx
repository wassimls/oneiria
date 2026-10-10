import { useCallback, useMemo, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { CONTACT_ENDPOINT, CONTACT_METHOD, HONEYTRAP_FIELD, MESSAGE_MAX_LENGTH, PROJECT_TYPES } from '../config/site.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const { t } = useLocale()
  const { contact } = t

  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    type: PROJECT_TYPES[0] ?? '',
    message: '',
    [HONEYTRAP_FIELD]: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | ok | error | unconfigured
  const statusRef = useRef(null)

  const configured = useMemo(() => CONTACT_ENDPOINT.trim().length > 0, [])

  const set = (key) => (e) => {
    const { value } = e.target
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = useCallback(() => {
    const next = {}
    if (!values.name.trim()) next.name = contact.required
    if (!values.email.trim()) next.email = contact.required
    else if (!EMAIL_RE.test(values.email.trim())) next.email = contact.invalidEmail
    if (!values.message.trim()) next.message = contact.required
    else if (values.message.length > MESSAGE_MAX_LENGTH) next.message = contact.tooLong
    return next
  }, [values, contact])

  const onSubmit = async (e) => {
    e.preventDefault()

    // Bots that fill every field get silently dropped before any request.
    if (values[HONEYTRAP_FIELD]) return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0]
      e.currentTarget.querySelector(`[name="${firstKey}"]`)?.focus()
      return
    }

    if (!configured) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: CONTACT_METHOD,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          projectType: values.type,
          message: values.message.trim(),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus('ok')
      setValues({
        name: '',
        email: '',
        company: '',
        type: PROJECT_TYPES[0] ?? '',
        message: '',
        [HONEYTRAP_FIELD]: '',
      })
    } catch {
      setStatus('error')
    }
  }

  const statusText =
    status === 'ok'
      ? contact.success
      : status === 'error'
        ? contact.failure
        : status === 'unconfigured'
          ? contact.notConfigured
          : ''

  const statusTone =
    status === 'ok' ? 'notice--ok' : status === 'error' ? 'notice--bad' : 'notice--info'

  return (
    <Section
      id="contact"
      index="10"
      eyebrow={contact.eyebrow}
      title={contact.title}
      lede={contact.lede}
      className="bg-[var(--color-white)]"
      headClassName="mb-10 md:mb-14"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7" dir="left">
          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="c-name">{contact.labels.name}</label>
              <input
                id="c-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={set('name')}
                placeholder={contact.placeholders.name}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'c-name-err' : undefined}
              />
              {errors.name && (
                <p className="field-error" id="c-name-err">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-email">{contact.labels.email}</label>
              <input
                id="c-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={values.email}
                onChange={set('email')}
                placeholder={contact.placeholders.email}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'c-email-err' : undefined}
              />
              {errors.email && (
                <p className="field-error" id="c-email-err">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-company">{contact.labels.company}</label>
              <input
                id="c-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={values.company}
                onChange={set('company')}
                placeholder={contact.placeholders.company}
              />
            </div>

            <div className="field">
              <label htmlFor="c-type">{contact.labels.type}</label>
              <select id="c-type" name="projectType" value={values.type} onChange={set('type')}>
                {PROJECT_TYPES.map((key) => (
                  <option key={key} value={key}>
                    {contact.types[key] ?? key}
                  </option>
                ))}
              </select>
            </div>

            <div className="field sm:col-span-2">
              <label htmlFor="c-message">{contact.labels.message}</label>
              <textarea
                id="c-message"
                name="message"
                required
                maxLength={MESSAGE_MAX_LENGTH + 500}
                value={values.message}
                onChange={set('message')}
                placeholder={contact.placeholders.message}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'c-message-err' : undefined}
              />
              {errors.message && (
                <p className="field-error" id="c-message-err">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot — invisible to people, irresistible to naive bots. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="c-hp">{contact.hpLabel}</label>
              <input
                id="c-hp"
                name={HONEYTRAP_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values[HONEYTRAP_FIELD]}
                onChange={set(HONEYTRAP_FIELD)}
              />
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
                {status === 'sending' ? contact.sending : contact.submit}
              </button>

              {!configured && (
                <p className="text-[0.86rem] leading-snug text-[var(--color-meteor)] sm:max-w-[28ch]">
                  {contact.notConfigured.split('—')[0].trim()}
                </p>
              )}
            </div>

            <div className="sm:col-span-2" aria-live="polite" ref={statusRef}>
              {statusText && (
                <p className={`notice ${statusTone}`} role={status === 'error' ? 'alert' : 'status'}>
                  {statusText}
                </p>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={140} dir="right">
          <div className="rounded-[1.25rem] border border-[var(--color-astral-line)] bg-[var(--color-astral)] p-7 md:p-9">
            <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
              {contact.aside.title}
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {contact.aside.items.map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="index-no mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[0.96rem] leading-relaxed text-[color-mix(in_srgb,var(--color-space)_76%,transparent)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
