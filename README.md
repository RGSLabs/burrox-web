# BURROX — Demo comercial independiente

Propuesta de web de presentación y catálogo para **BURROX**, negocio de comida
ubicado en Plaza La Cima, Veracruz, México.

> ⚠️ **Aviso importante:** esta es una **demostración conceptual independiente**
> desarrollada por RGS Labs Web Experiences. **No es un sitio oficial de BURROX**
> ni representa una contratación o aprobación por parte del negocio.
> Los precios, dirección y teléfono son datos **históricos pendientes de
> confirmación** y deben validarse antes de cualquier uso comercial.

---

## 1. Estructura del proyecto

```
burrox-web/
├── index.html              → Estructura semántica de la página
├── README.md               → Este archivo
├── css/
│   └── styles.css          → Identidad visual, responsive, animaciones
├── js/
│   ├── app.js              → Lógica: menú, filtros, carrito, mapa
│   ├── products.js         → Catálogo editable de productos
│   └── config.js           → Datos comerciales editables
└── img/
    ├── logo/               → Logotipo oficial BURROX
    ├── food/               → Fotografías ilustrativas de comida
    ├── illustrations/      → Ilustraciones SVG originales (burritos)
    └── backgrounds/        → Fotografías del local (fachada, interior, camioneta)
```

Tecnología: HTML5, CSS3 y JavaScript vanilla. Sin frameworks, sin backend,
sin dependencias. Funciona como archivos estáticos.

## 2. Cómo abrir la demo localmente

Opción rápida: haz doble clic en `index.html`.

Opción recomendada (servidor local):

```bash
cd burrox-web
python3 -m http.server 8080
# abre http://localhost:8080
```

El mapa de Google Maps y las fuentes de Google requieren conexión a internet.
Todo lo demás funciona sin conexión.

## 3. Cómo cambiar el menú y los precios

Edita **únicamente** `js/products.js`:

- **Agregar un producto:** copia un bloque `{ ... },` y cambia sus valores.
- **Precio confirmado:** pon `price: 85, priceType: "unit", priceStatus: "verified"`.
- **Precio sin confirmar:** deja `price: null, priceType: "unknown"` y el sistema
  mostrará la referencia histórica (`priceFrom`) sin calcular subtotal falso.
- **Ocultar un producto:** cambia `available: false` (el render lo respeta).

Campos: `id`, `name`, `category` (`burritos`, `ensaladas`, `quesadillas`,
`empanadas`), `description`, `price`, `priceType`, `priceStatus`
(`verified` / `historical` / `unverified`), `priceFrom`, `available`,
`image`, `imageType`.

Las categorías del filtro viven en `BURROX_CATEGORIES` (mismo archivo).

## 4. Cómo reemplazar imágenes y logotipo

- **Logotipo:** sustituye `img/logo/burrox-logo.png` manteniendo el nombre,
  o cambia la ruta en `js/config.js` (`logo:`).
- **Fotos de producto:** guarda tu archivo en `img/food/` y actualiza el campo
  `image` del producto en `js/products.js`.
- **Fotos del local:** reemplaza los archivos en `img/backgrounds/`.
- **Ilustraciones:** los SVG de `img/illustrations/` son originales de la demo;
  puedes sustituirlos por otros con el mismo nombre.

Recomendación: imágenes de ~900px de ancho, JPG optimizado (calidad ~80).

## 5. Cómo modificar los datos comerciales

Todo está centralizado en **`js/config.js`**:

| Dato                | Dónde editarlo                        |
| ------------------- | ------------------------------------- |
| Nombre / descripción| `business`                            |
| Dirección           | `address.label`                       |
| Teléfono            | `phone.label`                         |
| Horarios            | `hours.label` (en `null` hasta confirmar) |
| Mapa                | `map.query` y `map.link`              |
| WhatsApp            | `whatsapp.number` y `whatsapp.enabled`|
| Precios mínimos históricos | `categoryPriceFrom`            |

Cambia `status` a `"verified"` cuando BURROX confirme un dato: las etiquetas
"pendiente de confirmar" se actualizan automáticamente.

## 6. Cómo configurar el mapa

El mapa usa el iframe de salida público de Google Maps (sin clave API):

1. Confirma la dirección exacta con el negocio.
2. En `js/config.js`, edita `map.query` con la dirección confirmada.
3. Actualiza `map.link` con la URL de búsqueda de Google Maps.

Mientras `map.status` sea `"historical"`, la ubicación se presenta como
referencia no confirmada.

## 7. Cómo confirmar y habilitar el canal de WhatsApp

1. Obtén del negocio el **número oficial** de WhatsApp (con código de país,
   solo dígitos, p. ej. `5212280000000`) y su autorización por escrito.
2. En `js/config.js`:
   ```js
   whatsapp: { number: "5212280000000", enabled: true, status: "verified" }
   ```
3. El botón del carrito pasará a «PREPARAR PEDIDO POR WHATSAPP» y abrirá el
   mensaje en una pestaña nueva para que el usuario lo revise. **Nunca se
   envía nada automáticamente.**

## 8. Cómo desplegar en GitHub Pages

1. Crea un repositorio en GitHub (público).
2. Sube el contenido de la carpeta `burrox-web/` (la raíz del repo debe
   contener `index.html`).
3. En **Settings → Pages**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda y espera unos minutos: tu sitio estará en
   `https://<usuario>.github.io/<repositorio>/`.

Las rutas son relativas, por lo que funciona tanto en la raíz como en
subdirectorios de GitHub Pages.

## 9. Datos pendientes de validación

- [ ] Precios unitarios de cada producto (solo existen referencias históricas
      "desde $XX" por categoría).
- [ ] Dirección exacta y número de local.
- [ ] Teléfono actualizado.
- [ ] Horarios de atención.
- [ ] Número oficial de WhatsApp y autorización de uso.
- [ ] Disponibilidad real de productos del menú.
- [ ] Ubicación exacta para el mapa.
- [ ] Autorización del negocio para usar su marca, logotipo y fotografías.

## 10. Pasos para convertir la demo en una web comercial real

1. Validar con BURROX todos los datos de la sección 9.
2. Confirmar precios unitarios y actualizar `products.js` con `priceType: "unit"`.
3. Sustituir fotografías ilustrativas por fotos reales de los platillos.
4. Obtener autorización escrita de uso de marca e imagen.
5. Habilitar WhatsApp (sección 7) u otro canal de pedido acordado.
6. Agregar aviso de privacidad y términos elaborados por un profesional.
7. Revisar consideraciones de privacidad (sección siguiente).
8. Registrar dominio propio y desplegar (GitHub Pages, Netlify, etc.).

---

## Privacidad y tecnologías externas

Esta demo **no utiliza cookies, analítica ni rastreadores**, por lo que no
muestra ningún banner de consentimiento. Antes de una publicación comercial:

- **Google Fonts** (fonts.googleapis.com): al cargar las fuentes, Google puede
  recibir la IP del visitante. Considera autoalojar las fuentes o usar solo
  fuentes del sistema si se requiere máxima privacidad.
- **Google Maps (iframe)**: incrustar el mapa implica que Google carga recursos
  en la página y puede recoger datos del visitante según sus políticas.
- **localStorage**: el carrito demostrativo se guarda localmente en el
  navegador para mejorar la experiencia. No contiene datos personales y puede
  borrarse en cualquier momento.
- **WhatsApp (wa.me)**: solo se usa si se habilita el canal, y el mensaje se
  abre en una pestaña nueva para revisión del usuario.

---

Demo desarrollada por **RGS Labs Web Experiences** · HTML5 + CSS3 + JS vanilla.
