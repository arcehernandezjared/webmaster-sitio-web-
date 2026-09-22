# Web Master CR Systems — sitio en React + Vite

Export del sitio diseñado en Omelette. Todo el contenido (español e inglés) vive en `src/copy.js`.

## Correr en local

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto http://localhost:5173).

## Publicar

```bash
npm run build      # genera dist/
npm run preview    # revisa el build antes de subirlo
```

`dist/` es estático: se sube tal cual a Netlify, Vercel, Hostinger, cPanel o cualquier hosting.

## Imágenes

`public/brand-hero.png` es la imagen grande del encabezado (hoy el logo con el tagline). Reemplazala por una foto real del equipo o del software cuando la tengas — mismo nombre, mismo lugar.

Las capturas del portafolio viven en `public/work/`, una carpeta por proyecto con la imagen principal (`nombre.png`) y hasta tres capturas extra (`nombre-1.png`, `nombre-2.png`, `nombre-3.png`) que aparecen como miniaturas dentro del caso. Los proyectos y sus rutas de imagen se definen en `src/copy.js`, dentro de cada objeto de `cases` (campos `img` y `gallery`).

Si un archivo no existe, el espacio queda en azul sólido sin romper la página.

Los logos ya están incluidos: `logo.png` (favicon), `logo-mark.png` (barra superior), `logo-lockup.png` (pie).

## Estructura

```
index.html          metadatos, fuente Archivo, favicon
src/main.jsx        punto de entrada
src/App.jsx         todas las secciones (Navbar, Hero, Problems, Solutions,
                    Benefits, Process, Portfolio, CaseModal, Testimonials,
                    Faq, Contact, CtaBanner, Footer)
src/copy.js         textos ES/EN, servicios, proyectos, FAQ, testimonios
src/ds.css          sistema de diseño Modernist (tokens y componentes)
src/app.css         color azul #053B70, retícula de fondo, animaciones, reglas móviles
```

Cada sección de `App.jsx` es una función independiente — moverlas a `src/components/` es copiar y pegar.

## Cosas por ajustar

- Los testimonios son textos de muestra: confirmalos con cada cliente antes de publicar.
- El formulario abre WhatsApp con el mensaje armado. Si querés que llegue por correo, reemplazá `submit()` en `Contact` por un POST a Formspree, Web3Forms o tu backend.
- Número y correo están escritos en `App.jsx` (constante `WA` y los `mailto:`).
