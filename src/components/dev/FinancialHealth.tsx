import { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialHealth() {
    const [financial, setFinancial] = useState<any>(null);

    useEffect(() => {
        fetch('/api/admin/analytics/financial')
            .then(res => res.json())
            .then(data => setFinancial(data))
            .catch(console.error);
    }, []);

    const chartData = [
        { name: 'Mon', revenue: 400, ltv: 240 },
        { name: 'Tue', revenue: 300, ltv: 260 },
        { name: 'Wed', revenue: 600, ltv: 310 },
        { name: 'Thu', revenue: 800, ltv: 380 },
        { name: 'Fri', revenue: 1100, ltv: 450 },
        { name: 'Sat', revenue: 900, ltv: 480 },
        { name: 'Sun', revenue: 1400, ltv: 520 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Total TVV (Gross)</div>
                    <div className="text-2xl font-black italic">${financial?.totalRevenue.toFixed(0) || 0}</div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-green-600 mt-2">
                        <ArrowUpRight className="w-3 h-3" /> +12% vs LW
                    </div>
                </div>
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Avg Order Value</div>
                    <div className="text-2xl font-black italic">${financial?.aov.toFixed(1) || 0}</div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-green-600 mt-2">
                        <ArrowUpRight className="w-3 h-3" /> Group Upsell: +$4.20
                    </div>
                </div>
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Net Take Rate</div>
                    <div className="text-2xl font-black italic">${financial?.takeRate.toFixed(1) || 0}</div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-red-600 mt-2">
                        <ArrowDownRight className="w-3 h-3" /> Hype Subsidy: -2%
                    </div>
                </div>
                <div className="bg-black text-volt-green border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-1">CAC Payback</div>
                    <div className="text-2xl font-black italic">1.4 Orders</div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-volt-green mt-2 uppercase">
                        Breakeven High
                    </div>
                </div>
            </div>

            <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8" />
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider">LTV vs CAC Projection</h3>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-black" />
                            <span className="text-[10px] font-black uppercase">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-volt-green" />
                            <span className="text-[10px] font-black uppercase">Retention LTV</span>
                        </div>
                    </div>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorLtv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" fontStyle="bold" tick={{ fill: '#000', fontSize: 10 }} />
                            <YAxis fontStyle="bold" tick={{ fill: '#000', fontSize: 10 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="revenue" stroke="#000" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            <Area type="monotone" dataKey="ltv" stroke="#CCFF00" strokeWidth={4} fillOpacity={1} fill="url(#colorLtv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <h3 className="font-display font-black text-xl uppercase mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" /> Take Rate Logic
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b-2 border-black/5">
                            <span className="text-xs font-bold uppercase">Base Platform Fee</span>
                            <span className="font-black text-lg">10%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b-2 border-black/5">
                            <span className="text-xs font-bold uppercase">Hype Discount Subsidy (Avg)</span>
                            <span className="font-black text-lg text-electric-red">-2.5%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b-2 border-black/5">
                            <span className="text-xs font-bold uppercase">Transaction Handling</span>
                            <span className="font-black text-lg text-electric-red">-1.5%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 bg-volt-green/20 p-2 border-2 border-black">
                            <span className="font-black uppercase">Net Platform Margin</span>
                            <span className="font-black text-xl">6.0%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="font-display font-black text-xl uppercase mb-4 italic">The North Star</h3>
                        <p className="text-[10px] font-bold uppercase text-gray-500 leading-relaxed mb-6">
                            Lock In is a high-volume, low-margin play. Revenue scales with group density, as processing fees are flat per transaction.
                        </p>
                    </div>
                    <div className="bg-black text-white p-4 rounded border-2 border-black">
                        <div className="text-[10px] font-bold uppercase text-volt-green mb-1">Target CAC/LTV Ratio</div>
                        <div className="flex items-center justify-between">
                            <span className="font-black text-3xl">4.2:1</span>
                            <div className="bg-volt-green text-black px-2 py-1 rounded font-black text-[10px]">HEALTHY</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
