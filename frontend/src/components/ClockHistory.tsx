import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Download, FileSpreadsheet, ArrowRightCircle, ArrowLeftCircle, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ClockHistory() {
    // Datos de prueba (Mock) - Cuando conectes el backend, aquí harás el fetch a tu API
    const [history, setHistory] = useState([
        { id: 1, date: '2026-05-08', time: '17:35', type: 'out', note: '' },
        { id: 2, date: '2026-05-08', time: '08:00', type: 'in', note: '' },
        { id: 3, date: '2026-05-07', time: '17:30', type: 'out', note: 'Salida puntual' },
        { id: 4, date: '2026-05-07', time: '07:55', type: 'in', note: '' },
        { id: 5, date: '2026-05-06', time: '18:15', type: 'out', note: 'Cierre de inventario' },
        { id: 6, date: '2026-05-06', time: '08:05', type: 'in', note: 'Atasco en la M-40' },
    ]);

    // Función mágica para exportar a Excel
    const handleExportExcel = () => {
        // 1. Preparamos los datos para que queden bonitos en el Excel
        const dataToExport = history.map(row => ({
            'Fecha': row.date,
            'Hora': row.time,
            'Movimiento': row.type === 'in' ? '🟢 Entrada' : '🔴 Salida',
            'Notas / Incidencias': row.note || '---'
        }));

        // 2. Creamos el libro y la hoja
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Historial");

        // 3. Descargamos el archivo
        XLSX.writeFile(workbook, "Historial_Fichajes_BlueForge.xlsx");
    };

    return (
        <div className="w-full p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* CABECERA Y BOTÓN EXCEL */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                            <History className="text-cyan-400" size={32} />
                            Histórico de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Actividad</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Consulta tus últimos movimientos o exporta el registro mensual.</p>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500 hover:text-black font-semibold transition-all shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    >
                        <FileSpreadsheet size={20} />
                        Exportar a Excel
                    </motion.button>
                </header>

                {/* CONTENEDOR DE LA TABLA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-xl"
                >
                    {/* Barra de herramientas de la tabla (Buscador visual) */}
                    <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Buscar por fecha o nota..." 
                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            Mostrando {history.length} registros
                        </div>
                    </div>

                    {/* La Tabla */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/40 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="p-5 font-semibold">Fecha</th>
                                    <th className="p-5 font-semibold">Hora</th>
                                    <th className="p-5 font-semibold">Tipo</th>
                                    <th className="p-5 font-semibold">Incidencia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                {history.map((row) => (
                                    <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-5 font-mono text-sm">{row.date}</td>
                                        <td className="p-5 font-mono text-sm text-white group-hover:text-cyan-400 transition-colors">{row.time}</td>
                                        <td className="p-5">
                                            {row.type === 'in' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                    <ArrowRightCircle size={14} /> Entrada
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                                    <ArrowLeftCircle size={14} /> Salida
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5 text-sm text-gray-400">
                                            {row.note ? (
                                                <span>{row.note}</span>
                                            ) : (
                                                <span className="text-gray-600 italic">---</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}