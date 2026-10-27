import { Link } from 'react-router-dom'
import './TarjetaCita.css'

// Tarjeta "¿Ya tienes una cita?" de la sección Tu visita
export default function TarjetaCita() {
  return (
    <div className="tarjeta-cita">
      <div className="tarjeta-cita-etiqueta">CITA ONLINE · CONSULTA MÉDICA</div>
      <h3>¿Ya tienes una cita?</h3>
      <p>
        Consulta los detalles de tu cita y planifica tu visita. Accede con el localizador
        de tu confirmación.
      </p>
      <div className="tarjeta-cita-detalle">
        <span className="tarjeta-cita-icono">▦</span>
        <div>
          <strong>21 Oct · 10:00 h</strong>
          <small>Consulta de medicina general · Dra. Elena Martín</small>
        </div>
        <span className="tarjeta-cita-estado">Confirmada</span>
      </div>
      <div className="tarjeta-cita-enlaces">
        <Link to="/mis-citas">Cambiar cita</Link>
        <Link to="/mis-citas">Cancelar cita</Link>
      </div>
      <Link className="boton boton-oscuro ancho-completo" to="/mis-citas">
        Acceder a mi cita <span>→</span>
      </Link>
      <small className="nota-segura">
        Tu información está protegida y es confidencial.
      </small>
    </div>
  )
}
