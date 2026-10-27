import TituloSeccion from '../../comunes/TituloSeccion/TituloSeccion'
import './Especialidades.css'

// Cada especialidad: [símbolo, nombre, descripción]
const ESPECIALIDADES = [
  ['✚', 'Medicina general', 'Tu punto de atención y orientación.'],
  ['♧', 'Pediatría', 'Atención y seguimiento cercano a tus hijos.'],
  ['⚕', 'Ginecología', 'Cuidamos de la salud de la mujer.'],
  ['♡', 'Cardiología', 'Cuidamos de la salud de tu corazón.'],
  ['⌁', 'Traumatología', 'Te ayudamos a recuperar tu movimiento.'],
  ['✣', 'Dermatología', 'Cuidamos de la salud de tu piel.'],
]

export default function Especialidades() {
  return (
    <section className="especialidades contenedor-seccion" id="especialidades">
      <TituloSeccion
        sobretitulo="ESPECIALIDADES PARA CADA NECESIDAD"
        titulo="Un lugar para cada cuidado"
        descripcion="Explora nuestras especialidades y elige con quién quieres dar el siguiente paso."
        enlace="Ver todas las especialidades"
      />
      <div className="especialidades-grilla">
        {ESPECIALIDADES.map(([simbolo, nombre, descripcion]) => (
          <a className="especialidad-tarjeta" href="#visita" key={nombre}>
            <span className="especialidad-icono">{simbolo}</span>
            <span className="especialidad-texto">
              <strong>{nombre}</strong>
              <small>{descripcion}</small>
            </span>
            <span className="tarjeta-flecha">↗</span>
          </a>
        ))}
      </div>
      <div className="especialidades-pie">
        <span>También te puede interesar</span>
        <a href="#especialidades">
          Análisis clínicos <b>→</b>
        </a>
        <a href="#especialidades">
          Diagnóstico por imagen <b>→</b>
        </a>
        <a href="#especialidades">
          Rehabilitación <b>→</b>
        </a>
      </div>
    </section>
  )
}
