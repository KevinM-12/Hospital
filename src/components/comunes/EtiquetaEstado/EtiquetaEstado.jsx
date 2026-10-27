import './EtiquetaEstado.css'

// Etiqueta pequeña con el estado de una cita (verde = confirmada, roja = cancelada)
export default function EtiquetaEstado({ cancelada = false, children }) {
  const clases = cancelada ? 'etiqueta-estado cancelada' : 'etiqueta-estado'
  return <span className={clases}>{children}</span>
}
