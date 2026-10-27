import { Link } from 'react-router-dom'
import EnlaceSeccion from '../../comunes/EnlaceSeccion/EnlaceSeccion'
import Logo from '../Logo/Logo'
import './Encabezado.css'

// Enlaces del menú: [texto, sección de la página de inicio]
const ENLACES = [
  ['Especialidades', '#especialidades'],
  ['Profesionales', '#profesionales'],
  ['Tu visita', '#visita'],
  ['El hospital', '#hospital'],
]

export default function Encabezado() {
  // Abre o cierra el menú en pantallas pequeñas
  function alternarMenu() {
    document.querySelector('.encabezado nav').classList.toggle('menu-abierto')
  }

  // Cierra el menú al elegir una opción
  function cerrarMenu(evento) {
    evento.currentTarget.classList.remove('menu-abierto')
  }

  return (
    <>
      <div className="aviso-superior">
        Tu salud, nuestra prioridad. Atención cercana y de calidad.
      </div>
      <header className="encabezado">
        <Logo />
        <nav onClick={cerrarMenu}>
          {ENLACES.map(([texto, seccion]) => (
            <EnlaceSeccion key={texto} hash={seccion}>
              {texto}
            </EnlaceSeccion>
          ))}
        </nav>
        <div className="encabezado-acciones">
          <EnlaceSeccion className="enlace-texto" hash="#visita">
            Mi cita
          </EnlaceSeccion>
          <Link className="boton boton-oscuro pequeno" to="/solicitar-cita">
            Solicitar cita <span>↗</span>
          </Link>
          <button className="boton-menu" aria-label="Abrir menú" onClick={alternarMenu}>
            ☰
          </button>
        </div>
      </header>
    </>
  )
}
