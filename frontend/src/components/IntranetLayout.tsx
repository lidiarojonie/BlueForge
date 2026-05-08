import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';
import { LogOut, User, ShieldAlert } from 'lucide-react';
// ⚠️ Fíjate que hemos borrado el import './intranet.css' porque ya no nos hace falta.

function IntranetLayout() {
    const { customer: user, setCustomer } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setCustomer(null);
            navigate('/');
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
            setCustomer(null);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col font-sans">
            
            {/* 🔥 EL MENÚ MÁGICO 🔥 
                sticky top-0: Se queda pegado arriba
                z-50: Prioridad absoluta (nadie pasa por encima)
                backdrop-blur-md: Efecto cristal 
            */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 shadow-lg">
                
                {/* Parte de arriba: Logo y Usuario */}
                <div className="flex justify-between items-center px-6 lg:px-12 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                            <ShieldAlert className="text-cyan-400" size={24} />
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white">
                            Intranet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BlueForge</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-white/5">
                            <User size={16} className="text-cyan-400" />
                            <span className="text-sm font-medium text-gray-300">
                                {user?.username ?? "Empleado"}
                            </span>
                        </div>
                        {/* Botón de cerrar sesión modo E-Sports */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-red-500/20 transition-all font-medium text-sm shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Cerrar sesión</span>
                        </button>
                    </div>
                </div>

                {/* Parte de abajo: Pestañas de navegación */}
                {/* He optimizado tus NavLinks usando un .map para no repetir tanto código */}
                <nav className="flex gap-8 px-6 lg:px-12 overflow-x-auto scrollbar-hide">
                    {[
                        { path: "/intranet", name: "Bienvenida", end: true },
                        { path: "/intranet/fichajes", name: "Fichajes" },
                        { path: "/intranet/pedidos", name: "Pedidos" },
                        { path: "/intranet/catalogo", name: "Catálogo" },
                        { path: "/intranet/historico", name: "Histórico" },
                        { path: "/intranet/comite", name: "Comité" }
                    ].map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => 
                                `py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                                    isActive 
                                    ? "text-cyan-400 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                                    : "text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-600"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </header>

            {/* CONTENIDO PRINCIPAL (Aquí se carga la página de Bienvenida o la de Fichajes) */}
            <main className="flex-1 w-full relative z-0">
                <Outlet />
            </main>
        </div>
    );
}

export default IntranetLayout;