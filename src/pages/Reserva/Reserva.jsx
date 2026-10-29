import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MarcoPagina from '../../components/estructura/MarcoPagina/MarcoPagina'
import CuadroInfo from '../../components/comunes/CuadroInfo/CuadroInfo'
import AvisoUrgencia from '../../components/reserva/AvisoUrgencia/AvisoUrgencia'
import BarraPasos from '../../components/reserva/BarraPasos/BarraPasos'
import PasoConfirmacion from '../../components/reserva/PasoConfirmacion/PasoConfirmacion'
import PasoDatos from '../../components/reserva/PasoDatos/PasoDatos'
import PasoEspecialidad from '../../components/reserva/PasoEspecialidad/PasoEspecialidad'
import PasoProfesional from '../../components/reserva/PasoProfesional/PasoProfesional'
import PasoRevision from '../../components/reserva/PasoRevision/PasoRevision'
import ResumenCita from '../../components/reserva/ResumenCita/ResumenCita'
import TarjetaAyuda from '../../components/reserva/TarjetaAyuda/TarjetaAyuda'
import TarjetaPreparacion from '../../components/reserva/TarjetaPreparacion/TarjetaPreparacion'
import TarjetaReserva from '../../components/reserva/TarjetaReserva/TarjetaReserva'
import TarjetaTranquilidad from '../../components/reserva/TarjetaTranquilidad/TarjetaTranquilidad'
import TarjetaUbicacion from '../../components/reserva/TarjetaUbicacion/TarjetaUbicacion'
import { correoConfigurado } from '../../configuracion/emailjs'
import {
  DATOS_INICIALES,
  PASOS,
  PROFESIONALES,
  buscarEspecialidad,
  buscarProfesional,
  buscarTipoConsulta,
} from '../../datos/datosReserva'
import { crearCita, reprogramarCita } from '../../servicios/api'
import {
  cerrarAlerta,
  mostrarAlerta,
  mostrarCargando,
} from '../../servicios/alertas/alertas'
import {
  actualizarCita,
  agregarCita,
  buscarCita,
} from '../../servicios/citasGuardadas'
import { enviarCorreoCita } from '../../servicios/servicioCorreo'
import { aISO, proximaFechaDisponible } from '../../utilidades/fechas'
import './Reserva.css'

// id de cada especialidad en la base de datos (tabla especialidades)
const ID_BD_ESPECIALIDAD = {
  'medicina-general': 1,
  pediatria: 2,
  ginecologia: 3,
  cardiologia: 4,
  traumatologia: 5,
  dermatologia: 6,
  oftalmologia: 7,
  neurologia: 8,
  urologia: 9,
}

