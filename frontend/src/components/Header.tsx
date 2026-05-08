import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartSummary from './CartSummary';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// Importar imágenes
import instagramLogo from '../imgs/instagram.jpg';
import twitterLogo from '../imgs/twitter.jpg';
import tiktokLogo from '../imgs/tiktok.jpg';
import menuIcon from '../imgs/menuLateral.png';
import mainLogo from '../imgs/Logo.jpg';

function Header() {
    const navigate = useNavigate();
    const { cart, cartCount, updateQuantity, removeFromCart } = useCart();
    const { customer, setCustomer } = useUser();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();

  // No mostrar el header global en la intranet
    if (location.pathname.startsWith('/intranet')) {
        return null;
    }

    const toggleCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsCartOpen(!isCartOpen);
    };

const handleLogout = async () => {
    try {
        await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setCustomer(null);
        navigate('/');
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
            setCustomer(null);
            navigate('/');
        }
};

return (
    <>
    <header>
        <div className="HeaderSuperior">
            <div className="RedesSociales">
                <a href="https://www.instagram.com/instagram/" className="logoRedes" target="_blank" rel="noopener noreferrer">
                    <img className="logo-redes" src={instagramLogo} alt="Instagram logo" /> 
                </a>

                <a href="https://x.com/X" className="logoRedes" target="_blank" rel="noopener noreferrer">
                    <img className="logo-redes" src={twitterLogo} alt="Twitter logo" /> 
                </a>

                <a href="https://www.tiktok.com/@tiktok" className="logoRedes" target="_blank" rel="noopener noreferrer">
                    <img className="logo-redes" src={tiktokLogo} alt="TikTok logo" /> 
                </a>
            </div>

            <div className="AD-HeaderSuperior">
                <a href="#" className="AD-SobreNosotros">About us</a>
                <a href="#" className="AD-Contacto">Contact</a>
            </div>
        </div>

        <div className="HeaderPrincipal">
            <div className="MenuLogo">
                <img className="desplegadorLateral" src={menuIcon} alt="Menu icon" />
                <img 
                    className="imagenLogo" 
                    src={mainLogo} 
                    alt="BlueForge logo" 
                    onClick={() => navigate('/')} 
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <input type="text" placeholder="Search..." />
            <div className="AccionesHeader">
                {!customer ? (
                    <>
                        <button className="boton-login" onClick={() => navigate('/login')}>LogIn</button>
                        <button className="boton-registrar" onClick={() => navigate('/register')}>Registrar</button>
                    </>
                ) : (
                    <div className="user-info-reto">
                        <span onClick={() => navigate('/mis-pedidos')} style={{cursor: 'pointer'}}>👤 {customer.username}</span>
                        <button className="boton-login" onClick={handleLogout}>Logout</button>
                    </div>
                )}
                <div className="cart-container-reto" onClick={toggleCart} style={{ cursor: 'pointer' }}>
                    <span style={{ fontSize: '1.5rem' }}>🛒</span>
                    {cartCount > 0 && (
                        <span className="counter-badge-reto">{cartCount}</span>
                    )}
                </div>
            </div>
        </div>

        {isCartOpen && (
            <div className="cart-dropdown">
                <CartSummary
                    cart={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onConfirm={() => {
                        setIsCartOpen(false);
                        if (customer) {
                            navigate('/checkout');
                        } else {
                            navigate('/login');
                        }
                    }}
                />
            </div>
        )}
    </header>
    </>
    );
}

export default Header;
