# Estados de interfaz

## Carga

`useProducts` comienza con `isLoading: true` y `ProductsPage` muestra “Mientras obtenemos los productos…” con `role="status"`.

## Error

Una respuesta no exitosa o falla de red muestra “No fue posible cargar los productos.”. El alta muestra “No pudimos guardar el producto.” si falla.

## Vacío

Si la carga termina sin error y no hay registros, aparece “Todavía no hay productos registrados.”.

## Éxito

Con productos se renderiza la lista. Tras un alta exitosa, `/products/new` muestra “Producto registrado correctamente.”.
