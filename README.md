# POS Web (MVP funcional)

Aplicacion web de punto de venta para PyMES.

## Funciones incluidas
- Catalogo de productos (alta, edicion, eliminacion).
- Control de inventario y alertas de stock minimo.
- Punto de venta con carrito y cobro (efectivo/tarjeta).
- Punto de venta con cobro en efectivo, tarjeta y modo mixto (efectivo + tarjeta).
- Redondeo de total en POS: centavos hasta `.50` se cobran en `.50`; arriba de `.50` se cobra al peso completo.
- Calculo de impuesto configurable.
- Registro de ventas con folio y fecha.
- Dashboard con KPIs del dia, alertas de inventario y analitica de demanda.
- Graficas de productos mas vendidos y menos vendidos (estilo neon elegante).
- Recomendaciones inteligentes de compra/reduccion/descontinuacion segun demanda.
- Recomendaciones con cantidad sugerida de compra segun cobertura de inventario (ultimos 30 dias).
- Filtros por rango de fecha en historial.
- Vista de ticket en panel lateral al seleccionar una venta en historial.
- Apartado de flujo de caja con capital inicial editable y saldo acumulado por ventas.
- Operacion multi-caja (5 cajas demo) con inventario compartido a nivel sucursal.
- Asignacion de vendedor por caja desde POS; cada venta guarda caja y vendedor.
- Flujo de caja por caja: capital inicial, ventas y total por caja, mas total global de todas las cajas.
- Exportacion de datos en JSON.
- Persistencia local con `localStorage`.
- Configuracion editable de subtitulo, tema (oscuro/claro) y color de enfasis.
- Carga de logo del negocio desde configuracion (con opcion para quitarlo).
- El logo configurado se usa tambien como favicon del sitio.
- Interfaz responsive para desktop/movil con menu hamburguesa en pantallas pequenas.
- Sistema de cuentas con jerarquias: administrador, vendedor y almacen.
- Login inicial obligatorio con control de permisos por rol.
- Al abrir el sitio siempre se muestra primero el login.

## Cuentas demo
- Administrador: `admin` / `Admin123!` (acceso total)
- Vendedor: `vendedor` / `Venta123!` (solo POS y Ventas)
- Almacen: `almacen` / `Stock123!` (solo Inventario)

## Ejecutar
Opcion 1: abrir `index.html` en navegador.

Opcion 2: servidor local:

```bash
cd /home/tech_x/Documentos/TPS/PROYECTOS/POS-AI
python3 -m http.server 8080
```

Luego abrir `http://localhost:8080`.

## Archivos principales
- `index.html`: estructura y vistas.
- `styles.css`: estilos responsive.
- `app.js`: logica de negocio del POS.

## Siguiente fase recomendada
- API backend (usuarios, roles, caja por turno).
- Base de datos real (PostgreSQL/MySQL) y auditoria.
- Tickets PDF e integracion con impresora termica.
- Modulo de compras/proveedores y cuentas por cobrar.
- Multi-sucursal y reportes avanzados.
