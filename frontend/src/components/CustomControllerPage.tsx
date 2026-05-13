import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const B = 'https://xcontrollers.es/wp-content/uploads/';

const LAYERS_PS5: Record<string, Record<string, string>> = {
    carcasa: {
        'White': B + '2020/11/colores-simples/Blanco.png',
        'Black': B + '2020/11/colores-simples/Negro.png',
        'Red': B + '2020/11/colores-simples/Rojo.png',
        'Blue': B + '2020/11/colores-simples/Azul.png',
        'Green': B + '2020/11/colores-simples/Verde.png',
        'Yellow': B + '2020/11/colores-simples/Amarillo.png',
        'Pink': B + '2020/11/colores-simples/Rosa.png',
        'Orange': B + '2020/11/colores-simples/Naranja.png',
        'Brandywine': B + '2020/11/colores-perlados/Brandywine.png',
        'Cobalt-Blue': B + '2020/11/colores-perlados/Cobalt-Blue.png',
        'Lime-Gold': B + '2020/11/colores-perlados/Lime-Gold.png',
        'Purple': B + '2020/11/colores-perlados/Purple.png',
        'Organic-Green': B + '2020/11/colores-perlados/Organic-Green.png',
    },
    botones: {
        'Black': B + '2020/11/botones/Negros.png',
        'White': B + '2020/11/botones/Blancos.png',
        'Red': B + '2020/11/botones/Rojos.png',
        'Yellow': B + '2020/11/botones/Amarillo.png',
        'Blue-Light': B + '2020/11/botones/Azul-claro.png',
        'Blue-Dark': B + '2020/11/botones/Azul-Oscuro.png',
        'Green': B + '2020/11/botones/Verde.png',
        'Pink': B + '2020/11/botones/Rosas.png',
        'Orange': B + '2020/11/botones/Naranja.png',
        'Purple': B + '2020/11/botones/Morado.png',
    },
    cruceta: {
        'Black': B + '2020/11/cruceta/Negro.png',
        'White': B + '2020/11/cruceta/Blanco.png',
        'Red': B + '2020/11/cruceta/Rojo.png',
        'Blue-Light': B + '2020/11/cruceta/Azul-claro.png',
        'Green': B + '2020/11/cruceta/Verde.png',
        'Pink': B + '2020/11/cruceta/Rosa.png',
        'Orange': B + '2020/11/cruceta/Naranja.png',
        'Purple': B + '2020/11/cruceta/Morado.png',
    },
};

const TEXTURAS_PS5: Record<string, string | null> = {
    'none': null,
    'Carbon': B + '2020/11/texturas/Carbono.png',
    'Pollock': B + '2020/11/texturas/Pollock.png',
    'Blood': B + '2020/11/texturas/Blood.png',
    'Fresh': B + '2020/11/texturas/Fresh.png',
    'Dollar': B + '2020/11/texturas/Dollar.png',
    'Joker': B + '2020/11/texturas-colores-simples/Joker.png',
    'Snake': B + '2020/11/texturas-colores-simples/Snake.png',
};

