import Icono from '../../comunes/Icono/Icono'
import TarjetaLateral from '../TarjetaLateral/TarjetaLateral'
import './TarjetaPreparacion.css'

// Recomendaciones: [título, texto]
const RECOMENDACIONES = [
  ['Llega 15 minutos antes', 'Acércate a recepción para registrar tu llegada.'],
  [
    'Trae tu documentación',
    'Identificación y tarjeta sanitaria o de tu aseguradora, si corresponde.',
  ],
  [
    'Ten a mano tu información',
    'Trae los informes previos y tu lista de medicación, si los tienes.',
  ],
]

// Paso 5: qué hacer antes de la visita
export default function TarjetaPreparacion() {
  return (
    <TarjetaLateral claseExtra="preparacion-tarjeta">
      <span className="preparacion-etiqueta">Antes de venir</span>
      <h3>Te esperamos con todo preparado</h3>
      <ul>
        {RECOMENDACIONES.map(([titulo, texto]) => (
          <li key={titulo}>
            <Icono nombre="circulo-check" tamano={22} />
            <div>
              <strong>{titulo}</strong>
              <small>{texto}</small>
            </div>
          </li>
        ))}
      </ul>
    </TarjetaLateral>
  )
}
