# Evidencia Git y GitHub

## Repositorio y estado verificado

`git remote -v` devuelve `https://github.com/EmmanuelOrtizReyes/repositorio-tercera-semana.git`. La rama local verificada es `master`; no hay ramas de trabajo adicionales ni Pull Request verificable localmente.

## Ramas

- `main`: versión estable.
- `feature/products-mvp`: funcionalidad de productos.
- `feature/accessibility-docs`: accesibilidad, responsive y documentación.
- `test/backend`: pruebas.

## Commits recomendados

Usar commits pequeños con Conventional Commits, por ejemplo `feat: add product registration form`, `fix: improve client validation`, `test: add products service tests` y `docs: add accessibility checklist`.

## Pull Request

1. Crear una rama desde `main`.
2. Confirmar build y pruebas.
3. Publicar la rama en GitHub.
4. Abrir un PR hacia `main` con resumen, pruebas y capturas.
5. Capturar repositorio, ramas, commits y PR en `docs/evidencias/github/`. No se generan estas capturas automáticamente.
