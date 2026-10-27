import EtiquetaEstado from '../../comunes/EtiquetaEstado/EtiquetaEstado'
import Icono from '../../comunes/Icono/Icono'
import TarjetaLateral from '../TarjetaLateral/TarjetaLateral'
import {
  LUGAR,
  buscarEspecialidad,
  buscarProfesional,
  buscarTipoConsulta,
} from '../../../datos/datosReserva'
import { deISO, fechaCompleta } from '../../../utilidades/fechas'
import './ResumenCita.css'

// "Tu cita, de un vistazo": se va completando a medida que avanzas
export default function ResumenCita({ datos }) {
  const especialidad = buscarEspecialidad(datos.especialidadId)
  const tipo = buscarTipoConsulta(datos.tipoConsulta)
  const profesional = buscarProfesional(datos.especialidadId, datos.profesionalId)

  let textoFecha = 'Por elegir'
  if (datos.fecha && datos.hora) {
    textoFecha = `${fechaCompleta(deISO(datos.fecha))} · ${datos.hora} h`
  }

  const filas = [
    {
      icono: 'estetoscopio',
      etiqueta: 'Especialidad y consulta',
      valor: `${especialidad.nombre} · ${tipo.nombre}`,
    },
    {
      icono: 'usuario',
      etiqueta: 'Profesional',
      valor: profesional ? profesional.nombre : 'Por elegir',
    },
    { icono: 'calendario-dias', etiqueta: 'Fecha y hora', valor: textoFecha },
  ]

  return (
    <TarjetaLateral claseExtra="resumen-tarjeta">
      <h3>Tu cita, de un vistazo</h3>
      <EtiquetaEstado>Pendiente de confirmar</EtiquetaEstado>
      <ul className="resumen-lista">
        {filas.map((fila) => (
          <li key={fila.etiqueta}>
            <Icono nombre={fila.icono} />
            <div>
              <small>{fila.etiqueta}</small>
              <strong>{fila.valor}</strong>
            </div>
          </li>
        ))}
        <li className="resumen-lugar">
          <Icono nombre="ubicacion" />
          <div>
            <small>Consulta presencial</small>
            <strong>{LUGAR.sala}</strong>
          </div>
        </li>
      </ul>
      <p className="resumen-direccion">{LUGAR.direccion}</p>
    </TarjetaLateral>
  )
}
