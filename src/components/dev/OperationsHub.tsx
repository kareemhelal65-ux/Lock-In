import { useState, useEffect } from 'react';
import { AlertCircle, ShoppingBag, ExternalLink } from 'lucide-react';

export default function OperationsHub() {
    const [orders, setOrders] = useState<any[]>([]);
    const [vendors, setVendors] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, vendorsRes] = await Promise.all([
                    fetch('/api/admin/operations/live-orders'),
                    fetch('/api/admin/operations/vendors')
                ]);
                const ordersData = await ordersRes.json();
                const vendorsData = await vendorsRes.json();
                setOrders(ordersData.orders || []);
                setVendors(vendorsData.scorecards || []);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (createdAt: string) => {
        const diff = (Date.now() - new Date(createdAt).getTime()) / 60000;
        if (diff > 20) return 'bg-electric-red';
        if (diff > 10) return 'bg-yellow-400';
        return 'bg-volt-green';
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Live Order Stream */}
                <div className="xl:col-span-2 space-y-4">
                    <h3 className="font-display font-black text-2xl uppercase flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6" /> Live Order Stream
                    </h3>
                    <div className="bg-white border-4 border-black rounded-xl overflow-hidden brutal-shadow-sm h-[600px] flex flex-col">
                        <div className="p-4 bg-gray-100 border-b-4 border-black font-bold uppercase text-xs tracking-widest flex justify-between items-center">
                            <span>Real-time fulfillment monitor</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-volt-green animate-ping" />
                                <span>Live</span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {orders.map(order => (
                                <div key={order.id} className="border-4 border-black p-4 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-4 h-12 rounded-full ${getStatusColor(order.createdAt)} border-2 border-black`} />
                                        <div>
                                            <div className="font-black text-lg uppercase">#{order.orderNumber} • {order.vendor.name}</div>
                                            <div className="text-sm font-bold opacity-60 uppercase">
                                                By {order.host.name} • {order.items.length} Items • ${order.totalAmount.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="font-black text-sm uppercase px-2 py-1 bg-black text-white rounded">
                                            {order.status}
                                        </span>
                                        <button 
                                            onClick={() => alert(`Opening internal support system to handle Order #${order.orderNumber}...`)}
                                            className="flex items-center gap-1 text-[10px] font-black uppercase text-electric-red hover:underline"
                                        >
                                            <ExternalLink className="w-3 h-3" /> Support Ticket
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center opacity-30">
                                    <ShoppingBag className="w-16 h-16 mb-4" />
                                    <span className="font-black uppercase tracking-widest">No active orders</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vendor Performance */}
                <div className="space-y-4">
                    <h3 className="font-display font-black text-2xl uppercase flex items-center gap-2">
                        <AlertCircle className="w-6 h-6" /> Performance
                    </h3>
                    <div className="space-y-4">
                        {vendors.map(v => (
                            <div key={v.id} className="bg-white border-4 border-black p-4 rounded-xl brutal-shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black uppercase text-xl">{v.name}</h4>
                                    <div className="flex items-center gap-1 bg-black text-volt-green px-2 py-1 rounded font-black text-xs">
                                        ★ {v.rating.toFixed(1)}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="bg-gray-100 p-2 rounded border-2 border-black">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Orders (24h)</div>
                                        <div className="font-black text-lg">{v.ordersToday}</div>
                                    </div>
                                    <div className="bg-gray-100 p-2 rounded border-2 border-black">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Status</div>
                                        <div className={`font-black text-sm uppercase ${v.status === 'LIVE' ? 'text-green-600' : 'text-electric-red'}`}>{v.status}</div>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button 
                                        onClick={() => alert(`Routing to ${v.name}'s complete data history ledger...`)}
                                        className="flex-1 py-2 bg-black text-white border-2 border-black rounded-lg font-black uppercase text-[10px] hover:bg-gray-800 transition-all"
                                    >
                                        View History
                                    </button>
                                    <button 
                                        onClick={() => window.location.href = `mailto:vendor-${v.id}@sawa-app.com`}
                                        className="flex-1 py-2 bg-white text-black border-2 border-black rounded-lg font-black uppercase text-[10px] hover:bg-gray-100 transition-all"
                                    >
                                        Contact
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
