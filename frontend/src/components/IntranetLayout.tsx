import { useEffect } from 'react'; // 
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // 
import { useUser } from '../context/UserContext.tsx'; // 
import { LogOut, User, ShieldAlert } from 'lucide-react'; // [cite: 66]

function IntranetLayout() {
    const { customer: user, setCustomer } = useUser(); // [cite: 67]
    const navigate = useNavigate(); // [cite: 67]
    const location = useLocation(); // <--- Nueva constante para vigilar la ruta

    // Este efecto se ejecuta cada vez que 'location' (la URL) cambia
    useEffect(() => {
        // Intentamos subir el scroll de todas las formas posibles
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        // Por si el scroll está atrapado en el body
        document.body.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLogout = async () => { // [cite: 68]
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setCustomer(null); // [cite: 69]
            navigate('/'); // [cite: 69]
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
            setCustomer(null); // [cite: 70]
            navigate('/'); // [cite: 70]
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col font-sans"> {/* [cite: 70] */}
            
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 shadow-lg"> {/* [cite: 71] */}
                <div className="flex justify-between items-center px-6 lg:px-12 py-4"> {/* [cite: 72] */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                            <ShieldAlert className="text-cyan-400" size={24} /> {/* [cite: 72] */}
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white">
                            Intranet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BlueForge</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-white/5">
                            <User size={16} className="text-cyan-400" /> {/* [cite: 75] */}
                            <span className="text-sm font-medium text-gray-300">
                                {user?.username ?? "Empleado"} {/* [cite: 75, 76] */}
                            </span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-red-500/20 transition-all font-medium text-sm shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        > {/* [cite: 77] */}
                            <LogOut size={16} /> {/* [cite: 78] */}
                            <span className="hidden sm:inline">Cerrar sesión</span>
                        </button>
                    </div>
                </div>

                <nav className="flex gap-8 px-6 lg:px-12 overflow-x-auto scrollbar-hide"> {/* [cite: 79] */}
                    {[
                        { path: "/intranet", name: "Bienvenida", end: true }, // [cite: 80]
                        { path: "/intranet/fichajes", name: "Fichajes" }, // [cite: 80]
                        { path: "/intranet/pedidos", name: "Pedidos" }, // [cite: 81]
                        { path: "/intranet/catalogo", name: "Catálogo" }, // [cite: 81]
                        { path: "/intranet/historico", name: "Histórico" }, // [cite: 81]
                        { path: "/intranet/comite", name: "Comité" } // [cite: 81]
                    ].map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end} // [cite: 82, 83]
                            className={({ isActive }) => 
                                `py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                                    isActive 
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

            <main className="flex-1 w-full relative z-0"> {/*  */}
                <Outlet /> {/*  */}
            </main>
        </div>
    );
}

export default IntranetLayout;