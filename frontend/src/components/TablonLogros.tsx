import { motion } from 'framer-motion';
import { Award, Target, ArrowLeft, Laptop, HeartPulse, ShieldCheck, Sun, Wallet, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TablonLogros() {
    const navigate = useNavigate();

    return (
        <div className="w-full p-8 font-sans pb-32 bg-[#050505] min-h-screen">
            <div className="max-w-7xl mx-auto space-y-16">

                <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors font-bold text-lg mb-4">
                    <ArrowLeft size={24} /> Volver al panel del Comité
                </button>

                <header className="space-y-4">
                    <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Tablón de <span className="text-cyan-400">Avances y Logros</span></h2>
                    <p className="text-gray-400 text-xl max-w-4xl leading-relaxed">
                        Aquí rendimos cuentas. Comparamos nuestras victorias conseguidas y nuestros objetivos futuros directamente con el <strong>Convenio Colectivo TIC</strong> para que puedas ver el impacto real de nuestras negociaciones.
                    </p>
                </header>

                {/* SECCIÓN 1: VICTORIAS (Con comparativa) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <Award className="text-green-400" size={32} />
                        <h3 className="text-3xl font-bold text-white uppercase tracking-wider italic">Acuerdos Conseguidos</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Victoria 1 */}
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-900/10 to-zinc-900 border border-green-500/20 p-8 rounded-[2.5rem] shadow-xl flex flex-col gap-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-green-500/10 rounded-2xl text-green-400"><ShieldCheck size={28} /></div>
                                <h4 className="text-xl font-black text-white uppercase">Reducción a 38.5h</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                Hito histórico alcanzado este año manteniendo el 100% de las tablas salariales.
                            </p>
                            {/* Comparativa */}
                            <div className="flex flex-col gap-2 mt-4 border-t border-white/5 pt-4">
                                <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Convenio TIC Base</p>
                                    <p className="text-sm text-gray-300 font-medium">40 horas semanales</p>
                                </div>
                                <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Mejora BlueForge</p>
                                    <p className="text-sm text-white font-black">38.5 horas semanales</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Victoria 2 */}
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-900/10 to-zinc-900 border border-green-500/20 p-8 rounded-[2.5rem] shadow-xl flex flex-col gap-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-green-500/10 rounded-2xl text-green-400"><Laptop size={28} /></div>
                                <h4 className="text-xl font-black text-white uppercase">Plus de Teletrabajo</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                Acuerdo mensual libre de impuestos para cubrir gastos de luz e internet al teletrabajar.
                            </p>
                            {/* Comparativa */}
                            <div className="flex flex-col gap-2 mt-4 border-t border-white/5 pt-4">
                                <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Convenio TIC Base</p>
                                    <p className="text-sm text-gray-300 font-medium">Gastos no fijados / A negociar</p>
                                </div>
                                <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Mejora BlueForge</p>
                                    <p className="text-sm text-white font-black">40€ / mes por empleado</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Victoria 3 */}
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-900/10 to-zinc-900 border border-green-500/20 p-8 rounded-[2.5rem] shadow-xl flex flex-col gap-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-green-500/10 rounded-2xl text-green-400"><HeartPulse size={28} /></div>
                                <h4 className="text-xl font-black text-white uppercase">Seguro Médico Privado</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                La empresa asume el coste de la póliza de salud básica para empleados con más de 6 meses de antigüedad.
                            </p>
                            {/* Comparativa */}
                            <div className="flex flex-col gap-2 mt-4 border-t border-white/5 pt-4">
                                <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Convenio TIC Base</p>
                                    <p className="text-sm text-gray-300 font-medium">Solo acceso a Sanidad Pública</p>
                                </div>
                                <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Mejora BlueForge</p>
                                    <p className="text-sm text-white font-black">Póliza Privada Sanitas (100%)</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECCIÓN 2: EN PROCESO (Con comparativa) */}
                <section className="space-y-8 pt-12">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <Target className="text-cyan-400" size={32} />
                        <h3 className="text-3xl font-bold text-white uppercase tracking-wider italic">Objetivos en Negociación</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lucha 1 */}
                        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] shadow-lg flex flex-col gap-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Sun size={28} /></div>
                                <h4 className="text-lg font-black text-white uppercase">Jornada Intensiva</h4>
                            </div>
                            <p className="text-gray-400 text-sm flex-grow">Horario ininterrumpido durante los meses de Julio y Agosto completos.</p>

                            {/* Comparativa */}
                            <div className="flex flex-col gap-2 mt-2 border-t border-white/5 pt-4">
                                <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Convenio TIC Base</p>
                                    <p className="text-sm text-gray-300 font-medium">Jornada partida estándar</p>
                                </div>
                                <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Objetivo BlueForge</p>
                                    <p className="text-sm text-white font-black">Intensiva 08:00h a 15:00h</p>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider"><span>Estado</span> <span className="text-cyan-400">Avanzado (80%)</span></div>
                                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[80%] rounded-full" /></div>
                            </div>
                        </div>

                        {/* Lucha 2 */}
                        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] shadow-lg flex flex-col gap-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Wallet size={28} /></div>
                                <h4 className="text-lg font-black text-white uppercase">Retribución Flexible</h4>
                            </div>
                            <p className="text-gray-400 text-sm flex-grow">Implementación de tickets restaurante, guardería y transporte.</p>

                            {/* Comparativa */}
                            <div className="flex flex-col gap-2 mt-2 border-t border-white/5 pt-4">
                                <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Convenio TIC Base</p>
                                    <p className="text-sm text-gray-300 font-medium">Salario bruto con retención IRPF</p>
                                </div>
                                <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Objetivo BlueForge</p>
                                    <p className="text-sm text-white font-black">Salario en especie exento de IRPF</p>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider"><span>Estado</span> <span className="text-cyan-400">En estudio (40%)</span></div>
                                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[40%] rounded-full" /></div>
                            </div>
                        </div>

                        {/* Lucha 3 */}
                        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] shadow-lg flex flex-col gap-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Monitor size={28} /></div>
                                <h4 className="text-lg font-black text-white uppercase">Renovación de Equipos</h4>
                            </div>
                            <p className="text-gray-400 text-sm flex-grow">Presupuesto fijo anual para salud visual y postural.</p>

                            {/* Comparativa */}
                            <div className="flex flex-col gap-2 mt-2 border-t border-white/5 pt-4">
                                <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Convenio TIC Base</p>
                                    <p className="text-sm text-gray-300 font-medium">Equipamiento informático básico</p>
                                </div>
                                <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Objetivo BlueForge</p>
                                    <p className="text-sm text-white font-black">Sillas ergonómicas y Monitores 4K</p>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider"><span>Estado</span> <span className="text-cyan-400">Borrador (15%)</span></div>
                                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[15%] rounded-full" /></div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}