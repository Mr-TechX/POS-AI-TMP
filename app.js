const STORAGE_KEY = "pos_web_v1";
const SESSION_KEY = "pos_web_session_v1";
const CASH_REGISTERS = [
  { id: "box-1", name: "Caja 1" },
  { id: "box-2", name: "Caja 2" },
  { id: "box-3", name: "Caja 3" },
  { id: "box-4", name: "Caja 4" },
  { id: "box-5", name: "Caja 5" }
];
const SUPPLIERS = [
  { id: "coca-cola", name: "Coca-Cola", category: "Bebidas" },
  { id: "barcel", name: "Barcel", category: "Botanas" },
  { id: "sabritas", name: "Sabritas", category: "Botanas" },
  { id: "bimbo", name: "Bimbo", category: "Panificacion" },
  { id: "lala", name: "Lala", category: "Lacteos" }
];
const DEMO_USERS = [
  { id: "user-admin-demo", username: "UlisesLC", password: "5js0qxuh#", role: "admin", displayName: "Administrador" },
  { id: "user-seller-demo", username: "JoseLA", password: "Ventas123!", role: "seller", displayName: "Vendedor" },
  { id: "user-warehouse-demo", username: "DanielJ", password: "Stock123!", role: "warehouse", displayName: "Almacen" },
  { id: "user-purchases-demo", username: "ComprasTP", password: "Compras123!", role: "purchases", displayName: "Compras" },
  { id: "user-accounting-demo", username: "ContabilidadTP", password: "Conta123!", role: "accounting", displayName: "Contabilidad" }
];
const ROLE_VIEW_ACCESS = {
  admin: ["dashboard", "pos", "products", "sales", "cashflow", "orders", "settings"],
  seller: ["pos", "sales"],
  warehouse: ["products"],
  purchases: ["orders"],
  accounting: ["cashflow"]
};
const ROLE_LABELS = {
  admin: "Administrador",
  seller: "Vendedor",
  warehouse: "Almacen",
  purchases: "Compras",
  accounting: "Contabilidad"
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
  cashflowStoreCapitalForm: document.getElementById("cashflow-store-capital-form"),
  cashflowRegisterSelect: document.getElementById("cashflow-register-select"),
  cashflowInitialCapital: document.getElementById("cashflow-initial-capital"),
  cashflowStoreCapital: document.getElementById("cashflow-store-capital"),
  cashflowTable: document.getElementById("cashflow-table"),
  cashflowSummaryTable: document.getElementById("cashflow-summary-table"),
  cashflowKpiInitial: document.getElementById("cashflow-kpi-initial"),
  cashflowKpiSales: document.getElementById("cashflow-kpi-sales"),
  cashflowKpiTotal: document.getElementById("cashflow-kpi-total"),
  cashflowKpiStoreCapital: document.getElementById("cashflow-kpi-store-capital"),
  cashflowKpiBalance: document.getElementById("cashflow-kpi-balance"),
  cashflowBalanceInitial: document.getElementById("cashflow-balance-initial"),
  cashflowBalanceProfit: document.getElementById("cashflow-balance-profit"),
  cashflowBalanceStore: document.getElementById("cashflow-balance-store"),
  ordersHistoryToggle: document.getElementById("orders-history-toggle"),
  ordersHistoryPanel: document.getElementById("orders-history-panel"),
  ordersHistorySummary: document.getElementById("orders-history-summary"),
  ordersHistoryMonth: document.getElementById("orders-history-month"),
  ordersHistoryList: document.getElementById("orders-history-list"),
  providersGrid: document.getElementById("providers-grid"),
  supplierOrderPanel: document.getElementById("supplier-order-panel"),
  supplierOrderTitle: document.getElementById("supplier-order-title"),
  supplierOrderSubtitle: document.getElementById("supplier-order-subtitle"),
  supplierOrderClose: document.getElementById("supplier-order-close"),
  supplierOrderForm: document.getElementById("supplier-order-form"),
  supplierOrderProviderId: document.getElementById("supplier-order-provider-id"),
  supplierOrderProductName: document.getElementById("supplier-order-product-name"),
  supplierOrderSku: document.getElementById("supplier-order-sku"),
  supplierOrderQuantity: document.getElementById("supplier-order-quantity"),
  supplierOrderUnitCost: document.getElementById("supplier-order-unit-cost"),
  supplierOrderLocation: document.getElementById("supplier-order-location"),
  supplierOrderTotal: document.getElementById("supplier-order-total"),
  openOrdersCount: document.getElementById("open-orders-count"),
  openOrdersList: document.getElementById("open-orders-list"),
  orderChecklistPanel: document.getElementById("order-checklist-panel"),
  orderChecklistTitle: document.getElementById("order-checklist-title"),
  orderChecklistDetails: document.getElementById("order-checklist-details"),
  orderChecklistTotal: document.getElementById("order-checklist-total"),
  orderCheckReceived: document.getElementById("order-check-received"),
  orderCheckPaid: document.getElementById("order-check-paid"),
  orderCheckComplete: document.getElementById("order-check-complete"),
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
  accountForm: document.getElementById("account-form"),
  accountId: document.getElementById("account-id"),
  accountDisplayName: document.getElementById("account-display-name"),
  accountUsername: document.getElementById("account-username"),
  accountPassword: document.getElementById("account-password"),
  accountRole: document.getElementById("account-role"),
  accountSubmitBtn: document.getElementById("account-submit-btn"),
  accountCancelBtn: document.getElementById("account-cancel-btn"),
  accountEditModal: document.getElementById("account-edit-modal"),
  accountEditForm: document.getElementById("account-edit-form"),
  accountEditId: document.getElementById("account-edit-id"),
  accountEditDisplayName: document.getElementById("account-edit-display-name"),
  accountEditUsername: document.getElementById("account-edit-username"),
  accountEditPassword: document.getElementById("account-edit-password"),
  accountEditRole: document.getElementById("account-edit-role"),
  accountEditClose: document.getElementById("account-edit-close"),
  accountEditCancel: document.getElementById("account-edit-cancel"),
  accountsCount: document.getElementById("accounts-count"),
  accountsTable: document.getElementById("accounts-table"),
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
  users: DEMO_USERS.map((user) => ({ ...user })),
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
    initialCapitalByRegister: defaultInitialCapitalByRegister(),
    storeCapital: 0
  },
  orders: {
    open: [],
    completed: []
  }
};

