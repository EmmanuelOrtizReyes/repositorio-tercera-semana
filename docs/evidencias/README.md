# Evidencias del Proyecto Integrador

Todas las capturas siguientes son manuales. Codex no inventa resultados de GitHub, W3C, freeCodeCamp, Postman ni del navegador.

## 1. GitHub

Qué demuestra: repositorio, rama, commits y PR.

Pasos: abrir el repositorio, mostrar la pestaña de código, ramas, historial y Pull Request.

Qué debe verse: nombre del repositorio, cambios y enlace del PR.

Archivo sugerido: `github-repository.png`, `github-branches.png`, `github-commits.png`, `github-pr.png`.

Ruta: `docs/evidencias/github/`.

## 2. Backlog e historias

Abrir `docs/BACKLOG.md` y `docs/USER-STORIES.md`, o el tablero creado manualmente. Mostrar HU, tareas y estados.

Archivos sugeridos: `backlog.png`, `user-stories.png` en `docs/evidencias/github/`.

## 3. Responsive

En DevTools probar 390 px, 768 px y 1440 px. Mostrar sidebar desplegable en móvil/tableta y sidebar permanente en escritorio. Verificar que no exista scroll horizontal.

Archivos: `responsive-mobile.png`, `responsive-tablet.png`, `responsive-desktop.png`.

Ruta: `docs/evidencias/responsive/`.

## 4. Navegación por teclado

Sin usar mouse, presionar Tab, Shift+Tab, Enter y Space según corresponda. Mostrar foco visible en menú, campos y botones.

Archivo: `keyboard-focus.png`.

Ruta: `docs/evidencias/accessibility/`.

## 5. Pruebas unitarias

Ejecutar:

```bash
pnpm --filter @dulces-emma/backend test
```

Qué debe verse: salida real de Jest y cantidad de suites/tests aprobados.

Archivo: `unit-tests.png` en `docs/evidencias/testing/`.

## 6. Prueba E2E

Iniciar PostgreSQL según la instalación local y ejecutar:

```bash
pnpm --filter @dulces-emma/backend test:e2e
```

Qué demuestra: NestJS, Supertest y PostgreSQL funcionando juntos. Solo guardar `e2e-pass.png` si la salida realmente muestra `PASS`.

Ruta: `docs/evidencias/testing/`.

## 7. Postman GET y POST

Importar `postman/Dulceria.postman_collection.json`, configurar `baseUrl`, ejecutar login y copiar el token si es necesario. Ejecutar GET y POST de productos.

Capturar request, status y response. Archivos `postman-get.png` y `postman-post.png` en `docs/evidencias/postman/`.

## 8. W3C y freeCodeCamp

Capturar manualmente el progreso, módulo o ejercicio visible.

Rutas: `docs/evidencias/w3c/` y `docs/evidencias/freecodecamp/`.

## 9. OWASP y accesibilidad

Abrir los checklists correspondientes y mostrar controles marcados, pendientes y recomendaciones. Guardar capturas en `docs/evidencias/accessibility/`.

## 10. Pull Request final

Crear el PR manualmente desde la rama de trabajo, seleccionar `master` como base, incluir resumen y pruebas, y guardar el enlace/captura en `docs/evidencias/github/`.
