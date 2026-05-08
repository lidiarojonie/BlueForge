import { motion } from "framer-motion";
import { PlayCircle, Award, Target, Users, Calendar, BookOpen, Scale, ChevronRight } from "lucide-react";

export default function BienvenidaIntranet() {
    return (

        <div className="w-full bg-[#050505] text-gray-100 p-8 pb-24 font-sans selection:bg-cyan-500/30">
            <div className="max-w-7xl mx-auto space-y-12">
                
                {/* 1. HERO & VÍDEO EXPLICATIVO */}
                <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight text-white">
                            Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BlueForge</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Tu portal del empleado. Aquí gestionamos nuestro tiempo, defendemos nuestros derechos y construimos un entorno de trabajo mejor.
                        </p>
                    </motion.div>

                    {/* Falso reproductor de vídeo */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-colors shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <motion.div whileHover={{ scale: 1.1 }} className="p-4 bg-cyan-500/20 rounded-full backdrop-blur-sm border border-cyan-400/30">
                                <PlayCircle className="w-12 h-12 text-cyan-400" />
                            </motion.div>
                            <p className="mt-4 font-medium text-white tracking-wide">Ver guía de la Intranet</p>
                        </div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                    </motion.div>
                </header>

                {/* 2. PÍLDORAS INFORMATIVAS (LOGROS) */}
                <section>
                    {/* Añadido el botón de "Ver todo el tablón" */}
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Award className="text-cyan-400" /> Actualidad y Logros
                        </h2>
                        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
                            Ver todo el tablón <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all">
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 border border-green-500/20">
                                <Award className="text-green-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">¡Jornada de 38.5h conseguida!</h3>
                            <p className="text-gray-400 text-sm">Hemos logrado reducir la jornada laboral sin afectar a los salarios. Más tiempo para ti, misma rentabilidad para todos.</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 border border-blue-500/20">
                                <Target className="text-blue-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Nuestros próximos objetivos</h3>
                            <p className="text-gray-400 text-sm">Seguimos luchando por implementar la jornada intensiva en verano y mejorar los pluses de productividad trimestrales.</p>
                        </motion.div>
                    </div>
                </section>

                {/* 3. COMITÉ DE EMPRESA Y ORGANIGRAMA */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Users className="text-cyan-400" /> Comité de Empresa
                        </h2>
                        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
                            Ver Sección Comité <ChevronRight size={16} />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Perfil 1 (Laura arreglada) */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center hover:bg-zinc-900 transition-colors">
                            <img src="https://i.pravatar.cc/150?img=5" alt="Delegada" className="w-20 h-20 rounded-full mb-4 border-2 border-cyan-500/50 p-1 object-cover" />
                            <h4 className="text-lg font-bold text-white">Laura G.</h4>
                            <p className="text-cyan-400 text-sm mb-3">Delegada Sindical</p>
                            <p className="text-gray-500 text-xs">Experta en prevención de riesgos laborales y convenios.</p>
                        </div>
                        {/* Perfil 2 (Carlos) */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center hover:bg-zinc-900 transition-colors">
                            <img src="https://i.pravatar.cc/150?img=12" alt="Secretario" className="w-20 h-20 rounded-full mb-4 border-2 border-cyan-500/50 p-1 object-cover" />
                            <h4 className="text-lg font-bold text-white">Carlos M.</h4>
                            <p className="text-cyan-400 text-sm mb-3">Secretario del Comité</p>
                            <p className="text-gray-500 text-xs">Encargado de comunicación interna y actas de reuniones.</p>
                        </div>
                        {/* Banner Organigrama */}
                        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-center items-center text-center">
                            <Users className="w-12 h-12 text-cyan-400 opacity-50 mb-4" />
                            <h4 className="text-lg font-bold text-white mb-2">Estructura Corporativa</h4>
                            <p className="text-gray-400 text-xs mb-4">Conoce cómo se organiza BlueForge y los responsables de cada departamento.</p>
                            <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-semibold hover:bg-cyan-500 hover:text-black transition-colors w-full">
                                Abrir Mapa
                            </button>
                        </div>
                    </div>
                </section>

                {/* 4. RECURSOS LEGALES */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Scale className="text-cyan-400" /> Recursos y Documentación
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="group flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all text-left">
                            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                                <Calendar className="text-gray-400 group-hover:text-cyan-400" size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">Calendario Laboral</h4>
                                <p className="text-xs text-gray-500">Festivos y vacaciones 2026</p>
                            </div>
                        </button>

                        <button className="group flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all text-left">
                            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                                <BookOpen className="text-gray-400 group-hover:text-cyan-400" size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">Convenio Colectivo</h4>
                                <p className="text-xs text-gray-500">Metal / Comercio vigente</p>
                            </div>
                        </button>

                        <button className="group flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all text-left">
                            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                                <Scale className="text-gray-400 group-hover:text-cyan-400" size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">Estatuto Trabajadores</h4>
                                <p className="text-xs text-gray-500">Arts. 34-38 (Jornada y descansos)</p>
                            </div>
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}