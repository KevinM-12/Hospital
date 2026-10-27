import Icono from '../Icono/Icono'
import './CuadroInfo.css'

// Recuadro con un mensaje informativo y un icono opcional
export default function CuadroInfo({ icono, claseExtra = '', children }) {
  return (
    <div className={`cuadro-info ${claseExtra}`.trim()}>
      {icono && <Icono nombre={icono} />}
      <p>{children}</p>
    </div>
  )
}
