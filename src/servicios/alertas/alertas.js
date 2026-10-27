// Alertas con SweetAlert2, con el estilo de la página (ver alertas.css).
import Swal from 'sweetalert2'
import './alertas.css'

// Clases CSS de las ventanas. Los botones usan las clases .boton del index.css
function clasesVentana(peligro) {
  return {
    popup: 'alerta',
    title: 'alerta-titulo',
    htmlContainer: 'alerta-texto',
    actions: 'alerta-acciones',
    confirmButton: peligro ? 'boton boton-peligro' : 'boton boton-oscuro',
    cancelButton: 'boton boton-borde',
  }
}

// Aviso pequeño en una esquina. icono: 'success' | 'error' | 'warning' | 'info'
export function mostrarAviso(icono, titulo) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    icon: icono,
    title: titulo,
    customClass: { popup: 'aviso-flotante', title: 'aviso-flotante-titulo' },
  })
}

// Ventana con un solo botón
export function mostrarAlerta({ icono, titulo, texto, textoBoton = 'Entendido' }) {
  return Swal.fire({
    buttonsStyling: false,
    icon: icono,
    title: titulo,
    text: texto,
    confirmButtonText: textoBoton,
    customClass: clasesVentana(false),
  })
}

// Ventana de confirmación. Devuelve true si la persona acepta y false si no.
export async function confirmar({
  titulo,
  texto,
  textoConfirmar = 'Sí, continuar',
  textoCancelar = 'Cancelar',
  peligro = false,
}) {
  const respuesta = await Swal.fire({
    buttonsStyling: false,
    reverseButtons: true,
    icon: peligro ? 'warning' : 'question',
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: textoConfirmar,
    cancelButtonText: textoCancelar,
    customClass: clasesVentana(peligro),
  })
  return respuesta.isConfirmed
}

// Ventana de "cargando" mientras se envía algo. Se cierra con cerrarAlerta().
export function mostrarCargando(titulo, texto) {
  return Swal.fire({
    buttonsStyling: false,
    title: titulo,
    text: texto,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    customClass: clasesVentana(false),
    didOpen: () => Swal.showLoading(),
  })
}

export function cerrarAlerta() {
  Swal.close()
}
