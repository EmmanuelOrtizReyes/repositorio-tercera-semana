# Riesgos OWASP aplicables

## A01: Broken Access Control

**Riesgo:** un usuario autenticado podría intentar crear productos o registrar ventas sin autorización adecuada.

**Mitigación implementada:** `AuthGuard('jwt')` protege `POST /products` y `POST /sales`; el usuario de la venta se obtiene del token en el servidor.

**Mitigación recomendada:** incorporar roles y permisos de administrador para separar catálogo y operación de ventas.

## A03: Injection

**Riesgo:** datos enviados al API podrían usarse para manipular consultas SQL.

**Mitigación implementada:** Prisma parametriza las consultas; no se concatena SQL con datos del usuario y los DTOs validan tipos, rangos y longitudes.

**Mitigación recomendada:** mantener revisiones de consultas raw, si fueran necesarias, y pruebas de seguridad automatizadas.

## A07: Identification and Authentication Failures

**Riesgo:** contraseñas o tokens mal protegidos podrían permitir suplantación de usuarios.

**Mitigación implementada:** bcrypt con factor 12, JWT con expiración configurable, respuesta pública sin `password_hash`, validación de credenciales y guard JWT.

**Mitigación recomendada:** cookies `HttpOnly`/`Secure`, rotación y revocación de tokens, rate limiting y gestión segura de secretos en producción. El frontend actual conserva JWT en `localStorage` como decisión del MVP.
