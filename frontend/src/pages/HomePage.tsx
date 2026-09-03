import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { getProducts, Product } from "../services/products.service";
export function HomePage() {
  const navigate = useNavigate();
  const user = authService.user();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { getProducts().then(setProducts).catch(() => setError("No se pudieron cargar los productos.")); }, []);
  function logout() {
    authService.logout();
    navigate("/login");
  }
  return (
    <main className="page">
      <section className="card home">
        <div className="brand">Dulces Emma</div>
        <h1>Hola, {user?.name || "amiga"}</h1>
        <p>Has iniciado sesión correctamente.</p>
        <button onClick={logout}>Cerrar sesión</button>
      </section>
      <section className="card products">
        <h2>Productos</h2>
        {error && <p className="message error">{error}</p>}
        {!error && products.length === 0 && <p>Cargando productos…</p>}
        <ul>{products.map((product) => <li key={product.id}><span>{product.name}</span><span>${Number(product.price).toFixed(2)} · Stock: {product.stock}</span></li>)}</ul>
      </section>
    </main>
  );
}
