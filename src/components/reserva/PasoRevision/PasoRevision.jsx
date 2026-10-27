import { useState } from 'react'
import AccionesPaso from '../AccionesPaso/AccionesPaso'
import BotonEnlace from '../../comunes/BotonEnlace/BotonEnlace'
import CuadroInfo from '../../comunes/CuadroInfo/CuadroInfo'
import EnlaceSeccion from '../../comunes/EnlaceSeccion/EnlaceSeccion'
import Icono from '../../comunes/Icono/Icono'
import { correoConfigurado } from '../../../configuracion/emailjs'
import { LUGAR } from '../../../datos/datosReserva'
import { mostrarAlerta } from '../../../servicios/alertas/alertas'
import { formatearNacimiento } from '../../../utilidades/fechas'
import { obtenerResumenCita } from '../../../utilidades/resumenCita'
import './PasoRevision.css'

// Paso 4: revisar todo y confirmar
export default function PasoRevision({
  datos,
  actualizar,
  irAPaso,
  alVolver,
  alConfirmar,
}) {
  const [intentoConfirmar, setIntentoConfirmar] = useState(false)
  const resumen = obtenerResumenCita(datos)
  const paciente = datos.paciente
  const faltaPrivacidad = intentoConfirmar && !datos.privacidadAceptada

  // Filas de "Datos del paciente": [etiqueta, valor]
  const filasPaciente = [
    ['Nombre y apellidos', resumen.nombreCompleto],
    ['Fecha de nacimiento', formatearNacimiento(paciente.fechaNacimiento)],
    ['Documento de identidad', paciente.documento.trim()],
    ['Teléfono', paciente.telefono.trim()],
    ['Correo electrónico', paciente.correo.trim()],
  ]

  function confirmar() {
    if (!datos.privacidadAceptada) {
      setIntentoConfirmar(true)
      mostrarAlerta({
        icono: 'warning',
        titulo: 'Falta un paso',
        texto: 'Marca la casilla de privacidad para poder confirmar tu cita.',
      })
      return
    }
    alConfirmar()
  }

  const textoAviso = correoConfigurado
    ? `Al confirmar verás una reserva simulada. No se creará una cita real; solo te enviaremos un correo de confirmación a ${paciente.correo.trim()}.`
    : 'Al confirmar verás una reserva simulada. No se creará una cita real ni se enviará ningún mensaje.'

  return (
    <>
      <section className="revision-seccion">
        <div className="revision-cabecera">
          <h2>Tu consulta</h2>
          <BotonEnlace icono="lapiz" alHacerClic={() => irAPaso(2)}>
            Editar cita
          </BotonEnlace>
        </div>
        <dl className="datos-grilla">
          <div>
            <dt>Especialidad</dt>
            <dd>{resumen.especialidad.nombre}</dd>
          </div>
          <div>
            <dt>Tipo de consulta</dt>
            <dd>{resumen.tipo.nombre}</dd>
          </div>
          <div>
            <dt>Profesional</dt>
            <dd>{resumen.profesional.nombre}</dd>
          </div>
          <div>
            <dt>Fecha y hora</dt>
            <dd>{resumen.textoFecha}</dd>
          </div>
        </dl>
        <div className="lugar-caja">
          <Icono nombre="ubicacion" />
          <div>
            <p>Presencial · {LUGAR.salaCorta}</p>
            <small>
              {LUGAR.calle} · {LUGAR.ciudad}
            </small>
          </div>
        </div>
      </section>

      <section className="revision-seccion">
        <div className="revision-cabecera">
          <h2>Datos del paciente</h2>
          <BotonEnlace icono="lapiz" alHacerClic={() => irAPaso(3)}>
            Editar datos
          </BotonEnlace>
        </div>
        <dl className="datos-grilla">
          {filasPaciente.map(([etiqueta, valor]) => (
            <div key={etiqueta}>
              <dt>{etiqueta}</dt>
              <dd>{valor}</dd>
            </div>
          ))}
        </dl>
        <p className="revision-nota">Estos datos se usan solo para esta demostración.</p>
      </section>

      <div className="revision-consentimiento">
        <div className={faltaPrivacidad ? 'campo-check con-error' : 'campo-check'}>
          <label>
            <input
              type="checkbox"
              checked={datos.privacidadAceptada}
              onChange={(evento) =>
                actualizar({ privacidadAceptada: evento.target.checked })
              }
            />
            <span>He leído la información de privacidad para la gestión de mi cita.</span>
          </label>
          <EnlaceSeccion
            className="enlace-politica"
            hash="#hospital"
            target="_blank"
            rel="noreferrer"
          >
            Leer la política de privacidad
          </EnlaceSeccion>
          {faltaPrivacidad && (
            <span className="consentimiento-error">
              Debes aceptar la información de privacidad para confirmar.
            </span>
          )}
        </div>
      </div>

      <CuadroInfo icono="informacion">{textoAviso}</CuadroInfo>

      <AccionesPaso textoVolver="Volver a mis datos" alVolver={alVolver} conLinea>
        <button type="button" className="boton boton-oscuro" onClick={confirmar}>
          Confirmar cita de ejemplo <Icono nombre="flecha-derecha" tamano={18} />
        </button>
      </AccionesPaso>
    </>
  )
}
