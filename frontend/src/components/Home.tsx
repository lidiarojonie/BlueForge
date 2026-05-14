import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

// Images
import instagramLogo from '../imgs/instagram.jpg';
import twitterLogo from '../imgs/twitter.jpg';
import tiktokLogo from '../imgs/tiktok.jpg';
import mainLogo from '../imgs/new_logo.png';

import ps5Img from '../imgs/ps5_custom.png';
import xboxImg from '../imgs/xbox_custom.png';
import ps4Img from '../imgs/ps4_custom.png';

const featured = [
    {
        id: 'ps5',
        title: "CUSTOM PS5",
        subtitle: "NEXT-GEN DOMINANCE",
        image: ps5Img, 
        color: "text-cyan-400",
        bgDiagonal: "from-cyan-600/60 to-blue-900/10",
        glowColor: "rgba(34,211,238,0.4)" 
    },
    {
        id: 'xbox',
        title: "XBOX ELITE",
        subtitle: "UNMATCHED PRECISION",
        image: xboxImg, 
        color: "text-green-400",
        bgDiagonal: "from-green-600/60 to-emerald-900/10",
        glowColor: "rgba(74,222,128,0.4)" 
    },
    {
        id: 'ps4',
        title: "PS4 CLASSIC",
        subtitle: "RETRO PERFORMANCE",
        image: ps4Img, 
        color: "text-blue-500",
        bgDiagonal: "from-blue-600/60 to-indigo-900/10",
        glowColor: "rgba(59,130,246,0.4)" 
    }
];

