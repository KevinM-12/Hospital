import EnlaceSeccion from '../../comunes/EnlaceSeccion/EnlaceSeccion'
import Logo from '../Logo/Logo'
import './PiePagina.css'

// Columnas de enlaces: cada enlace es [texto, sección de la página de inicio]
const COLUMNAS = [
  {
    titulo: 'Tu atención',
    enlaces: [
      ['Mi cita', '#especialidades'],
      ['Mis visitas', '#especialidades'],
      ['Especialidades', '#especialidades'],
    ],
  },
  {
    titulo: 'Tu visita',
    enlaces: [
      ['Prepara tu consulta', '#visita'],
      ['Guía y horarios', '#visita'],
      ['Preguntas frecuentes', '#visita'],
    ],
  },
  {
    titulo: 'El hospital',
    enlaces: [
      ['Conócenos', '#hospital'],
      ['Atención al paciente', '#profesionales'],
      ['Contacto', '#hospital'],
    ],
  },
]

const ENLACES_LEGALES = ['Privacidad', 'Aviso legal', 'Cookies', 'Accesibilidad']

export default function PiePagina() {
  return (
    <footer className="pie" id="hospital">
      <div className="pie-superior">
        <div className="pie-marca">
          <Logo clara />
          <p>Cuidamos, escuchamos y te acompañamos en cada etapa.</p>
        </div>
        {COLUMNAS.map((columna) => (
          <div key={columna.titulo}>
            <strong>{columna.titulo}</strong>
            {columna.enlaces.map(([texto, seccion]) => (
              <EnlaceSeccion key={texto} hash={seccion}>
                {texto}
              </EnlaceSeccion>
            ))}
          </div>
        ))}
      </div>
      <div className="pie-inferior">
        <span>© 2026 Sana Sana. Todos los derechos reservados.</span>
        <div>
          {ENLACES_LEGALES.map((texto) => (
            <EnlaceSeccion key={texto} hash="#hospital">
              {texto}
            </EnlaceSeccion>
          ))}
        </div>
      </div>
    </footer>
  )
}
