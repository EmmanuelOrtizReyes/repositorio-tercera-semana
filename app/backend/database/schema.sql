-- PostgreSQL is the initial source of truth. Do not use Prisma migrations for this model.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY, sale_id INTEGER NOT NULL, product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0), unit_price NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
