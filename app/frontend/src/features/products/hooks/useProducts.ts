import { useEffect, useState } from 'react';
import { getProducts, type Product } from '../services/products.service';

type ProductsState = {
  products: Product[];
  error: string | null;
  isLoading: boolean;
};

export function useProducts(): ProductsState & { reload: () => void } {
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState<ProductsState>({ products: [], error: null, isLoading: true });

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then((products) => isMounted && setState({ products, error: null, isLoading: false }))
      .catch(() => isMounted && setState({ products: [], error: 'No se pudieron cargar los productos.', isLoading: false }));
    return () => { isMounted = false; };
  }, [reloadKey]);

  return { ...state, reload: () => setReloadKey((key) => key + 1) };
}
