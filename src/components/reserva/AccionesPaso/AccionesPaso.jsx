import { Link } from 'react-router-dom'
import Icono from '../../comunes/Icono/Icono'
import './AccionesPaso.css'

// Fila inferior de cada paso: "Volver" a la izquierda y el botón principal a la derecha.
// Para volver con un enlace usa destinoVolver; para volver con una función usa alVolver.
export default function AccionesPaso({
  textoVolver,
  destinoVolver,
  alVolver,
  conLinea = false,
  children,
}) {
  const contenido = (
    <>
      <Icono nombre="flecha-izquierda" tamano={18} /> {textoVolver}
    </>
  )

  return (
    <div className={conLinea ? 'acciones-paso con-linea' : 'acciones-paso'}>
      {destinoVolver ? (
        <Link className="enlace-volver" to={destinoVolver}>
          {contenido}
        </Link>
      ) : (
        <button type="button" className="enlace-volver" onClick={alVolver}>
          {contenido}
        </button>
      )}
      {children}
    </div>
  )
}
