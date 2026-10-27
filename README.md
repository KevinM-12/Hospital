# Sana Sana · Reserva de citas (React + Vite)

Sitio de un hospital con página de inicio, reserva de cita en 5 pasos y una página
"Mis citas". Usa **SweetAlert2** para las alertas y **EmailJS** para enviar correos.

## Cómo ejecutarlo

```bash
npm install
copy .env.example .env      # en Mac/Linux: cp .env.example .env
npm run dev
```

Otros comandos: `npm run build` (versión final) y `npm run lint` (revisar el código).

## Estructura del proyecto

Cada componente tiene **su propia carpeta** con el `.jsx` y el `.css` con el mismo nombre.

```
src/
├── main.jsx, App.jsx            Arranque de la página y rutas
├── index.css                    Estilos globales: colores, botones (.boton) y utilidades
├── assets/                      TODAS las imágenes y SVG
│   ├── imagenes/                Fotos, ilustraciones y favicon
│   └── iconos/                  Iconos pequeños en .svg
├── configuracion/emailjs.js     Lee las claves de EmailJS del archivo .env
├── datos/datosReserva.js        Especialidades, profesionales, horas y dirección
├── utilidades/                  fechas.js (calendario y horarios) y resumenCita.js
├── servicios/
│   ├── alertas/                 alertas.js + alertas.css (SweetAlert2)
│   ├── servicioCorreo.js        Envío de correos (EmailJS)
│   ├── citasGuardadas.js        Guarda las citas en el navegador
│   └── descargas.js             Archivo de calendario (.ics) y comprobante (.txt)
├── components/
│   ├── estructura/              Encabezado, PiePagina, Logo, MarcoPagina, ControlScroll
│   ├── comunes/                 Piezas que se repiten: Icono, CampoFormulario, CuadroInfo...
│   ├── inicio/                  Secciones del inicio: Portada, Especialidades, Visita...
│   ├── reserva/                 Los 5 pasos (PasoEspecialidad, PasoProfesional, PasoDatos,
│   │                            PasoRevision, PasoConfirmacion) y las tarjetas laterales
│   └── citas/                   ItemCita (cada cita de "Mis citas")
└── pages/
    ├── Inicio/                  Página de inicio  ( / )
    ├── Reserva/                 Reserva de cita   ( /solicitar-cita )
    └── MisCitas/                Mis citas         ( /mis-citas )

documentos/plantilla-emailjs.html   Diseño del correo (se pega una vez en EmailJS)
```

Para crear un componente nuevo: una carpeta con `Nombre.jsx` y `Nombre.css`, y en el
`.jsx` la línea `import './Nombre.css'`.

## Imágenes y SVG (carpeta assets)

- Las fotos e ilustraciones están en `src/assets/imagenes/` y se usan así:
  `import fachada from '../../../assets/imagenes/fachada-hospital.svg'` y luego `<img src={fachada} />`.
- Los iconos son archivos `.svg` en `src/assets/iconos/`. Se muestran con el componente `Icono`:
  `<Icono nombre="calendario-dias" tamano={20} />`. Toman el color del texto que los rodea.
- Para agregar un icono nuevo: copia el `.svg` a `assets/iconos/`, impórtalo en
  `components/comunes/Icono/Icono.jsx` y agrégalo a la lista `ICONOS`.

## SweetAlert2

No necesita configuración. Las funciones están en `src/servicios/alertas/alertas.js`:

```js
import { mostrarAviso, mostrarAlerta, confirmar } from '../../servicios/alertas/alertas'

mostrarAviso('success', 'Archivo descargado.')                  // aviso pequeño en la esquina
mostrarAlerta({ icono: 'warning', titulo: 'Falta un paso', texto: '...' })
const acepto = await confirmar({ titulo: '¿Cancelar?', peligro: true })   // true o false
```

Los colores de las ventanas están en `alertas.css`.

## EmailJS

Se envía un correo al confirmar, cambiar o cancelar una cita. **Si no configuras EmailJS la
página funciona igual**: la cita se guarda y solo no se envía el correo.

1. Crea una cuenta en <https://www.emailjs.com>.
2. **Email Services → Add New Service** (por ejemplo Gmail) y copia el **Service ID**.
3. **Email Templates → Create New Template**:
   - Abre el editor de código (`</>`) y pega el contenido de `documentos/plantilla-emailjs.html`.
   - En los ajustes de la plantilla: **To Email** `{{correo}}`, **From Name** `{{clinica}}`,
     **Subject** `{{asunto}}`.
   - Copia el **Template ID**.
4. **Account → General** y copia tu **Public Key**.
5. Escribe los tres valores en el archivo `.env` (ese archivo no se sube a git):

   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```

6. Cierra y vuelve a ejecutar `npm run dev` (Vite solo lee `.env` al arrancar).

Variables que recibe la plantilla (se arman en `src/servicios/servicioCorreo.js`):

| Variable | Contenido |
| --- | --- |
| `correo`, `nombre` | Correo y nombre de la persona |
| `clinica`, `asunto` | Nombre del hospital y asunto del correo |
| `titulo_estado`, `texto_estado` | "Tu cita está confirmada / ha cambiado / ha sido cancelada" y su texto |
| `localizador` | Código de la cita, por ejemplo `SS-DEMO-2810` |
| `especialidad`, `tipo_consulta`, `profesional` | Datos de la consulta |
| `fecha_hora`, `lugar`, `direccion` | Fecha y hora, sala y dirección |

Nota: las claves de EmailJS quedan dentro del código que descarga el navegador (así
funciona EmailJS). En el panel de EmailJS conviene limitar los dominios permitidos y poner
un tope de envíos.

### Publicar en Vercel

Agrega las tres variables `VITE_EMAILJS_*` en **Settings → Environment Variables** y vuelve
a desplegar. El archivo `vercel.json` hace que `/solicitar-cita` y `/mis-citas` no den error
404 al recargar.

## Datos de las citas

Las citas se guardan en el navegador (`localStorage`, clave `citasSanaSana`), por eso
"Mis citas" solo muestra las que se hicieron desde ese mismo navegador. Todo es una
demostración: no hay servidor ni reservas reales.
