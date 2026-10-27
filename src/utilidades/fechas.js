// Funciones para trabajar con fechas, semanas y horarios de ejemplo.
import { HORAS } from '../datos/datosReserva'

export const MAX_SEMANAS = 4 // cuántas semanas se pueden consultar

const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const DIAS_LARGOS = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
]
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]
const MESES_CORTOS = [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'may.',
  'jun.',
  'jul.',
  'ago.',
  'sep.',
  'oct.',
  'nov.',
  'dic.',
]

function conDosDigitos(numero) {
  return String(numero).padStart(2, '0')
}

function primeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// ----- Convertir entre Date y texto AAAA-MM-DD -----

// Date -> '2026-10-28'
export function aISO(fecha) {
  return `${fecha.getFullYear()}-${conDosDigitos(fecha.getMonth() + 1)}-${conDosDigitos(fecha.getDate())}`
}

// '2026-10-28' -> Date
export function deISO(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

export function hoyISO() {
  return aISO(new Date())
}

// ----- Semanas -----

// El primer lunes que se puede reservar: el de la semana siguiente a hoy
function primerLunes() {
  const fecha = new Date()
  fecha.setHours(0, 0, 0, 0)
  const diaSemana = fecha.getDay() // 0 = domingo
  const diasHastaLunes = diaSemana === 0 ? 1 : 8 - diaSemana
  fecha.setDate(fecha.getDate() + diasHastaLunes)
  return fecha
}

// Devuelve los 5 días (lunes a viernes) de la semana número "indice" (0 = la primera)
export function obtenerSemana(indice) {
  const lunes = primerLunes()
  lunes.setDate(lunes.getDate() + indice * 7)

  const dias = []
  for (let i = 0; i < 5; i++) {
    const dia = new Date(lunes)
    dia.setDate(lunes.getDate() + i)
    dias.push(dia)
  }
  return dias
}

// ¿En qué semana (0, 1, 2...) cae una fecha?
export function indiceDeSemana(iso) {
  if (!iso) return 0
  const milisegundosPorSemana = 7 * 24 * 60 * 60 * 1000
  const indice = Math.floor((deISO(iso) - primerLunes()) / milisegundosPorSemana)
  return Math.min(Math.max(indice, 0), MAX_SEMANAS - 1)
}

// ----- Horarios de ejemplo -----

// Devuelve las horas de un día: [{ hora: '09:00', libre: true }, ...]
// Es disponibilidad inventada, pero siempre igual para el mismo día y profesional.
export function obtenerHoras(profesional, iso) {
  const [, mes, dia] = iso.split('-').map(Number)
  const semilla = dia * 7 + mes * 31 + profesional.numero * 13

  if (semilla % 6 === 0) return [] // un día de cada seis no tiene horas

  return HORAS.map((hora, i) => ({ hora, libre: (semilla + i * 5) % 3 !== 0 }))
}

export function tieneHoras(profesional, iso) {
  return obtenerHoras(profesional, iso).some((item) => item.libre)
}

// Primer día con horas libres para un profesional (o null si no hay)
export function proximaFechaDisponible(profesional) {
  for (let semana = 0; semana < MAX_SEMANAS; semana++) {
    const dia = obtenerSemana(semana).find((fecha) =>
      tieneHoras(profesional, aISO(fecha)),
    )
    if (dia) return dia
  }
  return null
}

// ----- Textos de fechas -----

export function diaYMes(fecha) {
  return `${fecha.getDate()} de ${MESES[fecha.getMonth()]}` // 28 de octubre
}

export function tituloDia(fecha) {
  return `${primeraMayuscula(DIAS_LARGOS[fecha.getDay()])}, ${diaYMes(fecha)}` // Miércoles, 28 de octubre
}

export function fechaCompleta(fecha) {
  return `${DIAS_CORTOS[fecha.getDay()]}. ${diaYMes(fecha)} de ${fecha.getFullYear()}` // Mié. 28 de octubre de 2026
}

export function diaSemanaCorto(fecha) {
  return DIAS_CORTOS[fecha.getDay()]
}

// Título del mes de una semana: "Octubre de 2026"
export function tituloMes(semana) {
  const primero = semana[0]
  const ultimo = semana[semana.length - 1]
  if (primero.getMonth() === ultimo.getMonth()) {
    return `${primeraMayuscula(MESES[primero.getMonth()])} de ${primero.getFullYear()}`
  }
  return `${primeraMayuscula(MESES[primero.getMonth()])} – ${MESES[ultimo.getMonth()]} de ${ultimo.getFullYear()}`
}

// Rango de una semana: "26–30 oct."
export function rangoSemana(semana) {
  const primero = semana[0]
  const ultimo = semana[semana.length - 1]
  if (primero.getMonth() === ultimo.getMonth()) {
    return `${primero.getDate()}–${ultimo.getDate()} ${MESES_CORTOS[primero.getMonth()]}`
  }
  return `${primero.getDate()} ${MESES_CORTOS[primero.getMonth()]}–${ultimo.getDate()} ${MESES_CORTOS[ultimo.getMonth()]}`
}

// '1984-05-14' -> '14/05/1984'
export function formatearNacimiento(iso) {
  const [anio, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${anio}`
}
