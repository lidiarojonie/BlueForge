import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Home, ClipboardList, Zap } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full z-10"
      >
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-center relative overflow-hidden">
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          >
            <CheckCircle size={48} className="text-cyan-400" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4"
          >
            THANK YOU FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">YOUR ORDER!</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg leading-relaxed mb-10 font-medium"
          >
            Your gear is being prepared by our master craftsmen. We'll notify you as soon as your weapon is ready for battle.
          </motion.p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/mis-pedidos')}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <ClipboardList size={20} /> View My Orders
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="w-full py-5 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all"
            >
              <Home size={20} /> Back to Home
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center gap-1">
              <Package size={20} className="text-gray-500" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Secure Shipping</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap size={20} className="text-gray-500" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">PRO Support</p>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Decorative floating icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-[15%] text-cyan-500 pointer-events-none"
      >
        <Package size={40} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-[15%] text-blue-500 pointer-events-none"
      >
        <Zap size={40} />
      </motion.div>

    </div>
  );
}
