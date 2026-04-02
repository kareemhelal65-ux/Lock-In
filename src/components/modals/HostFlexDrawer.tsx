import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Crown, Wallet, Gift, Users, Sparkles } from 'lucide-react';

interface HostFlexDrawerProps {
  userShare: number;
  safeTotal: number;
  participantCount: number;
  onPayShare: () => Promise<void> | void;
  onCoverLock: () => Promise<void> | void;
  onClose: () => void;
}

export default function HostFlexDrawer({
  userShare,
  safeTotal,
  participantCount,
  onPayShare,
  onCoverLock,
  onClose
}: HostFlexDrawerProps) {
  const coverAmount = safeTotal;
  const [isLoading, setIsLoading] = useState<'cover' | 'share' | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col md:items-center p-0 md:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-charcoal/90 backdrop-blur-sm"
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
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-volt-green" />
          <h2 className="font-display font-extrabold text-2xl uppercase">
            HOST FLEX
          </h2>
        </div>
        <p className="text-cool-gray text-sm mt-1">
          You're the host. Show them how it's done.
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

        <div className="p-4">
          {/* Stats */}
          <div className="brutal-card p-4 mb-4 bg-volt-green/10 border-volt-green">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-cool-gray">Your Share</span>
              <span className="font-display font-bold">{userShare} EGP</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-cool-gray">Total Lock Value</span>
              <span className="font-display font-extrabold text-xl">{safeTotal} EGP</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-cool-gray">Crew Size</span>
              <span className="font-display font-bold flex items-center gap-1">
                <Users className="w-4 h-4" />
                {participantCount}
              </span>
            </div>
          </div>

          {/* The Flex Option */}
          <motion.button
            onClick={async () => {
              if (isLoading) return;
              setIsLoading('cover');
              await onCoverLock();
            }}
            disabled={!!isLoading}
            className={`w-full brutal-card p-5 mb-3 border-electric-red text-white brutal-card-hover transition-all ${isLoading === 'cover' ? 'bg-electric-red opacity-80' : 'bg-gradient-to-r from-electric-red to-red-600'} ${isLoading && isLoading !== 'cover' ? 'opacity-50 grayscale' : ''}`}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                {isLoading === 'cover' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <div className="w-6 h-6 border-4 border-t-white border-white/20 rounded-full" />
                  </motion.div>
                ) : (
                  <Gift className="w-8 h-8" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-display font-extrabold text-xl uppercase">
                  {isLoading === 'cover' ? 'PROCESSING...' : 'COVER THE LOCK'}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Pay {coverAmount} EGP for everyone
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-white/60">
                  <Sparkles className="w-3 h-3" />
                  <span>They'll owe you their life</span>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Standard Option */}
          <motion.button
            onClick={async () => {
              if (isLoading) return;
              setIsLoading('share');
              await onPayShare();
            }}
            disabled={!!isLoading}
            className={`w-full brutal-card p-4 flex items-center gap-4 brutal-card-hover ${isLoading === 'share' ? 'bg-gray-100' : ''} ${isLoading && isLoading !== 'share' ? 'opacity-50 grayscale' : ''}`}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            <div className="w-12 h-12 bg-deep-charcoal rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              {isLoading === 'share' ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <div className="w-5 h-5 border-4 border-t-volt-green border-white/20 rounded-full" />
                </motion.div>
              ) : (
                <Wallet className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-display font-bold">
                {isLoading === 'share' ? 'PROCESSING...' : 'PAY MY SHARE'}
              </h3>
              <p className="text-cool-gray text-sm">
                Just pay for your own order
              </p>
            </div>
            <span className="font-display font-extrabold text-xl">{userShare} EGP</span>
          </motion.button>
        </div>

      </motion.div>
    </motion.div>
  );
}
