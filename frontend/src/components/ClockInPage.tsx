import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Clock, AlertCircle, CalendarDays, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function ClockInPage() {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [note, setNote] = useState('');
    
    // Obtenemos la fecha REAL de hoy
    const today = new Date();
    // El calendario empieza mostrando el mes actual real
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); 

    // BASE DE DATOS DE FESTIVOS 2026 (Mes: [Días]) - Enero es 0, Mayo es 4.
    const holidays2026: Record<number, number[]> = {
        0: [1, 6, 29],
        2: [5],
        3: [2, 3, 23],
        4: [1],
        7: [15],
        9: [12, 13],
        10: [2],
        11: [6, 8, 24, 25, 31]
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Ajuste para que Lunes = 0

    const blanks = Array.from({ length: startDay }, (_, i) => null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleClock = () => {
        setIsClockedIn(!isClockedIn);
        setNote('');
    };

    return (
        <div className="w-full p-8 font-sans pb-24 bg-[#050505] min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <header>
                    <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Clock className="text-cyan-400" size={32} />
                        Fichajes y <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Calendario</span>
                    </h2>
                    <p className="text-gray-400 mt-2">Consulta tus festivos y registra tu jornada laboral.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* CALENDARIO INTERACTIVO */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col"
                    >
                        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="text-cyan-400" size={28} />
                                <div>
                                    <h3 className="text-xl font-bold text-white">{formattedMonth}</h3>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                        <MapPin size={12}/> España
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={prevMonth} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"><ChevronLeft size={20}/></button>
                                <button onClick={nextMonth} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"><ChevronRight size={20}/></button>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-6 border border-white/5 flex-grow flex flex-col justify-center">
                            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
                                    <div key={day} className="text-gray-500 font-black text-xs">{day}</div>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-7 gap-2">
                                {blanks.map((_, i) => <div key={`blank-${i}`} className="p-3"></div>)}
                                {days.map(day => {
                                    const totalIndex = startDay + day - 1;
                                    const isWeekend = totalIndex % 7 === 5 || totalIndex % 7 === 6; 
                                    const monthHolidays = holidays2026[currentDate.getMonth()] || [];
                                    const isHoliday = monthHolidays.includes(day);
                                    
                                    // Comprobamos si el día que estamos dibujando es HOY en la vida real
                                    const isToday = day === today.getDate() && 
                                                    currentDate.getMonth() === today.getMonth() && 
                                                    currentDate.getFullYear() === today.getFullYear();

                                    // Lógica de colores
                                    let bgClass = "bg-zinc-800/50 text-gray-400 hover:bg-zinc-700 transition-colors cursor-pointer";
                                    
                                    if (isToday) {
                                        bgClass = "bg-cyan-500 text-black font-black shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110 z-10 relative cursor-pointer";
                                    } else if (isWeekend) {
                                        bgClass = "bg-black text-gray-700 opacity-40";
                                    } else if (isHoliday) {
                                        bgClass = "bg-red-500/20 text-red-400 border border-red-500/40 font-bold shadow-[0_0_10px_rgba(239,68,68,0.1)] cursor-pointer";
                                    }

                                    return (
                                        <div key={day} className={`flex items-center justify-center p-2 sm:p-3 rounded-lg text-sm transition-all ${bgClass}`}>
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-white/5 text-[10px] justify-center uppercase tracking-widest font-bold">
                                <div className="flex items-center gap-2 text-cyan-400"><div className="w-2 h-2 bg-cyan-500 rounded-full"></div> Hoy</div>
                                <div className="flex items-center gap-2 text-gray-400"><div className="w-2 h-2 bg-zinc-800 rounded-full"></div> Laborable</div>
                                <div className="flex items-center gap-2 text-red-400"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Festivo</div>
                                <div className="flex items-center gap-2 text-gray-600"><div className="w-2 h-2 bg-black rounded-full"></div> Finde</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* REGISTRO DE JORNADA */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col h-full"
                    >
                        <div className="flex items-center justify-center gap-3 p-5 bg-black/40 rounded-2xl border border-white/5 mb-6">
                            <span className="text-gray-400 font-medium">Estado:</span>
                            {isClockedIn ? (
                                <span className="text-green-400 font-bold px-4 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20 animate-pulse">● Trabajando</span>
                            ) : (
                                <span className="text-gray-500 font-bold px-4 py-1.5 bg-white/5 rounded-lg border border-white/10">○ Inactivo</span>
                            )}
                        </div>

                        <div className="flex flex-col flex-grow mb-6">
                            <label className="flex items-center gap-2 text-sm text-gray-400 mb-3 font-semibold">
                                <AlertCircle size={16} /> Justificar Incidencia
                            </label>
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Escribe aquí cualquier incidencia (médico, retraso, salida anticipada...)"
                                className="w-full h-full min-h-[300px] bg-black/60 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 resize-none transition-all"
                            />
                        </div>

                        <button 
                            onClick={handleClock}
                            className={`w-full flex items-center justify-center gap-3 py-6 rounded-2xl font-black text-xl transition-all ${
                                isClockedIn 
                                ? "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white" 
                                : "bg-cyan-500 text-black border border-cyan-500 hover:bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                            }`}
                        >
                            {isClockedIn ? <Square size={24} /> : <Play size={24} />}
                            {isClockedIn ? 'DETENER JORNADA' : 'FICHAR ENTRADA'}
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}