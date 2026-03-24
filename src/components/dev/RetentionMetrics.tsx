import { Target, Flag, Zap, TrendingUp } from 'lucide-react';

export default function RetentionMetrics() {
    const cohorts = [
        { week: 'March W1', day1: '92%', day7: '65%', day30: '42%' },
        { week: 'March W2', day1: '88%', day7: '58%', day30: '-' },
        { week: 'March W3', day1: '95%', day7: '-', day30: '-' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Cohort Retention Table */}
            <div className="bg-white border-4 border-black rounded-xl overflow-hidden brutal-shadow-sm">
                <div className="p-4 bg-black text-white flex justify-between items-center">
                    <h3 className="font-display font-black text-xl uppercase tracking-wider">Cohort Retention (N-Day)</h3>
                    <TrendingUp className="w-5 h-5 text-volt-green" />
                </div>
                <table className="w-full text-left font-bold table-auto">
                    <thead>
                        <tr className="border-b-4 border-black bg-gray-100 uppercase text-[10px] tracking-widest">
                            <th className="p-4">Joining Cohort</th>
                            <th className="p-4">Day 1</th>
                            <th className="p-4">Day 7</th>
                            <th className="p-4">Day 30</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cohorts.map((c, i) => (
                            <tr key={i} className="border-b-2 border-black/5 hover:bg-volt-green/5 transition-colors">
                                <td className="p-4 uppercase">{c.week}</td>
                                <td className="p-4"><div className="w-full max-w-[50px] bg-volt-green p-1 border border-black text-center text-xs">{c.day1}</div></td>
                                <td className="p-4"><div className="w-full max-w-[50px] bg-volt-green/60 p-1 border border-black text-center text-xs">{c.day7}</div></td>
                                <td className="p-4"><div className="w-full max-w-[50px] bg-volt-green/30 p-1 border border-black text-center text-xs">{c.day30}</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-volt-green text-black border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-6 h-6" />
                        <h4 className="font-black uppercase text-xl">The "3-Order Streak"</h4>
                    </div>
                    <div className="text-4xl font-black italic mb-2">124 USERS</div>
                    <p className="text-xs font-bold uppercase opacity-70 mb-6">Currently at Order #2. High churn risk zone.</p>
                    <button className="w-full bg-black text-white p-4 font-black uppercase tracking-widest border-2 border-black hover:bg-gray-800 active:translate-y-1 transition-all">
                        Push Hype Boost to Segment
                    </button>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase opacity-50">
                        <Zap className="w-3 h-3" />
                        Conversion to Order #3: +60% LTV
                    </div>
                </div>

                <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Flag className="w-6 h-6 text-electric-red" />
                        <h4 className="font-black uppercase text-xl">Leaderboard Gravity</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-100 p-3 border-2 border-black rounded">
                            <span className="text-[10px] font-black uppercase">Top 100 Frequency</span>
                            <span className="font-black text-lg">4.2/wk</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-100 p-3 border-2 border-black rounded">
                            <span className="text-[10px] font-black uppercase">Average Frequency</span>
                            <span className="font-black text-lg">1.5/wk</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase italic leading-relaxed">
                            Gamification drives 280% higher order frequency for the top decile. 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
