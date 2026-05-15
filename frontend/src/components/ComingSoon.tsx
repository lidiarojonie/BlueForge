import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Bell, Share2 } from 'lucide-react';
import xboxImg from '../imgs/xbox_custom.png';

export default function ComingSoon() {
    const navigate = useNavigate();

    const handleNotify = () => {
        alert("Notification enabled. We'll let you know when it goes on sale");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">

            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[70%] bg-green-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-emerald-900/10 blur-[100px] rounded-full"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-500 hover:text-green-400 font-bold uppercase tracking-widest text-xs transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>

                    <div className="space-y-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-tighter"
                        >
                            <Rocket size={14} /> Launching Soon
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter">
                            XBOX <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">ELITE SERIES</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                            We are forging the ultimate tool for Xbox. Full customization, smart triggers, and premium materials. The wait will be worth it.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNotify}
                            className="px-8 py-4 bg-green-500 text-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:bg-green-400 transition-all"
                        >
                            <Bell size={18} /> Notify Me on Launch
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            className="px-8 py-4 bg-transparent border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all"
                        >
                            <Share2 size={18} /> Share the Hype
                        </motion.button>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex gap-12">
                        <div>
                            <p className="text-green-500 font-black text-2xl">95%</p>
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Development</p>
                        </div>
                        <div>
                            <p className="text-white font-black text-2xl">Q3 2026</p>
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Estimated Date</p>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative flex items-center justify-center"
                >
                    <div className="absolute w-80 h-80 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
                    <img
                        src={xboxImg}
                        alt="Xbox Elite Preview"
                        className="w-full max-w-[600px] relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-green-500/50"></div>
                    <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-green-500/50"></div>
                </motion.div>
            </div>

            {/* Bottom Marquee (Visual decoration) */}
            <div className="absolute bottom-0 w-full overflow-hidden py-4 border-t border-white/5 opacity-20">
                <div className="flex gap-20 animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className="text-4xl font-black italic uppercase tracking-tighter text-gray-800">
                            XBOX ELITE SERIES • FORGED FOR GLORY • CUSTOM BUILT • BLUEFORGE • XBOX ELITE SERIES
                        </span>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}} />
        </div>
    );
}
