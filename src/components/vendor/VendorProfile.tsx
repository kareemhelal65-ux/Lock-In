import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Clock,
  Flame,
  Lock,
  Plus,
  Minus,
  MapPin,
  Zap,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Restaurant, MenuItem, SelectedChoice } from '@/types';
import ItemOptionsModal from '@/components/modals/ItemOptionsModal';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface VendorProfileProps {
  restaurant: Restaurant;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onCheckout: (cartData: any) => void;
}

export default function VendorProfile({
  restaurant,
  onClose,
  onAddToCart,
  onCheckout
}: VendorProfileProps) {
  const { vendorsOnLock, toggleVendorOnLock } = useApp();
  const isOnFeed = vendorsOnLock.includes(restaurant.id);
  const [cart, setCart] = useState<{ id: string; item: MenuItem; quantity: number; selectedChoices: SelectedChoice[]; specialNotes: string }[]>([]);
  const [itemWithOptions, setItemWithOptions] = useState<MenuItem | null>(null);


  const handleToggleOnLock = () => {
    toggleVendorOnLock(restaurant.id);
  };

  const addToCart = (item: MenuItem) => {
    setItemWithOptions(item);
  };

  const confirmAddToCart = (item: MenuItem, selectedChoices: SelectedChoice[], specialNotes: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(c =>
        c.item.id === item.id &&
        JSON.stringify(c.selectedChoices) === JSON.stringify(selectedChoices) &&
        c.specialNotes === specialNotes
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], quantity: updated[existingIdx].quantity + 1 };
        return updated;
      }
      return [...prev, { id: generateId(), item, quantity: 1, selectedChoices, specialNotes }];
    });
    onAddToCart(item);
  };

  const removeFromCart = (itemId: string, selectedChoices: SelectedChoice[] = [], specialNotes: string = '') => {
    setCart(prev => {
      const existingIdx = prev.findIndex(c =>
        c.item.id === itemId &&
        JSON.stringify(c.selectedChoices) === JSON.stringify(selectedChoices) &&
        c.specialNotes === specialNotes
      );
      if (existingIdx !== -1) {
        if (prev[existingIdx].quantity > 1) {
          const updated = [...prev];
          updated[existingIdx] = { ...updated[existingIdx], quantity: updated[existingIdx].quantity - 1 };
          return updated;
        }
        return prev.filter((_, idx) => idx !== existingIdx);
      }
      return prev;
    });
  };

  const handleCheckout = () => {
    if (restaurant.status === 'OFFLINE') return;

    if (cart.length === 0) return;

    const total = cart.reduce((sum, { item, quantity, selectedChoices }) => {
      const addonsPrice = selectedChoices.reduce((s, c) => s + (c.option.price || 0), 0);
      return sum + ((item.price + addonsPrice) * quantity);
    }, 0);

    const soloServiceFee = 10;

    onCheckout({
      restaurant,
      cart: cart.map(c => ({
        item: c.item,
        quantity: c.quantity,
        modifiers: JSON.stringify(c.selectedChoices),
        specialNotes: c.specialNotes
      })),
      total: total,
      serviceFee: soloServiceFee,
      discountedTotal: total
    });
  };

  const cartItemCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const cartTotalAmount = cart.reduce((sum, c) => {
    const addonsPrice = c.selectedChoices.reduce((s, ch) => s + (ch.option.price || 0), 0);
    return sum + ((c.item.price + addonsPrice) * c.quantity);
  }, 0);

  const isOffline = restaurant.status === 'OFFLINE';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-sneaker-white flex flex-col"
    >
      {/* Header Image */}
      <div className="relative h-56">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/50 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full border-2 border-deep-charcoal flex items-center justify-center z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vendor Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display font-extrabold text-3xl mb-1">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-volt-green text-volt-green" />
                  {restaurant.rating}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {restaurant.deliveryTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Campus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-b-2 border-deep-charcoal/10">
        <div className="flex items-center justify-end">

          <motion.button
            onClick={handleToggleOnLock}
            className={`px-6 py-3 rounded-pill font-display font-bold uppercase text-sm border-2 border-deep-charcoal transition-all ${isOnFeed
              ? 'bg-volt-green text-deep-charcoal'
              : 'bg-deep-charcoal text-white shadow-brutal-sm'
              }`}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOnFeed ? (
                <motion.span
                  key="on-lock"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  ON FEED
                </motion.span>
              ) : (
                <motion.span
                  key="put-on-lock"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  + PIN TO FEED
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {isOnFeed && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-volt-green mt-2"
          >
            <Flame className="w-3 h-3 inline mr-1" />
            Their Flash Drops will be pinned to your Feed
          </motion.p>
        )}
      </div>


      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <h2 className="font-display font-bold text-lg uppercase text-deep-charcoal mb-4">
          Menu
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {restaurant.menu?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`brutal-card p-3 ${item.isLocked ? 'opacity-70' : 'brutal-card-hover'}`}
            >
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-deep-charcoal"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-deep-charcoal">
                        {item.name}
                      </h3>
                      <p className="text-xs text-cool-gray line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {item.isLocked && (
                      <div className="w-8 h-8 bg-deep-charcoal rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display font-bold">{item.price} EGP</span>

                    {item.isLocked ? (
                      <div className="text-right">
                        <p className="text-xs font-display text-electric-red">
                          Requires Hype Level {item.requiredHypeLevel}
                        </p>
                      </div>
                    ) : !item.inStock ? (
                      <div className="bg-electric-red/10 border-2 border-electric-red px-3 py-1 rounded-pill">
                        <span className="text-[10px] font-display font-black text-electric-red uppercase tracking-widest">
                          Sold Out
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                          {cart.filter(c => c.item.id === item.id).length > 0 ? (
                          <div className="flex items-center gap-2 bg-volt-green rounded-pill border-2 border-deep-charcoal px-2 py-1">
                            <button
                              onClick={() => {
                                const variant = cart.find(c => c.item.id === item.id);
                                if (variant) removeFromCart(item.id, variant.selectedChoices, variant.specialNotes);
                              }}
                              className="w-8 h-8 flex items-center justify-center"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="font-display font-bold w-4 text-center">
                              {cart.filter(c => c.item.id === item.id).reduce((sum, c) => sum + c.quantity, 0)}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 flex items-center justify-center"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => addToCart(item)}
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
        {cartItemCount > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-4 right-4 bg-white border-2 border-deep-charcoal rounded-sticker shadow-brutal p-4 z-40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-volt-green rounded-lg border-2 border-deep-charcoal flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg">{cartTotalAmount} EGP</p>
                  <p className="text-xs text-cool-gray">{cartItemCount} items</p>
                </div>
              </div>
              <motion.button
                onClick={handleCheckout}
                disabled={isOffline}
                className={`brutal-btn-primary ${isOffline ? 'opacity-50 cursor-not-allowed bg-cool-gray' : ''}`}
                whileTap={!isOffline ? { scale: 0.95 } : undefined}
              >
                {isOffline ? 'Vendor Offline' : 'Checkout'}
                {!isOffline && <ChevronRight className="w-4 h-4 ml-1" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ItemOptionsModal
        isOpen={!!itemWithOptions}
        onClose={() => setItemWithOptions(null)}
        item={itemWithOptions}
        onConfirm={(choices, notes) => itemWithOptions && confirmAddToCart(itemWithOptions, choices, notes)}
      />
    </motion.div>
  );
}
