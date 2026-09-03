import type { Product } from '../services/products.service';

type ProductListProps = { products: Product[] };

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className="product-list" aria-label="Lista de productos">
      {products.map((product) => (
        <li key={product.id}>
          <strong>{product.name}</strong>
          <span>${Number(product.price).toFixed(2)} · Stock: {product.stock}</span>
        </li>
      ))}
    </ul>
  );
}
