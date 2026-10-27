import { Link } from 'react-router-dom'
import imagenPortada from '../../../assets/imagenes/portada-inicio.jpg'
import './Portada.css'

export default function Portada() {
  return (
    <section className="portada" id="inicio">
      <div className="portada-texto">
        <p className="sobretitulo">CUIDAMOS DE TI, EN CADA PASO</p>
        <h1>
          Tu salud merece
          <br />
          tiempo. Tu cita,
          <br />
          menos espera.
        </h1>
        <p className="portada-descripcion">
          Encuentra tu especialidad, elige profesional y consulta tus horarios. Te
          acompañamos en cada paso.
        </p>
        <div className="portada-botones">
          <Link className="boton boton-oscuro" to="/solicitar-cita">
            Reservar una cita <span>↗</span>
          </Link>
          <a className="boton boton-borde" href="#especialidades">
            Especialidades más <span>→</span>
          </a>
        </div>
        <p className="portada-nota">♡ Atención cercana y pensada para ti.</p>
      </div>
      <div className="portada-imagen">
        <img src={imagenPortada} alt="Doctora atendiendo a una paciente en consulta" />
        <div className="portada-leyenda">
          <span className="portada-leyenda-icono">♡</span>
          <span>
            <strong>Personas que cuidan de personas.</strong>
            <small>Tu bienestar es nuestro compromiso.</small>
          </span>
        </div>
      </div>
    </section>
  )
}
