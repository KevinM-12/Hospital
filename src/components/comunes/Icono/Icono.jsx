import './Icono.css'
import flechaIzquierda from '../../../assets/iconos/flecha-izquierda.svg'
import flechaDerecha from '../../../assets/iconos/flecha-derecha.svg'
import flechaArribaDerecha from '../../../assets/iconos/flecha-arriba-derecha.svg'
import anterior from '../../../assets/iconos/anterior.svg'
import siguiente from '../../../assets/iconos/siguiente.svg'
import check from '../../../assets/iconos/check.svg'
import checkGrueso from '../../../assets/iconos/check-grueso.svg'
import circuloCheck from '../../../assets/iconos/circulo-check.svg'
import calendarioCheck from '../../../assets/iconos/calendario-check.svg'
import calendarioReloj from '../../../assets/iconos/calendario-reloj.svg'
import calendarioDias from '../../../assets/iconos/calendario-dias.svg'
import calendarioMas from '../../../assets/iconos/calendario-mas.svg'
import calendarioCancelar from '../../../assets/iconos/calendario-cancelar.svg'
import estetoscopio from '../../../assets/iconos/estetoscopio.svg'
import bebe from '../../../assets/iconos/bebe.svg'
import flor from '../../../assets/iconos/flor.svg'
import corazonPulso from '../../../assets/iconos/corazon-pulso.svg'
import hueso from '../../../assets/iconos/hueso.svg'
import mano from '../../../assets/iconos/mano.svg'
import ojo from '../../../assets/iconos/ojo.svg'
import cerebro from '../../../assets/iconos/cerebro.svg'
import gota from '../../../assets/iconos/gota.svg'
import usuario from '../../../assets/iconos/usuario.svg'
import ubicacion from '../../../assets/iconos/ubicacion.svg'
import correo from '../../../assets/iconos/correo.svg'
import auriculares from '../../../assets/iconos/auriculares.svg'
import informacion from '../../../assets/iconos/informacion.svg'
import sirena from '../../../assets/iconos/sirena.svg'
import escudoCheck from '../../../assets/iconos/escudo-check.svg'
import lapiz from '../../../assets/iconos/lapiz.svg'
import descargar from '../../../assets/iconos/descargar.svg'
import numeral from '../../../assets/iconos/numeral.svg'

// Cada nombre apunta a un archivo .svg de la carpeta assets/iconos
const ICONOS = {
  'flecha-izquierda': flechaIzquierda,
  'flecha-derecha': flechaDerecha,
  'flecha-arriba-derecha': flechaArribaDerecha,
  anterior,
  siguiente,
  check,
  'check-grueso': checkGrueso,
  'circulo-check': circuloCheck,
  'calendario-check': calendarioCheck,
  'calendario-reloj': calendarioReloj,
  'calendario-dias': calendarioDias,
  'calendario-mas': calendarioMas,
  'calendario-cancelar': calendarioCancelar,
  estetoscopio,
  bebe,
  flor,
  'corazon-pulso': corazonPulso,
  hueso,
  mano,
  ojo,
  cerebro,
  gota,
  usuario,
  ubicacion,
  correo,
  auriculares,
  informacion,
  sirena,
  'escudo-check': escudoCheck,
  lapiz,
  descargar,
  numeral,
}

// Muestra un icono. Uso: <Icono nombre="calendario-dias" tamano={20} />
// El icono toma el color del texto que lo rodea (ver Icono.css).
export default function Icono({ nombre, tamano = 20 }) {
  const imagen = `url("${ICONOS[nombre]}")`
  const estilo = {
    width: tamano,
    height: tamano,
    maskImage: imagen,
    WebkitMaskImage: imagen,
  }

  return <span className="icono" style={estilo} aria-hidden="true" />
}
