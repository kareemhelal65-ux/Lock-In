import { motion } from 'framer-motion';
import { X, Lock, User, Users, Zap, ChevronRight } from 'lucide-react';
import type { Order } from '@/types';

interface CopThisForkProps {
  order: Order;
  onClose: () => void;
  onStartLock: () => void;
  onSoloCop: () => void;
}

export default function CopThisFork({
  order,
  onClose,
  onStartLock,
  onSoloCop
}: CopThisForkProps) {
  const discountedTotal = Math.round(order.total * 0.6);
  const savings = order.total - discountedTotal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col md:items-center p-0 md:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-charcoal/80 backdrop-blur-sm"
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

        {/* Header */}
        <div className="px-4 pb-4 border-b-2 border-deep-charcoal/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-2xl uppercase">
              Cop This Order
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-cool-gray text-sm mt-1">
            Choose how you want to lock in
          </p>
        </div>

        {/* Order Preview */}
        <div className="px-4 py-3 bg-volt-green/10 border-b border-volt-green/30">
          <div className="flex items-center gap-3">
            <img
              src={order.userAvatar}
              alt={order.userName}
              className="w-10 h-10 rounded-full border-2 border-deep-charcoal"
            />
            <div>
              <p className="font-display font-bold text-sm">{order.userName}'s Order</p>
              <p className="text-xs text-cool-gray">{order.restaurantName}</p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-4 space-y-4">
          {/* Option 1: Start a Lock (Recommended) */}
          <motion.button
            onClick={onStartLock}
            className="w-full brutal-card p-5 border-electric-red bg-gradient-to-r from-electric-red/10 to-transparent brutal-card-hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-electric-red rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-extrabold text-lg uppercase">
                    START A LOCK
                  </h3>
                  <span className="live-badge text-[10px] py-0">
                    <Zap className="w-3 h-3" />
                    SAVE {savings} EGP
                  </span>
                </div>
                <p className="text-sm text-cool-gray mb-2">
                  Generate a new Safe with this item pre-carted
                </p>
                <div className="flex items-center gap-2">
                  <span className="line-through text-cool-gray text-sm">{order.total} EGP</span>
                  <span className="font-display font-extrabold text-xl text-volt-green">
                    {discountedTotal} EGP
                  </span>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-electric-red self-center" />
            </div>
          </motion.button>

          {/* Option 2: Solo Cop */}
          <motion.button
            onClick={onSoloCop}
            className="w-full brutal-card p-4 flex items-center gap-4 opacity-60"
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gray-400 rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-display font-bold text-gray-500">
                SOLO COP
              </h3>
              <p className="text-xs text-gray-400">
                Pay full price. No discount.
              </p>
            </div>
            <span className="font-display font-bold text-gray-500">
              {order.total + 10} EGP
            </span>
          </motion.button>
        </div>

        {/* Warning */}
        <div className="px-4 pb-6">
          <div className="brutal-card p-3 bg-electric-red/10 border-electric-red/30">
            <p className="text-xs text-electric-red text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Starting a Lock saves you {savings} EGP and brings the crew
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
