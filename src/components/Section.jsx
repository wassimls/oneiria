import Reveal from './Reveal.jsx'

/**
 * Shared section chrome: index number, eyebrow, heading and optional lede.
 * Keeps every band on the same rhythm so the page reads as one system.
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  tone = 'light',
  as: Tag = 'section',
  className = '',
  headClassName = '',
  children,
}) {
  const dark = tone === 'dark'

  return (
    <Tag
      id={id}
      className={`section${dark ? ' on-dark' : ''}${className ? ` ${className}` : ''}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className="shell">
        <Reveal className={`grid gap-6 md:grid-cols-12 md:gap-10 ${headClassName}`}>
          <div className="md:col-span-4 lg:col-span-3">
            {index && <div className="index-no mb-4">{index}</div>}
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            {title && (
              <h2 id={`${id}-title`} className="h2 max-w-[18ch]">
                {title}
              </h2>
            )}
            {lede && (
              <p className="lede mt-5 max-w-[54ch] md:mt-6">{lede}</p>
            )}
          </div>
        </Reveal>

        {children}
      </div>
    </Tag>
  )
}
