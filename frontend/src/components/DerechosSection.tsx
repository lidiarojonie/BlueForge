import {
    ArrowLeft,
    Edit3,
    AlertOctagon,
    Calendar,
    Heart,
    Baby,
    Map,
    ShieldAlert,
    Stethoscope,
    Siren,
    FileSignature,
    Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 🔥 RUTAS CORREGIDAS apuntando a tu carpeta 'imgs' 🔥
import imgModificaciones from '../imgs/Infografia_modificacion_de_contratos.jpg';
import imgDespidos from '../imgs/Infografia_despido_disciplinario.jpg';

export default function DerechosSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full p-8 font-sans pb-32 bg-[#050505] min-h-screen text-white">
            <div className="max-w-7xl mx-auto space-y-16">

                <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors font-bold text-lg mb-4 cursor-pointer">
                    <ArrowLeft size={24} /> Volver al panel del Comité
                </button>

                <header className="space-y-4">
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter">Guía de <span className="text-cyan-400">Derechos Laborales</span></h2>
                    <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                        Conoce el marco legal que protege tu contrato. Hemos traducido el Estatuto de los Trabajadores a un lenguaje claro para que sepas cómo reaccionar ante cambios, despidos o necesidades personales.
                    </p>
                </header>

                {/* INFOGRAFÍA 1: MODIFICACIÓN DEL CONTRATO */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <Edit3 className="text-blue-400" size={32} />
                        <h3 className="text-3xl font-bold uppercase tracking-wider italic">Modificaciones de tu Contrato</h3>
                    </div>

                    {/* Wrapper estilizado para la infografía */}
                    <div className="flex justify-center bg-zinc-900/30 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                        <img 
                            src={imgModificaciones} 
                            alt="Infografía detallada sobre Movilidad Funcional, Geográfica y Modificación Sustancial de Condiciones" 
                            className="rounded-2xl w-full max-w-3xl h-auto shadow-[0_0_50px_rgba(59,130,246,0.15)]" 
                        />
                    </div>
                </section>

                {/* INFOGRAFÍA 2: EXTINCIÓN (DESPIDOS) */}
                <section className="space-y-8 pt-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <AlertOctagon className="text-red-400" size={32} />
                        <h3 className="text-3xl font-bold uppercase tracking-wider italic">Extinción y Despidos</h3>
                    </div>

                    {/* Reutilizamos el contenedor de degradado original para enmarcar la imagen */}
                    <div className="bg-gradient-to-br from-red-900/10 to-zinc-900 border border-red-500/20 p-8 rounded-[2.5rem] shadow-2xl flex justify-center">
                        <img 
                            src={imgDespidos} 
                            alt="Infografía sobre Despido Disciplinario: causas y derechos" 
                            className="rounded-2xl w-full max-w-3xl h-auto shadow-[0_0_50px_rgba(239,68,68,0.15)]" 
                        />
                    </div>
                </section>

                {/* INFOGRAFÍA 3: PERMISOS RETRIBUIDOS */}
                <section className="space-y-8 pt-8">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <ShieldAlert className="text-cyan-400" size={32} />
                        <h3 className="text-3xl font-bold uppercase tracking-wider italic">Permisos Retribuidos y Derechos de Interés</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-cyan-500/30 transition-all">
                            <Calendar className="text-cyan-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Vacaciones</h4>
                            <p className="text-gray-400 text-sm">30 días naturales anuales retribuidos conforme al promedio obtenido por la persona trabajadora.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-pink-500/30 transition-all">
                            <Heart className="text-pink-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Matrimonio o Pareja de Hecho</h4>
                            <p className="text-gray-400 text-sm">15 días naturales 100% retribuidos desde el primer día laborable tras formalizar el enlace o registro oficial.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-green-500/30 transition-all">
                            <Baby className="text-green-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Lactancia</h4>
                            <p className="text-gray-400 text-sm">Derecho a 1 hora de ausencia diaria hasta los 9 meses del bebé, o acumularlo en jornadas completas.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-red-400/30 transition-all">
                            <Stethoscope className="text-red-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Hospitalización</h4>
                            <p className="text-gray-400 text-sm">5 días hábiles por accidente, enfermedad grave, hospitalización o intervención quirúrgica de familiares hasta 2º grado.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-orange-500/30 transition-all">
                            <Siren className="text-orange-500 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Fuerza Mayor</h4>
                            <p className="text-gray-400 text-sm">Hasta 4 días al año (por horas o días enteros) por motivos familiares urgentes e imprevisibles que requieran tu presencia.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-purple-500/30 transition-all">
                            <FileSignature className="text-purple-500 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Deber Inexcusable</h4>
                            <p className="text-gray-400 text-sm">El tiempo indispensable para cumplir deberes públicos (votar, juicios, renovar DNI). Requiere justificante.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-blue-400/30 transition-all">
                            <Users className="text-blue-400 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Nacimiento (Baja)</h4>
                            <p className="text-gray-400 text-sm">16 semanas de baja retribuida e intransferible a cada progenitor por nacimiento, adopción o acogimiento de un menor.</p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-lg hover:border-yellow-500/30 transition-all">
                            <Map className="text-yellow-500 mb-6" size={36} />
                            <h4 className="text-xl font-bold mb-3">Mudanza</h4>
                            <p className="text-gray-400 text-sm">1 día laborable de permiso 100% retribuido por motivo de traslado del domicilio habitual justificado.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}