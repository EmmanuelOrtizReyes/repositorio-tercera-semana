# Dulces Emma

MVP mobile-first para registro e inicio de sesión de una dulcería. Incluye React/Vite, NestJS, PostgreSQL, Prisma, bcrypt y JWT.

## Requisitos

Ubuntu, Node.js 20+, npm y PostgreSQL. Instálalo en Ubuntu con:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

## Configurar PostgreSQL

Los siguientes comandos crean un usuario de aplicación y la base de datos. Sustituye `una_contrasena_segura` por una contraseña propia:

```bash
sudo -u postgres psql
CREATE USER dulces_emma_user WITH PASSWORD 'una_contrasena_segura';
CREATE DATABASE dulces_emma OWNER dulces_emma_user;
\q
```

## Database First

PostgreSQL es la fuente de verdad inicial: el SQL se aplica antes de que Prisma introspeccione el modelo. No ejecutes `prisma migrate dev` para crear este esquema.

```bash
psql -U dulces_emma_user -h localhost -d dulces_emma -f backend/database/schema.sql
psql -U dulces_emma_user -h localhost -d dulces_emma -f database/seed.sql
cp backend/.env.example backend/.env
# Edita backend/.env y coloca el usuario y contraseña reales en DATABASE_URL,
# además de un JWT_SECRET largo y aleatorio.
cd backend
npx prisma db pull
npx prisma generate
cd ..
```

`db pull` actualizará `backend/prisma/schema.prisma` con el modelo introspectado desde la tabla `users` real.

## Variables de entorno

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

En `backend/.env`, configura `DATABASE_URL` y `JWT_SECRET`. El frontend usa `VITE_API_URL=http://localhost:3000` por defecto.

## Instalar y ejecutar

```bash
npm install
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

Para compilar ambos proyectos:

```bash
npm run build
```

## API

- `POST /auth/register` — nombre, correo y contraseña (mínimo 8 caracteres).
- `POST /auth/login` — devuelve `accessToken` y usuario público.
- `GET /auth/profile` — requiere `Authorization: Bearer TOKEN`.
- `GET /products` y `GET /products/:id` — catálogo de productos.
- `POST /products` — crea producto; requiere JWT.
- `POST /sales` — registra una venta y descuenta inventario en una transacción; requiere JWT.

Para una venta, envía `{ "items": [{ "productId": 1, "quantity": 2 }] }`.

## Evidencias

Importa `postman/Dulceria.postman_collection.json` en Postman. Las consultas y ejemplos SQL están en `database/`; la guía completa de presentación está en [EVIDENCIAS.md](EVIDENCIAS.md) y el análisis OWASP en [docs/OWASP.md](docs/OWASP.md).

Prueba el perfil, después de iniciar sesión, con:

```bash
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/auth/profile
```

El registro almacena exclusivamente `password_hash` con bcrypt; compruébalo con `psql -U dulces_emma_user -h localhost -d dulces_emma -c 'SELECT id,name,email,password_hash FROM users;'`.

## Nota de seguridad

El MVP guarda el token en `localStorage` para reducir complejidad. Para producción se debería evaluar una sesión basada en cookies `HttpOnly`, protección CSRF y una política de renovación de tokens.
