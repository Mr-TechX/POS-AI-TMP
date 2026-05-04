const STORAGE_KEY = "pos_web_v1";
const SESSION_KEY = "pos_web_session_v1";
const CASH_REGISTERS = [
  { id: "box-1", name: "Caja 1" },
  { id: "box-2", name: "Caja 2" },
  { id: "box-3", name: "Caja 3" },
  { id: "box-4", name: "Caja 4" },
  { id: "box-5", name: "Caja 5" }
];
const DEMO_USERS = [
  { username: "admin", password: "Admin123!", role: "admin", displayName: "Administrador" },
  { username: "vendedor", password: "Venta123!", role: "seller", displayName: "Vendedor" },
  { username: "almacen", password: "Stock123!", role: "warehouse", displayName: "Almacen" }
];
const ROLE_VIEW_ACCESS = {
  admin: ["dashboard", "pos", "products", "sales", "cashflow", "settings"],
  seller: ["pos", "sales"],
  warehouse: ["products"]
};

function defaultInitialCapitalByRegister() {
  return CASH_REGISTERS.reduce((acc, box) => {
    acc[box.id] = 0;
    return acc;
  }, {});
}

function defaultCashierByRegister() {
  return CASH_REGISTERS.reduce((acc, box) => {
    acc[box.id] = "";
    return acc;
  }, {});
}

const dom = {
  appShell: document.getElementById("app-shell"),
  authScreen: document.getElementById("auth-screen"),
  authForm: document.getElementById("auth-form"),
  authUsername: document.getElementById("auth-username"),
  authPassword: document.getElementById("auth-password"),
  authError: document.getElementById("auth-error"),
  authStoreName: document.getElementById("auth-store-name"),
  authStoreSubtitle: document.getElementById("auth-store-subtitle"),
  authStoreLogo: document.getElementById("auth-store-logo"),
  authLogoFallback: document.getElementById("auth-logo-fallback"),
  tabs: document.getElementById("tabs"),
  views: Array.from(document.querySelectorAll(".view")),
  mobileMenuToggle: document.getElementById("mobile-menu-toggle"),
  siteCopyright: document.getElementById("site-copyright"),
  faviconLink: document.getElementById("dynamic-favicon"),
  storeName: document.getElementById("store-name"),
  storeSubtitle: document.getElementById("store-subtitle"),
  storeLogo: document.getElementById("store-logo"),
  logoFallback: document.getElementById("logo-fallback"),
  productCatalog: document.getElementById("product-catalog"),
  productSearch: document.getElementById("product-search"),
  cartList: document.getElementById("cart-list"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  cartTax: document.getElementById("cart-tax"),
  cartTotal: document.getElementById("cart-total"),
  cashRegisterSelect: document.getElementById("cash-register-select"),
  cashierNameInput: document.getElementById("cashier-name-input"),
  paymentMethod: document.getElementById("payment-method"),
  cashAmountField: document.getElementById("cash-amount-field"),
  cardAmountField: document.getElementById("card-amount-field"),
  amountPaid: document.getElementById("amount-paid"),
  cardAmountPaid: document.getElementById("card-amount-paid"),
  changeValue: document.getElementById("change-value"),
  checkoutBtn: document.getElementById("checkout-btn"),
  clearCartBtn: document.getElementById("clear-cart-btn"),
  resetDemo: document.getElementById("reset-demo"),
  exportData: document.getElementById("export-data"),
  productForm: document.getElementById("product-form"),
  productId: document.getElementById("product-id"),
  productName: document.getElementById("product-name"),
  productSku: document.getElementById("product-sku"),
  productPrice: document.getElementById("product-price"),
  productStock: document.getElementById("product-stock"),
  productMinStock: document.getElementById("product-min-stock"),
  productCancel: document.getElementById("product-cancel"),
  productsTable: document.getElementById("products-table"),
  salesTable: document.getElementById("sales-table"),
  salesTicketContent: document.getElementById("sales-ticket-content"),
  cashflowForm: document.getElementById("cashflow-form"),
  cashflowRegisterSelect: document.getElementById("cashflow-register-select"),
  cashflowInitialCapital: document.getElementById("cashflow-initial-capital"),
  cashflowTable: document.getElementById("cashflow-table"),
  cashflowSummaryTable: document.getElementById("cashflow-summary-table"),
  cashflowKpiInitial: document.getElementById("cashflow-kpi-initial"),
  cashflowKpiSales: document.getElementById("cashflow-kpi-sales"),
  cashflowKpiTotal: document.getElementById("cashflow-kpi-total"),
  filterFrom: document.getElementById("filter-from"),
  filterTo: document.getElementById("filter-to"),
  applyFilters: document.getElementById("apply-filters"),
  clearFilters: document.getElementById("clear-filters"),
  settingsForm: document.getElementById("settings-form"),
  settingsStoreName: document.getElementById("settings-store-name"),
  settingsStoreSubtitle: document.getElementById("settings-store-subtitle"),
  settingsCurrency: document.getElementById("settings-currency"),
  settingsTax: document.getElementById("settings-tax"),
  settingsTheme: document.getElementById("settings-theme"),
  settingsAccentColor: document.getElementById("settings-accent-color"),
  settingsLogoFile: document.getElementById("settings-logo-file"),
  removeLogoBtn: document.getElementById("remove-logo-btn"),
  logoutBtn: document.getElementById("logout-btn"),
  currentUserBadge: document.getElementById("current-user-badge"),
  kpiSalesToday: document.getElementById("kpi-sales-today"),
  kpiTicketsToday: document.getElementById("kpi-tickets-today"),
  kpiAvgTicket: document.getElementById("kpi-avg-ticket"),
  kpiLowStock: document.getElementById("kpi-low-stock"),
  topChart: document.getElementById("top-chart"),
  lowDemandChart: document.getElementById("low-demand-chart"),
  lowStockList: document.getElementById("low-stock-list"),
  recommendationsList: document.getElementById("recommendations-list"),
  catalogItemTemplate: document.getElementById("catalog-item-template")
};

const defaultState = {
  settings: {
    storeName: "POS Web",
    storeSubtitle: "Punto de venta para PyMES",
    currency: "MXN",
    taxRate: 16,
    theme: "dark",
    accentColor: "#4fa2ff",
    logoDataUrl: ""
  },
  products: [
    { id: uid(), sku: "A001", name: "Agua 600ml", price: 12, stock: 50, minStock: 10 },
    { id: uid(), sku: "P010", name: "Pan dulce", price: 9, stock: 35, minStock: 8 },
    { id: uid(), sku: "L002", name: "Leche 1L", price: 28, stock: 20, minStock: 5 },
    { id: uid(), sku: "C100", name: "Cafe soluble", price: 85, stock: 12, minStock: 4 }
  ],
  sales: [],
  cart: [],
  pos: {
    currentRegisterId: CASH_REGISTERS[0].id,
    cashierByRegister: defaultCashierByRegister()
  },
  filters: {
    from: "",
    to: ""
  },
  cashflow: {
    initialCapitalByRegister: defaultInitialCapitalByRegister()
  }
};

let state = loadState();
let selectedSaleId = null;
let mobileMenuOpen = false;
let currentUser = null;

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function nowIso() {
  return new Date().toISOString();
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function currencyFormatter() {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: state.settings.currency || "MXN"
  });
}

