import Icono from '../Icono/Icono'
import './ListaDatos.css'

// Lista de datos con icono: [{ icono: 'usuario', etiqueta: 'Profesional', valor: 'Dra. Elena' }]
export default function ListaDatos({ datos }) {
  return (
    <ul className="lista-datos">
      {datos.map((dato) => (
        <li key={dato.etiqueta}>
          <Icono nombre={dato.icono} />
          <div>
            <small>{dato.etiqueta}</small>
            <strong>{dato.valor}</strong>
          </div>
        </li>
      ))}
    </ul>
  )
}
