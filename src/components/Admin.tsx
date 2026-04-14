import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Users, ArrowLeft, LogOut } from 'lucide-react';

interface RSVP {
  id: number;
  full_name: string;
  attending: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setRsvps(data.data);
        setIsLoggedIn(true);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-surface-container p-8 rounded-3xl border border-outline-variant/30 shadow-xl"
        >
          <a href="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </a>
          <h2 className="text-3xl font-headline font-black text-on-surface mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-headline font-bold text-sm uppercase tracking-widest text-secondary">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-all py-4 text-lg"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && <p className="text-primary text-sm font-medium">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-headline font-black py-4 rounded-xl text-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface">RSVP Dashboard</h1>
            <p className="text-secondary mt-2">Total registrations: {rsvps.length}</p>
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="px-6 py-2 bg-surface-container border border-outline-variant rounded-lg font-headline font-bold hover:bg-surface-container-high transition-all"
            >
              Home
            </a>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-6 py-2 bg-primary text-white rounded-lg font-headline font-bold hover:opacity-90 transition-all flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rsvps.map((rsvp) => (
            <motion.div 
              key={rsvp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Users size={20} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                  rsvp.attending === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                </span>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface mb-2">{rsvp.full_name}</h3>
              <p className="text-secondary text-sm mb-4 line-clamp-3 italic">
                "{rsvp.message || 'No message left.'}"
              </p>
              <div className="text-[10px] text-outline font-label uppercase tracking-widest">
                {new Date(rsvp.created_at).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>

        {rsvps.length === 0 && (
          <div className="text-center py-20 bg-surface-container rounded-3xl border border-dashed border-outline-variant">
            <p className="text-secondary font-headline text-xl">No RSVPs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
