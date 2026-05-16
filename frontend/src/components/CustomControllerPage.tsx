import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Share2, Globe, X } from 'lucide-react'; // 🔥 AÑADIDOS ICONOS NUEVOS
import { useSearchParams } from 'react-router-dom';

const B = 'https://xcontrollers.es/wp-content/uploads/';

// 🔥 PALETA DE COLORES PARA EL MENÚ
const COLOR_HEX: Record<string, string> = {
    'blanco': '#f8f9fa', 'blancos': '#f8f9fa',
    'negro': '#1f2022', 'negros': '#1f2022',
    'rojo': '#dc2626', 'rojos': '#dc2626',
    'azul': '#2563eb',
    'verde': '#16a34a',
    'amarillo': '#facc15',
    'rosa': '#ec4899', 'rosas': '#ec4899',
    'naranja': '#f97316',
    'morado': '#9333ea',
    'azul-claro': '#38bdf8',
    'azul-oscuro': '#1e3a8a',
    'brandywine': '#7a192f',
    'cobalt-blue': '#1d4ed8',
    'lime-gold': '#a3e635',
    'purple': '#7e22ce',
    'organic-green': '#4d7c0f'
};

const UI_TRANSLATIONS: Record<string, string> = {
    'blanco': 'White', 'blancos': 'White',
    'negro': 'Black', 'negros': 'Black',
    'rojo': 'Red', 'rojos': 'Red',
    'azul': 'Blue',
    'verde': 'Green',
    'amarillo': 'Yellow',
    'rosa': 'Pink', 'rosas': 'Pink',
    'naranja': 'Orange',
    'morado': 'Purple',
    'azul-claro': 'Light Blue',
    'azul-oscuro': 'Dark Blue',
    'carbono': 'Carbon Fiber'
};

const SHAPE_NAMES_EN: Record<string, string> = {
    'Concavo-alto': 'High Concave',
    'Concavo-bajo': 'Low Concave',
    'Convexo-alto': 'High Convex',
    'Convexo-bajo': 'Low Convex'
};

function getJoyUrlPS5(side: string, part: string, shape: string, color: string) {
    return B + '2020/11/joysticks/' + shape + '/' + side + '/' + part + '/' + color + '.png';
}

function getJoyUrlPS4(side: string, part: string, shape: string, color: string) {
    const sBase = side === 'IZQUIERDA' ? 'izda' : 'dcha';
    let bColor = color.toLowerCase();

    if (bColor === 'azul-claro' || bColor === 'azul-oscuro') bColor = 'azul';
    if (!['negro', 'rojo', 'azul', 'verde', 'blanco'].includes(bColor)) bColor = 'negro';

    if (part === 'Base') {
        return B + '2018/01/base-' + bColor + '-' + sBase + '.png';
    } else {
        const parts = shape.toLowerCase().split('-');
        const shp = parts[0] || 'concavo';
        const hgt = parts[1] || 'alto';

        return B + `2018/01/seta-${bColor}-${hgt}-${shp}-${sBase}.png`;
    }
}

