# Testing

## Estrategia

Las pruebas se ejecutan en el backend con Jest. Las unitarias aíslan el service con un mock de Prisma; la E2E levanta el módulo NestJS y realiza HTTP con Supertest.

## Unitarias

Archivo: `app/backend/src/products/products.service.spec.ts`.

Verifica listado ordenado, producto inexistente con `NotFoundException` y creación mediante Prisma.

```bash
pnpm --filter @dulces-emma/backend test
```

Resultado verificado en la auditoría: **3 pruebas exitosas**.

## E2E

Archivo: `app/backend/test/products.e2e-spec.ts`.

Comprueba que `GET /products` responde `200` y devuelve un arreglo. Usa Jest + Supertest.

```bash
pnpm --filter @dulces-emma/backend test:e2e
```

La prueba requiere PostgreSQL activo y `DATABASE_URL` válida. En esta auditoría la prueba quedó pendiente porque no fue posible conectar con `127.0.0.1:5434`; no se afirma un resultado exitoso.

## Evidencia

1. Iniciar la base configurada.
2. Ejecutar unitarias y capturar la salida.
3. Ejecutar E2E y capturar la salida real.
4. Guardar imágenes en `docs/evidencias/testing/`.
