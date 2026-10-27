import { Navigate, Route, Routes } from 'react-router-dom'
import ControlScroll from './components/estructura/ControlScroll/ControlScroll'
import Inicio from './pages/Inicio/Inicio'
import Reserva from './pages/Reserva/Reserva'
import MisCitas from './pages/MisCitas/MisCitas'

// Rutas de la página: cada dirección muestra una página distinta
export default function App() {
  return (
    <>
      <ControlScroll />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/solicitar-cita" element={<Reserva />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
