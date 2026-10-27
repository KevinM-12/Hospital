// Datos de ejemplo de la reserva de citas (nada se guarda ni se envía a un servidor).

export const NOMBRE_CLINICA = 'Sana Sana'

// Nombres de los 5 pasos de la reserva
export const PASOS = [
  'Especialidad',
  'Profesional y horario',
  'Tus datos',
  'Revisión',
  'Confirmación',
]

export const ESPECIALIDADES = [
  {
    id: 'medicina-general',
    nombre: 'Medicina general',
    descripcion: 'Atención y orientación integral',
    icono: 'estetoscopio',
  },
  {
    id: 'pediatria',
    nombre: 'Pediatría',
    descripcion: 'Cuidado en cada etapa infantil',
    icono: 'bebe',
  },
  {
    id: 'ginecologia',
    nombre: 'Ginecología',
    descripcion: 'Salud y cuidado de la mujer',
    icono: 'flor',
  },
  {
    id: 'cardiologia',
    nombre: 'Cardiología',
    descripcion: 'Atención para tu corazón',
    icono: 'corazon-pulso',
  },
  {
    id: 'traumatologia',
    nombre: 'Traumatología',
    descripcion: 'Huesos y articulaciones',
    icono: 'hueso',
  },
  {
    id: 'dermatologia',
    nombre: 'Dermatología',
    descripcion: 'Cuidado de tu piel',
    icono: 'mano',
  },
]

// Se muestran al pulsar "Ver todas las especialidades"
export const ESPECIALIDADES_EXTRA = [
  {
    id: 'oftalmologia',
    nombre: 'Oftalmología',
    descripcion: 'Salud de tus ojos',
    icono: 'ojo',
  },
  {
    id: 'neurologia',
    nombre: 'Neurología',
    descripcion: 'Cerebro y sistema nervioso',
    icono: 'cerebro',
  },
  {
    id: 'urologia',
    nombre: 'Urología',
    descripcion: 'Salud del aparato urinario',
    icono: 'gota',
  },
]

export const TIPOS_CONSULTA = [
  { id: 'primera', nombre: 'Primera consulta' },
  { id: 'seguimiento', nombre: 'Consulta de seguimiento' },
]

// Dos profesionales por especialidad. El "numero" se usa para generar los horarios de ejemplo.
export const PROFESIONALES = {
  'medicina-general': [
    { id: 'elena-martin', nombre: 'Dra. Elena Martín', iniciales: 'EM', numero: 1 },
    { id: 'pablo-ruiz', nombre: 'Dr. Pablo Ruiz', iniciales: 'PR', numero: 2 },
  ],
  pediatria: [
    { id: 'lucia-herrera', nombre: 'Dra. Lucía Herrera', iniciales: 'LH', numero: 3 },
    { id: 'andres-salas', nombre: 'Dr. Andrés Salas', iniciales: 'AS', numero: 4 },
  ],
  ginecologia: [
    { id: 'carmen-vidal', nombre: 'Dra. Carmen Vidal', iniciales: 'CV', numero: 5 },
    { id: 'marta-ortega', nombre: 'Dra. Marta Ortega', iniciales: 'MO', numero: 6 },
  ],
  cardiologia: [
    { id: 'javier-roldan', nombre: 'Dr. Javier Roldán', iniciales: 'JR', numero: 7 },
    { id: 'sofia-navarro', nombre: 'Dra. Sofía Navarro', iniciales: 'SN', numero: 8 },
  ],
  traumatologia: [
    { id: 'diego-castillo', nombre: 'Dr. Diego Castillo', iniciales: 'DC', numero: 9 },
    { id: 'laura-prieto', nombre: 'Dra. Laura Prieto', iniciales: 'LP', numero: 10 },
  ],
  dermatologia: [
    { id: 'irene-campos', nombre: 'Dra. Irene Campos', iniciales: 'IC', numero: 11 },
    { id: 'hugo-beltran', nombre: 'Dr. Hugo Beltrán', iniciales: 'HB', numero: 12 },
  ],
  oftalmologia: [
    { id: 'natalia-rivas', nombre: 'Dra. Natalia Rivas', iniciales: 'NR', numero: 13 },
    { id: 'marcos-pena', nombre: 'Dr. Marcos Peña', iniciales: 'MP', numero: 14 },
  ],
  neurologia: [
    { id: 'alvaro-quintana', nombre: 'Dr. Álvaro Quintana', iniciales: 'AQ', numero: 15 },
    { id: 'paula-serrano', nombre: 'Dra. Paula Serrano', iniciales: 'PS', numero: 16 },
  ],
  urologia: [
    { id: 'raul-medina', nombre: 'Dr. Raúl Medina', iniciales: 'RM', numero: 17 },
    { id: 'tomas-aguirre', nombre: 'Dr. Tomás Aguirre', iniciales: 'TA', numero: 18 },
  ],
}

// Horas que se pueden elegir cada día
export const HORAS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']

export const LUGAR = {
  sala: 'Edificio A · Planta baja',
  salaCorta: 'Edificio A, planta baja',
  calle: 'Av. del Olivo, 24',
  ciudad: 'Ciudad de ejemplo',
  direccion: 'Sana Sana · Av. del Olivo, 24 · Ciudad de ejemplo',
}

// Funciones para buscar un dato por su id
export function buscarEspecialidad(id) {
  return [...ESPECIALIDADES, ...ESPECIALIDADES_EXTRA].find(
    (especialidad) => especialidad.id === id,
  )
}

export function buscarProfesional(especialidadId, profesionalId) {
  const lista = PROFESIONALES[especialidadId] || []
  return lista.find((profesional) => profesional.id === profesionalId)
}

export function buscarTipoConsulta(id) {
  return TIPOS_CONSULTA.find((tipo) => tipo.id === id)
}

// Lo que se va completando durante la reserva
export const DATOS_INICIALES = {
  especialidadId: 'medicina-general',
  tipoConsulta: 'primera',
  profesionalId: null,
  fecha: null, // formato AAAA-MM-DD
  hora: null,
  paciente: {
    nombre: '',
    apellidos: '',
    fechaNacimiento: '', // formato AAAA-MM-DD
    documento: '',
    telefono: '',
    correo: '',
  },
  privacidadAceptada: false,
  localizador: null,
}
