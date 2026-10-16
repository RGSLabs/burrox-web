/**
 * app.js — Lógica de la demo BURROX
 * ----------------------------------
 * Gestiona: navegación móvil, filtros del menú, render del catálogo,
 * carrito demostrativo, panel lateral, mapa y estado de WhatsApp.
 * No contiene el catálogo (ver products.js) ni los datos comerciales
 * (ver config.js).
 */
(function () {
  "use strict";

  var CONFIG = window.BURROX_CONFIG;
  var PRODUCTS = window.BURROX_PRODUCTS;
  var CATEGORIES = window.BURROX_CATEGORIES;

  /* ================= Utilidades ================= */
  function $(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }
  function $$(selector, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(selector));
  }
  function money(amount) {
    return "$" + amount.toLocaleString("es-MX", { maximumFractionDigits: 2 }) + " MXN";
  }

  /* ================= Navegación móvil ================= */
  var navToggle = $("#nav-toggle");
  var navMenu = $("#nav-menu");

  function setNav(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    navMenu.classList.toggle("is-open", open);
  }
  navToggle.addEventListener("click", function () {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });
  $$(".nav-link", navMenu).forEach(function (link) {
    link.addEventListener("click", function () { setNav(false); });
  });

  /* ================= Datos comerciales en la página ================= */
  function renderBusinessData() {
    var addressEl = $("#info-address");
    var phoneEl = $("#info-phone");

    if (CONFIG.address.label) {
      addressEl.textContent = CONFIG.address.label;
    } else {
      addressEl.textContent = "Dirección pendiente de confirmar.";
    }
    if (CONFIG.phone.label) {
      phoneEl.textContent = CONFIG.phone.label;
    } else {
      phoneEl.textContent = "Teléfono pendiente de confirmar.";
    }

    if (CONFIG.address.status === "verified") {
      $("#address-badge").textContent = "Dato confirmado por BURROX";
      $("#address-badge").classList.remove("status-badge--warn");
    }
    if (CONFIG.phone.status === "verified") {
      $("#phone-badge").textContent = "Dato confirmado por BURROX";
      $("#phone-badge").classList.remove("status-badge--warn");
    }

    $("#footer-address").textContent = CONFIG.address.label ? "Dirección: " + CONFIG.address.label : "Dirección pendiente de confirmar.";
    $("#footer-phone").textContent = CONFIG.phone.label ? "Teléfono: " + CONFIG.phone.label : "Teléfono pendiente de confirmar.";
    $("#footer-year").textContent = new Date().getFullYear();

    // Mapa: iframe de salida de Google Maps (sin clave API).
    var mapIframe = $("#map-iframe");
    if (CONFIG.map.query) {
      mapIframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(CONFIG.map.query) + "&output=embed";
    }
    var mapsLink = $("#maps-link");
    mapsLink.href = CONFIG.map.link || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.map.query || "Plaza La Cima Veracruz");
  }

  /* ================= Catálogo: filtros ================= */
  var activeFilter = "todo";
  var filtersWrap = $("#menu-filters");

  function renderFilters() {
    filtersWrap.innerHTML = "";
    CATEGORIES.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn";
      btn.textContent = cat.label;
      btn.setAttribute("aria-pressed", String(cat.id === activeFilter));
      btn.dataset.category = cat.id;
      btn.addEventListener("click", function () {
        activeFilter = cat.id;
        $$(".filter-btn", filtersWrap).forEach(function (b) {
          b.setAttribute("aria-pressed", String(b.dataset.category === activeFilter));
        });
        filterProducts();
      });
      filtersWrap.appendChild(btn);
    });
  }

  function filterProducts() {
    $$(".product-card").forEach(function (card) {
      var show = activeFilter === "todo" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !show);
    });
  }

  /* ================= Catálogo: tarjetas ================= */
  var grid = $("#menu-grid");

  function priceLabel(product) {
    // No se inventa precio: se muestra solo la referencia histórica de categoría.
    if (product.price !== null && product.priceType === "unit") {
      return { price: money(product.price), note: product.priceStatus === "verified" ? "" : "precio provisional" };
    }
    if (product.priceFrom) {
      return { price: "desde " + money(product.priceFrom), note: "referencia histórica" };
    }
    return { price: "Precio pendiente", note: "" };
  }

  function renderProducts() {
    grid.innerHTML = "";
    PRODUCTS.forEach(function (p, index) {
      var label = priceLabel(p);

      var card = document.createElement("article");
      card.className = "product-card reveal";
      card.style.setProperty("--stagger", (index % 4) * 80 + "ms");
      card.dataset.category = p.category;

      var fig = document.createElement("figure");
      fig.className = "product-media";
      var img = document.createElement("img");
      img.src = p.image;
      img.alt = "Fotografía ilustrativa: " + p.name;
      img.width = 600;
      img.height = 450;
      img.loading = "lazy";
      fig.appendChild(img);
      if (p.imageType === "illustrative") {
        var badge = document.createElement("span");
        badge.className = "product-badge";
        badge.textContent = "Imagen ilustrativa";
        fig.appendChild(badge);
      }
      var catBadge = document.createElement("span");
      catBadge.className = "product-badge product-badge--cat";
      var catObj = CATEGORIES.find(function (c) { return c.id === p.category; });
      catBadge.textContent = catObj ? catObj.label : p.category;
      fig.appendChild(catBadge);

      var body = document.createElement("div");
      body.className = "product-body";

      var name = document.createElement("h3");
      name.className = "product-name";
      name.textContent = p.name;

      var desc = document.createElement("p");
      desc.className = "product-desc";
      desc.textContent = p.description;

      var priceWrap = document.createElement("p");
      priceWrap.className = "product-price";
      var price = document.createElement("span");
      price.className = "price";
      price.textContent = label.price;
      priceWrap.appendChild(price);
      if (label.note) {
        var note = document.createElement("span");
        note.className = "price-note";
        note.textContent = label.note;
        priceWrap.appendChild(note);
      }

      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "add-btn";
      addBtn.textContent = "AÑADIR AL CARRITO";
      addBtn.addEventListener("click", function () {
        addToCart(p.id);
        addBtn.classList.add("added");
        addBtn.textContent = "AÑADIDO ✓";
        setTimeout(function () {
          addBtn.classList.remove("added");
          addBtn.textContent = "AÑADIR AL CARRITO";
        }, 900);
      });

      body.appendChild(name);
      body.appendChild(desc);
      body.appendChild(priceWrap);
      body.appendChild(addBtn);

      card.appendChild(fig);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ================= Carrito ================= */
  var CART_KEY = "burrox_demo_cart";
  var cart = loadCart(); // { productId: qty }

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* almacenamiento no disponible: el carrito sigue en memoria */ }
  }

  function cartCount() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id]; }, 0);
  }

  var toastEl = $("#toast");
  var toastTimer = null;
  function showToast(html) {
    toastEl.innerHTML = html;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 1900);
  }

  function bumpCartCount() {
    cartCountEl.classList.remove("bump");
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add("bump");
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    bumpCartCount();
    var p = PRODUCTS.find(function (item) { return item.id === id; });
    showToast("Añadido al pedido · <strong>" + (p ? p.name : "") + "</strong>");
  }
  function decreaseQty(id) {
    if (!cart[id]) return;
    cart[id] -= 1;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }
  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
  }

  var cartCountEl = $("#cart-count");
  var cartItemsEl = $("#cart-items");
  var cartEmptyEl = $("#cart-empty");
  var cartSubtotalEl = $("#cart-subtotal");

  function renderCart() {
    cartCountEl.textContent = String(cartCount());

    var ids = Object.keys(cart);
    cartItemsEl.innerHTML = "";

    if (ids.length === 0) {
      cartEmptyEl.hidden = false;
      cartSubtotalEl.textContent = "";
      cartSubtotalEl.classList.remove("is-warn");
      return;
    }
    cartEmptyEl.hidden = true;

    var subtotal = 0;
    var canTotal = true;

    ids.forEach(function (id) {
      var p = PRODUCTS.find(function (item) { return item.id === id; });
      if (!p) return;
      var qty = cart[id];

      var li = document.createElement("li");
      li.className = "cart-item";

      var img = document.createElement("img");
      img.src = p.image;
      img.alt = "";

      var info = document.createElement("div");
      var name = document.createElement("p");
      name.className = "cart-item-name";
      name.textContent = p.name;
      var priceNote = document.createElement("p");
      priceNote.className = "cart-item-price";
      priceNote.textContent = p.price !== null && p.priceType === "unit"
        ? money(p.price) + " c/u"
        : "Precio unitario pendiente de confirmar";
      info.appendChild(name);
      info.appendChild(priceNote);

      var controls = document.createElement("div");
      controls.className = "cart-item-controls";

      var qtyControls = document.createElement("div");
      qtyControls.className = "qty-controls";

      var minus = document.createElement("button");
      minus.type = "button";
      minus.className = "qty-btn";
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Reducir cantidad de " + p.name);
      minus.addEventListener("click", function () { decreaseQty(id); });

      var value = document.createElement("span");
      value.className = "qty-value";
      value.textContent = String(qty);
      value.setAttribute("aria-label", "Cantidad: " + qty);

      var plus = document.createElement("button");
      plus.type = "button";
      plus.className = "qty-btn";
      plus.textContent = "+";
      plus.setAttribute("aria-label", "Aumentar cantidad de " + p.name);
      plus.addEventListener("click", function () { addToCart(id); });

      qtyControls.appendChild(minus);
      qtyControls.appendChild(value);
      qtyControls.appendChild(plus);

      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-btn";
      remove.textContent = "Eliminar";
      remove.setAttribute("aria-label", "Eliminar " + p.name + " del carrito");
      remove.addEventListener("click", function () { removeFromCart(id); });

      controls.appendChild(qtyControls);
      controls.appendChild(remove);

      li.appendChild(img);
      li.appendChild(info);
      li.appendChild(controls);
      cartItemsEl.appendChild(li);

      if (p.price !== null && p.priceType === "unit") {
        subtotal += p.price * qty;
      } else {
        canTotal = false;
      }
    });

    if (canTotal && ids.length > 0) {
      cartSubtotalEl.classList.remove("is-warn");
      cartSubtotalEl.innerHTML = 'Subtotal estimado: <span class="subtotal-amount">' + money(subtotal) + "</span>";
    } else {
      cartSubtotalEl.classList.add("is-warn");
      cartSubtotalEl.textContent = "Subtotal estimado no disponible: hay precios pendientes de confirmar.";
    }
  }

  /* ---- Panel del carrito (drawer) ---- */
  var drawer = $("#cart-drawer");
  var overlay = $("#cart-overlay");
  var cartOpenBtn = $("#cart-open");
  var cartCloseBtn = $("#cart-close");
  var cartContinue = $("#cart-continue");
  var lastFocused = null;

  function openCart() {
    lastFocused = document.activeElement;
    drawer.hidden = false;
    overlay.hidden = false;
    // Forzar reflow para que la transición se ejecute
    void drawer.offsetWidth;
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    cartCloseBtn.focus();
  }
  function closeCart() {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () {
      drawer.hidden = true;
      overlay.hidden = true;
    }, 260);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function trapTab(e) {
    if (e.key !== "Tab") return;
    var focusables = $$("button, a[href], [tabindex]:not([tabindex='-1'])", drawer).filter(function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  cartOpenBtn.addEventListener("click", openCart);
  cartCloseBtn.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  cartContinue.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!drawer.hidden) closeCart();
      if (navMenu.classList.contains("is-open")) setNav(false);
    }
    if (!drawer.hidden) trapTab(e);
  });

  /* ---- WhatsApp (deshabilitado hasta confirmar número) ---- */
  var waBtn = $("#cart-whatsapp");

  function renderWhatsApp() {
    if (CONFIG.whatsapp.enabled && CONFIG.whatsapp.number) {
      waBtn.disabled = false;
      waBtn.textContent = "PREPARAR PEDIDO POR WHATSAPP";
      waBtn.addEventListener("click", prepareWhatsAppMessage);
    } else {
      waBtn.disabled = true;
      waBtn.textContent = "CONTACTO DE PEDIDO PENDIENTE";
    }
  }

  function prepareWhatsAppMessage() {
    var ids = Object.keys(cart);
    var lines = ["Hola BURROX, quisiera consultar disponibilidad de:"];
    ids.forEach(function (id) {
      var p = PRODUCTS.find(function (item) { return item.id === id; });
      if (p) lines.push("• " + cart[id] + " x " + p.name);
    });
    lines.push("(Pedido generado desde la demo web — precios por confirmar)");
    var url = "https://wa.me/" + CONFIG.whatsapp.number + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  }

  /* ================= Aparición al hacer scroll ================= */
  function initReveal() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = $$(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.remove("reveal"); el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          // Quitar .reveal tras la animación para que el hover vuelva a ser reactivo
          setTimeout(function () { entry.target.classList.remove("reveal"); }, 800);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { observer.observe(el); });
    return observer;
  }

  /* ================= Barra de progreso + header al hacer scroll ================= */
  function initScrollFx() {
    var progress = $("#scroll-progress");
    var header = $(".site-header");
    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + "%";
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /* ================= Chips de acceso rápido a categorías ================= */
  function initChips() {
    $$("[data-goto-category]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeFilter = chip.getAttribute("data-goto-category");
        $$(".filter-btn", filtersWrap).forEach(function (b) {
          b.setAttribute("aria-pressed", String(b.dataset.category === activeFilter));
        });
        filterProducts();
        var menu = $("#menu");
        if (menu) menu.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ================= Arranque ================= */
  renderBusinessData();
  renderFilters();
  renderProducts();
  renderCart();
  renderWhatsApp();
  initReveal();
  initScrollFx();
  initChips();
})();
