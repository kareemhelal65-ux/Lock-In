import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle2, XCircle, Flame, Loader2, RefreshCw, Lock, Star, CreditCard, Trash2, Users, LogOut, ChevronRight, MapPin, Bike, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import RatingModal from '@/components/modals/RatingModal';
import PaymentDropzone from '@/components/checkout/PaymentDropzone';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    AWAITING_PAYMENT: { label: 'Awaiting Payment', color: 'text-yellow-600', bg: 'bg-yellow-100 border-yellow-300', icon: Clock },
    AWAITING_VERIFICATION: { label: 'Awaiting payment verification by vendor', color: 'text-blue-600', bg: 'bg-blue-100 border-blue-300', icon: Clock },
    PENDING: { label: 'Payment Verified', color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-300', icon: CheckCircle2 },
    FIRE: { label: '🔥 SYNCING...', color: 'text-orange-600', bg: 'bg-orange-100 border-orange-300', icon: Flame },
    READY: { label: '✅ Ready for Pickup', color: 'text-green-700', bg: 'bg-green-100 border-green-300', icon: CheckCircle2 },
    COMPLETED: { label: 'Completed', color: 'text-gray-500', bg: 'bg-gray-100 border-gray-300', icon: CheckCircle2 },
    REJECTED: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-100 border-red-300', icon: XCircle },
    // Delivery statuses
    AWAITING_DELIVERY: { label: '📍 Awaiting Delivery', color: 'text-purple-600', bg: 'bg-purple-100 border-purple-300', icon: MapPin },
    DELIVERY_ACCEPTED: { label: '🛵 Deliverer on the Way', color: 'text-indigo-600', bg: 'bg-indigo-100 border-indigo-300', icon: Bike },
    ON_THE_WAY: { label: '🛵 On the Way', color: 'text-indigo-600', bg: 'bg-indigo-100 border-indigo-300', icon: Bike },
    PICKED_UP: { label: '📦 Picked Up', color: 'text-indigo-600', bg: 'bg-indigo-100 border-indigo-300', icon: Package },
    DELIVERED: { label: '🎉 Delivered!', color: 'text-emerald-700', bg: 'bg-emerald-100 border-emerald-300', icon: CheckCircle2 },
};

// Delivery progress tracker steps
const PROGRESS_STEPS = [
    { key: 'AWAITING_PAYMENT', label: 'Pay' },
    { key: 'PENDING', label: 'Got It' },
    { key: 'AWAITING_DELIVERY', label: 'Delivery' },
    // BUG FIX: Use ON_THE_WAY (not DELIVERY_ACCEPTED) as the step — this is what
    // the progress tracker shows once the vendor hands off (READY) AND deliverer accepted.
    // DELIVERY_ACCEPTED is an intermediate state, ON_THE_WAY is the visible one.
    { key: 'ON_THE_WAY', label: 'Picked Up' },
    { key: 'DELIVERED', label: 'Done ✓' },
];

// Standard (non-delivery) progress tracker steps
const STANDARD_STEPS = [
    { key: 'AWAITING_PAYMENT', label: 'Pay' },
    { key: 'PENDING', label: 'Got It' },
    { key: 'FIRE', label: '🔥' },
    { key: 'READY', label: '✅' },
    { key: 'COMPLETED', label: 'Done' },
];

// Which statuses indicate this order is on the delivery path?
const DELIVERY_STATUSES = new Set(['AWAITING_DELIVERY', 'DELIVERY_ACCEPTED', 'ON_THE_WAY', 'PICKED_UP', 'DELIVERED']);

interface LocksTabProps {
    onOpenSafe?: (safeId: string) => void;
}