function fmtMoney(value) {
  return currencyFormatter().format(Number(value) || 0);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return deepClone(defaultState);
  try {
    const parsed = JSON.parse(raw);
    const parsedCashflow = parsed.cashflow || {};
    const initialCapitalByRegister = {
      ...defaultInitialCapitalByRegister(),
      ...(parsedCashflow.initialCapitalByRegister || {})
    };

    // Backward compatibility for previous single-capital version.
    if (
      Number.isFinite(parsedCashflow.initialCapital) &&
      Number(parsedCashflow.initialCapital) > 0 &&
      !parsedCashflow.initialCapitalByRegister
    ) {
      initialCapitalByRegister[CASH_REGISTERS[0].id] = Number(parsedCashflow.initialCapital);
    }

    const merged = {
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
      products: Array.isArray(parsed.products) ? parsed.products : [],
      sales: Array.isArray(parsed.sales) ? parsed.sales : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      pos: {
        ...defaultState.pos,
        ...(parsed.pos || {}),
        cashierByRegister: {
          ...defaultCashierByRegister(),
          ...((parsed.pos && parsed.pos.cashierByRegister) || {})
        }
      },
      filters: { ...defaultState.filters, ...(parsed.filters || {}) },
      cashflow: {
        ...defaultState.cashflow,
        ...parsedCashflow,
        initialCapitalByRegister
      }
    };
    return merged;
  } catch (err) {
    console.warn("No se pudo cargar el estado.", err);
    return deepClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.username !== "string") return null;
    const match = DEMO_USERS.find(
      (user) => user.username === parsed.username && user.role === parsed.role
    );
    return match || null;
  } catch {
    return null;
  }
}

function saveSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      username: user.username,
      role: user.role
    })
  );
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getAllowedViewsForRole(role) {
  return ROLE_VIEW_ACCESS[role] || [];
}

function isViewAllowed(viewId) {
  if (!currentUser) return false;
  return getAllowedViewsForRole(currentUser.role).includes(viewId);
}

function getFirstAllowedView() {
  const allowed = currentUser ? getAllowedViewsForRole(currentUser.role) : [];
  return allowed[0] || "dashboard";
}

function applyRoleAccess() {
  const allowedViews = new Set(currentUser ? getAllowedViewsForRole(currentUser.role) : []);
  Array.from(dom.tabs.querySelectorAll(".tab")).forEach((tab) => {
    const visible = allowedViews.has(tab.dataset.view);
    tab.classList.toggle("role-hidden", !visible);
  });
  dom.views.forEach((view) => {
    const visible = allowedViews.has(view.id);
    view.classList.toggle("role-hidden", !visible);
  });

  const isAdmin = currentUser && currentUser.role === "admin";
  dom.resetDemo.classList.toggle("role-hidden", !isAdmin);
  dom.exportData.classList.toggle("role-hidden", !isAdmin);
}

function ensureActiveViewForRole() {
  const activeView = dom.views.find((view) => view.classList.contains("active"));
  if (!activeView || !isViewAllowed(activeView.id)) {
    setActiveView(getFirstAllowedView());
  }
}

function applyAuthVisibility() {
  const isLoggedIn = Boolean(currentUser);
  dom.authScreen.classList.toggle("hidden", isLoggedIn);
  dom.appShell.classList.toggle("hidden", !isLoggedIn);
}

function setCurrentUserBadge() {
  if (!currentUser) {
    dom.currentUserBadge.textContent = "";
    return;
  }
  dom.currentUserBadge.textContent = `${currentUser.displayName} (${currentUser.username})`;
}

function renderAuthBrand() {
  const siteName = state.settings.storeName || defaultState.settings.storeName;
  const siteSubtitle = state.settings.storeSubtitle || defaultState.settings.storeSubtitle;
  const logo = state.settings.logoDataUrl || "";
  dom.authStoreName.textContent = siteName;
  dom.authStoreSubtitle.textContent = siteSubtitle;
  dom.authLogoFallback.textContent = brandFallbackText(siteName);
  if (logo) {
    dom.authStoreLogo.src = logo;
    dom.authStoreLogo.classList.remove("hidden");
    dom.authLogoFallback.classList.add("hidden");
  } else {
    dom.authStoreLogo.removeAttribute("src");
    dom.authStoreLogo.classList.add("hidden");
    dom.authLogoFallback.classList.remove("hidden");
  }
}

function findUserByCredentials(username, password) {
  return (
    DEMO_USERS.find((user) => user.username === username.trim() && user.password === password) ||
    null
  );
}

function setAuthError(message) {
  if (!message) {
    dom.authError.textContent = "";
    dom.authError.classList.add("hidden");
    return;
  }
  dom.authError.textContent = message;
  dom.authError.classList.remove("hidden");
}

function login(user) {
  currentUser = user;
  saveSession(user);
  setAuthError("");
  applyAuthVisibility();
  applyRoleAccess();
  ensureActiveViewForRole();
  setCurrentUserBadge();
  renderAll();
}

function logout() {
  currentUser = null;
  clearSession();
  setMobileMenu(false);
  applyAuthVisibility();
  setCurrentUserBadge();
  setAuthError("");
  dom.authForm.reset();
  dom.authUsername.focus();
}

function onAuthSubmit(event) {
  event.preventDefault();
  const username = dom.authUsername.value;
  const password = dom.authPassword.value;
  const match = findUserByCredentials(username, password);
  if (!match) {
    setAuthError("Credenciales invalidas. Intenta nuevamente.");
    return;
  }
  login(match);
}