const LAYERS_PS4: Record<string, Record<string, string>> = {
    carcasa: {
        'White': B + '2017/09/carcasa-mate-blanco.png',
        'Black': B + '2017/09/carcasa-mate-negro.png',
        'Red': B + '2017/09/carcasa-mate-red.png',
        'Blue': B + '2017/09/carcasa-mate-azul-pitufo.png',
        'Green': B + '2017/09/carcasa-mate-mamba-green.png',
        'Yellow': B + '2017/09/carcasa-mate-mocus-yellow.png',
        'Pink': B + '2017/09/carcasa-mate-snob-pink.png',
        'Orange': B + '2017/11/carcasa-mate-race-orange2.png',
        'Brandywine': B + '2017/11/carcasa-perlado-bandywine-CORREGIDO.png',
        'Cobalt-Blue': B + '2017/11/carcasa-perlado-cobalt-blue-CORREGIDO.png',
        'Lime-Gold': B + '2017/11/carcasa-perlado-lime-gold-CORREGIDO.png',
        'Purple': B + '2017/11/carcasa-perlado-purple-CORREGIDO.png',
        'Organic-Green': B + '2017/11/carcasa-perlado-organic-green-CORREGIDO.png',
    },
    botones: {
        'Black': B + '2017/09/derecha-negro.png',
        'White': B + '2017/09/derecha-blanco.png',
        'Red': B + '2017/09/derecha-rojo.png',
        'Yellow': B + '2017/09/derecha-amarillo.png',
        'Blue-Light': B + '2017/09/derecha-azul-claro.png',
        'Blue-Dark': B + '2017/09/derecha-azul-oscuro.png',
        'Green': B + '2017/09/derecha-verde.png',
        'Pink': B + '2017/09/derecha-rosa.png',
        'Orange': B + '2017/09/derecha-naranja.png',
        'Purple': B + '2017/09/derecha-morado.png',
    },
    cruceta: {
        'Black': B + '2017/09/cruceta-negro.png',
        'White': B + '2017/09/cruceta-blanco.png',
        'Red': B + '2017/09/cruceta-rojo.png',
        'Blue-Light': B + '2017/09/cruceta-azul-claro.png',
        'Green': B + '2017/09/cruceta-verde.png',
        'Yellow': B + '2017/09/cruceta-amarillo.png',
        'Orange': B + '2017/09/cruceta-naranja.png',
        'Purple': B + '2017/09/cruceta-morado.png',
    },
};

const TEXTURAS_PS4: Record<string, string | null> = {
    'none': null,
    'Carbono': B + '2017/10/carcasa-textura-carbono-1.png',
    'Pollock': B + '2017/09/carcasa-textura-pollock.png',
    'Blood': B + '2017/09/carcasa-textura-blood.png',
    'Fresh': B + '2017/09/carcasa-textura-fresh.png',
    'Dollar': B + '2017/09/carcasa-textura-dollar.png',
    'Joker': B + '2017/09/carcasa-transparente-jocker-7.png',
    'Snake': B + '2017/09/carcasa-transparente-snake-2.png',
};

function getJoyUrlPS5(side: string, part: string, shape: string, color: string) {
    return B + '2020/11/joysticks/' + shape + '/' + side + '/' + part + '/' + color + '.png';
}

