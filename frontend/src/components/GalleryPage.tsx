import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Gamepad2, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

// Sub-componente para pintar la miniatura del mando
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
        // 🔥 FIX 1: pointer-events-none para que la imagen NUNCA bloquee los clicks de abajo
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
    const [builds, setBuilds] = useState<any[]>([]);
    const [dbParts, setDbParts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [likedBuilds, setLikedBuilds] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar likes guardados en el navegador
        const savedLikes = JSON.parse(localStorage.getItem('forge_likes') || '[]');
        setLikedBuilds(savedLikes);

        Promise.all([
            fetch('http://localhost:3000/api/gallery').then(res => res.json()),
            fetch('http://localhost:3000/api/parts').then(res => res.json())
        ]).then(([galleryData, partsData]) => {
            setBuilds(galleryData);
            setDbParts(partsData);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const handleLike = async (rawId: number) => {
        if (!rawId) return;
        
        const isLiked = likedBuilds.includes(rawId);
        const action = isLiked ? 'remove' : 'add';

        // Update Optimista UI (Usamos fallback por si viene como shared_build_id o id)
        setBuilds(prev => prev.map(b => {
            const currentId = b.id || b.shared_build_id;
            return currentId === rawId ? { ...b, likes: isLiked ? b.likes - 1 : b.likes + 1 } : b;
        }));
        
        let newLikedList = [];
        if (isLiked) {
            newLikedList = likedBuilds.filter(bId => bId !== rawId);
        } else {
            newLikedList = [...likedBuilds, rawId];
        }
        setLikedBuilds(newLikedList);
        localStorage.setItem('forge_likes', JSON.stringify(newLikedList));

        // Petición real al servidor
        try {
            await fetch(`http://localhost:3000/api/gallery/${rawId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action })
            });
        } catch (e) {
            console.error("Error liking build");
        }
    };

    const handleUseBuild = (build: any) => {
        const platform = build.base_product_id === 2 ? 'ps4' : 'ps5';
        navigate(`/personalizador?mando=${platform}&build=${build.build_hash}`);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-cyan-400 font-bold tracking-widest uppercase">
            <div className="animate-pulse flex items-center gap-3"><Gamepad2 /> Loading Forge Gallery...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 font-sans relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                        Forge Gallery
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore the most insane custom controller builds designed by our community. Give likes to your favorites or copy them directly to the builder to make them yours.
                    </p>
                </div>

                {builds.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 border-2 border-dashed border-white/10 rounded-3xl">
                        <Gamepad2 size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="font-bold text-lg">No builds found.</p>
                        <p className="text-sm">Be the first to publish a masterpiece!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {builds.map((build, idx) => {
                            // 🔥 FIX 2: Garantizamos sacar el ID venga con el nombre que venga
                            const buildId = build.id || build.shared_build_id;

                            return (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={buildId} 
                                    className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-fuchsia-500/50 transition-colors group shadow-xl flex flex-col"
                                >
                                    {/* HEADER DE LA TARJETA */}
                                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40">
                                        <div>
                                            <h3 className="font-black text-lg text-white uppercase tracking-wider">{build.build_name}</h3>
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                                                <User size={12} className="text-cyan-400"/> {build.author_name}
                                            </p>
                                        </div>
                                        <span className="text-[10px] bg-white/5 text-gray-300 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10">
                                            {build.base_product_id === 2 ? 'PS4' : 'PS5'}
                                        </span>
                                    </div>

                                    {/* ZONA DEL MANDO */}
                                    <div className="p-8 bg-[radial-gradient(ellipse_at_center,rgba(60,60,60,0.5)_0%,rgba(0,0,0,0.8)_100%)] flex items-center justify-center relative min-h-[250px] flex-1">
                                        <div className="group-hover:scale-110 transition-transform duration-500 w-full">
                                            <BuildPreview build={build} dbParts={dbParts} />
                                        </div>
                                    </div>

                                    {/* FOOTER (LIKES Y COPIAR) 🔥 FIX 3: z-50 añadido */}
                                    <div className="p-5 border-t border-white/5 flex justify-between items-center bg-black/40 relative z-50">
                                        <button 
                                            onClick={() => handleLike(buildId)}
                                            className={`flex items-center gap-2 font-black text-sm px-4 py-2 rounded-xl transition-all cursor-pointer ${
                                                likedBuilds.includes(buildId) 
                                                ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 hover:bg-fuchsia-500/30' 
                                                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent hover:bg-white/10'
                                            }`}
                                        >
                                            <Heart size={18} className={likedBuilds.includes(buildId) ? "fill-fuchsia-400" : ""} /> 
                                            {build.likes || 0}
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleUseBuild(build)}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer"
                                        >
                                            <Copy size={16} /> Use Build
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}