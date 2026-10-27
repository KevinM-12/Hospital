import TarjetaLateral from '../TarjetaLateral/TarjetaLateral'
import imagenConsulta from '../../../assets/imagenes/portada-inicio.jpg'
import './TarjetaTranquilidad.css'

// Paso 1: foto y mensaje tranquilizador
export default function TarjetaTranquilidad() {
  return (
    <TarjetaLateral claseExtra="tranquilidad-tarjeta">
      <img src={imagenConsulta} alt="Doctora conversando con una paciente" />
      <div className="tranquilidad-cuerpo">
        <h3>Tu primer paso, con tranquilidad</h3>
        <p>Si no sabes qué especialidad elegir, Medicina general puede orientarte.</p>
        <a href="tel:900000000">Hablar con Atención al paciente</a>
      </div>
    </TarjetaLateral>
  )
}
