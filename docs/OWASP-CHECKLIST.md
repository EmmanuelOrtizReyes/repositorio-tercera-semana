# Checklist OWASP académico

- [x] Validación de entradas con DTOs y `ValidationPipe`.
- [x] Contraseñas almacenadas como hash bcrypt, nunca en texto plano.
- [x] Prisma usa consultas parametrizadas; esto reduce el riesgo de SQL Injection, pero no elimina la necesidad de revisar consultas futuras.
- [x] Rutas de escritura protegidas con JWT.
- [x] Respuestas de autenticación no exponen `password_hash`.
- [x] CORS restringido a la URL configurada y orígenes privados en desarrollo.
- [x] Secretos excluidos mediante `.gitignore` y `.env.example` sin valores reales.
- [x] Mensajes técnicos no se muestran directamente al usuario.
- [ ] Rate limiting y bloqueo ante intentos repetidos.
- [ ] Cookies HttpOnly, rotación y revocación de tokens para producción.

El análisis ampliado existente está en `docs/OWASP.md`.

## Evaluación resumida

| Control | Estado | Evidencia | Recomendación |
|---|---|---|---|
| Autenticación | Implementado | JWT, Passport y bcrypt | Evaluar cookies HttpOnly en producción |
| SQL Injection | Parcialmente mitigado | Prisma y DTOs | Revisar cualquier SQL crudo futuro |
| Secretos | Implementado | `.env` ignorado y example sin secretos | Usar gestor de secretos |
| CORS | Implementado | Configuración en `main.ts` | Revisar dominios productivos |
| Autorización | Parcial | Guards en escritura | Agregar roles si crece el sistema |
| Rate limiting | Pendiente | No existe implementación | Incorporar antes de producción |
