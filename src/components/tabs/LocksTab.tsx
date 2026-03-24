import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle2, XCircle, Flame, Loader2, RefreshCw, Lock, Star, CreditCard, Trash2, Users, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import RatingModal from '@/components/modals/RatingModal';
import PaymentDropzone from '@/components/checkout/PaymentDropzone';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    AWAITING_PAYMENT: { label: 'Awaiting Payment', color: 'text-yellow-600', bg: 'bg-yellow-100 border-yellow-300', icon: Clock },
    AWAITING_VERIFICATION: { label: 'Awaiting payment verification by vendor', color: 'text-blue-600', bg: 'bg-blue-100 border-blue-300', icon: Clock },
    PENDING: { label: 'Payment Verified', color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-300', icon: CheckCircle2 },
    FIRE: { label: '🔥 Being Prepared', color: 'text-orange-600', bg: 'bg-orange-100 border-orange-300', icon: Flame },
    READY: { label: '✅ Ready for Pickup', color: 'text-green-700', bg: 'bg-green-100 border-green-300', icon: CheckCircle2 },
    COMPLETED: { label: 'Completed', color: 'text-gray-500', bg: 'bg-gray-100 border-gray-300', icon: CheckCircle2 },
    REJECTED: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-100 border-red-300', icon: XCircle },
};

interface LocksTabProps {
    onOpenSafe?: (safeId: string) => void;
}

