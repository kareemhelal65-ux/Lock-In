import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Lock, Star, Clock, ChevronRight, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import type { MenuItem } from '@/types';

// Helper to fix relative image URLs from backend
const getImageUrl = (url?: string) => {
  if (!url) return `https://api.dicebear.com/7.x/shapes/svg?seed=vendor`;
  if (url.startsWith('http')) return url;
  return `${url}`;
};

interface ExploreTabProps {
  onSoloOrder: (data: any) => void;
  onHostLock: () => void;
  onOpenVendor: (restaurant: any) => void;
}

export default function ExploreTab({ onSoloOrder, onOpenVendor }: ExploreTabProps) {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch('/api/consumer/explore');
        const data = await res.json();
        if (res.ok) setVendors(data.vendors || []);
      } catch (err) {
        console.error('Error fetching vendors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const restaurant = selectedRestaurant
    ? (vendors || []).find(r => r.id === selectedRestaurant)
    : null;

  const cartTotal = (cart || []).reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = (prev || []).find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c =>
          c.item.id === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...(prev || []), { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = (prev || []).find(c => c.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(c =>
          c.item.id === itemId
            ? { ...c, quantity: c.quantity - 1 }
            : c
        );
      }
      return (prev || []).filter(c => c.item.id !== itemId);
    });
  };

  const handleCheckout = () => {
    if (!cart || cart.length === 0) return;
    if (restaurant?.status === 'OFFLINE') return;

    const serviceFee = 10;
    onSoloOrder({
      restaurant,
      cart,
      total: cartTotal,
      serviceFee,
      discountedTotal: Math.round(cartTotal * 0.6) + serviceFee,
    });
  };

  const handleOpenVendorProfile = (restaurant: any) => {
    onOpenVendor(restaurant);
  };

  // Restaurant Grid View
  if (!selectedRestaurant) {
    return (
      <div className="min-h-screen bg-sneaker-white pt-4 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-extrabold text-3xl text-deep-charcoal uppercase tracking-tight">
            Explore
          </h1>
          <p className="text-cool-gray text-sm font-body">Discover campus favorites</p>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-cool-gray font-bold uppercase">Loading Vendors...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-24">
            {(vendors || []).map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOpenVendorProfile(restaurant)}
                className="brutal-card brutal-card-hover overflow-hidden cursor-pointer"
              >
                <div className="relative h-28">
                  <img
                    src={getImageUrl(restaurant.image)}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${restaurant.name}`; }}
                  />
                  {restaurant.activeLocks > 5 && (
                    <div className="absolute top-2 left-2 live-badge text-[10px] py-0.5">
                      <Flame className="w-3 h-3" />
                      {restaurant.activeLocks} Active Sawas
                    </div>
                  )}
                  {/* On Lock Badge */}
                  {restaurant.isOnLock && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-volt-green text-deep-charcoal rounded-pill text-[10px] font-display font-bold border border-deep-charcoal">
                      ON SAWA
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-display font-bold text-sm text-deep-charcoal truncate">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-volt-green text-volt-green" />
                      <span className="text-xs font-body">{parseFloat(restaurant.rating?.toString() || '0').toFixed(1)}</span>
                    </div>
                    <span className="text-cool-gray text-xs">•</span>
                    <span className="text-xs text-cool-gray flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {restaurant.deliveryTime}
                    </span>
                  </div>
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mt-2">
                    {restaurant.status === 'LIVE' && (
                      <span className="flex items-center gap-1 text-[10px] font-display font-bold text-volt-green bg-volt-green/10 px-2 py-0.5 rounded-full border border-volt-green/30">
                        <span className="w-1.5 h-1.5 bg-volt-green rounded-full animate-pulse" />LIVE
                      </span>
                    )}
                    {restaurant.status === 'SWAMPED' && (
                      <span className="flex items-center gap-1 text-[10px] font-display font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />SWAMPED
                      </span>
                    )}
                    {restaurant.status === 'OFFLINE' && (
                      <span className="flex items-center gap-1 text-[10px] font-display font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />OFFLINE
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Restaurant Menu View (Legacy - now handled by VendorProfile)
  return (
    <div className="min-h-screen bg-sneaker-white">
      {/* Menu Header */}
      <div className="relative h-48 bg-deep-charcoal">
        <img
          src={getImageUrl(restaurant?.image)}
          alt={restaurant?.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal to-transparent" />

        <button
          onClick={() => setSelectedRestaurant(null)}
          title="Back to Explore"
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full border-2 border-deep-charcoal flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-display font-extrabold text-2xl text-white mb-1">
            {restaurant?.name}
          </h1>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-volt-green text-volt-green" />
              {restaurant?.rating}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {restaurant?.deliveryTime}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 pb-32">
        <h2 className="font-display font-bold text-lg uppercase text-deep-charcoal mb-4">
          Menu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(restaurant?.menuItems || []).map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`brutal-card p-3 ${item.isLocked ? 'opacity-70' : 'brutal-card-hover'}`}
            >
              <div className="flex gap-3">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-deep-charcoal"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${item.name}`; }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-deep-charcoal">
                        {item.name}
                      </h3>
                      <p className="text-xs text-cool-gray mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Velvet Rope - Locked Item */}
                    {item.isLocked && (
                      <div className="flex flex-col items-end">
                        <div className="w-8 h-8 bg-deep-charcoal rounded-full flex items-center justify-center mb-1">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display font-bold text-lg">{item.price} EGP</span>

                    {item.isLocked ? (
                      <div className="text-right">
                        <p className="text-xs font-display text-electric-red">
                          Requires Hype Level {item.requiredHypeLevel}
                        </p>
                        <p className="text-[10px] text-cool-gray">
                          Host {item.requiredHypeLevel - Math.floor(500 / 200)} more Sawas to unlock
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {cart.find(c => c.item.id === item.id) ? (
                          <div className="flex items-center gap-2 bg-volt-green rounded-pill border-2 border-deep-charcoal px-2 py-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              title="Remove from cart"
                              className="w-6 h-6 flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-display font-bold">
                              {cart.find(c => c.item.id === item.id)?.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              title="Add to cart"
                              className="w-6 h-6 flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => addToCart(item)}
                            title="Add to cart"
                            className="w-10 h-10 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center"
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-5 h-5" />
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-20 left-4 right-4 bg-white border-2 border-deep-charcoal rounded-sticker shadow-brutal p-4 z-40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-volt-green rounded-lg border-2 border-deep-charcoal flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg">{cartTotal} EGP</p>
                  <p className="text-xs text-cool-gray">{cart.reduce((sum, c) => sum + c.quantity, 0)} items</p>
                </div>
              </div>
              <motion.button
                onClick={handleCheckout}
                className="brutal-btn-primary"
                whileTap={{ scale: 0.95 }}
              >
                Checkout
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