let state = loadState();
let selectedSaleId = null;
let mobileMenuOpen = false;
let currentUser = null;
let selectedSupplierId = "";
let selectedOrderId = null;
let ordersHistoryVisible = false;
let selectedOrdersHistoryMonth = "";

function ensureAccountEditModalDom() {
  if (!document.getElementById("account-edit-modal")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <section id="account-edit-modal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="account-edit-title">
          <article class="card modal-card">
            <div class="modal-head">
              <div>
                <h3 id="account-edit-title">Editar cuenta</h3>
                <p class="small">Actualiza usuario, contrasena o jerarquia de acceso.</p>
              </div>
              <button id="account-edit-close" class="btn ghost" type="button" aria-label="Cerrar editor">Cerrar</button>
            </div>
            <form id="account-edit-form" class="form">
              <input id="account-edit-id" type="hidden" />
              <label>
                Nombre visible
                <input id="account-edit-display-name" maxlength="60" />
              </label>
              <label>
                Usuario
                <input id="account-edit-username" required autocomplete="off" maxlength="32" />
              </label>
              <label>
                Nueva contrasena
                <input id="account-edit-password" type="password" autocomplete="new-password" minlength="6" placeholder="Dejar vacio para conservar la actual" />
              </label>
              <label>
                Jerarquia
                <select id="account-edit-role" required>
                  <option value="seller">Vendedor</option>
                  <option value="warehouse">Almacen</option>
                  <option value="purchases">Compras</option>
                  <option value="accounting">Contabilidad</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
              <div class="row account-actions">
                <button class="btn" type="submit">Guardar cambios</button>
                <button id="account-edit-cancel" class="btn ghost" type="button">Cancelar</button>
              </div>
            </form>
          </article>
        </section>
      `
    );
  }

  dom.accountEditModal = document.getElementById("account-edit-modal");
  dom.accountEditForm = document.getElementById("account-edit-form");
  dom.accountEditId = document.getElementById("account-edit-id");
  dom.accountEditDisplayName = document.getElementById("account-edit-display-name");
  dom.accountEditUsername = document.getElementById("account-edit-username");
  dom.accountEditPassword = document.getElementById("account-edit-password");
  dom.accountEditRole = document.getElementById("account-edit-role");
  dom.accountEditClose = document.getElementById("account-edit-close");
  dom.accountEditCancel = document.getElementById("account-edit-cancel");
}

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
    const parsedStoreCapital = Number(parsedCashflow.storeCapital);

    const merged = {
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
      products: Array.isArray(parsed.products) ? parsed.products : [],
      users: normalizeUsers(parsed.users),
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
        initialCapitalByRegister,
        storeCapital: Number.isFinite(parsedStoreCapital) && parsedStoreCapital > 0 ? parsedStoreCapital : 0
      },
      orders: normalizeOrders(parsed.orders)
    };
    return merged;
  } catch (err) {
    console.warn("No se pudo cargar el estado.", err);
    return deepClone(defaultState);
  }
}

function normalizeOrder(order, fallbackStatus) {
  if (!order || typeof order !== "object") return null;

  const supplier = getSupplierById(order.supplierId);
  const quantity = Math.max(1, Math.floor(Number(order.quantity || 1)));
  const unitCost = Math.max(0, Number(order.unitCost || 0));
  const total = Number.isFinite(Number(order.total)) ? Number(order.total) : quantity * unitCost;
  const checks = {
    received: Boolean(order.checks?.received),
    paid: Boolean(order.checks?.paid),
    complete: Boolean(order.checks?.complete)
  };

  return {
    id: String(order.id || uid()),
    supplierId: supplier.id,
    supplierName: supplier.name,
    productName: String(order.productName || "").trim() || "Producto sin nombre",
    sku: String(order.sku || "").trim() || "SIN-SKU",
    quantity,
    unitCost,
    location: String(order.location || "").trim() || "Sin ubicacion",
    total: Number(total.toFixed(2)),
    checks,
    createdAt: order.createdAt || nowIso(),
    completedAt: order.completedAt || (fallbackStatus === "completed" ? nowIso() : "")
  };
}

function normalizeOrders(orders) {
  const source = orders && typeof orders === "object" ? orders : {};
  return {
    open: (Array.isArray(source.open) ? source.open : [])
      .map((order) => normalizeOrder(order, "open"))
      .filter(Boolean),
    completed: (Array.isArray(source.completed) ? source.completed : [])
      .map((order) => normalizeOrder(order, "completed"))
      .filter(Boolean)
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isValidRole(role) {
  return Object.prototype.hasOwnProperty.call(ROLE_VIEW_ACCESS, role);
}

function roleLabel(role) {
  return ROLE_LABELS[role] || "Sin jerarquia";
}

function normalizeUser(user) {
  if (!user || typeof user !== "object") return null;

  const username = String(user.username || "").trim();
  const password = String(user.password || "");
  const role = isValidRole(user.role) ? user.role : "seller";
  const displayName = String(user.displayName || username).trim() || username;
  const demoMatch = DEMO_USERS.find((demoUser) => demoUser.username.toLowerCase() === username.toLowerCase());
  const id = String(user.id || demoMatch?.id || `user-${username.toLowerCase()}`).trim();
  const base = isBaseUserId(id);

  if (!username || !password) return null;
  return { id, username, password, role, displayName, base };
}

function normalizeUsers(users) {
  const source = [
    ...(Array.isArray(users) ? users : []),
    ...DEMO_USERS
  ];
  const seen = new Set();
  const seenIds = new Set();
  const normalized = [];

  source.forEach((user) => {
    const normalizedUser = normalizeUser(user);
    if (!normalizedUser) return;

    const usernameKey = normalizedUser.username.toLowerCase();
    if (seenIds.has(normalizedUser.id) || seen.has(usernameKey)) return;

    seenIds.add(normalizedUser.id);
    seen.add(usernameKey);
    normalized.push(normalizedUser);
  });

  if (!normalized.some((user) => user.role === "admin")) {
    const baseAdmin = normalized.find((user) => user.id === DEMO_USERS[0].id);
    if (baseAdmin) {
      baseAdmin.role = "admin";
    } else {
      normalized.unshift({ ...DEMO_USERS[0], base: true });
    }
  }

  return normalized;
}

function ensureDefaultUsersInState({ persist = false } = {}) {
  const before = JSON.stringify(state.users || []);
  state.users = normalizeUsers(state.users);
  const changed = before !== JSON.stringify(state.users);

  if (changed && persist) {
    saveState();
  }

  return state.users;
}

function isBaseUserId(id) {
  return DEMO_USERS.some((user) => user.id === id);
}

function isBaseUser(user) {
  return Boolean(user && isBaseUserId(user.id));
}

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.username !== "string") return null;
    const match = state.users.find(
      (user) =>
        (parsed.id && user.id === parsed.id) ||
        (user.username === parsed.username && user.role === parsed.role)
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
      id: user.id,
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
  ensureDefaultUsersInState({ persist: true });
  return (
    state.users.find((user) => user.username === username.trim() && user.password === password) ||
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
  renderOrdersControl();
  renderDashboard();
  fillSettingsForm();
  renderAccountsTable();
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

function renderAccountsTable() {
  dom.accountsTable.innerHTML = "";
  ensureDefaultUsersInState({ persist: true });

  const adminCount = state.users.filter((user) => user.role === "admin").length;
  const users = [...state.users].sort((a, b) => {
    if (a.role === b.role) return a.username.localeCompare(b.username);
    return roleLabel(a.role).localeCompare(roleLabel(b.role));
  });

  dom.accountsCount.textContent = `${users.length} cuenta${users.length === 1 ? "" : "s"} registrada${users.length === 1 ? "" : "s"}`;

  users.forEach((user) => {
    const isCurrentUser = currentUser && user.id === currentUser.id;
    const isBaseAccount = isBaseUser(user);
    const isLastAdmin = user.role === "admin" && adminCount <= 1;
    const canDelete = !isCurrentUser && !isBaseAccount && !isLastAdmin;
    const deleteHtml = canDelete
      ? `<button class="btn ghost" type="button" data-action="delete-account" data-id="${escapeHtml(user.id)}">Eliminar</button>`
      : "<span class='small'>No eliminable</span>";
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHtml(user.displayName)}</td>
      <td>${escapeHtml(user.username)}</td>
      <td>
        <div class="password-cell">
          <span class="small account-password-value">******</span>
          <button class="btn ghost" type="button" data-action="toggle-password" data-id="${escapeHtml(user.id)}">Mostrar</button>
        </div>
      </td>
      <td><span class="badge">${roleLabel(user.role)}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn ghost" type="button" data-action="edit-account" data-id="${escapeHtml(user.id)}" onclick="editAccount('${escapeHtml(user.id)}')">Editar</button>
          ${deleteHtml}
        </div>
      </td>
    `;
    dom.accountsTable.appendChild(row);
  });
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
  const storeCapital = Math.max(0, Number(state.cashflow.storeCapital || 0));
  const totalBalance = totalInitial + totalSalesAllBoxes + storeCapital;
  state.cashflow.storeCapital = storeCapital;

  dom.cashflowKpiInitial.textContent = fmtMoney(totalInitial);
  dom.cashflowKpiSales.textContent = fmtMoney(totalSalesAllBoxes);
  dom.cashflowKpiTotal.textContent = fmtMoney(totalCashAllBoxes);
  dom.cashflowKpiStoreCapital.textContent = fmtMoney(storeCapital);
  dom.cashflowKpiBalance.textContent = fmtMoney(totalBalance);
  dom.cashflowBalanceInitial.textContent = fmtMoney(totalInitial);
  dom.cashflowBalanceProfit.textContent = fmtMoney(totalSalesAllBoxes);
  dom.cashflowBalanceStore.textContent = fmtMoney(storeCapital);

  const selectedRegisterId = getCashRegisterById(dom.cashflowRegisterSelect.value).id;
  dom.cashflowRegisterSelect.value = selectedRegisterId;
  dom.cashflowInitialCapital.value = Number(initialByRegister[selectedRegisterId] || 0).toFixed(2);
  dom.cashflowStoreCapital.value = storeCapital.toFixed(2);

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

