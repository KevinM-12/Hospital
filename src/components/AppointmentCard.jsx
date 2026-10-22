export default function AppointmentCard() {
  return (
    <div className="appointment-card">
      <div className="card-kicker">CITA ONLINE · CONSULTA MÉDICA</div>
      <h3>¿Ya tienes una cita?</h3>
      <p>
        Consulta los detalles de tu cita y planifica tu visita. Accede con el localizador
        de tu confirmación.
      </p>
      <div className="appointment-details">
        <span className="calendar-icon">▦</span>
        <div>
          <strong>21 Oct · 10:00 h</strong>
          <small>Consulta de medicina general · Dra. Elena Martín</small>
        </div>
        <span className="status">Confirmada</span>
      </div>
      <div className="appointment-links">
        <a href="#visita">Cambiar cita</a>
        <a href="#visita">Cancelar cita</a>
      </div>
      <a className="button button-dark full" href="#visita">
        Acceder a mi cita <span>→</span>
      </a>
      <small className="secure-note">
        Tu información está protegida y es confidencial.
      </small>
    </div>
  )
}
