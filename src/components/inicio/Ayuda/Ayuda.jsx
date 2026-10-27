import imagenFachada from '../../../assets/imagenes/fachada-hospital.svg'
import './Ayuda.css'

export default function Ayuda() {
  return (
    <section className="ayuda contenedor-seccion" id="profesionales">
      <div className="ayuda-texto">
        <p className="sobretitulo">ESTAMOS PARA AYUDARTE</p>
        <h2>Un poco de ayuda también es cuidar.</h2>
        <p>
          Si necesitas orientación o tienes preguntas antes de tu visita, nuestro equipo
          está aquí para acompañarte.
        </p>
        <a className="boton boton-borde" href="mailto:contacto@sanasana.example">
          Contactar con el hospital <span>↗</span>
        </a>
      </div>
      <div className="ayuda-contactos">
        <a href="tel:900000000">
          <span>⌕</span>
          <div>
            <strong>Atención al paciente</strong>
            <b>900 000 000</b>
            <small>Lunes a viernes · 9:00 h – 18:00 h</small>
          </div>
        </a>
        <a href="mailto:contacto@sanasana.example">
          <span>✉</span>
          <div>
            <strong>Escríbenos</strong>
            <small>contacto@sanasana.example</small>
            <small>Te responderemos lo antes posible.</small>
          </div>
        </a>
      </div>
      <a className="ayuda-ubicacion" href="#hospital">
        <img src={imagenFachada} alt="Fachada del hospital Sana Sana" />
        <strong>Av. del Olivo, 24 · Ciudad de ejemplo</strong>
        <small>
          Cómo llegar y horarios <span>↗</span>
        </small>
      </a>
    </section>
  )
}
