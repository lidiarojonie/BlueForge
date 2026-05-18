import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Crosshair, Map, Car, Target, Shield, Sparkles } from 'lucide-react';

type Answers = {
    platform: 'ps4' | 'ps5' | null;
    genre: 'fps' | 'rpg' | 'racing' | null;
    style: 'stealth' | 'flashy' | null;
};

export default function ForgeAssistant() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [answers, setAnswers] = useState<Answers>({
        platform: null,
        genre: null,
        style: null
    });

    const handleAnswer = (key: keyof Answers, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        
        if (step < 3) {
            setStep(step + 1);
        } else {
            generateBuild({ ...answers, [key]: value });
        }
    };

    const generateBuild = async (finalAnswers: Answers) => {
        setIsAnalyzing(true);
        
        try {
            const res = await fetch('http://localhost:3000/api/parts');
            const allParts = await res.json();
            
            const dbBaseId = finalAnswers.platform === 'ps4' ? 2 : 3;
            const platformParts = allParts.filter((p: any) => p.base_product_id === dbBaseId && p.active);
            
            // 🔥 FUNCIÓN DE BÚSQUEDA CORREGIDA Y SEGURA 🔥
            const findPart = (category: string, style: string, subType: string = '') => {
                const parts = platformParts.filter((p: any) => {
                    const isCatMatch = p.category === category;
                    const isSubMatch = subType ? (p.name || p.color || '').toLowerCase().includes(subType) : true;
                    return isCatMatch && isSubMatch;
                });

                // Si no hay piezas de esta categoría, devolvemos null y listos.
                if (parts.length === 0) return null;
                
                // Paleta de colores CLAROS estricta para proyector.
                let preferredColors: string[] = [];
                
                if (style === 'stealth') {
                    preferredColors = ['white', 'blanco', 'grey', 'gris', 'black', 'negro', 'clear'];
                } 
                if (style === 'flashy') {
                    preferredColors = ['white', 'blanco', 'pink', 'rosa', 'cyan', 'yellow', 'amarillo', 'lime', 'verde', 'orange', 'naranja', 'azul-claro'];
                }
                
                const match = parts.find((p: any) => {
                    const colorName = (p.name || p.color || '').toLowerCase();
                    const isDark = /(carbon|gris-oscuro|dark|rojo-oscuro)/.test(colorName);
                    return preferredColors.some(c => colorName.includes(c)) && !isDark;
                });
                
                // 🔥 EL FIX: Cogemos la pieza que encaje. Si no hay match, buscamos una blanca. Si no hay blanca, pillamos la primera.
                const finalPart = match || parts.find((p: any) => (p.name || p.color || '').toLowerCase().includes('white')) || parts[0];

                // Y ahora sí, devolvemos el ID venga en el formato que venga. Cero errores.
                return finalPart.id || finalPart.customizable_part_id;
            };

            let recommendedShape = 'Concavo-bajo'; 
            if (finalAnswers.genre === 'fps') recommendedShape = 'Concavo-alto'; 
            if (finalAnswers.genre === 'rpg') recommendedShape = 'Convexo-bajo'; 
            if (finalAnswers.genre === 'racing') recommendedShape = 'Concavo-bajo'; 

            // Personalizamos TODO asegurándonos que encaje en el personalizador
            const recommendedBuild = {
                s: findPart('shell', finalAnswers.style || 'stealth'),
                b: findPart('buttons', finalAnswers.style || 'stealth'),
                jb: findPart('joysticks', finalAnswers.style || 'stealth', 'base'),
                jm: findPart('joysticks', finalAnswers.style || 'stealth', 'seta'), 
                d: findPart('d_pad', finalAnswers.style || 'stealth'),
                t: findPart('texture', finalAnswers.style || 'stealth'), 
                sh: recommendedShape
            };

            const hash = btoa(JSON.stringify(recommendedBuild));
            
            setTimeout(() => {
                navigate(`/personalizador?mando=${finalAnswers.platform}&build=${hash}`);
            }, 3000);

        } catch (error) {
            console.error("Error al generar la build:", error);
            navigate(`/personalizador?mando=${finalAnswers.platform}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-16 font-sans relative overflow-hidden flex flex-col items-center justify-center">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-4xl w-full px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.8 }}
                        className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                    >
                        <Bot size={48} className="text-cyan-400" />
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">
                        Forge <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Assistant</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Retire initialization. Let our AI forge your *complete* personalized hardware setup using clear-color components for maximum visibility.
                    </p>
                </div>

                <div className="bg-zinc-900/40 border border-white/10 rounded-[2rem] p-8 md:p-16 backdrop-blur-xl shadow-2xl min-h-[450px] flex flex-col justify-center relative overflow-hidden">
                    
                    {/* Barra de progreso */}
                    {!isAnalyzing && (
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-black/50">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 0 && !isAnalyzing && (
                            <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} className="text-center">
                                <h2 className="text-3xl font-black uppercase tracking-wider mb-10 text-white">System Initialization (Full Customize)</h2>
                                <p className="text-gray-400 mb-12 text-lg">Answer 3 quick questions. We will use maximum customization, strictly adhering to clear colors for proyector safety.</p>
                                <button 
                                    onClick={() => setStep(1)}
                                    className="px-12 py-5 bg-white text-black font-black text-lg uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105"
                                >
                                    Start Core Analysis
                                </button>
                            </motion.div>
                        )}

                        {step === 1 && !isAnalyzing && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}>
                                <h2 className="text-2xl md:text-3xl font-black mb-12 text-center uppercase tracking-widest text-cyan-400">1. Target Platform</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button onClick={() => handleAnswer('platform', 'ps4')} className="p-8 bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group flex flex-col items-center justify-center min-h-[200px]">
                                        <h3 className="text-3xl font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white mb-3">PS4</h3>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-cyan-400">DualShock Architecture</p>
                                    </button>
                                    <button onClick={() => handleAnswer('platform', 'ps5')} className="p-8 bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group flex flex-col items-center justify-center min-h-[200px]">
                                        <h3 className="text-3xl font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white mb-3">PS5</h3>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-cyan-400">DualSense Architecture</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && !isAnalyzing && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}>
                                <h2 className="text-2xl md:text-3xl font-black mb-12 text-center uppercase tracking-widest text-cyan-400">2. Combat Environment</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <button onClick={() => handleAnswer('genre', 'fps')} className="p-8 flex flex-col items-center text-center bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group">
                                        <Crosshair size={40} className="text-gray-500 group-hover:text-cyan-400 mb-6 transition-colors" />
                                        <h3 className="text-xl font-black uppercase tracking-widest text-gray-300 group-hover:text-white mb-2">FPS / Shooter</h3>
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-cyan-400/70">CoD, Valorant</p>
                                    </button>
                                    <button onClick={() => handleAnswer('genre', 'rpg')} className="p-8 flex flex-col items-center text-center bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group">
                                        <Map size={40} className="text-gray-500 group-hover:text-cyan-400 mb-6 transition-colors" />
                                        <h3 className="text-xl font-black uppercase tracking-widest text-gray-300 group-hover:text-white mb-2">RPG / Adventure</h3>
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-cyan-400/70">Elden Ring, GoW</p>
                                    </button>
                                    <button onClick={() => handleAnswer('genre', 'racing')} className="p-8 flex flex-col items-center text-center bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group">
                                        <Car size={40} className="text-gray-500 group-hover:text-cyan-400 mb-6 transition-colors" />
                                        <h3 className="text-xl font-black uppercase tracking-widest text-gray-300 group-hover:text-white mb-2">Sports / Racing</h3>
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-cyan-400/70">EA FC, Forza</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && !isAnalyzing && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}>
                                <h2 className="text-2xl md:text-3xl font-black mb-12 text-center uppercase tracking-widest text-cyan-400">3. Clear-Aesthetic Vibe</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button onClick={() => handleAnswer('style', 'stealth')} className="p-8 flex flex-col items-center justify-center text-center bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group min-h-[220px]">
                                        <Shield size={40} className="text-gray-500 group-hover:text-cyan-400 mb-6 transition-colors" />
                                        <h3 className="text-2xl font-black uppercase tracking-widest text-gray-300 group-hover:text-white mb-2">Stealth-Clear</h3>
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-cyan-400/70">Clean lines, high contrast (Clear)</p>
                                    </button>
                                    <button onClick={() => handleAnswer('style', 'flashy')} className="p-8 flex flex-col items-center justify-center text-center bg-zinc-800/50 border border-white/5 rounded-3xl hover:border-fuchsia-400 hover:bg-fuchsia-500/10 transition-all duration-300 group min-h-[220px]">
                                        <Sparkles size={40} className="text-gray-500 group-hover:text-fuchsia-400 mb-6 transition-colors" />
                                        <h3 className="text-2xl font-black uppercase tracking-widest text-gray-300 group-hover:text-white mb-2">Flashy Neon (Clear)</h3>
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-fuchsia-400/70">Vibrant, bold (Proyector Ready)</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-16">
                                <div className="relative w-32 h-32 mb-12">
                                    <motion.div 
                                        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                        className="absolute inset-0 border-4 border-white/5 border-t-cyan-400 rounded-full"
                                    />
                                    <motion.div 
                                        animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        className="absolute inset-4 border-2 border-transparent border-b-blue-500 rounded-full opacity-50"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Bot size={40} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-widest mb-4">Forging Total Build...</h3>
                                <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm animate-pulse">Retire minimal active. Reconfiguring every hardware node to clear palette.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}