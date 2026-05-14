import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function CustomControllerPage() {
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    
    // Detectamos qué mando estamos configurando (1 = PS5, 2 = PS4)
    const isPS4 = searchParams.get('mando') === 'ps4';
    const dbBaseId = isPS4 ? 2 : 1; 
    const controllerName = isPS4 ? 'PS4 DualShock Custom' : 'PS5 DualSense Custom';
    const baseImgUrl = isPS4
        ? 'https://xcontrollers.es/wp-content/uploads/2017/10/COMPLETO-PARA-WEB-1110x800.png'
        : 'https://xcontrollers.es/wp-content/uploads/2020/11/PS5-COMPLETO-PARA-WEB-1110x800.png';

    const [activeTab, setActiveTab] = useState<'shell' | 'buttons' | 'joysticks' | 'd_pad' | 'texture'>('shell');
    const [dbParts, setDbParts] = useState<any[]>([]);
    const [basePrice, setBasePrice] = useState(69.99);

    // Estado dinámico: si es null, es que está "De fábrica"
    const [selectedParts, setSelectedParts] = useState<{
        shell: any | null;
        buttons: any | null;
        joystick_base: any | null;
        joystick_mushroom: any | null;
        d_pad: any | null;
        texture: any | null;
    }>({
        shell: null,
        buttons: null,
        joystick_base: null,
        joystick_mushroom: null,
        d_pad: null,
        texture: null
    });

    // Reseteamos al cambiar de PS4 a PS5 o viceversa
    useEffect(() => {
        setSelectedParts({
            shell: null, buttons: null, joystick_base: null, joystick_mushroom: null, d_pad: null, texture: null
        });
    }, [isPS4]);

    useEffect(() => {
        fetch('http://localhost:3000/api/parts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const partsForThis = data.filter((p: any) => p.base_product_id === dbBaseId && p.active);
                    setDbParts(partsForThis);
                } else {
                    setDbParts([]);
                }
            })
            .catch(err => {
                console.error("Error al cargar piezas:", err);
                setDbParts([]);
            });

        fetch(`http://localhost:3000/api/products/${dbBaseId}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.price) setBasePrice(Number(data.price));
            })
            .catch(console.error);
    }, [dbBaseId]);

    // 🔥 CÁLCULO DIRECTO: Sin excepciones raras. Si hay pieza, suma su precio.
    const extraPrice = Object.values(selectedParts).reduce((total, part) => {
        return total + (part ? Number(part.price) : 0);
    }, 0);
    const totalPrice = basePrice + extraPrice;

    const handleAddToCart = () => {
        // Textos dinámicos por si no han elegido nada (De fábrica)
        const baseShellName = isPS4 ? 'Negro (Base)' : 'Blanco (Base)';
        
        const desc = [
            `Carcasa: ${selectedParts.shell?.name || baseShellName}`,
            `Botones: ${selectedParts.buttons?.name || 'Negros (Base)'}`,
            `Joy Base: ${selectedParts.joystick_base?.name || 'Negro (Base)'}`,
            `Joy Seta: ${selectedParts.joystick_mushroom?.name || 'Negro (Base)'}`,
            `Cruceta: ${selectedParts.d_pad?.name || 'Negro (Base)'}`,
            `Textura: ${selectedParts.texture?.name || 'Sin textura'}`,
        ].join(', ');

        addToCart({
            id: Date.now(),
            name: controllerName,
            description: desc,
            price: totalPrice,
            category: 'Mandos Custom',
            stock: 99,
            image_url: baseImgUrl 
        });
        alert(`¡Mando personalizado añadido al carrito! Total: ${totalPrice.toFixed(2)}€`);
    };

    // Función que renderiza la cuadrícula de botones
    const renderPartGrid = (parts: any[], stateKey: keyof typeof selectedParts) => (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            
            {/* BOTÓN "DE FÁBRICA" FIJO */}
            <button
                onClick={() => setSelectedParts(prev => ({ ...prev, [stateKey]: null }))}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                    !selectedParts[stateKey] ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/5'
                }`}
            >
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-500 flex items-center justify-center text-[10px] text-gray-500 mb-2 uppercase font-black tracking-widest">Base</div>
                <span className="text-xs text-center font-bold text-gray-400">De fábrica</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">0.00€</span>
            </button>

            {/* BOTONES DE LA BASE DE DATOS */}
            {parts.map(part => (
                <button
                    key={part.id}
                    onClick={() => setSelectedParts(prev => ({ ...prev, [stateKey]: part }))}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all group ${
                        selectedParts[stateKey]?.id === part.id ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/30'
                    }`}
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-white/10 bg-zinc-800 flex-shrink-0">
                        {part.image_url ? (
                            <img src={part.image_url} alt={part.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        ) : (
                            <div className="w-full h-full bg-cyan-900" />
                        )}
                    </div>
                    <span className="text-xs text-center font-bold text-white line-clamp-1">{part.name}</span>
                    <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">+{Number(part.price).toFixed(2)}€</span>
                </button>
            ))}
        </div>
    );

    return (
        <div className="pt-32 pb-16 min-h-screen bg-[#050505] text-white font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Controller Customization {isPS4 ? 'PS4' : 'PS5'}</h1>
                    <p className="text-gray-400 mt-2 text-lg">Create the perfect controller with different colors and textures.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900/50 p-8 rounded-[2rem] border border-white/10 shadow-2xl">

                    {/* ZONA IZQUIERDA: PREVIEW DINÁMICO */}
                    <div className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(60,60,60,1)_0%,rgba(10,10,10,1)_100%)] rounded-3xl p-8 border border-white/5 relative overflow-hidden h-[400px] md:h-[500px]">
                        <div className="relative w-full max-w-[550px] aspect-[1110/720] overflow-hidden hover:scale-105 transition-transform duration-500 ease-out">
                            {/* BASE */}
                            <img className="relative w-full h-auto z-0 pointer-events-none" src={baseImgUrl} alt="Base" />
                            
                            {/* CAPAS SUPERPUESTAS */}
                            {selectedParts.shell && <img src={selectedParts.shell.image_url} className="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none transition-opacity duration-300" />}
                            {selectedParts.buttons && <img src={selectedParts.buttons.image_url} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />}
                            {selectedParts.joystick_base && <img src={selectedParts.joystick_base.image_url} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />}
                            {selectedParts.joystick_mushroom && <img src={selectedParts.joystick_mushroom.image_url} className="absolute top-0 left-0 w-full h-auto z-30 pointer-events-none transition-opacity duration-300" />}
                            {selectedParts.d_pad && <img src={selectedParts.d_pad.image_url} className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none transition-opacity duration-300" />}
                            
                            {/* TEXTURA */}
                            {selectedParts.texture && (
                                <img src={selectedParts.texture.image_url} className="absolute top-0 left-0 w-full h-auto z-40 opacity-80 mix-blend-multiply pointer-events-none transition-opacity duration-300" />
                            )}
                        </div>
                    </div>

                    {/* ZONA DERECHA: CONTROLES */}
                    <div className="flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                            {[
                                { id: 'shell', label: 'Carcasa' },
                                { id: 'buttons', label: 'Botones' },
                                { id: 'joysticks', label: 'Joysticks' },
                                { id: 'd_pad', label: 'Cruceta' },
                                { id: 'texture', label: 'Textura' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-5 py-2 uppercase font-black text-sm tracking-widest transition-all rounded-xl ${
                                        activeTab === tab.id
                                            ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                            {activeTab === 'shell' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Elige tu Carcasa</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'shell'), 'shell')}
                                </div>
                            )}

                            {activeTab === 'buttons' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Color de Botones</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'buttons'), 'buttons')}
                                </div>
                            )}

                            {activeTab === 'd_pad' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Cruceta (D-Pad)</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'd_pad'), 'd_pad')}
                                </div>
                            )}

                            {activeTab === 'texture' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Textura Especial</h3>
                                    {renderPartGrid(dbParts.filter(p => p.category === 'texture'), 'texture')}
                                </div>
                            )}

                            {activeTab === 'joysticks' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Joysticks Completos</h3>
                                    <div className="mb-8">
                                        <p className="text-sm text-cyan-400 uppercase tracking-widest font-black mb-4">Base del Joystick</p>
                                        {renderPartGrid(dbParts.filter(p => p.category === 'joysticks' && p.name.toLowerCase().includes('base')), 'joystick_base')}
                                    </div>
                                    <div>
                                        <p className="text-sm text-cyan-400 uppercase tracking-widest font-black mb-4">Seta (Parte Superior)</p>
                                        {renderPartGrid(dbParts.filter(p => p.category === 'joysticks' && !p.name.toLowerCase().includes('base')), 'joystick_mushroom')}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total</p>
                                <p className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                    {totalPrice.toFixed(2)}€
                                </p>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full sm:w-auto px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-2xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                            >
                                <ShoppingCart size={24} /> Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}