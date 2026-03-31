import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Zap, Plus, ShoppingBag, Lock, TrendingUp, Megaphone, RefreshCw, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import FlashDropCheckout from '@/components/modals/FlashDropCheckout';
import type { FlashDrop } from '@/types';

interface FeedTabProps {
  onStartLock: (restaurantId: string) => void;
  onSuccess?: () => void;
}

export default function FeedTab({ onStartLock, onSuccess }: FeedTabProps) {
  const { vendorsOnLock, addNotification, addOrder, currentUser } = useApp();
  const [vendors, setVendors] = useState<any[]>([]);
  const [feedData, setFeedData] = useState<{ friendOrders: any[]; flashDrops: any[]; announcements: any[]; globalSafes: any[] }>({
    friendOrders: [], flashDrops: [], announcements: [], globalSafes: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState<FlashDrop | null>(null);
  const [showFlashCheckout, setShowFlashCheckout] = useState(false);

  const fetchVendors = useCallback(async () => {
    try {
      const res = await fetch('/api/consumer/explore');
      const data = await res.json();
      if (res.ok) setVendors(data.vendors || []);
    } catch (err) { console.error('Error fetching vendors', err); }
  }, []);

  const fetchFeed = useCallback(async () => {
    if (!currentUser?.id) return;
    setIsLoading(true);
    try {
      const [feedRes, dropsRes] = await Promise.all([
        fetch(`/api/consumer/feed/${currentUser.id}`),
        fetch('/api/vendorData/flash-drops')
      ]);
      const feedJson = feedRes.ok ? await feedRes.json() : {};
      const dropsJson = dropsRes.ok ? await dropsRes.json() : { drops: [] };

      const allDrops = [...(feedJson.flashDrops || []), ...(dropsJson.drops || [])];
      const uniqueDrops = allDrops.filter((drop, idx, arr) => arr.findIndex((d: any) => d.id === drop.id) === idx);

      setFeedData({
        friendOrders: feedJson.friendOrders || [],
        flashDrops: uniqueDrops,
        announcements: feedJson.announcements || [],
        globalSafes: feedJson.globalSafes || []
      });
    } catch (err) { console.error('Error fetching feed', err); }
    finally { setIsLoading(false); }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchVendors();
    fetchFeed();
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, [fetchVendors, fetchFeed]);

  const pinnedVendors = vendors.filter(v => vendorsOnLock.includes(v.id));

  const handleClaimDrop = (drop: any) => {
    const mapped: FlashDrop = {
      id: drop.id,
      vendorId: drop.vendorId || drop.vendor?.id,
      vendorName: drop.vendor?.name || 'Vendor',
      vendorAvatar: drop.vendor?.image || '',
      itemName: drop.itemName,
      description: '',
      originalPrice: drop.originalPrice,
      dropPrice: drop.dropPrice,
      quantity: drop.quantityLeft,
      quantityLeft: drop.quantityLeft,
      image: drop.vendor?.image || '',
      expiresAt: new Date(drop.expiresAt),
    };
    setSelectedDrop(mapped);
    setShowFlashCheckout(true);
  };

  const handleFlashDropComplete = (orderId: string) => {
    if (selectedDrop) {
      addOrder({
        id: `order-${Date.now()}`,
        userId: currentUser?.id || 'user1',
        userName: currentUser?.name || 'You',
        userAvatar: currentUser?.avatar || '',
        restaurantId: selectedDrop.vendorId,
        restaurantName: selectedDrop.vendorName,
        items: [{ menuItemId: selectedDrop.id, name: selectedDrop.itemName, quantity: 1, price: selectedDrop.dropPrice }],
        total: selectedDrop.dropPrice,
        status: 'locked',
        createdAt: new Date(),
        orderId,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${orderId}`,
      });
      addNotification({
        id: `notif-${Date.now()}`,
        type: 'order_confirmed',
        title: 'Flash Drop Claimed!',
        message: `${selectedDrop.itemName} — Show QR at pickup.`,
        timestamp: new Date(),
        read: false,
      });
    }
    setShowFlashCheckout(false);
    setSelectedDrop(null);
    fetchFeed();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="min-h-screen bg-sneaker-white pt-4 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-deep-charcoal uppercase tracking-tight">The Feed</h1>
          <p className="text-cool-gray text-sm font-body">See what your crew is locking in</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge"><span className="live-dot" />LIVE</div>
          <button onClick={fetchFeed} disabled={isLoading} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Pinned Vendor Drops (On Lock) */}
      {pinnedVendors.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-sm uppercase text-volt-green tracking-wider flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4" /> On Lock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pinnedVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="brutal-card p-4 border-volt-green bg-volt-green/10"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={vendor.image?.startsWith('/') ? `${vendor.image}` : vendor.image}
                    alt={vendor.name}
                    className="w-14 h-14 rounded-lg object-cover border-2 border-deep-charcoal"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold">{vendor.name}</h3>
                      {vendor.status === 'LIVE' && <span className="text-[10px] bg-volt-green text-deep-charcoal px-2 py-0.5 rounded-full font-bold">LIVE</span>}
                      {vendor.status === 'SWAMPED' && <span className="text-[10px] bg-amber-400 text-deep-charcoal px-2 py-0.5 rounded-full font-bold">SWAMPED</span>}
                      {vendor.status === 'OFFLINE' && <span className="text-[10px] bg-gray-400 text-white px-2 py-0.5 rounded-full font-bold">OFFLINE</span>}
                    </div>
                    {vendor.announcementBanner && (
                      <p className="text-xs text-electric-red font-bold flex items-center gap-1 mt-1">
                        <Megaphone className="w-3 h-3" /> {vendor.announcementBanner}
                      </p>
                    )}
                  </div>
                  <motion.button
                    onClick={() => onStartLock(vendor.id)}
                    className="brutal-btn-primary text-xs py-2"
                    whileTap={{ scale: 0.95 }}
                    disabled={vendor.status === 'OFFLINE'}
                  >
                    <Plus className="w-4 h-4 mr-1" /> START LOCK
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements */}
      {feedData.announcements.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-sm uppercase text-electric-red tracking-wider flex items-center gap-2 mb-4">
            <Megaphone className="w-4 h-4" /> Announcements
          </h2>
          <div className="space-y-3">
            {feedData.announcements.map((a: any, i: number) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="brutal-card p-4 flex items-center gap-4 border-electric-red bg-electric-red/5"
              >
                <img
                  src={a.image?.startsWith('/') ? `${a.image}` : a.image}
                  alt={a.name}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-deep-charcoal"
                />
                <div className="flex-1">
                  <p className="font-display font-bold text-sm">{a.name}</p>
                  <p className="text-sm text-deep-charcoal">{a.announcementBanner}</p>
                  <p className="text-xs text-cool-gray">{new Date(a.updatedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Flash Drops */}
      {feedData.flashDrops.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-electric-red" /> Flash Drops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {feedData.flashDrops.map((drop: any, index: number) => (
              <motion.div key={drop.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.08 }}
                className="brutal-card brutal-card-hover overflow-hidden border-electric-red"
              >
                <div className="flex">
                  <div className="w-1/3 relative bg-gray-100 min-h-[100px] flex items-center justify-center">
                    {drop.vendor?.image ? (
                      <img
                        src={drop.vendor.image?.startsWith('/') ? `${drop.vendor.image}` : drop.vendor.image}
                        alt={drop.itemName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-12 h-12 text-gray-300" />
                    )}
                    <div className="absolute top-2 left-2 bg-electric-red text-white px-2 py-0.5 rounded-pill text-xs font-display font-bold">
                      {drop.quantityLeft} LEFT
                    </div>
                  </div>
                  <div className="w-2/3 p-4">
                    <span className="text-xs font-body text-cool-gray">{drop.vendor?.name}</span>
                    <h3 className="font-display font-bold text-lg text-deep-charcoal mb-1">{drop.itemName}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display font-extrabold text-xl text-volt-green">{drop.dropPrice} EGP</span>
                      {drop.originalPrice > 0 && <span className="text-sm text-cool-gray line-through">{drop.originalPrice} EGP</span>}
                    </div>
                    <div className="text-xs text-cool-gray mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Expires {new Date(drop.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <motion.button onClick={() => handleClaimDrop(drop)} className="w-full brutal-btn-primary text-sm py-2" whileTap={{ scale: 0.95 }}>
                      <Zap className="w-4 h-4 mr-1" /> CLAIM DROP
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Magnet Broadcasts */}
      {feedData.globalSafes.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-sm uppercase text-purple-600 tracking-wider mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" /> Magnet Broadcasts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {feedData.globalSafes.map((safe: any, index: number) => (
              <motion.div key={safe.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}
                className="brutal-card p-4 border-purple-600 bg-purple-600/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center border-2 border-deep-charcoal">
                    <Zap className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-display font-bold text-deep-charcoal uppercase truncate">{safe.restaurantName}</h3>
                    <p className="text-xs font-bold text-purple-600 mt-1 truncate">HOST: {safe.hostName}</p>
                    <p className="text-[10px] text-deep-charcoal/60 uppercase mt-1">Global Broadcast Active</p>
                  </div>
                  <motion.button onClick={() => onStartLock(safe.restaurantId)} className="brutal-btn-primary bg-purple-600 text-white text-xs py-2 px-3 border-2 border-deep-charcoal whitespace-nowrap" whileTap={{ scale: 0.95 }}>
                    JOIN
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Friend Orders */}
      {feedData.friendOrders.length > 0 && (
        <div className="pb-8">
          <h2 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" /> Friend Orders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {feedData.friendOrders.map((order: any, index: number) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.08 }}
                className="brutal-card brutal-card-hover p-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={order.host?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${order.host?.username}`}
                    alt={order.host?.name}
                    className="w-12 h-12 rounded-full border-2 border-deep-charcoal"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-deep-charcoal">{order.host?.name}</span>
                      <span className="text-xs text-cool-gray">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-sm text-cool-gray mb-2">
                      ordered from <span className="font-semibold text-deep-charcoal">{order.vendor?.name}</span>
                    </p>
                    <div className="flex items-center gap-2 text-sm text-cool-gray mb-3">
                      <ShoppingBag className="w-4 h-4" />
                      {order.items?.map((item: any) => `${item.quantity}x ${item.name}`).join(', ')}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-lg">{order.totalAmount} EGP</span>
                      <motion.button 
                        onClick={() => onStartLock(order.vendor?.id)} 
                        className="brutal-btn-secondary text-xs py-2 px-4" 
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4 mr-1" /> START LOCK
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && feedData.friendOrders.length === 0 && feedData.flashDrops.length === 0 && feedData.announcements.length === 0 && pinnedVendors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 border-4 border-black rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-display font-black text-xl uppercase mb-2">Feed Is Empty</h3>
          <p className="text-cool-gray font-bold text-sm">Add friends and sync with vendors to see activity here!</p>
        </div>
      )}

      <AnimatePresence>
        {showFlashCheckout && selectedDrop && (
          <FlashDropCheckout
            drop={selectedDrop}
            onClose={() => { setShowFlashCheckout(false); setSelectedDrop(null); }}
            onComplete={handleFlashDropComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
