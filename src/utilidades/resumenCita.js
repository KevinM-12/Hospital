import {
  buscarEspecialidad,
  buscarProfesional,
  buscarTipoConsulta,
} from '../datos/datosReserva'
import { deISO, fechaCompleta } from './fechas'

// Convierte los datos de la cita en textos listos para mostrar
export function obtenerResumenCita(datos) {
  const fecha = deISO(datos.fecha)
  return {
    especialidad: buscarEspecialidad(datos.especialidadId),
    tipo: buscarTipoConsulta(datos.tipoConsulta),
    profesional: buscarProfesional(datos.especialidadId, datos.profesionalId),
    fecha,
    textoFecha: `${fechaCompleta(fecha)} · ${datos.hora} h`,
    nombreCompleto:
      `${datos.paciente.nombre.trim()} ${datos.paciente.apellidos.trim()}`.trim(),
  }
}
