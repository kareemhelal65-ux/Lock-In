import { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function PayoutsTab() {
    const [vendors, setVendors] = useState<any[]>([]);
    const [loadingMap, setLoadingMap] = useState<any>({});

    const fetchVendors = async () => {
        try {
            const res = await fetch('/api/admin/operations/vendors');
            const data = await res.json();
            setVendors(data.scorecards || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchVendors();
        const interval = setInterval(fetchVendors, 15000);
        return () => clearInterval(interval);
    }, []);

    const handleCollect = async (vendorId: string, amount: number) => {
        if (!confirm(`Confirm collection of $${amount.toFixed(2)} from this vendor?`)) return;
        setLoadingMap((prev: any) => ({ ...prev, [vendorId]: true }));
        try {
            await fetch('/api/admin/payouts/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId })
            });
            await fetchVendors();
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMap((prev: any) => ({ ...prev, [vendorId]: false }));
        }
    };

    const totalToCollect = vendors.reduce((acc, v) => acc + (v.commissionOwedBalance || 0), 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm flex items-center justify-between">
                <div>
                    <h3 className="font-display font-black text-2xl uppercase flex items-center gap-2">
                        <DollarSign className="w-6 h-6" /> Pending Collections
                    </h3>
                    <p className="text-sm font-bold text-gray-500 uppercase mt-1">Total commission owed to the platform</p>
                </div>
                <div className="text-4xl font-black italic text-volt-green stroke-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    ${totalToCollect.toFixed(2)}
                </div>
            </div>

            <div className="bg-white border-4 border-black rounded-xl overflow-hidden brutal-shadow-sm">
                <table className="w-full text-left font-bold table-auto">
                    <thead>
                        <tr className="border-b-4 border-black bg-gray-100 uppercase tracking-widest text-xs">
                            <th className="p-4 w-1/3">Vendor Name</th>
                            <th className="p-4 w-1/4 text-right">Owed Amount</th>
                            <th className="p-4 w-1/4 text-center">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(v => {
                            const owed = v.commissionOwedBalance || 0;
                            const isClear = owed <= 0;
                            return (
                                <tr key={v.id} className="border-b-2 border-black/10 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 uppercase text-lg">{v.name}</td>
                                    <td className="p-4 text-right font-black text-xl">${owed.toFixed(2)}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs uppercase rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${isClear ? 'bg-volt-green text-black' : 'bg-yellow-400 text-black'}`}>
                                            {isClear ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {isClear ? 'Clear' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            disabled={isClear || loadingMap[v.id]}
                                            onClick={() => handleCollect(v.id, owed)}
                                            className={`px-4 py-2 text-xs uppercase border-2 border-black rounded-lg brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all ${
                                                isClear || loadingMap[v.id] ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-black text-white hover:bg-gray-800'
                                            }`}
                                        >
                                            {loadingMap[v.id] ? 'Processing...' : 'Collected'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {vendors.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center uppercase tracking-widest text-gray-500">No vendors found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
