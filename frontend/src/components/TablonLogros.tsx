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
                    <h2 className="text-5xl font-black text-white">Tablón de <span className="text-cyan-400">Transparencia</span></h2>
                    <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                        Aquí rendimos cuentas. Este es el resumen de las victorias que hemos conseguido para la plantilla y las negociaciones que tenemos actualmente sobre la mesa con la dirección de BlueForge.
                    </p>
                </header>

                {/* SECCIÓN 1: VICTORIAS (3 ÍTEMS) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <Award className="text-green-400" size={32} />
                        <h3 className="text-3xl font-bold text-white">Acuerdos Conseguidos</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Victoria 1 */}
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 p-10 rounded-3xl shadow-xl flex flex-col gap-4">
                            <div className="p-4 bg-green-500/10 rounded-2xl text-green-400 w-fit"><ShieldCheck size={32} /></div>
                            <h4 className="text-2xl font-bold text-white">Reducción a 38.5h</h4>
                            <p className="text-gray-400 leading-relaxed flex-grow">
                                Hito histórico alcanzado este año. Hemos conseguido reducir la jornada laboral semanal manteniendo el 100% de las tablas salariales.
                            </p>
                        </motion.div>

                        {/* Victoria 2 */}
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 p-10 rounded-3xl shadow-xl flex flex-col gap-4">
                            <div className="p-4 bg-green-500/10 rounded-2xl text-green-400 w-fit"><Laptop size={32} /></div>
                            <h4 className="text-2xl font-bold text-white">Plus de Teletrabajo</h4>
                            <p className="text-gray-400 leading-relaxed flex-grow">
                                Se ha firmado un acuerdo de 40€ mensuales libres de impuestos para cubrir gastos de luz e internet los días de trabajo en remoto.
                            </p>
                        </motion.div>

                        {/* Victoria 3 */}
                        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 p-10 rounded-3xl shadow-xl flex flex-col gap-4">
                            <div className="p-4 bg-green-500/10 rounded-2xl text-green-400 w-fit"><HeartPulse size={32} /></div>
                            <h4 className="text-2xl font-bold text-white">Seguro Médico Privado</h4>
                            <p className="text-gray-400 leading-relaxed flex-grow">
                                La empresa asume el 100% del coste de la póliza de salud básica para todos los empleados con más de 6 meses de antigüedad.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* SECCIÓN 2: EN PROCESO (3 ÍTEMS) */}
                <section className="space-y-8 pt-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <Target className="text-orange-400" size={32} />
                        <h3 className="text-3xl font-bold text-white">Objetivos en Negociación (2026)</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lucha 1 */}
                        <div className="bg-zinc-900/60 border border-white/5 p-10 rounded-3xl shadow-lg flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400"><Sun size={28} /></div>
                                <h4 className="text-xl font-bold text-white">Jornada Intensiva de Verano</h4>
                            </div>
                            <p className="text-gray-400 text-sm flex-grow">Exigimos horario de 08:00 a 15:00 durante los meses de Julio y Agosto completos.</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider"><span>Estado</span> <span>Avanzado (80%)</span></div>
                                <div className="w-full h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[80%] rounded-full" /></div>
                            </div>
                        </div>

                        {/* Lucha 2 */}
                        <div className="bg-zinc-900/60 border border-white/5 p-10 rounded-3xl shadow-lg flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400"><Wallet size={28} /></div>
                                <h4 className="text-xl font-bold text-white">Retribución Flexible</h4>
                            </div>
                            <p className="text-gray-400 text-sm flex-grow">Implementación de tickets restaurante, cheque guardería y tarjeta transporte exentos de IRPF.</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider"><span>Estado</span> <span>En estudio (40%)</span></div>
                                <div className="w-full h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[40%] rounded-full" /></div>
                            </div>
                        </div>

                        {/* Lucha 3 */}
                        <div className="bg-zinc-900/60 border border-white/5 p-10 rounded-3xl shadow-lg flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400"><Monitor size={28} /></div>
                                <h4 className="text-xl font-bold text-white">Renovación de Equipos</h4>
                            </div>
                            <p className="text-gray-400 text-sm flex-grow">Buscamos asegurar un presupuesto fijo anual para sillas ergonómicas y monitores 4K para prevención visual.</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider"><span>Estado</span> <span>Borrador (15%)</span></div>
                                <div className="w-full h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[15%] rounded-full" /></div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}