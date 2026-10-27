import './CampoFormulario.css'

// Campo de formulario: etiqueta + cuadro de texto + mensaje de error.
// "resto" son los demás atributos del input (type, value, onChange, etc.)
export default function CampoFormulario({ id, etiqueta, error, ...resto }) {
  return (
    <div className={error ? 'campo con-error' : 'campo'}>
      <label htmlFor={id}>{etiqueta}</label>
      <input id={id} aria-invalid={Boolean(error)} {...resto} />
      {error && <span className="campo-error">{error}</span>}
    </div>
  )
}
