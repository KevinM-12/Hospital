import Encabezado from '../../components/estructura/Encabezado/Encabezado'
import PiePagina from '../../components/estructura/PiePagina/PiePagina'
import Portada from '../../components/inicio/Portada/Portada'
import Especialidades from '../../components/inicio/Especialidades/Especialidades'
import Visita from '../../components/inicio/Visita/Visita'
import Urgencias from '../../components/inicio/Urgencias/Urgencias'
import Ayuda from '../../components/inicio/Ayuda/Ayuda'

// Página de inicio: junta todas las secciones
export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main>
        <Portada />
        <Especialidades />
        <Visita />
        <Urgencias />
        <Ayuda />
      </main>
      <PiePagina />
    </>
  )
}
