# Arquitectura

## Visión general

```text
React/Vite → API REST → NestJS → Prisma ORM → PostgreSQL
```

Frontend y backend son workspaces dentro de `app/`.

## Frontend

React Router define `/login`, `/register`, `/home` y `/products/new`. `ProtectedRoute` protege el dashboard. `AppShell` comparte header, sidebar y cierre de sesión. `useProducts` administra carga, error y productos. `products.service.ts` usa Fetch y `VITE_API_URL`/proxy.

## Backend

- `AuthModule`: registro, login, JWT y perfil.
- `ProductsModule`: consulta y creación de productos.
- `SalesModule`: ventas transaccionales.
- `UsersModule`: acceso a usuarios.
- `PrismaModule`: `PrismaService` global.

Los controllers reciben HTTP, los DTOs validan y los services ejecutan lógica. `AuthGuard('jwt')` protege operaciones autenticadas.

## Flujo de petición

1. Usuario completa un formulario.
2. React valida cuando corresponde.
3. Fetch o Axios envía la petición.
4. NestJS recibe la ruta.
5. `ValidationPipe` valida el DTO.
6. El service ejecuta la lógica.
7. Prisma consulta PostgreSQL.
8. NestJS devuelve respuesta HTTP.
9. React actualiza su estado de UI.

## Autenticación

Registro verifica correo duplicado, genera hash bcrypt y devuelve usuario público. Login compara el hash, firma un JWT y devuelve `accessToken` y usuario público. El frontend conserva el token en `localStorage`; las peticiones protegidas lo envían como Bearer.

## Productos

`GET /products` lista ordenado por nombre, `GET /products/:id` consulta uno y `POST /products` requiere JWT y `CreateProductDto`. El dashboard consulta y `/products/new` crea.

## Dependencias principales

React, React Router, Vite, Axios, NestJS, Passport/JWT, bcrypt, class-validator, Prisma, PostgreSQL, Jest, ts-jest y Supertest.
