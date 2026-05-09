import { useState } from "react";
import type { Product } from "../types.ts";
import { ShoppingCart, Edit3, Trash2, Ban, CheckCircle, Star, Check } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onSelect?: (id: number) => void;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
    onToggle?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

// Nueva función de estrellas usando iconos elegantes
function renderStars(rating: number | null | undefined) {
    if (rating === null || rating === undefined) {
        return <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Sin valoraciones</span>;
    }
    const filledStars = Math.round(rating);
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    size={14} 
                    className={star <= filledStars ? "text-yellow-400 fill-yellow-400" : "text-zinc-700"} 
                />
            ))}
        </div>
    );
}

function ProductCard({ product, onSelect, onEdit, onDelete, onToggle, onAddToCart }: ProductCardProps) {
    const isInactive = product.active === false;
    // Estado para controlar la animación del carrito
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que al hacer clic se abra la página del producto
        if (onAddToCart) {
            onAddToCart(product);
            // Activamos el check verde
            setIsAdded(true);
            // A los 1.5 segundos lo devolvemos a su estado normal (carrito cyan)
            setTimeout(() => setIsAdded(false), 1500);
        }
    };

    return (
        <div 
            onClick={() => onSelect && onSelect(product.id)}
            className={`group relative flex flex-col bg-zinc-900 border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 ${
                isInactive ? 'border-red-500/30 opacity-75' : 'border-white/5 hover:border-cyan-500/50'
            }`}
        >
            {/* CONTENEDOR DE LA IMAGEN */}
            <div className="relative h-56 bg-black overflow-hidden flex items-center justify-center p-4">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Overlay si está deshabilitado */}
                {isInactive && (
                    <div className="absolute inset-0 bg-red-900/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-black tracking-widest border-2 border-white/20 px-4 py-2 rounded-lg bg-black/50 rotate-[-10deg]">
                            DESHABILITADO
                        </span>
                    </div>
                )}

                {/* Botón flotante de añadir al carrito CON ANIMACIÓN */}
                {onAddToCart && !isInactive && product.stock > 0 && (
                    <button
                        title="Añadir al carrito"
                        onClick={handleAddToCart}
                        className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all duration-300 z-10 ${
                            isAdded 
                            ? "bg-green-500 text-black scale-110 shadow-[0_0_20px_rgba(34,197,94,0.5)]" 
                            : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-110"
                        }`}
                    >
                        {isAdded ? <Check size={20} className="animate-in zoom-in duration-300" /> : <ShoppingCart size={20} />}
                    </button>
                )}
            </div>

            {/* INFORMACIÓN DEL PRODUCTO */}
            <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/40">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1" title={product.name}>
                    {product.name}
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-cyan-400">
                        {Number(product.price).toFixed(2)} €
                    </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    {renderStars(product.average_rating)}
                    <span className={`text-xs font-bold uppercase tracking-wider ${product.stock > 0 ? "text-green-400" : "text-red-500"}`}>
                        {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
                    </span>
                </div>
            </div>

            {/* BOTONES DE ADMINISTRADOR */}
            {(onEdit || onDelete || onToggle) && (
                <div className="flex items-center gap-2 p-3 bg-black border-t border-white/10">
                    {onEdit && (
                        <button 
                            title="Editar stock" 
                            onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                            className="flex-1 py-2 bg-zinc-900 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 rounded-lg flex items-center justify-center transition-colors border border-white/5 hover:border-cyan-500/30"
                        >
                            <Edit3 size={16} />
                        </button>
                    )}
                    {onToggle && (
                        <button 
                            title={product.active ? "Deshabilitar" : "Habilitar"} 
                            onClick={(e) => { e.stopPropagation(); onToggle(product); }}
                            className={`flex-1 py-2 bg-zinc-900 rounded-lg flex items-center justify-center transition-colors border border-white/5 ${
                                product.active 
                                ? "hover:bg-red-500/20 text-gray-400 hover:text-red-400 hover:border-red-500/30" 
                                : "hover:bg-green-500/20 text-gray-400 hover:text-green-400 hover:border-green-500/30"
                            }`}
                        >
                            {product.active ? <Ban size={16} /> : <CheckCircle size={16} />}
                        </button>
                    )}
                    {onDelete && (
                        <button 
                            title="Borrar" 
                            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
                            className="flex-1 py-2 bg-zinc-900 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg flex items-center justify-center transition-colors border border-white/5 hover:border-red-500/30"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductCard;