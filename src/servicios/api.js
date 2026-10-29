const API_URL = import.meta.env.VITE_API_URL

async function pedir(ruta, opciones = {}) {
  const res = await fetch(`${API_URL}${ruta}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  })
  const datos = await res.json()
  if (!res.ok) {
    const error = new Error(datos.error || 'Error de la API')
    error.codigo = datos.codigo
    throw error
  }
  return datos
}

// --- Conversión: formato del backend -> formato que ya usa el frontend ---
const aEspecialidad = (e) => ({
  id: e.slug,            // 'medicina-general'
  dbId: e.id,            // 1 (lo pide el POST /api/citas)
  nombre: e.nombre,
  descripcion: e.descripcion,
  icono: e.icono,
  destacada: Boolean(e.destacada),
})

const iniciales = (p) =>
  `${p.nombre[0] || ''}${p.apellidos[0] || ''}`.toUpperCase()

const aProfesional = (p) => ({
  id: p.slug,            // 'elena-martin'
  numero: p.id,          // id real en la base (1..18)
  nombre: `${p.titulo} ${p.nombre} ${p.apellidos}`,
  iniciales: iniciales(p),
})

// --- Llamadas ---
export async function obtenerEspecialidades() {
  const lista = await pedir('/api/especialidades')
  return lista.map(aEspecialidad)
}

export async function obtenerProfesionales(especialidadDbId) {
  const lista = await pedir(`/api/profesionales?especialidadId=${especialidadDbId}`)
  return lista.map(aProfesional)
}

// Devuelve [{ hora: '09:00', disponible: true }, ...]
export const obtenerHorarios = (profesionalDbId, fecha) =>
  pedir(`/api/horarios?profesionalId=${profesionalDbId}&fecha=${fecha}`)

// datos = el estado de la reserva (DATOS_INICIALES ya completado)
export const crearCita = (datos, especialidadDbId, profesionalDbId) =>
  pedir('/api/citas', {
    method: 'POST',
    body: JSON.stringify({
      especialidad_id: especialidadDbId,
      profesional_id: profesionalDbId,
      tipo_consulta: datos.tipoConsulta,
      fecha: datos.fecha,
      hora: datos.hora,
      paciente: {
        nombre: datos.paciente.nombre,
        apellidos: datos.paciente.apellidos,
        documento: datos.paciente.documento,
        fecha_nacimiento: datos.paciente.fechaNacimiento,
        telefono: datos.paciente.telefono,
        correo: datos.paciente.correo,
      },
    }),
  })

export const obtenerCita = (localizador, correo) =>
  pedir(`/api/citas/${localizador}?correo=${encodeURIComponent(correo)}`)

export const cancelarCita = (localizador, correo) =>
  pedir(`/api/citas/${localizador}/cancelar`, {
    method: 'PATCH',
    body: JSON.stringify({ correo }),
  })

export const reprogramarCita = (localizador, correo, fecha, hora) =>
  pedir(`/api/citas/${localizador}/reprogramar`, {
    method: 'PATCH',
    body: JSON.stringify({ correo, fecha, hora }),
  })