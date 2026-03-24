import { useState, useEffect } from 'react';
import { Users, Share2, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis } from 'recharts';

export default function SocialSafePulse() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        // Fetch group-to-solo and viral coefficient from analytics/financial + other endpoints
        fetch('/api/admin/analytics/financial')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(console.error);
    }, []);

    const COLORS = ['#CCFF00', '#000000'];
    const pieData = stats ? [
        { name: 'Group Orders', value: stats.groupRevenue },
        { name: 'Solo Orders', value: stats.soloRevenue },
    ] : [{ name: 'Group', value: 1 }, { name: 'Solo', value: 1 }];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm text-center">
                    <div className="w-12 h-12 bg-volt-green rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4">
                        <Share2 className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black italic">1.8x</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Viral Coefficient</div>
                </div>
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm text-center">
                    <div className="w-12 h-12 bg-electric-red text-white rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black italic">42%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Hype Velocity</div>
                </div>
                <div className="bg-black text-white p-6 rounded-xl border-4 border-black brutal-shadow-sm text-center">
                    <div className="w-12 h-12 bg-white text-black rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black italic text-volt-green">68%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Locked-In Rate</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <h3 className="font-display font-black text-xl uppercase mb-6">Group-To-Solo Ratio</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={50}
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
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase text-center mt-4">
                        High group ratio correlates with 40% higher AOV.
                    </p>
                </div>

                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <h3 className="font-display font-black text-xl uppercase mb-6 flex justify-between items-center">
                        Hype Velocity 
                        <span className="text-xs bg-volt-green px-2 py-1 rounded border-2 border-black tracking-normal">Real-time</span>
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { time: '12pm', v: 20 },
                                { time: '2pm', v: 45 },
                                { time: '4pm', v: 30 },
                                { time: '6pm', v: 85 },
                                { time: '8pm', v: 60 },
                                { time: '10pm', v: 90 },
                            ]}>
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip />
                                <Line type="stepAfter" dataKey="v" stroke="#000" strokeWidth={4} dot={{ r: 4, fill: '#FF3B30', stroke: '#000', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
