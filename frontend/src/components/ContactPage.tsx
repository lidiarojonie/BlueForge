import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, CheckCircle2, MapPin, Phone, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulating API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // After 3 seconds of success, redirect to home
            setTimeout(() => navigate('/'), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] font-sans pt-32 pb-24 px-8 relative overflow-hidden text-gray-100">
            
            {/* Neon background decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                
                {/* LEFT SIDE: Information */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-cyan-400 font-black uppercase tracking-[0.4em] text-sm mb-4">
                            <Zap size={18} /> Elite Support
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                            CONTACT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BLUEFORGE</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Issues with your design? Questions about your Custom Controller shipping? Our support team is ready to assist you with maximum priority.
                        </p>
                    </div>

                    <div className="space-y-8 pt-8 border-t border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5 text-cyan-400 shadow-lg"><Mail size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Direct Email</h4>
                                <p className="text-gray-500 mt-1">support@blueforge.com</p>
                                <p className="text-cyan-600/50 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Response within 24h</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5 text-cyan-400 shadow-lg"><Phone size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Phone Assistance</h4>
                                <p className="text-gray-500 mt-1">+34 900 123 456</p>
                                <p className="text-cyan-600/50 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Mon - Fri, 09:00 to 18:00 (CET)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5 text-cyan-400 shadow-lg"><MapPin size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Headquarters</h4>
                                <p className="text-gray-500 mt-1">Tech Park, Hub 4<br/>Zaragoza, Spain</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Contact Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-10 md:p-12 rounded-[2.5rem] shadow-2xl h-fit"
                >
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                                <CheckCircle2 size={80} />
                            </motion.div>
                            <h3 className="text-3xl font-black text-white">Message Received</h3>
                            <p className="text-gray-400">A technician will review your inquiry and contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Full Name / Gamer Tag</label>
                                <input required type="text" placeholder="e.g. ProSniper99" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Contact Email</label>
                                    <input required type="email" placeholder="you@email.com" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Order ID (Optional)</label>
                                    <input type="text" placeholder="#BF-0000" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Subject</label>
                                <select required className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer">
                                    <option value="" disabled selected>Select an option...</option>
                                    <option value="controller_config">Controller Configuration Inquiry</option>
                                    <option value="shipping_status">Shipping Status</option>
                                    <option value="warranty_returns">Warranty and Returns</option>
                                    <option value="collab_sponsorship">Collaboration / Sponsorship</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Message</label>
                                <textarea required placeholder="How can we help you?" className="w-full h-32 bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all resize-none placeholder:text-gray-700" />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-5 mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.2)] disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sending Data...' : (
                                    <>Send Inquiry <Send size={20} /></>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}