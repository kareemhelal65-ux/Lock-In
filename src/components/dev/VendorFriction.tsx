import { useState, useEffect } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export default function VendorFriction() {
    const [vendors, setVendors] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/admin/operations/vendors')
            .then(res => res.json())
            .then(data => setVendors(data.scorecards))
            .catch(console.error);
    }, []);

    const metrics = [
        { label: 'Avg Prep Offset', value: '+4.2 min', status: 'WARN' },
        { label: 'Order Accuracy', value: '98.5%', status: 'GOOD' },
        { label: 'Busy Overload', value: '12/day', status: 'CRITICAL' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map(m => (
                    <div key={m.label} className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-sm">
                        <div className="text-[10px] font-black uppercase text-gray-400 mb-1">{m.label}</div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-black italic">{m.value}</span>
                            <div className={`w-3 h-3 rounded-full border-2 border-black ${
                                m.status === 'GOOD' ? 'bg-volt-green' : m.status === 'WARN' ? 'bg-yellow-400' : 'bg-electric-red'
                            }`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border-4 border-black rounded-xl overflow-hidden brutal-shadow-sm">
                <div className="p-4 bg-gray-100 border-b-4 border-black flex justify-between items-center font-black uppercase tracking-wider text-sm">
                    <span>Performance Friction Flags</span>
                    <AlertTriangle className="w-5 h-5 text-electric-red" />
                </div>
                <div className="divide-y-2 divide-black/10">
                    {vendors.map(v => (
                        <div key={v.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-display font-black text-xl rounded border-2 border-black">
                                    {v.name[0]}
                                </div>
                                <div>
                                    <div className="font-black uppercase text-lg">{v.name}</div>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded border border-black font-bold">Accuracy: 99%</span>
                                        <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded border border-black font-bold">Latency: High</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="text-center px-4 border-r-2 border-black last:border-0">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Prep Time</div>
                                    <div className="font-black text-electric-red">14m (Avg)</div>
                                </div>
                                <div className="text-center px-4 border-r-2 border-black last:border-0">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Off-Line Freq</div>
                                    <div className="font-black">2x / Hr</div>
                                </div>
                                <button className="ml-4 bg-black text-white px-4 py-2 font-black uppercase text-[10px] border-2 border-black rounded hover:bg-electric-red transition-all">
                                    Performance Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-deep-charcoal text-white rounded-xl border-4 border-black brutal-shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-volt-green text-black rounded-full flex items-center justify-center shrink-0 border-2 border-black">
                    <Info className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-black uppercase italic mb-1 text-volt-green">Product Soul Alert</h4>
                    <p className="text-xs font-bold uppercase text-gray-400 leading-relaxed">
                        Order accuracy is the #1 churn driver. Vendors with below 95% accuracy are automatically flagged for removal from the "Explore" tab spotlight.
                    </p>
                </div>
            </div>
        </div>
    );
}
