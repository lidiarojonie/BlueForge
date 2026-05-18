import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Gamepad2, Copy, Share2, Trophy, Calendar, Wrench } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // 🔥 AÑADIDO: Contexto de usuario

const B = 'https://xcontrollers.es/wp-content/uploads/';

function getJoyUrlPS5(side: string, part: string, shape: string, color: string) {
    return B + '2020/11/joysticks/' + shape + '/' + side + '/' + part + '/' + color + '.png';
}

function getJoyUrlPS4(side: string, part: string, shape: string, color: string) {
    const sBase = side === 'IZQUIERDA' ? 'izda' : 'dcha';
    let bColor = color.toLowerCase();
    if (bColor === 'azul-claro' || bColor === 'azul-oscuro') bColor = 'azul';
    if (!['negro', 'rojo', 'azul', 'verde', 'blanco'].includes(bColor)) bColor = 'negro';
    if (part === 'Base') return B + '2018/01/base-' + bColor + '-' + sBase + '.png';
    const parts = shape.toLowerCase().split('-');
    const shp = parts[0] || 'concavo';
    const hgt = parts[1] || 'alto';
    return B + `2018/01/seta-${bColor}-${hgt}-${shp}-${sBase}.png`;
}

const getCleanColor = (part: any) => {
    if (!part) return 'Negro';
    let name = part.name || part.color || '';
    name = name.replace(/ Base/ig, '').replace(/ Mushroom/ig, '').replace(/ Seta/ig, '').replace(/ Mu/ig, '').trim();
    const translations: any = { 'White': 'Blanco', 'Black': 'Negro', 'Red': 'Rojo', 'Blue': 'Azul', 'Green': 'Verde', 'Yellow': 'Amarillo', 'Pink': 'Rosa' };
    return translations[name] || name;
};

// Fix fecha a prueba de balas para que siempre funcione en "Trending this month"
const isThisMonth = (dateString: string) => {
    if (!dateString) return true; 
    try {
        const safeDate = dateString.replace(' ', 'T'); 
        const date = new Date(safeDate);
        if (isNaN(date.getTime())) return true; 
        
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    } catch (e) {
        return true;
    }
};

function BuildPreview({ build, dbParts }: { build: any, dbParts: any[] }) {
    const isPS4 = build.base_product_id === 2;
    const baseImgUrl = isPS4
        ? 'https://xcontrollers.es/wp-content/uploads/2017/10/COMPLETO-PARA-WEB-1110x800.png'
        : 'https://xcontrollers.es/wp-content/uploads/2020/11/PS5-COMPLETO-PARA-WEB-1110x800.png';
    const getJoyUrl = isPS4 ? getJoyUrlPS4 : getJoyUrlPS5;

    let config: any = {};
    try { config = JSON.parse(atob(build.build_hash)); } catch (e) { return <div className="text-gray-500">Error loading preview</div>; }

    const findPart = (id: number | null) => id ? dbParts.find(p => (p.id || p.customizable_part_id) === id) || null : null;
    
    const parts = {
        shell: findPart(config.s),
        buttons: findPart(config.b),
        joystick_base: findPart(config.jb),
        joystick_mushroom: findPart(config.jm),
        d_pad: findPart(config.d),
        texture: findPart(config.t)
    };
    
    const shape = config.sh || 'Concavo-alto';
    const joyBaseColor = getCleanColor(parts.joystick_base);
    const joySetaColor = getCleanColor(parts.joystick_mushroom);

    return (
        <div className="relative w-full aspect-[1110/720] overflow-hidden drop-shadow-2xl pointer-events-none">
            <img className="absolute top-0 left-0 w-full h-auto z-0" src={baseImgUrl} alt="Base" />
            {parts.shell && <img src={parts.shell.image_url || parts.shell.part_image} className="absolute top-0 left-0 w-full h-auto z-10" />}
            {parts.buttons && <img src={parts.buttons.image_url || parts.buttons.part_image} className="absolute top-0 left-0 w-full h-auto z-20" />}
            {parts.d_pad && <img src={parts.d_pad.image_url || parts.d_pad.part_image} className="absolute top-0 left-0 w-full h-auto z-20" />}
            <img src={getJoyUrl('IZQUIERDA', 'Base', 'Concavo-alto', joyBaseColor)} className="absolute top-0 left-0 w-full h-auto z-20" />
            <img src={getJoyUrl('DERECHA', 'Base', 'Concavo-alto', joyBaseColor)} className="absolute top-0 left-0 w-full h-auto z-20" />
            <img src={getJoyUrl('IZQUIERDA', 'Setas', shape, joySetaColor)} className="absolute top-0 left-0 w-full h-auto z-30" />
            <img src={getJoyUrl('DERECHA', 'Setas', shape, joySetaColor)} className="absolute top-0 left-0 w-full h-auto z-30" />
            {parts.texture && <img src={parts.texture.image_url || parts.texture.part_image} className="absolute top-0 left-0 w-full h-auto z-40 opacity-80 mix-blend-multiply" />}
        </div>
    );
}

