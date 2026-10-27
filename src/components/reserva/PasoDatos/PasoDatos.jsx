import { useState } from 'react'
import AccionesPaso from '../AccionesPaso/AccionesPaso'
import CampoFormulario from '../../comunes/CampoFormulario/CampoFormulario'
import Icono from '../../comunes/Icono/Icono'
import { correoConfigurado } from '../../../configuracion/emailjs'
import { mostrarAviso } from '../../../servicios/alertas/alertas'
import { hoyISO } from '../../../utilidades/fechas'
import './PasoDatos.css'

// Revisa los datos y devuelve los errores, por ejemplo { nombre: 'Escribe tu nombre.' }
function validar(paciente) {
  const errores = {}

  if (paciente.nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre.'
  if (paciente.apellidos.trim().length < 2) errores.apellidos = 'Escribe tus apellidos.'

  if (!paciente.fechaNacimiento) {
    errores.fechaNacimiento = 'Indica tu fecha de nacimiento.'
  } else if (
    paciente.fechaNacimiento > hoyISO() ||
    paciente.fechaNacimiento < '1900-01-01'
  ) {
    errores.fechaNacimiento = 'Introduce una fecha de nacimiento válida.'
  }

  // El documento: de 6 a 12 letras o números, sin espacios
  if (!/^[A-Za-z0-9]{6,12}$/.test(paciente.documento.trim())) {
    errores.documento = 'Introduce un documento válido (6 a 12 caracteres, sin espacios).'
  }

  // El teléfono: al menos 9 números
  if (paciente.telefono.replace(/\D/g, '').length < 9) {
    errores.telefono = 'Introduce un teléfono con al menos 9 dígitos.'
  }

  // El correo: algo@dominio.com
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paciente.correo.trim())) {
    errores.correo = 'Introduce un correo electrónico válido.'
  }

  return errores
}

// Paso 3: datos de la persona
export default function PasoDatos({ datos, actualizar, alVolver, alContinuar }) {
  const paciente = datos.paciente

  // "tocados" guarda los campos que la persona ya visitó, para mostrar su error
  const [tocados, setTocados] = useState({})
  const errores = validar(paciente)

  function cambiarCampo(nombre, valor) {
    actualizar({ paciente: { ...paciente, [nombre]: valor } })
  }

  function marcarTocado(nombre) {
    setTocados({ ...tocados, [nombre]: true })
  }

  function errorDe(nombre) {
    return tocados[nombre] ? errores[nombre] : undefined
  }

  function enviar(evento) {
    evento.preventDefault()

    if (Object.keys(errores).length > 0) {
      // Se marcan todos los campos para que se vean los errores
      setTocados({
        nombre: true,
        apellidos: true,
        fechaNacimiento: true,
        documento: true,
        telefono: true,
        correo: true,
      })
      mostrarAviso('error', 'Revisa los campos marcados en rojo.')
      return
    }
    alContinuar()
  }

  // Atributos que comparten todos los campos
  function campo(nombre, etiqueta, extra) {
    return {
      id: `campo-${nombre}`,
      etiqueta: etiqueta,
      value: paciente[nombre],
      error: errorDe(nombre),
      onChange: (evento) => cambiarCampo(nombre, evento.target.value),
      onBlur: () => marcarTocado(nombre),
      ...extra,
    }
  }

  return (
    <form onSubmit={enviar} noValidate>
      <h2>Tus datos de contacto</h2>
      <p className="tarjeta-intro">Solo pedimos lo necesario para preparar tu visita.</p>

      <div className="formulario-grilla">
        <CampoFormulario {...campo('nombre', 'Nombre', { autoComplete: 'given-name' })} />
        <CampoFormulario
          {...campo('apellidos', 'Apellidos', { autoComplete: 'family-name' })}
        />
        <CampoFormulario
          {...campo('fechaNacimiento', 'Fecha de nacimiento', {
            type: 'date',
            min: '1900-01-01',
            max: hoyISO(),
            autoComplete: 'bday',
          })}
        />
        <CampoFormulario
          {...campo('documento', 'Documento de identidad', {
            autoComplete: 'off',
            maxLength: 12,
          })}
        />
        <CampoFormulario
          {...campo('telefono', 'Teléfono', {
            type: 'tel',
            autoComplete: 'tel',
            inputMode: 'tel',
          })}
        />
        <CampoFormulario
          {...campo('correo', 'Correo electrónico', {
            type: 'email',
            autoComplete: 'email',
          })}
        />
      </div>

      <p className="nota-privacidad">
        <Icono nombre="escudo-check" tamano={18} />
        {correoConfigurado
          ? 'Usaremos tu correo solo para enviarte la confirmación de tu cita.'
          : 'Tus datos solo se usan en esta demostración y no se envían a ningún servidor.'}
      </p>

      <AccionesPaso textoVolver="Volver a profesional y horario" alVolver={alVolver}>
        <button type="submit" className="boton boton-oscuro">
          Revisar mi cita <Icono nombre="flecha-derecha" tamano={18} />
        </button>
      </AccionesPaso>
    </form>
  )
}
