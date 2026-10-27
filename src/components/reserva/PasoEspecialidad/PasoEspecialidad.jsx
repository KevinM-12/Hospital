import { useState } from 'react'
import AccionesPaso from '../AccionesPaso/AccionesPaso'
import BotonEnlace from '../../comunes/BotonEnlace/BotonEnlace'
import Icono from '../../comunes/Icono/Icono'
import TarjetaOpcion from '../../comunes/TarjetaOpcion/TarjetaOpcion'
import {
  ESPECIALIDADES,
  ESPECIALIDADES_EXTRA,
  TIPOS_CONSULTA,
} from '../../../datos/datosReserva'
import './PasoEspecialidad.css'

// Paso 1: elegir especialidad y tipo de consulta
export default function PasoEspecialidad({ datos, actualizar, alContinuar }) {
  // Si la especialidad elegida es de las "extra", se muestran todas desde el principio
  const eligioExtra = ESPECIALIDADES_EXTRA.some((e) => e.id === datos.especialidadId)
  const [verTodas, setVerTodas] = useState(eligioExtra)

  const visibles = verTodas
    ? [...ESPECIALIDADES, ...ESPECIALIDADES_EXTRA]
    : ESPECIALIDADES

  function elegirEspecialidad(id) {
    if (id === datos.especialidadId) return
    // Al cambiar de especialidad se borran el profesional y el horario que había
    actualizar({ especialidadId: id, profesionalId: null, fecha: null, hora: null })
  }

  return (
    <>
      <h2>Selecciona una especialidad</h2>
      <fieldset className="opciones-grilla">
        <legend className="solo-lectores">Especialidad</legend>
        {visibles.map((especialidad) => (
          <TarjetaOpcion
            key={especialidad.id}
            grupo="especialidad"
            seleccionada={especialidad.id === datos.especialidadId}
            alCambiar={() => elegirEspecialidad(especialidad.id)}
            icono={<Icono nombre={especialidad.icono} tamano={22} />}
          >
            <strong>{especialidad.nombre}</strong>
            <small>{especialidad.descripcion}</small>
          </TarjetaOpcion>
        ))}
      </fieldset>
      <div className="especialidad-mas">
        <BotonEnlace alHacerClic={() => setVerTodas(!verTodas)}>
          {verTodas ? 'Ver menos especialidades' : 'Ver todas las especialidades'}
        </BotonEnlace>
      </div>

      <h2 className="segundo-titulo">¿Qué tipo de consulta es?</h2>
      <fieldset className="opciones-grilla">
        <legend className="solo-lectores">Tipo de consulta</legend>
        {TIPOS_CONSULTA.map((tipo) => (
          <TarjetaOpcion
            key={tipo.id}
            grupo="tipo-consulta"
            compacta
            seleccionada={tipo.id === datos.tipoConsulta}
            alCambiar={() => actualizar({ tipoConsulta: tipo.id })}
          >
            <strong>{tipo.nombre}</strong>
          </TarjetaOpcion>
        ))}
      </fieldset>
      <p className="nota-reserva">
        No necesitas describir síntomas ni adjuntar informes para reservar.
      </p>

      <AccionesPaso textoVolver="Volver al inicio" destinoVolver="/">
        <button type="button" className="boton boton-oscuro" onClick={alContinuar}>
          Elegir profesional y horario <Icono nombre="flecha-derecha" tamano={18} />
        </button>
      </AccionesPaso>
      <p className="nota-reserva">Aún no se ha reservado ninguna cita.</p>
    </>
  )
}
