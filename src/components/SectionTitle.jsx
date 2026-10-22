export default function SectionTitle({
  eyebrow,
  title,
  description,
  link,
  href = '#especialidades',
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {link && (
        <a className="arrow-link" href={href}>
          {link} <span>→</span>
        </a>
      )}
    </div>
  )
}
