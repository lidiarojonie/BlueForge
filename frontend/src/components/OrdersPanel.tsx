import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, 
    Truck, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Search, 
    Filter,
    ChevronRight,
    ExternalLink,
    MapPin
} from 'lucide-react';

export default function OrdersPanel() {
    // Datos de prueba (Luego se conectará con /api/orders)
    const [orders] = useState([
        { id: "BF-9021", customer: "Juan Pérez", total: 189.99, status: "pending", date: "Hace 10 min", items: 1, address: "Madrid, ES" },
        { id: "BF-9020", customer: "Elena García", total: 345.50, status: "shipped", date: "Hoy, 11:30", items: 2, address: "Barcelona, ES" },
        { id: "BF-9019", customer: "Marcos Ruiz", total: 154.00, status: "delivered", date: "Ayer", items: 1, address: "Valencia, ES" },
        { id: "BF-9018", customer: "Ana Belén", total: 210.00, status: "cancelled", date: "05 May", items: 1, address: "Sevilla, ES" },
    ]);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'shipped': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'shipped': return <Truck size={14} />;
            case 'delivered': return <CheckCircle2 size={14} />;
            case 'cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                            <ShoppingBag className="text-cyan-400" size={32} />
                            Gestión de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Pedidos</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Supervisa las ventas, estados de envío y facturación.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-[10px] uppercase text-gray-500 font-bold">Pendientes</p>
                                <p className="text-xl font-black text-orange-400">1</p>
                            </div>
                            <div className="w-[1px] h-8 bg-white/10"></div>
                            <div className="text-center">
                                <p className="text-[10px] uppercase text-gray-500 font-bold">Hoy</p>
                                <p className="text-xl font-black text-cyan-400">12</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* FILTROS */}
                <div className="flex flex-wrap gap-4 items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar por ID, cliente o ciudad..." 
                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:border-cyan-500/50 outline-none"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 text-sm transition-all">
                        <Filter size={16} /> Filtrar por Estado
                    </button>
                </div>

                {/* LISTA DE PEDIDOS */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-cyan-500/30 rounded-2xl p-4 transition-all"
                            >
                                <div className="flex flex-wrap items-center gap-6">
                                    {/* ID y Fecha */}
                                    <div className="flex-1 min-w-[150px]">
                                        <h4 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                                            {order.id}
                                        </h4>
                                        <p className="text-gray-500 text-xs flex items-center gap-1">
                                            <Clock size={12} /> {order.date}
                                        </p>
                                    </div>

                                    {/* Cliente */}
                                    <div className="flex-1 min-w-[200px]">
                                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest">Cliente</p>
                                        <p className="text-gray-200 font-medium">{order.customer}</p>
                                        <p className="text-gray-500 text-xs flex items-center gap-1">
                                            <MapPin size={12} /> {order.address}
                                        </p>
                                    </div>

                                    {/* Info Pedido */}
                                    <div className="flex-1 min-w-[100px]">
                                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest">Total</p>
                                        <p className="text-white font-bold">{order.total}€</p>
                                        <p className="text-gray-500 text-xs">{order.items} artículo(s)</p>
                                    </div>

                                    {/* Estado (Badge) */}
                                    <div className="min-w-[130px]">
                                        <div className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </div>

                                    {/* Acciones */}
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all">
                                            <ExternalLink size={18} />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* FOOTER DE PAGINACIÓN (Estético) */}
                <div className="flex justify-center items-center gap-4 pt-4">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 text-sm disabled:opacity-50" disabled>Anterior</button>
                    <span className="text-gray-400 text-sm font-mono">Página 1 de 1</span>
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 text-sm disabled:opacity-50" disabled>Siguiente</button>
                </div>

            </div>
        </div>
    );
}