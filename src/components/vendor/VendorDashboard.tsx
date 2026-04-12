import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, 
    CheckCircle2, 
    Flame, 
    Users, 
    ArrowRight, 
    Activity, 
    Image as ImageIcon,
    Loader2,
    X
} from 'lucide-react';
import { translations } from './translations';

interface VendorDashboardProps {
    vendorId: string | null;
    lang: 'en' | 'ar';
}

export default function VendorDashboard({ vendorId, lang }: VendorDashboardProps) {
    const [orders, setOrders] = useState<any[]>([]);
    const [mobileView, setMobileView] = useState<'incoming' | 'active'>('incoming');
    const [reviewingOrder, setReviewingOrder] = useState<any | null>(null);
    const [processingOrder, setProcessingOrder] = useState<{ id: string, action: string } | null>(null);

    const t = translations[lang];

    const fetchDashboard = async () => {
        if (!vendorId) return;
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/dashboard`);
            const data = await res.json();
            if (data.orders) {
                setOrders(data.orders);
                // Synchronize reviewing modal with fresh data if open
                if (reviewingOrder) {
                    const fresh = data.orders.find((o: any) => o.id === reviewingOrder.id);
                    if (fresh) setReviewingOrder(fresh);
                }
            }
        } catch (err) {
            console.error("Failed to load dashboard orders", err);
        }
    };

    useEffect(() => {
        if (!vendorId) return;
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 3000);
        return () => clearInterval(interval);
    }, [vendorId]);

    const incomingOrders = orders
        .filter(o => o.status === 'PENDING' || o.status === 'AWAITING_PAYMENT' || o.status === 'AWAITING_VERIFICATION' || o.status === 'incoming')
        .sort((a, b) => {
            // 1. Prioritize AWAITING_VERIFICATION (Full sync ready)
            if (a.status === 'AWAITING_VERIFICATION' && b.status !== 'AWAITING_VERIFICATION') return -1;
            if (a.status !== 'AWAITING_VERIFICATION' && b.status === 'AWAITING_VERIFICATION') return 1;

            // 2. Prioritize Any New Receipts (by updatedAt)
            const aHasReceipt = a.participants?.some((p: any) => p.paymentScreenshotUrl);
            const bHasReceipt = b.participants?.some((p: any) => p.paymentScreenshotUrl);
            
            if (aHasReceipt && !bHasReceipt) return -1;
            if (!aHasReceipt && bHasReceipt) return 1;
            
            // 3. Fallback to updatedAt desc
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    const activeOrders = orders.filter(o => o.status === 'FIRE' || o.status === 'firing' || o.status === 'SYNC' || o.status === 'syncing' || o.status === 'READY' || o.status === 'ready');

    const moveOrder = async (orderId: string, newStatus: string) => {
        setProcessingOrder({ id: orderId, action: newStatus });
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/order/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                const data = await res.json();
                const actualStatus = data.order?.status || newStatus;
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: actualStatus } : o));
                setReviewingOrder(null);
            }
        } catch (err) {
            console.error("Failed to update order status", err);
        } finally {
            setProcessingOrder(null);
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
                    {t.incomingOrders} ({incomingOrders.length})
                </button>
                <div className="w-0.5 bg-cool-gray/20" />
                <button
                    onClick={() => setMobileView('active')}
                    className={`flex-1 py-3 font-display font-bold uppercase transition-colors text-sm ${mobileView === 'active' ? 'bg-volt-green text-deep-charcoal' : 'text-cool-gray hover:text-white'}`}
                >
                    {t.activeOrders} ({activeOrders.length})
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* INCOMING COLUMN */}
                <div className={`w-full md:w-1/2 flex-col border-r-2 border-cool-gray/20 ${mobileView === 'incoming' ? 'flex' : 'hidden md:flex'}`}>
                    <div className="p-4 bg-deep-charcoal border-b-2 border-cool-gray/20 sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                            {t.incomingOrders} <span className="text-cool-gray text-lg mx-2">({incomingOrders.length})</span>
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

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-display font-black text-3xl text-white tracking-tighter">
                                                    {order.orderNumber || (order.id ? order.id.slice(-6).toUpperCase() : 'ORDER')}
                                                </h3>
                                                {(() => {
                                                    const orderSubsidy = order.participants?.reduce((sum: number, p: any) => sum + (p.sawaSubsidy || 0), 0) || order.sawaSubsidy || 0;
                                                    if (orderSubsidy <= 0) return null;
                                                    
                                                    const expectedFromCustomer = Math.max(0, order.totalAmount - orderSubsidy);
                                                    const isFullSubsidy = expectedFromCustomer === 0;
                                                    
                                                    return (
                                                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase shadow-sm ${
                                                            isFullSubsidy ? 'bg-purple-600 text-white' : 'bg-yellow-400 text-deep-charcoal'
                                                        }`}>
                                                            {isFullSubsidy ? 'PAYMENT: PAID BY SAWA' : 'PAYMENT: DISCOUNTED'}
                                                        </span>
                                                    );
                                                })()}
                                            </div>
                                            <p className="text-cool-gray text-xs uppercase font-bold tracking-widest mt-1 flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                {new Date(order.createdAt).toLocaleTimeString()}
                                                {order.participants?.length > 1 && (
                                                    <span className="text-volt-green flex items-center gap-1 mx-2">
                                                        • <Users className="w-3 h-3" /> {t.group} ({order.participants.length})
                                                    </span>
                                                )}
                                            </p>
                                            <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-black uppercase rounded ${
                                                order.status === 'AWAITING_PAYMENT' ? 'bg-yellow-400/20 text-yellow-400' : 
                                                order.status === 'AWAITING_VERIFICATION' ? 'bg-blue-400/20 text-blue-400' :
                                                'bg-volt-green/20 text-volt-green'}`}>
                                                {order.status === 'AWAITING_PAYMENT' ? t.awaitingPayment : 
                                                 order.status === 'AWAITING_VERIFICATION' ? t.awaitingVerification :
                                                 t.paymentReceived}
                                            </span>
                                        </div>
                                        <div className={`text-${lang === 'ar' ? 'left' : 'right'}`}>
                                            {(() => {
                                                const orderSubsidy = order.participants?.reduce((sum: number, p: any) => sum + (p.sawaSubsidy || 0), 0) || order.sawaSubsidy || 0;
                                                const expectedFromCustomer = Math.max(0, order.totalAmount - orderSubsidy);
                                                return (
                                                    <>
                                                        <div className="flex flex-col items-end">
                                                            <span className="font-display font-bold text-lg text-white">
                                                                {expectedFromCustomer} EGP
                                                            </span>
                                                            {orderSubsidy > 0 && (
                                                                <span className="text-[10px] text-cool-gray line-through uppercase mt-0.5">
                                                                    ORIGINAL: {order.totalAmount} EGP
                                                                </span>
                                                            )}
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">                                        
                                    {order.items?.map((item: any, idx: number) => (
                                            <div key={idx} className={`border-cool-gray/30 ${lang === 'ar' ? 'border-r-2 pr-3' : 'border-l-2 pl-3'}`}>
                                                <p className="font-bold text-white text-lg">
                                                    <span className={`text-cool-gray ${lang === 'ar' ? 'ml-2' : 'mr-2'}`}>{item?.quantity || 1}x</span>
                                                    {item?.name || t.unknownItem}
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
                                                        {t.specialNotes} {item.specialNotes}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Receipt count badge */}
                                    {order.participants?.some((p: any) => p.paymentScreenshotUrl) && (
                                        <div className="flex items-center gap-2 mb-3 text-volt-green text-xs font-bold uppercase">
                                            <ImageIcon className="w-4 h-4" />
                                            {order.participants.filter((p: any) => p.paymentScreenshotUrl).length} {t.receiptAttached}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <button
                                        onClick={() => setReviewingOrder(order)}
                                        className="w-full bg-volt-green text-deep-charcoal font-display font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b0f200] transition-colors active:scale-95 transform"
                                    >
                                        <Flame className="w-5 h-5" /> {t.reviewSync}
                                    </button>
                                </motion.div>
                            ))}
                            {incomingOrders.length === 0 && (
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-cool-gray/20 rounded-xl">
                                    <p className="text-cool-gray font-display font-bold uppercase tracking-widest text-sm">{t.noIncomingOrders}</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ACTIVE COLUMN */}
                <div className={`w-full md:w-1/2 flex-col bg-deep-charcoal/90 ${mobileView === 'active' ? 'flex' : 'hidden md:flex'}`}>
                    <div className="p-4 bg-deep-charcoal border-b-2 border-cool-gray/20 sticky top-0 z-10">
                        <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                            {t.activeOrders} <span className="text-cool-gray text-lg mx-2">({activeOrders.length})</span>
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
                                    className={`bg-zinc-900 border-2 rounded-xl p-5 transition-colors ${order.status === 'READY' || order.status === 'ready'
                                        ? 'border-volt-green/50 bg-volt-green/5'
                                        : 'border-cool-gray/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-display font-black text-2xl text-white tracking-tighter">
                                                    {order.orderNumber || order.id.slice(-6).toUpperCase()}
                                                </h3>
                                                <span className={`px-2 py-1 text-[10px] uppercase font-black rounded ${(order.status === 'READY' || order.status === 'ready') ? 'bg-volt-green text-deep-charcoal' : 'bg-electric-red text-white'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            {(() => {
                                                const orderSubsidy = order.participants?.reduce((sum: number, p: any) => sum + (p.sawaSubsidy || 0), 0) || order.sawaSubsidy || 0;
                                                return orderSubsidy > 0 ? (
                                                    <span className="bg-volt-green w-fit text-deep-charcoal px-2 py-0.5 rounded text-xs font-black uppercase">
                                                        SAWA PAID {Math.round(orderSubsidy)} EGP
                                                    </span>
                                                ) : null;
                                            })()}
                                        </div>
                                        <div className="text-right">
                                            {(() => {
                                                const orderSubsidy = order.participants?.reduce((sum: number, p: any) => sum + (p.sawaSubsidy || 0), 0) || order.sawaSubsidy || 0;
                                                const expectedFromCustomer = Math.max(0, order.totalAmount - orderSubsidy);
                                                return (
                                                    <>
                                                        <p className="font-display font-black text-xl text-white">
                                                            {expectedFromCustomer} EGP
                                                        </p>
                                                        {orderSubsidy > 0 && (
                                                            <p className="text-[10px] text-cool-gray line-through uppercase mt-0.5">
                                                                ORIGINAL: {order.totalAmount}
                                                            </p>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                            <p className="text-cool-gray text-xs font-bold mt-1">{order.participants?.length > 1 ? t.group : t.solo}</p>
                                        </div>
                                    </div>                                    <div className="space-y-3 mb-6">                                        
                                        {Array.isArray(order.items) && order.items.length > 0 ? (
                                            order.items.map((item: any, idx: number) => (
                                                <div key={idx} className={`border-cool-gray/30 ${lang === 'ar' ? 'border-r-2 pr-3' : 'border-l-2 pl-3'}`}>
                                                    <p className="font-bold text-white text-lg">
                                                        <span className={`text-cool-gray ${lang === 'ar' ? 'ml-2' : 'mr-2'}`}>{item?.quantity || 1}x</span>
                                                        {item?.name || t.unknownItem}
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
                                                            {t.specialNotes} {item.specialNotes}
                                                        </p>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-cool-gray text-xs italic">{t.unknownItem}</p>
                                        )}
                                    </div>

                                    {(order.status === 'FIRE' || order.status === 'firing') ? (
                                        <button
                                            onClick={() => moveOrder(order.id, 'READY')}
                                            disabled={processingOrder?.id === order.id}
                                            className="w-full bg-white text-deep-charcoal font-display font-black uppercase py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                        >
                                            {processingOrder?.id === order.id && processingOrder?.action === 'READY' ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </motion.div>
                                            ) : (
                                                <CheckCircle2 className="w-5 h-5" />
                                            )} {t.markReady}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => removeOrder(order.id)}
                                            disabled={processingOrder?.id === order.id}
                                            className="w-full bg-electric-red text-white font-display font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors group disabled:opacity-50"
                                        >
                                            {processingOrder?.id === order.id && processingOrder?.action === 'COMPLETED' ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                                    <Loader2 className="w-5 h-5" />
                                                </motion.div>
                                            ) : (
                                                <ArrowRight className={`w-5 h-5 transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                                            )} {t.orderDelivered}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                            {activeOrders.length === 0 && (
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-cool-gray/20 rounded-xl">
                                    <p className="text-cool-gray font-display font-bold uppercase tracking-widest text-sm">{t.noActiveOrders}</p>
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
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        >
                            <div className="p-6 border-b border-cool-gray/20">
                                <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                                    {t.reviewOrder} {reviewingOrder.orderNumber || reviewingOrder.id.slice(-6).toUpperCase()}
                                </h2>
                                <div className="mt-1 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                    {(() => {
                                        const actualSubsidy = reviewingOrder.participants?.reduce((sum: number, p: any) => sum + (p.sawaSubsidy || 0), 0) || reviewingOrder.sawaSubsidy || 0;
                                        const collectable = Math.max(0, reviewingOrder.totalAmount - actualSubsidy);
                                        return (
                                            <>
                                                <span className="text-cool-gray">{t.total}: {reviewingOrder.totalAmount} EGP</span>
                                                {actualSubsidy > 0 && (
                                                    <span className={`px-2 py-1 rounded text-xs font-black ${collectable === 0 ? 'bg-purple-600 text-white' : 'bg-yellow-400 text-deep-charcoal'}`}>
                                                        COLLECT: {collectable} EGP {actualSubsidy > 0 && `(SAWA covered ${Math.round(actualSubsidy)})`}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Order items */}
                                <div className="bg-zinc-900 rounded-xl p-4 border border-cool-gray/20">
                                    <p className="font-bold text-cool-gray text-xs uppercase tracking-widest mb-3">{t.itemsInOrder}</p>
                                    {reviewingOrder.items?.map((item: any, i: number) => (
                                        <div key={i} className="border-b border-cool-gray/20 py-2 last:border-0">
                                            <div className="flex justify-between text-white">
                                                <span className="font-bold">{item?.quantity || 1}x {item?.name || t.unknownItem}</span>
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
                                                    {t.specialNotes} {item.specialNotes}
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
                                                <p className="font-bold text-white text-lg">{participant.user?.name || participant.user?.username || t.customer}</p>
                                                <div className="flex flex-col mt-1">
                                                    <p className="text-cool-gray text-xs font-bold uppercase tracking-widest">
                                                        {t.share}: {participant.shareAmount} EGP
                                                    </p>
                                                    {participant.sawaSubsidy > 0 && (
                                                        <p className="text-volt-green text-xs font-black uppercase mt-0.5">
                                                            SAWA COVERED: {Math.round(participant.sawaSubsidy)} EGP
                                                        </p>
                                                    )}
                                                    <p className="text-white text-sm font-black uppercase mt-1 italic">
                                                        COLLECT FROM CUSTOMER: {Math.max(0, participant.shareAmount - (participant.sawaSubsidy || 0))} EGP
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded text-xs font-black uppercase ${
                                                participant.sawaSubsidy > 0 
                                                  ? (participant.shareAmount - participant.sawaSubsidy > 0 ? 'bg-yellow-400 text-deep-charcoal' : 'bg-purple-600 text-white')
                                                  : (participant.hasPaid ? 'bg-volt-green/20 text-volt-green' : 'bg-yellow-400/20 text-yellow-400')
                                            }`}>
                                                {participant.sawaSubsidy > 0 ? (participant.shareAmount - participant.sawaSubsidy > 0 ? 'DISCOUNTED' : 'PAID BY SAWA') : (participant.hasPaid ? t.paid : t.awaitingPayment)}
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
                                                <p className="text-cool-gray font-bold italic">{t.noReceipt}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {(!reviewingOrder.participants || reviewingOrder.participants.length === 0) && (
                                    <div className="text-center py-8">
                                        <p className="text-cool-gray font-bold">{t.noParticipantData}</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-cool-gray/20 bg-zinc-900 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => moveOrder(reviewingOrder.id, 'REJECTED')}
                                    disabled={processingOrder?.id === reviewingOrder.id}
                                    className="py-4 font-display font-black uppercase tracking-wider rounded-xl border-2 border-electric-red text-electric-red hover:bg-electric-red hover:text-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {processingOrder?.id === reviewingOrder.id && processingOrder?.action === 'REJECTED' ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                            <X className="w-5 h-5" />
                                        </motion.div>
                                    ) : null}
                                    {t.rejectOrder}
                                </button>
                                <button
                                    onClick={() => moveOrder(reviewingOrder.id, 'FIRE')}
                                    disabled={processingOrder?.id === reviewingOrder.id}
                                    className="py-4 bg-volt-green text-deep-charcoal font-display font-black uppercase tracking-wider rounded-xl hover:bg-[#b0f200] transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {processingOrder?.id === reviewingOrder.id && processingOrder?.action === 'FIRE' ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                            <Flame className="w-5 h-5" />
                                        </motion.div>
                                    ) : null}
                                    {t.approveSync}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
