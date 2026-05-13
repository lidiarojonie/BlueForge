import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Edit3, Trash2, Boxes, Gamepad, Layers, X, Save } from 'lucide-react';

export default function IntranetCatalog() {
    const [activeTab, setActiveTab] = useState<'base' | 'parts'>('base');
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Estados para el Modal (Ventana emergente)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '', // Se usa para nombre de mando o color de pieza
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        category: 'shell' // Por defecto para piezas
    });

    const loadData = () => {
        setIsLoading(true);
        const endpoint = activeTab === 'base' ? '/api/products' : '/api/parts';
        
        fetch(`http://localhost:3000${endpoint}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error cargando catálogo:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const categoryNames: Record<string, string> = {
        'shell': 'Carcasa',
        'triggers': 'Gatillos',
        'buttons': 'Botones',
        'joysticks': 'Joysticks',
        'd_pad': 'Cruceta'
    };

    // Función para enviar los datos al Backend
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const endpoint = activeTab === 'base' ? '/api/products' : '/api/parts';
        
        // Adaptamos los datos según lo que estemos guardando
        const bodyData = activeTab === 'base' 
            ? {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                imageUrl: formData.imageUrl
            }
            : {
                category: formData.category,
                color: formData.name, // En piezas usamos 'name' para guardar el color
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                imageUrl: formData.imageUrl,
                baseProductId: 1 // Por defecto al mando PS5 base
            };

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '', category: 'shell' });
                loadData(); // Recargamos la lista para ver el nuevo producto
            } else {
                alert("Error al guardar. Revisa tus permisos de Admin.");
            }
        } catch (error) {
            alert("Error de conexión con el servidor.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505] min-h-screen relative">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                            <Boxes className="text-cyan-400" size={32} />
                            Gestión de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Inventario</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Controla el stock y visibilidad de mandos y piezas del configurador.</p>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)} // 🔥 AQUÍ ABRIMOS EL MODAL
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                        <Plus size={20} />
                        {activeTab === 'base' ? 'Nuevo Mando' : 'Nueva Pieza'}
                    </motion.button>
                </header>

                <div className="flex gap-4">
                    <button 
                        onClick={() => setActiveTab('base')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
                            activeTab === 'base' 
                            ? 'bg-white/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                            : 'bg-black/50 text-gray-500 border border-white/5 hover:text-white'
                        }`}
                    >
                        <Gamepad size={18} /> Mandos Base
                    </button>
                    <button 
                        onClick={() => setActiveTab('parts')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
                            activeTab === 'parts' 
                            ? 'bg-white/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                            : 'bg-black/50 text-gray-500 border border-white/5 hover:text-white'
                        }`}
                    >
                        <Layers size={18} /> Componentes Sueltos
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div 
                                    key={`${activeTab}-${item.id}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`bg-zinc-900/80 backdrop-blur-sm border rounded-2xl p-5 flex flex-col shadow-xl group relative overflow-hidden ${
                                        item.active ? 'border-white/5' : 'border-red-500/30 opacity-75'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                            item.active ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'
                                        }`}>
                                            {item.active ? 'Activo' : 'Oculto'}
                                        </span>
                                        <span className="text-gray-500 text-xs font-mono">#{item.id}</span>
                                    </div>

                                    {activeTab === 'parts' && item.category && (
                                        <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                                            {categoryNames[item.category] || item.category}
                                        </p>
                                    )}

                                    <h4 className="text-lg font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        {item.name}
                                    </h4>

                                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-2xl font-black text-white">{Number(item.price).toFixed(2)}€</p>
                                            <div className="flex items-center gap-1.5">
                                                <Package size={14} className={item.stock > 10 ? 'text-gray-400' : 'text-orange-400'} />
                                                <span className={`text-xs font-bold ${item.stock > 10 ? 'text-gray-400' : 'text-orange-400'}`}>
                                                    Stock: {item.stock}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 transition-colors">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* 🔥 MODAL PARA AÑADIR PRODUCTOS/PIEZAS 🔥 */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3">
                                <Plus className="text-cyan-400" /> 
                                Añadir {activeTab === 'base' ? 'Mando Base' : 'Componente'}
                            </h3>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nombre o Color */}
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">{activeTab === 'base' ? 'Nombre del Mando' : 'Nombre del Color/Textura'}</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none" placeholder={activeTab === 'base' ? 'Ej. PS5 Controller' : 'Ej. Carbono, Rojo...'}/>
                                    </div>
                                    
                                    {/* Categoría (SOLO PARA PIEZAS) */}
                                    {activeTab === 'parts' && (
                                        <div>
                                            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Tipo de Pieza</label>
                                            <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none appearance-none">
                                                <option value="shell">Carcasa</option>
                                                <option value="buttons">Botones</option>
                                                <option value="joysticks">Joysticks</option>
                                                <option value="triggers">Gatillos</option>
                                                <option value="d_pad">Cruceta</option>
                                            </select>
                                        </div>
                                    )}

                                    {/* URL Imagen */}
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">URL de la Imagen (Nombre archivo)</label>
                                        <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none" placeholder="mando_rojo.png"/>
                                    </div>

                                    {/* Precio */}
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Precio (€)</label>
                                        <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none" placeholder="14.99"/>
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Stock Disponible</label>
                                        <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none" placeholder="50"/>
                                    </div>
                                </div>
                                
                                {/* Descripción (SOLO PARA MANDOS BASE) */}
                                {activeTab === 'base' && (
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Descripción</label>
                                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none resize-none h-24" placeholder="Detalles del mando..."></textarea>
                                    </div>
                                )}

                                <button type="submit" disabled={isSaving} className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4">
                                    <Save size={20} /> {isSaving ? 'GUARDANDO...' : 'GUARDAR EN BASE DE DATOS'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}