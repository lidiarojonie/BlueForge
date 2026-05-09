import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { MapPin, Plus, CheckCircle2, CreditCard, ShoppingBag, ArrowLeft, Truck, Wallet, Landmark } from 'lucide-react';

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number | string;
}

interface Address {
    id: number;
    alias: string;
    street: string;
    city: string;
    zip: string;
}

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { customer } = useUser();

    // 1. Empezamos con la libreta de direcciones VACÍA
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
    
    // Estados del Checkout
    const [selectedAddressId, setSelectedAddressId] = useState<number>(0);
    // 2. Si no hay direcciones, el formulario de añadir se muestra por defecto
    const [isAddingAddress, setIsAddingAddress] = useState(true); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Estado para el Método de Pago
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'transfer'>('card');

    // Estado para el formulario de nueva dirección
    const [newAddress, setNewAddress] = useState({ alias: '', street: '', city: '', zip: '' });

    const getPrice = (price: number | string): number => {
      return typeof price === 'string' ? parseFloat(price) : price;
    };

    const calculateTotal = (): number => {
      return cart.reduce((total, item) => total + getPrice(item.product.price) * item.quantity, 0);
    };

    // Función para guardar una nueva dirección en la libreta
    const handleSaveAddress = (e: React.FormEvent) => {
        e.preventDefault();
        const addressToAdd = {
            id: Date.now(),
            ...newAddress
        };
        setSavedAddresses([...savedAddresses, addressToAdd]);
        setSelectedAddressId(addressToAdd.id);
        setIsAddingAddress(false);
        setNewAddress({ alias: '', street: '', city: '', zip: '' });
        setError(''); // Limpiamos errores si los hubiera
    };

    const handleCompleteOrder = async () => {
        const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId);
        
        if (!selectedAddress) {
            setError('Por favor, añade y selecciona una dirección de envío');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const orderItems: OrderItem[] = cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: getPrice(item.product.price)
            }));

            const addressString = `${selectedAddress.street}, ${selectedAddress.zip} ${selectedAddress.city}`;

            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "items": orderItems,
                    "address": addressString
                    // Nota: Tu backend actual no espera el método de pago, 
                    // así que no lo enviamos para no romper nada. Es puramente visual.
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Error al crear el pedido');
                setIsLoading(false);
                return;
            }

            clearCart();
            navigate('/order-success');

        } catch (err) {
            setError('Error de conexión. Por favor, intenta de nuevo.');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-8">
                <ShoppingBag size={64} className="text-gray-600 mb-6" />
                <h2 className="text-3xl font-black mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-400 mb-6">No hay productos en tu carrito. Vuelve a la tienda y añade algunos productos.</p>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors">
                    ← Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] p-8 font-sans pb-24">
            <div className="max-w-6xl mx-auto space-y-8">
                
                <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors font-bold text-lg">
                    <ArrowLeft size={24} /> Volver al carrito
                </button>

                <header className="border-b border-white/10 pb-6">
                    <h1 className="text-4xl font-black text-white flex items-center gap-4">
                        <ShoppingBag className="text-cyan-400" size={36} />
                        Finalizar <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Pedido</span>
                    </h1>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
                        <div className="font-bold">Error:</div> {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* COLUMNA IZQUIERDA: DIRECCIONES Y PAGO */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* SECCIÓN 1: MIS DIRECCIONES */}
                        <section className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Truck className="text-cyan-400" /> 1. Dirección de Envío
                            </h2>

                            {savedAddresses.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {savedAddresses.map((addr) => (
                                        <div 
                                            key={addr.id}
                                            onClick={() => {
                                                setSelectedAddressId(addr.id);
                                                setIsAddingAddress(false);
                                                setError('');
                                            }}
                                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                                                selectedAddressId === addr.id 
                                                ? 'border-cyan-500 bg-cyan-500/10' 
                                                : 'border-white/10 hover:border-white/30 bg-black/50'
                                            }`}
                                        >
                                            {selectedAddressId === addr.id && (
                                                <div className="absolute top-4 right-4 text-cyan-400"><CheckCircle2 size={24} /></div>
                                            )}
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin size={18} className={selectedAddressId === addr.id ? "text-cyan-400" : "text-gray-500"}/>
                                                <span className="font-bold text-white uppercase tracking-wider text-sm">{addr.alias}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mt-2">{addr.street}</p>
                                            <p className="text-gray-500 text-sm">{addr.zip} - {addr.city}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isAddingAddress ? (
                                <form onSubmit={handleSaveAddress} className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-4 animate-in fade-in zoom-in duration-300">
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Añadir Dirección</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required type="text" placeholder="Alias (Ej: Casa, Oficina...)" value={newAddress.alias} onChange={e => setNewAddress({...newAddress, alias: e.target.value})} className="col-span-2 bg-zinc-900 border border-white/10 p-3 rounded-xl text-white focus:border-cyan-500 focus:outline-none" />
                                        <input required type="text" placeholder="Calle y número" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="col-span-2 bg-zinc-900 border border-white/10 p-3 rounded-xl text-white focus:border-cyan-500 focus:outline-none" />
                                        <input required type="text" placeholder="Ciudad" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="bg-zinc-900 border border-white/10 p-3 rounded-xl text-white focus:border-cyan-500 focus:outline-none" />
                                        <input required type="text" placeholder="Código Postal" value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="bg-zinc-900 border border-white/10 p-3 rounded-xl text-white focus:border-cyan-500 focus:outline-none" />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button type="submit" className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl flex-1 hover:bg-cyan-400 transition-colors">Guardar y Usar</button>
                                        {savedAddresses.length > 0 && (
                                            <button type="button" onClick={() => setIsAddingAddress(false)} className="px-4 py-2 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">Cancelar</button>
                                        )}
                                    </div>
                                </form>
                            ) : (
                                <button 
                                    onClick={() => { setIsAddingAddress(true); setSelectedAddressId(0); }}
                                    className="w-full py-4 border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-2xl text-gray-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2 font-bold bg-black/20"
                                >
                                    <Plus size={20} /> Añadir otra dirección
                                </button>
                            )}
                        </section>

                        {/* SECCIÓN 2: MÉTODOS DE PAGO */}
                        <section className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <CreditCard className="text-cyan-400" /> 2. Método de Pago
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Opción: Tarjeta */}
                                <div 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-3 text-center ${paymentMethod === 'card' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-white/10 hover:border-white/30 text-gray-400 bg-black/50'}`}
                                >
                                    <CreditCard size={32} />
                                    <span className="font-bold text-sm">Tarjeta</span>
                                </div>

                                {/* Opción: PayPal */}
                                <div 
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-3 text-center ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 hover:border-white/30 text-gray-400 bg-black/50'}`}
                                >
                                    <Wallet size={32} />
                                    <span className="font-bold text-sm">PayPal</span>
                                </div>

                                {/* Opción: Transferencia */}
                                <div 
                                    onClick={() => setPaymentMethod('transfer')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-3 text-center ${paymentMethod === 'transfer' ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/10 hover:border-white/30 text-gray-400 bg-black/50'}`}
                                >
                                    <Landmark size={32} />
                                    <span className="font-bold text-sm">Transferencia</span>
                                </div>
                            </div>

                            {/* Detalles dinámicos según el método elegido */}
                            <div className="mt-6 p-5 bg-black/50 rounded-2xl border border-white/5">
                                {paymentMethod === 'card' && (
                                    <p className="text-gray-400 text-sm">El pago se procesará de forma segura a través de nuestra pasarela cifrada al finalizar el pedido. Aceptamos Visa, MasterCard y American Express.</p>
                                )}
                                {paymentMethod === 'paypal' && (
                                    <p className="text-gray-400 text-sm">Serás redirigido a la página de PayPal para completar la compra de forma segura con tu cuenta o saldo.</p>
                                )}
                                {paymentMethod === 'transfer' && (
                                    <p className="text-gray-400 text-sm">Te enviaremos un correo con el número de cuenta (IBAN). Tu pedido se enviará una vez confirmemos la recepción de los fondos (puede tardar 1-2 días hábiles).</p>
                                )}
                            </div>
                        </section>

                    </div>

                    {/* COLUMNA DERECHA: RESUMEN DEL PEDIDO */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-2xl sticky top-24">
                            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Resumen de Compra</h2>
                            
                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 items-center bg-black/40 p-3 rounded-xl border border-white/5">
                                        <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-contain bg-white/5 rounded-lg p-1" />
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-bold line-clamp-1">{item.product.name}</p>
                                            <p className="text-gray-500 text-xs mt-1">Cant: {item.quantity}</p>
                                        </div>
                                        <p className="text-cyan-400 font-bold">€{(getPrice(item.product.price) * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-white/10 pt-4 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>€{calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Envío</span>
                                    <span className="text-green-400 font-bold">Gratis</span>
                                </div>
                                <div className="flex justify-between text-white text-2xl font-black pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span className="text-cyan-400">€{calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleCompleteOrder}
                                disabled={isLoading || !selectedAddressId}
                                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <>Procesando Pedido...</>
                                ) : (
                                    <>
                                        {paymentMethod === 'paypal' ? 'PAGAR CON PAYPAL' : 'COMPLETAR PEDIDO'} 
                                        <CheckCircle2 size={24} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}