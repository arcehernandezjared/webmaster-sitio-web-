# Plantilla de cotización por correo

## Archivos

- `cotizacion.html` — la plantilla real, con marcadores `{{así}}` para completar antes de enviar.
- `cotizacion-ejemplo.html` — la misma plantilla ya rellena con datos de ejemplo, para abrir en el navegador y ver cómo se ve.
- `assets/logo-email.png` — el logo usado en el ejemplo (solo para la vista previa local).

## Antes de enviar una cotización real

1. Abrí `cotizacion.html` en un editor de texto y reemplazá cada `{{marcador}}` por el dato real: `{{cliente}}`, `{{negocio}}`, `{{numero_cotizacion}}`, `{{fecha}}`, `{{validez}}`, `{{item_1_nombre}}`, `{{item_1_descripcion}}`, `{{item_1_precio}}` (y lo mismo para `item_2` / `item_3`), `{{subtotal}}`, `{{descuento}}`, `{{total}}` y `{{item_extra_incluido}}`.
   - Si necesitás más de 3 líneas, copiá y pegá el bloque `<!-- Ítem 1 -->` completo y cambiá el número.
   - Si no aplica descuento, borrá esa fila entera (`<!-- Descuento -->`).
2. **Reemplazá la imagen del logo.** El archivo apunta a `https://TU-DOMINIO.com/logo-lockup.png` porque los correos no pueden cargar imágenes desde tu computadora — necesitan una URL pública. Cuando el sitio esté publicado, subí `logo-lockup.png` (ya está en `public/` del proyecto) y usá esa URL real. Mientras tanto podés subir el logo a cualquier hosting de imágenes público y pegar esa URL ahí.
3. Copiá todo el HTML y pegalo en el editor de "correo en HTML" de tu proveedor (Gmail con una extensión, Outlook, Mailchimp, Brevo, Resend, etc.), o usalo como plantilla en un script de envío.

## Por qué está armado así

Los correos no soportan CSS moderno (nada de flexbox ni grid): todo el diseño usa tablas y estilos en línea (`style="..."`) porque es lo único que Gmail, Outlook y el resto interpretan de forma confiable. No lo conviertas a divs/flexbox o se rompe en varios clientes de correo.

El botón "Confirmar por WhatsApp" abre un chat con el número de cotización ya escrito. Si cambiás el número de WhatsApp del negocio, actualizá el `href="https://wa.me/..."` en ambos archivos.
