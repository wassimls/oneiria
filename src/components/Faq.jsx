import { useId, useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

function FaqItem({ q, a, id, open, onToggle }) {
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`

  return (
    <div className="faq-item">
      <h3>
        <button
          type="button"
          id={buttonId}
          className="faq-q"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{q}</span>
          <span className="faq-icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq-a" id={panelId} role="region" aria-labelledby={buttonId} data-open={open}>
        <div>
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const { t } = useLocale()
  const { faq } = t
  const uid = useId()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section
      id="faq"
      index="09"
      eyebrow={faq.eyebrow}
      title={faq.title}
      className="bg-[var(--color-astral)]"
      headClassName="mb-10 md:mb-14"
    >
      <Reveal className="border-none" dir="right">
        <div className="mx-auto max-w-[64rem] lg:mx-0 lg:ms-auto">
          {faq.items.map((item, i) => (
            <FaqItem
              key={item.q}
              id={`${uid}-${i}`}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