export default function LocksTab({ onOpenSafe }: LocksTabProps) {
    const { currentUser } = useApp();
    const [orders, setOrders] = useState<any[]>([]);
    const [activeSafes, setActiveSafes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ratingTarget, setRatingTarget] = useState<{ vendorId: string; vendorName: string } | null>(null);
    const [payingOrder, setPayingOrder] = useState<any | null>(null);
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
    const [leavingSafeId, setLeavingSafeId] = useState<string | null>(null);

    const fetchOrders = async () => {
        if (!currentUser?.id) return;
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/consumer/${currentUser.id}/orders`);
            if (!res.ok) throw new Error('Failed to load orders');
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (err: any) {
            setError(err.message || 'Could not load your orders');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchActiveSafes = async () => {
        if (!currentUser?.id) return;
        try {
            const res = await fetch(`/api/consumer/safes/user/${currentUser.id}`);
            if (res.ok) {
            const data = await res.json();
            const activeOnly = (data.safes || []).filter((s: any) => s.status === 'ACTIVE' || s.status === 'CHECKOUT_READY');
            setActiveSafes(activeOnly);
            }
        } catch (err) {
            console.error('Error fetching active safes', err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchActiveSafes();
        const interval = setInterval(() => {
            fetchOrders();
            fetchActiveSafes();
        }, 10000);
        return () => clearInterval(interval);
    }, [currentUser?.id]);

    const handleCancelOrder = async (orderId: string) => {
        if (!currentUser?.id) return;
        if (!confirm('Are you sure you want to cancel this order?')) return;
        setCancellingOrderId(orderId);
        try {
            const res = await fetch(`/api/consumer/order/${orderId}/cancel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id })
            });
            if (res.ok) {
                fetchOrders();
            } else {
                const data = await res.json();
                alert(data.error || 'Could not cancel order');
            }
        } catch {
            alert('Could not cancel order');
        } finally {
            setCancellingOrderId(null);
        }
    };

    const handleLeaveSafe = async (safeId: string) => {
        if (!currentUser?.id) return;
        if (!confirm('Are you sure you want to leave this safe?')) return;
        setLeavingSafeId(safeId);
        try {
            const res = await fetch(`/api/consumer/safes/${safeId}/abandon`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id })
            });
            if (res.ok) {
                fetchActiveSafes();
            }
        } catch {
            alert('Could not leave safe');
        } finally {
            setLeavingSafeId(null);
        }
    };

    const handlePaymentSuccess = () => {
        setPayingOrder(null);
        fetchOrders();
    };

    const activeOrders = orders.filter(o => !['COMPLETED', 'REJECTED'].includes(o.status));
    const pastOrders = orders.filter(o => ['COMPLETED', 'REJECTED'].includes(o.status));

    return (
        <>
            <div className="min-h-screen bg-sneaker-white pb-24">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b-4 border-black z-10 px-4 pt-safe">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h1 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-2">
                                <Lock className="w-7 h-7" /> Locks
                            </h1>
                            <p className="text-cool-gray text-sm font-bold">Your safes, orders & live tracking</p>
                        </div>
                        <button
                            onClick={() => { fetchOrders(); fetchActiveSafes(); }}
                            disabled={isLoading}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="px-4 py-4 space-y-6">
                    {isLoading && orders.length === 0 && activeSafes.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-cool-gray mb-4" />
                            <p className="text-cool-gray font-bold">Loading your orders...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-electric-red/10 border-2 border-electric-red p-4 rounded-xl">
                            <p className="text-electric-red font-bold">{error}</p>
                            <button onClick={fetchOrders} className="text-electric-red font-bold underline text-sm mt-2">Try Again</button>
                        </div>
                    )}

                    {/* Active Safes Section */}
                    {activeSafes.length > 0 && (
                        <div>
                            <h2 className="font-display font-black text-xl uppercase mb-3 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-volt-green animate-pulse inline-block" />
                                Active Safes ({activeSafes.length})
                            </h2>
                            <div className="space-y-4">
                                {activeSafes.map((safe: any) => (
                                    <motion.div
                                        key={safe.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white border-4 border-volt-green rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(204,255,0,0.5)]"
                                    >
                                        <div className="px-4 py-2 border-b-2 border-black/10 bg-volt-green/20 flex items-center gap-2">
                                            <Users className="w-4 h-4 text-deep-charcoal" />
                                            <span className="font-display font-black text-sm uppercase text-deep-charcoal">
                                                Safe Active — {safe.participants?.length || 0} people
                                            </span>
                                        </div>

                                        <div className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-display font-black text-xl">
                                                        {safe.restaurantName || 'Restaurant'}
                                                    </h3>
                                                    <p className="text-cool-gray text-sm font-bold">
                                                        Hosted by {safe.hostName || 'Someone'}{safe.hostId === currentUser?.id ? ' (You)' : ''}
                                                    </p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {safe.participants?.slice(0, 3).map((p: any) => (
                                                        <img key={p.userId} src={p.avatar} className="w-8 h-8 rounded-full border-2 border-black" />
                                                    ))}
                                                    {(safe.participants?.length || 0) > 3 && (
                                                        <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center text-xs font-bold">
                                                            +{safe.participants.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {onOpenSafe && (
                                                    <button
                                                        onClick={() => onOpenSafe(safe.id)}
                                                        className="flex-1 bg-volt-green border-2 border-black font-display font-black uppercase text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                                                    >
                                                        Open Safe <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleLeaveSafe(safe.id)}
                                                    disabled={leavingSafeId === safe.id}
                                                    className="bg-white border-2 border-electric-red text-electric-red font-display font-black uppercase text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,0,0,0.4)] active:shadow-none transition-all"
                                                >
                                                    {leavingSafeId === safe.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                                                    Leave
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isLoading && !error && orders.length === 0 && activeSafes.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-gray-100 border-4 border-black rounded-full flex items-center justify-center mb-6">
                                <Package className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="font-display font-black text-2xl uppercase mb-2">No Orders Yet</h3>
                            <p className="text-cool-gray font-bold">Your locks will appear here once you order.</p>
                        </div>
                    )}

                    {/* Active Orders */}
                    {activeOrders.length > 0 && (
                        <div>
                            <h2 className="font-display font-black text-xl uppercase mb-3 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-electric-red animate-pulse inline-block" />
                                Live Orders ({activeOrders.length})
                            </h2>
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {activeOrders.map(order => {
                                        const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG['PENDING'];
                                        const StatusIcon = statusInfo.icon;
                                        const isAwaitingPayment = order.status === 'AWAITING_PAYMENT';
                                        return (
                                            <motion.div
                                                key={order.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            >
                                                <div className={`px-4 py-2 border-b-2 border-black flex items-center gap-2 ${statusInfo.bg}`}>
                                                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                                                    <span className={`font-display font-black text-sm uppercase ${statusInfo.color}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </div>

                                                <div className="p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="font-display font-black text-2xl">
                                                                {order.orderNumber || `#${order.id.slice(-6).toUpperCase()}`}
                                                            </h3>
                                                            <p className="text-cool-gray text-sm font-bold">
                                                                {order.vendor?.name || 'Vendor'}
                                                            </p>
                                                            <p className="text-cool-gray text-xs mt-1">
                                                                {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="font-display font-black text-xl">{order.totalAmount} EGP</span>
                                                            <p className="text-xs text-cool-gray font-bold mt-1">
                                                                {order.participants?.[0]?.hasPaid ? '✓ Payment Submitted' : '⏳ Payment Pending'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1 border-t-2 border-black/10 pt-3">
                                                        {order.items?.slice(0, 3).map((item: any, i: number) => (
                                                            <div key={i} className="flex justify-between text-sm">
                                                                <span className="font-bold">{item.quantity}x {item.name}</span>
                                                                <span className="text-cool-gray">{(item.price * item.quantity).toFixed(0)} EGP</span>
                                                            </div>
                                                        ))}
                                                        {(order.items?.length || 0) > 3 && (
                                                            <p className="text-xs text-cool-gray font-bold">+{order.items.length - 3} more items</p>
                                                        )}
                                                    </div>

                                                    {isAwaitingPayment && (
                                                        <div className="mt-4 pt-3 border-t-2 border-black/10 flex gap-2">
                                                            <button
                                                                onClick={() => setPayingOrder(order)}
                                                                className="flex-1 bg-volt-green border-2 border-black font-display font-black uppercase text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                                                            >
                                                                <CreditCard className="w-4 h-4" />
                                                                Complete Payment
                                                            </button>
                                                            <button
                                                                onClick={() => handleCancelOrder(order.id)}
                                                                disabled={cancellingOrderId === order.id}
                                                                className="bg-white border-2 border-electric-red text-electric-red font-display font-black uppercase text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,0,0,0.4)] active:shadow-none transition-all"
                                                            >
                                                                {cancellingOrderId === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    )}

                                                    <div className="mt-4 pt-3 border-t-2 border-black/10">
                                                        <div className="flex items-center justify-between">
                                                            {['AWAITING_PAYMENT', 'PENDING', 'FIRE', 'READY', 'COMPLETED'].map((step, i) => {
                                                                const steps = ['AWAITING_PAYMENT', 'PENDING', 'FIRE', 'READY', 'COMPLETED'];
                                                                const currentIdx = steps.indexOf(order.status);
                                                                const stepIdx = steps.indexOf(step);
                                                                const isPast = stepIdx < currentIdx;
                                                                const isCurrent = stepIdx === currentIdx;
                                                                return (
                                                                    <div key={step} className="flex items-center flex-1">
                                                                        <div className={`w-4 h-4 rounded-full border-2 border-black flex-shrink-0 transition-all ${isCurrent ? 'bg-electric-red scale-125' : isPast ? 'bg-volt-green' : 'bg-gray-200'}`} />
                                                                        {i < 4 && <div className={`h-1 flex-1 ${isPast ? 'bg-volt-green' : 'bg-gray-200'}`} />}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="flex justify-between mt-1">
                                                            {['Pay', 'Got It', '🔥', '✅', 'Done'].map((label, i) => (
                                                                <span key={i} className="text-[9px] font-black uppercase text-cool-gray text-center" style={{ flex: i < 4 ? '1' : 'none' }}>
                                                                    {label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {/* Past Orders */}
                    {pastOrders.length > 0 && (
                        <div>
                            <h2 className="font-display font-black text-xl uppercase mb-3 text-cool-gray">
                                Past Orders ({pastOrders.length})
                            </h2>
                            <div className="space-y-3">
                                {pastOrders.map(order => {
                                    const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG['COMPLETED'];
                                    const StatusIcon = statusInfo.icon;
                                    return (
                                        <div
                                            key={order.id}
                                            className="bg-white border-2 border-black/20 rounded-xl p-4 opacity-70"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-display font-black text-xl">
                                                        {order.orderNumber || `#${order.id.slice(-6).toUpperCase()}`}
                                                    </h3>
                                                    <p className="text-cool-gray text-sm font-bold">{order.vendor?.name}</p>
                                                    <p className="text-cool-gray text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-display font-bold text-lg">{order.totalAmount} EGP</span>
                                                    <div className={`flex items-center gap-1 justify-end mt-1 text-xs font-bold ${statusInfo.color}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {statusInfo.label}
                                                    </div>
                                                    {order.status === 'COMPLETED' && (
                                                        <button
                                                            onClick={() => setRatingTarget({ vendorId: order.vendorId, vendorName: order.vendor?.name || 'Vendor' })}
                                                            className="mt-2 flex items-center gap-1 text-xs font-bold text-volt-green border-2 border-volt-green rounded-full px-2 py-0.5 hover:bg-volt-green/10"
                                                        >
                                                            <Star className="w-3 h-3" /> Rate
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Rating Modal */}
            <AnimatePresence>
                {ratingTarget && (
                    <RatingModal
                        vendorId={ratingTarget!.vendorId}
                        vendorName={ratingTarget!.vendorName}
                        onClose={() => setRatingTarget(null)}
                    />
                )}
            </AnimatePresence>

            {/* Payment Modal */}
            <AnimatePresence>
                {payingOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-end p-0"
                    >
                        <div className="absolute inset-0 bg-deep-charcoal/80 backdrop-blur-sm" onClick={() => setPayingOrder(null)} />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full bg-sneaker-white rounded-t-3xl border-t-4 border-black overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="w-full flex justify-center pt-3 pb-2">
                                <div className="w-12 h-1.5 bg-deep-charcoal/20 rounded-full" />
                            </div>
                            <div className="px-4 pb-2 border-b-2 border-black/10">
                                <h2 className="font-display font-extrabold text-2xl uppercase">Complete Payment</h2>
                                <p className="text-cool-gray text-sm mt-1">
                                    Order {payingOrder.orderNumber || `#${payingOrder.id.slice(-6).toUpperCase()}`} · {payingOrder.totalAmount} EGP
                                </p>
                            </div>
                            <div className="p-4">
                                <PaymentDropzone
                                    orderId={payingOrder.id}
                                    userId={currentUser?.id || ''}
                                    expectedAmount={payingOrder.totalAmount}
                                    vendorInstapay={payingOrder.vendor?.instapayAddress || '@lockin_vendor'}
                                    onVerifySuccess={handlePaymentSuccess}
                                    onCancel={() => setPayingOrder(null)}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
