import Icono from '../../comunes/Icono/Icono'
import TarjetaLateral from '../TarjetaLateral/TarjetaLateral'
import './TarjetaAyuda.css'

export default function TarjetaAyuda() {
  return (
    <TarjetaLateral claseExtra="ayuda-tarjeta">
      <Icono nombre="auriculares" tamano={22} />
      <div>
        <strong>¿Necesitas ayuda?</strong>
        <p>Te acompañamos en cada paso.</p>
        <a href="tel:900000000">Atención al paciente</a>
      </div>
    </TarjetaLateral>
  )
}
