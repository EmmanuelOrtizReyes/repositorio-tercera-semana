import { ProductList } from "./components/ProductList";
import { useProducts } from "./hooks/useProducts";
import { AppShell } from "../../shared/layout/AppShell";

export function ProductsPage() {
  const { products, error, isLoading } = useProducts();
  const totalStock = products.reduce((total, product) => total + product.stock, 0);
  return (
    <AppShell>
      <section className="dashboard-intro" aria-labelledby="home-title">
        <p className="eyebrow">Inicio</p>
        <h1 id="home-title">Resumen de inventario</h1>
        <p>Consulta rápidamente los productos disponibles en Dulces Emma.</p>
      </section>
      <section className="summary-grid" aria-label="Resumen de productos">
        <article className="summary-card"><span>Productos registrados</span><strong>{isLoading ? '…' : products.length}</strong></article>
        <article className="summary-card"><span>Unidades en inventario</span><strong>{isLoading ? '…' : totalStock}</strong></article>
      </section>
      <section className="card products" aria-labelledby="products-title">
        <h2 id="products-title">Productos recientes</h2>
        {error && <p className="message error" role="alert">No fue posible cargar los productos.</p>}
        {isLoading && <p role="status">Mientras obtenemos los productos…</p>}
        {!isLoading && !error && products.length === 0 && <p>Todavía no hay productos registrados.</p>}
        {!isLoading && !error && products.length > 0 && <ProductList products={products.slice(0, 5)} />}
      </section>
    </AppShell>
  );
}
