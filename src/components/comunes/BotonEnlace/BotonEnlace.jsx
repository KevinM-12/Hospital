import Icono from '../Icono/Icono'
import './BotonEnlace.css'

// Botón con aspecto de enlace subrayado (Editar, Cancelar, Ver más...)
export default function BotonEnlace({ icono, peligro = false, alHacerClic, children }) {
  return (
    <button
      type="button"
      className={peligro ? 'boton-enlace peligro' : 'boton-enlace'}
      onClick={alHacerClic}
    >
      {icono && <Icono nombre={icono} tamano={16} />}
      {children}
    </button>
  )
}