function ensureOrdersState() {
  state.orders = normalizeOrders(state.orders);
  return state.orders;
}

function getSupplierById(supplierId) {
  return SUPPLIERS.find((supplier) => supplier.id === supplierId) || SUPPLIERS[0];
}

function supplierInitials(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "P";
}

function renderOrdersControl() {
  ensureOrdersState();
  renderProvidersGrid();
  renderSupplierOrderPanel();
  renderOpenOrdersList();
  renderOrderChecklist();
  renderOrdersHistory();
}

function renderProvidersGrid() {
  dom.providersGrid.innerHTML = "";

  SUPPLIERS.forEach((supplier) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `provider-tile${supplier.id === selectedSupplierId ? " active" : ""}`;
    button.dataset.supplierId = supplier.id;
    button.innerHTML = `
      <span class="provider-mark">${escapeHtml(supplierInitials(supplier.name))}</span>
      <span>
        <span class="provider-name">${escapeHtml(supplier.name)}</span>
        <span class="small">${escapeHtml(supplier.category)}</span>
      </span>
    `;
    dom.providersGrid.appendChild(button);
  });
}

function openSupplierOrderPanel(supplierId) {
  selectedSupplierId = getSupplierById(supplierId).id;
  dom.supplierOrderForm.reset();
  renderOrdersControl();
  dom.supplierOrderProductName.focus();
}