function setActiveView(viewId) {
  if (currentUser && !isViewAllowed(viewId)) {
    viewId = getFirstAllowedView();
  }
  dom.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  Array.from(dom.tabs.querySelectorAll(".tab")).forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewId);
  });
  if (isMobileViewport()) setMobileMenu(false);
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 980px)").matches;
}

function setMobileMenu(open) {
  mobileMenuOpen = Boolean(open);
  document.body.classList.toggle("mobile-nav-open", mobileMenuOpen);
  if (dom.mobileMenuToggle) {
    dom.mobileMenuToggle.setAttribute("aria-expanded", mobileMenuOpen ? "true" : "false");
    dom.mobileMenuToggle.setAttribute("aria-label", mobileMenuOpen ? "Cerrar menu" : "Abrir menu");
  }
}

function toggleMobileMenu() {
  if (!isMobileViewport()) return;
  setMobileMenu(!mobileMenuOpen);
}

function onViewportResize() {
  if (!isMobileViewport()) {
    setMobileMenu(false);
  }
}

function renderAll() {
  const siteName = state.settings.storeName || defaultState.settings.storeName;
  dom.storeName.textContent = siteName;
  document.title = siteName;
  dom.storeSubtitle.textContent = state.settings.storeSubtitle || defaultState.settings.storeSubtitle;
  renderAuthBrand();
  syncCashRegisterSelectors();
  renderStoreBrand();
  renderFooter();
  applyThemeSettings();
  updatePaymentFieldsVisibility();
  renderProductsTable();
  renderCatalog();
  renderCart();
  renderSalesTable();
  renderCashflow();
  renderDashboard();
  fillSettingsForm();
}

function getCashRegisterById(registerId) {
  return CASH_REGISTERS.find((box) => box.id === registerId) || CASH_REGISTERS[0];
}

function getCurrentRegisterId() {
  const exists = CASH_REGISTERS.some((box) => box.id === state.pos.currentRegisterId);
  return exists ? state.pos.currentRegisterId : CASH_REGISTERS[0].id;
}

function populateCashRegisterSelectors() {
  const optionsHtml = CASH_REGISTERS.map((box) => `<option value="${box.id}">${box.name}</option>`).join("");
  dom.cashRegisterSelect.innerHTML = optionsHtml;
  dom.cashflowRegisterSelect.innerHTML = optionsHtml;
}

function syncCashRegisterSelectors() {
  const registerId = getCurrentRegisterId();
  state.pos.currentRegisterId = registerId;
  dom.cashRegisterSelect.value = registerId;
  dom.cashflowRegisterSelect.value = registerId;
  const cashierByRegister = {
    ...defaultCashierByRegister(),
    ...(state.pos.cashierByRegister || {})
  };
  state.pos.cashierByRegister = cashierByRegister;
  dom.cashierNameInput.value = cashierByRegister[registerId] || "";
}

function fillSettingsForm() {
  dom.settingsStoreName.value = state.settings.storeName;
  dom.settingsStoreSubtitle.value = state.settings.storeSubtitle || "";
  dom.settingsCurrency.value = state.settings.currency;
  dom.settingsTax.value = state.settings.taxRate;
  dom.settingsTheme.value = state.settings.theme || "dark";
  dom.settingsAccentColor.value = normalizeHexColor(state.settings.accentColor, "#4fa2ff");
  dom.settingsLogoFile.value = "";
}

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

function brandFallbackText(name) {
  const cleaned = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
  return cleaned || "POS";
}

function renderStoreBrand() {
  const logo = state.settings.logoDataUrl || "";
  dom.logoFallback.textContent = brandFallbackText(state.settings.storeName);

  if (logo) {
    dom.storeLogo.src = logo;
    dom.storeLogo.classList.remove("hidden");
    dom.logoFallback.classList.add("hidden");
    applyFavicon(logo);
    return;
  }

  dom.storeLogo.removeAttribute("src");
  dom.storeLogo.classList.add("hidden");
  dom.logoFallback.classList.remove("hidden");
  applyFavicon(createFallbackFavicon());
}

function renderFooter() {
  const year = new Date().getFullYear();
  dom.siteCopyright.textContent = `© ${year} Powered by TecnoProjects Security`;
}

function createFallbackFavicon() {
  const initials = brandFallbackText(state.settings.storeName).slice(0, 2);
  const color = normalizeHexColor(state.settings.accentColor, "#4fa2ff");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="${color}" />
      <text x="50%" y="56%" text-anchor="middle" font-size="26" fill="white" font-family="Arial, sans-serif">${initials}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function applyFavicon(href) {
  if (!dom.faviconLink) return;
  dom.faviconLink.setAttribute("href", href);
}

function normalizeHexColor(value, fallback) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  const shortMatch = /^#([0-9a-fA-F]{3})$/.exec(trimmed);
  if (shortMatch) {
    const [r, g, b] = shortMatch[1].split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (/^#([0-9a-fA-F]{6})$/.test(trimmed)) return trimmed.toLowerCase();
  return fallback;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex, "#4fa2ff").slice(1);
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
}

function shiftRgb(hex, delta) {
  const { r, g, b } = hexToRgb(hex);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  return {
    r: clamp(r + delta),
    g: clamp(g + delta),
    b: clamp(b + delta)
  };
}

function applyThemeSettings() {
  const theme = state.settings.theme === "light" ? "light" : "dark";
  const accent = normalizeHexColor(state.settings.accentColor, "#4fa2ff");
  const accentStrong = shiftRgb(accent, -30);
  const accentBright = shiftRgb(accent, 40);

  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(`theme-${theme}`);

  document.documentElement.style.setProperty("--brand", accent);
  document.documentElement.style.setProperty("--brand-rgb", `${accentBright.r}, ${accentBright.g}, ${accentBright.b}`);
  document.documentElement.style.setProperty("--brand-2-rgb", `${accentStrong.r}, ${accentStrong.g}, ${accentStrong.b}`);
}

function renderProductsTable() {
  dom.productsTable.innerHTML = "";

  if (!state.products.length) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="6">Sin productos</td>';
    dom.productsTable.appendChild(row);
    return;
  }

  state.products
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((product) => {
      const row = document.createElement("tr");
      const lowStockClass = product.stock <= product.minStock ? "badge low" : "badge";

      row.innerHTML = `
        <td>${product.sku}</td>
        <td>${escapeHtml(product.name)}</td>
        <td>${fmtMoney(product.price)}</td>
        <td><span class="${lowStockClass}">${product.stock}</span></td>
        <td>${product.minStock}</td>
        <td>
          <button class="btn ghost" data-action="edit" data-id="${product.id}">Editar</button>
          <button class="btn ghost" data-action="delete" data-id="${product.id}">Eliminar</button>
        </td>
      `;

      dom.productsTable.appendChild(row);
    });
}

