import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, AlertOctagon, Briefcase, Calendar, Heart, Baby, Map, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DerechosSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full p-8 font-sans pb-32 bg-[#050505] min-h-screen">
            <div className="max-w-7xl mx-auto space-y-16">
                
                <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors font-bold text-lg mb-4">
                    <ArrowLeft size={24} /> Volver al panel del Comité
                </button>

                <header className="space-y-4">
                    <h2 className="text-5xl font-black text-white">Guía de <span className="text-cyan-400">Derechos Laborales</span></h2>
                    <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                        Conoce el marco legal que protege tu contrato. Hemos traducido el Estatuto de los Trabajadores a un lenguaje claro para que sepas cómo reaccionar ante cambios, despidos o necesidades personales.
                    </p>
                </header>

                {/* INFOGRAFÍA 1: MODIFICACIÓN DEL CONTRATO */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <Edit3 className="text-blue-400" size={32} />
                        <h3 className="text-3xl font-bold text-white">Modificaciones de tu Contrato</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-all">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-6"><Briefcase size={28}/></div>
                            <h4 className="text-xl font-bold text-white mb-4">Movilidad Funcional</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                La empresa te cambia de funciones. Si te mandan tareas de una categoría superior por más de 6 meses (en un año), <span className="text-white font-bold">tienes derecho a reclamar el ascenso y el sueldo correspondiente.</span>
                            </p>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-all">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-6"><Map size={28}/></div>
                            <h4 className="text-xl font-bold text-white mb-4">Movilidad Geográfica</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Traslado forzoso que requiere cambiar de residencia. Tienes 3 opciones: Aceptar (te pagan gastos), Recurrir ante el juzgado, o <span className="text-white font-bold">Extinguir el contrato cobrando 20 días por año trabajado.</span>
                            </p>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-all">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-6"><AlertOctagon size={28}/></div>
                            <h4 className="text-xl font-bold text-white mb-4">Modificación Sustancial</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Cambios drásticos en horario, turnos o salario. Requiere justificación económica de la empresa y 15 días de preaviso. <span className="text-white font-bold">Puedes rescindir tu contrato con indemnización si te perjudica.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* INFOGRAFÍA 2: EXTINCIÓN (DESPIDOS) */}
                <section className="space-y-8 pt-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <AlertOctagon className="text-red-400" size={32} />
                        <h3 className="text-3xl font-bold text-white">Extinción y Despidos</h3>
                    </div>

                    <div className="bg-gradient-to-br from-red-900/10 to-zinc-900 border border-red-500/20 p-10 rounded-3xl shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <h4 className="text-2xl font-black text-red-400 border-b border-red-500/20 pb-2">Despido Objetivo</h4>
                                <p className="text-gray-400 text-sm">Por causas técnicas, económicas o falta de adaptación del empleado a las nuevas tecnologías.</p>
                                <div className="bg-black/50 p-4 rounded-xl text-white font-mono text-sm border border-white/5">
                                    💰 Indemnización: <br/><span className="text-lg text-cyan-400">20 días / año</span><br/>(Máximo 12 mensualidades)
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-2xl font-black text-orange-400 border-b border-orange-500/20 pb-2">Despido Disciplinario</h4>
                                <p className="text-gray-400 text-sm">Por incumplimiento grave y culpable del trabajador (faltas repetidas, desobediencia, ofensas).</p>
                                <div className="bg-black/50 p-4 rounded-xl text-white font-mono text-sm border border-white/5">
                                    💰 Indemnización: <br/><span className="text-lg text-orange-400">0 días</span><br/>(Solo tienes derecho al finiquito)
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-2xl font-black text-purple-400 border-b border-purple-500/20 pb-2">Colectivo (ERE)</h4>
                                <p className="text-gray-400 text-sm">Despido objetivo masivo que afecta a gran parte de la plantilla. Exige negociación previa con el Comité.</p>
                                <div className="bg-black/50 p-4 rounded-xl text-white font-mono text-sm border border-white/5">
                                    💰 Indemnización: <br/><span className="text-lg text-purple-400">Negociable</span><br/>(Mínimo 20 días / año)
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PÍLDORAS DE PERMISOS RETRIBUIDOS */}
                <section className="space-y-8 pt-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <ShieldAlert className="text-cyan-400" size={32} />
                        <h3 className="text-3xl font-bold text-white">Píldoras de Permisos Diarios</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg">
                            <Calendar className="text-cyan-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold text-white mb-3">Vacaciones</h4>
                            <p className="text-gray-400 text-sm">23 días laborables al año según Convenio TIC. Debes preavisar con al menos 2 meses de antelación.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg">
                            <Heart className="text-pink-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold text-white mb-3">Matrimonio</h4>
                            <p className="text-gray-400 text-sm">15 días naturales de permiso 100% retribuido desde el primer día laborable tras formalizar el enlace.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg">
                            <Baby className="text-green-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold text-white mb-3">Lactancia</h4>
                            <p className="text-gray-400 text-sm">Derecho a 1 hora de ausencia diaria hasta los 9 meses del bebé, o acumularlo en días completos.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg">
                            <ShieldAlert className="text-orange-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold text-white mb-3">Mudanza</h4>
                            <p className="text-gray-400 text-sm">1 día laborable de permiso retribuido por traslado de domicilio habitual justificado.</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}