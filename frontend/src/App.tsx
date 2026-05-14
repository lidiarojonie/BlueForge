import { useEffect, useState } from 'react';
import type { Product } from './types.ts';
import ProductCard from './components/ProductCard.tsx';
import CartSummary from './components/CartSummary.tsx'; 
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useCart } from './context/CartContext.tsx';
import { useUser } from './context/UserContext.tsx';
import { PlusCircle } from 'lucide-react';

function StoreFront() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const { customer } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const loadProducts = () => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error ", error));
  };

  const handleUpdateStock = (product: Product): void => {
    const input = window.prompt(`Stock actual: ${product.stock}. Nuevo stock: `);
    if (input === null) return;
    const newStock = parseInt(input);
    if (isNaN(newStock) || newStock < 0) {
      alert("El stock debe ser un numero mayor o igual a 0");
      return;
    }
    const updatedProduct = { ...product, stock: newStock };
    fetch(`http://localhost:3000/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(updatedProduct)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error del servidor: " + res.status);
        return res.json();
      })
      .then(() => loadProducts())
      .catch((error) => console.error("Error: ", error));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      stock: Number(formData.get('stock')),
      image_url: formData.get('imageUrl')
    };

    fetch('http://localhost:3000/api/products', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setProducts(prev => [...prev, data.products]);
          (e.target as HTMLFormElement).reset();
        }
      })
      .catch(error => console.error("Error al añadir producto:", error));
  };

  const handleDelete = (id: number): void => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error del servidor: " + res.status);
        return res.json();
      })
      .then(() => loadProducts())
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 font-sans min-h-screen bg-[#050505]">
      
      {/* PANEL DE ADMINISTRADOR: AÑADIR PRODUCTO */}
      {customer?.role === 'admin' && (
        <div className="mb-12 bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-[2rem] p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <PlusCircle size={28} />
            </div>
            <h3 className="text-2xl font-black text-white">Añadir Nuevo Producto</h3>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="name">Nombre del producto</label>
              <input type="text" id="name" name="name" required placeholder="Ej: DualSense Edge" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="category">Categoría</label>
              <input type="text" id="category" name="category" placeholder="Ej: Mandos" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="price">Precio (€)</label>
              <input type="number" step="0.01" id="price" name="price" required placeholder="0.00" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="stock">Stock Inicial</label>
              <input type="number" id="stock" name="stock" placeholder="0" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="imageUrl">URL de la Imagen</label>
              <input type="text" id="imageUrl" name="imageUrl" placeholder="https://ejemplo.com/imagen.png" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2 lg:col-span-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="description">Descripción</label>
              <input type="text" id="description" name="description" placeholder="Breve descripción del producto..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
            </div>

            <div className="lg:col-span-3 flex justify-end mt-4">
              <button type="submit" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center gap-2">
                <PlusCircle size={20} /> Añadir al Catálogo
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product} 
            onSelect={(id) => navigate(`product/${id}`)}
            onEdit={(customer?.role === 'admin' || customer?.role === 'employee') ? handleUpdateStock : undefined}
            onDelete={customer?.role === 'admin' ? handleDelete : undefined}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <StoreFront />
  );
}

export default App;