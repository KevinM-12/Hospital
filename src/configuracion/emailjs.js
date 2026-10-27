// Configuración de EmailJS. Las claves se leen del archivo .env (ver .env.example).

const idServicio = import.meta.env.VITE_EMAILJS_SERVICE_ID
const idPlantilla = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const clavePublica = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const configEmailjs = { idServicio, idPlantilla, clavePublica }

// Un valor está "completo" si existe y no es el texto de ejemplo ("tu_...")
function estaCompleto(valor) {
  return Boolean(valor) && !valor.startsWith('tu_')
}

// true si ya se escribieron las 3 claves en el archivo .env
export const correoConfigurado =
  estaCompleto(idServicio) && estaCompleto(idPlantilla) && estaCompleto(clavePublica)
