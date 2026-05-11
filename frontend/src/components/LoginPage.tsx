import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginFormData {
  identifier: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { setCustomer } = useUser();
  const [formData, setFormData] = useState<LoginFormData>({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: formData.identifier, password: formData.password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      
      // Guardar usuario en el Context
      setCustomer(data.customer);

      // Redirigir según el dominio del correo
      if (data.customer.email.toLowerCase().endsWith('@empleado.com')) {
        navigate('/intranet');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-md bg-[#0b0c10]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_0_50px_rgba(34,211,238,0.05)] relative z-10">
        
        <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-wider mb-2">Welcome <span className="text-cyan-400">Back</span></h1>
            <p className="text-gray-400 text-sm">Enter your credentials to access your account.</p>
        </div>
        
        {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm font-bold">
                <AlertCircle size={18} />
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="identifier">Email or Username</label>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  disabled={isLoading}
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="password">Password</label>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-white font-bold transition-colors">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;