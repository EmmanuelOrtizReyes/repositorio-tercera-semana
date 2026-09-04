# Historias de usuario

## HU-01 Registro

Como visitante, quiero crear una cuenta para acceder a Dulces Emma.

- Nombre, correo y contraseña son obligatorios.
- Se validan datos incorrectos.
- El correo no puede repetirse.
- Se muestra confirmación al terminar.

## HU-02 Inicio de sesión

Como usuario registrado, quiero iniciar sesión para acceder al sistema.

- Las credenciales incorrectas muestran un mensaje amigable.
- Las credenciales correctas llevan al inicio.

## HU-03 Consultar productos

Como usuario, quiero consultar los productos para conocer el inventario.

- Se muestra carga, error, vacío o la lista correspondiente.

## HU-04 Registrar producto

Como usuario, quiero registrar un producto para mantener actualizado el inventario.

- Nombre obligatorio.
- Precio mayor que cero.
- Stock entero mayor o igual que cero.
- Los datos inválidos no se guardan.
- Se muestra confirmación al guardar.

## HU-05 Registrar venta

Como usuario autenticado, quiero registrar una venta para descontar inventario.

### Criterios de aceptación

- La venta requiere al menos un producto y cantidades positivas.
- Se rechazan productos inexistentes o stock insuficiente.
- Venta, detalle y descuento se ejecutan en una transacción.