export default function Home() {
    const navigate = useNavigate();
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx(prev => (prev + 1) % featured.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden relative">

            {/* ===================================== */}
            {/* 1. HERO SECTION                       */}
            {/* ===================================== */}
            <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-[-20%] right-[-10%] w-[70%] h-[150%] bg-gradient-to-bl ${featured[idx].bgDiagonal} -rotate-12 blur-3xl opacity-80 transition-all duration-1000`}></div>
                    <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay"></div>
                </div>

                <div className="max-w-[90rem] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full relative">
                    
                    {/* TEXTS (Left) */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1 items-center lg:items-start lg:col-span-6 relative z-20">
                        <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{ duration: 0.5 }}>
                            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs md:text-sm flex items-center gap-2 mb-4">
                                <Zap size={16} className="text-yellow-400" /> GUARANTEED ELITE PERFORMANCE
                            </p>
                            <AnimatePresence mode="wait">
                                <motion.h2 
                                    key={`title-${featured[idx].id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-[5rem] md:text-[8rem] lg:text-[9.5rem] font-black italic uppercase leading-[0.85] tracking-tighter drop-shadow-2xl"
                                >
                                    {featured[idx].title.split(' ')[0]} <br/>
                                    <span className={featured[idx].color}>
                                        {featured[idx].title.split(' ')[1]}
                                    </span>
                                </motion.h2>
                            </AnimatePresence>
                            <p className="text-xl md:text-2xl text-gray-300 mt-8 max-w-lg font-medium leading-relaxed">
                                Design your ultimate weapon. Custom shells, rapid-fire triggers, and premium grips.
                            </p>

                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (featured[idx].id === 'xbox') {
                                        navigate('/xbox-elite');
                                    } else {
                                        navigate(`/personalizador?mando=${featured[idx].id}`);
                                    }
                                }}
                                className={`mt-8 px-10 py-4 ${featured[idx].id === 'xbox' ? 'bg-green-500' : 'bg-cyan-500'} text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all flex items-center gap-3`}
                            >
                                {featured[idx].id === 'xbox' ? 'Ver Detalles' : 'Configurar Ahora'}
                                <Zap size={20} />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* FLOATING CONTROLLER (Right) */}
                    <div className="relative flex items-center justify-center order-1 lg:order-2 h-[450px] md:h-[700px] pointer-events-none lg:col-span-6 z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featured[idx].id}
                                initial={{opacity:0, scale:0.8, x: 100}}
                                animate={{opacity:1, scale:1, x: 0, y: [0, -20, 0]}}
                                exit={{opacity:0, scale:0.8, x: -100}}
                                transition={{ duration: 0.6, type: "spring", y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                                className="relative z-10 w-full flex justify-center cursor-pointer pointer-events-auto"
                                onClick={() => {
                                    if (featured[idx].id === 'xbox') {
                                        navigate('/xbox-elite');
                                    } else {
                                        navigate(`/personalizador?mando=${featured[idx].id}`);
                                    }
                                }}
                            >
                                <img 
                                    src={featured[idx].image} 
                                    alt="Pro Controller" 
                                    className="w-[110%] lg:w-[120%] max-w-[900px] object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.8)]"
                                    style={{ clipPath: 'inset(2px)' }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ===================================== */}
            {/* 2. BLUEFORGE DESIGN SECTION           */}
            {/* ===================================== */}
            <section className="py-24 bg-[#08080c] relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-8">
                    
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-wider">
                            <span className="text-white">BlueForge</span> <span className="text-cyan-500">Design</span>
                        </h2>
                        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
                            BlueForge Design is the ultimate configurator. Follow simple steps to customize a standard controller, or if you're on another level, enjoy the massive advantages of our PRO line.
                        </p>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
                        {/* LEFT POINTS */}
                        <div className="flex-1 space-y-20 z-10 w-full">
                            <div className="text-right flex items-center justify-end gap-6">
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase mb-2">Custom Shells</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Personalize your controller's shell with a wide range of colors, textures, and premium grips.</p>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-[#08080c] shadow-[0_0_20px_rgba(34,211,238,0.8)] flex-shrink-0 relative">
                                    <div className="absolute inset-1 bg-cyan-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-right flex items-center justify-end gap-6">
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase mb-2">Pro Performance</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Configure and customize our PRO range (back paddles, smart triggers, and interchangeable joysticks).</p>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-[#08080c] shadow-[0_0_20px_rgba(34,211,238,0.8)] flex-shrink-0 relative">
                                    <div className="absolute inset-1 bg-cyan-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* CENTER IMAGE */}
                        <div className="flex-[1.2] flex justify-center relative py-10">
                            <div className="absolute w-72 h-72 bg-cyan-600/20 rounded-full blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            <img src={ps4Img} alt="BlueForge Custom Configurator" className="w-full max-w-[450px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] relative z-10" />
                        </div>

                        {/* RIGHT POINTS */}
                        <div className="flex-1 space-y-20 z-10 w-full">
                            <div className="text-left flex items-center justify-start gap-6">
                                <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-[#08080c] shadow-[0_0_20px_rgba(34,211,238,0.8)] flex-shrink-0 relative">
                                    <div className="absolute inset-1 bg-cyan-400 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase mb-2">Buttons & D-Pad</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Customize the action buttons and D-Pad with an incredible variety of colors and metallic finishes.</p>
                                </div>
                            </div>
                            <div className="text-left flex items-center justify-start gap-6">
                                <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-[#08080c] shadow-[0_0_20px_rgba(34,211,238,0.8)] flex-shrink-0 relative">
                                    <div className="absolute inset-1 bg-cyan-400 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase mb-2">Personal Logo</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Add your own custom logo, gamer tag, and text with different exclusive typographies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================== */}
            {/* 3. FOOTER SECTION                     */}
            {/* ===================================== */}
            <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <img src={mainLogo} alt="BlueForge Logo" className="h-20 md:h-24 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] mb-4" />
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Elite custom controllers crafted for professional gamers and esports enthusiasts. Rule your game.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest mb-6 border-l-2 border-cyan-500 pl-3">Products</h4>
                        <ul className="space-y-3 text-gray-400 text-sm font-bold">
                            <li><a href="/personalizador?mando=ps5" className="hover:text-cyan-400 transition-colors">PS5 Custom</a></li>
                            <li><a href="/personalizador?mando=ps4" className="hover:text-cyan-400 transition-colors">PS4 Custom</a></li>
                            <li><a href="/xbox-elite" className="hover:text-cyan-400 transition-colors">Xbox Elite</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest mb-6 border-l-2 border-cyan-500 pl-3">Support</h4>
                        <ul className="space-y-3 text-gray-400 text-sm font-bold">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ & Guides</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Warranty Info</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest mb-6 border-l-2 border-cyan-500 pl-3">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                                <img src={instagramLogo} alt="Instagram" className="w-8 h-8 rounded-md" />
                            </a>
                            <a href="https://x.com/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                                <img src={twitterLogo} alt="Twitter" className="w-8 h-8 rounded-md" />
                            </a>
                            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                                <img src={tiktokLogo} alt="TikTok" className="w-8 h-8 rounded-md" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 text-gray-600 text-xs font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 BLUEFORGE. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}