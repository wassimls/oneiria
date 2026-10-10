/**
 * Oneiria aperture mark.
 *
 * Geometry was reconstructed from the supplied identity boards: four blades
 * swirling counter-clockwise around a 0.48R opening, gaps widening from 12°
 * at the rim to 24° at the hub, rotated 18° so the blades sit where the
 * reference places them. Everything is a single evenodd path, so it scales,
 * reverses to one colour and still reads at 16px.
 */

export const APERTURE_PATH =
  'M 4 50 A 46 46 0 1 0 96 50 A 46 46 0 1 0 4 50 Z M 28 50 A 22 22 0 1 0 72 50 A 22 22 0 1 0 28 50 Z ' +
  'M 93.75 64.21 L 93.26 62.66 L 92.73 61.14 L 92.14 59.67 L 91.5 58.24 L 90.81 56.86 L 90.08 55.52 L 89.31 54.24 L 88.5 53 L 87.65 51.82 L 86.76 50.69 L 85.84 49.62 L 84.89 48.59 L 83.92 47.63 L 82.91 46.72 L 81.89 45.87 L 80.84 45.07 L 79.77 44.34 L 78.69 43.66 L 77.6 43.04 L 76.49 42.48 L 75.38 41.98 L 74.26 41.54 L 73.14 41.15 L 72.01 40.83 L 70.89 40.56 L 69.77 40.36 A 22 22 0 0 0 64.14 33.15 L 65.38 33.01 L 66.66 32.94 L 67.96 32.94 L 69.28 33.01 L 70.62 33.17 L 71.97 33.4 L 73.34 33.71 L 74.71 34.1 L 76.08 34.57 L 77.46 35.12 L 78.82 35.75 L 80.18 36.47 L 81.52 37.26 L 82.85 38.14 L 84.15 39.11 L 85.43 40.15 L 86.67 41.27 L 87.88 42.48 L 89.04 43.76 L 90.17 45.12 L 91.24 46.56 L 92.26 48.07 L 93.23 49.65 L 94.13 51.3 L 94.98 53.02 L 95.75 54.81 A 46 46 0 0 1 93.75 64.21 Z ' +
  'M 35.79 93.75 L 37.34 93.26 L 38.86 92.73 L 40.33 92.14 L 41.76 91.5 L 43.14 90.81 L 44.48 90.08 L 45.76 89.31 L 47 88.5 L 48.18 87.65 L 49.31 86.76 L 50.38 85.84 L 51.41 84.89 L 52.37 83.92 L 53.28 82.91 L 54.13 81.89 L 54.93 80.84 L 55.66 79.77 L 56.34 78.69 L 56.96 77.6 L 57.52 76.49 L 58.02 75.38 L 58.46 74.26 L 58.85 73.14 L 59.17 72.01 L 59.44 70.89 L 59.64 69.77 A 22 22 0 0 0 66.85 64.14 L 66.99 65.38 L 67.06 66.66 L 67.06 67.96 L 66.99 69.28 L 66.83 70.62 L 66.6 71.97 L 66.29 73.34 L 65.9 74.71 L 65.43 76.08 L 64.88 77.46 L 64.25 78.82 L 63.53 80.18 L 62.74 81.52 L 61.86 82.85 L 60.89 84.15 L 59.85 85.43 L 58.73 86.67 L 57.52 87.88 L 56.24 89.04 L 54.88 90.17 L 53.44 91.24 L 51.93 92.26 L 50.35 93.23 L 48.7 94.13 L 46.98 94.98 L 45.19 95.75 A 46 46 0 0 1 35.79 93.75 Z ' +
  'M 6.25 35.79 L 6.74 37.34 L 7.27 38.86 L 7.86 40.33 L 8.5 41.76 L 9.19 43.14 L 9.92 44.48 L 10.69 45.76 L 11.5 47 L 12.35 48.18 L 13.24 49.31 L 14.16 50.38 L 15.11 51.41 L 16.08 52.37 L 17.09 53.28 L 18.11 54.13 L 19.16 54.93 L 20.23 55.66 L 21.31 56.34 L 22.4 56.96 L 23.51 57.52 L 24.62 58.02 L 25.74 58.46 L 26.86 58.85 L 27.99 59.17 L 29.11 59.44 L 30.23 59.64 A 22 22 0 0 0 35.86 66.85 L 34.62 66.99 L 33.34 67.06 L 32.04 67.06 L 30.72 66.99 L 29.38 66.83 L 28.03 66.6 L 26.66 66.29 L 25.29 65.9 L 23.92 65.43 L 22.54 64.88 L 21.18 64.25 L 19.82 63.53 L 18.48 62.74 L 17.15 61.86 L 15.85 60.89 L 14.57 59.85 L 13.33 58.73 L 12.12 57.52 L 10.96 56.24 L 9.83 54.88 L 8.76 53.44 L 7.74 51.93 L 6.77 50.35 L 5.87 48.7 L 5.02 46.98 L 4.25 45.19 A 46 46 0 0 1 6.25 35.79 Z ' +
  'M 64.21 6.25 L 62.66 6.74 L 61.14 7.27 L 59.67 7.86 L 58.24 8.5 L 56.86 9.19 L 55.52 9.92 L 54.24 10.69 L 53 11.5 L 51.82 12.35 L 50.69 13.24 L 49.62 14.16 L 48.59 15.11 L 47.63 16.08 L 46.72 17.09 L 45.87 18.11 L 45.07 19.16 L 44.34 20.23 L 43.66 21.31 L 43.04 22.4 L 42.48 23.51 L 41.98 24.62 L 41.54 25.74 L 41.15 26.86 L 40.83 27.99 L 40.56 29.11 L 40.36 30.23 A 22 22 0 0 0 33.15 35.86 L 33.01 34.62 L 32.94 33.34 L 32.94 32.04 L 33.01 30.72 L 33.17 29.38 L 33.4 28.03 L 33.71 26.66 L 34.1 25.29 L 34.57 23.92 L 35.12 22.54 L 35.75 21.18 L 36.47 19.82 L 37.26 18.48 L 38.14 17.15 L 39.11 15.85 L 40.15 14.57 L 41.27 13.33 L 42.48 12.12 L 43.76 10.96 L 45.12 9.83 L 46.56 8.76 L 48.07 7.74 L 49.65 6.77 L 51.3 5.87 L 53.02 5.02 L 54.81 4.25 A 46 46 0 0 1 64.21 6.25 Z'