function getJoyUrlPS4(side: string, part: string, shape: string, color: string) {
    const sBase = side === 'IZQUIERDA' ? 'izda' : 'dcha';
    let bColor = color.toLowerCase();

    // Map to available colors for interchangeable parts
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

    const activeLayers = isPS4 ? LAYERS_PS4 : LAYERS_PS5;
    const activeTexturas = isPS4 ? TEXTURAS_PS4 : TEXTURAS_PS5;
    const getJoyUrl = isPS4 ? getJoyUrlPS4 : getJoyUrlPS5;
    const baseImgUrl = isPS4
        ? B + '2017/10/COMPLETO-PARA-WEB-1110x800.png'
        : B + '2020/11/PS5-COMPLETO-PARA-WEB-1110x800.png';
    const controllerName = isPS4 ? 'PS4 DualShock Custom' : 'PS5 DualSense Custom';

    const [activeTab, setActiveTab] = useState<'case' | 'buttons' | 'joysticks' | 'D-Pad' | 'texture'>('case');

    const [config, setConfig] = useState({
        carcasa: 'Blanco',
        botones: 'Negros',
        joy_shape: 'Concavo-alto',
        joy_seta: 'Negro',
        joy_base: 'Negro',
        cruceta: 'Negro',
        textura: 'none'
    });

    const handleAddToCart = () => {
        addToCart({
            id: Date.now(), // Generate a fake ID for custom product
            name: controllerName,
            description: `Carcasa: ${config.carcasa}, Botones: ${config.botones}, Joysticks: ${config.joy_shape} (${config.joy_seta}/${config.joy_base}), Cruceta: ${config.cruceta}, Textura: ${config.textura === 'none' ? 'Sin textura' : config.textura}`,
            price: 74.95,
            category: 'Mandos Custom',
            stock: 99,
            image_url: baseImgUrl // Base image as placeholder
        });
        alert(`¡Custom controller added to the cart!`);
    };

    return (
        <div className="pt-32 pb-16 min-h-screen bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Controller Customization {isPS4 ? 'PS4' : 'PS5'}</h1>
                    <p className="text-gray-400 mt-2 text-lg">Create the perfect controller with different colors and textures.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900/50 p-8 rounded-3xl border border-white/10 shadow-2xl">

                    {/* LEFT: PREVIEW */}
                    <div className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(60,60,60,1)_0%,rgba(10,10,10,1)_100%)] rounded-2xl p-8 border border-white/5 relative overflow-hidden h-[400px] md:h-[500px]">
                        <div className="relative w-full max-w-[550px] aspect-[1110/720] overflow-hidden hover:scale-105 transition-transform duration-500 ease-out">
                            {/* BASE */}
                            <img className="relative w-full h-auto z-0" src={baseImgUrl} alt={`${isPS4 ? 'PS4' : 'PS5'} Base`} />
                            {/* CARCASA */}
                            <img className="absolute top-0 left-0 w-full h-auto z-10 transition-opacity duration-300" src={activeLayers.carcasa[config.carcasa]} alt="Carcasa" />
                            {/* BOTONES */}
                            <img className="absolute top-0 left-0 w-full h-auto z-20 transition-opacity duration-300" src={activeLayers.botones[config.botones]} alt="Botones" />
                            {/* JOYSTICK IZQ BASE */}
                            <img className="absolute top-0 left-0 w-full h-auto z-20 transition-opacity duration-300" src={getJoyUrl('IZQUIERDA', 'Base', 'Concavo-alto', config.joy_base)} alt="Joy Izq Base" />
                            {/* JOYSTICK DER BASE */}
                            <img className="absolute top-0 left-0 w-full h-auto z-20 transition-opacity duration-300" src={getJoyUrl('DERECHA', 'Base', 'Concavo-alto', config.joy_base)} alt="Joy Der Base" />
                            {/* JOYSTICK IZQ SETA */}
                            <img className="absolute top-0 left-0 w-full h-auto z-30 transition-opacity duration-300" src={getJoyUrl('IZQUIERDA', 'Setas', config.joy_shape, config.joy_seta)} alt="Joy Izq Seta" />
                            {/* JOYSTICK DER SETA */}
                            <img className="absolute top-0 left-0 w-full h-auto z-30 transition-opacity duration-300" src={getJoyUrl('DERECHA', 'Setas', config.joy_shape, config.joy_seta)} alt="Joy Der Seta" />
                            {/* CRUCETA */}
                            <img className="absolute top-0 left-0 w-full h-auto z-20 transition-opacity duration-300" src={activeLayers.cruceta[config.cruceta]} alt="Cruceta" />
                            {/* TEXTURA */}
                            {activeTexturas[config.textura] && (
                                <img className="absolute top-0 left-0 w-full h-auto z-40 opacity-80 mix-blend-multiply transition-opacity duration-300" src={activeTexturas[config.textura]!} alt="Textura" />
                            )}
                        </div>
                    </div>

                    {/* RIGHT: CONTROLS */}
                    <div className="flex flex-col">
                        {/* TABS */}
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                            {['case', 'buttons', 'joysticks', 'D-Pad', 'texture'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-2 uppercase font-black text-sm tracking-widest transition-all rounded-lg ${activeTab === tab
                                        ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT */}
                        <div className="flex-1 min-h-[300px]">
                            {/* CARCASA */}
                            {activeTab === 'case' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-4">Case Color</h3>

                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-3 mt-6">Plain Colors</p>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                        {['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Orange'].map(color => (
                                            <div key={color} className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => setConfig({ ...config, carcasa: color })}
                                                    className={`w-12 h-12 rounded-full border-[3px] transition-all hover:scale-110 ${config.carcasa === color ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-transparent'}`}
                                                    style={{
                                                        background: color === 'White' ? '#FFF' : color === 'Black' ? '#1a1a1a' : color === 'Red' ? '#CC0000' : color === 'Blue' ? '#1565C0' : color === 'Green' ? '#2E7D32' : color === 'Yellow' ? '#FFD700' : color === 'Pink' ? '#E91E63' : '#E64A19'
                                                    }}
                                                />
                                                <span className="text-xs text-gray-400">{color}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-3 mt-8">Shiny</p>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                        {[
                                            { key: 'Brandywine', img: B + '2017/09/perlado-rojo.png' },
                                            { key: 'Cobalt-Blue', img: B + '2017/09/perlado-azul.png' },
                                            { key: 'Lime-Gold', img: B + '2017/09/carcasa-perlado-lime-gold.jpg' },
                                            { key: 'Purple', img: B + '2017/09/perlado-morado.png' },
                                            { key: 'Organic-Green', img: B + '2017/09/perlado-verde.png' },
                                        ].map(item => (
                                            <div key={item.key} className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => setConfig({ ...config, carcasa: item.key })}
                                                    className={`w-12 h-12 rounded-full border-[3px] overflow-hidden transition-all hover:scale-110 ${config.carcasa === item.key ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-transparent'}`}
                                                >
                                                    <img src={item.img} className="w-full h-full object-cover" alt={item.key} />
                                                </button>
                                                <span className="text-xs text-gray-400 text-center">{item.key.replace('-', ' ')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BOTONES */}
                            {activeTab === 'buttons' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Buttons Color</h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                        {[
                                            { key: 'Black', bg: '#1a1a1a', label: 'Black' },
                                            { key: 'White', bg: '#FFF', label: 'White' },
                                            { key: 'Red', bg: '#CC0000', label: 'Red' },
                                            { key: 'Yellow', bg: '#FFD700', label: 'Yellow' },
                                            { key: 'Blue-Light', bg: '#42A5F5', label: 'Light Blue' },
                                            { key: 'Blue-Dark', bg: '#1565C0', label: 'Dark Blue' },
                                            { key: 'Green', bg: '#2E7D32', label: 'Green' },
                                            { key: 'Pink', bg: '#E91E63', label: 'Pink' },
                                            { key: 'Orange', bg: '#E64A19', label: 'Orange' },
                                            { key: 'Purple', bg: '#7B1FA2', label: 'Purple' },
                                        ].map(color => (
                                            <div key={color.key} className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => setConfig({ ...config, botones: color.key })}
                                                    className={`w-12 h-12 rounded-full border-[3px] transition-all hover:scale-110 ${config.botones === color.key ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-transparent'}`}
                                                    style={{ background: color.bg }}
                                                />
                                                <span className="text-xs text-gray-400 whitespace-nowrap">{color.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* JOYSTICKS */}
                            {activeTab === 'joysticks' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-4">Joysticks</h3>

                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-3 mt-4">Shape</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                        {[
                                            { key: 'Concavo-alto', img: B + '2018/01/icon-concavo-alto.jpg', label: 'Concave Tall' },
                                            { key: 'Concavo-bajo', img: B + '2018/01/icon-concavo-bajo.jpg', label: 'Concave Short' },
                                            { key: 'Convexo-alto', img: B + '2018/01/icon-convexo-alto.jpg', label: 'Convex Tall' },
                                            { key: 'Convexo-bajo', img: B + '2018/01/icon-convexo-bajo.jpg', label: 'Convex Short' },
                                        ].map(shape => (
                                            <button
                                                key={shape.key}
                                                onClick={() => setConfig({ ...config, joy_shape: shape.key })}
                                                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${config.joy_shape === shape.key ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 hover:bg-white/5 hover:border-white/30'}`}
                                            >
                                                <img src={shape.img} alt={shape.label} className="w-12 h-12 rounded bg-white object-contain mb-2" />
                                                <span className="text-xs text-center">{shape.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-3">Top part color</p>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        {[
                                            { key: 'Black', bg: '#1a1a1a' }, { key: 'White', bg: '#FFF' },
                                            { key: 'Red', bg: '#CC0000' }, { key: 'Blue', bg: '#1565C0' }, { key: 'Green', bg: '#2E7D32' }
                                        ].map(color => (
                                            <button
                                                key={`seta-${color.key}`}
                                                onClick={() => setConfig({ ...config, joy_seta: color.key })}
                                                className={`w-10 h-10 rounded-full border-[3px] transition-all hover:scale-110 ${config.joy_seta === color.key ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-transparent'}`}
                                                style={{ background: color.bg }}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-3">Base color</p>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { key: 'Negro', bg: '#1a1a1a' }, { key: 'Blanco', bg: '#FFF' },
                                            { key: 'Rojo', bg: '#CC0000' }, { key: 'Azul', bg: '#1565C0' }, { key: 'Verde', bg: '#2E7D32' }
                                        ].map(color => (
                                            <button
                                                key={`base-${color.key}`}
                                                onClick={() => setConfig({ ...config, joy_base: color.key })}
                                                className={`w-10 h-10 rounded-full border-[3px] transition-all hover:scale-110 ${config.joy_base === color.key ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-transparent'}`}
                                                style={{ background: color.bg }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CRUCETA */}
                            {activeTab === 'D-Pad' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Cruceta (D-Pad)</h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                        {[
                                            { key: 'Black', bg: '#1a1a1a', label: 'Black' },
                                            { key: 'White', bg: '#FFF', label: 'White' },
                                            { key: 'Red', bg: '#CC0000', label: 'Red' },
                                            { key: 'Blue-Light', bg: '#42A5F5', label: 'Blue' },
                                            { key: 'Green', bg: '#2E7D32', label: 'Green' },
                                            { key: 'Yellow', bg: '#FFD700', label: 'Yellow' },
                                            { key: 'Orange', bg: '#E64A19', label: 'Orange' },
                                            { key: 'Purple', bg: '#7B1FA2', label: 'Purple' },
                                        ].map(color => (
                                            <div key={color.key} className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => setConfig({ ...config, cruceta: color.key })}
                                                    className={`w-12 h-12 rounded-full border-[3px] transition-all hover:scale-110 ${config.cruceta === color.key ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-transparent'}`}
                                                    style={{ background: color.bg }}
                                                />
                                                <span className="text-xs text-gray-400 whitespace-nowrap">{color.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TEXTURA */}
                            {activeTab === 'texture' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-xl font-bold mb-6">Textura</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                        {[
                                            { key: 'none', img: B + '2017/09/vacio.png', label: 'No Texture' },
                                            { key: 'Carbono', img: B + '2017/09/icon-carbono.png', label: 'Carbon Fiber' },
                                            { key: 'Pollock', img: B + '2017/09/icon-pollock.png', label: 'Pollock' },
                                            { key: 'Blood', img: B + '2017/09/icono-blood.png', label: 'Blood' },
                                            { key: 'Fresh', img: B + '2017/09/icono-fresh.png', label: 'Fresh' },
                                            { key: 'Dollar', img: B + '2017/09/icon-dollar.png', label: 'Dollar' },
                                            { key: 'Joker', img: B + '2017/09/icon-joker.png', label: 'Joker' },
                                            { key: 'Snake', img: B + '2017/09/textura-serpiente.png', label: 'Snake' },
                                        ].map(texture => (
                                            <button
                                                key={texture.key}
                                                onClick={() => setConfig({ ...config, textura: texture.key })}
                                                className={`flex flex-col items-center border-[3px] rounded-xl overflow-hidden transition-all ${config.textura === texture.key ? 'border-cyan-400 scale-105 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-transparent hover:border-white/30'}`}
                                            >
                                                <img src={texture.img} alt={texture.label} className="w-full aspect-square object-cover" />
                                                <span className="w-full text-xs text-center py-2 bg-zinc-800 font-medium">{texture.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ADD TO CART */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-400 text-lg uppercase tracking-widest font-bold">Total</span>
                                <span className="text-3xl font-black text-cyan-400">74,95€</span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                            >
                                <ShoppingCart size={24} />
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
