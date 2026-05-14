import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Mail, User, ShieldAlert, Plus, Search, X, Save, Phone, Calendar, Lock } from 'lucide-react';

interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
}

export default function IntranetUsers() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal de creación
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '',
        email: '',
        password: '',
        role: 'customer'
    });

    const loadUsers = () => {
        setIsLoading(true);
        fetch('http://localhost:3000/api/admin/users', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error cargando usuarios:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) {
                setUsers(prev => prev.map(u =>
                    u.id === userId ? { ...u, role: newRole } : u
                ));
            } else {
                alert("Error al cambiar el rol");
            }
        } catch {
            alert("Error de conexión al servidor");
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('http://localhost:3000/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsCreateModalOpen(false);
                setFormData({
                    firstName: '', lastName: '', phone: '', birthDate: '', email: '', password: '', role: 'customer'
                });
                loadUsers();
            } else {
                const data = await res.json();
                alert(data.error || "Error al crear usuario");
            }
        } catch {
            alert("Error de conexión al servidor");
        } finally {
            setIsSaving(false);
        }
    };

    const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505] min-h-screen relative">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                            <Users className="text-cyan-400" size={32} />
                            Gestión de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Usuarios</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Administra los roles y permisos de los usuarios de BlueForge.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text"
                                placeholder="Buscar por email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition-all"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] whitespace-nowrap"
                        >
                            <Plus size={20} />
                            Añadir usuario
                        </motion.button>
                    </div>
                </header>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/40 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <th className="p-5 pl-6">ID</th>
                                        <th className="p-5">Nombre</th>
                                        <th className="p-5">Correo</th>
                                        <th className="p-5 pr-6 w-48">Rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredUsers.map((user, index) => (
                                            <motion.tr 
                                                key={user.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="p-5 pl-6">
                                                    <span className="text-gray-500 font-mono text-xs">#{user.id}</span>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                            <User size={14} />
                                                        </div>
                                                        <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                                                            {user.username}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                        <Mail size={14} />
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="p-5 pr-6 w-48">
                                                    <div className="relative flex items-center">
                                                        <ShieldAlert size={14} className="absolute left-3 text-gray-500 pointer-events-none" />
                                                        <select
                                                            value={user.role}
                                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                            className="w-[140px] pl-9 pr-3 py-2 bg-black/50 border border-white/10 rounded-xl text-sm font-bold text-gray-200 focus:border-cyan-500 focus:text-white outline-none appearance-none cursor-pointer hover:bg-black/80 transition-colors"
                                                        >
                                                            <option value="customer">Cliente</option>
                                                            <option value="employee">Empleado</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-10 text-center text-gray-500 uppercase tracking-widest font-bold">
                                                No se encontraron usuarios
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL DE CREACIÓN */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl relative"
                        >
                            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3">
                                <Plus className="text-cyan-400" />
                                Añadir Nuevo <span className="text-cyan-400">Usuario</span>
                            </h3>

                            <form onSubmit={handleCreateUser} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Nombre</label>
                                        <div className="relative mt-2">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input required type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none" placeholder="Juan" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Apellido</label>
                                        <div className="relative mt-2">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input required type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none" placeholder="Pérez" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Nº Teléfono</label>
                                        <div className="relative mt-2">
                                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none" placeholder="600000000" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Fecha Nacimiento</label>
                                        <div className="relative mt-2">
                                            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input required type="date" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none [color-scheme:dark]" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Correo Electrónico</label>
                                        <div className="relative mt-2">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none" placeholder="email@ejemplo.com" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Contraseña</label>
                                        <div className="relative mt-2">
                                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input required type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-cyan-500 outline-none" placeholder="••••••••" />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" disabled={isSaving} className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4">
                                    <Save size={20} /> {isSaving ? 'CREANDO...' : 'GUARDAR USUARIO'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
