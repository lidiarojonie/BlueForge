import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ShoppingCart, User } from 'lucide-react';

import mainLogo from '../imgs/Logo.jpg';

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
      
      {/* 🟢 TOP BAR - INFO ONLY */}
      <div className="bg-cyan-500 text-black text-center py-2 text-xs md:text-sm font-black uppercase tracking-widest">
         LEVEL UP YOUR GAME - FREE SHIPPING ON ORDERS OVER 150€
      </div>

      {/* ⬛ MAIN NAVIGATION */}
      <div className="bg-[#0b0c10] px-8 py-4 flex justify-between items-center border-b border-white/5">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
            <img 
              className="h-12 md:h-16 lg:h-20 cursor-pointer hover:brightness-125 transition-all rounded-md" 
              src={mainLogo} 
              alt="BlueForge" 
              onClick={() => navigate('/')} 
            />
        </div>

        {/* CENTER LINKS - CLICKABLE WITH POINTER CURSOR */}
        <nav className="hidden lg:flex items-center gap-12">
            <button 
              onClick={() => navigate('/personalizador?mando=ps4')} 
              className="text-sm font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
                PS4 CUSTOM
            </button>
            <button 
              onClick={() => navigate('/personalizador?mando=ps5')} 
              className="text-sm font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
                PS5 CUSTOM
            </button>
            <button 
              onClick={() => navigate('/personalizador?mando=xbox')} 
              className="text-sm font-bold text-gray-200 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
                XBOX ELITE
            </button>
            <button 
              className="text-sm font-bold text-gray-200 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
            >
                CONTACT
            </button>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {!customer ? (
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/login')} className="hidden md:block text-xs font-black text-gray-400 hover:text-white uppercase tracking-widest cursor-pointer">Log In</button>
              <button onClick={() => navigate('/register')} className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 text-gray-300 transition-colors cursor-pointer">
                  <User size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span onClick={() => navigate('/mis-pedidos')} className="flex items-center gap-2 text-xs font-black text-white cursor-pointer hover:text-cyan-400">
                <User size={16} className="text-cyan-500" /> {customer.username}
              </span>
              <button onClick={handleLogout} className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase cursor-pointer">Logout</button>
            </div>
          )}

          <div 
            className="relative cursor-pointer group flex items-center gap-2" 
            onClick={() => navigate(customer ? '/checkout' : '/login')}
          >
            <div className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full bg-transparent hover:bg-white/5 transition-colors">
                <ShoppingCart size={24} className="text-white group-hover:text-cyan-400 transition-colors" />
            </div>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-cyan-500 text-black text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
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