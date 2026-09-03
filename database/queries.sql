-- Productos disponibles para el catálogo.
SELECT id, name, description, price, stock, category FROM products ORDER BY name;

-- Productos con poco inventario (umbral de ejemplo: menos de 10 unidades).
SELECT id, name, stock FROM products WHERE stock < 10 ORDER BY stock ASC;

-- Ventas junto con el usuario que las registró.
SELECT s.id, u.name AS user_name, s.total, s.created_at
FROM sales s INNER JOIN users u ON u.id = s.user_id ORDER BY s.created_at DESC;

-- Detalle de una venta con sus productos y subtotales.
SELECT s.id AS sale_id, p.name, si.quantity, si.unit_price, si.subtotal
FROM sales s INNER JOIN sale_items si ON si.sale_id = s.id
INNER JOIN products p ON p.id = si.product_id WHERE s.id = 1;

-- Inserción de un dulce de ejemplo.
INSERT INTO products (name, description, price, stock, category)
VALUES ('Mazapán', 'Mazapán de cacahuate', 8.50, 50, 'Dulces tradicionales');

-- Actualización de inventario de un producto existente.
UPDATE products SET stock = 45, updated_at = CURRENT_TIMESTAMP WHERE id = 1;
