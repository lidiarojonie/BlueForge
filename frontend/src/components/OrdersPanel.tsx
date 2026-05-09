import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, Truck, CheckCircle2, XCircle, Clock, 
    Search, Filter, ChevronRight, ExternalLink, MapPin 
} from 'lucide-react';

export default function OrdersPanel() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 🔥 CONEXIÓN AL BACKEND REAL
    const fetchOrders = () => {
        setIsLoading(true);
        fetch('http://localhost:3000/api/orders', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar pedidos reales:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

   
    const handleStatusChange = (orderId: number, newStatus: string) => {
        fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ status: newStatus })
        }).then(res => {
            if (res.ok) fetchOrders();
        });
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'processing': return <Clock size={14} />;
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
                        <p className="text-gray-400 mt-2">Supervisa las ventas, estados de envío y facturación real.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-[10px] uppercase text-gray-500 font-bold">Total Pedidos</p>
                                <p className="text-xl font-black text-cyan-400">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* LISTA DE PEDIDOS */}
                <div className="space-y-4">
                    {isLoading ? (
                        <p className="text-cyan-400 font-bold animate-pulse text-center p-8">Cargando base de datos...</p>
                    ) : orders.length === 0 ? (
                        <p className="text-gray-500 text-center p-8">No hay pedidos registrados.</p>
                    ) : (
                        <AnimatePresence>
                            {orders.map((order, index) => (
                                <motion.div
                                    key={order.order_id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-cyan-500/30 rounded-2xl p-4 transition-all"
                                >
                                    <div className="flex flex-wrap items-center gap-6">
                                        {/* ID y Fecha */}
                                        <div className="flex-1 min-w-[150px]">
                                            <h4 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                                                BF-{order.order_id}
                                            </h4>
                                            <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                                                <Clock size={12} /> 
                                                {new Date(order.order_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
                                            </p>
                                        </div>

                                        {/* Cliente */}
                                        <div className="flex-1 min-w-[200px]">
                                            <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest">Cliente</p>
                                            <p className="text-gray-200 font-medium">{order.customer_name || 'Sin Nombre'}</p>
                                            <p className="text-gray-500 text-xs mt-1">{order.email}</p>
                                        </div>

                                        {/* Info Pedido */}
                                        <div className="flex-1 min-w-[100px]">
                                            <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest">Total</p>
                                            <p className="text-white font-bold">{Number(order.total).toFixed(2)}€</p>
                                        </div>

                                        {/* Estado (Badge Interactivo) */}
                                        <div className="min-w-[160px]">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${getStatusStyles(order.order_status)}`}>
                                                {getStatusIcon(order.order_status)}
                                                <select 
                                                    value={order.order_status}
                                                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                                    className="bg-transparent text-inherit font-bold outline-none cursor-pointer w-full appearance-none"
                                                >
                                                    <option value="pending" className="bg-zinc-900 text-white">Pendiente</option>
                                                    <option value="processing" className="bg-zinc-900 text-white">En Proceso</option>
                                                    <option value="shipped" className="bg-zinc-900 text-white">Enviado</option>
                                                    <option value="delivered" className="bg-zinc-900 text-white">Entregado</option>
                                                    <option value="cancelled" className="bg-zinc-900 text-white">Cancelado</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Acciones */}
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                                <ChevronRight size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}