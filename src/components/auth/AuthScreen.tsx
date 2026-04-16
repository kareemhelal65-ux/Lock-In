import { useState } from 'react';
import { motion } from 'framer-motion';

interface AuthScreenProps {
  onLogin: (user: any) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const res = await fetch('/api/consumer/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Login failed');
        onLogin(data.user);
      } else {
        // Signup
        if (password !== confirmPassword) {
            throw new Error('PASSWORDS DO NOT MATCH');
        }
        
        // Generate a temporary username from email to satisfy DB unique constraint
        // User will set their real username in Onboarding
        const tempUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Math.random().toString(36).substring(7);
        
        const res = await fetch('/api/consumer/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username: tempUsername, password })
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Signup failed');
        // Instantly login upon signup successfully
        onLogin({ ...data.user, needsOnboarding: true });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sneaker-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 -left-10 w-40 h-40 bg-volt-green rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 -right-10 w-60 h-60 bg-electric-red rounded-full blur-3xl opacity-10"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-display font-bold text-deep-charcoal italic tracking-tighter uppercase transform -skew-x-6 drop-shadow-md">
            SAWA.
          </h1>
          <p className="mt-2 text-cool-gray font-bold tracking-widest text-sm uppercase">FOOD TASTES BETTER SAWA</p>
        </div>

        <form onSubmit={handleSubmit} className="brutal-card p-8 flex flex-col gap-5">
          <h2 className="text-2xl font-bold uppercase mb-2">
            {isLogin ? 'Enter The Vault' : 'Join The Cult'}
          </h2>

          {error && (
            <div className="bg-electric-red text-white p-3 text-sm font-bold uppercase text-center border-2 border-deep-charcoal">
              {error}
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            className="w-full p-4 font-bold border-2 border-deep-charcoal rounded-none bg-white focus:outline-none focus:shadow-brutal-sm transition-shadow placeholder:text-cool-gray/50 uppercase"
            required
          />


          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="w-full p-4 font-bold border-2 border-deep-charcoal rounded-none bg-white focus:outline-none focus:shadow-brutal-sm transition-shadow placeholder:text-cool-gray/50 uppercase"
            required
          />

          {!isLogin && (
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="CONFIRM PASSWORD"
              className="w-full p-4 font-bold border-2 border-deep-charcoal rounded-none bg-white focus:outline-none focus:shadow-brutal-sm transition-shadow placeholder:text-cool-gray/50 uppercase"
              required
            />
          )}

          <button
            type="submit"
            className="brutal-btn-primary w-full mt-4 py-4 text-lg disabled:opacity-50 flex items-center justify-center gap-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <div className="w-6 h-6 border-4 border-t-deep-charcoal border-deep-charcoal/20 rounded-full" />
                </motion.div>
                PROCESSING...
              </>
            ) : (isLogin ? 'LOG IN' : 'SIGN UP')}
          </button>
        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setConfirmPassword('');
          }}
          className="mt-8 w-full text-center font-bold text-sm text-cool-gray uppercase hover:text-deep-charcoal transition-colors underline decoration-2 underline-offset-4"
        >
          {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY LOCKED IN? LOG IN"}
        </button>
      </div>
    </div>
  );
}
