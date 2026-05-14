import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types.ts";

function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = sessionStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [address, setAddress] = useState("");

    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Cálculo del total compatible con ambos tipos de producto
    const total = cart.reduce((sum, item: any) => {
        const price = item.product ? item.product.price : item.price;
        const qty = item.quantity || 1;
        return sum + (price * qty);
    }, 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }
        if (!address) {
            alert("Por favor ingrese una dirección de envío");
            return;
        }

        // 🔥 TRADUCCIÓN PARA EL BACKEND (OrderDAO):
        // Mapeamos los campos para que coincidan exactamente con lo que espera el servidor
        const formattedItems = cart.map((item: any) => ({
            product_id: item.product ? item.product.id : item.id, 
            price: item.product ? item.product.price : item.price,
            quantity: item.quantity || 1
        }));

        fetch('http://localhost:3000/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            // 🔥 CLAVE: Enviamos 'items' y 'address', tal como pide tu index.ts
            body: JSON.stringify({ items: formattedItems, address: address })
        })
        .then(res => {
            if (!res.ok) throw new Error("Error del servidor: " + res.status);
            return res.json();
        })
        .then(data => {
            if (data.order) {
                alert(`¡Order placed successfully! Total to pay: €${total.toFixed(2)}`);
                setCart([]);
                sessionStorage.removeItem("cart");
                setAddress("");
                navigate("/");
            } else {
                alert("Error processing the order");
            }
        })
        .catch(error => {
            alert("Error processing the order: " + error.message);
        });
    };

    return (
        <div className="checkout">
            <h2>Cart Summary</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                <ul className="checkout-list">
                    {cart.map((item: any, index) => {
                        const prodName = item.product ? item.product.name : item.name;
                        const prodPrice = item.product ? item.product.price : item.price;
                        const qty = item.quantity || 1;

                        return (
                            <li key={index} className="checkout-item">
                                <span className="checkout-item-name">{prodName}</span> 
                                <span className="checkout-item-quantity">Qty: {qty}</span>
                                <span className="checkout-item-price">€{(prodPrice * qty).toFixed(2)}</span>
                            </li>
                        );
                    })}
                </ul>

                <div className="checkout-address">
                    <label htmlFor="address">Shipping Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your street address"
                    />
                </div>
                <div className="checkout-total">Total: <strong>€{total.toFixed(2)}</strong></div>
                <button className="checkout-button" onClick={handleCheckout}>
                    Complete Purchase
                </button>
                </>
            )}
        </div>
    );
}

export default Checkout;