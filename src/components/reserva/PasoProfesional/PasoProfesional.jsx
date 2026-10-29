import { useEffect, useState } from 'react'
import AccionesPaso from '../AccionesPaso/AccionesPaso'
import CuadroInfo from '../../comunes/CuadroInfo/CuadroInfo'
import Icono from '../../comunes/Icono/Icono'
import TarjetaOpcion from '../../comunes/TarjetaOpcion/TarjetaOpcion'
import {
  PROFESIONALES,
  buscarEspecialidad,
  buscarProfesional,
} from '../../../datos/datosReserva'
import { obtenerHorarios } from '../../../servicios/api'
import {
  MAX_SEMANAS,
  aISO,
  deISO,
  diaSemanaCorto,
  diaYMes,
  indiceDeSemana,
  obtenerSemana,
  proximaFechaDisponible,
  rangoSemana,
  tieneHoras,
  tituloDia,
  tituloMes,
} from '../../../utilidades/fechas'
import './PasoProfesional.css'

// Paso 2: elegir profesional, día y hora (las horas vienen del backend)
export default function PasoProfesional({ datos, actualizar, alVolver, alContinuar }) {
  const profesionales = PROFESIONALES[datos.especialidadId]
  const especialidad = buscarEspecialidad(datos.especialidadId)
  const profesional = buscarProfesional(datos.especialidadId, datos.profesionalId)

  // Semana que se está viendo (0 = la primera)
  const [indiceSemana, setIndiceSemana] = useState(indiceDeSemana(datos.fecha))

  // Horas reales del día elegido: [{ hora: '09:00', libre: true }, ...]
  const [horas, setHoras] = useState([])
  const [cargandoHoras, setCargandoHoras] = useState(false)
  const [errorHoras, setErrorHoras] = useState('')

  const semana = obtenerSemana(indiceSemana)
  const fechaElegida = datos.fecha ? deISO(datos.fecha) : null

  // Cada vez que cambia el profesional o el día, se piden las horas al backend
  useEffect(() => {
    if (!datos.fecha || !profesional) {
      setHoras([])
      return
    }

    let cancelado = false
    setCargandoHoras(true)
    setErrorHoras('')

    obtenerHorarios(profesional.numero, datos.fecha)
      .then((lista) => {
        if (cancelado) return
        setHoras(lista.map((item) => ({ hora: item.hora, libre: item.disponible })))
      })
      .catch(() => {
        if (cancelado) return
        setHoras([])
        setErrorHoras('No pudimos cargar los horarios. Revisa tu conexión e inténtalo de nuevo.')
      })
      .finally(() => {
        if (!cancelado) setCargandoHoras(false)
      })

    // Evita mezclar respuestas si el usuario cambia rápido de día o profesional
    return () => {
      cancelado = true
    }
  }, [profesional, datos.fecha])

  // Al elegir un profesional se selecciona su primer día con horas libres
  function elegirProfesional(nuevo) {
    const proxima = proximaFechaDisponible(nuevo)
    const iso = proxima ? aISO(proxima) : null
    actualizar({ profesionalId: nuevo.id, fecha: iso, hora: null })
    setIndiceSemana(indiceDeSemana(iso))
  }

  let mensajeEleccion = 'Elige un día y una hora para continuar.'
  if (datos.hora && fechaElegida) {
    mensajeEleccion = `Has elegido el ${diaYMes(fechaElegida)} a las ${datos.hora} h con ${profesional.nombre}. Revisa tus datos antes de confirmar.`
  }

  return (
    <>
      <div className="tarjeta-titulo-fila">
        <h2>Elige tu profesional</h2>
        <span>{profesionales.length} profesionales disponibles</span>
      </div>

      <fieldset className="opciones-grilla">
        <legend className="solo-lectores">Profesional</legend>
        {profesionales.map((pro) => {
          const proxima = proximaFechaDisponible(pro)
          return (
            <TarjetaOpcion
              key={pro.id}
              grupo="profesional"
              seleccionada={pro.id === datos.profesionalId}
              alCambiar={() => elegirProfesional(pro)}
              icono={<span className="avatar">{pro.iniciales}</span>}
            >
              <strong>{pro.nombre}</strong>
              <small>{especialidad.nombre}</small>
              <em>
                {proxima ? `Disponible el ${diaYMes(proxima)}` : 'Sin horas próximas'}
              </em>
            </TarjetaOpcion>
          )
        })}
      </fieldset>

      <hr className="separador" />

      <div className="tarjeta-titulo-fila">
        <h3>{tituloMes(semana)}</h3>
        <div className="semana-nav">
          <button
            type="button"
            aria-label="Semana anterior"
            disabled={indiceSemana === 0}
            onClick={() => setIndiceSemana(indiceSemana - 1)}
          >
            <Icono nombre="anterior" tamano={18} />
          </button>
          <span>{rangoSemana(semana)}</span>
          <button
            type="button"
            aria-label="Semana siguiente"
            disabled={indiceSemana === MAX_SEMANAS - 1}
            onClick={() => setIndiceSemana(indiceSemana + 1)}
          >
            <Icono nombre="siguiente" tamano={18} />
          </button>
        </div>
      </div>

      <div className="dias-grilla">
        {semana.map((dia) => {
          const iso = aISO(dia)
          const hayHoras = tieneHoras(profesional, iso)
          const elegido = iso === datos.fecha

          let estado = 'Sin horas'
          if (elegido) estado = 'Seleccionado'
          else if (hayHoras) estado = 'Disponible'

          return (
            <button
              key={iso}
              type="button"
              className={elegido ? 'dia-boton seleccionado' : 'dia-boton'}
              disabled={!hayHoras}
              aria-pressed={elegido}
              onClick={() => actualizar({ fecha: iso, hora: null })}
            >
              <small>{diaSemanaCorto(dia)}</small>
              <strong>{dia.getDate()}</strong>
              <span>{estado}</span>
            </button>
          )
        })}
      </div>

      {fechaElegida ? (
        <>
          <div className="tarjeta-titulo-fila horas-titulo">
            <h3>{tituloDia(fechaElegida)}</h3>
            <span>Duración estimada: 30 min</span>
          </div>

          {cargandoHoras && <p className="horas-leyenda">Cargando horarios…</p>}
          {errorHoras && <CuadroInfo>{errorHoras}</CuadroInfo>}
          {!cargandoHoras && !errorHoras && horas.length === 0 && (
            <CuadroInfo>No hay horarios para este día. Elige otro día.</CuadroInfo>
          )}

          <div className="horas-grilla">
            {horas.map((item) => {
              const elegida = item.hora === datos.hora

              let texto = <s>{item.hora}</s> // hora tachada = no disponible
              if (item.libre) texto = elegida ? `✓ ${item.hora}` : item.hora

              return (
                <button
                  key={item.hora}
                  type="button"
                  className={elegida ? 'hora-boton seleccionado' : 'hora-boton'}
                  disabled={!item.libre}
                  aria-pressed={elegida}
                  onClick={() => actualizar({ hora: item.hora })}
                >
                  {texto}
                </button>
              )
            })}
          </div>
          <p className="horas-leyenda">
            <span>✓ Seleccionado</span>
            <span>Hora tachada: no disponible</span>
            <span>Hora local del hospital</span>
          </p>
        </>
      ) : (
        <CuadroInfo>
          Elige un profesional con horas disponibles para ver el calendario.
        </CuadroInfo>
      )}

      <CuadroInfo icono="calendario-check">{mensajeEleccion}</CuadroInfo>

      <AccionesPaso textoVolver="Cambiar especialidad" alVolver={alVolver}>
        <button
          type="button"
          className="boton boton-oscuro"
          disabled={!datos.hora}
          onClick={alContinuar}
        >
          Continuar con mis datos <Icono nombre="flecha-derecha" tamano={18} />
        </button>
      </AccionesPaso>
    </>
  )
}