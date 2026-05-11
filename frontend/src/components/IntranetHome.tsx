import { motion } from "framer-motion";
import { Briefcase, Newspaper, ChevronRight, Zap, Target, ShieldCheck, Cpu } from "lucide-react";

export default function IntranetHome() {
    return (
        <div className="w-full bg-[#050505] text-gray-100 p-10 pb-32 font-sans selection:bg-cyan-500/30">
            <div className="max-w-[1400px] mx-auto space-y-28">
                
                {/* 1. BIENVENIDA Y SPEECH CORPORATIVO */}
                <header className="text-center pt-16 pb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-8"
                    >
                        <div className="flex justify-center items-center gap-3 text-cyan-400 font-black uppercase tracking-[0.4em] text-sm mb-6">
                            <Zap size={18} /> Terminal de Trabajo BlueForge
                        </div>
                        
                        <h1 className="text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
                            SOMOS LA <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ÉLITE GAMING</span>
                        </h1>
                        
                        <div className="max-w-4xl mx-auto space-y-6 mt-10">
                            <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-medium">
                                En BlueForge no nos conformamos con ensamblar periféricos; <span className="text-white font-bold">forjamos las herramientas que deciden campeonatos.</span> Desde el diseño de nuestras placas hasta el último ajuste de los gatillos, buscamos la perfección absoluta.
                            </p>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Nuestro éxito no es casualidad, es el resultado directo de la pasión y el talento de este equipo. Creemos en la innovación tecnológica, en el trabajo milimétrico y en el cuidado de nuestra plantilla como pilar fundamental de la marca. Bienvenido a tu terminal central, donde gestionamos la excelencia.
                            </p>
                        </div>

                        {/* Valores de la empresa */}
                        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest"><Target size={16} className="text-cyan-500"/> Precisión</div>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest"><Cpu size={16} className="text-cyan-500"/> Innovación</div>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest"><ShieldCheck size={16} className="text-cyan-500"/> Transparencia</div>
                        </div>
                    </motion.div>
                </header>

               {/* 2. ORGANIGRAMA DE LA EMPRESA (El tuyo original restaurado) */}
                <section className="space-y-16 py-16 bg-zinc-900/20 rounded-[3rem] border border-white/5 p-12 shadow-2xl">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black tracking-widest text-white flex items-center justify-center gap-4 italic uppercase">
                            <Briefcase className="text-cyan-400" size={32} /> Organigrama de Empresa
                        </h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Estructura jerárquica de departamentos</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <motion.div whileHover={{ scale: 1.05 }} className="z-10 bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 rounded-3xl border-2 border-cyan-500/50 text-center w-72 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                            <img src="https://i.pravatar.cc/150?img=14" alt="CEO" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-cyan-400 p-0.5" />
                            <h4 className="font-bold text-white text-xl">Alex Rivet</h4>
                            <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mt-1">CEO & Fundador</p>
                        </motion.div>

                        <div className="w-0.5 h-12 bg-cyan-500/50"></div>
                        <div className="w-full max-w-5xl border-t-2 border-cyan-500/50 relative">
                            <div className="absolute top-0 left-[15%] w-0.5 h-12 bg-cyan-500/50"></div>
                            <div className="absolute top-0 left-[50%] w-0.5 h-12 bg-cyan-500/50 -translate-x-1/2"></div>
                            <div className="absolute top-0 right-[15%] w-0.5 h-12 bg-cyan-500/50"></div>
                        </div>

                        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between gap-8 mt-12 px-4">
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10 text-center w-full shadow-xl">
                                    <img src="https://i.pravatar.cc/150?img=32" alt="CTO" className="w-14 h-14 rounded-full mx-auto mb-3 border border-white/20" />
                                    <h4 className="font-bold text-white">Elena Soler</h4>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Directora IT</p>
                                </div>
                                <div className="w-0.5 h-8 bg-white/10"></div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center w-[90%] font-bold text-xs text-gray-500 uppercase">Equipo de Desarrollo (8)</div>
                            </div>
                            
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10 text-center w-full shadow-xl">
                                    <img src="https://i.pravatar.cc/150?img=59" alt="COO" className="w-14 h-14 rounded-full mx-auto mb-3 border border-white/20" />
                                    <h4 className="font-bold text-white">Marc Evans</h4>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Dir. Operaciones</p>
                                </div>
                                <div className="w-0.5 h-8 bg-white/10"></div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center w-[90%] font-bold text-xs text-gray-500 uppercase">Logística y Pedidos (12)</div>
                            </div>
                            
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10 text-center w-full shadow-xl">
                                    <img src="https://i.pravatar.cc/150?img=44" alt="RRHH" className="w-14 h-14 rounded-full mx-auto mb-3 border border-white/20" />
                                    <h4 className="font-bold text-white">Sara Ruiz</h4>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Dir. RRHH</p>
                                </div>
                                <div className="w-0.5 h-8 bg-white/10"></div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center w-[90%] font-bold text-xs text-gray-500 uppercase">Talento y Cultura (4)</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. TABLÓN DE COMUNICADOS */}
                <section className="space-y-10">
                    <h3 className="text-3xl font-black uppercase tracking-[0.2em] flex items-center gap-4 border-b border-white/5 pb-6">
                        <Newspaper className="text-cyan-500" size={32} /> Tablón de Comunicados
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer flex flex-col justify-between h-full shadow-lg hover:border-cyan-500/30">
                            <div>
                                <span className="text-cyan-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block bg-cyan-500/10 px-3 py-1 rounded-full">Sistemas IT</span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Actualización de servidores</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">Mantenimiento preventivo en la base de datos de la intranet este viernes a las 22:00h.</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-600 font-bold">Hoy, 09:30</span>
                                <ChevronRight className="text-gray-700 group-hover:text-cyan-500 transition-all" size={18} />
                            </div>
                        </div>

                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer flex flex-col justify-between h-full shadow-lg hover:border-cyan-500/30">
                            <div>
                                <span className="text-green-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block bg-green-500/10 px-3 py-1 rounded-full">Lanzamientos</span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Éxito Xbox Elite Custom</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">Hemos superado el objetivo mensual de ventas de la línea Elite en las primeras 72 horas.</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-600 font-bold">Ayer, 16:45</span>
                                <ChevronRight className="text-gray-700 group-hover:text-green-500 transition-all" size={18} />
                            </div>
                        </div>

                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer flex flex-col justify-between h-full shadow-lg hover:border-cyan-500/30">
                            <div>
                                <span className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block bg-orange-500/10 px-3 py-1 rounded-full">RRHH</span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Calendario de Vacaciones</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">El plazo para solicitar las semanas de descanso estival finaliza el próximo día 15.</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-600 font-bold">Hace 2 días</span>
                                <ChevronRight className="text-gray-700 group-hover:text-orange-500 transition-all" size={18} />
                            </div>
                        </div>

                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer flex flex-col justify-between h-full shadow-lg hover:border-cyan-500/30">
                            <div>
                                <span className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block bg-purple-500/10 px-3 py-1 rounded-full">Eventos</span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Torneo Interno CS2</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">Ya están abiertas las inscripciones para el torneo 2vs2 de empresa. Premio: Silla X-Chair.</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-600 font-bold">Hace 4 días</span>
                                <ChevronRight className="text-gray-700 group-hover:text-purple-500 transition-all" size={18} />
                            </div>
                        </div>

                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer flex flex-col justify-between h-full shadow-lg hover:border-cyan-500/30">
                            <div>
                                <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block bg-blue-500/10 px-3 py-1 rounded-full">Calidad</span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Auditoría ISO Superada</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">Hemos renovado el certificado de calidad en nuestros procesos de ensamblaje y pintura.</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-600 font-bold">Hace 1 semana</span>
                                <ChevronRight className="text-gray-700 group-hover:text-blue-500 transition-all" size={18} />
                            </div>
                        </div>

                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer flex flex-col justify-between h-full shadow-lg hover:border-cyan-500/30">
                            <div>
                                <span className="text-pink-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block bg-pink-500/10 px-3 py-1 rounded-full">Infraestructura</span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">Apertura del Nuevo Taller</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">La nave adyacente ya está operativa para la línea de montaje de los mandos de PS5.</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-600 font-bold">Hace 2 semanas</span>
                                <ChevronRight className="text-gray-700 group-hover:text-pink-500 transition-all" size={18} />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}