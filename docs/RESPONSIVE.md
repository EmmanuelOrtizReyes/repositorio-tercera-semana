# Diseño responsive

## Objetivo

Mantener controles utilizables y legibles en móvil, tableta y escritorio sin scroll horizontal.

## Tamaños de prueba

- Móvil: aproximadamente 390 px.
- Tableta: aproximadamente 768 px.
- Escritorio: aproximadamente 1440 px.

## Comportamiento actual

En móvil y tableta el sidebar es un panel lateral desplegable desde “Menú”, con fondo superpuesto para cerrarlo. En escritorio permanece visible a la izquierda con el contenido a la derecha.

## Media queries

- `min-width: 768px`: aumenta el espacio del contenido.
- `min-width: 1024px`: activa sidebar visible y layout de escritorio.
- `max-width: 420px`: apila resumen, campos y datos de productos.

## Verificación manual

1. Abrir DevTools y activar modo responsive.
2. Probar 390 px y abrir/cerrar “Menú”.
3. Probar 768 px y revisar que el panel no sea un header permanente.
4. Probar 1440 px y confirmar sidebar visible.
5. Revisar ausencia de scroll horizontal.
6. Guardar capturas en `docs/evidencias/responsive/`.
