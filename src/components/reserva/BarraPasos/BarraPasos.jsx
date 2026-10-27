import Icono from '../../comunes/Icono/Icono'
import { PASOS } from '../../../datos/datosReserva'
import './BarraPasos.css'

// Barra con los 5 pasos. Los pasos ya completados se pueden pulsar para volver a ellos.
export default function BarraPasos({ pasoActual, alElegirPaso }) {
  const terminado = pasoActual === PASOS.length // en el último paso todo queda completado

  return (
    <ol className="barra-pasos">
      {PASOS.map((nombre, indice) => {
        const numero = indice + 1
        const esActual = numero === pasoActual
        const completado = terminado || numero < pasoActual

        let clases = 'barra-pasos-item'
        if (completado) clases += ' hecho'
        if (esActual) clases += ' actual'

        const contenido = (
          <>
            <span className="barra-pasos-punto">
              {completado ? <Icono nombre="check-grueso" tamano={16} /> : numero}
            </span>
            <span className="barra-pasos-texto">{nombre}</span>
          </>
        )

        return (
          <li key={nombre} className={clases}>
            {completado && !terminado ? (
              <button
                type="button"
                className="barra-pasos-boton"
                onClick={() => alElegirPaso(numero)}
              >
                {contenido}
              </button>
            ) : (
              <div
                className="barra-pasos-boton"
                aria-current={esActual ? 'step' : undefined}
              >
                {contenido}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
