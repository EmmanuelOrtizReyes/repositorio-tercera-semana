-- Products available in the catalog.
SELECT id, name, description, price, stock, category FROM products ORDER BY name;

-- Low-stock products (example threshold: fewer than 10 units).
SELECT id, name, stock FROM products WHERE stock < 10 ORDER BY stock ASC;

-- Sales together with the user who recorded them.
SELECT s.id, u.name AS user_name, s.total, s.created_at
FROM sales s INNER JOIN users u ON u.id = s.user_id ORDER BY s.created_at DESC;

-- Sale detail with products and subtotals.
SELECT s.id AS sale_id, p.name, si.quantity, si.unit_price, si.subtotal
FROM sales s INNER JOIN sale_items si ON si.sale_id = s.id
INNER JOIN products p ON p.id = si.product_id WHERE s.id = 1;

-- Insert an example candy product.
INSERT INTO products (name, description, price, stock, category)
VALUES ('Mazapán', 'Mazapán de cacahuate', 8.50, 50, 'Dulces tradicionales');

-- Update inventory for an existing product.
UPDATE products SET stock = 45, updated_at = CURRENT_TIMESTAMP WHERE id = 1;
