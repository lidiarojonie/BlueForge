import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Users, MessageSquare, Briefcase, ChevronRight, Mail } from "lucide-react";

export default function IntranetHome() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-[#050505] text-gray-100 p-8 pb-24 font-sans selection:bg-cyan-500/30">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* HERO: VÍDEO TUTORIAL (REQUISITO 2) */}
                <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h1 className="text-6xl font-black tracking-tighter text-white leading-tight">
                            CONECTA CON <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BLUEFORGE</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed max-w-md">
                            Bienvenido a tu nueva terminal de trabajo. Mira el vídeo de bienvenida para dominar todas las herramientas en menos de 2 minutos.
                        </p>
                    </motion.div>

                    <motion.div className="relative aspect-video bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <motion.button whileHover={{ scale: 1.1 }} className="p-5 bg-cyan-500 rounded-full text-black shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                                <PlayCircle size={40} />
                            </motion.button>
                            <p className="mt-4 font-bold text-white tracking-widest uppercase text-sm">Tutorial Intranet v1.0</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="background" />
                    </motion.div>
                </header>

               {/* ORGANIGRAMA DE LA EMPRESA JERÁRQUICO */}
                <section className="space-y-12 bg-zinc-900/20 p-8 rounded-3xl border border-white/5">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black tracking-widest text-white flex items-center justify-center gap-3">
                            <Briefcase className="text-cyan-400" size={28} /> Organigrama BlueForge
                        </h2>
                        <p className="text-gray-500">Estructura jerárquica de departamentos.</p>
                    </div>

                    <div className="flex flex-col items-center">
                        {/* NIVEL 1: DIRECCIÓN GENERAL */}
                        <motion.div whileHover={{ scale: 1.05 }} className="z-10 bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 rounded-2xl border-2 border-cyan-500/50 text-center w-56 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            <img src="https://i.pravatar.cc/150?img=14" alt="CEO" className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-cyan-400 p-0.5" />
                            <h4 className="font-bold text-white text-lg">Alex Rivet</h4>
                            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest">CEO & Fundador</p>
                        </motion.div>

                        {/* Línea conectora central vertical */}
                        <div className="w-0.5 h-8 bg-cyan-500/50"></div>
                        
                        {/* Línea conectora horizontal para el Nivel 2 */}
                        <div className="w-full max-w-3xl border-t-2 border-cyan-500/50 relative">
                            {/* Palitos bajando hacia las tarjetas */}
                            <div className="absolute top-0 left-[15%] w-0.5 h-8 bg-cyan-500/50"></div>
                            <div className="absolute top-0 left-[50%] w-0.5 h-8 bg-cyan-500/50 -translate-x-1/2"></div>
                            <div className="absolute top-0 right-[15%] w-0.5 h-8 bg-cyan-500/50"></div>
                        </div>

                        {/* NIVEL 2: JEFATURA DE DEPARTAMENTOS */}
                        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-4 mt-8 px-4 relative">
                            {/* Dept 1 */}
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 text-center w-full shadow-lg">
                                    <img src="https://i.pravatar.cc/150?img=32" alt="CTO" className="w-12 h-12 rounded-full mx-auto mb-2 border border-white/20" />
                                    <h4 className="font-bold text-white">Elena Soler</h4>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase">Directora IT</p>
                                </div>
                                {/* Nivel 3 colgando de IT */}
                                <div className="w-0.5 h-6 bg-white/20"></div>
                                <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 text-center w-[90%]">
                                    <p className="text-gray-300 text-xs font-medium">Equipo de Desarrollo (8)</p>
                                </div>
                            </div>

                            {/* Dept 2 */}
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 text-center w-full shadow-lg">
                                    <img src="https://i.pravatar.cc/150?img=59" alt="COO" className="w-12 h-12 rounded-full mx-auto mb-2 border border-white/20" />
                                    <h4 className="font-bold text-white">Marc Evans</h4>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase">Dir. Operaciones</p>
                                </div>
                                <div className="w-0.5 h-6 bg-white/20"></div>
                                <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 text-center w-[90%]">
                                    <p className="text-gray-300 text-xs font-medium">Logística y Pedidos (12)</p>
                                </div>
                            </div>

                            {/* Dept 3 */}
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 text-center w-full shadow-lg">
                                    <img src="https://i.pravatar.cc/150?img=44" alt="RRHH" className="w-12 h-12 rounded-full mx-auto mb-2 border border-white/20" />
                                    <h4 className="font-bold text-white">Sara Ruiz</h4>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase">Dir. RRHH</p>
                                </div>
                                {/* Nivel 3 colgando de RRHH */}
                                <div className="w-0.5 h-6 bg-white/20"></div>
                                <div className="bg-zinc-900/50 p-3 rounded-xl border border-white/5 text-center w-[90%]">
                                    <p className="text-gray-300 text-xs font-medium">Talento y Cultura (4)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* APARTADO CONTACTO COMITÉ */}
                <section className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-3xl border border-cyan-500/20 p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-white">¿Tienes dudas legales o laborales?</h3>
                            <p className="text-gray-400 max-w-md">Tu consulta es totalmente confidencial. El Comité de Empresa está aquí para asesorarte sobre convenios, bajas o cualquier conflicto.</p>
                        </div>
                        <button 
                         onClick={() => navigate('/intranet/contacto-comite')}
                        className="px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center gap-3 group shadow-[0_10px_30px_rgba(34,211,238,0.2)]"
>
                            <Mail size={20} />
                         ENVIAR MENSAJE AL COMITÉ
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                    </div>
                </section>
            </div>

        </div>
    );
}