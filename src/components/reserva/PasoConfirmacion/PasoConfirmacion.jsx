import { Link } from 'react-router-dom'
import AccionesPaso from '../AccionesPaso/AccionesPaso'
import TarjetaReserva from '../TarjetaReserva/TarjetaReserva'
import EtiquetaEstado from '../../comunes/EtiquetaEstado/EtiquetaEstado'
import Icono from '../../comunes/Icono/Icono'
import ListaDatos from '../../comunes/ListaDatos/ListaDatos'
import { LUGAR } from '../../../datos/datosReserva'
import { mostrarAviso } from '../../../servicios/alertas/alertas'
import { descargarCalendario, descargarComprobante } from '../../../servicios/descargas'
import { obtenerResumenCita } from '../../../utilidades/resumenCita'
import './PasoConfirmacion.css'

// Opciones de la tarjeta "Tus planes pueden cambiar"
const CAMBIOS = [
  {
    icono: 'calendario-reloj',
    titulo: 'Cambiar fecha u hora',
    texto: 'Encuentra otro horario que te venga mejor.',
    enlace: 'Cambiar cita',
  },
  {
    icono: 'calendario-cancelar',
    titulo: 'Cancelar la cita',
    texto: 'Si no puedes asistir, libera tu horario para otra persona.',
    enlace: 'Cancelar cita',
  },
]

// Paso 5: la cita ya está confirmada
export default function PasoConfirmacion({ datos }) {
  const resumen = obtenerResumenCita(datos)

  const detalles = [
    { icono: 'calendario-dias', etiqueta: 'Fecha y hora', valor: resumen.textoFecha },
    {
      icono: 'usuario',
      etiqueta: 'Profesional y consulta',
      valor: `${resumen.profesional.nombre} · ${resumen.tipo.nombre}`,
    },
    {
      icono: 'ubicacion',
      etiqueta: 'Consulta presencial · 30 min aprox.',
      valor: LUGAR.sala,
    },
    {
      icono: 'correo',
      etiqueta: 'Correo de contacto',
      valor: datos.paciente.correo.trim(),
    },
  ]

  function agregarAlCalendario() {
    descargarCalendario(datos)
    mostrarAviso('success', 'Archivo de calendario descargado.')
  }

  function bajarComprobante() {
    descargarComprobante(datos)
    mostrarAviso('success', 'Comprobante descargado.')
  }

  return (
    <div className="confirmacion-principal">
      <TarjetaReserva>
        <div className="confirmacion-cabecera">
          <span className="confirmacion-check">
            <Icono nombre="check-grueso" tamano={28} />
          </span>
          <div>
            <h2>Todo listo para tu visita</h2>
            <p>
              {resumen.nombreCompleto} · {resumen.especialidad.nombre}
            </p>
          </div>
          <EtiquetaEstado>✓ Confirmada · Ejemplo</EtiquetaEstado>
        </div>

        <div className="localizador-caja">
          <div>
            <small>Localizador de ejemplo</small>
            <strong>{datos.localizador}</strong>
          </div>
          <p>En una reserva real, usarías este código para acceder a Mis citas.</p>
        </div>

        <ListaDatos datos={detalles} />

        <div className="confirmacion-botones">
          <button
            type="button"
            className="boton boton-oscuro"
            onClick={agregarAlCalendario}
          >
            Añadir al calendario <Icono nombre="calendario-mas" tamano={18} />
          </button>
          <button type="button" className="boton boton-borde" onClick={bajarComprobante}>
            Descargar comprobante <Icono nombre="descargar" tamano={18} />
          </button>
        </div>
      </TarjetaReserva>

      <TarjetaReserva>
        <h2>Tus planes pueden cambiar</h2>
        <p className="tarjeta-intro">
          Desde Mis citas podrás consultar tu reserva o gestionar cualquier cambio.
        </p>
        <div className="cambios-lista">
          {CAMBIOS.map((cambio) => (
            <div key={cambio.titulo} className="cambio-fila">
              <span className="cambio-icono">
                <Icono nombre={cambio.icono} tamano={22} />
              </span>
              <div className="cambio-texto">
                <strong>{cambio.titulo}</strong>
                <small>{cambio.texto}</small>
              </div>
              <Link className="cambio-enlace" to="/mis-citas">
                {cambio.enlace}
              </Link>
            </div>
          ))}
        </div>
        <AccionesPaso textoVolver="Volver al inicio" destinoVolver="/">
          <Link className="boton boton-borde" to="/mis-citas">
            Acceder a Mis citas <Icono nombre="flecha-arriba-derecha" tamano={18} />
          </Link>
        </AccionesPaso>
      </TarjetaReserva>
    </div>
  )
}
