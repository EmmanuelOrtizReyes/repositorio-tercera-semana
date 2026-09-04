import { API_BASE_URL } from '../../../shared/services/api';

export type Product = { id: number; name: string; description?: string | null; price: number | string; stock: number; category?: string | null };

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error(`No se pudieron cargar los productos (${response.status}).`);
  return response.json() as Promise<Product[]>;
}

export type CreateProduct = Pick<Product, 'name' | 'description' | 'price' | 'stock'> & { category?: string };

export async function createProduct(product: CreateProduct): Promise<Product> {
  const token = localStorage.getItem('dulces_emma_token');
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('No fue posible guardar el producto.');
  return response.json() as Promise<Product>;
}