export default function GalleryPage() {
    const { customer } = useUser(); // 🔥 Cogemos el usuario actual
    const [allBuilds, setAllBuilds] = useState<any[]>([]);
    const [dbParts, setDbParts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [likedBuilds, setLikedBuilds] = useState<number[]>([]);
    const [myPublishedIds, setMyPublishedIds] = useState<number[]>([]);
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const highlightId = Number(searchParams.get('highlight'));

    // Cargar los mandos de la BD al abrir la página
    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/api/gallery').then(res => res.json()),
            fetch('http://localhost:3000/api/parts').then(res => res.json())
        ]).then(([galleryData, partsData]) => {
            setAllBuilds(galleryData);
            setDbParts(partsData);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    // 🔥 REACCIONAR AL USUARIO: Si el usuario cambia, recargamos SUS likes y SU arsenal
    useEffect(() => {
        const likeKey = customer ? `forge_likes_${customer.id}` : 'forge_likes_guest';
        const arsenalKey = customer ? `my_forge_builds_${customer.id}` : 'my_forge_builds_guest';
        
        setLikedBuilds(JSON.parse(localStorage.getItem(likeKey) || '[]'));
        setMyPublishedIds(JSON.parse(localStorage.getItem(arsenalKey) || '[]'));
    }, [customer]);

    useEffect(() => {
        if (highlightId && !loading) {
            setTimeout(() => {
                const el = document.getElementById(`build-${highlightId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('ring-4', 'ring-cyan-500', 'shadow-[0_0_40px_rgba(34,211,238,0.5)]');
                    setTimeout(() => {
                        el.classList.remove('ring-4', 'ring-cyan-500', 'shadow-[0_0_40px_rgba(34,211,238,0.5)]');
                    }, 4000);
                }
            }, 500);
        }
    }, [highlightId, loading]);

    const handleLike = async (rawId: number) => {
        if (!rawId) return;
        const isLiked = likedBuilds.includes(rawId);
        const action = isLiked ? 'remove' : 'add';

        setAllBuilds(prev => prev.map(b => {
            const currentId = b.id || b.shared_build_id;
            return currentId === rawId ? { ...b, likes: isLiked ? b.likes - 1 : b.likes + 1 } : b;
        }));
        
        const newLikedList = isLiked ? likedBuilds.filter(bId => bId !== rawId) : [...likedBuilds, rawId];
        setLikedBuilds(newLikedList);
        
        // 🔥 Guardamos en su llave específica
        const likeKey = customer ? `forge_likes_${customer.id}` : 'forge_likes_guest';
        localStorage.setItem(likeKey, JSON.stringify(newLikedList));

        try {
            await fetch(`http://localhost:3000/api/gallery/${rawId}/like`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action })
            });
        } catch (e) { console.error("Error liking build"); }
    };

    const handleUseBuild = (build: any) => {
        const platform = build.base_product_id === 2 ? 'ps4' : 'ps5';
        navigate(`/personalizador?mando=${platform}&build=${build.build_hash}`);
    };

    const handleShareGalleryLink = (rawId: number) => {
        const shareUrl = `${window.location.origin}/gallery?highlight=${rawId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('🔗 Direct link copied!\nShare it with friends so they can drop a like and buy your design.');
        });
    };

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-cyan-400 font-bold tracking-widest uppercase">
            <div className="animate-pulse flex items-center gap-3"><Gamepad2 /> Loading Forge Gallery...</div>
        </div>
    );

    // 🔥 LÓGICA DE LAS SECCIONES 🔥
    const topHistorico = [...allBuilds].sort((a, b) => b.likes - a.likes).slice(0, 3);
    const topHistoricoIds = topHistorico.map(b => b.id || b.shared_build_id);
    
    // Top mensual (excluyendo top histórico) limitado a 3 🔥
    const topMensual = allBuilds
        .filter(b => isThisMonth(b.created_at) && !topHistoricoIds.includes(b.id || b.shared_build_id))
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);

    const misMandos = allBuilds.filter(b => myPublishedIds.includes(b.id || b.shared_build_id));

    const renderBuildCard = (build: any, index: number, isMyBuild: boolean = false, isTop: boolean = false) => {
        const buildId = build.id || build.shared_build_id;
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                key={buildId + (isTop ? 'top' : 'reg')} id={`build-${buildId}`}
                className={`bg-zinc-900/60 backdrop-blur-md border rounded-3xl overflow-hidden transition-all group flex flex-col ${
                    isTop ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:border-yellow-400' 
                          : 'border-white/10 hover:border-fuchsia-500/50 shadow-xl'
                }`}
            >
                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40">
                    <div>
                        <h3 className="font-black text-lg text-white uppercase tracking-wider flex items-center gap-2">
                            {isTop && index === 0 && <Trophy size={18} className="text-yellow-400" />}
                            {build.build_name}
                        </h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                            <User size={12} className="text-cyan-400"/> {build.author_name}
                        </p>
                    </div>
                    {isMyBuild ? (
                        <button onClick={() => handleShareGalleryLink(buildId)} className="bg-cyan-500/20 text-cyan-400 p-2 rounded-xl hover:bg-cyan-500/40 transition-colors flex items-center gap-2 text-xs font-black uppercase cursor-pointer" title="Share my build">
                            <Share2 size={14} /> Share
                        </button>
                    ) : (
                        <span className="text-[10px] bg-white/5 text-gray-300 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10">
                            {build.base_product_id === 2 ? 'PS4' : 'PS5'}
                        </span>
                    )}
                </div>

                <div className="p-8 bg-[radial-gradient(ellipse_at_center,rgba(60,60,60,0.5)_0%,rgba(0,0,0,0.8)_100%)] flex items-center justify-center relative min-h-[250px] flex-1">
                    <div className="group-hover:scale-110 transition-transform duration-500 w-full">
                        <BuildPreview build={build} dbParts={dbParts} />
                    </div>
                </div>

                <div className="p-5 border-t border-white/5 flex justify-between items-center bg-black/40 relative z-50">
                    <button 
                        onClick={() => handleLike(buildId)}
                        className={`flex items-center gap-2 font-black text-sm px-4 py-2 rounded-xl transition-all cursor-pointer ${
                            likedBuilds.includes(buildId) ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 hover:bg-fuchsia-500/30' : 'bg-white/5 text-gray-400 hover:text-white border border-transparent hover:bg-white/10'
                        }`}
                    >
                        <Heart size={18} className={likedBuilds.includes(buildId) ? "fill-fuchsia-400" : ""} /> {build.likes || 0}
                    </button>
                    
                    <button onClick={() => handleUseBuild(build)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer">
                        <Copy size={16} /> Use Build
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 font-sans relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
                
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                        Forge Gallery
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Welcome to the community showroom. Share your setups, discover new styles, and show some love to the best creators.
                    </p>
                </div>

                {/* 1. SECCIÓN HALL OF FAME */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                        <Trophy className="text-yellow-400" size={28} />
                        <h2 className="text-3xl font-black uppercase tracking-widest text-white">Hall of Fame</h2>
                        <span className="text-xs font-bold bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20 ml-2">ALL TIME</span>
                    </div>
                    {topHistorico.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {topHistorico.map((build, idx) => renderBuildCard(build, idx, false, true))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-12 text-center text-gray-500">
                            No builds available yet.
                        </div>
                    )}
                </section>

                {/* 2. SECCIÓN TRENDING MONTHLY */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                        <Calendar className="text-fuchsia-400" size={28} />
                        <h2 className="text-3xl font-black uppercase tracking-widest text-white">Trending This Month</h2>
                    </div>
                    {topMensual.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {topMensual.map((build, idx) => renderBuildCard(build, idx))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-12 text-center text-gray-500">
                            No builds trending this month yet. (Create a 4th build to see it here!)
                        </div>
                    )}
                </section>

                {/* 3. SECCIÓN MIS MANDOS */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                        <Wrench className="text-cyan-400" size={28} />
                        <h2 className="text-3xl font-black uppercase tracking-widest text-white">My Arsenal</h2>
                    </div>
                    {misMandos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {misMandos.map((build, idx) => renderBuildCard(build, idx, true))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/50 border border-dashed border-white/20 rounded-3xl p-12 text-center">
                            <Wrench size={32} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest">You haven't built anything yet</p>
                            <button onClick={() => navigate('/personalizador?mando=ps5')} className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                                Create your first controller
                            </button>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}