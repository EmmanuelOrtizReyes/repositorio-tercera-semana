# Dulces Emma

## Descripción

Dulces Emma es una aplicación web académica para gestionar usuarios, consultar productos y registrar productos de una dulcería.

## Objetivo

Proyecto Integrador Final para demostrar frontend, API REST, autenticación, persistencia relacional, validación, pruebas y documentación técnica.

## Tecnologías

- Frontend: React, Vite, TypeScript, Fetch y React Router.
- Backend: NestJS, TypeScript, API REST, JWT y bcrypt.
- Base de datos: PostgreSQL y Prisma ORM.
- Testing: Jest, ts-jest y Supertest.
- Herramientas: pnpm, Docker y Postman.

## Arquitectura

```text
React → API REST → NestJS → Prisma → PostgreSQL
```

El frontend consume productos mediante Fetch y autenticación mediante Axios. NestJS organiza controllers, services, DTOs y guards. Prisma accede a PostgreSQL.

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión con JWT.
- Ruta protegida.
- Dashboard con resumen y consulta de productos.
- Registro de productos.
- Registro de ventas mediante `POST /sales` con actualización transaccional de stock.
- PWA básica con manifest, icono y service worker.

## Estructura

```text
app/
├── backend/
│   ├── prisma/
│   ├── src/auth/
│   ├── src/products/
│   ├── src/sales/
│   └── test/
└── frontend/src/
database/
docs/
postman/
```

## Requisitos previos

Node.js 20+, pnpm 9+, PostgreSQL disponible y Docker si la base se ejecuta en contenedor.

## Instalación

Desde la raíz:

```bash
pnpm install
cp app/backend/.env.example app/backend/.env
cp app/frontend/.env.example app/frontend/.env
pnpm --filter @dulces-emma/backend prisma:generate
```

## Variables de entorno

Ejemplo para `app/backend/.env`:

```env
PORT=3000
DATABASE_URL="postgresql://usuario:password@127.0.0.1:5434/dulces_emma?schema=public"
JWT_SECRET="example-secret"
JWT_EXPIRES_IN="1d"
FRONTEND_URL="http://localhost:5173"
```

En `app/frontend/.env`, `VITE_API_URL` puede quedar vacío para usar el proxy de Vite, o configurarse como `http://localhost:3000`. Los secretos no deben versionarse.

## Base de datos con Docker

No existe `docker-compose.yml` versionado en este repositorio. Verifica el contenedor local:

```bash
docker ps -a
```

Si el contenedor local se llama `dulces-emma-postgres`:

```bash
docker start dulces-emma-postgres
docker ps
```

El modelo es database-first; consulta [docs/database.md](docs/database.md).

## Ejecutar

Backend:

```bash
pnpm --filter @dulces-emma/backend start:dev
```

Frontend, en otra terminal:

```bash
pnpm --filter @dulces-emma/frontend dev
```

Todo junto:

```bash
pnpm run dev
```

URLs habituales: `http://localhost:5173` y `http://localhost:3000`.

## Build y pruebas

```bash
pnpm run build
pnpm --filter @dulces-emma/backend test
pnpm --filter @dulces-emma/backend test:e2e
```

La E2E requiere PostgreSQL activo y `DATABASE_URL` válida. Consulta [docs/TESTING.md](docs/TESTING.md) para los resultados verificados.

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registra usuario |
| POST | `/auth/login` | Autentica y devuelve JWT |
| GET | `/auth/profile` | Devuelve perfil autenticado |
| GET | `/products` | Lista productos |
| GET | `/products/:id` | Consulta un producto |
| POST | `/products` | Crea producto autenticado |
| POST | `/sales` | Registra venta autenticada |

## Postman

La colección está en [postman/Dulceria.postman_collection.json](postman/Dulceria.postman_collection.json). Usa `{{baseUrl}}`; el procedimiento está en [docs/POSTMAN.md](docs/POSTMAN.md).

## Accesibilidad, seguridad y evidencias

- [Accesibilidad](docs/ACCESSIBILITY-CHECKLIST.md)
- [OWASP](docs/OWASP-CHECKLIST.md)
- [Guía de evidencias](docs/evidencias/README.md)
- [Índice de documentación](docs/README.md)

## Autor

Emmanuel Ortiz Reyes
