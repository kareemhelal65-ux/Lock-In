import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';

interface ArsenalDrawerProps {
  onClose: () => void;
}

export default function ArsenalDrawer({
  onClose
}: ArsenalDrawerProps) {
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
            <div>
              <h2 className="font-display font-extrabold text-2xl uppercase">
                Deploy Cards
              </h2>
              <p className="text-cool-gray text-sm mt-1">
                Activate power-ups for your squad
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="p-4 space-y-4">
          <div className="brutal-card p-8 bg-gray-50 border-gray-200 text-center">
            <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-display font-bold text-gray-400 uppercase">No active perks available</p>
            <p className="text-xs text-gray-400 mt-1">Unlock perks by increasing your Hype Score!</p>
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pb-6">
          <div className="brutal-card p-3 bg-deep-charcoal/5">
            <p className="text-xs text-cool-gray">
              <Zap className="w-3 h-3 inline mr-1" />
              Deployed cards are visible to all squad members and activate during checkout.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
