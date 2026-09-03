# Dulces Emma Project Evidence

## 1. Two or more related tables
**Requirement:** `users`, `sales`, `sale_items`, and `products` have real one-to-many relationships. **Files:** `app/backend/prisma/schema.prisma`, `database/create_tables.sql`. **Responsible code:** Prisma relation fields. **How to test:** inspect the schema or run `\d sales` and `\d sale_items`. **Expected result:** related tables are visible.

## 2. Primary and foreign keys
**Requirement:** every domain table has a primary key; `sales.user_id`, `sale_items.sale_id`, and `sale_items.product_id` are foreign keys. **Files:** `app/backend/prisma/schema.prisma`, `database/create_tables.sql`. **Responsible code:** `@id` and `@relation`. **How to test:** run `\d+ sales` and `\d+ sale_items`. **Expected result:** PK and FK constraints are listed.

## 3. Table creation script
**Requirement:** PostgreSQL SQL includes `CREATE TABLE`, `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, and suitable types. **File:** `database/create_tables.sql`. **How to test:** run `psql ... -f database/create_tables.sql` on an empty database. **Expected result:** all tables are created.

## 4. SQL queries
**Requirement:** catalog, low stock, sales with users, and sale detail queries. **File:** `database/queries.sql`. **Responsible code:** product SELECT and JOIN statements. **How to test:** execute each query. **Expected result:** related catalog, user, and sale detail rows.

## 5. Inserts and updates
**Requirement:** product INSERT and inventory UPDATE examples. **Files:** `database/queries.sql`, `database/seed.sql`. **How to test:** execute them and query `products`. **Expected result:** candy products and updated stock are visible.

## 6. Real transaction
**Requirement:** a sale validates products and stock, creates the sale and items, calculates totals, and decreases inventory atomically. **File:** `app/backend/src/sales/sales.service.ts`. **Responsible code:** `SalesService.create` and `prisma.$transaction`. **How to test:** call `POST /sales`, then test insufficient stock. **Expected result:** successful sales update stock; failures leave no partial sale.

## 7. COMMIT example
**Requirement:** educational transaction ending in `COMMIT`. **File:** `database/transaction_examples.sql`. **How to test:** run the first block. **Expected result:** the sale and inventory change remain saved.

## 8. ROLLBACK example
**Requirement:** educational transaction ending in `ROLLBACK` and documentation of Prisma rollback behavior. **Files:** `database/transaction_examples.sql`, `app/backend/src/sales/sales.service.ts`. **How to test:** run the second block. **Expected result:** no changes from the failed transaction remain.

## 9. GET endpoint
**Requirement:** `GET /products` and `GET /products/:id`. **File:** `app/backend/src/products/products.controller.ts`. **Responsible code:** `@Get()` handlers. **How to test:** call the endpoints in Postman. **Expected result:** HTTP 200 with product JSON.

## 10. POST endpoint
**Requirement:** `POST /products` creates a product through a DTO. **Files:** `app/backend/src/products/products.controller.ts`, `products.service.ts`. **How to test:** send a valid authenticated request. **Expected result:** HTTP 201 and the created product.

## 11. Input validation
**Requirement:** DTOs validate names, prices, stock, and sale quantities; the global pipe uses whitelist, transform, and forbid-non-whitelisted settings. **Files:** product and sale DTOs, `app/backend/src/main.ts`. **How to test:** send negative, decimal, missing, or unknown fields. **Expected result:** HTTP 400.

## 12. HTTP status handling
**Requirement:** standard NestJS exceptions and guards produce appropriate HTTP codes. **Files:** auth, product, and sale controllers/services. **Responsible code:** `NotFoundException`, `ConflictException`, `UnauthorizedException`, and `AuthGuard`. **How to test:** try invalid input, missing token, missing product, and insufficient stock. **Expected result:** 400, 401, 404, and 409 respectively.

## 13. Postman collection
**Requirement:** importable collection with auth, products, sales, `baseUrl`, `token`, and `productId`. **File:** `postman/Dulceria.postman_collection.json`. **How to test:** import it and run register, login, products, and sale requests. **Expected result:** requests use the configured variables and Bearer token.

## 14. Fetch consumption
**Requirement:** React loads products using native `fetch`, checks `response.ok`, and parses JSON. **Files:** `app/frontend/src/features/products/services/products.service.ts`, `ProductsPage.tsx`. **How to test:** sign in and open `/home`. **Expected result:** product names, prices, and stock are displayed.

## 15. Three applicable OWASP risks
**Requirement:** A01, A03, and A07 are analyzed with implemented and recommended mitigations. **File:** `docs/OWASP.md`. **How to test:** compare the document with JWT guards, Prisma queries, DTOs, bcrypt, and token handling. **Expected result:** each risk is clearly linked to the existing implementation.
