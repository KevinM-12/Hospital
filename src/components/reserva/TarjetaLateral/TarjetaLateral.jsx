import './TarjetaLateral.css'

// Tarjeta base de la columna de la derecha
export default function TarjetaLateral({ claseExtra = '', children }) {
  return <div className={`tarjeta-lateral ${claseExtra}`.trim()}>{children}</div>
}
