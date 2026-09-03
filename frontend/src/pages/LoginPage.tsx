import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/auth.service";
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const success = (location.state as { success?: string } | null)?.success;
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.login(email.trim(), password);
      navigate("/home");
    } catch (err) {
      setError(
        axios.isAxiosError(err) && !err.response
          ? "No se pudo conectar con el servidor."
          : "Correo o contraseña incorrectos.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="page">
      <section className="card">
        <div className="brand">Dulces Emma</div>
        <h1>Bienvenido a Dulces Emma</h1>
        {success && <p className="message">{success}</p>}
        <form onSubmit={submit}>
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="current-password"
            />
          </label>
          {error && <p className="message error">{error}</p>}
          <button disabled={loading}>
            {loading ? "Ingresando…" : "Iniciar sesión"}
          </button>
        </form>
        <p className="switch">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}