function closeSupplierOrderPanel() {
  selectedSupplierId = "";
  dom.supplierOrderForm.reset();
  updateSupplierOrderTotal();
  renderOrdersControl();
}

function renderSupplierOrderPanel() {
  if (!selectedSupplierId) {
    dom.supplierOrderPanel.classList.add("hidden");
    return;
  }

  const supplier = getSupplierById(selectedSupplierId);
  dom.supplierOrderProviderId.value = supplier.id;
  dom.supplierOrderTitle.textContent = `Pedido a ${supplier.name}`;
  dom.supplierOrderSubtitle.textContent = supplier.category;
  dom.supplierOrderPanel.classList.remove("hidden");
  updateSupplierOrderTotal();
}

function supplierOrderTotalValue() {
  const quantity = Math.max(0, Number(dom.supplierOrderQuantity.value || 0));
  const unitCost = Math.max(0, Number(dom.supplierOrderUnitCost.value || 0));
  return quantity * unitCost;
}

function updateSupplierOrderTotal() {
  if (!dom.supplierOrderTotal) return;
  dom.supplierOrderTotal.textContent = fmtMoney(supplierOrderTotalValue());
}

function saveSupplierOrder(event) {
  event.preventDefault();

  const supplier = getSupplierById(dom.supplierOrderProviderId.value || selectedSupplierId);
  const productName = dom.supplierOrderProductName.value.trim();
  const sku = dom.supplierOrderSku.value.trim();
  const quantity = Math.floor(Number(dom.supplierOrderQuantity.value || 0));
  const unitCost = Number(dom.supplierOrderUnitCost.value || 0);
  const location = dom.supplierOrderLocation.value.trim();

  if (!productName || !sku || !location) {
    alert("Completa producto, SKU y ubicacion.");
    return;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    alert("La cantidad debe ser mayor a 0.");
    return;
  }

  if (!Number.isFinite(unitCost) || unitCost < 0) {
    alert("El costo unitario debe ser un numero valido mayor o igual a 0.");
    return;
  }

  const total = quantity * unitCost;
  const order = {
    id: uid(),
    supplierId: supplier.id,
    supplierName: supplier.name,
    productName,
    sku,
    quantity,
    unitCost: Number(unitCost.toFixed(2)),
    location,
    total: Number(total.toFixed(2)),
    checks: {
      received: false,
      paid: false,
      complete: false
    },
    createdAt: nowIso(),
    completedAt: ""
  };

  ensureOrdersState();
  state.orders.open.unshift(order);
  selectedOrderId = order.id;
  dom.supplierOrderForm.reset();
  saveState();
  renderOrdersControl();
}

