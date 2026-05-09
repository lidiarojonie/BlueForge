import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit3, Trash2, Eye, EyeOff, Boxes, Search } from 'lucide-react';

export default function IntranetCatalog() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 🔥 CONEXIÓN AL BACKEND REAL
    const loadProducts = () => {
        setIsLoading(true);
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error cargando catálogo real:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadProducts();
    }, []);

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
                        <p className="text-gray-400 mt-2">Controla el stock, visibilidad y precios de la base de datos real.</p>
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

                {/* GRID DE PRODUCTOS */}
                {isLoading ? (
                    <p className="text-cyan-400 text-center animate-pulse py-12 font-bold">Cargando catálogo...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                className={`bg-zinc-900/80 backdrop-blur-sm border rounded-2xl p-5 flex flex-col shadow-xl group relative overflow-hidden ${
                                    product.active ? 'border-white/5' : 'border-red-500/30 opacity-75'
                                }`}
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

                                {/* Imagen Real (Si la hay en BD) */}
                                {product.image_url && (
                                    <div className="h-32 mb-4 flex justify-center items-center bg-black/40 rounded-xl p-2">
                                        <img src={product.image_url} alt={product.name} className="max-h-full object-contain" />
                                    </div>
                                )}

                                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                    {product.name}
                                </h4>

                                <div className="flex justify-between items-end mt-auto pt-4">
                                    <div className="space-y-1">
                                        <p className="text-2xl font-black text-white">{Number(product.price).toFixed(2)}€</p>
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
                )}

            </div>
        </div>
    );
}