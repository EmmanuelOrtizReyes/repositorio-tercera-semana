export type Product = { id: number; name: string; description?: string | null; price: number | string; stock: number; category?: string | null };
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error(`No se pudieron cargar los productos (${response.status}).`);
  return response.json() as Promise<Product[]>;
}
