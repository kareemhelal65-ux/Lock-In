import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface PostCreationModalProps {
  onClose: () => void;
  onInviteSent: () => void;
  onGoToSafe?: () => void;
}

export default function PostCreationModal({ onClose, onInviteSent, onGoToSafe }: PostCreationModalProps) {
  const { currentUser } = useApp();
  const [pingedFriends, setPingedFriends] = useState<string[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [friendsLoaded, setFriendsLoaded] = useState(false);

  // Fetch real friends once on mount
  if (!friendsLoaded && currentUser?.id) {
    setFriendsLoaded(true);
    fetch(`/api/consumer/${currentUser.id}/friends`)
      .then(r => r.json())
      .then(d => setFriends(d.friends || []))
      .catch(() => setFriends([]))
      .finally(() => setLoadingFriends(false));
  }

  const handlePing = async (friendId: string) => {
    setPingedFriends(prev => [...prev, friendId]);
    if (currentUser?.id) {
      try {
        await fetch('/api/consumer/friends/invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromUserId: currentUser.id,
            toUserId: friendId,
            message: `${currentUser.name || currentUser.username} invited you to join their Sawa!`
          })
        });
      } catch { /* silent */ }
    }
  };

  const handleGoToSafe = () => {
    if (onGoToSafe) {
      onGoToSafe();
    } else {
      onInviteSent();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col md:items-center p-0 md:p-4"
    >
      <div className="absolute inset-0 bg-deep-charcoal/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bottom-sheet max-h-[90vh]"
      >
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-deep-charcoal/20 rounded-full" />
        </div>

        <div className="px-4 pb-4 border-b-2 border-deep-charcoal/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-extrabold text-2xl uppercase">Bring the Crew</h2>
              <p className="text-cool-gray text-sm mt-1">Your Sawa is live! Invite friends to join.</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="mb-2" />

          {/* Ping Real Friends */}
          <div className="mb-6">
            <p className="font-display font-bold text-sm uppercase text-deep-charcoal/60 mb-2">1-Tap Ping</p>
            {loadingFriends ? (
              <p className="text-cool-gray text-sm text-center py-4">Loading friends...</p>
            ) : friends.length === 0 ? (
              <p className="text-cool-gray text-sm text-center py-4">No friends yet. Add friends in your Profile!</p>
            ) : (
              <div className="space-y-2">
                {friends.slice(0, 5).map((friend: any, index: number) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="brutal-card p-3 flex items-center gap-3"
                  >
                    <img
                      src={friend.avatar || friend.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.username}`}
                      alt={friend.name || friend.username}
                      className="w-10 h-10 rounded-full border-2 border-deep-charcoal"
                    />
                    <div className="flex-1">
                      <p className="font-display font-bold text-sm">{friend.name || friend.username}</p>
                      <p className="text-xs text-cool-gray">@{friend.username}</p>
                    </div>
                    <AnimatePresence mode="wait">
                      {pingedFriends.includes(friend.id) ? (
                        <motion.div key="pinged" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          className="px-3 py-1 bg-volt-green rounded-pill font-display font-bold text-xs">
                          PINGED!
                        </motion.div>
                      ) : (
                        <motion.button key="ping" initial={{ scale: 1 }} exit={{ scale: 0 }}
                          onClick={() => handlePing(friend.id)}
                          className="brutal-btn-secondary text-xs py-2 px-3" whileTap={{ scale: 0.95 }}>
                          <Bell className="w-3 h-3 mr-1" />
                          PING
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-2" />
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-deep-charcoal/10 flex gap-3">
          <motion.button onClick={onClose} className="px-6 py-4 font-display font-bold uppercase text-sm border-2 border-black rounded-xl bg-white" whileTap={{ scale: 0.95 }}>
            Done
          </motion.button>
          <motion.button onClick={handleGoToSafe} className="flex-1 brutal-btn-primary py-4 flex items-center justify-center gap-2" whileTap={{ scale: 0.95 }}>
            <Lock className="w-5 h-5" />
            GO TO YOUR HUB
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
