import { useState, useEffect } from 'react';
import { Power, RotateCcw, ShieldAlert, Cpu } from 'lucide-react';

export default function GodModePanel() {
    const [vendors, setVendors] = useState<any[]>([]);
    const [networkDensity, setNetworkDensity] = useState<any>(null);

    useEffect(() => {
        // Fetch vendors for freeze toggle
        fetch('/api/admin/operations/vendors')
            .then(res => res.json())
            .then(data => setVendors(data.scorecards))
            .catch(console.error);

        // Fetch network density
        fetch('/api/admin/god-mode/network-effect')
            .then(res => res.json())
            .then(data => setNetworkDensity(data.density))
            .catch(console.error);
    }, []);

    const handleFreeze = async (vendorId: string, willFreeze: boolean) => {
        if (!confirm(`Are you sure you want to ${willFreeze ? 'FREEZE' : 'UNFREEZE'} this vendor?`)) return;
        try {
            await fetch('/api/admin/god-mode/freeze-vendor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId, freeze: willFreeze })
            });
            setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: willFreeze ? 'FROZEN' : 'LIVE' } : v));
        } catch (e) {
            console.error(e);
        }
    };

    const handleMassRefund = async (vendorId: string) => {
        if (!confirm('WARNING: This will refund ALL active orders for this vendor. Proceed?')) return;
        try {
            const res = await fetch('/api/admin/god-mode/mass-refund', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId })
            });
            const data = await res.json();
            alert(`Refunded ${data.count} orders successfully.`);
        } catch (e) {
            console.error(e);
        }
    };

    const handleForceRelease = async () => {
        const msg = prompt('Enter a global broadcast message for all apps:');
        if (!msg) return;
        try {
            await fetch('/api/admin/god-mode/force-release', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ globalMessage: msg })
            });
            alert('Broadcast Sent!');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* The Nuclear Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-electric-red text-white p-6 border-4 border-black brutal-shadow-sm rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldAlert className="w-8 h-8" strokeWidth={3} />
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider">Mass Override</h3>
                    </div>
                    <p className="font-bold opacity-90 mb-6 uppercase text-sm">Force global app states</p>
                    <button 
                        onClick={handleForceRelease}
                        className="w-full bg-white text-black font-black uppercase tracking-widest p-4 border-2 border-black rounded-lg brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all"
                    >
                        Force-Release Global Safe
                    </button>
                    <p className="text-xs font-bold mt-4 opacity-70 uppercase tracking-widest text-center">Overrides all active lock timers to 0</p>
                </div>

                <div className="bg-volt-green text-black p-6 border-4 border-black brutal-shadow-sm rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Cpu className="w-8 h-8" strokeWidth={3} />
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider">Network Effect</h3>
                    </div>
                    <p className="font-bold opacity-70 mb-6 uppercase text-sm">Live Social Density</p>
                    <div className="space-y-3">
                        {networkDensity && Object.keys(networkDensity).length > 0 ? (
                            Object.entries(networkDensity).map(([vendorName, count]: any) => (
                                <div key={vendorName} className="flex items-center justify-between bg-white border-2 border-black p-3 rounded-lg">
                                    <span className="font-bold uppercase truncate max-w-[150px]">{vendorName}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-electric-red animate-pulse" />
                                        <span className="font-black">{count} Users</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center font-bold opacity-50 uppercase py-4">No active clusters</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Vendor Controls */}
            <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Power className="w-6 h-6" /> Vendor Kill Switch
                </h3>
                <div className="bg-white border-4 border-black rounded-xl overflow-hidden brutal-shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-bold table-auto">
                            <thead>
                                <tr className="border-b-4 border-black bg-gray-100 uppercase tracking-widest text-xs">
                                    <th className="p-4 w-1/3">Vendor Name</th>
                                    <th className="p-4 w-1/4">Status</th>
                                    <th className="p-4 text-right">Nuclear Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map(v => (
                                    <tr key={v.id} className="border-b-2 border-black/10 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 uppercase">{v.name}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs uppercase rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${v.status === 'LIVE' ? 'bg-volt-green text-black' : 'bg-electric-red text-white'}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2 justify-end">
                                            <button 
                                                onClick={() => handleFreeze(v.id, v.status === 'LIVE')}
                                                className={`px-4 py-2 text-xs uppercase border-2 border-black rounded-lg brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all ${v.status === 'LIVE' ? 'bg-gray-800 text-white hover:bg-black' : 'bg-white hover:bg-gray-100'}`}
                                            >
                                                {v.status === 'LIVE' ? 'Freeze Queue' : 'Unfreeze'}
                                            </button>
                                            <button 
                                                onClick={() => handleMassRefund(v.id)}
                                                className="px-4 py-2 text-xs uppercase border-2 border-black rounded-lg bg-electric-red text-white hover:bg-red-600 brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all flex items-center gap-1"
                                            >
                                                <RotateCcw className="w-4 h-4" /> Mass Refund
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {vendors.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center uppercase tracking-widest text-gray-500">No vendors found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
