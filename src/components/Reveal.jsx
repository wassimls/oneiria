import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered entrance. Reveal state only kicks in after the browser has
 * confirmed it supports IntersectionObserver; if it doesn't — or the visitor
 * prefers reduced motion — content renders immediately and never hides.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  dir,
  threshold = 0.16,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      data-dir={dir}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
