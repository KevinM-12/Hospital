import Icono from '../Icono/Icono'
import './TarjetaOpcion.css'

// Tarjeta que se puede seleccionar (usa un radio): especialidad, tipo de consulta, profesional.
// grupo = nombre del grupo de radios, alCambiar = función que se ejecuta al elegirla
export default function TarjetaOpcion({
  grupo,
  seleccionada,
  alCambiar,
  icono,
  compacta = false,
  children,
}) {
  let clases = 'tarjeta-opcion'
  if (compacta) clases += ' compacta'
  if (seleccionada) clases += ' seleccionado'

  return (
    <label className={clases}>
      <input type="radio" name={grupo} checked={seleccionada} onChange={alCambiar} />
      {icono && <span className="opcion-icono">{icono}</span>}
      <span className="opcion-texto">{children}</span>
      <span className="opcion-marca">
        {seleccionada && !compacta && <Icono nombre="check-grueso" tamano={14} />}
      </span>
    </label>
  )
}
