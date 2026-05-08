import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit3, Trash2, Eye, EyeOff, Boxes, Search } from 'lucide-react';

export default function IntranetCatalog() {
    // Datos de prueba (Luego se conectará con tu api/products)
    const [products, setProducts] = useState([
        { id: 1, name: 'Pro Controller PS5 "Neon Blue"', price: 189.99, stock: 12, active: true, category: 'PS5' },
        { id: 2, name: 'Xbox Elite Custom "Mars"', price: 154.50, stock: 5, active: true, category: 'Xbox' },
        { id: 3, name: 'Joy-Con Mod "Retro Grey"', price: 79.90, stock: 0, active: false, category: 'Switch' },
        { id: 4, name: 'Paddle Kit Pro V2', price: 24.99, stock: 45, active: true, category: 'Accesorios' },
    ]);

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* CABECERA Y ACCIÓN PRINCIPAL */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                            <Boxes className="text-cyan-400" size={32} />
                            Gestión de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Inventario</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Controla el stock, visibilidad y precios de los mandos BlueForge.</p>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                        <Plus size={20} />
                        Nuevo Producto
                    </motion.button>
                </header>

                {/* FILTROS RÁPIDOS */}
                <div className="flex flex-wrap gap-4 items-center justify-between bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre o modelo..." 
                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:border-cyan-500/50 outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20 uppercase tracking-widest">Todos</span>
                        <span className="px-3 py-1 bg-white/5 text-gray-400 text-xs font-bold rounded-full border border-white/10 uppercase tracking-widest hover:bg-white/10 cursor-pointer transition-colors">PS5</span>
                        <span className="px-3 py-1 bg-white/5 text-gray-400 text-xs font-bold rounded-full border border-white/10 uppercase tracking-widest hover:bg-white/10 cursor-pointer transition-colors">Xbox</span>
                    </div>
                </div>

                {/* GRID DE PRODUCTOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-5 flex flex-col shadow-xl group relative overflow-hidden"
                        >
                            {/* Status Tag */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                    product.active ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'
                                }`}>
                                    {product.active ? 'En Venta' : 'Oculto'}
                                </span>
                                <span className="text-gray-500 text-xs font-mono">#{product.id}</span>
                            </div>

                            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
                                {product.name}
                            </h4>
                            <p className="text-gray-500 text-xs mb-4">{product.category}</p>

                            <div className="flex justify-between items-end mt-auto">
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-white">{product.price}€</p>
                                    <div className="flex items-center gap-1.5">
                                        <Package size={14} className={product.stock > 5 ? 'text-gray-400' : 'text-orange-400'} />
                                        <span className={`text-xs font-bold ${product.stock > 5 ? 'text-gray-400' : 'text-orange-400'}`}>
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Botones de Acción */}
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 transition-colors" title="Editar">
                                        <Edit3 size={16} />
                                    </button>
                                    <button className={`p-2 rounded-lg border transition-colors ${
                                        product.active ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500 hover:text-white' : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-white'
                                    }`} title={product.active ? 'Ocultar' : 'Mostrar'}>
                                        {product.active ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition-colors" title="Eliminar">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Alerta Stock Bajo */}
                            {product.stock <= 5 && product.stock > 0 && (
                                <div className="absolute top-0 right-0 p-1">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}