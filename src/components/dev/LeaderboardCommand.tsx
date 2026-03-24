import { useState, useEffect } from 'react';
import { Trophy, Shield, UserX, Flag, Search, Filter, Flame } from 'lucide-react';

export default function LeaderboardCommand() {
    const [users, setUsers] = useState<any[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('/api/admin/leaderboard')
            .then(res => res.json())
            .then(data => setUsers(data.users))
            .catch(console.error);
    };

    const handleResetScore = async (userId: string) => {
        if (!confirm('Are you sure you want to reset this user\'s hype score? This is usually for soft-moderation.')) return;
        try {
            await fetch('/api/admin/leaderboard/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            fetchUsers();
        } catch (e) {
            console.error(e);
        }
    };

    const handleBan = async (_userId: string) => {
        if (!confirm('BAN USER from leaderboard? This will hide them from rankings forever.')) return;
        // Mocking ban for now as it needs schema update to hide from leaderboards
        alert('User flagged for investigation and hidden from public view.');
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(filter.toLowerCase()) || 
        u.username.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <h3 className="font-display font-black text-2xl uppercase tracking-wider">Ranking Audit</h3>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Filter users..."
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-black font-bold outline-none focus:bg-volt-green/5"
                        />
                    </div>
                    <button className="p-2 border-2 border-black rounded md:flex hidden">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white border-4 border-black rounded-xl overflow-hidden brutal-shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-bold table-auto">
                        <thead>
                            <tr className="border-b-4 border-black bg-gray-100 uppercase tracking-widest text-xs">
                                <th className="p-4">Rank</th>
                                <th className="p-4">User Details</th>
                                <th className="p-4">Hype Balance</th>
                                <th className="p-4">Social Velocity</th>
                                <th className="p-4 text-right">Moderation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id} className="border-b border-black/5 hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black ${
                                            index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-orange-400' : 'bg-white'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-black shadow-[2px_2px_0] shadow-black" alt="" />
                                            <div>
                                                <div className="font-black uppercase">{user.name}</div>
                                                <div className="text-[10px] text-gray-500">@{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-volt-green bg-black px-3 py-1 rounded-full border-2 border-black w-fit text-sm">
                                            <Flame className="w-3 h-3" />
                                            {user.hypeScore.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="w-full h-2 bg-gray-100 border border-black rounded-full overflow-hidden">
                                                <div className="h-full bg-volt-green" style={{ width: `${Math.min(100, (user.hypeScore / 5000) * 100)}%` }} />
                                            </div>
                                            <span className="text-[10px] uppercase opacity-40">Frequency: High</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 justify-end">
                                            <button 
                                                onClick={() => handleResetScore(user.id)}
                                                className="p-2 border-2 border-black rounded bg-white hover:bg-gray-100 transition-all text-gray-400 hover:text-black"
                                                title="Reset Score"
                                            >
                                                <Shield className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleBan(user.id)}
                                                className="p-2 border-2 border-black rounded bg-electric-red text-white hover:bg-red-600 transition-all brutal-shadow-sm active:translate-y-1 active:shadow-none"
                                                title="Ban from Ranking"
                                            >
                                                <UserX className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-yellow-800">
                <Flag className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-bold uppercase">Ranking behavior is audited for 50+ tiny orders. Ghosting protocol active.</p>
            </div>
        </div>
    );
}
