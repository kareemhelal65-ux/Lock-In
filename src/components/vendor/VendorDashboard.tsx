import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Flame, Users, ArrowRight, Activity, Image as ImageIcon } from 'lucide-react';

interface VendorDashboardProps {
    vendorId: string;
}

export default function VendorDashboard({ vendorId }: VendorDashboardProps) {
    const [orders, setOrders] = useState<any[]>([]);
    const [mobileView, setMobileView] = useState<'incoming' | 'active'>('incoming');
    const [reviewingOrder, setReviewingOrder] = useState<any | null>(null);

    const fetchDashboard = async () => {
        if (!vendorId) return;
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/dashboard`);
            const data = await res.json();
            if (data.orders) {
                setOrders(data.orders);
            }
        } catch (err) {
            console.error("Failed to load dashboard orders", err);
        }
    };

    useEffect(() => {
        if (!vendorId) return;
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 8000);
        return () => clearInterval(interval);
    }, [vendorId]);

    const incomingOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'AWAITING_PAYMENT' || o.status === 'AWAITING_VERIFICATION' || o.status === 'incoming');
    const activeOrders = orders.filter(o => o.status === 'FIRE' || o.status === 'firing' || o.status === 'READY' || o.status === 'ready');

    const moveOrder = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/order/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                setReviewingOrder(null);
            }
        } catch (err) {
            console.error("Failed to update order status", err);
        }
    };

    const removeOrder = (id: string) => {
        moveOrder(id, 'COMPLETED');
    };

    const getItemModifiers = (modifiers: string) => {
        try { return JSON.parse(modifiers || '[]'); } catch { return []; }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-deep-charcoal">
            {/* Mobile View Toggle */}
            <div className="md:hidden flex border-b-2 border-cool-gray/20 bg-deep-charcoal shrink-0">
                <button
                    onClick={() => setMobileView('incoming')}
                    className={`flex-1 py-3 font-display font-bold uppercase transition-colors text-sm ${mobileView === 'incoming' ? 'bg-volt-green text-deep-charcoal' : 'text-cool-gray hover:text-white'}`}
                >
                    Incoming ({incomingOrders.length})
                </button>
                <div className="w-0.5 bg-cool-gray/20" />
                <button
                    onClick={() => setMobileView('active')}
                    className={`flex-1 py-3 font-display font-bold uppercase transition-colors text-sm ${mobileView === 'active' ? 'bg-volt-green text-deep-charcoal' : 'text-cool-gray hover:text-white'}`}
                >
                    Active ({activeOrders.length})
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* INCOMING COLUMN */}
                <div className={`w-full md:w-1/2 flex-col border-r-2 border-cool-gray/20 ${mobileView === 'incoming' ? 'flex' : 'hidden md:flex'}`}>
                    <div className="p-4 bg-deep-charcoal border-b-2 border-cool-gray/20 sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                            Incoming <span className="text-cool-gray text-lg ml-2">({incomingOrders.length})</span>
                        </h2>
                        <div className="w-3 h-3 rounded-full bg-electric-red animate-pulse" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <AnimatePresence>
                            {incomingOrders.map(order => (
                                <motion.div
                                    key={order.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-5 relative overflow-hidden"
                                >
                                    {/* Status Banner */}
                                    {order.status === 'AWAITING_PAYMENT' && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
                                    )}
                                    {order.status === 'AWAITING_VERIFICATION' && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400" />
                                    )}
                                    {(order.status === 'PENDING' || order.status === 'FIRE') && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-volt-green" />
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-display font-black text-3xl text-white tracking-tighter">
                                                {order.orderNumber || (order.id ? order.id.slice(-6).toUpperCase() : 'ORDER')}
                                            </h3>
                                            <p className="text-cool-gray text-xs uppercase font-bold tracking-widest mt-1 flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                {new Date(order.createdAt).toLocaleTimeString()}
                                                {order.participants?.length > 1 && (
                                                    <span className="text-volt-green flex items-center gap-1">
                                                        • <Users className="w-3 h-3" /> GROUP ({order.participants.length})
                                                    </span>
                                                )}
                                            </p>
                                            <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-black uppercase rounded ${
                                                order.status === 'AWAITING_PAYMENT' ? 'bg-yellow-400/20 text-yellow-400' : 
                                                order.status === 'AWAITING_VERIFICATION' ? 'bg-blue-400/20 text-blue-400' :
                                                'bg-volt-green/20 text-volt-green'}`}>
                                                {order.status === 'AWAITING_PAYMENT' ? 'Awaiting Payment' : 
                                                 order.status === 'AWAITING_VERIFICATION' ? 'Awaiting Verification' :
                                                 'Payment Received'}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-display font-bold text-lg text-white">{order.totalAmount} EGP</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">                                        {order.items?.map((item: any, idx: number) => (
                                            <div key={idx} className="border-l-2 border-cool-gray/30 pl-3">
                                                <p className="font-bold text-white text-lg">
                                                    <span className="text-cool-gray mr-2">{item?.quantity || 1}x</span>
                                                    {item?.name || 'Unknown Item'}
                                                </p>
                                                
                                                {item?.modifiers && getItemModifiers(item.modifiers).length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1 mb-2">
                                                        {getItemModifiers(item.modifiers).map((mod: any, mIdx: number) => (
                                                            <span key={mIdx} className="bg-volt-green/20 text-volt-green text-[9px] font-black uppercase px-1.5 py-0.5 rounded border border-volt-green/30">
                                                                +{mod.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {item.specialNotes && (
                                                    <p className="mt-1 text-xs text-electric-red font-bold italic">
                                                        Note: {item.specialNotes}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Receipt count badge */}
                                    {order.participants?.some((p: any) => p.paymentScreenshotUrl) && (
                                        <div className="flex items-center gap-2 mb-3 text-volt-green text-xs font-bold uppercase">
                                            <ImageIcon className="w-4 h-4" />
                                            {order.participants.filter((p: any) => p.paymentScreenshotUrl).length} Receipt(s) Attached
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <button
                                        onClick={() => setReviewingOrder(order)}
                                        className="w-full bg-volt-green text-deep-charcoal font-display font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b0f200] transition-colors active:scale-95 transform"
                                    >
                                        <Flame className="w-5 h-5" /> Review & Confirm
                                    </button>
                                </motion.div>
                            ))}
                            {incomingOrders.length === 0 && (
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-cool-gray/20 rounded-xl">
                                    <p className="text-cool-gray font-display font-bold uppercase tracking-widest text-sm">Quiet in the kitchen</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ACTIVE COLUMN */}
                <div className={`w-full md:w-1/2 flex-col bg-deep-charcoal/90 ${mobileView === 'active' ? 'flex' : 'hidden md:flex'}`}>
                    <div className="p-4 bg-deep-charcoal border-b-2 border-cool-gray/20 sticky top-0 z-10">
                        <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                            Active <span className="text-cool-gray text-lg ml-2">({activeOrders.length})</span>
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <AnimatePresence>
                            {activeOrders.map(order => (
                                <motion.div
                                    key={order.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`border-2 rounded-xl p-4 transition-colors ${order.status === 'READY' || order.status === 'ready'
                                        ? 'bg-volt-green/10 border-volt-green/50'
                                        : 'bg-zinc-900 border-cool-gray/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-display font-black text-2xl text-white tracking-tighter">
                                                {order.orderNumber || order.id.slice(-6).toUpperCase()}
                                            </h3>
                                            <span className={`px-2 py-1 text-[10px] uppercase font-black rounded ${(order.status === 'READY' || order.status === 'ready') ? 'bg-volt-green text-deep-charcoal' : 'bg-electric-red text-white'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-cool-gray text-xs font-bold">{order.participants?.length > 1 ? 'GROUP' : 'SOLO'}</p>
                                    </div>

                                    {(order.status === 'FIRE' || order.status === 'firing') ? (
                                        <button
                                            onClick={() => moveOrder(order.id, 'READY')}
                                            className="w-full bg-white text-deep-charcoal font-display font-black uppercase py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                        >
                                            <CheckCircle2 className="w-5 h-5" /> Mark Ready
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => removeOrder(order.id)}
                                            className="w-full bg-electric-red text-white font-display font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors group"
                                        >
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Strike (Handoff)
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                            {activeOrders.length === 0 && (
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-cool-gray/20 rounded-xl">
                                    <p className="text-cool-gray font-display font-bold uppercase tracking-widest text-sm">No active orders</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Receipt Review Modal */}
            <AnimatePresence>
                {reviewingOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setReviewingOrder(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-deep-charcoal border-2 border-cool-gray/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-cool-gray/20">
                                <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                                    Review Order {reviewingOrder.orderNumber || reviewingOrder.id.slice(-6).toUpperCase()}
                                </h2>
                                <p className="text-cool-gray mt-1 text-sm font-bold uppercase tracking-widest">
                                    Total: {reviewingOrder.totalAmount} EGP
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Order items */}
                                <div className="bg-zinc-900 rounded-xl p-4 border border-cool-gray/20">
                                    <p className="font-bold text-cool-gray text-xs uppercase tracking-widest mb-3">Items Ordered</p>
                                    {reviewingOrder.items?.map((item: any, i: number) => (
                                        <div key={i} className="border-b border-cool-gray/20 py-2 last:border-0">
                                            <div className="flex justify-between text-white">
                                                <span className="font-bold">{item?.quantity || 1}x {item?.name || 'Unknown Item'}</span>
                                                <span className="font-display">{(item?.price || 0) * (item?.quantity || 1)} EGP</span>
                                            </div>
                                            {item?.modifiers && getItemModifiers(item.modifiers).length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {getItemModifiers(item.modifiers).map((mod: any, j: number) => (
                                                        <span key={j} className="text-[10px] uppercase font-black text-volt-green bg-volt-green/10 px-1.5 rounded">
                                                            +{mod.name || mod}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {item?.specialNotes && (
                                                <p className="text-[10px] text-electric-red font-bold uppercase mt-1">
                                                    Note: {item.specialNotes}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Participant receipts */}
                                {reviewingOrder.participants?.map((participant: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 rounded-xl p-4 border border-cool-gray/20">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <p className="font-bold text-white text-lg">{participant.user?.name || participant.user?.username || 'Customer'}</p>
                                                <p className="text-cool-gray text-xs font-bold uppercase tracking-widest">Share: {participant.shareAmount} EGP</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded text-xs font-black uppercase ${participant.hasPaid ? 'bg-volt-green/20 text-volt-green' : 'bg-yellow-400/20 text-yellow-400'}`}>
                                                {participant.hasPaid ? 'Paid' : 'Awaiting Payment'}
                                            </div>
                                        </div>

                                        {participant.paymentScreenshotUrl ? (
                                            <div className="w-full rounded-lg overflow-hidden border border-cool-gray/30 bg-black">
                                                <img
                                                    src={participant.paymentScreenshotUrl.startsWith('/') ? `${participant.paymentScreenshotUrl}` : participant.paymentScreenshotUrl}
                                                    alt="Payment Receipt"
                                                    className="w-full object-contain max-h-96"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 border-2 border-dashed border-cool-gray/20 rounded-xl">
                                                <Activity className="w-8 h-8 text-cool-gray mx-auto mb-2" />
                                                <p className="text-cool-gray font-bold italic">No receipt uploaded yet.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {(!reviewingOrder.participants || reviewingOrder.participants.length === 0) && (
                                    <div className="text-center py-8">
                                        <p className="text-cool-gray font-bold">No participant data found.</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-cool-gray/20 bg-zinc-900 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => moveOrder(reviewingOrder.id, 'REJECTED')}
                                    className="py-4 font-display font-black uppercase tracking-wider rounded-xl border-2 border-electric-red text-electric-red hover:bg-electric-red hover:text-white transition-colors"
                                >
                                    Reject Order
                                </button>
                                <button
                                    onClick={() => moveOrder(reviewingOrder.id, 'FIRE')}
                                    className="py-4 bg-volt-green text-deep-charcoal font-display font-black uppercase tracking-wider rounded-xl hover:bg-[#b0f200] transition-colors"
                                >
                                    Approve & Fire 🔥
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
