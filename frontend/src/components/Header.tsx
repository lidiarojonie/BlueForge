import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ShoppingCart, User, Lock } from 'lucide-react';

import mainLogo from '../imgs/new_logo.png'; // Asegúrate de que el nombre coincide con el tuyo

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { customer, setCustomer } = useUser();
  const location = useLocation();

  if (location.pathname.startsWith('/intranet')) return null;

  const handleLogout = async () => {
      try {
          await fetch('http://localhost:3000/api/auth/logout', { method: 'POST', credentials: 'include' });
          setCustomer(null);
          navigate('/');
      } catch (err) {
          setCustomer(null);
          navigate('/');
      }
  };

  return (
    <header className="fixed top-0 w-full z-50 font-sans shadow-2xl">
      
      {/* 🟢 TOP BAR */}
      <div className="bg-cyan-500 text-black text-center py-2 text-sm font-black uppercase tracking-widest">
         LEVEL UP YOUR GAME - FREE SHIPPING ON ORDERS OVER 150€
      </div>

      {/* ⬛ MAIN NAVIGATION */}
      <div className="bg-[#0b0c10] px-8 py-4 flex justify-between items-center border-b border-white/5">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
            <img 
              className="h-16 md:h-20 lg:h-24 cursor-pointer hover:scale-105 hover:brightness-125 transition-all drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
              src={mainLogo} 
              alt="BlueForge" 
              onClick={() => navigate('/')} 
            />
        </div>

        {/* CENTER LINKS (Ahora más grandes con text-base) */}
        <nav className="hidden lg:flex items-center gap-10">
            <button 
              onClick={() => navigate('/personalizador?mando=ps4')} 
              className="text-base font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
                PS4 CUSTOM
            </button>
            <button 
              onClick={() => navigate('/personalizador?mando=ps5')} 
              className="text-base font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
                PS5 CUSTOM
            </button>
            <button 
              onClick={() => navigate('/personalizador?mando=xbox')} 
              className="text-base font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
                XBOX ELITE
            </button>

            {/* INTRANET / CONTACT */}
            {(customer?.role === 'admin' || customer?.role === 'employee') ? (
                <button 
                  onClick={() => navigate('/intranet')}
                  className="text-base font-black text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-2"
                >
                    <Lock size={18} /> INTRANET
                </button>
            ) : (
               <button 
                  onClick={() => navigate('/contacto')}
                  className="text-base font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
                >
                    CONTACT
                </button>
            )}
        </nav>

        {/* ACTIONS (Iconos y textos más grandes) */}
        <div className="flex items-center gap-8 flex-shrink-0">
          {!customer ? (
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/login')} className="hidden md:block text-sm font-black text-gray-400 hover:text-white uppercase tracking-widest cursor-pointer">Log In</button>
              <button onClick={() => navigate('/register')} className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 text-gray-300 transition-colors cursor-pointer">
                  <User size={22} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <span onClick={() => navigate('/mis-pedidos')} className="flex items-center gap-2 text-sm font-black text-white cursor-pointer hover:text-cyan-400 uppercase tracking-widest">
                <User size={20} className="text-cyan-500" /> {customer.username}
              </span>
              <button onClick={handleLogout} className="text-sm font-bold text-gray-500 hover:text-red-500 uppercase cursor-pointer tracking-widest">Logout</button>
            </div>
          )}

          {/* CART ICON (Aumentado a size 28) */}
          <div 
            className="relative cursor-pointer group flex items-center gap-2" 
            onClick={() => navigate(customer ? '/checkout' : '/login')}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-white/5 transition-colors">
                <ShoppingCart size={28} className="text-white group-hover:text-cyan-400 transition-colors" />
            </div>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-cyan-500 text-black text-xs font-black w-6 h-6 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;