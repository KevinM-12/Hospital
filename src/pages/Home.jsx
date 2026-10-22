import Header from '../components/Header'
import Logo from '../components/Logo'
import SectionTitle from '../components/SectionTitle'
import AppointmentCard from '../components/AppointmentCard'
const specialties = [
  ['✚', 'Medicina general', 'Tu punto de atención y orientación.'],
  ['♧', 'Pediatría', 'Atención y seguimiento cercano a tus hijos.'],
  ['⚕', 'Ginecología', 'Cuidamos de la salud de la mujer.'],
  ['♡', 'Cardiología', 'Cuidamos de la salud de tu corazón.'],
  ['⌁', 'Traumatología', 'Te ayudamos a recuperar tu movimiento.'],
  ['✣', 'Dermatología', 'Cuidamos de la salud de tu piel.'],
]
const steps = [
  [
    '01',
    'Encuentra tu consulta',
    'Busca una especialidad y elige profesional, día y hora entre las opciones disponibles.',
  ],
  [
    '02',
    'Revisa y confirma',
    'Comprueba los datos de tu consulta, completa la información y confirma tu cita.',
  ],
  [
    '03',
    'Ten tu cita a mano',
    'Guarda la confirmación, recibe las indicaciones y ven preparado para tu consulta.',
  ],
]
function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">CUIDAMOS DE TI, EN CADA PASO</p>
        <h1>
          Tu salud merece
          <br />
          tiempo. Tu cita,
          <br />
          menos espera.
        </h1>
        <p className="hero-description">
          Encuentra tu especialidad, elige profesional y consulta tus horarios. Te
          acompañamos en cada paso.
        </p>
        <div className="hero-buttons">
          <a className="button button-dark" href="#visita">
            Reservar una cita <span>↗</span>
          </a>
          <a className="button button-outline" href="#especialidades">
            Especialidades más <span>→</span>
          </a>
        </div>
        <p className="hero-footnote">♡ Atención cercana y pensada para ti.</p>
      </div>
      <div className="hero-visual">
        <img
          src="./src/assets/img-home.jpg"
          alt="Doctora atendiendo a una paciente en consulta"
        />
        <div className="image-caption">
          <span className="caption-icon">♡</span>
          <span>
            <strong>Personas que cuidan de personas.</strong>
            <small>Tu bienestar es nuestro compromiso.</small>
          </span>
        </div>
      </div>
    </section>
  )
}
function Specialties() {
  return (
    <section className="specialties section-wrap" id="especialidades">
      <SectionTitle
        eyebrow="ESPECIALIDADES PARA CADA NECESIDAD"
        title="Un lugar para cada cuidado"
        description="Explora nuestras especialidades y elige con quién quieres dar el siguiente paso."
        link="Ver todas las especialidades"
      />
      <div className="specialty-grid">
        {specialties.map(([icon, title, desc]) => (
          <a className="specialty-card" href="#visita" key={title}>
            <span className="specialty-icon">{icon}</span>
            <span className="specialty-text">
              <strong>{title}</strong>
              <small>{desc}</small>
            </span>
            <span className="card-arrow">↗</span>
          </a>
        ))}
      </div>
      <div className="specialty-bottom">
        <span>También te puede interesar</span>
        <a href="#especialidades">
          Análisis clínicos <b>→</b>
        </a>
        <a href="#especialidades">
          Diagnóstico por imagen <b>→</b>
        </a>
        <a href="#especialidades">
          Rehabilitación <b>→</b>
        </a>
      </div>
    </section>
  )
}
function Visit() {
  return (
    <section className="visit-section section-wrap" id="visita">
      <SectionTitle
        eyebrow="HAZLO FÁCIL, HAZLO A TU TIEMPO"
        title="Menos trámites. Más tranquilidad."
        description="Todo lo importante para tu visita, en un solo lugar."
      />
      <div className="steps-grid">
        {steps.map(([n, title, desc]) => (
          <article className="step" key={n}>
            <span className="step-number">{n}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <div className="visit-cards">
        <div className="prep-card">
          <p className="eyebrow">ANTES DE VENIR</p>
          <h3>Ven con todo lo que necesitas</h3>
          <p>
            Te preparamos lo esencial para que tu visita sea sencilla y sin
            preocupaciones.
          </p>
          <ul>
            <li>
              <span>✓</span>
              <div>
                <strong>Tu documentación</strong>
                <small>
                  Identificación y tarjeta sanitaria o de tu aseguradora, si corresponde.
                </small>
              </div>
            </li>
            <li>
              <span>✓</span>
              <div>
                <strong>La información de tu consulta</strong>
                <small>Confirma el día, la hora y las instrucciones previas.</small>
              </div>
            </li>
            <li>
              <span>✓</span>
              <div>
                <strong>Los indicaciones específicas</strong>
                <small>
                  Prepara cualquier prueba o información que te hayan solicitado.
                </small>
              </div>
            </li>
          </ul>
          <a className="arrow-link" href="#visita">
            ¿Es tu primera visita? <span>→</span>
          </a>
        </div>
        <AppointmentCard />
      </div>
    </section>
  )
}
function Emergency() {
  return (
    <section className="emergency">
      <span className="emergency-icon">✚</span>
      <div>
        <strong>¿Se trata de una urgencia?</strong>
        <p>
          Si necesitas atención médica inmediata, llama al servicio de emergencias de tu
          zona.
        </p>
      </div>
      <a href="tel:106">
        Qué hacer <span>→</span>
      </a>
    </section>
  )
}
function Help() {
  return (
    <section className="help-section section-wrap" id="profesionales">
      <div className="help-copy">
        <p className="eyebrow">ESTAMOS PARA AYUDARTE</p>
        <h2>Un poco de ayuda también es cuidar.</h2>
        <p>
          Si necesitas orientación o tienes preguntas antes de tu visita, nuestro equipo
          está aquí para acompañarte.
        </p>
        <a className="button button-outline" href="mailto:contacto@sanasana.example">
          Contactar con el hospital <span>↗</span>
        </a>
      </div>
      <div className="contact-list">
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
      <a className="location-card" href="#hospital">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
          alt="Exterior de un centro de salud"
        />
        <strong>Av. del Olivo, 24 · Ciudad de ejemplo</strong>
        <small>
          Cómo llegar y horarios <span>↗</span>
        </small>
      </a>
    </section>
  )
}
function Footer() {
  return (
    <footer className="footer" id="hospital">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo light />
          <p>Cuidamos, escuchamos y te acompañamos en cada etapa.</p>
        </div>
        <div>
          <strong>Tu atención</strong>
          <a href="#especialidades">Mi cita</a>
          <a href="#especialidades">Mis visitas</a>
          <a href="#especialidades">Especialidades</a>
        </div>
        <div>
          <strong>Tu visita</strong>
          <a href="#visita">Prepara tu consulta</a>
          <a href="#visita">Guía y horarios</a>
          <a href="#visita">Preguntas frecuentes</a>
        </div>
        <div>
          <strong>El hospital</strong>
          <a href="#hospital">Conócenos</a>
          <a href="#profesionales">Atención al paciente</a>
          <a href="#hospital">Contacto</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Sana Sana. Todos los derechos reservados.</span>
        <div>
          <a href="#hospital">Privacidad</a>
          <a href="#hospital">Aviso legal</a>
          <a href="#hospital">Cookies</a>
          <a href="#hospital">Accesibilidad</a>
        </div>
      </div>
    </footer>
  )
}
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Specialties />
        <Visit />
        <Emergency />
        <Help />
      </main>
      <Footer />
    </>
  )
}
