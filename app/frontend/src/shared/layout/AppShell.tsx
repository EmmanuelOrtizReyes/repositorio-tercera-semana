import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../features/auth/services/auth.service';

type AppShellProps = { children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const user = authService.user();
  const [menuOpen, setMenuOpen] = useState(false);
  function logout() {
    authService.logout();
    navigate('/login');
  }
  return (
    <div className="app-layout">
      {menuOpen && <button className="sidebar-overlay" type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}
      <aside id="main-sidebar" className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} aria-label="Navegación principal">
        <div>
          <p className="brand">Dulces Emma</p>
          <nav>
            <NavLink to="/home" end onClick={() => setMenuOpen(false)}>Inicio</NavLink>
            <NavLink to="/products/new" onClick={() => setMenuOpen(false)}>Agregar producto</NavLink>
          </nav>
        </div>
        <button type="button" className="logout-button" onClick={logout}>Cerrar sesión</button>
      </aside>
      <div className="app-content">
        <header className="app-header">
          <div className="header-title">
            <button type="button" className="menu-button" aria-expanded={menuOpen} aria-controls="main-sidebar" onClick={() => setMenuOpen((open) => !open)}>Menú</button>
            <p>Panel de control</p>
          </div>
          <p>Hola, <strong>{user?.name || 'Usuario'}</strong></p>
        </header>
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}
