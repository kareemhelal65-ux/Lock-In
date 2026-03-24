import { motion } from 'framer-motion';
import { X, Sparkles, Users, Zap, Info } from 'lucide-react';

interface ArsenalDrawerProps {
  mysteryCopCards: number;
  squadSpinnerCards: number;
  onDeploy: (cardType: 'mystery-cop' | 'squad-spinner') => void;
  onClose: () => void;
}

export default function ArsenalDrawer({
  mysteryCopCards,
  squadSpinnerCards,
  onDeploy,
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
          {/* Mystery Cop Card */}
          <motion.button
            onClick={() => mysteryCopCards > 0 && onDeploy('mystery-cop')}
            disabled={mysteryCopCards === 0}
            className={`w-full brutal-card p-4 flex items-center gap-4 text-left ${mysteryCopCards > 0
                ? 'brutal-card-hover border-electric-red'
                : 'opacity-50 border-gray-300'
              }`}
            whileTap={mysteryCopCards > 0 ? { scale: 0.98 } : {}}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-electric-red to-red-600 rounded-xl border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg">Mystery Cop</h3>
                <span className="px-2 py-0.5 bg-electric-red text-white rounded-pill text-xs font-display font-bold">
                  {mysteryCopCards} available
                </span>
              </div>
              <p className="text-sm text-cool-gray mt-1">
                Random discount: 5% - 20% off your order
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-electric-red">
                <Info className="w-3 h-3" />
                <span>All squad members benefit</span>
              </div>
            </div>
            {mysteryCopCards > 0 && (
              <div className="w-10 h-10 bg-electric-red rounded-full border-2 border-deep-charcoal flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            )}
          </motion.button>

          {/* Squad Spinner Card */}
          <motion.button
            onClick={() => squadSpinnerCards > 0 && onDeploy('squad-spinner')}
            disabled={squadSpinnerCards === 0}
            className={`w-full brutal-card p-4 flex items-center gap-4 text-left ${squadSpinnerCards > 0
                ? 'brutal-card-hover border-volt-green'
                : 'opacity-50 border-gray-300'
              }`}
            whileTap={squadSpinnerCards > 0 ? { scale: 0.98 } : {}}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-volt-green to-lime-500 rounded-xl border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-deep-charcoal" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg">Squad Spinner</h3>
                <span className="px-2 py-0.5 bg-volt-green text-deep-charcoal rounded-pill text-xs font-display font-bold">
                  {squadSpinnerCards} available
                </span>
              </div>
              <p className="text-sm text-cool-gray mt-1">
                Up to 10% off the entire lock total
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-volt-green">
                <Info className="w-3 h-3" />
                <span>All squad members benefit</span>
              </div>
            </div>
            {squadSpinnerCards > 0 && (
              <div className="w-10 h-10 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center">
                <Zap className="w-5 h-5 text-deep-charcoal" />
              </div>
            )}
          </motion.button>
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
