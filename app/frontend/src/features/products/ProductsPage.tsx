import { useNavigate } from "react-router-dom";
import { authService } from "../auth/services/auth.service";
import { ProductList } from "./components/ProductList";
import { useProducts } from "./hooks/useProducts";
import { AppShell } from "../../shared/layout/AppShell";

export function ProductsPage() {
  const navigate = useNavigate();
  const user = authService.user();
  const { products, error, isLoading } = useProducts();
  function logout() {
    authService.logout();
    navigate("/login");
  }
  return (
    <AppShell>
      <section className="card home">
        <div className="brand">Dulces Emma</div>
        <h1>Hola, {user?.name || "amiga"}</h1>
        <p>Has iniciado sesión correctamente.</p>
        <button onClick={logout}>Cerrar sesión</button>
      </section>
      <section className="card products">
        <h2>Productos</h2>
        {error && <p className="message error">{error}</p>}
        {isLoading && <p>Cargando productos…</p>}
        {!isLoading && !error && products.length === 0 && <p>No hay productos registrados.</p>}
        {!isLoading && !error && products.length > 0 && <ProductList products={products} />}
      </section>
    </AppShell>
  );
}
