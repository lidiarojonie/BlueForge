// [cite: 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/auth/logout', { method: 'POST', credentials: 'include' });
            setCustomer(null);
            navigate('/');
        } catch (err) {
            setCustomer(null);
            navigate('/');
        }
    };

    const navItems = [
        { path: "/intranet", name: "Bienvenida", icon: LayoutDashboard, end: true },
        { path: "/intranet/fichajes", name: "Fichajes", icon: CalendarClock },
        { path: "/intranet/pedidos", name: "Pedidos", icon: Package },
        { path: "/intranet/catalogo", name: "Catálogo", icon: Boxes },
        { path: "/intranet/historico", name: "Histórico", icon: History },
        { path: "/intranet/comite", name: "Comité", icon: ShieldAlert }
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
                        {/* 🔥 LOGO CORREGIDO: Ahora manda a '/' (la web) */}
                        <img 
                            src={mainLogo} 
                            alt="BlueForge" 
                            className="h-12 md:h-16 cursor-pointer hover:scale-105 transition-transform" 
                            onClick={() => navigate('/')} 
                        />
                    </div>

                    <nav className="flex items-center gap-1 md:gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5 overflow-x-auto scrollbar-hide flex-grow justify-start xl:justify-center">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) => 
                                        `flex items-center gap-2 px-3 lg:px-5 py-2.5 rounded-xl transition-all group font-bold text-xs lg:text-sm uppercase tracking-widest whitespace-nowrap ${
                                            isActive 
                                            ? "bg-white/10 text-white border border-cyan-500/30" 
                                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon size={18} className={`${isActive ? "text-cyan-400" : "text-gray-500"} transition-colors`} />
                                            <span className="hidden md:block">{item.name}</span>
                                        </>
                                    )}
                                </NavLink>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-4 flex-shrink-0 pl-4 border-l border-white/5">
                        <button onClick={() => navigate('/')} className="hidden 2xl:flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-widest mr-2">
                            Ver Web <ExternalLink size={14} />
                        </button>
                        <div className="flex items-center gap-4 bg-white/5 pl-4 pr-2 py-1.5 rounded-full border border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-[9px] font-black text-cyan-500 uppercase tracking-tighter leading-none">Sesión iniciada</p>
                                <p className="text-sm font-bold text-white uppercase">{user?.username ?? "Empleado"}</p>
                            </div>
                            <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/20">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="flex gap-8 px-6 lg:px-12 overflow-x-auto scrollbar-hide"> {/* [cite: 79] */}
                    {[
                        { path: "/intranet", name: "Bienvenida", end: true }, // [cite: 80]
                        { path: "/intranet/fichajes", name: "Fichajes" }, // [cite: 80]
                        { path: "/intranet/historico", name: "Histórico" }, // [cite: 81]
                        { path: "/intranet/pedidos", name: "Pedidos" }, // [cite: 81]
                        { path: "/intranet/catalogo", name: "Catálogo" }, // [cite: 81]
                        { path: "/intranet/comite", name: "Comité" } // [cite: 81]
                    ].map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end} // [cite: 82, 83]
                            className={({ isActive }) =>
                                `py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${isActive
                                    ? "text-cyan-400 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                    : "text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-600"
                                }` // [cite: 84, 85]
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </header>

            <main className="flex-1 w-full relative z-0">
                <Outlet />
            </main>
        </div>
    );
}

export default IntranetLayout;