// ── Location Request Modal ────────────────────────────────────────────────────
function DeliveryRequestModal({ order, onClose, onSuccess }: {
    order: any;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { currentUser } = useApp();
    const [location, setLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!location.trim()) { setError('Please describe where you are on campus'); return; }
        setIsSubmitting(true);
        setError(null);
        try {
            const res = await fetch(`/api/consumer/order/${order.id}/request-delivery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser?.id, location: location.trim() })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Could not submit request');
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
        >
            <div className="absolute inset-0 bg-deep-charcoal/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="relative w-full bg-sneaker-white rounded-t-3xl border-t-4 border-black p-6 pb-10"
            >
                <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 border-2 border-black flex items-center justify-center">
                        <Bike className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="font-display font-black text-xl uppercase">Get Help From a Friend</h2>
                        <p className="text-cool-gray text-xs font-bold">Order {order.orderNumber} · {order.vendor?.name}</p>
                    </div>
                </div>

                <p className="text-sm text-cool-gray font-bold mb-4">
                    A fellow SAWA user will pick up your order and deliver it to you on campus. They earn 100 Hype Points 🔥
                </p>

                <label className="block text-sm font-black uppercase mb-2">📍 Where are you on campus?</label>
                <textarea
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Engineering Block B, Room 205 / Main Library entrance / Dorms Gate 3"
                    rows={3}
                    className="w-full border-2 border-black rounded-xl p-3 text-sm font-bold resize-none focus:outline-none focus:border-purple-500 mb-4"
                />

                {error && <p className="text-electric-red text-sm font-bold mb-3">{error}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !location.trim()}
                    className="w-full bg-purple-500 border-2 border-black text-white font-display font-black uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                    Submit Delivery Request
                </button>
            </motion.div>
        </motion.div>
    );
}

// ── My Active Deliveries Card ─────────────────────────────────────────────────
function MyDeliveriesSection({ userId, onRefresh }: { userId: string; onRefresh: () => void }) {
    const [deliveries, setDeliveries] = useState<any[]>([]);
    const [markingId, setMarkingId] = useState<string | null>(null);

    const fetch_ = async () => {
        const res = await fetch(`/api/consumer/my-deliveries/${userId}`);
        if (res.ok) { const d = await res.json(); setDeliveries(d.deliveries || []); }
    };

    useEffect(() => { fetch_(); const iv = setInterval(fetch_, 10000); return () => clearInterval(iv); }, [userId]);

    if (deliveries.length === 0) return null;

    const markDelivered = async (deliveryId: string) => {
        setMarkingId(deliveryId);
        try {
            const res = await fetch(`/api/consumer/delivery-requests/${deliveryId}/delivered`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            if (res.ok) { fetch_(); onRefresh(); }
            else { const d = await res.json(); alert(d.error || 'Could not mark as delivered'); }
        } finally { setMarkingId(null); }
    };

    return (
        <div className="mb-6">
            <h2 className="font-display font-black text-xl uppercase mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse inline-block" />
                My Deliveries ({deliveries.length})
            </h2>
            <div className="space-y-3">
                {deliveries.map((d: any) => {
                    // FIX: Vendor must have READY or PICKED_UP status before deliverer can mark as delivered
                    // (This prevents premature delivery marking before vendor even prepares the order)
                    const vendorReady = d.orderStatus === 'READY' || d.orderStatus === 'PICKED_UP';
                    const canMarkDelivered = vendorReady;

                    return (
                    <motion.div
                        key={d.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-4 border-purple-500 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(168,85,247,0.4)]"
                    >
                        <div className="px-4 py-2 border-b-2 border-black/10 bg-purple-100 flex items-center gap-2">
                            <Bike className="w-4 h-4 text-purple-600" />
                            <span className="font-display font-black text-sm uppercase text-purple-700">
                                You're Delivering — Earn 100 🔥 pts
                            </span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-display font-black text-lg">{d.orderNumber}</p>
                                    <p className="text-cool-gray text-sm font-bold">{d.restaurantName}</p>
                                </div>
                                <img src={d.requesterAvatar} alt={d.requesterName} className="w-9 h-9 rounded-full border-2 border-black" />
                            </div>
                            <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2 mb-3">
                                <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <p className="text-sm font-bold">{d.campusLocation}</p>
                            </div>
                            <p className="text-xs text-cool-gray font-bold mb-1">Deliver to: <span className="text-deep-charcoal">{d.requesterName}</span></p>
                            
                            {/* Vendor Status Badge for Deliverer — shows when vendor is preparing */}
                            {d.orderStatus && (
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black/10 mb-3 ${STATUS_CONFIG[d.orderStatus]?.bg || 'bg-gray-50'}`}>
                                    {STATUS_CONFIG[d.orderStatus]?.icon && (
                                        <div className={STATUS_CONFIG[d.orderStatus]?.color}>
                                            {(() => {
                                                const Icon = STATUS_CONFIG[d.orderStatus].icon;
                                                return <Icon className="w-3.5 h-3.5" />;
                                            })()}
                                        </div>
                                    )}
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${STATUS_CONFIG[d.orderStatus]?.color || 'text-gray-500'}`}>
                                        Vendor: {STATUS_CONFIG[d.orderStatus]?.label || d.orderStatus}
                                    </span>
                                </div>
                            )}

                            {/* FIX: Only allow marking delivered when vendor is READY */}
                            {!canMarkDelivered ? (
                                <div className="w-full bg-amber-50 border-2 border-amber-300 text-amber-700 font-display font-black uppercase text-xs py-3 rounded-xl flex items-center justify-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Waiting for vendor to prepare...
                                </div>
                            ) : (
                                <button
                                    onClick={() => markDelivered(d.id)}
                                    disabled={markingId === d.id}
                                    className="w-full bg-volt-green border-2 border-black font-display font-black uppercase text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                                >
                                    {markingId === d.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                    Mark as Delivered
                                </button>
                            )}
                        </div>
                    </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
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
    const [deliveryModalOrder, setDeliveryModalOrder] = useState<any | null>(null);
    const [cancellingDRId, setCancellingDRId] = useState<string | null>(null);

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

    const handleCancelDeliveryRequest = async (requestId: string) => {
        if (!currentUser?.id) return;
        if (!confirm('Are you sure you want to cancel this delivery request?')) return;
        setCancellingDRId(requestId);
        try {
            const res = await fetch(`/api/consumer/delivery-requests/${requestId}/cancel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id })
            });
            if (res.ok) {
                fetchOrders();
            } else {
                const data = await res.json();
                alert(data.error || 'Could not cancel delivery request');
            }
        } catch {
            alert('Could not cancel delivery request');
        } finally {
            setCancellingDRId(null);
        }
    };

    const handlePaymentSuccess = () => {
        setPayingOrder(null);
        fetchOrders();
    };

    const activeOrders = orders.filter(o => !['COMPLETED', 'REJECTED', 'DELIVERED'].includes(o.status));
    const pastOrders = orders.filter(o => ['COMPLETED', 'REJECTED', 'DELIVERED'].includes(o.status));

    return (
        <>
            <div className="min-h-screen bg-sneaker-white pb-24">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b-4 border-black z-10 px-4 pt-safe">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h1 className="font-display font-black text-3xl uppercase tracking-tight flex items-center gap-2">
                                <Lock className="w-7 h-7" /> Orders
                            </h1>
                            <p className="text-cool-gray text-sm font-bold">Your hubs, orders & live tracking</p>
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

                    {/* My Active Deliveries (for orders accepted from Radar) */}
                    {currentUser?.id && (
                        <MyDeliveriesSection userId={currentUser.id} onRefresh={fetchOrders} />
                    )}

                    {/* Active Safes Section */}
                    {activeSafes.length > 0 && (
                        <div>
                            <h2 className="font-display font-black text-xl uppercase mb-3 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-volt-green animate-pulse inline-block" />
                                Active Hubs ({activeSafes.length})
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
                                                Hub Active — {safe.participants?.length || 0} people
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
                                                        Open Hub <ChevronRight className="w-4 h-4" />
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
                            <p className="text-cool-gray font-bold">Your orders will appear here once you order.</p>
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
                                        // HELPER: Get the status that should be SHOWN to the consumer, 
                                        // looking at both the order and any peer-delivery request.
                                        const getEffectiveStatus = () => {
                                            if (!order.deliveryRequest) return order.status;
                                            const drStatus = order.deliveryRequest.status;
                                            const vendorStatus = order.status; // The vendor's own order state

                                            if (drStatus === 'OPEN') return 'AWAITING_DELIVERY';
                                            
                                            // BUG FIX: When delivery is ACCEPTED, differentiate between:
                                            // - Vendor still preparing (PENDING/FIRE) → show DELIVERY_ACCEPTED
                                            // - Vendor handed off (READY or PICKED_UP) → show ON_THE_WAY
                                            if (drStatus === 'ACCEPTED') {
                                                if (vendorStatus === 'READY' || vendorStatus === 'PICKED_UP') return 'ON_THE_WAY';
                                                return 'DELIVERY_ACCEPTED';
                                            }
                                            
                                            if (drStatus === 'DELIVERED') return 'DELIVERED';
                                            return order.status;
                                        };

                                        const effectiveStatus = getEffectiveStatus();
                                        const statusInfo = STATUS_CONFIG[effectiveStatus] || STATUS_CONFIG[order.status] || STATUS_CONFIG['PENDING'];
                                        const StatusIcon = statusInfo.icon;
                                        const isAwaitingPayment = order.status === 'AWAITING_PAYMENT';
                                        // "Verified" = PENDING, FIRE, or READY - essentially any status after payment verification
                                        const isVerified = ['PENDING', 'FIRE', 'READY', 'PICKED_UP'].includes(order.status);
                                        const hasDeliveryRequest = !!order.deliveryRequest && order.deliveryRequest.status !== 'CANCELLED';
                                        const isOnDeliveryPath = DELIVERY_STATUSES.has(effectiveStatus);
                                        const steps = isOnDeliveryPath ? PROGRESS_STEPS : STANDARD_STEPS;

                                        return (
                                            <motion.div
                                                key={order.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            >
                                                <div className={`px-4 py-2 border-b-2 border-black flex items-center justify-between gap-2 ${statusInfo.bg}`}>
                                                    <div className="flex items-center gap-2">
                                                        <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                                                        <span className={`font-display font-black text-sm uppercase ${statusInfo.color}`}>
                                                            {statusInfo.label}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Underlying Vendor Status for Requester */}
                                                    {hasDeliveryRequest && order.status !== effectiveStatus && (
                                                        <div className="flex items-center gap-1 opacity-70">
                                                            <span className="text-[10px] font-black uppercase text-black/40 tracking-widest bg-black/5 px-2 py-0.5 rounded border border-black/10 flex items-center gap-1">
                                                                {(() => {
                                                                    const Icon = STATUS_CONFIG[order.status]?.icon;
                                                                    return Icon ? <Icon className="w-2.5 h-2.5" /> : null;
                                                                })()}
                                                                Prep: {STATUS_CONFIG[order.status]?.label || order.status}
                                                            </span>
                                                        </div>
                                                    )}
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

                                                    {/* Payment CTA */}
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

                                                    {/* "Get Help From a Friend" CTA — only when PENDING, FIRE, or READY and no active delivery request */}
                                                    {isVerified && order.hostId === currentUser?.id && !hasDeliveryRequest && (
                                                        <div className="mt-3 pt-3 border-t-2 border-black/10">
                                                            <button
                                                                onClick={() => setDeliveryModalOrder(order)}
                                                                className="w-full bg-purple-500 border-2 border-black text-white font-display font-black uppercase text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                                                            >
                                                                <Bike className="w-4 h-4" />
                                                                Get Help From a Friend →
                                                            </button>
                                                            <p className="text-[10px] text-cool-gray font-bold text-center mt-1.5">
                                                                A user on SAWA delivers it to you · they earn 100 🔥 pts
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Delivery location pill (when on delivery path) */}
                                                    {hasDeliveryRequest && order.deliveryRequest?.campusLocation && (
                                                        <div className="mt-3 flex items-center justify-between gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                                                <p className="text-xs font-bold text-purple-700">{order.deliveryRequest.campusLocation}</p>
                                                            </div>
                                                            {effectiveStatus === 'AWAITING_DELIVERY' && (
                                                                <button
                                                                    onClick={() => handleCancelDeliveryRequest(order.deliveryRequest.id)}
                                                                    disabled={cancellingDRId === order.deliveryRequest.id}
                                                                    className="text-[10px] font-black uppercase text-electric-red hover:underline disabled:opacity-50"
                                                                >
                                                                    {cancellingDRId === order.deliveryRequest.id ? 'Cancelling...' : 'Cancel'}
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Progress tracker */}
                                                    <div className="mt-4 pt-3 border-t-2 border-black/10">
                                                        <div className="flex items-center justify-between">
                                                            {steps.map(({ key }, i) => {
                                                                // BUG FIX: DELIVERY_ACCEPTED is an intermediate state not in PROGRESS_STEPS.
                                                                // Map it to AWAITING_DELIVERY step index (one step before ON_THE_WAY).
                                                                const trackerStatus = effectiveStatus === 'DELIVERY_ACCEPTED' ? 'AWAITING_DELIVERY' : effectiveStatus;
                                                                const currentIdx = steps.findIndex(s => s.key === trackerStatus);
                                                                const stepIdx = i;
                                                                const isPast = stepIdx < currentIdx;
                                                                const isCurrent = stepIdx === currentIdx;
                                                                return (
                                                                    <div key={key} className="flex items-center flex-1">
                                                                        <div className={`w-4 h-4 rounded-full border-2 border-black flex-shrink-0 transition-all ${isCurrent ? 'bg-electric-red scale-125' : isPast ? 'bg-volt-green' : 'bg-gray-200'}`} />
                                                                        {i < steps.length - 1 && <div className={`h-1 flex-1 ${isPast ? 'bg-volt-green' : 'bg-gray-200'}`} />}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="flex justify-between mt-1">
                                                            {steps.map(({ label }, i) => (
                                                                <span key={i} className="text-[9px] font-black uppercase text-cool-gray text-center" style={{ flex: i < steps.length - 1 ? '1' : 'none' }}>
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
                            className="relative w-full bg-sneaker-white rounded-t-3xl border-t-4 border-black flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
                                <div className="w-12 h-1.5 bg-deep-charcoal/20 rounded-full" />
                            </div>
                            <div className="px-4 pb-2 border-b-2 border-black/10 shrink-0">
                                <h2 className="font-display font-extrabold text-2xl uppercase">Complete Payment</h2>
                                <p className="text-cool-gray text-sm mt-1">
                                    Order {payingOrder.orderNumber || `#${payingOrder.id.slice(-6).toUpperCase()}`} · {payingOrder.totalAmount} EGP
                                </p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
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

            {/* Delivery Request Modal */}
            <AnimatePresence>
                {deliveryModalOrder && (
                    <DeliveryRequestModal
                        order={deliveryModalOrder}
                        onClose={() => setDeliveryModalOrder(null)}
                        onSuccess={() => {
                            setDeliveryModalOrder(null);
                            fetchOrders();
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
