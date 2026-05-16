import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Clock, Flame, Zap, Rss } from 'lucide-react'; // 🔥 AÑADIDO: Rss para vibe punk

// Importamos tu imagen local real
import limitedMandoImg from '../imgs/MandoLimitado.png';

export default function DropsPage() {
    const { addToCart } = useCart();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 14);
        targetDate.setMinutes(targetDate.getMinutes() + 37);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleBuyDrop = () => {
        // 🔥 AHORA SÍ: Preparamos los datos CORRECTOS para el carrito
        addToCart({
            id: 999, // ID especial para Drops
            name: "PS5 Custom 'Pink Punk' Edition", // 🔥 Nuevo Nombre
            description: "Limited Edition Drop - Graffiti 'Pink Punk' Design with Spike Studs & Chain Charm.", // 🔥 Nueva Descripción
            price: 149.99,
            category: 'Exclusive Drops',
            stock: 1, 
            // 🔥 SOLUCIÓN AQUÍ: Usamos la variable importada limitedMandoImg, NO texto literal
            image_url: limitedMandoImg 
        });
        // Actualizamos alerta en inglés
        alert('🔥 "Pink Punk" Edition added to cart!\nRiot before it sells out.');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 font-sans relative overflow-hidden">
            {/* Fondo con luces Synthwave/Punk */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/15 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/50 text-red-400 font-black uppercase tracking-[0.2em] text-xs mb-6"
                    >
                        <Flame size={16} /> Live Drop
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        // 🔥 Nuevo Gradiente más Punk
                        className="text-5xl md:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-fuchsia-500 to-red-600 mb-4"
                    >
                        Pink Punk
                    </motion.h1>
                    <p className="text-gray-400 text-lg max-w-2xl font-medium">
                        Riot on the sticks. Graffiti design, real metal spike studs, and a custom skull chain charm. This exclusive 'Pink Punk' DualSense is limited to just 50 pieces. Once the timer hits zero, it's game over forever.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Imagen del mando */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="relative rounded-[2rem] p-4 flex items-center justify-center border border-white/5 bg-zinc-900/30 backdrop-blur-sm shadow-2xl"
                    >
                        {/* Brillo trasero */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/15 to-red-600/15 blur-[60px] rounded-full z-0"></div>

                        <img 
                            src={limitedMandoImg} // Usamos la imagen importada
                            alt="Pink Punk Edition Controller" 
                            className="w-full max-w-[500px] relative z-10 hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>

                    <div className="space-y-8">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                            <div className="flex items-center gap-2 text-gray-400 mb-4 text-sm font-bold uppercase tracking-widest">
                                <Clock size={16} className="text-red-500" /> Ends In
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-zinc-900 rounded-xl py-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                    <span className="block text-4xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Hours</span>
                                </div>
                                <div className="bg-zinc-900 rounded-xl py-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                    <span className="block text-4xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Minutes</span>
                                </div>
                                <div className="bg-zinc-900 rounded-xl py-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                    <span className="block text-4xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Seconds</span>
                                </div>
                            </div>
                        </div>

                        {/* Specs Actualizadas al estilo Punk */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-2">Build Specifications</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300"><Rss size={16} className="text-red-400"/> Graffiti 'Pink Punk' Drip Shell</li>
                                <li className="flex items-center gap-3 text-gray-300"><Rss size={16} className="text-red-400"/> Spiked Stud Grip Casing</li>
                                <li className="flex items-center gap-3 text-gray-300"><Rss size={16} className="text-red-400"/> Custom Skull Chain Charm</li>
                                <li className="flex items-center gap-3 text-gray-300"><Rss size={16} className="text-red-400"/> High-Grip Hot Pink Joysticks</li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest line-through">€199.99</p>
                                <p className="text-4xl font-black text-white">€149.99</p>
                            </div>
                            <button 
                                onClick={handleBuyDrop}
                                className="px-8 py-4 bg-gradient-to-r from-red-600 to-fuchsia-600 hover:from-red-500 hover:to-fuchsia-500 text-white font-black text-lg rounded-2xl uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                            >
                                <ShoppingCart size={24} /> Buy Drop
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}