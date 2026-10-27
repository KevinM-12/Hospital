import TituloSeccion from '../../comunes/TituloSeccion/TituloSeccion'
import TarjetaCita from '../TarjetaCita/TarjetaCita'
import './Visita.css'

// Los 3 pasos: [número, título, descripción]
const PASOS = [
  [
    '01',
    'Encuentra tu consulta',
    'Busca una especialidad y elige profesional, día y hora entre las opciones disponibles.',
  ],
  [
    '02',
    'Revisa y confirma',
    'Comprueba los datos de tu consulta, completa la información y confirma tu cita.',
  ],
  [
    '03',
    'Ten tu cita a mano',
    'Guarda la confirmación, recibe las indicaciones y ven preparado para tu consulta.',
  ],
]

// Lo que hay que traer: [título, descripción]
const PREPARACION = [
  [
    'Tu documentación',
    'Identificación y tarjeta sanitaria o de tu aseguradora, si corresponde.',
  ],
  [
    'La información de tu consulta',
    'Confirma el día, la hora y las instrucciones previas.',
  ],
  [
    'Los indicaciones específicas',
    'Prepara cualquier prueba o información que te hayan solicitado.',
  ],
]

export default function Visita() {
  return (
    <section className="visita contenedor-seccion" id="visita">
      <TituloSeccion
        sobretitulo="HAZLO FÁCIL, HAZLO A TU TIEMPO"
        titulo="Menos trámites. Más tranquilidad."
        descripcion="Todo lo importante para tu visita, en un solo lugar."
      />
      <div className="pasos-grilla">
        {PASOS.map(([numero, titulo, descripcion]) => (
          <article className="paso" key={numero}>
            <span className="paso-numero">{numero}</span>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
          </article>
        ))}
      </div>
      <div className="visita-tarjetas">
        <div className="tarjeta-preparar">
          <p className="sobretitulo">ANTES DE VENIR</p>
          <h3>Ven con todo lo que necesitas</h3>
          <p>
            Te preparamos lo esencial para que tu visita sea sencilla y sin
            preocupaciones.
          </p>
          <ul>
            {PREPARACION.map(([titulo, texto]) => (
              <li key={titulo}>
                <span>✓</span>
                <div>
                  <strong>{titulo}</strong>
                  <small>{texto}</small>
                </div>
              </li>
            ))}
          </ul>
          <a className="enlace-flecha" href="#visita">
            ¿Es tu primera visita? <span>→</span>
          </a>
        </div>
        <TarjetaCita />
      </div>
    </section>
  )
}
