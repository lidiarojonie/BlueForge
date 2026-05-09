import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';

interface Order {
    order_id: number;
    order_date: string;
    order_status: string;
    customer_name: string;
    email: string;
    total: string;
}

export default function IntranetOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = () => {
        setIsLoading(true);
        fetch('http://localhost:3000/api/orders', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error cargando pedidos:", err);
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
        })
        .then(res => {
            if (res.ok) fetchOrders(); // Recargamos para ver el cambio
        });
    };

    // Diccionario visual para los estados de la base de datos
    const statusConfig: Record<string, { color: string, icon: any, label: string }> = {
        'pending': { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: Clock, label: 'Pendiente' },
        'processing': { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: Package, label: 'En Proceso' },
        'shipped': { color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', icon: Truck, label: 'Enviado' },
        'delivered': { color: 'text-green-400 bg-green-400/10 border-green-400/20', icon: CheckCircle, label: 'Entregado' },
        'cancelled': { color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: XCircle, label: 'Cancelado' },
    };

    return (
        <div className="p-8 bg-[#050505] min-h-screen font-sans text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-black flex items-center gap-3">
                        <Package className="text-cyan-400" size={32} />
                        Gestión de Pedidos
                    </h1>
                    <button onClick={fetchOrders} className="p-2 bg-zinc-800 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors">
                        <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/50 text-xs uppercase tracking-widest text-gray-400 border-b border-white/10">
                                <th className="p-4 font-bold">ID</th>
                                <th className="p-4 font-bold">Fecha</th>
                                <th className="p-4 font-bold">Cliente</th>
                                <th className="p-4 font-bold">Total</th>
                                <th className="p-4 font-bold">Estado</th>
                                <th className="p-4 font-bold text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => {
                                const status = statusConfig[order.order_status] || statusConfig['pending'];
                                const StatusIcon = status.icon;

                                return (
                                    <tr key={order.order_id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 font-black text-cyan-400">#{order.order_id}</td>
                                        <td className="p-4 text-sm text-gray-400">
                                            {new Date(order.order_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold">{order.customer_name}</p>
                                            <p className="text-xs text-gray-500">{order.email}</p>
                                        </td>
                                        <td className="p-4 font-bold">€{Number(order.total).toFixed(2)}</td>
                                        <td className="p-4">
                                            <span className={`flex items-center gap-2 w-max px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${status.color}`}>
                                                <StatusIcon size={14} /> {status.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <select 
                                                value={order.order_status}
                                                onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                                className="bg-black border border-white/10 text-white text-sm rounded-lg p-2 focus:border-cyan-500 focus:outline-none cursor-pointer"
                                            >
                                                <option value="pending">Pendiente</option>
                                                <option value="processing">En Proceso</option>
                                                <option value="shipped">Enviado</option>
                                                <option value="delivered">Entregado</option>
                                                <option value="cancelled">Cancelar</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                            {orders.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">No hay pedidos registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}