import { Link } from 'react-router-dom'
import BotonEnlace from '../../comunes/BotonEnlace/BotonEnlace'
import EtiquetaEstado from '../../comunes/EtiquetaEstado/EtiquetaEstado'
import ListaDatos from '../../comunes/ListaDatos/ListaDatos'
import { LUGAR } from '../../../datos/datosReserva'
import { obtenerResumenCita } from '../../../utilidades/resumenCita'
import './ItemCita.css'

// Una cita de la lista "Mis citas". La página decide qué pasa al cancelar o quitar.
export default function ItemCita({ cita, alCancelar, alQuitar }) {
  const resumen = obtenerResumenCita(cita.datos)
  const cancelada = cita.estado === 'cancelada'

  const detalles = [
    { icono: 'calendario-dias', etiqueta: 'Fecha y hora', valor: resumen.textoFecha },
    { icono: 'usuario', etiqueta: 'Profesional', valor: resumen.profesional.nombre },
    {
      icono: 'ubicacion',
      etiqueta: 'Consulta presencial',
      valor: `${LUGAR.sala} · ${LUGAR.calle}`,
    },
    { icono: 'numeral', etiqueta: 'Localizador de ejemplo', valor: cita.id },
  ]

  return (
    <article className={cancelada ? 'cita-item cancelada' : 'cita-item'}>
      <div className="cita-cabecera">
        <div>
          <h2>{resumen.especialidad.nombre}</h2>
          <p>
            {resumen.tipo.nombre} · {resumen.nombreCompleto}
          </p>
        </div>
        <EtiquetaEstado cancelada={cancelada}>
          {cancelada ? 'Cancelada' : '✓ Confirmada · Ejemplo'}
        </EtiquetaEstado>
      </div>

      <ListaDatos datos={detalles} />

      <div className="cita-acciones">
        {cancelada ? (
          <BotonEnlace alHacerClic={() => alQuitar(cita)}>Quitar de la lista</BotonEnlace>
        ) : (
          <>
            <Link
              className="boton boton-borde"
              to="/solicitar-cita"
              state={{ cambiarCita: cita.id }}
            >
              Cambiar fecha u hora
            </Link>
            <BotonEnlace peligro alHacerClic={() => alCancelar(cita)}>
              Cancelar cita
            </BotonEnlace>
          </>
        )}
      </div>
    </article>
  )
}