let uid = 0

/**
 * @param {object} props
 * @param {number|string} [props.size]  rendered px (or CSS length)
 * @param {'gradient'|'currentColor'|string} [props.fill]
 * @param {boolean} [props.spin]        slow aperture rotation (reduced-motion aware via CSS)
 * @param {boolean} [props.glow]
 */
export default function Mark({
  size = 40,
  fill = 'currentColor',
  spin = false,
  glow = false,
  gradientId,
  className = '',
  title,
  ...rest
}) {
  const id = gradientId || `oneiria-g${(uid += 1)}`
  const paint = fill === 'gradient' ? `url(#${id})` : fill

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {fill === 'gradient' && (
        <defs>
          <linearGradient id={id} x1="0.04" y1="0" x2="0.96" y2="1">
            <stop offset="0%" stopColor="#8751E9" />
            <stop offset="52%" stopColor="#7550F0" />
            <stop offset="100%" stopColor="#6158F5" />
          </linearGradient>
          {glow && (
            <filter id={`${id}-g`} x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="3.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
      )}
      <path
        d={APERTURE_PATH}
        fill={paint}
        fillRule="evenodd"
        className={spin ? 'aperture-spin' : undefined}
        filter={fill === 'gradient' && glow ? `url(#${id}-g)` : undefined}
      />
    </svg>
  )
}
