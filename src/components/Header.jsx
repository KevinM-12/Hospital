import Logo from './Logo'
const links = [
  ['Especialidades', '#especialidades'],
  ['Profesionales', '#profesionales'],
  ['Tu visita', '#visita'],
  ['El hospital', '#hospital'],
]
export default function Header() {
  return (
    <>
      <div className="top-note">
        Tu salud, nuestra prioridad. Atención cercana y de calidad.
      </div>
      <header className="site-header">
        <Logo />
        <nav>
          {links.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="text-link" href="#visita">
            Mi cita
          </a>
          <a className="button button-dark small" href="#visita">
            Solicitar cita <span>↗</span>
          </a>
          <button
            className="menu-toggle"
            aria-label="Abrir menú"
            onClick={() =>
              document.querySelector('.site-header nav').classList.toggle('nav-open')
            }
          >
            ☰
          </button>
        </div>
      </header>
    </>
  )
}
