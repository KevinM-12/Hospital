// Guarda las citas en el navegador (localStorage), por eso "Mis citas" solo muestra
// las citas hechas desde el mismo navegador.
const CLAVE = 'citasSanaSana'

export function obtenerCitas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

function guardarCitas(citas) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(citas))
  } catch {
    // si el navegador no permite guardar, la cita solo existe mientras la página esté abierta
  }
}

export function buscarCita(id) {
  return obtenerCitas().find((cita) => cita.id === id) || null
}

export function agregarCita(cita) {
  guardarCitas([cita, ...obtenerCitas()])
}

export function actualizarCita(id, cambios) {
  const citas = obtenerCitas().map((cita) =>
    cita.id === id ? { ...cita, ...cambios } : cita,
  )
  guardarCitas(citas)
}

export function eliminarCita(id) {
  guardarCitas(obtenerCitas().filter((cita) => cita.id !== id))
}

// Crea un localizador de ejemplo, como SS-DEMO-2810, que no se repita
export function crearLocalizador() {
  const usados = obtenerCitas().map((cita) => cita.id)
  let localizador = `SS-DEMO-${Math.floor(1000 + Math.random() * 9000)}`
  while (usados.includes(localizador)) {
    localizador = `SS-DEMO-${Math.floor(1000 + Math.random() * 9000)}`
  }
  return localizador
}