function renderOpenOrdersList() {
  ensureOrdersState();
  const openOrders = state.orders.open;
  dom.openOrdersCount.textContent = `${openOrders.length} abierto${openOrders.length === 1 ? "" : "s"}`;
  dom.openOrdersList.innerHTML = "";

  if (!openOrders.length) {
    selectedOrderId = null;
    dom.openOrdersList.innerHTML = "<li class='small'>Sin pedidos abiertos.</li>";
    return;
  }

  if (!openOrders.some((order) => order.id === selectedOrderId)) {
    selectedOrderId = null;
  }

  openOrders.forEach((order) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="open-order-button${order.id === selectedOrderId ? " active" : ""}" type="button" data-order-id="${escapeHtml(order.id)}">
        <span class="open-order-top">
          <strong>${escapeHtml(order.supplierName)}</strong>
          <span>${fmtMoney(order.total)}</span>
        </span>
        <span class="open-order-detail">
          ${escapeHtml(order.quantity)} x ${escapeHtml(order.productName)} | SKU ${escapeHtml(order.sku)} | ${escapeHtml(order.location)}
        </span>
      </button>
    `;
    dom.openOrdersList.appendChild(li);
  });
}

function renderOrderChecklist() {
  const order = state.orders.open.find((item) => item.id === selectedOrderId);

  if (!order) {
    dom.orderChecklistPanel.classList.add("hidden");
    dom.orderCheckReceived.checked = false;
    dom.orderCheckPaid.checked = false;
    dom.orderCheckComplete.checked = false;
    return;
  }

  dom.orderChecklistTitle.textContent = order.supplierName;
  dom.orderChecklistDetails.textContent = `${order.quantity} x ${order.productName} | SKU ${order.sku} | ${order.location}`;
  dom.orderChecklistTotal.textContent = fmtMoney(order.total);
  dom.orderCheckReceived.checked = Boolean(order.checks.received);
  dom.orderCheckPaid.checked = Boolean(order.checks.paid);
  dom.orderCheckComplete.checked = Boolean(order.checks.complete);
  dom.orderChecklistPanel.classList.remove("hidden");
}

function updateOrderCheck(checkName, checked) {
  ensureOrdersState();
  const order = state.orders.open.find((item) => item.id === selectedOrderId);
  if (!order || !Object.prototype.hasOwnProperty.call(order.checks, checkName)) return;

  order.checks[checkName] = checked;
  const isCompleted = order.checks.received && order.checks.paid && order.checks.complete;

  if (isCompleted) {
    order.completedAt = nowIso();
    state.orders.completed.unshift(order);
    state.orders.open = state.orders.open.filter((item) => item.id !== order.id);
    selectedOrderId = null;
    selectedOrdersHistoryMonth = monthKey(order.completedAt);
  }

  saveState();
  renderOrdersControl();
}

function monthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
}

function monthLabel(key) {
  if (!key) return "Sin mes";
  const [year, month] = key.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
}

function toggleOrdersHistory() {
  ordersHistoryVisible = !ordersHistoryVisible;
  renderOrdersHistory();
}

function renderOrdersHistory() {
  dom.ordersHistoryPanel.classList.toggle("hidden", !ordersHistoryVisible);
  dom.ordersHistoryToggle.textContent = ordersHistoryVisible ? "Ocultar historial" : "Historial mensual";

  if (!ordersHistoryVisible) return;

  ensureOrdersState();
  const completedOrders = state.orders.completed;
  const months = [...new Set(completedOrders.map((order) => monthKey(order.completedAt)).filter(Boolean))]
    .sort()
    .reverse();

  dom.ordersHistoryMonth.innerHTML = "";
  dom.ordersHistoryList.innerHTML = "";

  if (!months.length) {
    selectedOrdersHistoryMonth = "";
    dom.ordersHistoryMonth.innerHTML = "<option value=''>Sin pedidos completados</option>";
    dom.ordersHistorySummary.textContent = "Sin pedidos completados.";
    dom.ordersHistoryList.innerHTML = "<p class='small'>Completa un pedido para guardarlo en el historial mensual.</p>";
    return;
  }

  if (!months.includes(selectedOrdersHistoryMonth)) {
    selectedOrdersHistoryMonth = months[0];
  }

  months.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = monthLabel(key);
    dom.ordersHistoryMonth.appendChild(option);
  });
  dom.ordersHistoryMonth.value = selectedOrdersHistoryMonth;

  const monthOrders = completedOrders.filter((order) => monthKey(order.completedAt) === selectedOrdersHistoryMonth);
  const total = monthOrders.reduce((acc, order) => acc + Number(order.total || 0), 0);
  dom.ordersHistorySummary.textContent = `${monthOrders.length} pedido${monthOrders.length === 1 ? "" : "s"} completado${monthOrders.length === 1 ? "" : "s"} | Total ${fmtMoney(total)}`;

  monthOrders.forEach((order) => {
    const item = document.createElement("div");
    item.className = "history-order";
    item.innerHTML = `
      <div class="history-order-top">
        <div>
          <strong>${escapeHtml(order.supplierName)}</strong>
          <p class="history-order-detail">
            ${escapeHtml(order.quantity)} x ${escapeHtml(order.productName)} | SKU ${escapeHtml(order.sku)} | ${escapeHtml(order.location)}
          </p>
          <p class="small">Completado: ${new Date(order.completedAt).toLocaleString("es-MX")}</p>
        </div>
        <strong>${fmtMoney(order.total)}</strong>
      </div>
    `;
    dom.ordersHistoryList.appendChild(item);
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

function findAccountById(accountId) {
  ensureDefaultUsersInState({ persist: true });
  const user = state.users.find((item) => item.id === accountId);
  if (user) return user;

  const baseUser = DEMO_USERS.find((item) => item.id === accountId);
  if (!baseUser) return null;

  const normalizedBaseUser = normalizeUser(baseUser);
  if (!normalizedBaseUser) return null;

  state.users.push(normalizedBaseUser);
  saveState();
  return normalizedBaseUser;
}

function clearAccountForm() {
  dom.accountForm.reset();
  dom.accountId.value = "";
  dom.accountPassword.required = true;
  dom.accountPassword.placeholder = "Minimo 6 caracteres";
  dom.accountSubmitBtn.textContent = "Crear cuenta";
  dom.accountCancelBtn.classList.add("hidden");
}

function editAccount(accountId) {
  ensureAccountEditModalDom();
  const user = findAccountById(accountId);
  if (!user) {
    alert("No se encontro la cuenta para editar.");
    return;
  }

  dom.accountEditId.value = user.id;
  dom.accountEditDisplayName.value = user.displayName;
  dom.accountEditUsername.value = user.username;
  dom.accountEditPassword.value = "";
  dom.accountEditRole.value = user.role;
  dom.accountEditModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  dom.accountEditUsername.focus();
}

function closeAccountEditModal() {
  ensureAccountEditModalDom();
  dom.accountEditForm.reset();
  dom.accountEditId.value = "";
  dom.accountEditModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function toggleAccountPassword(button) {
  if (!currentUser || currentUser.role !== "admin") {
    alert("Solo el administrador puede ver contrasenas.");
    return;
  }

  const user = findAccountById(button.dataset.id);
  if (!user) {
    alert("No se encontro la cuenta.");
    return;
  }

  const row = button.closest("tr");
  const value = row?.querySelector(".account-password-value");
  if (!value) return;

  const isVisible = button.dataset.visible === "true";
  if (isVisible) {
    value.textContent = "******";
    button.textContent = "Mostrar";
    button.dataset.visible = "false";
    return;
  }

  value.textContent = user.password;
  button.textContent = "Ocultar";
  button.dataset.visible = "true";
}

function saveEditedAccount(event) {
  event.preventDefault();

  if (!currentUser || currentUser.role !== "admin") {
    alert("Solo el administrador puede editar cuentas.");
    return;
  }

  ensureDefaultUsersInState({ persist: true });

  const accountId = dom.accountEditId.value.trim();
  const existingUser = findAccountById(accountId);
  const username = dom.accountEditUsername.value.trim();
  const password = dom.accountEditPassword.value;
  const displayName = dom.accountEditDisplayName.value.trim() || username;
  const role = dom.accountEditRole.value;

  if (!existingUser) {
    alert("La cuenta que intentas editar ya no existe.");
    closeAccountEditModal();
    renderAccountsTable();
    return;
  }

  if (!username) {
    alert("Completa usuario.");
    return;
  }

  if (!/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
    alert("El usuario debe tener 3 a 32 caracteres y solo puede usar letras, numeros, punto, guion o guion bajo.");
    return;
  }

  if (password && password.length < 6) {
    alert("La contrasena debe tener al menos 6 caracteres.");
    return;
  }

  if (!isValidRole(role)) {
    alert("Jerarquia invalida.");
    return;
  }

  const usernameExists = state.users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase() && user.id !== accountId
  );
  if (usernameExists) {
    alert("Ese usuario ya existe.");
    return;
  }

  const adminCount = state.users.filter((user) => user.role === "admin").length;
  if (existingUser.role === "admin" && role !== "admin" && adminCount <= 1) {
    alert("Debe existir al menos una cuenta administradora.");
    return;
  }

  existingUser.username = username;
  existingUser.password = password || existingUser.password;
  existingUser.role = role;
  existingUser.displayName = displayName;

  if (currentUser && currentUser.id === existingUser.id) {
    currentUser = existingUser;
    saveSession(currentUser);
    applyRoleAccess();
    ensureActiveViewForRole();
    setCurrentUserBadge();
  }

  closeAccountEditModal();
  saveState();
  renderAccountsTable();
  alert("Cuenta actualizada correctamente.");
}

function saveAccount(event) {
  event.preventDefault();

  if (!currentUser || currentUser.role !== "admin") {
    alert("Solo el administrador puede crear o editar cuentas.");
    return;
  }

  ensureDefaultUsersInState({ persist: true });

  const accountId = dom.accountId.value.trim();
  const isEditing = Boolean(accountId);
  const existingUser = isEditing ? findAccountById(accountId) : null;
  const username = dom.accountUsername.value.trim();
  const password = dom.accountPassword.value;
  const displayName = dom.accountDisplayName.value.trim() || username;
  const role = dom.accountRole.value;

  if (isEditing && !existingUser) {
    alert("La cuenta que intentas editar ya no existe.");
    clearAccountForm();
    renderAccountsTable();
    return;
  }

  if (!username || (!isEditing && !password)) {
    alert("Completa usuario y contrasena.");
    return;
  }

  if (!/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
    alert("El usuario debe tener 3 a 32 caracteres y solo puede usar letras, numeros, punto, guion o guion bajo.");
    return;
  }

  if (password && password.length < 6) {
    alert("La contrasena debe tener al menos 6 caracteres.");
    return;
  }

  if (!isValidRole(role)) {
    alert("Jerarquia invalida.");
    return;
  }

  const usernameExists = state.users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase() && user.id !== accountId
  );
  if (usernameExists) {
    alert("Ese usuario ya existe.");
    return;
  }

  if (isEditing) {
    const adminCount = state.users.filter((user) => user.role === "admin").length;
    if (existingUser.role === "admin" && role !== "admin" && adminCount <= 1) {
      alert("Debe existir al menos una cuenta administradora.");
      return;
    }

    existingUser.username = username;
    existingUser.password = password || existingUser.password;
    existingUser.role = role;
    existingUser.displayName = displayName;

    if (currentUser && currentUser.id === existingUser.id) {
      currentUser = existingUser;
      saveSession(currentUser);
      applyRoleAccess();
      ensureActiveViewForRole();
      setCurrentUserBadge();
    }
  } else {
    state.users.push({
      id: uid(),
      username,
      password,
      role,
      displayName,
      base: false
    });
  }

  clearAccountForm();
  saveState();
  renderAccountsTable();
  alert(isEditing ? "Cuenta actualizada correctamente." : "Cuenta creada correctamente.");
}

function deleteAccount(accountId) {
  if (!currentUser || currentUser.role !== "admin") {
    alert("Solo el administrador puede eliminar cuentas.");
    return;
  }

  const user = findAccountById(accountId);
  if (!user) return;

  if (currentUser.id === user.id) {
    alert("No puedes eliminar la cuenta con la sesion activa.");
    return;
  }

  if (isBaseUser(user)) {
    alert("Las cuentas base del sistema no se pueden eliminar.");
    return;
  }

  const adminCount = state.users.filter((item) => item.role === "admin").length;
  if (user.role === "admin" && adminCount <= 1) {
    alert("Debe existir al menos una cuenta administradora.");
    return;
  }

  const ok = confirm(`Deseas eliminar la cuenta ${user.username}?`);
  if (!ok) return;

  state.users = state.users.filter((item) => item.id !== accountId);
  if (dom.accountId.value === accountId) clearAccountForm();
  saveState();
  renderAccountsTable();
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

function saveCashflowStoreCapital(event) {
  event.preventDefault();
  const value = Number(dom.cashflowStoreCapital.value || 0);

  if (!Number.isFinite(value) || value < 0) {
    alert("El capital general debe ser un numero valido mayor o igual a 0.");
    return;
  }

  state.cashflow.storeCapital = Number(value.toFixed(2));
  saveState();
  renderCashflow();
  alert("Capital general de tienda actualizado.");
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
    cashflow: state.cashflow,
    orders: state.orders
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
  selectedSupplierId = "";
  selectedOrderId = null;
  ordersHistoryVisible = false;
  selectedOrdersHistoryMonth = "";
  saveState();
  renderAll();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function bindEvents() {
  ensureAccountEditModalDom();

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
  dom.accountForm.addEventListener("submit", saveAccount);
  dom.accountCancelBtn.addEventListener("click", clearAccountForm);
  dom.accountEditForm?.addEventListener("submit", saveEditedAccount);
  dom.accountEditClose?.addEventListener("click", closeAccountEditModal);
  dom.accountEditCancel?.addEventListener("click", closeAccountEditModal);
  dom.accountEditModal?.addEventListener("click", (event) => {
    if (event.target === dom.accountEditModal) closeAccountEditModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dom.accountEditModal.classList.contains("hidden")) {
      closeAccountEditModal();
    }
  });
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    if (btn.dataset.action === "edit-account") {
      event.preventDefault();
      editAccount(btn.dataset.id);
      return;
    }
    if (btn.dataset.action === "delete-account") {
      event.preventDefault();
      deleteAccount(btn.dataset.id);
      return;
    }
    if (btn.dataset.action === "toggle-password") {
      event.preventDefault();
      toggleAccountPassword(btn);
    }
  });
  dom.cashflowForm.addEventListener("submit", saveCashflowInitialCapital);
  dom.cashflowStoreCapitalForm.addEventListener("submit", saveCashflowStoreCapital);
  dom.cashflowRegisterSelect.addEventListener("change", onCashflowRegisterSelectionChange);
  dom.providersGrid.addEventListener("click", (event) => {
    const btn = event.target.closest(".provider-tile");
    if (!btn) return;
    openSupplierOrderPanel(btn.dataset.supplierId);
  });
  dom.supplierOrderClose.addEventListener("click", closeSupplierOrderPanel);
  dom.supplierOrderForm.addEventListener("submit", saveSupplierOrder);
  dom.supplierOrderQuantity.addEventListener("input", updateSupplierOrderTotal);
  dom.supplierOrderUnitCost.addEventListener("input", updateSupplierOrderTotal);
  dom.openOrdersList.addEventListener("click", (event) => {
    const btn = event.target.closest(".open-order-button");
    if (!btn) return;
    selectedOrderId = btn.dataset.orderId;
    renderOrdersControl();
  });
  dom.orderChecklistPanel.addEventListener("change", (event) => {
    const checkbox = event.target.closest("input[type='checkbox'][data-check]");
    if (!checkbox) return;
    updateOrderCheck(checkbox.dataset.check, checkbox.checked);
  });
  dom.ordersHistoryToggle.addEventListener("click", toggleOrdersHistory);
  dom.ordersHistoryMonth.addEventListener("change", () => {
    selectedOrdersHistoryMonth = dom.ordersHistoryMonth.value;
    renderOrdersHistory();
  });
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

window.__posOpenAccountEditor = editAccount;
window.editAccount = editAccount;

function init() {
  ensureDefaultUsersInState({ persist: true });
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

  if (window.__pendingAccountEditId) {
    const pendingAccountId = window.__pendingAccountEditId;
    window.__pendingAccountEditId = "";
    editAccount(pendingAccountId);
  }
}

init();
