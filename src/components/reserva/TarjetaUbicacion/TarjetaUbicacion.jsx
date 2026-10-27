import EnlaceSeccion from '../../comunes/EnlaceSeccion/EnlaceSeccion'
import TarjetaLateral from '../TarjetaLateral/TarjetaLateral'
import imagenFachada from '../../../assets/imagenes/fachada-hospital.svg'
import { LUGAR } from '../../../datos/datosReserva'
import './TarjetaUbicacion.css'

// Paso 5: dónde está el hospital
export default function TarjetaUbicacion() {
  return (
    <TarjetaLateral claseExtra="ubicacion-tarjeta">
      <img src={imagenFachada} alt="Fachada del hospital" />
      <div className="ubicacion-cuerpo">
        <strong>{LUGAR.calle}</strong>
        <small>{LUGAR.ciudad} · Dirección ficticia</small>
        <EnlaceSeccion hash="#visita">Cómo llegar y accesos ↗</EnlaceSeccion>
      </div>
    </TarjetaLateral>
  )
}
