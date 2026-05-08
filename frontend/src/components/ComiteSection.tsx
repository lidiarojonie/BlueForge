import { motion } from 'framer-motion';
import { Scale, FileText, Award, ExternalLink, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComiteSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto space-y-20">
                
                {/* PRESENTACIÓN */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-black text-white">Tu voz, tu <span className="text-cyan-400">Comité</span></h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>El Comité de Empresa es el órgano representativo del conjunto de los trabajadores en BlueForge para la defensa de sus intereses laborales y económicos.</p>
                            <div className="bg-gradient-to-r from-cyan-900/20 to-transparent p-6 rounded-2xl border-l-4 border-cyan-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                                <p className="italic text-white relative z-10 font-medium">
                                    "Nuestra misión es vigilar el cumplimiento de las normas laborales y negociar de tú a tú con la dirección para mejorar nuestras condiciones de vida."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
                        <h4 className="font-black text-white flex items-center gap-3 text-2xl relative z-10"><HelpCircle className="text-cyan-400" size={32}/> Funciones Principales</h4>
                        <ul className="space-y-5 text-gray-300 relative z-10">
                            <li className="flex gap-4 items-start"><div className="p-1 bg-cyan-500/20 rounded text-cyan-400 mt-1"><ShieldCheck size={16}/></div> <span>Negociación de convenios y salarios sectoriales.</span></li>
                            <li className="flex gap-4 items-start"><div className="p-1 bg-cyan-500/20 rounded text-cyan-400 mt-1"><ShieldCheck size={16}/></div> <span>Control de la seguridad, salud e higiene en el puesto.</span></li>
                            <li className="flex gap-4 items-start"><div className="p-1 bg-cyan-500/20 rounded text-cyan-400 mt-1"><ShieldCheck size={16}/></div> <span>Representación legal frente a sanciones o despidos.</span></li>
                            <li className="flex gap-4 items-start"><div className="p-1 bg-cyan-500/20 rounded text-cyan-400 mt-1"><ShieldCheck size={16}/></div> <span>Mediación directa con Recursos Humanos.</span></li>
                        </ul>
                    </div>
                </section>

                {/* ORGANIGRAMA DEL COMITÉ */}
                <section className="space-y-12 bg-zinc-900/30 p-12 rounded-[3rem] border border-white/5">
                    <h3 className="text-center text-2xl font-black uppercase tracking-[0.2em] text-white">Miembros Electos del Comité</h3>
                    
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { n: "Laura G.", r: "Presidenta", img: "https://i.pravatar.cc/150?img=5", color: "border-cyan-500" },
                            { n: "Carlos M.", r: "Secretario", img: "https://i.pravatar.cc/150?img=11", color: "border-blue-500" }
                        ].map((m, i) => (
                            <motion.div whileHover={{ y: -8 }} key={i} className={`bg-black/40 border-t-4 ${m.color} p-8 rounded-3xl text-center w-full sm:w-72 shadow-xl flex flex-col items-center border border-white/5`}>
                                <img src={m.img} alt={m.n} className="w-28 h-28 rounded-full mb-6 border-4 border-white/5 p-1 object-cover" />
                                <p className="text-white font-black text-2xl">{m.n}</p>
                                <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold bg-white/5 px-4 py-1.5 rounded-full">{m.r}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        {[
                            { n: "Miguel A.", r: "Rep. Taller Hardware", img: "https://i.pravatar.cc/150?img=33", color: "border-purple-500" },
                            { n: "Elena R.", r: "Rep. Desarrollo IT", img: "https://i.pravatar.cc/150?img=47", color: "border-pink-500" }, 
                            { n: "Dani V.", r: "Rep. Logística", img: "https://i.pravatar.cc/150?img=53", color: "border-orange-500" }
                        ].map((m, i) => (
                            <motion.div whileHover={{ y: -5 }} key={i} className={`bg-black/40 border-t-4 ${m.color} p-6 rounded-3xl text-center w-full sm:w-60 shadow-lg flex flex-col items-center border border-white/5`}>
                                <img src={m.img} alt={m.n} className="w-20 h-20 rounded-full mb-4 border-2 border-white/5 p-1 object-cover" />
                                <p className="text-white font-bold text-xl">{m.n}</p>
                                <p className="text-xs text-cyan-400 mt-2 uppercase tracking-widest font-bold">{m.r}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 🔥 LOS NUEVOS BOTONES PREMIUM 🔥 */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Tarjeta 1: Derechos */}
                    <motion.button 
                        whileHover={{ y: -10, scale: 1.02 }}
                        onClick={() => navigate('/intranet/derechos')} 
                        className="relative overflow-hidden group bg-gradient-to-br from-zinc-900 to-black p-10 rounded-[2.5rem] border border-white/10 hover:border-cyan-500/50 transition-all text-left shadow-2xl flex flex-col justify-between min-h-[340px]"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-cyan-500/20 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="p-5 bg-cyan-400 text-black rounded-2xl w-fit shadow-[0_0_30px_rgba(34,211,238,0.5)] mb-8 transition-transform group-hover:scale-110">
                                <ShieldCheck size={40} />
                            </div>
                            <h4 className="text-3xl font-black text-white mb-4">Guía de Derechos</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Infografías interactivas sobre modificaciones de contrato, tipos de despido y la guía completa de permisos retribuidos.
                            </p>
                        </div>
                        <div className="relative z-10 mt-10 flex items-center gap-3 text-cyan-400 font-black text-sm uppercase tracking-widest group-hover:gap-6 transition-all">
                            Explorar guía <ArrowRight size={20} />
                        </div>
                    </motion.button>

                    {/* Tarjeta 2: Logros */}
                    <motion.button 
                        whileHover={{ y: -10, scale: 1.02 }}
                        onClick={() => navigate('/intranet/logros')} 
                        className="relative overflow-hidden group bg-gradient-to-br from-zinc-900 to-black p-10 rounded-[2.5rem] border border-white/10 hover:border-green-500/50 transition-all text-left shadow-2xl flex flex-col justify-between min-h-[340px]"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-green-500/20 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="p-5 bg-green-400 text-black rounded-2xl w-fit shadow-[0_0_30px_rgba(74,222,128,0.5)] mb-8 transition-transform group-hover:scale-110">
                                <Award size={40} />
                            </div>
                            <h4 className="text-3xl font-black text-white mb-4">Transparencia</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Rendición de cuentas. Repasa los hitos históricos conseguidos y los objetivos que estamos negociando hoy mismo.
                            </p>
                        </div>
                        <div className="relative z-10 mt-10 flex items-center gap-3 text-green-400 font-black text-sm uppercase tracking-widest group-hover:gap-6 transition-all">
                            Ver victorias <ArrowRight size={20} />
                        </div>
                    </motion.button>

                    {/* Tarjeta 3: Marco Legal Oficial */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black p-10 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col min-h-[340px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
                        <div className="relative z-10 mb-8">
                            <div className="flex items-center gap-4 mb-3">
                                <Scale className="text-red-400" size={32} />
                                <h4 className="text-2xl font-black text-white">Leyes y BOE</h4>
                            </div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Documentos Oficiales</p>
                        </div>
                        
                        <div className="relative z-10 grid grid-cols-1 gap-4 flex-grow">
                            <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430" target="_blank" rel="noreferrer" className="group flex flex-col justify-center p-5 bg-black/60 border border-white/5 rounded-2xl text-xs text-gray-300 hover:border-red-500/50 hover:bg-zinc-800 transition-all gap-2 h-full">
                                <div className="flex justify-between items-center font-bold text-sm text-white">
                                    Estatuto Trabajadores <ExternalLink size={16} className="text-red-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                                </div>
                                <p className="text-gray-500 line-clamp-2">Ley general aplicable en España. Marca los mínimos innegociables.</p>
                            </a>
                            <a href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-7766" target="_blank" rel="noreferrer" className="group flex flex-col justify-center p-5 bg-black/60 border border-white/5 rounded-2xl text-xs text-gray-300 hover:border-red-500/50 hover:bg-zinc-800 transition-all gap-2 h-full">
                                <div className="flex justify-between items-center font-bold text-sm text-white">
                                    Convenio Sector TIC <FileText size={16} className="text-red-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                                </div>
                                <p className="text-gray-500 line-clamp-2">Acuerdo específico para informática. Mejora las condiciones básicas.</p>
                            </a>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}