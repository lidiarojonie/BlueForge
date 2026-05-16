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
            // Pasamos el estado actualizado directamente para que no haya retrasos
            generateBuild({ ...answers, [key]: value });
        }
    };

    // 🔥 LA MAGIA OCURRE AQUÍ: Ahora lee tu BD y elige piezas de verdad
    const generateBuild = async (finalAnswers: Answers) => {
        setIsAnalyzing(true);
        
        try {
            // 1. Nos traemos todas tus piezas de la base de datos
            const res = await fetch('http://localhost:3000/api/parts');
            const allParts = await res.json();
            
            // 2. Filtramos solo las de la consola que ha elegido el usuario
            const dbBaseId = finalAnswers.platform === 'ps4' ? 2 : 3;
            const platformParts = allParts.filter((p: any) => p.base_product_id === dbBaseId && p.active);
            
            // 3. Función inteligente para elegir la pieza que mejor encaje
            const findPart = (category: string, style: string, subType: string = '') => {
                // Filtramos por categoría (y por tipo de joystick si hace falta)
                const parts = platformParts.filter((p: any) => {
                    const isCatMatch = p.category === category;
                    const isSubMatch = subType ? (p.name || p.color || '').toLowerCase().includes(subType) : true;
                    return isCatMatch && isSubMatch;
                });

                if (parts.length === 0) return null;
                
                // Definimos la paleta de colores según el estilo elegido
                let preferredColors: string[] = [];
                if (style === 'stealth') preferredColors = ['black', 'negro', 'carbon', 'carbono', 'grey', 'gris'];
                if (style === 'flashy') preferredColors = ['red', 'rojo', 'pink', 'rosa', 'cyan', 'yellow', 'amarillo', 'purple', 'morado', 'lime', 'verde', 'azul'];
                
                // Buscamos una pieza que encaje en esa paleta
                const match = parts.find((p: any) => {
                    const colorName = (p.name || p.color || '').toLowerCase();
                    return preferredColors.some(c => colorName.includes(c));
                });
                
                // Si encontramos un color que cuadre, devolvemos su ID. Si no, cogemos el último (para asegurar que ponga algo)
                const selectedPart = match || parts[parts.length - 1];
                return selectedPart.id || selectedPart.customizable_part_id;
            };

            // Lógica para la forma del joystick según el juego
            let recommendedShape = 'Concavo-bajo'; 
            if (finalAnswers.genre === 'fps') recommendedShape = 'Concavo-alto'; // Más precisión para apuntar
            if (finalAnswers.genre === 'rpg') recommendedShape = 'Convexo-bajo'; // Más comodidad para mundo abierto
            if (finalAnswers.genre === 'racing') recommendedShape = 'Concavo-bajo'; // Agarre rápido

            // Armamos la build con IDs reales sacados de tu base de datos
            const recommendedBuild = {
                s: findPart('shell', finalAnswers.style || 'stealth'),
                b: findPart('buttons', finalAnswers.style || 'stealth'),
                jb: findPart('joysticks', finalAnswers.style || 'stealth', 'base'),
                jm: findPart('joysticks', finalAnswers.style || 'stealth', 'seta'), // Busca 'seta' o 'mushroom'
                d: findPart('d_pad', finalAnswers.style || 'stealth'),
                t: findPart('texture', finalAnswers.style || 'stealth'),
                sh: recommendedShape
            };

            const hash = btoa(JSON.stringify(recommendedBuild));
            
            // Damos 2.5 segunditos de "paripé" visual antes de redirigir
            setTimeout(() => {
                navigate(`/personalizador?mando=${finalAnswers.platform}&build=${hash}`);
            }, 2500);

        } catch (error) {
            console.error("Error al generar la build:", error);
            // Si algo falla, al menos te manda al configurador base
            navigate(`/personalizador?mando=${finalAnswers.platform}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-16 font-sans relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-2xl w-full px-6 relative z-10">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                        <Bot size={40} className="text-cyan-400" />
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
                        Forge <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Assistant</span>
                    </h1>
                    <p className="text-gray-400">Let our AI-powered assistant recommend the perfect controller build for your playstyle.</p>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm min-h-[400px] flex flex-col justify-center relative">
                    
                    {!isAnalyzing && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-t-3xl overflow-hidden">
                            <motion.div 
                                className="h-full bg-cyan-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 0 && !isAnalyzing && (
                            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                                <h2 className="text-2xl font-bold mb-8">Ready to find your perfect weapon?</h2>
                                <button 
                                    onClick={() => setStep(1)}
                                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105"
                                >
                                    Start Quiz
                                </button>
                            </motion.div>
                        )}

                        {step === 1 && !isAnalyzing && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-2xl font-bold mb-8 text-center">Which console do you play on?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button onClick={() => handleAnswer('platform', 'ps4')} className="p-6 bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <h3 className="text-xl font-black uppercase tracking-widest text-gray-300 group-hover:text-cyan-400">PS4</h3>
                                        <p className="text-sm text-gray-500 mt-2">DualShock 4 Based</p>
                                    </button>
                                    <button onClick={() => handleAnswer('platform', 'ps5')} className="p-6 bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <h3 className="text-xl font-black uppercase tracking-widest text-gray-300 group-hover:text-cyan-400">PS5</h3>
                                        <p className="text-sm text-gray-500 mt-2">DualSense Based</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && !isAnalyzing && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-2xl font-bold mb-8 text-center">What is your main gaming genre?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button onClick={() => handleAnswer('genre', 'fps')} className="p-6 flex flex-col items-center text-center bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <Crosshair size={32} className="text-gray-400 group-hover:text-cyan-400 mb-4" />
                                        <h3 className="text-lg font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Shooters / FPS</h3>
                                        <p className="text-xs text-gray-500 mt-2">CoD, Valorant, Apex</p>
                                    </button>
                                    <button onClick={() => handleAnswer('genre', 'rpg')} className="p-6 flex flex-col items-center text-center bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <Map size={32} className="text-gray-400 group-hover:text-cyan-400 mb-4" />
                                        <h3 className="text-lg font-black uppercase tracking-widest text-gray-300 group-hover:text-white">RPG / Adventure</h3>
                                        <p className="text-xs text-gray-500 mt-2">Elden Ring, God of War</p>
                                    </button>
                                    <button onClick={() => handleAnswer('genre', 'racing')} className="p-6 flex flex-col items-center text-center bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <Car size={32} className="text-gray-400 group-hover:text-cyan-400 mb-4" />
                                        <h3 className="text-lg font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Sports / Racing</h3>
                                        <p className="text-xs text-gray-500 mt-2">EA FC, F1, Forza</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && !isAnalyzing && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-2xl font-bold mb-8 text-center">What is your aesthetic vibe?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button onClick={() => handleAnswer('style', 'stealth')} className="p-6 flex flex-col items-center text-center bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <Shield size={32} className="text-gray-400 group-hover:text-cyan-400 mb-4" />
                                        <h3 className="text-lg font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Stealth & Clean</h3>
                                        <p className="text-xs text-gray-500 mt-2">Dark colors, minimalist</p>
                                    </button>
                                    <button onClick={() => handleAnswer('style', 'flashy')} className="p-6 flex flex-col items-center text-center bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                                        <Sparkles size={32} className="text-gray-400 group-hover:text-cyan-400 mb-4" />
                                        <h3 className="text-lg font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Flashy & Neon</h3>
                                        <p className="text-xs text-gray-500 mt-2">Bright colors, stand out</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12">
                                <div className="relative w-24 h-24 mb-8">
                                    <motion.div 
                                        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="absolute inset-0 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Target size={32} className="text-cyan-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Analyzing your profile...</h3>
                                <p className="text-cyan-400 font-mono text-sm animate-pulse">Forging the perfect build based on your answers</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}