export default function CustomControllerPage() {
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    
    const isPS4 = searchParams.get('mando') === 'ps4';
    const dbBaseId = isPS4 ? 2 : 3; 
    const controllerName = isPS4 ? 'Custom PS4 DualShock' : 'Custom PS5 DualSense';
    const baseImgUrl = isPS4
        ? 'https://xcontrollers.es/wp-content/uploads/2017/10/COMPLETO-PARA-WEB-1110x800.png'
        : 'https://xcontrollers.es/wp-content/uploads/2020/11/PS5-COMPLETO-PARA-WEB-1110x800.png';

    const getJoyUrl = isPS4 ? getJoyUrlPS4 : getJoyUrlPS5;

    const [activeTab, setActiveTab] = useState<'shell' | 'buttons' | 'joysticks' | 'd_pad' | 'texture'>('shell');
    const [dbParts, setDbParts] = useState<any[]>([]);
    const [basePrice, setBasePrice] = useState(69.99);

    const [config, setConfig] = useState({ joy_shape: 'Concavo-alto' });

    const [selectedParts, setSelectedParts] = useState<{
        shell: any | null;
        buttons: any | null;
        joystick_base: any | null;
        joystick_mushroom: any | null;
        d_pad: any | null;
        texture: any | null;
    }>({
        shell: null, buttons: null, joystick_base: null, joystick_mushroom: null, d_pad: null, texture: null
    });

    // 🔥 ESTADOS PARA EL MODAL DE LA GALERÍA 🔥
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [publishForm, setPublishForm] = useState({ author_name: '', build_name: '' });
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
        setSelectedParts({ shell: null, buttons: null, joystick_base: null, joystick_mushroom: null, d_pad: null, texture: null });
        setConfig({ joy_shape: 'Concavo-alto' });
    }, [isPS4]);

    useEffect(() => {
        fetch('http://localhost:3000/api/parts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const partsForThis = data.filter((p: any) => p.base_product_id === dbBaseId && p.active);
                    setDbParts(partsForThis);
                } else setDbParts([]);
            })
            .catch(() => setDbParts([]));

        fetch(`http://localhost:3000/api/products/${dbBaseId}`)
            .then(res => res.json())
            .then(data => { if (data && data.price) setBasePrice(Number(data.price)); })
            .catch(console.error);
    }, [dbBaseId]);

    useEffect(() => {
        const buildHash = searchParams.get('build');
        
        if (buildHash && dbParts.length > 0) {
            try {
                const savedBuildIds = JSON.parse(atob(buildHash));
                
                const findPart = (id: number | null) => 
                    id ? dbParts.find(p => (p.id || p.customizable_part_id) === id) || null : null;

                setSelectedParts({
                    shell: findPart(savedBuildIds.s),
                    buttons: findPart(savedBuildIds.b),
                    joystick_base: findPart(savedBuildIds.jb),
                    joystick_mushroom: findPart(savedBuildIds.jm),
                    d_pad: findPart(savedBuildIds.d),
                    texture: findPart(savedBuildIds.t)
                });

                if (savedBuildIds.sh) {
                    setConfig({ joy_shape: savedBuildIds.sh });
                }
            } catch (e) {
                console.error("Enlace de build inválido o corrupto");
            }
        }
    }, [searchParams, dbParts]);

    // Función auxiliar para obtener el objeto compactado de la build
    const getCompactBuild = () => ({
        s: selectedParts.shell?.id || selectedParts.shell?.customizable_part_id || null,
        b: selectedParts.buttons?.id || selectedParts.buttons?.customizable_part_id || null,
        jb: selectedParts.joystick_base?.id || selectedParts.joystick_base?.customizable_part_id || null,
        jm: selectedParts.joystick_mushroom?.id || selectedParts.joystick_mushroom?.customizable_part_id || null,
        d: selectedParts.d_pad?.id || selectedParts.d_pad?.customizable_part_id || null,
        t: selectedParts.texture?.id || selectedParts.texture?.customizable_part_id || null,
        sh: config.joy_shape
    });

    const handleShareBuild = () => {
        const hash = btoa(JSON.stringify(getCompactBuild()));
        const shareUrl = `${window.location.origin}/personalizador?mando=${isPS4 ? 'ps4' : 'ps5'}&build=${hash}`;
        
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('🎮 Build link copied to clipboard!\nYou can now paste it and share it with anyone.');
        }).catch(err => {
            console.error('Error copying:', err);
            alert('Could not copy the link automatically. Here is your hash: ' + hash);
        });
    };

    // 🔥 NUEVO: FUNCIÓN PARA PUBLICAR EN LA GALERÍA 🔥
    const handlePublishToGallery = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPublishing(true);
        
        const hash = btoa(JSON.stringify(getCompactBuild()));

        try {
            const res = await fetch('http://localhost:3000/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author_name: publishForm.author_name,
                    build_name: publishForm.build_name,
                    base_product_id: dbBaseId,
                    build_hash: hash
                })
            });

            if (res.ok) {
                alert('✨ Masterpiece published successfully to the Forge Gallery!');
                setShowPublishModal(false);
                setPublishForm({ author_name: '', build_name: '' });
            } else {
                alert('Error publishing your build. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Connection error. Please check your backend.');
        } finally {
            setIsPublishing(false);
        }
    };

    const getCleanColor = (part: any) => {
        if (!part) return 'Negro';
        let name = part.name || part.color || '';
        name = name.replace(/ Base/ig, '').replace(/ Mushroom/ig, '').replace(/ Seta/ig, '').replace(/ Mu/ig, '').trim();
        const translations: any = { 'White': 'Blanco', 'Black': 'Negro', 'Red': 'Rojo', 'Blue': 'Azul', 'Green': 'Verde', 'Yellow': 'Amarillo', 'Pink': 'Rosa' };
        return translations[name] || name;
    };

    const getDisplayName = (part: any) => {
        if (!part) return '';
        let name = (part.name || part.color || '').replace(/ Base/ig, '').replace(/ Seta/ig, '').trim();
        return UI_TRANSLATIONS[name.toLowerCase()] || name;
    };

    const joyBaseColor = getCleanColor(selectedParts.joystick_base);
    const joySetaColor = getCleanColor(selectedParts.joystick_mushroom);

    const extraPrice = Object.values(selectedParts).reduce((total, part) => total + (part ? Number(part.price || part.customization_price || 0) : 0), 0);
    const totalPrice = basePrice + extraPrice;

    const handleAddToCart = () => {
        const baseShellName = isPS4 ? 'Black (Stock)' : 'White (Stock)';
        const desc = [
            `Shell: ${getDisplayName(selectedParts.shell) || baseShellName}`,
            `Buttons: ${getDisplayName(selectedParts.buttons) || 'Black (Stock)'}`,
            `Joy Base: ${getDisplayName(selectedParts.joystick_base) || 'Black (Stock)'}`,
            `Joy Cap: ${getDisplayName(selectedParts.joystick_mushroom) || 'Black (Stock)'} (${SHAPE_NAMES_EN[config.joy_shape]})`,
            `D-Pad: ${getDisplayName(selectedParts.d_pad) || 'Black (Stock)'}`,
            `Texture: ${getDisplayName(selectedParts.texture) || 'None'}`,
        ].join(', ');

        addToCart({
            id: dbBaseId,
            name: controllerName,
            description: desc,
            price: totalPrice,
            category: 'Custom Controllers',
            stock: 99,
            image_url: baseImgUrl 
        });
        alert(`Custom controller added to cart! Total: €${totalPrice.toFixed(2)}`);
    };

    const renderPartGrid = (parts: any[], stateKey: keyof typeof selectedParts, useColorSwatch: boolean = false) => (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <button
                onClick={() => setSelectedParts(prev => ({ ...prev, [stateKey]: null }))}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                    !selectedParts[stateKey] ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/5'
                }`}
            >
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-500 flex items-center justify-center text-[10px] text-gray-500 mb-2 uppercase font-black tracking-widest bg-[#111]">Stock</div>
                <span className="text-xs text-center font-bold text-gray-400">Default</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">€0.00</span>
            </button>

            {parts.map(part => {
                const partId = part.id || part.customizable_part_id;
                const selectedId = selectedParts[stateKey]?.id || selectedParts[stateKey]?.customizable_part_id;
                const partPrice = Number(part.price || part.customization_price || 0);
                
                const cleanColorName = getCleanColor(part).toLowerCase();
                const hexColor = COLOR_HEX[cleanColorName] || '#444444'; 
                const displayName = getDisplayName(part);

                return (
                    <button
                        key={partId}
                        onClick={() => setSelectedParts(prev => ({ ...prev, [stateKey]: part }))}
                        className={`flex flex-col items-center p-3 rounded-xl border transition-all group ${
                            selectedId === partId ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/30'
                        }`}
                    >
                        <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-white/10 bg-zinc-800 flex-shrink-0 shadow-inner relative">
                            {useColorSwatch ? (
                                <div 
                                    className="w-full h-full group-hover:scale-110 transition-transform" 
                                    style={{ backgroundColor: hexColor, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }} 
                                />
                            ) : (
                                (part.image_url || part.part_image) ? (
                                    <img src={part.image_url || part.part_image} alt={displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                ) : (
                                    <div className="w-full h-full bg-cyan-900" />
                                )
                            )}
                        </div>
                        
                        <span className="text-xs text-center font-bold text-white line-clamp-1">{displayName}</span>
                        <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">+€{partPrice.toFixed(2)}</span>
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="pt-32 pb-16 min-h-screen bg-[#050505] text-white font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{isPS4 ? 'PS4' : 'PS5'} Controller Builder</h1>
                    <p className="text-gray-400 mt-2 text-lg">Build your perfect controller with custom colors, textures, and finishes.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900/50 p-8 rounded-[2rem] border border-white/10 shadow-2xl relative">

                    {/* ZONA IZQUIERDA: PREVIEW DINÁMICO */}
                    <div className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(60,60,60,1)_0%,rgba(10,10,10,1)_100%)] rounded-3xl p-8 border border-white/5 relative overflow-hidden h-[400px] md:h-[500px]">
                        <div className="relative w-full max-w-[550px] aspect-[1110/720] overflow-hidden hover:scale-105 transition-transform duration-500 ease-out">
                            {/* BASE */}
                            <img className="relative w-full h-auto z-0 pointer-events-none" src={baseImgUrl} alt="Base" />
                            
                            {/* CAPAS ESTÁTICAS */}
                            {selectedParts.shell && <img src={selectedParts.shell.image_url || selectedParts.shell.part_image} className="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none transition-opacity duration-300" />}
                            {selectedParts.buttons && <img src={selectedParts.buttons.image_url || selectedParts.buttons.part_image} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />}
                            {selectedParts.d_pad && <img src={selectedParts.d_pad.image_url || selectedParts.d_pad.part_image} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />}
                            
                            {/* JOYSTICKS */}
                            <img src={getJoyUrl('IZQUIERDA', 'Base', 'Concavo-alto', joyBaseColor)} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />
                            <img src={getJoyUrl('DERECHA', 'Base', 'Concavo-alto', joyBaseColor)} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />
                            <img src={getJoyUrl('IZQUIERDA', 'Setas', config.joy_shape, joySetaColor)} className="absolute top-0 left-0 w-full h-auto z-30 pointer-events-none transition-opacity duration-300" />
                            <img src={getJoyUrl('DERECHA', 'Setas', config.joy_shape, joySetaColor)} className="absolute top-0 left-0 w-full h-auto z-30 pointer-events-none transition-opacity duration-300" />

                            {/* TEXTURA */}
                            {selectedParts.texture && (
                                <img src={selectedParts.texture.image_url || selectedParts.texture.part_image} className="absolute top-0 left-0 w-full h-auto z-40 opacity-80 mix-blend-multiply pointer-events-none transition-opacity duration-300" />
                            )}
                        </div>
                    </div>

                    {/* ZONA DERECHA: CONTROLES */}
                    <div className="flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                            {[
                                { id: 'shell', label: 'Shell' },
                                { id: 'buttons', label: 'Buttons' },
                                { id: 'joysticks', label: 'Thumbsticks' },
                                { id: 'd_pad', label: 'D-Pad' },
                                { id: 'texture', label: 'Texture' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-5 py-2 uppercase font-black text-sm tracking-widest transition-all rounded-xl ${
                                        activeTab === tab.id ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                            {activeTab === 'shell' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Choose your Shell</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'shell'), 'shell', false)}
                                </div>
                            )}
                            {activeTab === 'buttons' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Button Color</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'buttons'), 'buttons', true)}
                                </div>
                            )}
                            {activeTab === 'd_pad' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">D-Pad Color</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'd_pad'), 'd_pad', true)}
                                </div>
                            )}
                            {activeTab === 'texture' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Special Pattern</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'texture'), 'texture', false)}
                                </div>
                            )}
                            {activeTab === 'joysticks' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Custom Thumbsticks</h3>
                                    
                                    <div className="mb-8 border-b border-white/5 pb-8">
                                        <p className="text-sm text-cyan-400 uppercase tracking-widest font-black mb-4">Thumbstick Shape</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {[
                                                { key: 'Concavo-alto', label: 'High Concave' },
                                                { key: 'Concavo-bajo', label: 'Low Concave' },
                                                { key: 'Convexo-alto', label: 'High Convex' },
                                                { key: 'Convexo-bajo', label: 'Low Convex' },
                                            ].map(shape => (
                                                <button
                                                    key={shape.key}
                                                    onClick={() => setConfig({ ...config, joy_shape: shape.key })}
                                                    className={`p-3 rounded-xl border-2 transition-all ${config.joy_shape === shape.key ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                                                >
                                                    <span className="text-xs font-bold text-center block leading-tight">{shape.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <p className="text-sm text-cyan-400 uppercase tracking-widest font-black mb-4">Base Color</p>
                                        {renderPartGrid(dbParts.filter(p => p.category === 'joysticks' && (p.name || p.color || '').toLowerCase().includes('base')), 'joystick_base', true)}
                                    </div>
                                    <div>
                                        <p className="text-sm text-cyan-400 uppercase tracking-widest font-black mb-4">Top Color</p>
                                        {renderPartGrid(dbParts.filter(p => {
                                            const n = (p.name || p.color || '').toLowerCase();
                                            return p.category === 'joysticks' && (n.includes('seta') || n.includes('mushroom') || n.includes('mu'));
                                        }), 'joystick_mushroom', true)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* BARRA INFERIOR CON LOS 3 BOTONES */}
                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="w-full sm:w-auto text-center sm:text-left">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total</p>
                                <p className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                    €{totalPrice.toFixed(2)}
                                </p>
                            </div>
                            
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleShareBuild}
                                    title="Copy Build Link"
                                    className="p-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl transition-all border border-white/10 flex items-center justify-center hover:scale-[1.05] shadow-lg"
                                >
                                    <Share2 size={24} />
                                </button>

                                {/* 🔥 BOTÓN PARA ABRIR MODAL DE GALERÍA 🔥 */}
                                <button
                                    onClick={() => setShowPublishModal(true)}
                                    title="Publish to Forge Gallery"
                                    className="p-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-2xl transition-all border border-white/10 flex items-center justify-center hover:scale-[1.05] shadow-[0_0_20px_rgba(192,38,211,0.4)]"
                                >
                                    <Globe size={24} />
                                </button>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 sm:flex-none px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-2xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                >
                                    <ShoppingCart size={24} className="hidden sm:block" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 🔥 MODAL PARA PUBLICAR EN LA GALERÍA 🔥 */}
                    {showPublishModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in p-4">
                            <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full relative animate-in zoom-in-95">
                                <button 
                                    onClick={() => setShowPublishModal(false)} 
                                    className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                                
                                <h2 className="text-2xl font-black uppercase text-white mb-2 flex items-center gap-3 tracking-tight">
                                    <Globe className="text-fuchsia-500" /> Publish Build
                                </h2>
                                <p className="text-gray-400 text-sm mb-6">Show off your design in the Forge Gallery so other players can see it, use it, and vote for it.</p>
                                
                                <form onSubmit={handlePublishToGallery} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Build Name</label>
                                        <input 
                                            required 
                                            type="text" 
                                            maxLength={30} 
                                            placeholder="e.g. Neon Demon, Stealth Pro..." 
                                            value={publishForm.build_name} 
                                            onChange={e => setPublishForm({...publishForm, build_name: e.target.value})} 
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-fuchsia-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-colors" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Creator Name</label>
                                        <input 
                                            required 
                                            type="text" 
                                            maxLength={20} 
                                            placeholder="Your Gamertag..." 
                                            value={publishForm.author_name} 
                                            onChange={e => setPublishForm({...publishForm, author_name: e.target.value})} 
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-fuchsia-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-colors" 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isPublishing} 
                                        className="w-full py-4 mt-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(192,38,211,0.3)]"
                                    >
                                        {isPublishing ? 'Publishing...' : 'Upload to Gallery'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}