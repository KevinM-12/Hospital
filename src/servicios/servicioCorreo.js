// Envío de correos con EmailJS (cuando se confirma, cambia o cancela una cita).
import emailjs from '@emailjs/browser'
import { configEmailjs, correoConfigurado } from '../configuracion/emailjs'
import { LUGAR, NOMBRE_CLINICA } from '../datos/datosReserva'
import { obtenerResumenCita } from '../utilidades/resumenCita'

// Título y texto del correo según lo que pasó con la cita
const MENSAJES = {
  confirmada: {
    titulo: 'Tu cita está confirmada',
    texto: 'Gracias por reservar con nosotros. Estos son los datos de tu cita.',
  },
  cambiada: {
    titulo: 'Tu cita ha cambiado',
    texto: 'Hemos actualizado tu cita. Estos son sus nuevos datos.',
  },
  cancelada: {
    titulo: 'Tu cita ha sido cancelada',
    texto:
      'Hemos cancelado tu cita y liberado tu horario. Cuando quieras, puedes reservar otra.',
  },
}

/**
 * Envía un correo a la persona que reservó.
 * tipo: 'confirmada' | 'cambiada' | 'cancelada'
 * Devuelve: 'enviado' | 'sin-configurar' | 'error'
 */
export async function enviarCorreoCita(datos, localizador, tipo = 'confirmada') {
  if (!correoConfigurado) return 'sin-configurar'

  const resumen = obtenerResumenCita(datos)
  const mensaje = MENSAJES[tipo]

  // Estos nombres son las variables {{...}} de la plantilla de EmailJS
  const variables = {
    correo: datos.paciente.correo.trim(),
    nombre: datos.paciente.nombre.trim(),
    clinica: NOMBRE_CLINICA,
    asunto: `${mensaje.titulo} · ${NOMBRE_CLINICA}`,
    titulo_estado: mensaje.titulo,
    texto_estado: mensaje.texto,
    localizador: localizador,
    especialidad: resumen.especialidad.nombre,
    tipo_consulta: resumen.tipo.nombre,
    profesional: resumen.profesional.nombre,
    fecha_hora: resumen.textoFecha,
    lugar: LUGAR.sala,
    direccion: `${LUGAR.calle} · ${LUGAR.ciudad}`,
  }

  try {
    await emailjs.send(configEmailjs.idServicio, configEmailjs.idPlantilla, variables, {
      publicKey: configEmailjs.clavePublica,
    })
    return 'enviado'
  } catch (error) {
    console.error('EmailJS: no se pudo enviar el correo', error)
    return 'error'
  }
}
