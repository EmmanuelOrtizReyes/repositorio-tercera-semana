-- Ejemplo educativo de una venta confirmada.
BEGIN;
INSERT INTO sales (user_id, total) VALUES (1, 17.00) RETURNING id;
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES (1, 1, 2, 8.50, 17.00);
UPDATE products SET stock = stock - 2, updated_at = CURRENT_TIMESTAMP WHERE id = 1 AND stock >= 2;
-- Si todas las operaciones fueron exitosas, confirmamos la transacción.
COMMIT;

-- Ejemplo educativo: ante un error, se deshacen todas las operaciones.
BEGIN;
UPDATE products SET stock = stock - 999 WHERE id = 1 AND stock >= 999;
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES (999999, 1, 1, 8.50, 8.50);
-- ROLLBACK devuelve la base de datos al estado anterior cuando ocurre un error.
ROLLBACK;

-- La transacción real está en SalesService.create y Prisma hace rollback automático
-- cuando la función de prisma.$transaction lanza una excepción.
