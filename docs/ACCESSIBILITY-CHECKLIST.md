# Checklist básico de accesibilidad

- [x] Documento HTML con `lang="es"`.
- [x] Formularios con labels explícitamente asociados a sus controles.
- [x] Controles nativos (`button`, `input`, enlaces).
- [ ] Mensajes de error asociados mediante `aria-describedby` en todos los formularios; el formulario de producto sí lo implementa, pero login/registro requieren revisión adicional.
- [x] `aria-invalid` y `aria-describedby` en el formulario de productos.
- [x] Foco visible con `:focus-visible`.
- [x] Encabezados jerárquicos en las pantallas principales.
- [x] Diseño responsive.
- [ ] Validación automática con W3C y auditoría completa de contraste.
- [N/A] Texto alternativo: actualmente no hay imágenes informativas en la interfaz.

## Verificación manual de teclado

1. Cargar la aplicación sin usar mouse.
2. Presionar Tab para recorrer enlaces, inputs y botones.
3. Usar Shift+Tab para regresar.
4. Probar Enter en enlaces y botones; Space en botones.
5. Confirmar foco visible y guardar captura en `docs/evidencias/accessibility/`.
