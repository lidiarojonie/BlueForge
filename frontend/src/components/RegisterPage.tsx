import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const navigate = useNavigate();
  const { setCustomer } = useUser();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      setCustomer(data.customer);

      if (data.customer.email.toLowerCase().endsWith('@empleado.com')) {
        navigate('/intranet');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 pt-24 pb-10 relative overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay"></div>
      </div>

      {/* CAJA XL: max-w-2xl (más ancho), p-12 md:p-16 (mucho más padding) */}
      <div className="w-full max-w-2xl bg-[#0b0c10]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-[0_0_50px_rgba(34,211,238,0.05)] relative z-10">

        <div className="text-center mb-12">
          {/* TÍTULO MÁS GRANDE (text-4xl md:text-5xl) */}
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-wider mb-3">Create <span className="text-cyan-400">Account</span></h1>
          <p className="text-gray-400 text-base">Join the elite and design your custom gear.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-base font-bold">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="username">Username</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              {/* INPUTS MÁS GORDOS (py-4 text-lg pl-14) */}
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="gamer_tag"
                disabled={isLoading}
                className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                disabled={isLoading}
                className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="confirmPassword">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* BOTÓN MÁS GRANDE (py-5 text-lg mt-8) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-white/10 pt-8">
          <p className="text-gray-400 text-base">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-white font-bold transition-colors">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;