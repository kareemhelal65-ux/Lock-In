import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Gift, CheckCircle2 } from 'lucide-react';
import { friends } from '@/data/mockData';
import type { MenuItem } from '@/types';

interface CrewSheetProps {
  item: MenuItem;
  onClose: () => void;
  onSelectFriend: (friendId: string, friendName: string) => void;
}

export default function CrewSheet({ item, onClose, onSelectFriend }: CrewSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFriendData = friends.find(f => f.id === selectedFriend);

  const handleConfirm = () => {
    if (selectedFriend && selectedFriendData) {
      onSelectFriend(selectedFriend, selectedFriendData.name);
    }
  };

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
        className="bottom-sheet max-h-[85vh]"
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
                Send Gift
              </h2>
              <p className="text-cool-gray text-sm mt-1">
                Who's getting {item.name}?
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

        {/* Item Preview */}
        <div className="px-4 py-3 bg-volt-green/10 border-b border-volt-green/30">
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover border-2 border-deep-charcoal"
            />
            <div>
              <p className="font-display font-bold text-sm">{item.name}</p>
              <p className="text-xs text-cool-gray">{item.price} EGP</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cool-gray" />
            <input
              type="text"
              placeholder="Search your crew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-deep-charcoal rounded-pill font-body text-sm focus:outline-none focus:border-volt-green"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="px-4 pb-4 overflow-y-auto max-h-[40vh]">
          <div className="space-y-2">
            {filteredFriends.map((friend, index) => (
              <motion.button
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedFriend(friend.id)}
                className={`w-full brutal-card p-3 flex items-center gap-3 text-left transition-all ${selectedFriend === friend.id
                    ? 'border-volt-green bg-volt-green/10'
                    : 'brutal-card-hover'
                  }`}
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full border-2 border-deep-charcoal"
                />
                <div className="flex-1">
                  <p className="font-display font-bold">{friend.name}</p>
                  <p className="text-xs text-cool-gray">Usually orders fast</p>
                </div>
                {selectedFriend === friend.id && (
                  <div className="w-8 h-8 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t-2 border-deep-charcoal/10">
          <motion.button
            onClick={handleConfirm}
            disabled={!selectedFriend}
            className={`w-full py-4 rounded-pill font-display font-bold uppercase text-lg border-2 border-deep-charcoal transition-all ${selectedFriend
                ? 'bg-volt-green text-deep-charcoal shadow-brutal-sm'
                : 'bg-gray-200 text-cool-gray border-gray-300'
              }`}
            whileTap={selectedFriend ? { scale: 0.95 } : {}}
          >
            <Gift className="w-5 h-5 inline mr-2" />
            {selectedFriend && selectedFriendData
              ? `GIFT TO ${selectedFriendData.name.toUpperCase()} (${item.price} EGP)`
              : 'SELECT A FRIEND'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
