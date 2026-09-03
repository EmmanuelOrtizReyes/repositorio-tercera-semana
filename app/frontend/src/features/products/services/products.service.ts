import { API_BASE_URL } from '../../../shared/services/api';

export type Product = { id: number; name: string; description?: string | null; price: number | string; stock: number; category?: string | null };

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error(`No se pudieron cargar los productos (${response.status}).`);
  return response.json() as Promise<Product[]>;
}
