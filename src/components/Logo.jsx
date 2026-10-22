export default function Logo({ light = false }) {
  return (
    <a
      className={`brand ${light ? 'brand-light' : ''}`}
      href="#inicio"
      aria-label="Sana Sana, inicio"
    >
      <span className="brand-mark">✚</span>
      <span>
        Sana Sana<small>Centro de salud integral</small>
      </span>
    </a>
  )
}
