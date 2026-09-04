-- Esquema PostgreSQL equivalente a backend/prisma/schema.prisma.
CREATE TABLE users (
    id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products (
    id SERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, description VARCHAR(500),
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0), stock INTEGER NOT NULL CHECK (stock >= 0),
    category VARCHAR(100), created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sales (
    id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL, total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT sales_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY, sale_id INTEGER NOT NULL, product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0), unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price > 0),
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    CONSTRAINT sale_items_sale_fk FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    CONSTRAINT sale_items_product_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
CREATE INDEX sales_user_id_idx ON sales(user_id);
CREATE INDEX sale_items_sale_id_idx ON sale_items(sale_id);
CREATE INDEX sale_items_product_id_idx ON sale_items(product_id);
