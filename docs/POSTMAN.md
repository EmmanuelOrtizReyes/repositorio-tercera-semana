# Postman

## Archivo

La colección real es `postman/Dulceria.postman_collection.json`, formato Postman Collection v2.1.

## Importación

1. Abrir Postman.
2. Elegir **Import**.
3. Seleccionar el archivo de la ruta indicada.
4. Confirmar que exista `baseUrl`.

## Orden recomendado

1. Registro: `POST /auth/register`.
2. Login: `POST /auth/login`.
3. Copiar el `accessToken` en la variable `token` de la colección.
4. Listar productos: `GET /products`.
5. Crear producto: `POST /products` con Bearer token.
6. Consultar producto: `GET /products/{{productId}}`.
7. Probar venta si hay productos y token válidos.

## Evidencias

Capturar request, URL, status HTTP y response de GET y POST. Guardar en `docs/evidencias/postman/`. Las capturas deben tomarse manualmente.
