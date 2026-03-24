import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Map, PieChart as PieIcon, LineChart as LineIcon } from 'lucide-react';

export default function StrategicAnalytics() {
    const [heatmap, setHeatmap] = useState<any[]>([]);
    const [financial, setFinancial] = useState<any>(null);

    useEffect(() => {
        fetch('/api/admin/analytics/heatmap')
            .then(res => res.json())
            .then(data => {
                const formatted = data.heatmap.map((count: number, hour: number) => ({
                    hour: `${hour}:00`,
                    orders: count
                }));
                setHeatmap(formatted);
            })
            .catch(console.error);

        fetch('/api/admin/analytics/financial')
            .then(res => res.json())
            .then(data => setFinancial(data))
            .catch(console.error);
    }, []);

    const COLORS = ['#CCFF00', '#FF3B30', '#000000', '#8E8E93'];

    const pieData = financial ? [
        { name: 'Group Orders', value: financial.groupRevenue },
        { name: 'Solo Orders', value: financial.soloRevenue },
    ] : [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Heatmap Section */}
            <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <Map className="w-8 h-8" />
                    <h3 className="font-display font-black text-2xl uppercase tracking-wider">Peak Time Heatmap</h3>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={heatmap}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#000" />
                            <XAxis dataKey="hour" fontStyle="bold" tick={{ fill: '#000', fontSize: 10 }} />
                            <YAxis fontStyle="bold" tick={{ fill: '#000', fontSize: 10 }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#CCFF00', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="orders" fill="#CCFF00" stroke="#000" strokeWidth={2} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Revenue Split */}
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <PieIcon className="w-8 h-8" />
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider">Revenue Split</h3>
                    </div>
                    <div className="flex-1 min-h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="#000"
                                    strokeWidth={2}
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Total</span>
                            <span className="font-black text-xl">${financial?.totalRevenue.toFixed(0) || 0}</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {pieData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-black rounded" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-xs font-bold uppercase">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Pulse (Mocked as we don't have historical cohort data yet) */}
                <div className="bg-black text-white p-6 rounded-xl border-4 border-black brutal-shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <LineIcon className="w-8 h-8 text-volt-green" />
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider text-volt-green">Retention Pulse</h3>
                    </div>
                    <div className="h-[200px] w-full opacity-50">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { name: 'W1', value: 100 },
                                { name: 'W2', value: 85 },
                                { name: 'W3', value: 78 },
                                { name: 'W4', value: 72 },
                                { name: 'W5', value: 75 },
                            ]}>
                                <Line type="monotone" dataKey="value" stroke="#CCFF00" strokeWidth={4} dot={{ r: 6, fill: '#CCFF00', stroke: '#000', strokeWidth: 2 }} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 pt-6 border-t-2 border-volt-green/20">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Daily Active Streak</span>
                            <span className="font-black text-2xl text-volt-green">72.4%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
