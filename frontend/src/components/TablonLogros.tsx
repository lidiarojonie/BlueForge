import { motion } from 'framer-motion';
import { Award, Target, CheckCircle2, Clock, ArrowLeft, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TablonLogros() {
    const navigate = useNavigate();

    const logros = [
        {
            title: "Reducción de Jornada a 38.5h",
            status: "Conseguido",
            date: "Abril 2026",
            desc: "Un hito histórico en BlueForge. Hemos conseguido reducir la jornada semanal manteniendo el 100% del salario base y complementos.",
            icon: <Award className="text-green-400" />,
            color: "green"
        },
        {
            title: "Plus de Nocturnidad Mejorado",
            status: "Conseguido",
            date: "Enero 2026",
            desc: "Aumento del 15% en el valor de la hora nocturna para el equipo de mantenimiento de servidores.",
            icon: <ShieldCheck className="text-green-400" />,
            color: "green"
        }
    ];

    const peleas = [
        {
            title: "Jornada Intensiva de Verano",
            status: "En Negociación",
            progress: 65,
            desc: "Buscamos un horario de 07:00 a 15:00 durante Julio y Agosto para mejorar la conciliación familiar.",
            icon: <Clock className="text-orange-400" />
        },
        {
            title: "Teletrabajo Híbrido (2 días)",
            status: "Propuesta Enviada",
            progress: 30,
            desc: "Estamos peleando para que los departamentos técnicos tengan 2 días de trabajo remoto a la semana.",
            icon: <Zap className="text-blue-400" />
        }
    ];

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505]">
            <div className="max-w-5xl mx-auto space-y-12">
                
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors mb-4"
                >
                    <ArrowLeft size={20} /> Volver a Inicio
                </button>

                <header>
                    <h2 className="text-4xl font-black text-white">Tablón de <span className="text-cyan-400">Actualidad</span></h2>
                    <p className="text-gray-400 mt-2">Transparencia total sobre nuestras victorias y los objetivos que tenemos en el punto de mira.</p>
                </header>

                {/* LOGROS CONSEGUIDOS */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                        <CheckCircle2 size={24} /> Victorias de la Plantilla
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {logros.map((l, i) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="bg-zinc-900/40 border border-green-500/20 p-6 rounded-2xl flex gap-6 items-start"
                            >
                                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 uppercase font-black text-xs">
                                    {l.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-xl font-bold text-white">{l.title}</h4>
                                        <span className="text-[10px] bg-green-500 text-black px-2 py-0.5 rounded font-bold uppercase">{l.date}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{l.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PELEANDO POR ELLO */}
                <section className="space-y-6 pt-6">
                    <h3 className="text-xl font-bold text-orange-400 flex items-center gap-2">
                        <Target size={24} /> Próximos Desafíos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {peleas.map((p, i) => (
                            <div key={i} className="bg-zinc-900/60 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {p.icon}
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{p.title}</h4>
                                <p className="text-gray-400 text-xs mb-6 leading-relaxed">{p.desc}</p>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        <span>Progreso Negociación</span>
                                        <span>{p.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${p.progress}%` }}
                                            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}