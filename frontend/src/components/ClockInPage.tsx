import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Clock, AlertCircle, CalendarClock } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ClockInPage() {
    const { customer } = useUser();
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [note, setNote] = useState('');

    // Simulamos que carga el estado al entrar (Sustituye por tu fetch real si lo tienes)
    useEffect(() => {
        // Aquí iría tu fetch a /api/clock/status
    }, []);

    const handleClock = () => {
        // Aquí iría tu fetch a /api/clock
        setIsClockedIn(!isClockedIn);
        setNote('');
    };

    return (
        <div className="w-full p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                
                <header>
                    <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Clock className="text-cyan-400" size={32} />
                        Control de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Fichajes</span>
                    </h2>
                    <p className="text-gray-400 mt-2">Registra tu jornada laboral y notifica incidencias.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* PANEL IZQUIERDO: HORARIOS */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/5 rounded-xl">
                                <CalendarClock className="text-gray-300" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Días y Horarios</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            Información detallada sobre tu jornada laboral, turnos y horarios de trabajo asignados según convenio.
                        </p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-gray-300 font-medium">Lunes - Jueves</span>
                                <span className="text-cyan-400 font-mono font-bold tracking-wider">08:00 - 17:30</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-gray-300 font-medium">Viernes</span>
                                <span className="text-cyan-400 font-mono font-bold tracking-wider">08:00 - 14:00</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* PANEL DERECHO: ACCIÓN DE FICHAR */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl flex flex-col"
                    >
                        {/* Estado actual */}
                        <div className="flex items-center justify-center gap-3 p-4 bg-black/40 rounded-xl border border-white/5 mb-8">
                            <span className="text-gray-400 font-medium">Estado actual:</span>
                            {isClockedIn ? (
                                <span className="flex items-center gap-2 text-green-400 font-bold px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Trabajando
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-gray-300 font-bold px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                                    Sin fichaje activo
                                </span>
                            )}
                        </div>

                        {/* Input Incidencias */}
                        <div className="mb-6 flex-grow">
                            <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <AlertCircle size={14} /> Incidencia (opcional)
                            </label>
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Escribe una incidencia si llegas tarde o sales por médico..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none h-28"
                            />
                        </div>

                        {/* Botón dinámico */}
                        <button 
                            onClick={handleClock}
                            className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${
                                isClockedIn 
                                ? "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                                : "bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500 hover:text-black shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                            }`}
                        >
                            {isClockedIn ? <Square size={20} /> : <Play size={20} />}
                            {isClockedIn ? 'Finalizar Jornada' : 'Fichar Entrada'}
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}