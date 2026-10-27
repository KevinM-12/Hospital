import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo({ clara = false }) {
  return (
    <Link
      className={clara ? 'marca marca-clara' : 'marca'}
      to="/"
      aria-label="Sana Sana, inicio"
    >
      <span className="marca-icono">✚</span>
      <span>
        Sana Sana<small>Centro de salud integral</small>
      </span>
    </Link>
  )
}
