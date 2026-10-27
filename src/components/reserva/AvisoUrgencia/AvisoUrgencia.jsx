import Icono from '../../comunes/Icono/Icono'
import './AvisoUrgencia.css'

export default function AvisoUrgencia() {
  return (
    <div className="aviso-urgencia">
      <Icono nombre="sirena" />
      <p>
        ¿Es una urgencia? No esperes a una cita online. Llama al 112 o al número de
        emergencias de tu zona.
      </p>
    </div>
  )
}
