import { useState, useEffect } from 'react';
import { Target, Zap, TrendingUp, Users, Info } from 'lucide-react';

export default function HypeEngine() {
    const [boost, setBoost] = useState<any>(null);
    const [vendors, setVendors] = useState<any[]>([]);
    
    const [form, setForm] = useState({
        multiplier: 2.0,
        duration: 2,
        title: 'Exam Week Madness'
    });

    useEffect(() => {
        fetch('/api/admin/hype/status')
            .then(res => res.json())
            .then(data => setBoost(data.boost))
            .catch(console.error);

        fetch('/api/admin/operations/vendors')
            .then(res => res.json())
            .then(data => setVendors(data.scorecards))
            .catch(console.error);
    }, []);

    const handleApplyBoost = async () => {
        try {
            await fetch('/api/admin/hype/boost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    multiplier: form.multiplier,
                    durationHours: form.duration,
                    title: form.title
                })
            });
            alert('Hype Boost Activated!');
            setBoost({ multiplier: form.multiplier, expires: Date.now() + form.duration * 3600000, title: form.title });
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdateShadowBoost = async (vendorId: string, multiplier: number) => {
        try {
            await fetch('/api/admin/hype/shadow-boost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId, multiplier })
            });
            setVendors(vendors.map(v => v.id === vendorId ? { ...v, hypeMultiplier: multiplier } : v));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Control Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-8 h-8 text-electric-red" />
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider">Time-Based Boosters</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block font-black uppercase text-xs mb-2">Event Title</label>
                            <input 
                                type="text" 
                                value={form.title}
                                onChange={e => setForm({...form, title: e.target.value})}
                                className="w-full p-4 border-4 border-black font-bold focus:bg-volt-green/10 outline-none transition-all"
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block font-black uppercase text-xs mb-2">Multiplier (x)</label>
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    value={form.multiplier}
                                    onChange={e => setForm({...form, multiplier: parseFloat(e.target.value)})}
                                    className="w-full p-4 border-4 border-black font-bold outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-black uppercase text-xs mb-2">Duration (Hours)</label>
                                <input 
                                    type="number" 
                                    value={form.duration}
                                    onChange={e => setForm({...form, duration: parseInt(e.target.value)})}
                                    className="w-full p-4 border-4 border-black font-bold outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleApplyBoost}
                            className="w-full bg-electric-red text-white font-black uppercase tracking-widest p-4 border-4 border-black brutal-shadow-md hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
                        >
                            Trigger Hype Window
                        </button>
                    </div>
                </div>

                <div className="bg-deep-charcoal text-white p-6 rounded-xl border-4 border-black brutal-shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h4 className="font-display font-black text-xl uppercase text-volt-green mb-2">Active Hype Status</h4>
                            {boost && boost.expires > Date.now() ? (
                                <div>
                                    <div className="text-4xl font-black mb-1">{boost.multiplier}x BOOST</div>
                                    <div className="font-bold uppercase tracking-widest text-sm text-gray-400">{boost.title}</div>
                                    <div className="mt-8 flex items-center gap-2 bg-volt-green text-black px-4 py-2 rounded-full border-2 border-black font-black w-fit">
                                        <TrendingUp className="w-5 h-5" />
                                        <span>EXPIRES IN {Math.round((boost.expires - Date.now()) / 60000)} MINS</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 font-bold uppercase tracking-widest py-12">No active global boosters</div>
                            )}
                        </div>
                        <div className="mt-4 p-4 bg-white/10 rounded-lg border-2 border-white/20">
                            <div className="flex items-center gap-2 text-volt-green mb-1">
                                <Info className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase">Admin Tip</span>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-relaxed">
                                Boosters double Hype Points for all users across the platform. Use sparingly during dead hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shadow Boosting */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8" />
                    <h3 className="font-display font-black text-2xl uppercase tracking-wider">Shadow-Boosting (Vendor Favor)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map(v => (
                        <div key={v.id} className="bg-white border-4 border-black p-4 rounded-xl brutal-shadow-sm group">
                            <div className="font-black uppercase text-lg mb-4 truncate">{v.name}</div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Hype Multiplier</span>
                                <span className="font-black text-electric-red">x{v.hypeMultiplier.toFixed(1)}</span>
                            </div>
                            <div className="flex gap-1">
                                {[1.0, 1.2, 1.5, 2.0].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => handleUpdateShadowBoost(v.id, m)}
                                        className={`flex-1 py-2 border-2 border-black rounded font-black text-xs transition-all ${
                                            v.hypeMultiplier === m ? 'bg-volt-green translate-y-0.5' : 'bg-white hover:bg-gray-100'
                                        }`}
                                    >
                                        {m}x
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Targeting */}
            <div className="bg-volt-green text-black p-6 border-4 border-black rounded-xl brutal-shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8" />
                    <h3 className="font-display font-black text-2xl uppercase tracking-wider">Airdrop Target Group</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                    {['ALL USERS', 'TOP 50', 'ENGINEERING', 'FRESHMEN', 'INACTIVE (7D)'].map(group => (
                        <button key={group} className="px-6 py-3 bg-white border-4 border-black font-black uppercase text-sm brutal-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-all active:translate-x-0 active:translate-y-0">
                            {group}
                        </button>
                    ))}
                    <button className="px-6 py-3 bg-black text-volt-green border-4 border-black font-black uppercase text-sm brutal-shadow-sm">
                        + New Segment
                    </button>
                </div>
            </div>
        </div>
    );
}
