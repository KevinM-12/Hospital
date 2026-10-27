import { Link } from 'react-router-dom'
import Encabezado from '../Encabezado/Encabezado'
import PiePagina from '../PiePagina/PiePagina'
import './MarcoPagina.css'

// Estructura común de las páginas de cita: encabezado, migas de pan, título y pie de página.
// migas = [{ texto: 'Inicio', destino: '/' }, { texto: 'Mis citas' }]
export default function MarcoPagina({ migas, titulo, subtitulo, extraTitulo, children }) {
  return (
    <>
      <Encabezado />
      <main className="marco-pagina">
        <nav className="marco-migas" aria-label="Ruta de navegación">
          {migas.map((miga, indice) => (
            <span key={miga.texto}>
              {indice > 0 && ' / '}
              {miga.destino ? <Link to={miga.destino}>{miga.texto}</Link> : miga.texto}
            </span>
          ))}
        </nav>

        <div className="marco-titulo">
          <div>
            <h1>{titulo}</h1>
            {subtitulo && <p>{subtitulo}</p>}
          </div>
          {extraTitulo}
        </div>

        {children}
      </main>
      <PiePagina />
    </>
  )
}
