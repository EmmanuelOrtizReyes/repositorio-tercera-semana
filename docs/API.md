# API REST

## Base URL

En desarrollo: `http://localhost:3000`. Postman usa `{{baseUrl}}`.

## Autenticación

Las rutas protegidas usan:

```http
Authorization: Bearer <accessToken>
```

## `POST /auth/register`

Request real según `RegisterDto`:

```json
{"name":"Cliente Demo","email":"demo@dulces.test","password":"password123"}
```

Respuesta producida por `AuthService`:

```json
{"user":{"id":1,"name":"Cliente Demo","email":"demo@dulces.test"}}
```

Usa `201` al crear, `400` para datos inválidos y `409` para correo duplicado.

## `POST /auth/login`

```json
{"email":"demo@dulces.test","password":"password123"}
```

Devuelve `accessToken` y usuario público. Credenciales incorrectas producen `401`.

## `GET /auth/profile`

Requiere JWT y devuelve el usuario validado por `JwtStrategy`. Sin token válido produce `401`.

## `GET /products`

Devuelve un arreglo ordenado por nombre. Cada producto contiene los campos reales de Prisma: `id`, `name`, `description`, `price`, `stock`, `category`, `created_at` y `updated_at`.

## `GET /products/:id`

Recibe un ID entero y devuelve el producto. Un producto inexistente produce `404`; un ID no entero produce `400`.

## `POST /products`

Requiere JWT y recibe:

```json
{"name":"Mazapán","description":"Mazapán de cacahuate","price":8.5,"stock":50,"category":"Dulces tradicionales"}
```

Devuelve el producto creado con `201`; datos inválidos producen `400`.

## `POST /sales`

Requiere JWT y recibe:

```json
{"items":[{"productId":1,"quantity":2}]}
```

Valida productos y stock, crea venta y detalle, calcula el total y descuenta inventario mediante una transacción Prisma. Puede producir `400`, `401`, `404` o `409`.
