# Dulces Emma

Mobile-first monolith for managing a candy store. The application code lives under `app/`: React/Vite PWA in `app/frontend` and NestJS/Prisma API in `app/backend`.

## Requirements

Node.js 20+, pnpm 9+, PostgreSQL, and a configured `DATABASE_URL`.

## Database setup

PostgreSQL is the initial source of truth. Apply the SQL before introspecting Prisma. Do not use `prisma migrate dev` for this database-first setup.

```bash
psql -U dulces_emma_user -h localhost -d dulces_emma -f app/backend/database/schema.sql
psql -U dulces_emma_user -h localhost -d dulces_emma -f database/seed.sql
cp app/backend/.env.example app/backend/.env
cp app/frontend/.env.example app/frontend/.env
cd app/backend
pnpm prisma:pull
pnpm prisma:generate
cd ../..
```

Configure `DATABASE_URL`, `JWT_SECRET`, and `FRONTEND_URL` in `app/backend/.env`. Leave `VITE_API_URL` empty during development: Vite proxies `/api` to the local API and avoids browser CORS issues. Configure the public HTTPS API URL in production.

## Install and run

Run these commands from the repository root, where `package.json` and `pnpm-workspace.yaml` are located:

```bash
pnpm install
pnpm run dev
```

`pnpm run dev` and `pnpm run dev:all` start both workspaces. Vite prints the local and network URLs, normally `http://localhost:5173` and `http://YOUR_LOCAL_IP:5173`. NestJS listens on port `3000`.

Build both applications:

```bash
pnpm run build
```

The frontend includes a web manifest, icon, and service worker and can be installed as a PWA in a compatible browser.

## API

- `POST /auth/register` — name, email, and password of at least 8 characters.
- `POST /auth/login` — returns an access token and public user.
- `GET /auth/profile` — requires `Authorization: Bearer TOKEN`.
- `GET /products` and `GET /products/:id` — product catalog.
- `POST /products` — creates a product and requires JWT.
- `POST /sales` — records a sale and atomically decreases stock; requires JWT.

For a sale, send `{ "items": [{ "productId": 1, "quantity": 2 }] }`.

## Evidence

Import `postman/Dulceria.postman_collection.json` into Postman. SQL examples are in `database/`; the presentation guide is [EVIDENCIAS.md](EVIDENCIAS.md), and the OWASP analysis is [docs/OWASP.md](docs/OWASP.md).

The existing authentication flow stores only a bcrypt password hash and never returns it. The MVP stores the JWT in `localStorage`; production deployments should evaluate `HttpOnly` cookies, CSRF protection, token rotation, and rate limiting.
