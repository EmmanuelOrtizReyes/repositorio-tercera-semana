# Evidencias del proyecto Dulcería

## 1. Dos o más tablas relacionadas
### Evidencia
El esquema contiene `users`, `sales`, `sale_items` y `products` con relaciones 1:N.
### Archivos
`backend/prisma/schema.prisma`, `database/create_tables.sql`.
### Código relevante
`users.sales`, `sales.sale_items` y `products.sale_items`.
### Cómo demostrarlo
Abrir el esquema o ejecutar `\d sales` y `\d sale_items` en PostgreSQL. Resultado: relaciones entre tablas.

## 2. Llaves primarias y foráneas
### Evidencia
Cada tabla tiene PK; `sales.user_id`, `sale_items.sale_id` y `sale_items.product_id` son FKs.
### Archivos
`backend/prisma/schema.prisma`, `database/create_tables.sql`.
### Código relevante
`@id` y `@relation(fields: [...], references: [id])`.
### Cómo demostrarlo
Ejecutar `\d+ sales` y `\d+ sale_items`. Resultado: PK y restricciones FK visibles.

## 3. Script de creación de tablas
### Evidencia
SQL PostgreSQL real con `CREATE TABLE`, `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL` y tipos.
### Archivos
`database/create_tables.sql`.
### Código relevante
Las cuatro sentencias `CREATE TABLE`.
### Cómo demostrarlo
Ejecutar `psql ... -f database/create_tables.sql` en una base limpia.

## 4. Consultas SQL
### Evidencia
Incluye catálogo, poco stock, ventas con usuario mediante JOIN y detalle con dos JOIN.
### Archivos
`database/queries.sql`.
### Código relevante
SELECT de productos, `sales INNER JOIN users` y joins de `sale_items` con `products`.
### Cómo demostrarlo
Abrir y ejecutar cada consulta; resultado: filas del catálogo y ventas relacionadas.

## 5. Inserciones y actualizaciones
### Evidencia
Hay `INSERT INTO products` y `UPDATE products SET stock`.
### Archivos
`database/queries.sql`, `database/seed.sql`.
### Código relevante
Inserción de Mazapán y actualización de inventario.
### Cómo demostrarlo
Ejecutar y consultar `SELECT name, stock FROM products`.

## 6. Una transacción
### Evidencia
`SalesService.create` usa `prisma.$transaction`, valida productos y stock, crea venta/detalles y descuenta inventario.
### Archivos
`backend/src/sales/sales.service.ts`.
### Código relevante
Callback de `$transaction` con creación, actualización condicionada y cálculo de total.
### Cómo demostrarlo
Enviar `POST /sales`; comprobar venta, detalles y stock. Probar stock insuficiente y comprobar que no queda venta parcial.

## 7. Ejemplo de COMMIT
### Evidencia
Ejemplo SQL con `BEGIN`, inserción, descuento y `COMMIT`.
### Archivos
`database/transaction_examples.sql`.
### Código relevante
Bloque de venta confirmada.
### Cómo demostrarlo
Ejecutar el primer bloque y consultar la venta y el stock.

## 8. Ejemplo de ROLLBACK
### Evidencia
Ejemplo SQL con error educativo y `ROLLBACK`; Prisma revierte automáticamente ante excepción.
### Archivos
`database/transaction_examples.sql`, `backend/src/sales/sales.service.ts`.
### Código relevante
`ROLLBACK` y callback de `$transaction`.
### Cómo demostrarlo
Ejecutar el segundo bloque y comprobar que no se conserva ningún cambio.

## 9. Endpoint GET
### Evidencia
`GET /products` lista productos y `GET /products/:id` obtiene uno.
### Archivos
`backend/src/products/products.controller.ts`.
### Código relevante
Métodos decorados con `@Get()`.
### Cómo demostrarlo
Ejecutar GET en Postman; resultado esperado: `200` y JSON de productos.

## 10. Endpoint POST
### Evidencia
`POST /products` crea productos usando DTO y JWT.
### Archivos
`backend/src/products/products.controller.ts`, `products.service.ts`.
### Código relevante
`@Post()` y `products.create(dto)`.
### Cómo demostrarlo
Enviar body válido con Bearer token; resultado esperado: `201`.

## 11. Validación de entradas
### Evidencia
DTOs validan nombre, precio, stock y ventas; el pipe global usa whitelist, transform y forbidNonWhitelisted.
### Archivos
`backend/src/products/dto/create-product.dto.ts`, `backend/src/sales/dto/create-sale.dto.ts`, `backend/src/main.ts`.
### Código relevante
`@IsNumber`, `@Min`, `@IsInt`, `ValidationPipe`.
### Cómo demostrarlo
Enviar precio negativo, stock decimal o campo extra; resultado esperado: `400`.

## 12. Manejo de códigos HTTP
### Evidencia
NestJS produce `200`, `201`, `400`, `401`, `404` y `409` según el caso mediante decoradores, guards y excepciones.
### Archivos
Controladores y servicios de `products`, `sales` y `auth`.
### Código relevante
`NotFoundException`, `ConflictException`, `UnauthorizedException` y `AuthGuard`.
### Cómo demostrarlo
Probar recurso inexistente, body inválido, endpoint protegido sin token y stock insuficiente.

## 13. Colección de Postman
### Evidencia
Colección importable con registro, login, productos y ventas, variables `baseUrl`, `token` y `productId`.
### Archivos
`postman/Dulceria.postman_collection.json`.
### Código relevante
Carpetas Auth, Products y Sales.
### Cómo demostrarlo
Importar JSON, ejecutar login y asignar el token antes de crear producto o venta.

## 14. Consumo de un endpoint mediante Fetch
### Evidencia
React obtiene el catálogo mediante `fetch`, verifica `response.ok` y procesa JSON.
### Archivos
`frontend/src/services/products.service.ts`, `frontend/src/pages/HomePage.tsx`.
### Código relevante
`fetch(`${API_URL}/products`)`.
### Cómo demostrarlo
Iniciar sesión y abrir `/home`; resultado esperado: nombres, precios y stock visibles.

## 15. Identificación de tres riesgos OWASP aplicables
### Evidencia
Se documentan A01, A03 y A07, separando mitigaciones existentes de recomendaciones.
### Archivos
`docs/OWASP.md`.
### Código relevante
Secciones Broken Access Control, Injection e Identification and Authentication Failures.
### Cómo demostrarlo
Abrir el documento y relacionar cada mitigación con guards, Prisma, DTOs, bcrypt y JWT del código.
