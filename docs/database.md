# Modelo relacional

Dulces Emma usa PostgreSQL mediante Prisma.

## Entidades

- `users`: usuarios registrados. PK: `id`; `email` es único.
- `products`: catálogo e inventario. PK: `id`.
- `sales`: ventas registradas. PK: `id`; FK `user_id` referencia `users.id`.
- `sale_items`: detalle de cada venta. PK: `id`; FK `sale_id` referencia `sales.id` y FK `product_id` referencia `products.id`.

## Relaciones

- Un usuario puede registrar muchas ventas (`users 1:N sales`).
- Una venta tiene muchos renglones (`sales 1:N sale_items`).
- Un producto puede aparecer en muchos renglones (`products 1:N sale_items`).

Las llaves primarias identifican cada registro. Las llaves foráneas mantienen la integridad entre tablas. El esquema SQL equivalente está en `database/create_tables.sql` y el modelo Prisma en `app/backend/prisma/schema.prisma`.

## Campos principales

### `users`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Int | PK autoincremental |
| `name` | VarChar(100) | Nombre |
| `email` | VarChar(150) | Único |
| `password_hash` | VarChar(255) | Hash bcrypt |
| `created_at`, `updated_at` | Timestamp | Fechas |

### `products`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Int | PK |
| `name` | VarChar(120) | Nombre |
| `description` | VarChar(500), nullable | Descripción |
| `price` | Decimal(10,2) | Precio |
| `stock` | Int | Inventario |
| `category` | VarChar(100), nullable | Categoría |
| `created_at`, `updated_at` | Timestamp | Fechas |

### `sales` y `sale_items`

`sales` contiene `id`, `user_id`, `total` y `created_at`. `sale_items` contiene `id`, `sale_id`, `product_id`, `quantity`, `unit_price` y `subtotal`.

## Integridad y Prisma

El SQL define `NOT NULL`, checks de precio, stock y cantidades, además de las claves foráneas. `sale_items.sale_id` usa `ON DELETE CASCADE`. PostgreSQL es la fuente inicial: el proyecto usa `prisma db pull` y `prisma generate`; no hay migraciones Prisma versionadas.
