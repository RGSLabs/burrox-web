/**
 * config.js — Datos comerciales editables de BURROX
 * -------------------------------------------------
 * Modifica únicamente los valores de este archivo para actualizar
 * los datos del negocio en toda la web. No es necesario tocar
 * index.html ni styles.css.
 *
 * Estados de validación válidos:
 *   "verified"    → confirmado por el negocio.
 *   "historical"  → recuperado de información antigua (no confirmado).
 *   "unverified"  → pendiente de confirmar.
 */

var BURROX_CONFIG = {
  business: {
    name: "BURROX",
    tagline: "El antojo tiene nombre.",
    description:
      "BURROX es un negocio de comida ubicado en Plaza La Cima, Veracruz. Descubre su propuesta y consulta su menú.",
  },

  // Dirección histórica — PENDIENTE DE CONFIRMACIÓN por BURROX.
  address: {
    label: "Plaza La Cima, Av. Cordillera 27, local 17, La Pradera, Veracruz, México.",
    status: "historical",
  },

  // Teléfono histórico — PENDIENTE DE CONFIRMACIÓN por BURROX.
  phone: {
    label: "228 824 1233",
    status: "historical",
  },

  // Horarios: NO publicar hasta confirmarlos. Dejar en null.
  hours: {
    label: null,
    status: "unverified",
  },

  logo: "img/logo/burrox-logo.png",

  // Mapa: la búsqueda que hará Google Maps. Ajustar cuando se confirme
  // la ubicación exacta. No requiere clave API (uso de iframe de salida).
  map: {
    query: "Plaza La Cima, Av. Cordillera 27, La Pradera, Veracruz, México",
    status: "historical",
    link: "https://www.google.com/maps/search/?api=1&query=Plaza+La+Cima+Av.+Cordillera+27+La+Pradera+Veracruz+M%C3%A9xico",
  },

  // WhatsApp: número oficial NO confirmado. Mantener null y enabled: false
  // hasta que BURROX autorice el canal. NUNCA inventar un número.
  whatsapp: {
    number: null, // ejemplo: "5212280000000" (código de país + número)
    enabled: false,
    status: "unverified",
  },

  // Precios mínimos históricos POR CATEGORÍA (referencia antigua, no confirmada).
  categoryPriceFrom: {
    burritos: 75,
    ensaladas: 60,
    quesadillas: 55,
    empanadas: 30,
  },

  developer: "RGS Labs Web Experiences",
};
