import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/auth.service";
export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("Las contraseñas no coinciden.");
    setLoading(true);
    try {
      await authService.register(name.trim(), email.trim(), password);
      navigate("/login", {
        state: {
          success: "Cuenta creada correctamente. Ya puedes iniciar sesión.",
        },
      });
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : 0;
      setError(
        !status
          ? "No se pudo conectar con el servidor."
          : status === 409
            ? "Este correo ya está registrado."
            : "No se pudo crear la cuenta. Revisa los datos.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="page">
      <section className="card">
        <div className="brand">Dulces Emma</div>
        <h1>Crear cuenta</h1>
        <form onSubmit={submit}>
          <label>
            Nombre
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
            />
          </label>
          <label>
            Correo
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
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirmar contraseña
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          {error && <p className="message error">{error}</p>}
          <button disabled={loading}>
            {loading ? "Creando…" : "Crear cuenta"}
          </button>
        </form>
        <p className="switch">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  );
}
