import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Activity, LockIcon } from 'lucide-react';

interface VendorLedgerProps {
    correctPin?: string;
    vendorId: string;
}

export default function VendorLedger({ correctPin = '1234', vendorId }: VendorLedgerProps) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pin, setPin] = useState('');
    const [period, setPeriod] = useState('today');
    const [stats, setStats] = useState<any>({
        totalVolume: 0,
        commissionOwed: 0,
        totalOrders: 0,
        peakHours: [0, 0, 0, 0, 0, 0, 0],
        itemPopularity: [],
        volumeChange: 0,
        ordersChange: 0
    });

    useEffect(() => {
        if (!isUnlocked || !vendorId) return;
        const fetchLedger = async () => {
            try {
                const res = await fetch(`/api/vendorData/${vendorId}/ledger?period=${period}`);
                const data = await res.json();
                if (data.stats) setStats(data.stats);
            } catch (err) {
                console.error("Failed to load ledger data", err);
            }
        };
        fetchLedger();
    }, [isUnlocked, vendorId, period]);

    const handleUnlock = () => {
        if (pin === correctPin) {
            setIsUnlocked(true);
        }
    };

    if (!isUnlocked) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-deep-charcoal relative">
                <div className="bg-zinc-900 border-2 border-cool-gray/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
                    <LockIcon className="w-12 h-12 text-cool-gray mx-auto mb-4" />
                    <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-white mb-2">Ledger Hub</h2>
                    <p className="text-cool-gray text-sm mb-6">Enter Admin PIN to access financial analytics and calculated service fee balances.</p>

                    <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 text-center text-white text-2xl tracking-[1em] font-display font-black focus:border-volt-green focus:outline-none mb-4"
                        placeholder="••••"
                    />

                    <button
                        onClick={handleUnlock}
                        className="w-full bg-volt-green text-deep-charcoal font-display font-black uppercase tracking-widest p-4 rounded-xl hover:bg-[#b0f200] transition-colors"
                    >
                        Unlock Ledger
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 text-white custom-scrollbar pb-24 h-full bg-deep-charcoal">
            <div className="max-w-6xl mx-auto space-y-6">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="font-display font-black text-4xl uppercase tracking-tighter mb-1 flex items-center gap-3">
                            <BarChart3 className="text-volt-green w-8 h-8" />
                            Ledger Analytics
                        </h2>
                        <p className="text-cool-gray">Real-time performance metrics and calculated service fees.</p>
                    </div>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="bg-zinc-900 border-2 border-cool-gray/30 text-white font-bold px-4 py-2 rounded-lg font-display uppercase text-sm focus:outline-none focus:border-volt-green"
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="all">All Time</option>
                    </select>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-bold text-cool-gray uppercase text-sm tracking-widest">Gross Volume</h3>
                            <DollarSign className="w-5 h-5 text-volt-green" />
                        </div>
                        <p className="font-display font-black text-4xl">{stats.totalVolume.toLocaleString()} <span className="text-xl text-cool-gray">EGP</span></p>
                        <p className={`text-sm flex items-center gap-1 mt-2 font-bold ${stats.volumeChange >= 0 ? 'text-volt-green' : 'text-electric-red'}`}>
                            <TrendingUp className={`w-3 h-3 ${stats.volumeChange < 0 ? 'transform rotate-180' : ''}`} />
                            {stats.volumeChange > 0 ? '+' : ''}{stats.volumeChange.toFixed(1)}% vs yesterday
                        </p>
                    </div>

                    <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-bold text-cool-gray uppercase text-sm tracking-widest">Total Orders</h3>
                            <Activity className="w-5 h-5 text-electric-red" />
                        </div>
                        <p className="font-display font-black text-4xl">{stats.totalOrders}</p>
                        <p className={`text-sm flex items-center gap-1 mt-2 font-bold ${stats.ordersChange >= 0 ? 'text-volt-green' : 'text-electric-red'}`}>
                            <TrendingUp className={`w-3 h-3 ${stats.ordersChange < 0 ? 'transform rotate-180' : ''}`} />
                            {stats.ordersChange > 0 ? '+' : ''}{stats.ordersChange.toFixed(1)}% vs yesterday
                        </p>
                    </div>

                    <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-volt-green/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <h3 className="font-bold text-volt-green uppercase text-sm tracking-widest">Balance Due</h3>
                        </div>
                        <p className="font-display font-black text-4xl relative z-10">{stats.commissionOwed.toLocaleString()} <span className="text-xl text-cool-gray">EGP</span></p>
                        <button className="mt-4 w-full bg-volt-green/20 text-volt-green font-display font-black uppercase py-2 rounded border border-volt-green/50 hover:bg-volt-green hover:text-deep-charcoal transition-colors relative z-10 text-sm">
                            Clear Balance
                        </button>
                    </div>
                </div>

                {/* Charts & Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Peak Hours (Mocked Chart) */}
                    <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl">
                        <h3 className="font-display font-black text-xl uppercase tracking-widest mb-6">Peak Hours</h3>
                        <div className="h-48 flex items-end gap-2 justify-between">
                            {stats.peakHours.map((height: number, i: number) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        className={`w-full rounded-t-sm ${height === 100 ? 'bg-volt-green' : 'bg-cool-gray/40'}`}
                                    />
                                    <span className="text-[10px] text-cool-gray font-bold">{11 + i}am</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Item Popularity */}
                    <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl">
                        <h3 className="font-display font-black text-xl uppercase tracking-widest mb-6">Item Popularity</h3>
                        <div className="space-y-4">
                            {stats.itemPopularity.length > 0 ? stats.itemPopularity.map((item: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1 font-bold">
                                        <span>{item.name}</span>
                                        <span className="text-cool-gray">{item.qty} units</span>
                                    </div>
                                    <div className="w-full bg-black h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((item.qty / 100) * 100, 100)}%` }} // relative visual scaling
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            )) : (
                                <div className="text-cool-gray text-sm py-4">No items sold yet.</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
