import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Activity, LockIcon } from 'lucide-react';
import { translations } from './translations';

interface VendorLedgerProps {
    correctPin?: string;
    vendorId: string;
    lang: 'en' | 'ar';
}

export default function VendorLedger({ correctPin = '1234', vendorId, lang }: VendorLedgerProps) {
    const t = translations[lang];
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pin, setPin] = useState('');
    const [period, setPeriod] = useState('today');
    const [stats, setStats] = useState<any>({
        totalVolume: 0,
        commissionOwed: 0,
        subsidiesOwed: 0,
        totalSubsidies: 0,
        totalOrders: 0,
        peakHours: new Array(16).fill(0),
        itemPopularity: [],
        volumeChange: 0,
        ordersChange: 0
    });
    const [activeTab, setActiveTab] = useState<'overview' | 'clerk'>('overview');

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

    const handleClearBalance = async () => {
        if (!confirm(lang === 'ar' ? 'هل أنت متأكد من تسوية الرصيد؟' : 'Are you sure you want to clear the balance?')) return;
        try {
            await fetch('/api/admin/payouts/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId })
            });
            // Re-fetch stats
            const res = await fetch(`/api/vendorData/${vendorId}/ledger?period=${period}`);
            const data = await res.json();
            if (data.stats) setStats(data.stats);
        } catch (err) {
            console.error("Failed to clear balance", err);
        }
    };

    const handleClearSubsidies = async () => {
        if (!confirm(lang === 'ar' ? 'هل أنت متأكد من تسوية المستردات؟' : 'Are you sure you want to clear the subsidies balance?')) return;
        try {
            await fetch(`/api/vendorData/${vendorId}/subsidies/collect`, {
                method: 'POST'
            });
            // Re-fetch stats
            const res = await fetch(`/api/vendorData/${vendorId}/ledger?period=${period}`);
            const data = await res.json();
            if (data.stats) setStats(data.stats);
        } catch (err) {
            console.error("Failed to clear subsidies", err);
        }
    };

    const handleUnlock = () => {
        if (pin === correctPin) {
            setIsUnlocked(true);
        }
    };

    if (!isUnlocked) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-deep-charcoal relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="bg-zinc-900 border-2 border-cool-gray/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
                    <LockIcon className="w-12 h-12 text-cool-gray mx-auto mb-4" />
                    <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-white mb-2">{t.ledgerHub}</h2>
                    <p className="text-cool-gray text-sm mb-6">{t.ledgerAuthSub}</p>
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
                        {t.unlockLedger}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 text-white custom-scrollbar pb-24 h-full bg-deep-charcoal" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="max-w-6xl mx-auto space-y-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter mb-1 flex items-center gap-3">
                            <BarChart3 className="text-volt-green w-6 h-6 md:w-8 md:h-8" />
                            {activeTab === 'overview' ? t.ledgerAnalytics : t.theClerk}
                        </h2>
                        <p className="text-xs md:text-sm text-cool-gray">{activeTab === 'overview' ? t.ledgerSub : t.settlementHub}</p>
                    </div>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="bg-zinc-900 border-2 border-cool-gray/30 text-white font-bold px-4 py-2 rounded-lg font-display uppercase text-sm focus:outline-none focus:border-volt-green shadow-brutal-sm"
                        title="Select analytics period"
                    >
                        <option value="today">{t.today}</option>
                        <option value="week">{t.week}</option>
                        <option value="month">{t.month}</option>
                        <option value="all">{t.allTime}</option>
                    </select>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-1 md:gap-2 mb-8 bg-zinc-900/50 p-1 md:p-1.5 rounded-xl border-2 border-cool-gray/20 w-full md:w-fit overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-display font-black uppercase tracking-widest text-[10px] md:text-sm transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-volt-green text-deep-charcoal shadow-brutal-sm' : 'text-cool-gray hover:text-white'}`}
                    >
                        {t.overview}
                    </button>
                    <button
                        onClick={() => setActiveTab('clerk')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-display font-black uppercase tracking-widest text-[10px] md:text-sm transition-all whitespace-nowrap ${activeTab === 'clerk' ? 'bg-volt-green text-deep-charcoal shadow-brutal-sm' : 'text-cool-gray hover:text-white'}`}
                    >
                        {t.theClerk}
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <>
                        {/* Top Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl relative overflow-hidden group hover:border-volt-green/50 transition-colors">
                                <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-volt-green/5 rounded-full blur-2xl group-hover:bg-volt-green/10 transition-colors" />
                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <h3 className="font-bold text-cool-gray uppercase text-[10px] md:text-sm tracking-widest">{t.grossVolume}</h3>
                                    <DollarSign className="w-5 h-5 text-volt-green" />
                                </div>
                                <p className="font-display font-black text-3xl md:text-5xl relative z-10 tracking-tighter">{stats.totalVolume.toLocaleString()} <span className="text-lg md:text-xl text-cool-gray">EGP</span></p>
                                <p className={`text-sm flex items-center gap-1 mt-3 font-bold relative z-10 ${stats.volumeChange >= 0 ? 'text-volt-green' : 'text-electric-red'}`}>
                                    <TrendingUp className={`w-3 h-3 ${stats.volumeChange < 0 ? 'transform rotate-180' : ''}`} />
                                    {stats.volumeChange > 0 ? '+' : ''}{stats.volumeChange.toFixed(1)}% {t.vsYesterday}
                                </p>
                            </div>

                            <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 rounded-2xl relative overflow-hidden group hover:border-electric-red/50 transition-colors">
                                <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-electric-red/5 rounded-full blur-2xl group-hover:bg-electric-red/10 transition-colors" />
                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <h3 className="font-bold text-cool-gray uppercase text-[10px] md:text-sm tracking-widest">{t.totalOrdersStat}</h3>
                                    <Activity className="w-5 h-5 text-electric-red" />
                                </div>
                                <p className="font-display font-black text-4xl md:text-5xl relative z-10 tracking-tighter">{stats.totalOrders}</p>
                                <p className={`text-sm flex items-center gap-1 mt-3 font-bold relative z-10 ${stats.ordersChange >= 0 ? 'text-volt-green' : 'text-electric-red'}`}>
                                    <TrendingUp className={`w-3 h-3 ${stats.ordersChange < 0 ? 'transform rotate-180' : ''}`} />
                                    {stats.ordersChange > 0 ? '+' : ''}{stats.ordersChange.toFixed(1)}% {t.vsYesterday}
                                </p>
                            </div>
                        </div>

                        {/* Charts & Breakdown */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Peak Hours (Mocked Chart) */}
                            <div className="bg-zinc-900 border-2 border-cool-gray/30 p-4 md:p-8 rounded-2xl shadow-brutal-sm overflow-x-auto no-scrollbar">
                                <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-volt-green" />
                                    {t.peakHours}
                                </h3>
                                <div className="h-48 flex items-end gap-2 justify-between" dir="ltr">
                                    {stats.peakHours.map((height: number, i: number) => (
                                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                className={`w-full rounded-t-sm transition-colors ${height >= 80 ? 'bg-volt-green shadow-[0_0_15px_rgba(182,255,0,0.3)]' : height >= 40 ? 'bg-cool-gray/60' : 'bg-cool-gray/20'}`}
                                            />
                                            <span className="text-[9px] text-cool-gray font-black uppercase tracking-tighter">
                                                {8 + i < 12 ? `${8 + i}a` : 8 + i === 12 ? '12p' : `${8 + i - 12}p`}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Item Popularity */}
                            <div className="bg-zinc-900 border-2 border-cool-gray/30 p-4 md:p-8 rounded-2xl shadow-brutal-sm">
                                <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-volt-green" />
                                    {t.itemPopularity}
                                </h3>
                                <div className="space-y-6">
                                    {stats.itemPopularity.length > 0 ? stats.itemPopularity.map((item: any, i: number) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs mb-2 font-black uppercase tracking-widest">
                                                <span>{item.name}</span>
                                                <span className="text-cool-gray">{item.qty} {t.units}</span>
                                            </div>
                                            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden border border-cool-gray/10 p-[1px]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((item.qty / 100) * 100, 100)}%` }} // relative visual scaling
                                                    className={`h-full rounded-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                                                />
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-cool-gray text-center font-bold italic py-8 border-2 border-dashed border-cool-gray/20 rounded-xl">
                                            {t.noItemsSold}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Balance Due (to SAWA) */}
                        <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-brutal-sm">
                            <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-volt-green/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div>
                                    <h3 className="font-black text-volt-green uppercase text-sm tracking-[0.2em] mb-1">{t.balanceDue}</h3>
                                    <p className="text-[10px] text-cool-gray font-bold uppercase tracking-widest">Platform Commission Owed</p>
                                </div>
                                <Activity className="w-6 h-6 text-volt-green" />
                            </div>
                            <p className="font-display font-black text-4xl md:text-6xl relative z-10 tracking-tighter mb-8">{stats.commissionOwed.toLocaleString()} <span className="text-lg md:text-2xl text-cool-gray">EGP</span></p>
                            
                            <button 
                                onClick={handleClearBalance}
                                className="w-full bg-volt-green/10 text-volt-green font-display font-black uppercase tracking-[0.15em] py-4 rounded-xl border-2 border-volt-green/30 hover:bg-volt-green hover:text-deep-charcoal transition-all relative z-10 text-sm shadow-brutal-sm"
                            >
                                {t.clearBalance}
                            </button>
                        </div>

                        {/* Balance Owed (by SAWA) */}
                        <div className="bg-zinc-900 border-2 border-cool-gray/30 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-brutal-sm border-dashed">
                             <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-electric-red/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div>
                                    <h3 className="font-black text-white uppercase text-sm tracking-[0.2em] mb-1">{t.balanceOwed}</h3>
                                    <p className="text-[10px] text-cool-gray font-bold uppercase tracking-widest">Money SAWA Pays Vendor</p>
                                </div>
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-display font-black text-4xl md:text-6xl relative z-10 tracking-tighter mb-2">{stats.subsidiesOwed.toLocaleString()} <span className="text-lg md:text-2xl text-cool-gray">EGP</span></p>
                            <p className="text-cool-gray font-bold text-xs uppercase tracking-widest relative z-10">
                                Total from SAWA_DISCOUNT & FEAST
                            </p>

                            <button 
                                onClick={handleClearSubsidies}
                                className="mt-6 w-full bg-white/10 text-white font-display font-black uppercase tracking-[0.15em] py-3 rounded-xl border-2 border-white/30 hover:bg-white hover:text-black transition-all relative z-10 text-xs shadow-brutal-sm"
                            >
                                {t.clearBalance}
                            </button>

                            <div className="mt-8 pt-6 border-t-2 border-cool-gray/10 relative z-10">
                                <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-cool-gray/20">
                                    <span className="font-display font-black uppercase tracking-widest text-xs text-cool-gray">Net Settlement</span>
                                    <span className={`font-display font-black text-2xl ${stats.subsidiesOwed - stats.commissionOwed >= 0 ? 'text-volt-green' : 'text-electric-red'}`}>
                                        {(stats.subsidiesOwed - stats.commissionOwed).toLocaleString()} EGP
                                    </span>
                                </div>
                                <p className="text-[10px] text-center text-cool-gray font-bold uppercase tracking-tighter mt-3 italic">
                                    * Payouts are manually reconciled by SAWA Admin
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
