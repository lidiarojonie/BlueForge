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

      setCustomer(data.customer);

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

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay"></div>
      </div>

      {/* CAJA XL: max-w-2xl, p-12 md:p-16 */}
      <div className="w-full max-w-2xl bg-[#0b0c10]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-[0_0_50px_rgba(34,211,238,0.05)] relative z-10">

        <div className="text-center mb-12">
          {/* TÍTULO MÁS GRANDE */}
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-wider mb-3">Welcome <span className="text-cyan-400">Back</span></h1>
          <p className="text-gray-400 text-base">Enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-base font-bold">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="identifier">Email or Username</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              {/* INPUTS MÁS GORDOS */}
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="you@email.com"
                disabled={isLoading}
                className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
              />
            </div>
          </div>

          {/* BOTÓN MÁS GRANDE */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-white/10 pt-8">
          <p className="text-gray-400 text-base">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-white font-bold transition-colors">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;