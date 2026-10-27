import './Urgencias.css'

export default function Urgencias() {
  return (
    <section className="urgencias">
      <span className="urgencias-icono">✚</span>
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
