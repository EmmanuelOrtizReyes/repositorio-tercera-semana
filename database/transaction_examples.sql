-- Educational example of a confirmed sale.
BEGIN;
INSERT INTO sales (user_id, total) VALUES (1, 17.00) RETURNING id;
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES (1, 1, 2, 8.50, 17.00);
UPDATE products SET stock = stock - 2, updated_at = CURRENT_TIMESTAMP WHERE id = 1 AND stock >= 2;
-- If every operation succeeds, confirm the transaction.
COMMIT;

-- Educational example: an error reverses all operations.
BEGIN;
UPDATE products SET stock = stock - 999 WHERE id = 1 AND stock >= 999;
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES (999999, 1, 1, 8.50, 8.50);
-- ROLLBACK returns the database to its previous state after an error.
ROLLBACK;

-- The real transaction is in SalesService.create and Prisma automatically rolls back
-- when the prisma.$transaction callback throws an exception.
