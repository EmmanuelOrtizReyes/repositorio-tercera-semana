# Validaciones y errores

## Cliente

- Login: email, contraseña requerida y mínimo de 8 caracteres.
- Registro: nombre de 2 a 100 caracteres, email, contraseña mínima de 8 y confirmación coincidente.
- Producto: nombre requerido, precio mayor a cero y stock entero mayor o igual a cero.

Los formularios muestran mensajes en la interfaz y no usan `alert()`.

## Servidor

`main.ts` configura `ValidationPipe` global con `whitelist`, `transform` y `forbidNonWhitelisted`. Los DTOs usan `class-validator` para auth, productos y ventas.

## Códigos documentados

| Código | Significado | Ejemplo real |
|---:|---|---|
| 200 | Consulta exitosa | `GET /products`, perfil |
| 201 | Recurso creado | Registro, login, `POST /products` |
| 400 | Entrada inválida | DTO o `ParseIntPipe` |
| 401 | No autenticado | JWT inválido o credenciales incorrectas |
| 404 | Recurso inexistente | Producto no encontrado |
| 409 | Conflicto | Email duplicado o stock insuficiente |
| 500 | Error interno | Puede producirlo una falla no controlada; no hay handler personalizado documentado |

## Mensajes de usuario

El frontend usa mensajes como “No se pudo conectar con el servidor”, “Correo o contraseña incorrectos”, “No fue posible cargar los productos” y “No pudimos guardar el producto”.