// Página de reserva (/solicitar-cita): muestra uno de los 5 pasos
export default function Reserva() {
  // Si venimos de "Mis citas" > "Cambiar fecha u hora", se edita esa cita en lugar de crear otra
  const { state } = useLocation()
  const citaEditada = state && state.cambiarCita ? buscarCita(state.cambiarCita) : null

  const [paso, setPaso] = useState(citaEditada ? 2 : 1)
  const [datos, setDatos] = useState(
    citaEditada
      ? { ...citaEditada.datos, privacidadAceptada: false, localizador: citaEditada.id }
      : DATOS_INICIALES,
  )
  // Qué pasó con el correo: null | 'enviado' | 'sin-configurar' | 'error'
  const [estadoCorreo, setEstadoCorreo] = useState(null)

  // Al cambiar de paso se sube al inicio de la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [paso])

  // Cambia solo algunos datos, por ejemplo actualizar({ hora: '10:00' })
  function actualizar(cambios) {
    setDatos((anteriores) => ({ ...anteriores, ...cambios }))
  }

  // Paso 1 -> 2: deja elegido el primer profesional y su primer día con horas
  function irAProfesionales() {
    const profesionales = PROFESIONALES[datos.especialidadId]
    const yaElegido = profesionales.some((pro) => pro.id === datos.profesionalId)

    if (!yaElegido) {
      const primero = profesionales[0]
      const proxima = proximaFechaDisponible(primero)
      actualizar({
        profesionalId: primero.id,
        fecha: proxima ? aISO(proxima) : null,
        hora: null,
      })
    }
    setPaso(2)
  }

  // Paso 4 -> 5: reserva en el backend, guarda en "Mis citas", envía el correo y muestra el resultado
  async function confirmar() {
    const datosCita = {
      especialidadId: datos.especialidadId,
      tipoConsulta: datos.tipoConsulta,
      profesionalId: datos.profesionalId,
      fecha: datos.fecha,
      hora: datos.hora,
      paciente: datos.paciente,
    }
    const correoPaciente = datos.paciente.correo.trim()
    let localizador

    mostrarCargando('Confirmando tu cita…', 'Estamos reservando tu horario.')

    try {
      if (citaEditada) {
        await reprogramarCita(citaEditada.id, correoPaciente, datos.fecha, datos.hora)
        localizador = citaEditada.id
        actualizarCita(localizador, { estado: 'confirmada', datos: datosCita })
      } else {
        const profesional = buscarProfesional(datos.especialidadId, datos.profesionalId)
        const cita = await crearCita(
          datos,
          ID_BD_ESPECIALIDAD[datos.especialidadId],
          profesional.numero,
        )
        localizador = cita.localizador
        agregarCita({
          id: localizador,
          estado: 'confirmada',
          creadaEl: new Date().toISOString(),
          datos: datosCita,
        })
      }
    } catch (error) {
      cerrarAlerta()
      const ocupado = error.codigo === 'HORARIO_NO_DISPONIBLE'
      mostrarAlerta({
        icono: 'error',
        titulo: 'No pudimos reservar tu cita',
        texto: ocupado
          ? 'Ese horario ya no está disponible. Elige otro.'
          : error.message === 'Failed to fetch'
            ? 'No pudimos conectar con el servidor. Inténtalo de nuevo.'
            : error.message,
      })
      if (ocupado) setPaso(2)
      return
    }

    cerrarAlerta()

    if (correoConfigurado) {
      mostrarCargando(
        'Confirmando tu cita…',
        'Te estamos enviando un correo de confirmación.',
      )
    }
    const tipoCorreo = citaEditada ? 'cambiada' : 'confirmada'
    const resultado = await enviarCorreoCita(datosCita, localizador, tipoCorreo)
    if (correoConfigurado) cerrarAlerta()

    actualizar({ localizador })
    setEstadoCorreo(resultado)
    setPaso(5)

    const textos = {
      enviado: `Tu localizador es ${localizador}. Te hemos enviado un correo a ${correoPaciente}.`,
      error: `Tu localizador es ${localizador}. Tu cita quedó registrada, pero no pudimos enviar el correo.`,
      'sin-configurar': `Tu localizador es ${localizador}. Puedes consultar tu cita en Mis citas.`,
    }
    mostrarAlerta({
      icono: resultado === 'error' ? 'warning' : 'success',
      titulo: citaEditada ? '¡Cita actualizada!' : '¡Cita confirmada!',
      texto: textos[resultado],
    })
  }

  // Título y subtítulo de cada paso
  const especialidad = buscarEspecialidad(datos.especialidadId)
  const tipo = buscarTipoConsulta(datos.tipoConsulta)
  const textosPaso = [
    {
      titulo: '¿Qué atención necesitas?',
      subtitulo:
        'Elige una especialidad y el tipo de consulta. Te ayudamos a encontrar tu cita.',
    },
    {
      titulo: 'Un profesional y un horario para ti',
      subtitulo: `${especialidad.nombre} · ${tipo.nombre} · Atención presencial`,
    },
    {
      titulo: 'Cuéntanos quién eres',
      subtitulo: 'Estos datos nos ayudan a preparar tu visita.',
    },
    {
      titulo: 'Revisa tu cita',
      subtitulo: 'Comprueba que todo está correcto antes de confirmar.',
    },
    {
      titulo: 'Tu cita está confirmada',
      subtitulo: `Gracias, ${datos.paciente.nombre.trim()}. Guarda estos detalles para tener tu próxima visita a mano.`,
    },
  ]
  const textos = textosPaso[paso - 1]

  // Aviso del último paso, según se haya enviado el correo o no
  const correo = datos.paciente.correo.trim()
  const avisosConfirmacion = {
    enviado: `Hemos enviado un correo de confirmación a ${correo}.`,
    error: 'No pudimos enviar el correo, pero tu cita quedó registrada.',
    'sin-configurar':
      'Tu cita quedó registrada. Guarda tu localizador para consultarla.',
  }

  return (
    <MarcoPagina
      migas={[
        { texto: 'Inicio', destino: '/' },
        { texto: 'Solicitar cita' },
        { texto: PASOS[paso - 1] },
      ]}
      titulo={textos.titulo}
      subtitulo={textos.subtitulo}
      extraTitulo={
        <span className="contador-pasos">
          {paso === 5 ? 'Proceso completado' : `Paso ${paso} de ${PASOS.length}`}
        </span>
      }
    >
      <BarraPasos pasoActual={paso} alElegirPaso={setPaso} />

      {paso === 5 && (
        <CuadroInfo icono="informacion" claseExtra="aviso-simulado">
          {avisosConfirmacion[estadoCorreo] || avisosConfirmacion['sin-configurar']}
        </CuadroInfo>
      )}
      {citaEditada && paso < 5 && (
        <CuadroInfo icono="informacion" claseExtra="aviso-simulado">
          Estás cambiando tu cita {citaEditada.id}. Elige el nuevo horario y confirma.
        </CuadroInfo>
      )}

      <div className="reserva-columnas">
        {paso === 5 ? (
          <PasoConfirmacion datos={datos} />
        ) : (
          <TarjetaReserva>
            {paso === 1 && (
              <PasoEspecialidad
                datos={datos}
                actualizar={actualizar}
                alContinuar={irAProfesionales}
              />
            )}
            {paso === 2 && (
              <PasoProfesional
                datos={datos}
                actualizar={actualizar}
                alVolver={() => setPaso(1)}
                alContinuar={() => setPaso(3)}
              />
            )}
            {paso === 3 && (
              <PasoDatos
                datos={datos}
                actualizar={actualizar}
                alVolver={() => setPaso(2)}
                alContinuar={() => setPaso(4)}
              />
            )}
            {paso === 4 && (
              <PasoRevision
                datos={datos}
                actualizar={actualizar}
                irAPaso={setPaso}
                alVolver={() => setPaso(3)}
                alConfirmar={confirmar}
              />
            )}
          </TarjetaReserva>
        )}

        <aside className="reserva-lateral">
          {paso === 1 && (
            <>
              <TarjetaTranquilidad />
              <AvisoUrgencia />
            </>
          )}
          {paso >= 2 && paso <= 4 && (
            <>
              <ResumenCita datos={datos} />
              <TarjetaAyuda />
            </>
          )}
          {paso === 5 && (
            <>
              <TarjetaPreparacion />
              <TarjetaUbicacion />
            </>
          )}
        </aside>
      </div>
    </MarcoPagina>
  )
}