function renderCatalog() {
  const search = dom.productSearch.value.trim().toLowerCase();
  const products = state.products
    .filter((p) => p.stock > 0)
    .filter((p) => {
      if (!search) return true;
      return p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  dom.productCatalog.innerHTML = "";

  if (!products.length) {
    dom.productCatalog.innerHTML = "<p class=\"small\">No hay productos disponibles.</p>";
    return;
  }

  for (const product of products) {
    const node = dom.catalogItemTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.id = product.id;
    node.querySelector(".catalog-name").textContent = product.name;
    node.querySelector(".catalog-meta").textContent = `${product.sku} | ${fmtMoney(product.price)} | Stock: ${product.stock}`;
    dom.productCatalog.appendChild(node);
  }
}

function cartSummary() {
  const subtotal = state.cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  const taxRate = Number(state.settings.taxRate || 0) / 100;
  const tax = subtotal * taxRate;
  const rawTotal = subtotal + tax;
  const total = roundPosTotal(rawTotal);
  return { subtotal, tax, total, rawTotal };
}

function roundPosTotal(value) {
  const normalized = Math.round((Number(value) || 0) * 100) / 100;
  const pesos = Math.floor(normalized);
  const cents = Math.round((normalized - pesos) * 100);

  if (cents === 0) return Number(normalized.toFixed(2));
  if (cents <= 50) return Number((pesos + 0.5).toFixed(2));
  return Number((pesos + 1).toFixed(2));
}

function findProduct(id) {
  return state.products.find((p) => p.id === id);
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const inCart = state.cart.find((item) => item.productId === productId);
  const currentQty = inCart ? inCart.qty : 0;

  if (currentQty + 1 > product.stock) {
    alert("No hay stock suficiente.");
    return;
  }

  if (inCart) {
    inCart.qty += 1;
  } else {
    state.cart.push({
      productId,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  saveState();
  renderCart();
}

function updateCartQty(productId, change) {
  const item = state.cart.find((line) => line.productId === productId);
  const product = findProduct(productId);
  if (!item || !product) return;

  const nextQty = item.qty + change;
  if (nextQty <= 0) {
    state.cart = state.cart.filter((line) => line.productId !== productId);
  } else if (nextQty > product.stock) {
    alert("Cantidad mayor al stock disponible.");
  } else {
    item.qty = nextQty;
  }

  saveState();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((line) => line.productId !== productId);
  saveState();
  renderCart();
}

function renderCart() {
  dom.cartList.innerHTML = "";
  if (!state.cart.length) {
    dom.cartList.innerHTML = "<li class='small'>Carrito vacio.</li>";
  }

  state.cart.forEach((line) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div class="cart-item-top">
        <strong>${escapeHtml(line.name)}</strong>
        <span>${fmtMoney(line.price * line.qty)}</span>
      </div>
      <div class="cart-item-bottom">
        <div class="qty-control">
          <button data-action="dec" data-id="${line.productId}">-</button>
          <span>${line.qty}</span>
          <button data-action="inc" data-id="${line.productId}">+</button>
        </div>
        <button class="btn ghost" data-action="remove" data-id="${line.productId}">Quitar</button>
      </div>
    `;
    dom.cartList.appendChild(li);
  });

  const summary = cartSummary();
  dom.cartSubtotal.textContent = fmtMoney(summary.subtotal);
  dom.cartTax.textContent = fmtMoney(summary.tax);
  dom.cartTotal.textContent = fmtMoney(summary.total);

  updateChange();
}

function updateChange() {
  const method = dom.paymentMethod.value;
  const cashPaid = Number(dom.amountPaid.value || 0);
  const cardPaid = Number(dom.cardAmountPaid.value || 0);
  const total = cartSummary().total;

  if (method === "card") {
    dom.changeValue.textContent = fmtMoney(0);
    return;
  }

  if (method === "hybrid") {
    const dueAfterCard = Math.max(0, total - cardPaid);
    const changeHybrid = Math.max(0, cashPaid - dueAfterCard);
    dom.changeValue.textContent = fmtMoney(changeHybrid);
    return;
  }

  const change = Math.max(0, cashPaid - total);
  dom.changeValue.textContent = fmtMoney(change);
}

function updatePaymentFieldsVisibility() {
  const method = dom.paymentMethod.value;
  const isCard = method === "card";
  const isHybrid = method === "hybrid";

  dom.cashAmountField.classList.toggle("hidden", isCard);
  dom.cardAmountField.classList.toggle("hidden", !isHybrid);

  if (isCard) {
    dom.amountPaid.value = "";
  }

  if (!isHybrid) {
    dom.cardAmountPaid.value = "";
  }

  updateChange();
}

function paymentMethodLabel(method) {
  if (method === "cash") return "Efectivo";
  if (method === "card") return "Tarjeta";
  if (method === "hybrid") return "Mixto";
  return "No definido";
}

function paymentBreakdownForSale(sale) {
  if (sale.paymentMethod === "cash") {
    return { cash: Number(sale.paidCash ?? sale.paid ?? 0), card: Number(sale.paidCard ?? 0) };
  }
  if (sale.paymentMethod === "card") {
    return { cash: Number(sale.paidCash ?? 0), card: Number(sale.paidCard ?? sale.paid ?? sale.total ?? 0) };
  }
  return {
    cash: Number(sale.paidCash ?? 0),
    card: Number(sale.paidCard ?? Math.max(0, Number(sale.paid ?? 0) - Number(sale.paidCash ?? 0)))
  };
}

function checkout() {
  if (!state.cart.length) {
    alert("El carrito esta vacio.");
    return;
  }

  const summary = cartSummary();
  const method = dom.paymentMethod.value;
  const register = getCashRegisterById(dom.cashRegisterSelect.value);
  const cashierByRegister = {
    ...defaultCashierByRegister(),
    ...(state.pos.cashierByRegister || {})
  };
  const cashierName = String(cashierByRegister[register.id] || "").trim();
  state.pos.currentRegisterId = register.id;
  state.pos.cashierByRegister = cashierByRegister;
  const cashPaid = Number(dom.amountPaid.value || 0);
  const cardPaid = Number(dom.cardAmountPaid.value || 0);
  let paid = summary.total;
  let change = 0;
  let paidCash = 0;
  let paidCard = 0;

  if (method === "cash") {
    if (cashPaid < summary.total) {
      alert("El monto recibido en efectivo es menor al total.");
      return;
    }
    paid = cashPaid;
    change = Math.max(0, cashPaid - summary.total);
    paidCash = cashPaid;
  } else if (method === "card") {
    paid = summary.total;
    change = 0;
    paidCard = summary.total;
  } else if (method === "hybrid") {
    if (cardPaid < 0 || cashPaid < 0) {
      alert("Los montos no pueden ser negativos.");
      return;
    }
    if (cardPaid > summary.total) {
      alert("El monto en tarjeta no puede exceder el total.");
      return;
    }
    const totalPaid = cashPaid + cardPaid;
    if (totalPaid < summary.total) {
      alert("La suma de efectivo y tarjeta es menor al total.");
      return;
    }
    const dueAfterCard = Math.max(0, summary.total - cardPaid);
    paid = totalPaid;
    change = Math.max(0, cashPaid - dueAfterCard);
    paidCash = cashPaid;
    paidCard = cardPaid;
  } else {
    alert("Metodo de pago no valido.");
    return;
  }

  for (const line of state.cart) {
    const product = findProduct(line.productId);
    if (!product || line.qty > product.stock) {
      alert(`Stock insuficiente para ${line.name}.`);
      return;
    }
  }

  for (const line of state.cart) {
    const product = findProduct(line.productId);
    product.stock -= line.qty;
  }

  const sale = {
    id: uid(),
    folio: `T-${Date.now().toString().slice(-7)}`,
    createdAt: nowIso(),
    cashRegisterId: register.id,
    cashRegisterName: register.name,
    cashierName,
    paymentMethod: method,
    subtotal: summary.subtotal,
    tax: summary.tax,
    total: summary.total,
    paid,
    paidCash,
    paidCard,
    change,
    items: state.cart.map((line) => ({ ...line }))
  };

  state.sales.unshift(sale);
  state.cart = [];
  dom.amountPaid.value = "";
  dom.cardAmountPaid.value = "";

  saveState();
  renderAll();

  alert(`Venta registrada. Folio: ${sale.folio}`);
}

function renderSalesTable() {
  dom.salesTable.innerHTML = "";

  const filtered = filteredSales();
  if (!filtered.length) {
    dom.salesTable.innerHTML = "<tr><td colspan='7'>Sin ventas en el rango.</td></tr>";
    selectedSaleId = null;
    renderSaleTicket(null);
    return;
  }

  if (!filtered.some((sale) => sale.id === selectedSaleId)) {
    selectedSaleId = filtered[0].id;
  }

  for (const sale of filtered) {
    const row = document.createElement("tr");
    const date = new Date(sale.createdAt);
    const itemsCount = sale.items.reduce((acc, line) => acc + line.qty, 0);
    row.dataset.saleId = sale.id;
    row.className = sale.id === selectedSaleId ? "sale-row active" : "sale-row";

    row.innerHTML = `
      <td>${sale.folio}</td>
      <td>${date.toLocaleString("es-MX")}</td>
      <td>${escapeHtml(sale.cashRegisterName || getCashRegisterById(sale.cashRegisterId).name)}</td>
      <td>${escapeHtml(sale.cashierName || "-")}</td>
      <td>${itemsCount}</td>
      <td>${paymentMethodLabel(sale.paymentMethod)}</td>
      <td>${fmtMoney(sale.total)}</td>
    `;
    dom.salesTable.appendChild(row);
  }

  const selectedSale = filtered.find((sale) => sale.id === selectedSaleId) || filtered[0];
  renderSaleTicket(selectedSale);
}

function renderCashflow() {
  const initialByRegister = {
    ...defaultInitialCapitalByRegister(),
    ...(state.cashflow?.initialCapitalByRegister || {})
  };
  state.cashflow.initialCapitalByRegister = initialByRegister;

  const salesByRegister = CASH_REGISTERS.reduce((acc, box) => {
    acc[box.id] = 0;
    return acc;
  }, {});

  const orderedSales = [...state.sales].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  orderedSales.forEach((sale) => {
    const register = getCashRegisterById(sale.cashRegisterId);
    salesByRegister[register.id] += Number(sale.total || 0);
  });

  const totalInitial = CASH_REGISTERS.reduce((acc, box) => acc + Number(initialByRegister[box.id] || 0), 0);
  const totalSalesAllBoxes = CASH_REGISTERS.reduce((acc, box) => acc + Number(salesByRegister[box.id] || 0), 0);
  const totalCashAllBoxes = totalInitial + totalSalesAllBoxes;

  dom.cashflowKpiInitial.textContent = fmtMoney(totalInitial);
  dom.cashflowKpiSales.textContent = fmtMoney(totalSalesAllBoxes);
  dom.cashflowKpiTotal.textContent = fmtMoney(totalCashAllBoxes);

  const selectedRegisterId = getCashRegisterById(dom.cashflowRegisterSelect.value).id;
  dom.cashflowRegisterSelect.value = selectedRegisterId;
  dom.cashflowInitialCapital.value = Number(initialByRegister[selectedRegisterId] || 0).toFixed(2);

  dom.cashflowSummaryTable.innerHTML = "";
  CASH_REGISTERS.forEach((box) => {
    const initial = Number(initialByRegister[box.id] || 0);
    const sales = Number(salesByRegister[box.id] || 0);
    const total = initial + sales;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${box.name}</td>
      <td>${fmtMoney(initial)}</td>
      <td>${fmtMoney(sales)}</td>
      <td>${fmtMoney(total)}</td>
    `;
    dom.cashflowSummaryTable.appendChild(row);
  });

  dom.cashflowTable.innerHTML = "";
  if (!orderedSales.length) {
    dom.cashflowTable.innerHTML = "<tr><td colspan='6'>Sin movimientos de ventas.</td></tr>";
    return;
  }

  const runningByRegister = { ...initialByRegister };
  let runningGlobal = totalInitial;
  orderedSales.forEach((sale) => {
    const register = getCashRegisterById(sale.cashRegisterId);
    const saleTotal = Number(sale.total || 0);
    runningByRegister[register.id] = Number(runningByRegister[register.id] || 0) + saleTotal;
    runningGlobal += saleTotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(sale.createdAt).toLocaleString("es-MX")}</td>
      <td>${sale.folio}</td>
      <td>${register.name}</td>
      <td>${fmtMoney(saleTotal)}</td>
      <td>${fmtMoney(runningByRegister[register.id])}</td>
      <td>${fmtMoney(runningGlobal)}</td>
    `;
    dom.cashflowTable.appendChild(row);
  });
}

function filteredSales() {
  const from = state.filters.from ? new Date(`${state.filters.from}T00:00:00`) : null;
  const to = state.filters.to ? new Date(`${state.filters.to}T23:59:59`) : null;

  return state.sales.filter((sale) => {
    const saleDate = new Date(sale.createdAt);
    if (from && saleDate < from) return false;
    if (to && saleDate > to) return false;
    return true;
  });
}

function renderSaleTicket(sale) {
  if (!sale) {
    dom.salesTicketContent.innerHTML = "<p class='small'>Selecciona una venta para ver el ticket.</p>";
    return;
  }

  const saleDate = new Date(sale.createdAt).toLocaleString("es-MX");
  const paymentLabel = paymentMethodLabel(sale.paymentMethod);
  const paymentParts = paymentBreakdownForSale(sale);
  const registerName = sale.cashRegisterName || getCashRegisterById(sale.cashRegisterId).name;
  const cashierName = sale.cashierName || "-";

  const linesHtml = sale.items
    .map((line) => {
      const lineTotal = line.qty * line.price;
      return `
        <li class="ticket-line">
          <div>
            <strong>${escapeHtml(line.name)}</strong>
            <p class="small">${line.qty} x ${fmtMoney(line.price)}</p>
          </div>
          <strong>${fmtMoney(lineTotal)}</strong>
        </li>
      `;
    })
    .join("");

  dom.salesTicketContent.innerHTML = `
    <div class="ticket-card">
      <div class="ticket-head">
        <strong>${escapeHtml(state.settings.storeName)}</strong>
        <span>${escapeHtml(state.settings.storeSubtitle || "")}</span>
      </div>
      <div class="ticket-meta">
        <p><span>Folio:</span> <strong>${sale.folio}</strong></p>
        <p><span>Fecha:</span> <strong>${saleDate}</strong></p>
        <p><span>Caja:</span> <strong>${escapeHtml(registerName)}</strong></p>
        <p><span>Vendedor:</span> <strong>${escapeHtml(cashierName)}</strong></p>
        <p><span>Pago:</span> <strong>${paymentLabel}</strong></p>
      </div>
      <ul class="ticket-lines">${linesHtml}</ul>
      <div class="ticket-totals">
        <p><span>Subtotal</span><strong>${fmtMoney(sale.subtotal)}</strong></p>
        <p><span>Impuesto</span><strong>${fmtMoney(sale.tax)}</strong></p>
        <p class="ticket-total"><span>Total</span><strong>${fmtMoney(sale.total)}</strong></p>
        <p><span>Efectivo</span><strong>${fmtMoney(paymentParts.cash)}</strong></p>
        <p><span>Tarjeta</span><strong>${fmtMoney(paymentParts.card)}</strong></p>
        <p><span>Recibido</span><strong>${fmtMoney(sale.paid)}</strong></p>
        <p><span>Cambio</span><strong>${fmtMoney(sale.change)}</strong></p>
      </div>
    </div>
  `;
}

function productDemandStats() {
  const soldCount = new Map();
  const soldCount30 = new Map();
  const now = Date.now();
  const lookbackMs = 30 * 24 * 60 * 60 * 1000;
  const fromDate = now - lookbackMs;

  for (const sale of state.sales) {
    const saleTs = new Date(sale.createdAt).getTime();
    for (const item of sale.items) {
      soldCount.set(item.productId, (soldCount.get(item.productId) || 0) + item.qty);
      if (saleTs >= fromDate) {
        soldCount30.set(item.productId, (soldCount30.get(item.productId) || 0) + item.qty);
      }
    }
  }

  return state.products.map((product) => ({
    productId: product.id,
    name: product.name,
    stock: product.stock,
    minStock: product.minStock,
    qtySold: soldCount.get(product.id) || 0,
    qtySold30: soldCount30.get(product.id) || 0
  }));
}

function renderDemandChart(target, rows, tone) {
  target.innerHTML = "";
  if (!rows.length) {
    target.innerHTML = "<p class='small'>Sin datos suficientes para la grafica.</p>";
    return;
  }

  const maxQty = Math.max(...rows.map((row) => row.qtySold), 1);
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "chart-row";
    const pct = Math.max((row.qtySold / maxQty) * 100, row.qtySold > 0 ? 8 : 2);
    item.innerHTML = `
      <div class="chart-row-top">
        <span>${escapeHtml(row.name)}</span>
        <span>${row.qtySold} pzs</span>
      </div>
      <div class="chart-track">
        <span class="chart-fill ${tone}" style="width:${pct}%"></span>
      </div>
    `;
    target.appendChild(item);
  });
}

function buildRecommendations(stats, averageSold) {
  const recs = [];
  const coverageTargetDays = 21;
  const mediumCoverageDays = 14;

  const highDemand = stats
    .filter((item) => item.qtySold > 0)
    .sort((a, b) => b.qtySold - a.qtySold)
    .slice(0, 3);

  highDemand.forEach((item) => {
    const dailyDemand = item.qtySold30 / 30;
    const coverageDays = dailyDemand > 0 ? item.stock / dailyDemand : Infinity;
    const targetUnits = Math.ceil(dailyDemand * coverageTargetDays);
    const suggestedBuyQty = Math.max(0, targetUnits - item.stock);
    const shouldRestock = item.stock <= Math.max(item.minStock * 2, 6);
    const shouldBuyForCoverage = coverageDays < mediumCoverageDays && suggestedBuyQty > 0;

    if (shouldRestock || item.qtySold >= averageSold * 1.2 || shouldBuyForCoverage) {
      const coverageText = Number.isFinite(coverageDays)
        ? `${coverageDays.toFixed(1)} dias de cobertura`
        : "cobertura amplia";
      const qtyText = suggestedBuyQty > 0
        ? ` Compra sugerida: +${suggestedBuyQty} unidades (meta ${coverageTargetDays} dias).`
        : "";
      recs.push({
        tone: "buy",
        text: `Comprar mas ${item.name}: alta demanda (${item.qtySold} historicas, ${item.qtySold30} en 30 dias), stock ${item.stock}, ${coverageText}.${qtyText}`
      });
    }
  });

  stats
    .filter((item) => item.qtySold === 0 && item.stock > item.minStock)
    .slice(0, 3)
    .forEach((item) => {
      recs.push({
        tone: "drop",
        text: `Evaluar dejar de vender ${item.name} o liquidarlo: sin demanda registrada y stock ${item.stock}.`
      });
    });

  stats
    .filter((item) => item.qtySold > 0 && item.qtySold < averageSold * 0.35 && item.stock > item.minStock * 2)
    .slice(0, 2)
    .forEach((item) => {
      recs.push({
        tone: "watch",
        text: `Reducir compras de ${item.name}: demanda baja (${item.qtySold}) frente a inventario (${item.stock}). Compra sugerida: 0 unidades hasta normalizar rotacion.`
      });
    });

  return recs.slice(0, 6);
}

function renderDashboard() {
  const today = todayKey();
  const salesToday = state.sales.filter((sale) => sale.createdAt.slice(0, 10) === today);

  const sumToday = salesToday.reduce((acc, sale) => acc + sale.total, 0);
  const tickets = salesToday.length;
  const avg = tickets ? sumToday / tickets : 0;
  const lowStock = state.products.filter((p) => p.stock <= p.minStock);

  dom.kpiSalesToday.textContent = fmtMoney(sumToday);
  dom.kpiTicketsToday.textContent = String(tickets);
  dom.kpiAvgTicket.textContent = fmtMoney(avg);
  dom.kpiLowStock.textContent = String(lowStock.length);

  const stats = productDemandStats();
  const soldWithDemand = stats.filter((item) => item.qtySold > 0);
  const averageSold = soldWithDemand.length
    ? soldWithDemand.reduce((acc, item) => acc + item.qtySold, 0) / soldWithDemand.length
    : 0;

  const topSold = [...stats]
    .sort((a, b) => b.qtySold - a.qtySold)
    .slice(0, 5);
  const leastSold = [...stats]
    .sort((a, b) => a.qtySold - b.qtySold)
    .slice(0, 5);

  renderDemandChart(dom.topChart, topSold, "tone-top");
  renderDemandChart(dom.lowDemandChart, leastSold, "tone-low");

  dom.lowStockList.innerHTML = "";
  if (!lowStock.length) {
    dom.lowStockList.innerHTML = "<li class='small'>Inventario saludable.</li>";
  } else {
    lowStock
      .sort((a, b) => a.stock - b.stock)
      .forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${escapeHtml(item.name)} <span class='badge low'>${item.stock}</span>`;
        dom.lowStockList.appendChild(li);
      });
  }

  const recommendations = buildRecommendations(stats, averageSold);
  dom.recommendationsList.innerHTML = "";
  if (!state.sales.length) {
    dom.recommendationsList.innerHTML = "<li class='small'>Sin ventas registradas aun: todo en orden.</li>";
    return;
  }

  if (!recommendations.length) {
    dom.recommendationsList.innerHTML = "<li class='small'>Todo en orden por ahora. Sin alertas de demanda.</li>";
    return;
  }

  recommendations.forEach((rec) => {
    const li = document.createElement("li");
    li.className = `recommendation ${rec.tone}`;
    li.textContent = rec.text;
    dom.recommendationsList.appendChild(li);
  });
}

function saveProductFromForm(event) {
  event.preventDefault();

  const data = {
    id: dom.productId.value || uid(),
    name: dom.productName.value.trim(),
    sku: dom.productSku.value.trim(),
    price: Number(dom.productPrice.value),
    stock: Number(dom.productStock.value),
    minStock: Number(dom.productMinStock.value)
  };

  if (!data.name || !data.sku) {
    alert("Completa nombre y SKU.");
    return;
  }

  if (data.price < 0 || data.stock < 0 || data.minStock < 0) {
    alert("Los valores no pueden ser negativos.");
    return;
  }

  const duplicatedSku = state.products.some((p) => p.sku.toLowerCase() === data.sku.toLowerCase() && p.id !== data.id);
  if (duplicatedSku) {
    alert("El SKU ya existe.");
    return;
  }

  const index = state.products.findIndex((p) => p.id === data.id);
  if (index >= 0) {
    state.products[index] = data;
  } else {
    state.products.push(data);
  }

  clearProductForm();
  saveState();
  renderAll();
}

function clearProductForm() {
  dom.productId.value = "";
  dom.productForm.reset();
}

function editProduct(productId) {
  const product = findProduct(productId);
  if (!product) return;

  dom.productId.value = product.id;
  dom.productName.value = product.name;
  dom.productSku.value = product.sku;
  dom.productPrice.value = String(product.price);
  dom.productStock.value = String(product.stock);
  dom.productMinStock.value = String(product.minStock);
  setActiveView("products");
}

function deleteProduct(productId) {
  const usedInCart = state.cart.some((item) => item.productId === productId);
  if (usedInCart) {
    alert("Quita el producto del carrito antes de eliminar.");
    return;
  }

  const ok = confirm("Deseas eliminar este producto?");
  if (!ok) return;

  state.products = state.products.filter((p) => p.id !== productId);
  saveState();
  renderAll();
}

async function saveSettings(event) {
  event.preventDefault();

  const normalizedAccent = normalizeHexColor(dom.settingsAccentColor.value, "#4fa2ff");
  const selectedLogoFile = dom.settingsLogoFile.files?.[0] || null;
  let logoDataUrl = state.settings.logoDataUrl || "";

  if (selectedLogoFile) {
    const isImage = selectedLogoFile.type.startsWith("image/");
    const maxBytes = 2 * 1024 * 1024;
    if (!isImage) {
      alert("El archivo de logo debe ser una imagen.");
      return;
    }
    if (selectedLogoFile.size > maxBytes) {
      alert("El logo supera 2MB. Usa una imagen mas ligera.");
      return;
    }
    try {
      logoDataUrl = await readImageAsDataUrl(selectedLogoFile);
    } catch (error) {
      alert("No se pudo procesar la imagen del logo.");
      return;
    }
  }

  const nextSettings = {
    storeName: dom.settingsStoreName.value.trim() || "POS Web",
    storeSubtitle: dom.settingsStoreSubtitle.value.trim() || defaultState.settings.storeSubtitle,
    currency: dom.settingsCurrency.value.trim().toUpperCase() || "MXN",
    taxRate: Number(dom.settingsTax.value || 0),
    theme: dom.settingsTheme.value === "light" ? "light" : "dark",
    accentColor: normalizedAccent,
    logoDataUrl
  };

  if (nextSettings.taxRate < 0) {
    alert("Impuesto invalido.");
    return;
  }

  state.settings = nextSettings;
  saveState();
  renderAll();
  alert("Configuracion guardada.");
}

function removeLogo() {
  const hasLogo = Boolean(state.settings.logoDataUrl);
  if (!hasLogo) return;
  const ok = confirm("Deseas quitar el logo del negocio?");
  if (!ok) return;
  state.settings.logoDataUrl = "";
  saveState();
  renderAll();
}

function applySalesFilters() {
  state.filters.from = dom.filterFrom.value;
  state.filters.to = dom.filterTo.value;
  saveState();
  renderSalesTable();
}

function clearSalesFilters() {
  state.filters = { from: "", to: "" };
  dom.filterFrom.value = "";
  dom.filterTo.value = "";
  saveState();
  renderSalesTable();
}

function saveCashflowInitialCapital(event) {
  event.preventDefault();
  const register = getCashRegisterById(dom.cashflowRegisterSelect.value);
  const value = Number(dom.cashflowInitialCapital.value || 0);

  if (!Number.isFinite(value) || value < 0) {
    alert("El capital inicial debe ser un numero valido mayor o igual a 0.");
    return;
  }

  state.cashflow.initialCapitalByRegister = {
    ...defaultInitialCapitalByRegister(),
    ...(state.cashflow.initialCapitalByRegister || {}),
    [register.id]: Number(value.toFixed(2))
  };
  saveState();
  renderCashflow();
  alert(`Capital inicial actualizado para ${register.name}.`);
}

function onCashRegisterSelectionChange() {
  const register = getCashRegisterById(dom.cashRegisterSelect.value);
  const cashierByRegister = {
    ...defaultCashierByRegister(),
    ...(state.pos.cashierByRegister || {})
  };
  state.pos.currentRegisterId = register.id;
  state.pos.cashierByRegister = cashierByRegister;
  dom.cashierNameInput.value = cashierByRegister[register.id] || "";
  dom.cashflowRegisterSelect.value = register.id;
  saveState();
}

function onCashflowRegisterSelectionChange() {
  const register = getCashRegisterById(dom.cashflowRegisterSelect.value);
  const initialByRegister = {
    ...defaultInitialCapitalByRegister(),
    ...(state.cashflow.initialCapitalByRegister || {})
  };
  dom.cashflowInitialCapital.value = Number(initialByRegister[register.id] || 0).toFixed(2);
}

function onCashierNameInput() {
  const register = getCashRegisterById(dom.cashRegisterSelect.value);
  const cashierByRegister = {
    ...defaultCashierByRegister(),
    ...(state.pos.cashierByRegister || {})
  };
  cashierByRegister[register.id] = dom.cashierNameInput.value.trim();
  state.pos.cashierByRegister = cashierByRegister;
  saveState();
}

function exportAsJson() {
  const data = {
    exportedAt: nowIso(),
    settings: state.settings,
    products: state.products,
    sales: state.sales,
    pos: state.pos,
    cashflow: state.cashflow
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pos-export-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetDemoData() {
  const ok = confirm("Esto borrara todas las ventas y cambios. Continuar?");
  if (!ok) return;

  state = deepClone(defaultState);
  saveState();
  renderAll();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function bindEvents() {
  dom.authForm.addEventListener("submit", onAuthSubmit);
  dom.logoutBtn.addEventListener("click", logout);

  dom.mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  window.addEventListener("resize", onViewportResize);

  dom.tabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) return;
    setActiveView(tab.dataset.view);
  });

  dom.productSearch.addEventListener("input", renderCatalog);

  dom.productCatalog.addEventListener("click", (event) => {
    const btn = event.target.closest(".catalog-item");
    if (!btn) return;
    addToCart(btn.dataset.id);
  });

  dom.cartList.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    const { action, id } = btn.dataset;

    if (action === "inc") updateCartQty(id, 1);
    if (action === "dec") updateCartQty(id, -1);
    if (action === "remove") removeFromCart(id);
  });

  dom.checkoutBtn.addEventListener("click", checkout);
  dom.clearCartBtn.addEventListener("click", () => {
    state.cart = [];
    dom.amountPaid.value = "";
    dom.cardAmountPaid.value = "";
    saveState();
    renderCart();
  });
  dom.paymentMethod.addEventListener("change", updatePaymentFieldsVisibility);
  dom.cashRegisterSelect.addEventListener("change", onCashRegisterSelectionChange);
  dom.cashierNameInput.addEventListener("input", onCashierNameInput);
  dom.amountPaid.addEventListener("input", updateChange);
  dom.cardAmountPaid.addEventListener("input", updateChange);

  dom.productForm.addEventListener("submit", saveProductFromForm);
  dom.productCancel.addEventListener("click", clearProductForm);

  dom.productsTable.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    const { action, id } = btn.dataset;

    if (action === "edit") editProduct(id);
    if (action === "delete") deleteProduct(id);
  });

  dom.settingsForm.addEventListener("submit", saveSettings);
  dom.cashflowForm.addEventListener("submit", saveCashflowInitialCapital);
  dom.cashflowRegisterSelect.addEventListener("change", onCashflowRegisterSelectionChange);
  dom.removeLogoBtn.addEventListener("click", removeLogo);
  dom.applyFilters.addEventListener("click", applySalesFilters);
  dom.clearFilters.addEventListener("click", clearSalesFilters);
  dom.salesTable.addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-sale-id]");
    if (!row) return;
    selectedSaleId = row.dataset.saleId;
    renderSalesTable();
  });
  dom.exportData.addEventListener("click", exportAsJson);
  dom.resetDemo.addEventListener("click", resetDemoData);
}

function init() {
  dom.filterFrom.value = state.filters.from;
  dom.filterTo.value = state.filters.to;
  populateCashRegisterSelectors();
  bindEvents();
  onViewportResize();
  renderAll();
  currentUser = null;
  clearSession();
  applyAuthVisibility();
  applyRoleAccess();
  setCurrentUserBadge();
  dom.authForm.reset();
  setAuthError("");
  dom.authUsername.focus();
}

init();
