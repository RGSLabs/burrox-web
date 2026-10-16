/**
 * products.js — Catálogo editable de BURROX
 * ------------------------------------------
 * Para modificar el menú solo hay que editar este archivo.
 *
 * Campos de cada producto:
 *   id          → identificador único (sin espacios).
 *   name        → nombre provisional del producto.
 *   category    → "burritos" | "ensaladas" | "quesadillas" | "empanadas".
 *   description → descripción documentada o "pendiente".
 *   price       → precio unitario en MXN. null = no confirmado (no se inventa).
 *   priceType   → "unit" (precio por pieza) | "unknown" (sin precio unitario).
 *   priceStatus → "verified" | "historical" | "unverified".
 *   priceFrom   → referencia histórica de precio mínimo de su categoría.
 *                  Solo informativa; NO es el precio del producto.
 *   available   → true/false.
 *   image       → ruta de la fotografía.
 *   imageType   → "illustrative" (foto ilustrativa, no es el platillo real).
 *
 * NOTA: los precios "desde $XX" son referencias históricas de categoría
 * recuperadas de contenido antiguo. No son precios confirmados.
 */

var BURROX_CATEGORIES = [
  { id: "todo", label: "Todo" },
  { id: "burritos", label: "Burritos" },
  { id: "ensaladas", label: "Ensaladas" },
  { id: "quesadillas", label: "Quesadillas" },
  { id: "empanadas", label: "Empanadas" },
];

var BURROX_PRODUCTS = [
  // ---- BURRITOS (referencia histórica: desde $75 MXN) ----
  {
    id: "burrito-brisket",
    name: "Burrito de brisket de res",
    category: "burritos",
    description: "Brisket de res mencionado históricamente como variante de burrito. Ingredientes y presentación pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 75,
    available: true,
    image: "img/food/burrito-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "burrito-porky",
    name: "Burrito porky belly",
    category: "burritos",
    description: "Porky belly de cerdo mencionado históricamente como variante de burrito. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 75,
    available: true,
    image: "img/food/burrito-2.jpg",
    imageType: "illustrative",
  },
  {
    id: "burrito-pollo",
    name: "Burrito de pollo empanizado",
    category: "burritos",
    description: "Pollo empanizado mencionado históricamente como variante de burrito. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 75,
    available: true,
    image: "img/food/burrito-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "burrito-omelet",
    name: "Burrito de omelet",
    category: "burritos",
    description: "Omelet mencionado históricamente como variante de burrito. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 75,
    available: true,
    image: "img/food/burrito-2.jpg",
    imageType: "illustrative",
  },

  // ---- ENSALADAS (referencia histórica: desde $60 MXN) ----
  {
    id: "ensalada-fresca",
    name: "Ensalada fresca",
    category: "ensaladas",
    description: "Ingredientes históricamente mencionados: lechuga, espinaca baby, arúgula, pimientos, tomate, cebolla y chile. Composición pendiente de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 60,
    available: true,
    image: "img/food/ensalada-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "ensalada-mixta",
    name: "Ensalada mixta",
    category: "ensaladas",
    description: "Variante de ensalada con base de vegetales frescos. Ingredientes exactos pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 60,
    available: true,
    image: "img/food/ensalada-2.jpg",
    imageType: "illustrative",
  },

  // ---- QUESADILLAS (referencia histórica: desde $55 MXN) ----
  {
    id: "quesadilla-queso",
    name: "Quesadilla de queso",
    category: "quesadillas",
    description: "Queso mencionado históricamente como variante de quesadilla. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 55,
    available: true,
    image: "img/food/quesadilla-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "quesadilla-jamon",
    name: "Quesadilla de jamón",
    category: "quesadillas",
    description: "Jamón mencionado históricamente como variante de quesadilla. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 55,
    available: true,
    image: "img/food/quesadilla-2.jpg",
    imageType: "illustrative",
  },
  {
    id: "quesadilla-brisket",
    name: "Quesadilla de brisket de res",
    category: "quesadillas",
    description: "Brisket de res mencionado históricamente como variante de quesadilla. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 55,
    available: true,
    image: "img/food/quesadilla-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "quesadilla-pollo",
    name: "Quesadilla de pollo",
    category: "quesadillas",
    description: "Pollo mencionado históricamente como variante de quesadilla. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 55,
    available: true,
    image: "img/food/quesadilla-2.jpg",
    imageType: "illustrative",
  },

  // ---- EMPANADAS (referencia histórica: desde $30 MXN) ----
  {
    id: "empanada-carne",
    name: "Empanada de carne",
    category: "empanadas",
    description: "Carne mencionada históricamente como ingrediente de empanada. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 30,
    available: true,
    image: "img/food/empanada-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "empanada-pimiento",
    name: "Empanada de pimiento",
    category: "empanadas",
    description: "Pimiento mencionado históricamente como ingrediente de empanada. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 30,
    available: true,
    image: "img/food/empanada-2.jpg",
    imageType: "illustrative",
  },
  {
    id: "empanada-elote",
    name: "Empanada de elote",
    category: "empanadas",
    description: "Elote mencionado históricamente como ingrediente de empanada. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 30,
    available: true,
    image: "img/food/empanada-1.jpg",
    imageType: "illustrative",
  },
  {
    id: "empanada-queso",
    name: "Empanada de queso",
    category: "empanadas",
    description: "Queso mencionado históricamente como ingrediente de empanada. Detalles pendientes de confirmar.",
    price: null,
    priceType: "unknown",
    priceStatus: "historical",
    priceFrom: 30,
    available: true,
    image: "img/food/empanada-2.jpg",
    imageType: "illustrative",
  },
];
