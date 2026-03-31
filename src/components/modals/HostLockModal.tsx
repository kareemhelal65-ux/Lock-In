import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Link2, Users, Search, Loader2, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

// Helper to fix relative image URLs from backend
const getImageUrl = (url?: string) => {
  if (!url) return `https://api.dicebear.com/7.x/shapes/svg?seed=vendor`;
  if (url.startsWith('http')) return url;
  return `${url}`;
};

interface HostLockModalProps {
  onClose: () => void;
  onHost: (restaurantId: string, timer: number, inviteMode: 'app' | 'link', serverSafeId?: string) => void;
}

const timerOptions = [
  { value: 300, label: '5 min', emoji: '⚡' },
  { value: 600, label: '10 min', emoji: '🔥' },
  { value: 900, label: '15 min', emoji: '⏰' },
];

export default function HostLockModal({ onClose, onHost }: HostLockModalProps) {
  const { currentUser } = useApp();
  const [step, setStep] = useState<'restaurant' | 'timer' | 'invite' | 'friends'>('restaurant');
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedTimer, setSelectedTimer] = useState<number>(600);

  // Friends state
  const [friends, setFriends] = useState<any[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<Set<string>>(new Set());
  const [inviteSent, setInviteSent] = useState(false);
  const [sendingInvites, setSendingInvites] = useState(false);

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

  const fetchFriends = async () => {
    if (!currentUser?.id) return;
    setLoadingFriends(true);
    try {
      const res = await fetch(`/api/consumer/${currentUser.id}/friends`);
      const data = await res.json();
      if (res.ok) setFriends(data.friends || []);
    } catch (err) {
      console.error('Error fetching friends', err);
    } finally {
      setLoadingFriends(false);
    }
  };

  const handleRestaurantSelect = (id: string, status?: string) => {
    if (status === 'OFFLINE') return;
    setSelectedRestaurant(id);
    setStep('timer');
  };

  const handleTimerSelect = () => {
    setStep('invite');
  };

  const handleInviteViaApp = async () => {
    // First create the lock/safe then go to friend selection
    await fetchFriends();
    setStep('friends');
  };

  const handleHost = (mode: 'app' | 'link', serverSafeId?: string) => {
    if (selectedRestaurant) {
      onHost(selectedRestaurant, selectedTimer, mode, serverSafeId);
    }
  };

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev => {
      const next = new Set(prev);
      if (next.has(friendId)) next.delete(friendId);
      else next.add(friendId);
      return next;
    });
  };

  const handleSendInvites = async () => {
    if (selectedFriends.size === 0 || !currentUser?.id) return;
    setSendingInvites(true);
    try {
      // 1. Create the safe on the server first so we have a real safeId
      const safeId = `safe-${Date.now()}`;
      const vendorData = vendors.find(v => v.id === selectedRestaurant);
      const restaurantName = vendorData?.name || 'Restaurant';
      const hostName = currentUser.name || currentUser.username || 'Host';

      await fetch('/api/consumer/safes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: safeId,
          hostId: currentUser.id,
          hostName,
          restaurantId: selectedRestaurant,
          restaurantName,
          targetAmount: selectedFriends.size + 1,
          timeRemaining: selectedTimer,
          expiresAt: new Date(Date.now() + selectedTimer * 1000).toISOString()
        })
      });

      // 2. Send invite notification to each selected friend with safeId
      for (const friendId of Array.from(selectedFriends)) {
        await fetch(`/api/consumer/friends/invite`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromUserId: currentUser.id,
            toUserId: friendId,
            vendorId: selectedRestaurant,
            safeId,
            restaurantName,
            hostName,
            senderName: hostName,
            message: `${hostName} invited you to join their Sawa at ${restaurantName}!`
          })
        });
      }
      setInviteSent(true);
      setTimeout(() => {
        handleHost('app', safeId);
      }, 1500);
    } catch (err) {
      console.error('Error sending invites', err);
      // Proceed anyway
      handleHost('app');
    } finally {
      setSendingInvites(false);
    }
  };

  const filteredVendors = vendors.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedVendorData = vendors.find(v => v.id === selectedRestaurant);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col md:items-center p-0 md:p-4"
    >
      <div className="absolute inset-0 bg-deep-charcoal/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bottom-sheet overflow-hidden"
      >
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-deep-charcoal/20 rounded-full" />
        </div>

        <div className="px-4 pb-4 border-b-2 border-deep-charcoal/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-2xl uppercase">
              {step === 'restaurant' ? 'Order Sawa' : step === 'timer' ? 'Set Timer' : step === 'invite' ? 'Invite Crew' : 'Select Friends'}
            </h2>
            <button onClick={onClose} className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-cool-gray text-sm mt-1">
            {step === 'restaurant' ? 'Choose where to order from' : step === 'timer' ? 'How long should the hub stay active?' : step === 'invite' ? 'How do you want to invite your friends?' : 'Pick friends to invite to your Sawa'}
          </p>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 'restaurant' ? (
              <motion.div key="restaurant" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-gray" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 border-2 border-deep-charcoal/10 rounded-xl py-3 pl-10 pr-4 font-body text-sm focus:border-volt-green transition-colors"
                  />
                </div>

                {loading ? (
                  <div className="flex flex-col items-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-volt-green mb-2" />
                    <p className="text-xs text-cool-gray font-bold uppercase">Loading Vendors...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredVendors.map((restaurant, index) => {
                      const isOffline = restaurant.status === 'OFFLINE';
                      return (
                        <motion.button
                          key={restaurant.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => handleRestaurantSelect(restaurant.id, restaurant.status)}
                          disabled={isOffline}
                          className={`w-full brutal-card p-3 flex items-center gap-3 text-left transition-all ${isOffline ? 'opacity-50 grayscale cursor-not-allowed' : 'brutal-card-hover'}`}
                        >
                          <img src={getImageUrl(restaurant.image)} alt={restaurant.name} className="w-14 h-14 rounded-lg object-cover border-2 border-deep-charcoal" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-display font-bold text-sm">{restaurant.name}</h3>
                              {isOffline && <span className="text-[9px] bg-gray-200 px-1.5 py-0.5 rounded border border-gray-300 font-bold">OFFLINE</span>}
                            </div>
                            <p className="text-[10px] text-cool-gray flex items-center gap-2 mt-1 font-bold">
                              <span>⭐ {parseFloat(restaurant.rating || '0').toFixed(1)}</span>
                              <span>•</span>
                              <span>🕒 {restaurant.deliveryTime}</span>
                            </p>
                          </div>
                          {!isOffline && <ChevronRight className="w-4 h-4 text-cool-gray" />}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : step === 'timer' ? (
              <motion.div key="timer" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="brutal-card p-3 bg-volt-green/10 border-volt-green flex items-center gap-3">
                  <img src={getImageUrl(selectedVendorData?.image)} className="w-10 h-10 rounded-lg object-cover border-2 border-deep-charcoal" />
                  <div className="flex-1">
                    <p className="text-[10px] text-cool-gray uppercase font-black">Selected Vendor</p>
                    <h3 className="font-display font-bold truncate">{selectedVendorData?.name}</h3>
                  </div>
                  <button onClick={() => setStep('restaurant')} className="text-[10px] text-electric-red font-display underline font-black">Change</button>
                </div>

                <div className="space-y-3">
                  <p className="font-display font-black text-xs uppercase text-deep-charcoal/60">Select Sawa Duration</p>
                  {timerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTimer(option.value)}
                      className={`w-full brutal-card p-4 flex items-center gap-4 text-left transition-all ${selectedTimer === option.value ? 'bg-volt-green border-deep-charcoal shadow-none translate-x-1 translate-y-1' : 'brutal-card-hover'}`}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-display font-bold">{option.label}</h3>
                        <p className="text-[10px] font-bold text-cool-gray/80">{option.value === 300 ? 'Quick Sawa' : option.value === 600 ? 'Standard Sawa' : 'Relaxed Sawa'}</p>
                      </div>
                      {selectedTimer === option.value && <div className="w-5 h-5 bg-deep-charcoal rounded-full flex items-center justify-center"><CheckCircle className="w-3 h-3 text-volt-green" /></div>}
                    </button>
                  ))}
                </div>

                <button onClick={handleTimerSelect} className="w-full brutal-btn-primary py-4 text-lg mt-2">NEXT: INVITE CREW</button>
              </motion.div>
            ) : step === 'invite' ? (
              <motion.div key="invite" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={handleInviteViaApp} className="brutal-card brutal-card-hover p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-volt-green rounded-2xl border-2 border-deep-charcoal flex items-center justify-center">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xl uppercase">Invite Friends</h3>
                      <p className="text-xs text-cool-gray font-bold mt-1">Select friends already on the app</p>
                    </div>
                  </button>

                  <button onClick={() => handleHost('link')} className="brutal-card brutal-card-hover p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-deep-charcoal rounded-2xl border-2 border-deep-charcoal flex items-center justify-center">
                      <Link2 className="w-8 h-8 text-volt-green" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xl uppercase">Share Invite Link</h3>
                      <p className="text-xs text-cool-gray font-bold mt-1">Invite friends outside the app via WhatsApp or link</p>
                    </div>
                  </button>
                </div>

                <div className="bg-gray-50 border-2 border-dashed border-deep-charcoal/20 p-4 rounded-xl text-center">
                  <p className="text-[10px] font-bold text-cool-gray uppercase">Group Order Service Fee</p>
                  <p className="font-display font-black text-lg text-deep-charcoal">5 EGP PER MEMBER</p>
                </div>

                <button onClick={() => setStep('timer')} className="w-full py-2 text-cool-gray font-display font-bold uppercase text-xs underline">Go Back</button>
              </motion.div>
            ) : (
              // Step: friends - show real friend list
              <motion.div key="friends" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {inviteSent ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-deep-charcoal" />
                    </div>
                    <h3 className="font-display font-black text-xl uppercase text-deep-charcoal">Invites Sent!</h3>
                    <p className="text-cool-gray text-sm font-bold mt-1">Starting your Sawa...</p>
                  </div>
                ) : loadingFriends ? (
                  <div className="flex flex-col items-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-volt-green mb-2" />
                    <p className="text-xs text-cool-gray font-bold uppercase">Loading Friends...</p>
                  </div>
                ) : friends.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-cool-gray mx-auto mb-3" />
                    <h3 className="font-display font-black text-lg text-deep-charcoal uppercase">No Friends Yet</h3>
                    <p className="text-cool-gray text-sm mt-1">Add friends in the Vault tab first</p>
                    <button onClick={() => handleHost('app')} className="mt-4 brutal-btn-primary py-3 px-6">Start Sawa Anyway</button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-bold text-cool-gray uppercase tracking-wider">Select friends to invite</p>
                    <div className="space-y-2">
                      {friends.map((friend: any) => {
                        const isSelected = selectedFriends.has(friend.id);
                        return (
                          <motion.button
                            key={friend.id}
                            onClick={() => toggleFriendSelection(friend.id)}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full brutal-card p-3 flex items-center gap-3 text-left transition-all ${isSelected ? 'border-volt-green bg-volt-green/10' : 'brutal-card-hover'}`}
                          >
                            <img
                              src={friend.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.username}`}
                              alt={friend.name}
                              className="w-10 h-10 rounded-full border-2 border-deep-charcoal"
                            />
                            <div className="flex-1">
                              <p className="font-display font-bold text-sm">{friend.name}</p>
                              <p className="text-xs text-cool-gray">@{friend.username}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-volt-green' : 'bg-white'}`}>
                              {isSelected && <Check className="w-4 h-4 text-deep-charcoal" />}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={handleSendInvites}
                        disabled={selectedFriends.size === 0 || sendingInvites}
                        className={`w-full brutal-btn-primary py-4 text-lg ${(selectedFriends.size === 0 || sendingInvites) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {sendingInvites ? (
                          <><Loader2 className="w-5 h-5 inline mr-2 animate-spin" />Sending Invites...</>
                        ) : (
                          `SEND INVITE${selectedFriends.size > 1 ? 'S' : ''} (${selectedFriends.size} friend${selectedFriends.size !== 1 ? 's' : ''})`
                        )}
                      </button>
                      <button onClick={() => handleHost('app')} className="w-full py-2 text-cool-gray font-display font-bold uppercase text-xs underline">Skip & Start Sawa</button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
