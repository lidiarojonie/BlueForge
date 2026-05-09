import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactoComite() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => navigate('/intranet/comite'), 3000);
        }, 1500);
    };

    return (
        <div className="w-full p-8 font-sans pb-32 bg-[#050505] min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors font-bold text-lg mb-4">
                    <ArrowLeft size={24} /> Volver al inicio
                </button>

                <header className="space-y-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
                            <ShieldCheck size={48} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-white">Canal <span className="text-cyan-400">Confidencial</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Comunícate de forma directa y segura con los representantes de los trabajadores. Toda la información enviada aquí está protegida.
                    </p>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                                <CheckCircle2 size={80} />
                            </motion.div>
                            <h3 className="text-3xl font-black text-white">Mensaje enviado con éxito</h3>
                            <p className="text-gray-400">El Comité ha recibido tu consulta. Nos pondremos en contacto contigo en las próximas 48 horas laborables.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Datos Básicos */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Nombre Completo</label>
                                    <input required type="text" placeholder="Ej. Alex Rivet" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500/50 focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Departamento / Sector</label>
                                    <select required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500/50 focus:outline-none transition-colors appearance-none">
                                        <option value="" disabled selected>Selecciona tu departamento...</option>
                                        <option value="hardware">Taller Hardware</option>
                                        <option value="desarrollo">Desarrollo IT</option>
                                        <option value="logistica">Soporte y Logística</option>
                                        <option value="rrhh">Talento y Cultura (RRHH)</option>
                                        <option value="direccion">Dirección</option>
                                    </select>
                                </div>
                            </div>

                            {/* Motivo */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Motivo de la consulta</label>
                                <select required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500/50 focus:outline-none transition-colors appearance-none">
                                    <option value="" disabled selected>¿De qué trata tu mensaje?</option>
                                    <option value="duda">Duda sobre nóminas o convenio</option>
                                    <option value="conflicto">Conflicto laboral o queja</option>
                                    <option value="propuesta">Propuesta de mejora</option>
                                    <option value="baja">Consultas sobre bajas/permisos</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            {/* Mensaje */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tu Mensaje</label>
                                <textarea required placeholder="Explica detalladamente tu situación..." className="w-full h-40 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500/50 focus:outline-none transition-colors resize-none" />
                            </div>

                            {/* Disclaimer y Botón */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3 text-gray-500 text-xs">
                                    <Lock size={16} className="text-cyan-400 flex-shrink-0" />
                                    <p>Tus datos son procesados bajo la Ley Orgánica de Protección de Datos (LOPD).</p>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Enviando...' : (
                                        <>Enviar al Comité <Send size={20} /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}