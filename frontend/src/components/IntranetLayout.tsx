import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';
import { 
    LogOut, 
    LayoutDashboard, 
    CalendarClock, 
    Package, 
    Boxes, 
    History, 
    ShieldAlert,
    ExternalLink
} from 'lucide-react';

import mainLogo from '../imgs/new_logo.png';

function IntranetLayout() {
    const { customer: user, setCustomer } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Sube el scroll arriba al cambiar de página
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
    }, [location.pathname]);

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

    // Array de rutas. Añadimos 'subPaths' para encender el botón principal al entrar en sub-páginas
    const navItems = [
        { path: "/intranet", name: "Bienvenida", icon: LayoutDashboard, end: true },
        { path: "/intranet/fichajes", name: "Fichajes", icon: CalendarClock },
        { path: "/intranet/historico", name: "Histórico", icon: History },
        { path: "/intranet/pedidos", name: "Pedidos", icon: Package },
        { path: "/intranet/catalogo", name: "Catálogo", icon: Boxes },
        { 
            path: "/intranet/comite", 
            name: "Comité", 
            icon: ShieldAlert,
            subPaths: ['/intranet/derechos', '/intranet/logros', '/intranet/contacto-comite']
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col font-sans">
            
            <header className="sticky top-0 z-50 bg-[#0b0c10]/95 backdrop-blur-md border-b border-white/10 shadow-xl">
                
                <div className="bg-zinc-900 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] py-1.5 px-8 flex justify-between items-center hidden sm:flex">
                    <span>Sistema de Gestión BlueForge v2.0</span>
                    <span className="flex items-center gap-2 text-cyan-500/80">
                        Conexión Segura <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                    </span>
                </div>

                <div className="max-w-[1800px] mx-auto px-4 lg:px-8 py-4 flex justify-between items-center gap-4">
                    
                    <div className="flex items-center gap-6 flex-shrink-0">
                        <img 
                            src={mainLogo} 
                            alt="BlueForge" 
                            className="h-10 md:h-12 cursor-pointer hover:scale-105 transition-transform" 
                            onClick={() => navigate('/')}
                        />
                    </div>

                    {/* 🔥 EL FIX ESTÁ AQUÍ: Añadido transform-gpu y la lógica isActuallyActive */}
                    <nav className="flex items-center gap-1 md:gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5 overflow-x-auto scrollbar-hide flex-grow justify-start xl:justify-center transform-gpu relative z-50">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            // Comprobamos si la URL actual coincide con alguna de las sub-páginas (como /derechos)
                            const isSubPathActive = item.subPaths?.includes(location.pathname);

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) => {
                                        const isActuallyActive = isActive || isSubPathActive;
                                        
                                        return `flex items-center gap-2 px-3 lg:px-5 py-2.5 rounded-xl transition-all group font-bold text-xs lg:text-sm uppercase tracking-widest whitespace-nowrap will-change-transform ${
                                            isActuallyActive 
                                            ? "bg-white/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.15)] border border-cyan-500/30" 
                                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                        }`
                                    }}
                                >
                                    {({ isActive }) => {
                                        const isActuallyActive = isActive || isSubPathActive;
                                        return (
                                            <>
                                                <Icon size={18} className={`${isActuallyActive ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"} transition-colors`} />
                                                <span className="hidden md:block">{item.name}</span>
                                            </>
                                        )
                                    }}
                                </NavLink>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-4 flex-shrink-0 pl-4 border-l border-white/5">
                        <button 
                            onClick={() => navigate('/')}
                            className="hidden 2xl:flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-widest mr-2"
                        >
                            Ver Web <ExternalLink size={14} />
                        </button>

                        <div className="flex items-center gap-4 bg-white/5 pl-4 pr-2 py-1.5 rounded-full border border-white/10 relative z-50 transform-gpu">
                            <div className="text-right hidden sm:block">
                                <p className="text-[9px] font-black text-cyan-500 uppercase tracking-tighter leading-none">Sesión iniciada</p>
                                <p className="text-sm font-bold text-white uppercase truncate max-w-[100px]">
                                    {user?.username ?? "Empleado"}
                                </p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all group border border-red-500/20"
                                title="Cerrar sesión"
                            >
                                <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </header>

            <main className="flex-1 w-full relative z-0">
                <Outlet />
            </main>
        </div>
    );
}

export default IntranetLayout;