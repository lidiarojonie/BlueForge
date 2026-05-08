import { motion } from 'framer-motion';
import { Users, Scale, Target, Calendar, Award, ExternalLink, FileText, CheckCircle2, Clock, Download } from 'lucide-react';

export default function ComiteSection() {
    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505]">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* CABECERA */}
                <header>
                    <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Users className="text-cyan-400" size={32} />
                        Comité de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Empresa</span>
                    </h2>
                    <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
                        Somos tus representantes legales. Nuestro objetivo es defender tus derechos, negociar mejoras laborales y asegurar un entorno de trabajo justo y transparente.
                    </p>
                </header>

                {/* SECCIÓN 1: EL EQUIPO */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                        <Users className="text-cyan-400" size={20} /> Nuestro Equipo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Laura */}
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-cyan-500/30 transition-colors">
                            <img src="https://i.pravatar.cc/150?img=5" alt="Laura G." className="w-24 h-24 rounded-full border-2 border-cyan-500/50 p-1 object-cover mb-4" />
                            <h4 className="text-xl font-bold text-white">Laura G.</h4>
                            <span className="text-cyan-400 text-sm font-medium mb-3 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Delegada Sindical</span>
                            <p className="text-gray-400 text-sm">Prevención de riesgos e igualdad.</p>
                        </motion.div>

                        {/* Carlos */}
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-blue-500/30 transition-colors">
                            <img src="https://i.pravatar.cc/150?img=12" alt="Carlos M." className="w-24 h-24 rounded-full border-2 border-blue-500/50 p-1 object-cover mb-4" />
                            <h4 className="text-xl font-bold text-white">Carlos M.</h4>
                            <span className="text-blue-400 text-sm font-medium mb-3 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Secretario</span>
                            <p className="text-gray-400 text-sm">Comunicación interna y actas.</p>
                        </motion.div>

                        {/* Miguel */}
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-purple-500/30 transition-colors">
                            <img src="https://i.pravatar.cc/150?img=33" alt="Miguel A." className="w-24 h-24 rounded-full border-2 border-purple-500/50 p-1 object-cover mb-4" />
                            <h4 className="text-xl font-bold text-white">Miguel A.</h4>
                            <span className="text-purple-400 text-sm font-medium mb-3 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">Vocal Técnico</span>
                            <p className="text-gray-400 text-sm">Enlace con departamentos IT.</p>
                        </motion.div>
                    </div>
                </section>

                {/* SECCIÓN 2: LOGROS */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-green-400 mb-2">
                            <Award size={20} /> <span className="font-bold uppercase text-xs tracking-widest">Conseguido</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2 text-balance">Jornada 38.5h Semanales</h4>
                        <p className="text-gray-400 text-sm">Reducción efectiva sin pérdida salarial para toda la plantilla.</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                            <Target size={20} /> <span className="font-bold uppercase text-xs tracking-widest">En Lucha</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2 text-balance">Intensiva de Verano</h4>
                        <p className="text-gray-400 text-sm">Negociando salida a las 15:00h en los meses de Julio y Agosto.</p>
                    </div>
                </section>

                {/* SECCIÓN 3: RECURSOS */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <Scale className="text-red-400 mb-4" size={24} />
                            <h4 className="text-lg font-bold text-white mb-2">Estatuto Trabajadores</h4>
                            <p className="text-gray-400 text-xs mb-4">Consulta los artículos clave sobre descansos y permisos.</p>
                        </div>
                        <a href="https://www.boe.es" target="_blank" className="text-center py-2 bg-white/5 rounded-lg text-xs hover:bg-white/10 transition-colors">Ver BOE</a>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <FileText className="text-blue-400 mb-4" size={24} />
                            <h4 className="text-lg font-bold text-white mb-2">Convenio Metal</h4>
                            <p className="text-gray-400 text-xs mb-4">Tablas salariales y categorías profesionales actualizadas.</p>
                        </div>
                        <button className="py-2 bg-white/5 rounded-lg text-xs hover:bg-white/10 transition-colors">Descargar PDF</button>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <Calendar className="text-cyan-400 mb-4" size={24} />
                            <h4 className="text-lg font-bold text-white mb-2">Calendario 2026</h4>
                            <p className="text-gray-400 text-xs mb-4">Festivos locales y días de libre disposición.</p>
                        </div>
                        <button className="py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-xs hover:bg-cyan-500 hover:text-black transition-colors font-bold">Ver Festivos</button>
                    </div>
                </section>
            </div>
        </div>
    );
}