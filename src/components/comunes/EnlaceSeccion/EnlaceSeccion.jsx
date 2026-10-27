import { Link } from 'react-router-dom'

// Enlace a una sección de la página de inicio (funciona desde cualquier página).
// Uso: <EnlaceSeccion hash="#visita">Tu visita</EnlaceSeccion>
export default function EnlaceSeccion({ hash, children, ...resto }) {
  return (
    <Link to={{ pathname: '/', hash: hash }} {...resto}>
      {children}
    </Link>
  )
}
