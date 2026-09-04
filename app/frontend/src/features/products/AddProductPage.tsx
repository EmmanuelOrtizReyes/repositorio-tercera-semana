import { useState, type FormEvent } from 'react';
import { AppShell } from '../../shared/layout/AppShell';
import { createProduct } from './services/products.service';

export function AddProductPage() {
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  async function submitProduct(event: FormEvent) {
    event.preventDefault(); setFormError(''); setSuccess('');
    const price = Number(form.price); const stock = Number(form.stock);
    if (!form.name.trim()) return setFormError('Escribe el nombre del producto.');
    if (!Number.isFinite(price) || price <= 0) return setFormError('El precio debe ser mayor que cero.');
    if (!Number.isInteger(stock) || stock < 0) return setFormError('El stock debe ser un entero mayor o igual que cero.');
    setSaving(true);
    try { await createProduct({ name: form.name.trim(), description: form.description.trim() || undefined, price, stock }); setForm({ name: '', description: '', price: '', stock: '' }); setSuccess('Producto registrado correctamente.'); }
    catch { setFormError('No pudimos guardar el producto.'); }
    finally { setSaving(false); }
  }
  return (
    <AppShell>
      <section className="dashboard-intro" aria-labelledby="add-product-title">
        <p className="eyebrow">Inventario</p>
        <h1 id="add-product-title">Agregar producto</h1>
        <p>Registra un nuevo dulce para mantener actualizado el inventario.</p>
      </section>
      <section className="card product-form-card" aria-label="Formulario para agregar producto">
        <form onSubmit={submitProduct} noValidate>
          <label htmlFor="product-name">Nombre<input id="product-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} aria-invalid={Boolean(formError)} aria-describedby="product-error" /></label>
          <label htmlFor="product-description">Descripción<input id="product-description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} aria-describedby="product-error" /></label>
          <div className="form-row">
            <label htmlFor="product-price">Precio<input id="product-price" type="number" min="0.01" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} aria-invalid={Boolean(formError)} aria-describedby="product-error" /></label>
            <label htmlFor="product-stock">Stock<input id="product-stock" type="number" min="0" step="1" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} aria-invalid={Boolean(formError)} aria-describedby="product-error" /></label>
          </div>
          {formError && <p id="product-error" className="message error" role="alert">{formError}</p>}
          {success && <p className="message success" role="status">{success}</p>}
          <button disabled={saving}>{saving ? 'Guardando…' : 'Registrar producto'}</button>
        </form>
      </section>
    </AppShell>
  );
}
