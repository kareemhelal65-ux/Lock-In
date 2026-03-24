import { motion } from 'framer-motion';
import { X, Copy, ShoppingBag, Lock, Zap } from 'lucide-react';

interface CopOrderDrawerProps {
  order: {
    userName: string;
    userAvatar: string;
    restaurantName: string;
    items: any[];
    total: number;
  };
  onClose: () => void;
  onLockIn: () => void;
}

export default function CopOrderDrawer({ order, onClose, onLockIn }: CopOrderDrawerProps) {
  const discountedTotal = Math.round(order.total * 0.6);
  const savings = order.total - discountedTotal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col md:items-center p-0 md:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-charcoal/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bottom-sheet"
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-deep-charcoal/20 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-4 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-extrabold text-2xl uppercase">
              Cop This Order?
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Card */}
          <div className="brutal-card p-4 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={order.userAvatar}
                alt={order.userName}
                className="w-12 h-12 rounded-full border-2 border-deep-charcoal"
              />
              <div>
                <p className="font-display font-bold">{order.userName}'s Order</p>
                <p className="text-sm text-cool-gray">{order.restaurantName}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-cool-gray" />
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-display font-bold">{item.price * item.quantity} EGP</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-deep-charcoal/20 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-cool-gray text-sm">Original Total</span>
                <span className="font-display font-bold line-through text-cool-gray">
                  {order.total} EGP
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-volt-green font-display font-bold text-sm flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  With Lock Discount
                </span>
                <span className="font-display font-extrabold text-xl text-volt-green">
                  {discountedTotal} EGP
                </span>
              </div>
            </div>
          </div>

          {/* Savings Badge */}
          <div className="bg-volt-green/20 border-2 border-volt-green rounded-pill px-4 py-2 mb-4 text-center">
            <p className="font-display font-bold text-sm">
              You'll save {savings} EGP by locking in!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={onLockIn}
              className="w-full brutal-btn-primary py-4 text-lg"
              whileTap={{ scale: 0.95 }}
            >
              <Lock className="w-5 h-5 mr-2" />
              LOCK IT IN
            </motion.button>

            <motion.button
              onClick={onClose}
              className="w-full brutal-btn-secondary py-3"
              whileTap={{ scale: 0.95 }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Maybe Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
