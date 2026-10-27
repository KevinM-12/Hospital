// Archivos que la persona puede descargar: el evento de calendario (.ics) y el comprobante (.txt)
import { LUGAR } from '../datos/datosReserva'
import { formatearNacimiento } from '../utilidades/fechas'
import { obtenerResumenCita } from '../utilidades/resumenCita'

function conDosDigitos(numero) {
  return String(numero).padStart(2, '0')
}

// Fecha en el formato de los archivos de calendario: 20261028T100000
function fechaParaCalendario(fecha) {
  const anio = fecha.getFullYear()
  const mes = conDosDigitos(fecha.getMonth() + 1)
  const dia = conDosDigitos(fecha.getDate())
  const horas = conDosDigitos(fecha.getHours())
  const minutos = conDosDigitos(fecha.getMinutes())
  return `${anio}${mes}${dia}T${horas}${minutos}00`
}

// En los archivos de calendario las comas y punto y coma llevan una barra delante
function escaparTexto(texto) {
  return texto.replace(/[,;]/g, (caracter) => `\\${caracter}`)
}

// Crea un archivo y hace que el navegador lo descargue
function descargarArchivo(nombreArchivo, contenido, tipo) {
  const url = URL.createObjectURL(new Blob([contenido], { type: tipo }))
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombreArchivo
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)
}

// Archivo .ics para añadir la cita al calendario (dura 30 minutos)
export function descargarCalendario(datos) {
  const resumen = obtenerResumenCita(datos)
  const [horas, minutos] = datos.hora.split(':').map(Number)

  const inicio = new Date(resumen.fecha)
  inicio.setHours(horas, minutos, 0, 0)
  const fin = new Date(inicio.getTime() + 30 * 60 * 1000)

  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sana Sana//Cita de ejemplo//ES',
    'BEGIN:VEVENT',
    `UID:${datos.localizador}@sanasana.demo`,
    `DTSTAMP:${fechaParaCalendario(new Date())}`,
    `DTSTART:${fechaParaCalendario(inicio)}`,
    `DTEND:${fechaParaCalendario(fin)}`,
    `SUMMARY:${escaparTexto(`Cita de ${resumen.especialidad.nombre} · Sana Sana`)}`,
    `LOCATION:${escaparTexto(`${LUGAR.sala}, ${LUGAR.calle}, ${LUGAR.ciudad}`)}`,
    `DESCRIPTION:${escaparTexto(`${resumen.profesional.nombre} · ${resumen.tipo.nombre}. Localizador: ${datos.localizador}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  descargarArchivo(`cita-${datos.localizador}.ics`, lineas.join('\r\n'), 'text/calendar')
}

// Comprobante en texto con los datos de la cita
export function descargarComprobante(datos) {
  const resumen = obtenerResumenCita(datos)
  const texto = [
    'COMPROBANTE DE CITA DE EJEMPLO',
    'Sana Sana · Centro de salud integral',
    '',
    `Localizador: ${datos.localizador}`,
    `Paciente: ${resumen.nombreCompleto}`,
    `Fecha de nacimiento: ${formatearNacimiento(datos.paciente.fechaNacimiento)}`,
    `Especialidad: ${resumen.especialidad.nombre} (${resumen.tipo.nombre})`,
    `Profesional: ${resumen.profesional.nombre}`,
    `Fecha y hora: ${resumen.textoFecha}`,
    `Lugar: ${LUGAR.sala} · ${LUGAR.calle} · ${LUGAR.ciudad}`,
    '',
    'Documento de demostración: no corresponde a una reserva real.',
  ].join('\n')
  descargarArchivo(
    `comprobante-${datos.localizador}.txt`,
    texto,
    'text/plain;charset=utf-8',
  )
}
