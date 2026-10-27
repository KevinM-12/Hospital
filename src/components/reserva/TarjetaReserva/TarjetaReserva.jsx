import './TarjetaReserva.css'

// Tarjeta blanca donde se muestra el contenido de cada paso
export default function TarjetaReserva({ claseExtra = '', children }) {
  return <section className={`tarjeta-reserva ${claseExtra}`.trim()}>{children}</section>
}
