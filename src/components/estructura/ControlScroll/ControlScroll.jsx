import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de página sube al inicio. Si la dirección trae un #ancla, baja hasta esa sección.
export default function ControlScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const seccion = document.getElementById(hash.slice(1))
      if (seccion) {
        seccion.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}
