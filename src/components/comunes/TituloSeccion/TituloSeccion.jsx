import './TituloSeccion.css'

// Título de una sección del inicio, con etiqueta pequeña, descripción y enlace opcionales
export default function TituloSeccion({
  sobretitulo,
  titulo,
  descripcion,
  enlace,
  destino = '#especialidades',
}) {
  return (
    <div className="titulo-seccion">
      <div>
        {sobretitulo && <p className="sobretitulo">{sobretitulo}</p>}
        <h2>{titulo}</h2>
        {descripcion && <p className="descripcion-seccion">{descripcion}</p>}
      </div>
      {enlace && (
        <a className="enlace-flecha" href={destino}>
          {enlace} <span>→</span>
        </a>
      )}
    </div>
  )
}
