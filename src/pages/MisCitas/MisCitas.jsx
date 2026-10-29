import { useState } from 'react'
import { Link } from 'react-router-dom'
import MarcoPagina from '../../components/estructura/MarcoPagina/MarcoPagina'
import ItemCita from '../../components/citas/ItemCita/ItemCita'
import Icono from '../../components/comunes/Icono/Icono'
import TarjetaReserva from '../../components/reserva/TarjetaReserva/TarjetaReserva'
import { correoConfigurado } from '../../configuracion/emailjs'
import { cancelarCita as cancelarCitaApi } from '../../servicios/api'
import {
  cerrarAlerta,
  confirmar,
  mostrarAviso,
  mostrarCargando,
} from '../../servicios/alertas/alertas'
import {
  actualizarCita,
  eliminarCita,
  obtenerCitas,
} from '../../servicios/citasGuardadas'
import { enviarCorreoCita } from '../../servicios/servicioCorreo'
import './MisCitas.css'

// Página "Mis citas" (/mis-citas): lista las citas guardadas en este navegador
export default function MisCitas() {
  const [citas, setCitas] = useState(obtenerCitas())

  async function cancelarCita(cita) {
    const aceptado = await confirmar({
      titulo: '¿Cancelar esta cita?',
      texto: 'Se liberará tu horario y no podrás recuperarlo.',
      textoConfirmar: 'Sí, cancelar cita',
      textoCancelar: 'No, mantener cita',
      peligro: true,
    })
    if (!aceptado) return

    // Cancela primero en el backend (libera el horario en MySQL)
    mostrarCargando('Cancelando tu cita…')
    try {
      await cancelarCitaApi(cita.id, cita.datos.paciente.correo)
    } catch (error) {
      cerrarAlerta()
      mostrarAviso(
        'warning',
        error.message === 'Failed to fetch'
          ? 'No pudimos conectar con el servidor. Inténtalo de nuevo.'
          : `No se pudo cancelar la cita: ${error.message}`,
      )
      return
    }
    cerrarAlerta()

    actualizarCita(cita.id, { estado: 'cancelada' })
    setCitas(obtenerCitas())

    if (correoConfigurado) mostrarCargando('Cancelando tu cita…')
    const resultado = await enviarCorreoCita(cita.datos, cita.id, 'cancelada')
    if (correoConfigurado) cerrarAlerta()

    if (resultado === 'enviado')
      mostrarAviso('success', 'Cita cancelada. Te enviamos un correo.')
    else if (resultado === 'error')
      mostrarAviso('warning', 'Cita cancelada, pero no pudimos enviar el correo.')
    else mostrarAviso('success', 'Cita cancelada.')
  }

  async function quitarCita(cita) {
    const aceptado = await confirmar({
      titulo: '¿Quitar esta cita de la lista?',
      texto: 'Solo desaparecerá de este navegador.',
      textoConfirmar: 'Sí, quitar',
      textoCancelar: 'Volver',
      peligro: true,
    })
    if (!aceptado) return

    eliminarCita(cita.id)
    setCitas(obtenerCitas())
    mostrarAviso('success', 'Cita quitada de la lista.')
  }

  return (
    <MarcoPagina
      migas={[{ texto: 'Inicio', destino: '/' }, { texto: 'Mis citas' }]}
      titulo="Mis citas"
      subtitulo="Consulta o gestiona las citas que has reservado en este navegador."
      extraTitulo={
        <Link className="boton boton-oscuro pequeno" to="/solicitar-cita">
          Solicitar nueva cita <Icono nombre="calendario-mas" tamano={18} />
        </Link>
      }
    >
      {citas.length === 0 ? (
        <TarjetaReserva claseExtra="sin-citas">
          <Icono nombre="calendario-dias" tamano={40} />
          <h2>Aún no tienes citas</h2>
          <p>
            Cuando reserves una cita, aparecerá aquí para que puedas consultarla o
            cambiarla.
          </p>
          <Link className="boton boton-oscuro" to="/solicitar-cita">
            Solicitar cita
          </Link>
        </TarjetaReserva>
      ) : (
        <div className="citas-lista">
          {citas.map((cita) => (
            <ItemCita
              key={cita.id}
              cita={cita}
              alCancelar={cancelarCita}
              alQuitar={quitarCita}
            />
          ))}
        </div>
      )}
    </MarcoPagina>
  )
}