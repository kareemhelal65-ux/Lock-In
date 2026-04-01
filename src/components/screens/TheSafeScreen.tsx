import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Plus,
  Minus,
  Share2,
  Zap,
  Lock,
  ChevronRight,
  Clock,
  Flame,
  Users
} from 'lucide-react';
import { restaurants as mockRestaurants } from '@/data/mockData';
import type { MenuItem } from '@/types';
import { useApp } from '@/context/AppContext';
import CheckoutSheet from '@/components/modals/CheckoutSheet';
import HostFlexDrawer from '@/components/modals/HostFlexDrawer';
import ItemOptionsModal from '@/components/modals/ItemOptionsModal';

interface TheSafeScreenProps {
  safeId: string;
  userRole?: 'host' | 'guest';
  onClose: () => void;
  onConfirm: () => void;
}

export default function TheSafeScreen({ safeId, userRole = 'guest', onClose, onConfirm }: TheSafeScreenProps) {
  const {
    currentUser,
    lockInUser,
    activeSafes,
    updateSafe
  } = useApp();

  const [inventory, setInventory] = useState<any[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentUser?.id) {
      fetch(`/api/consumer/user/${currentUser.id}/inventory`)
        .then(res => res.json())
        .then(data => setInventory(data.inventory || []));
    }
  }, [currentUser?.id]);

  const activateCard = async (userCardId: string) => {
    try {
      const res = await fetch('/api/consumer/user/activate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id, userCardId })
      });
      if (res.ok) {
        setActiveCardId(userCardId);
      }
    } catch (e) { console.error("Activation failed", e); }
  };

  const safe = activeSafes.find(s => s.id === safeId) || activeSafes[0];
  if (!safe) return null; // Guard against undefined safe
  
  const mockRestaurant = mockRestaurants.find(r => r.id === safe.restaurantId);
  // Host_Master_Key: Use server-provided role as authoritative source
  const isHost = userRole === 'host';

  const [timeRemaining, setTimeRemaining] = useState(safe.timeRemaining);
  const [myOrder, setMyOrder] = useState<{ item: MenuItem; quantity: number; selectedAddOns: any[]; specialNotes?: string }[]>([]);
  const [sharedItems, setSharedItems] = useState<{ item: MenuItem; includedUserIds: string[] }[]>([]);
  const [itemToSplit, setItemToSplit] = useState<MenuItem | null>(null);
  const [splitWith, setSplitWith] = useState<string[]>([]);
  const [cardSelectedAddOns, setCardSelectedAddOns] = useState<Record<string, any[]>>({});
  const [itemWithOptions, setItemWithOptions] = useState<MenuItem | null>(null);
  const [isSplitting, setIsSplitting] = useState(false);

  const [realRestaurant, setRealRestaurant] = useState<any>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        // First fetch the profile to get basic details if not available
        const profRes = await fetch(`/api/vendorData/${safe.restaurantId}/profile`);
        let profData = { vendor: { name: safe.restaurantName } };
        if (profRes.ok) profData = await profRes.json();

        const menuRes = await fetch(`/api/vendorData/${safe.restaurantId}/menu`);
        if (menuRes.ok) {
          const menuData = await menuRes.json();
          setRealRestaurant({
            ...profData.vendor,
            id: safe.restaurantId,
            menu: menuData.menuItems
          });
        }
      } catch (e) { console.error("Could not fetch real menu", e); }
    }
    fetchMenu();
  }, [safe.restaurantId]);
  const [showCopied, setShowCopied] = useState(false);
  const [hasLockedIn, setHasLockedIn] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOwedScreen, setShowOwedScreen] = useState(false);
  const [showHostFlex, setShowHostFlex] = useState(false);
  const [isHostCoverMode, setIsHostCoverMode] = useState(false);
  const [showHostSuccess, setShowHostSuccess] = useState(false);

  // Local countdown as a smooth fallback (server is authoritative via polling)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Polling mechanism to keep the safe in sync
  useEffect(() => {
    let isMounted = true;
    const pollSafe = async () => {
      if (!safeId) return;
      try {
        const url = `/api/consumer/safes/${safeId}` + (currentUser?.id ? `?userId=${currentUser.id}` : '');
        const res = await fetch(url);
        if (res.ok && isMounted) {
          const latestSafeData = await res.json();
          // Update context with the latest state (omitting timeRemaining to avoid visual jitter)
          updateSafe(safeId, {
            participants: latestSafeData.participants || [],
            orders: latestSafeData.orders || [],
            currentAmount: latestSafeData.currentAmount || 0,
            deployedCards: latestSafeData.deployedCards || [],
            status: latestSafeData.status,
            isCoveredByHost: latestSafeData.isCoveredByHost,
            orderId: latestSafeData.orderId
          });
          // Sync timer from server (authoritative source to prevent drift)
          if (typeof latestSafeData.timeRemaining === 'number') {
            setTimeRemaining(latestSafeData.timeRemaining);
          }
        }
      } catch (e) {
        console.error("Polling safe failed", e);
      }
    };

    pollSafe(); // Fire immediately
    const interval = setInterval(pollSafe, 800);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [safeId, currentUser?.id, updateSafe]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addToOrder = (item: MenuItem) => {
    setItemWithOptions(item);
  };

  const confirmAddToOrder = (item: MenuItem, selectedAddOns: any[], specialNotes: string) => {
    setMyOrder(prev => {
      const existing = prev.find(o => 
        o.item.id === item.id && 
        JSON.stringify(o.selectedAddOns) === JSON.stringify(selectedAddOns) &&
        o.specialNotes === specialNotes
      );
      if (existing) {
        return prev.map(o =>
          (o.item.id === item.id && JSON.stringify(o.selectedAddOns) === JSON.stringify(selectedAddOns) && o.specialNotes === specialNotes)
            ? { ...o, quantity: o.quantity + 1 }
            : o
        );
      }
      return [...prev, { item, quantity: 1, selectedAddOns, specialNotes }];
    });
  };

  const removeFromOrderWithAddons = (itemId: string, selectedAddOns: any[]) => {
    setMyOrder(prev => {
      const existing = prev.find(o => 
        o.item.id === itemId && 
        JSON.stringify(o.selectedAddOns) === JSON.stringify(selectedAddOns)
      );
      if (existing && existing.quantity > 1) {
        return prev.map(o =>
          (o.item.id === itemId && JSON.stringify(o.selectedAddOns) === JSON.stringify(selectedAddOns))
            ? { ...o, quantity: o.quantity - 1 }
            : o
        );
      }
      return prev.filter(o => !(o.item.id === itemId && JSON.stringify(o.selectedAddOns) === JSON.stringify(selectedAddOns)));
    });
  };

  const removeFromOrder = (itemId: string) => {
    setMyOrder(prev => {
      const existing = prev.find(o => o.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(o =>
          o.item.id === itemId
            ? { ...o, quantity: o.quantity - 1 }
            : o
        );
      }
      return prev.filter(o => o.item.id !== itemId);
    });
  };

  const myTotal = myOrder.reduce((sum, { item, quantity, selectedAddOns }) => {
    const addOnsTotal = selectedAddOns.reduce((s, a) => s + (a.price || 0), 0);
    return sum + (item.price + addOnsTotal) * quantity;
  }, 0);

  // Calculate my local share of my own shared items before locking in
  const myPendingSharedCost = hasLockedIn ? 0 : sharedItems.reduce((sum, { item, includedUserIds }) => {
    const includedCount = includedUserIds.includes('all') ? safe.participants.length : (includedUserIds.length || 1);
    if (includedCount > 0 && (includedUserIds.includes('all') || includedUserIds.includes(currentUser?.id || 'user1'))) {
      return sum + (item.price / Math.max(1, includedCount));
    }
    return sum;
  }, 0);

  const myServerSharedTotal = safe.participants.find(p => p.userId === currentUser?.id)?.sharedTotal || 0;
  const myEffectiveTotal = myTotal + myPendingSharedCost + myServerSharedTotal;

  const mySharedItemsForReceipt = [
    ...(!hasLockedIn ? sharedItems.reduce((acc, sh) => {
      const includedCount = sh.includedUserIds.includes('all') ? safe.participants.length : sh.includedUserIds.length;
      if (includedCount > 0 && (sh.includedUserIds.includes('all') || sh.includedUserIds.includes(currentUser?.id || 'user1'))) {
        acc.push({ name: sh.item.name, fractionalPrice: sh.item.price / includedCount });
      }
      return acc;
    }, [] as { name: string, fractionalPrice: number }[]) : []),
    ...safe.orders.filter(o => o.type === 'SHARED').flatMap(o => (o.rawSharedItems || []).filter((sh: any) =>
      sh.includedUserIds?.includes('all') || sh.includedUserIds?.includes(currentUser?.id || 'user1')
    ).map((sh: any) => {
      const count = sh.includedUserIds?.includes('all') ? safe.participants.length : sh.includedUserIds?.length || 1;
      return { name: sh.item?.name || sh.name || 'Shared Item', fractionalPrice: (sh.item?.price || sh.price || 0) / count };
    }))
  ];

  // Use the effective restaurant (real data takes priority over mock)
  const restaurant = realRestaurant || mockRestaurant;

  const localSharedFullPrice = hasLockedIn ? 0 : sharedItems.reduce((sum, i) => sum + i.item.price, 0);

  const safeTotal = safe.orders.filter(o => o.userId !== currentUser?.id && o.type !== 'SHARED').reduce((sum, order) => sum + (order.total || 0), 0)
    + myTotal
    + localSharedFullPrice
    + safe.orders.filter(o => o.type === 'SHARED').reduce((sum, order) => sum + (order.originalPrice || 0), 0);

  // Revised Logic for Auto Checkout
  // Proceed to checkout automatically if the host and all connected users (even if just 1 extra) have locked in.
  const allCurrentParticipantsLockedIn = safe.participants.every(p => p.hasLockedIn) && hasLockedIn;
  const hasAtLeastOneExtraUser = safe.participants.length > 0;

  // Watch for server checkout trigger for guests
  useEffect(() => {
    if (safe.status === 'CHECKOUT_READY' && !showCheckout && !isHost && !showOwedScreen) {
      if (safe.isCoveredByHost) {
        setShowOwedScreen(true);
      } else {
        setShowCheckout(true);
      }
    }
  }, [safe.status, safe.isCoveredByHost, showCheckout, isHost, showOwedScreen]);

  // Guest Owed Screen Redirection (Stable timer)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showOwedScreen) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOwedScreen]);

  // Host success redirection after covering lock (Stable timer)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showHostSuccess) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHostSuccess]);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://lockin.app/safe/${safeId}`);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const canLockIn = myOrder.length > 0 || sharedItems.length > 0 || myServerSharedTotal > 0;

  const handleLockIn = async () => {
    if (!canLockIn) return;
    setHasLockedIn(true);
    if (currentUser?.id) {
      lockInUser(safeId, currentUser.id);
    } else {
      lockInUser(safeId, 'user1');
    }

    try {
      if (currentUser?.id) {
        const orderItems = myOrder.map(c => {
          const addOnsTotal = c.selectedAddOns.reduce((s, a) => s + (a.price || 0), 0);
          return {
            menuItemId: c.item.id,
            name: c.item.name,
            price: c.item.price + addOnsTotal,
            quantity: c.quantity,
            modifiers: JSON.stringify(c.selectedAddOns),
            specialNotes: c.specialNotes
          };
        });
        await fetch(`/api/consumer/safes/${safeId}/lockin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser.id,
            isHostCoverMode: false,
            sharedItems: sharedItems.map(si => ({
              name: si.item.name,
              price: si.item.price,
              includedUserIds: si.includedUserIds
            })),
            orderItems: {
              userId: currentUser.id,
              userName: currentUser.name || currentUser.username,
              userAvatar: currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name || 'User'}`,
              items: orderItems,
              total: orderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
            }
          })
        });
      }
    } catch (e) {
      console.error("Failed to sync lock in to server", e);
    }

    // Explicit Host Checkout Rules: Do NOT trigger checkout for guests here. Wait for Host trigger.
    const newlyAllLockedIn = safe.participants.every(p => p.hasLockedIn || p.userId === currentUser?.id) && true;
    if (newlyAllLockedIn && hasAtLeastOneExtraUser && isHost) {
      setTimeout(() => {
        setShowHostFlex(true); // Host decides on payment
      }, 500);
    }
  };

  const handleUnlock = async () => {
    if (allCurrentParticipantsLockedIn && hasAtLeastOneExtraUser) return; // Prevent unlocking once host is deciding
    setHasLockedIn(false);
    try {
      await fetch(`/api/consumer/safes/${safeId}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id })
      });
    } catch (e) {
      console.error("Failed to unlock", e);
    }
  };

  // Auto-checkout effect: For HOST ONLY
  useEffect(() => {
    if (isHost && hasLockedIn && allCurrentParticipantsLockedIn && hasAtLeastOneExtraUser && !showCheckout && !showHostFlex) {
      const timer = setTimeout(() => {
        setShowHostFlex(true);
      }, 1000); // Small delay for UX
      return () => clearTimeout(timer);
    }
  }, [isHost, hasLockedIn, allCurrentParticipantsLockedIn, hasAtLeastOneExtraUser, showCheckout, showHostFlex]);

  const handleHostCoverLock = () => {
    setShowHostFlex(false);
    setIsHostCoverMode(true);
    setShowCheckout(true);
  };

  const handlePayShare = () => {
    setShowHostFlex(false);
    setIsHostCoverMode(false);
    setShowCheckout(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-deep-charcoal flex flex-col font-sans"
    >
      {/* 
        NEW UI REWORK
        Premium Neo-Brutalist Layout:
        - Hero Timer Dashboard
        - Horizontal Roster
        - Bento Box Grid for Menu & Ledger
      */}

      {/* Top Protocol Bar */}
      <div className="flex items-center justify-between px-4 mt-6 mb-2">
        <button
          onClick={async () => {
            if (window.confirm("Are you sure you want to abandon this session? Your shared items will be deleted.")) {
              try {
                if (currentUser?.id) {
                  await fetch(`/api/consumer/safes/${safeId}/abandon`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: currentUser.id })
                  });
                }
              } catch (e) {
                console.error('Abandon failed', e);
              }
              onClose();
            }
          }}
          className="w-12 h-12 bg-white rounded-full border-4 border-black flex items-center justify-center brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all"
        >
          <X className="w-6 h-6 text-black" />
        </button>
        <div className="flex bg-volt-green/20 border-2 border-volt-green rounded-full px-4 py-1.5 items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-volt-green animate-pulse" />
          <span className="text-volt-green font-display font-bold text-sm tracking-widest uppercase">
            Hub Connection
          </span>
        </div>
        <button
          onClick={copyLink}
          className="w-12 h-12 bg-electric-red text-white rounded-full border-4 border-black flex items-center justify-center brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all relative"
        >
          <Share2 className="w-5 h-5" />
          <AnimatePresence>
            {showCopied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-14 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-display font-black px-3 py-1.5 rounded-md brutal-shadow-sm whitespace-nowrap"
              >
                LINK COPIED
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-48 scroll-smooth w-full max-w-2xl mx-auto custom-scrollbar">
        {/* Hero Timer Section */}
        <div className="bg-sneaker-white rounded-3xl border-4 border-black brutal-shadow-md p-6 mb-6 mt-4 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />

          <div className="flex flex-col items-center justify-center relative z-10">
            <h2 className="text-deep-charcoal font-display font-black text-6xl tracking-tighter tabular-nums drop-shadow-md">
              {formatTime(timeRemaining)}
            </h2>
            <div className="mt-3 bg-black text-volt-green px-5 py-2 rounded-full font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2 brutal-shadow-sm">
              <Clock className="w-4 h-4" />
              {allCurrentParticipantsLockedIn && hasAtLeastOneExtraUser && !isHost ? 'Waiting for Host...' : 'Time Remaining'}
            </div>
          </div>

          {/* Roster Strip */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {/* Participants */}
            {safe.participants.map((p) => {
              const isMe = currentUser ? p.userId === currentUser.id : p.name === 'You' || p.userId === 'user1';
              const participantLockedIn = isMe ? (hasLockedIn || p.hasLockedIn) : p.hasLockedIn;
              
              // Lurker anonymity: check if this participant has LURKER card active
              const isLurker = !isMe && activeCardId && inventory.some(
                (uc: any) => uc.card.perkCode === 'LURKER'
              ) ? false : // Current user is lurker, show others normally
              safe.deployedCards?.some(
                (dc: any) => dc.deployedBy === p.userId && dc.type === 'LURKER'
              ) && !isMe;
              const displayName = isLurker ? '???' : p.name;
              const displayAvatar = isLurker 
                ? 'https://api.dicebear.com/7.x/shapes/svg?seed=lurker&backgroundColor=111111' 
                : p.avatar;

              return (
                <div key={p.userId} className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full border-4 ${participantLockedIn ? 'border-volt-green' : (isMe ? 'border-black' : 'border-gray-400')} overflow-hidden bg-gray-200 transition-colors`}>
                      <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
                    </div>
                    {participantLockedIn && (
                      <div className="absolute -bottom-2 -right-2 bg-volt-green p-1 rounded-full border-2 border-black z-10">
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </div>
                  {isMe ? (
                    <span className="font-display font-bold text-xs uppercase bg-black text-white px-2 py-0.5 rounded-sm">YOU</span>
                  ) : (
                    <span className={`font-display font-bold text-xs uppercase ${isLurker ? 'text-electric-red italic' : 'text-black'}`}>{displayName}</span>
                  )}
                </div>
              )
            })}

            {/* Empties */}
            {Array.from({ length: Math.max(0, safe.targetAmount - safe.participants.length) }).map((_, emptyIndex) => (
              <div key={`empty-${emptyIndex}`} className="w-14 h-14 rounded-full border-4 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center opacity-50 mb-5">
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Grid (Bento Box style) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* NEW: Card Arsenal Horizontal Scroller */}
          <div className="col-span-2 bg-black rounded-3xl border-4 border-black p-4 brutal-shadow-sm overflow-hidden mb-2">
            <h3 className="text-volt-green font-display font-black text-xs uppercase tracking-tighter mb-3 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Select Active Perk
            </h3>
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none snap-x h-24 items-center">
              {inventory.length === 0 ? (
                <div className="flex-1 text-center text-volt-green/40 font-display font-bold text-xs uppercase">
                  No Cards in Arsenal. Spin the Wheel!
                </div>
              ) : (
                inventory.map((uc) => (
                  <motion.div
                    key={uc.id}
                    onClick={() => !hasLockedIn && activateCard(uc.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`min-w-[140px] h-full rounded-xl border-2 p-2 flex flex-col justify-center cursor-pointer transition-all snap-start ${
                      activeCardId === uc.id 
                        ? 'bg-volt-green border-white shadow-[0_0_15px_rgba(204,255,0,0.5)]' 
                        : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <p className={`font-display font-black text-[10px] uppercase truncate ${activeCardId === uc.id ? 'text-black' : 'text-white'}`}>
                      {uc.card.name}
                    </p>
                    <p className={`text-[8px] font-bold mt-1 line-clamp-2 ${activeCardId === uc.id ? 'text-black/70' : 'text-white/60'}`}>
                      {uc.card.description}
                    </p>
                    <div className={`mt-1 text-[8px] font-black px-1 rounded inline-block w-fit ${
                      uc.card.rarity === 'Legendary' ? 'bg-orange-500 text-white' : 
                      uc.card.rarity === 'Rare' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {uc.card.rarity}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Card 2: Shared Ledger Preview */}

          {/* Card 2: Shared Ledger Preview */}
          <div className="bg-volt-green rounded-3xl border-4 border-black p-4 brutal-shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-20 transform rotate-12">
              <Flame className="w-24 h-24 text-black" />
            </div>
            <div className="relative z-10">
              <h3 className="text-black font-display font-black text-lg uppercase leading-tight">The Hub</h3>
              <p className="text-black/80 text-sm font-bold font-display uppercase tracking-widest mt-1">Total</p>
              <p className="text-black font-display font-black text-3xl tabular-nums">{safeTotal} <span className="text-lg">EGP</span></p>
            </div>
          </div>
        </div>

        {/* Shared Ledger Expandable (Just a list of orders) */}
        <div className="bg-white rounded-3xl border-4 border-black brutal-shadow-sm p-5 mb-6">
          <h3 className="font-display font-black text-xl uppercase text-black mb-4">Receipt</h3>
          <div className="space-y-3">
            {/* Display Server Shared Orders separately at the top */}
            {safe.orders.filter(order => order.type === 'SHARED').map((order, i) => (
              <div key={`shared-${i}`} className="flex justify-between items-center border-b-2 border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-electric-red flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-black uppercase">Shared Item{order.items.length > 1 ? 's' : ''}</p>
                    <p className="text-xs text-electric-red font-bold uppercase">
                      {order.items.map((it: any) => typeof it === 'string' ? it : it.name).join(', ')}
                    </p>
                  </div>
                </div>
                <span className="font-display font-black text-lg text-electric-red">+{order.originalPrice}</span>
              </div>
            ))}

            {safe.orders.filter(order => order.userId !== currentUser?.id && order.type !== 'SHARED').map((order) => (
              <div key={order.userId} className="flex justify-between items-center border-b-2 border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <img src={order.userAvatar} className="w-10 h-10 rounded-full border-2 border-black" />
                  <div className="flex-1">
                    <p className="font-display font-bold text-sm text-black uppercase">{order.userName}</p>
                    <div className="mt-1 space-y-1">
                      {order.items.map((item: any, idx: number) => {
                        const isString = typeof item === 'string';
                        const itemName = isString ? item : item.name;
                        
                        let modifiers: any[] = [];
                        if (!isString && item.modifiers) {
                          if (typeof item.modifiers === 'string') {
                            try {
                              modifiers = JSON.parse(item.modifiers);
                            } catch (e) {
                              modifiers = [];
                            }
                          } else if (Array.isArray(item.modifiers)) {
                            modifiers = item.modifiers;
                          }
                        }
                        
                        const notes = !isString ? item.specialNotes : null;

                        return (
                          <div key={idx} className="bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-deep-charcoal uppercase">
                                {!isString && item.quantity > 1 ? `${item.quantity}x ` : ""}{itemName}
                              </span>
                            </div>
                            {modifiers.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {modifiers.map((m: any, mIdx: number) => (
                                  <span key={mIdx} className="text-[10px] bg-volt-green/10 text-deep-charcoal px-1.5 py-0.5 rounded font-bold uppercase border border-volt-green/20">
                                    + {m.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            {notes && (
                              <p className="text-[10px] text-electric-red italic mt-1 font-medium">
                                Note: {notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <span className="font-display font-black text-lg">{order.total}</span>
              </div>
            ))}

            {myOrder.length > 0 && (
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border-2 border-black mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-volt-green flex items-center justify-center">
                    <span className="font-display font-bold text-xs uppercase">YOU</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-black uppercase">Your Loadout</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {myOrder.map(o => `${o.quantity}x ${o.item?.name || "Item"}`).join(', ')}
                    </p>
                  </div>
                </div>
                <span className="font-display font-black text-xl text-volt-green">{myTotal}</span>
              </div>
            )}

            {mySharedItemsForReceipt.length > 0 && (
              <div className="space-y-2 mb-2">
                {mySharedItemsForReceipt.map((sharedItem, idx) => (
                  <div key={`receipt-share-${idx}`} className="flex justify-between items-center bg-red-50 p-3 rounded-xl border-2 border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-electric-red flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-black uppercase">Shared For You</p>
                        <p className="text-xs text-electric-red font-bold">
                          {sharedItem.name}
                        </p>
                      </div>
                    </div>
                    <span className="font-display font-black text-xl text-electric-red">+{Math.ceil(sharedItem.fractionalPrice)}</span>
                  </div>
                ))}
              </div>
            )}

            {sharedItems.length > 0 && !hasLockedIn && (
              <div className="space-y-2 mb-2 mt-4">
                <h4 className="font-display font-black text-sm uppercase text-white ml-2">You Initiated (Pending)</h4>
                {sharedItems.map((sharedItem, idx) => {
                  const includedCount = sharedItem.includedUserIds.includes('all') ? safe.participants.length : sharedItem.includedUserIds.length;
                  const myFraction = sharedItem.item.price / (includedCount || 1);
                  return (
                    <div key={`local-share-${idx}`} className="flex justify-between items-center bg-red-50 p-3 rounded-xl border-2 border-black relative">
                      {/* X Button */}
                      <button
                        onClick={() => setSharedItems(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-electric-red text-white flex items-center justify-center rounded-full border-2 border-black font-bold active:scale-95 z-10 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-black bg-electric-red flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-sm text-black uppercase">You Shared</p>
                          <p className="text-xs text-electric-red font-bold">
                            {sharedItem.item.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-display font-black text-sm text-gray-500 line-through">{sharedItem.item.price}</span>
                        <span className="font-display font-black text-xl text-electric-red">+{Math.ceil(myFraction)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Menu — Grouped by Category */}
        <div>
          <h3 className="font-display font-black text-2xl uppercase text-white mb-4 ml-2">Live Menu Options</h3>
          {(['Mains', 'Sides', 'Drinks', 'Desserts'] as const).map(cat => {
            const items = (realRestaurant || restaurant)?.menu?.filter((item: any) => !item.isLocked && item.category === cat) || [];
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mb-6">
                <h4 className="font-display font-black text-sm uppercase text-volt-green tracking-widest mb-2 ml-2">{cat}</h4>
                <div className="flex overflow-x-auto gap-4 pb-4 pt-2 px-2 -mx-4 snap-x snap-mandatory custom-scrollbar">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className={`min-w-[280px] bg-white rounded-3xl border-4 border-black brutal-shadow-sm flex flex-col snap-center overflow-hidden transition-all ${myOrder.some(o => o.item.id === item.id) ? 'ring-4 ring-volt-green ring-offset-2' : ''}`}
                    >
                    <div className="h-40 w-full relative border-b-4 border-black">
                      <img src={item.image} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-black text-volt-green font-display font-black px-3 py-1 rounded-full text-lg shadow-xl">
                        {item.price + (cardSelectedAddOns[item.id]?.reduce((s, a) => s + a.price, 0) || 0)} EGP
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-black text-xl text-black leading-tight uppercase mb-1">{item.name}</h4>
                        <p className="text-gray-600 text-sm font-medium line-clamp-2">{item.description}</p>
                        
                        {/* Add-ons list */}
                        {item.addOns && (
                          <div className="mt-3 space-y-1">
                            {(() => {
                              const addons = typeof item.addOns === 'string' ? JSON.parse(item.addOns) : item.addOns;
                              return addons.map((addon: any, idx: number) => {
                                const isSelected = cardSelectedAddOns[item.id]?.some(a => a.name === addon.name);
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      const current = cardSelectedAddOns[item.id] || [];
                                      if (isSelected) {
                                        setCardSelectedAddOns({ ...cardSelectedAddOns, [item.id]: current.filter(a => a.name !== addon.name) });
                                      } else {
                                        setCardSelectedAddOns({ ...cardSelectedAddOns, [item.id]: [...current, addon] });
                                      }
                                    }}
                                    className={`w-full flex justify-between items-center px-3 py-2 rounded-xl border-2 transition-all ${
                                      isSelected ? 'bg-volt-green border-black text-black scale-[1.02]' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-black'
                                    }`}
                                  >
                                    <span className="text-xs font-black uppercase">{addon.name}</span>
                                    <span className="text-xs font-bold">+{addon.price} EGP</span>
                                  </button>
                                );
                              });
                            })()}
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        {hasLockedIn ? (
                          <div className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-display font-bold text-center uppercase border-2 border-gray-300 flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Locked
                          </div>
                        ) : (() => {
                          const currentAddOns = cardSelectedAddOns[item.id] || [];
                          const existingInOrder = myOrder.find(o => 
                            o.item.id === item.id && 
                            JSON.stringify(o.selectedAddOns) === JSON.stringify(currentAddOns)
                          );
                          
                          if (existingInOrder) {
                            return (
                              <div className="flex items-center justify-between bg-volt-green border-4 border-black rounded-xl p-1">
                                <button
                                  onClick={() => removeFromOrderWithAddons(item.id, currentAddOns)}
                                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center active:scale-95 transition-transform"
                                >
                                  <Minus className="w-5 h-5" />
                                </button>
                                <span className="font-display font-black text-xl text-black">
                                  {existingInOrder.quantity}
                                </span>
                                <button
                                  onClick={() => addToOrder(item)}
                                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center active:scale-95 transition-transform"
                                >
                                  <Plus className="w-5 h-5" />
                                </button>
                              </div>
                            );
                          }
                          
                          return (
                            <div className="flex gap-2">
                              <button
                                onClick={() => addToOrder(item)}
                                className="flex-1 py-3 bg-black text-white rounded-xl font-display font-black text-lg uppercase flex items-center justify-center gap-2 active:scale-95 transition-transform border-4 border-transparent active:border-volt-green"
                              >
                                <Plus className="w-5 h-5" /> Add
                              </button>
                              <button
                                onClick={() => {
                                  setItemWithOptions(item);
                                  setIsSplitting(true);
                                }}
                                className="px-4 py-3 bg-white text-black border-4 border-black rounded-xl font-display font-black text-sm uppercase flex items-center justify-center active:scale-95 transition-transform whitespace-nowrap"
                              >
                                Split
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-6 left-4 right-4 z-20">
        <div className="bg-white rounded-2xl border-4 border-black brutal-shadow-md p-3 flex items-center justify-between">
          <div className="pl-2">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Your Share</p>
            <p className="font-display font-black text-3xl text-black">{Math.ceil(myEffectiveTotal)} <span className="text-lg">EGP</span></p>
          </div>

          {hasLockedIn ? (
            <div
              className="bg-volt-green text-black px-6 py-4 rounded-xl font-display font-black text-xl uppercase border-4 border-black flex items-center shadow-inner relative group cursor-pointer"
              onClick={handleUnlock}
            >
              <div className="flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Synced
              </div>
              {!(allCurrentParticipantsLockedIn && hasAtLeastOneExtraUser) && (
                <div className="absolute inset-0 bg-electric-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg font-bold">
                  TAP TO UNSYNC
                </div>
              )}
            </div>
          ) : (
            <button
              disabled={!canLockIn}
              onClick={handleLockIn}
              className={`px-8 py-4 rounded-xl font-display font-black text-xl uppercase border-4 border-black flex items-center transition-all ${canLockIn
                ? 'bg-electric-red text-white brutal-shadow-sm active:translate-y-1 active:shadow-none'
                : 'bg-gray-200 text-gray-400 opacity-50'
                }`}
            >
              Go Sawa <ChevronRight className="w-6 h-6 ml-2 -mr-2" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCheckout && (
          <CheckoutSheet
            myOrder={myOrder}
            myTotal={myEffectiveTotal}
            mySharedItems={mySharedItemsForReceipt}
            vendorInstapay={restaurant?.instapayAddress || '@lockin_vendor'}
            deployedCards={safe.deployedCards}
            isHostCover={isHostCoverMode}
            safeTotal={safeTotal}
            orderId={safe.orderId}
            userId={currentUser?.id}
            participantCount={safe.participants.length}
            onClose={() => setShowCheckout(false)}
            onComplete={() => {
              setShowCheckout(false); // Close modal before showing success screen
              if (isHost && isHostCoverMode) {
                setShowHostSuccess(true);
              } else {
                onConfirm();
              }
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHostSuccess && (
          <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-volt-green text-deep-charcoal p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-deep-charcoal rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-volt-green" />
            </motion.div>
            <h1 className="font-display font-black text-6xl uppercase mb-4 leading-tight">BAG SECURED</h1>
            <p className="font-bold text-2xl opacity-80 uppercase tracking-widest">You covered the entire Sawa!</p>
            <p className="mt-8 text-sm font-bold opacity-60">Redirecting to Orders tab...</p>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOwedScreen && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-electric-red text-white p-6 text-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <Users className="w-24 h-24" />
            </motion.div>
            <h1 className="font-display font-black text-6xl uppercase mb-6 leading-tight select-none">
              YOU OWE<br />
              <span className="text-volt-green drop-shadow-[0_2px_0_rgba(0,0,0,1)]">{safe.hostName}</span>
              <br />FOR LIFE!
            </h1>
            <p className="font-bold text-2xl opacity-90 uppercase tracking-tighter">Your host covered the entire bill.</p>
            <div className="mt-12 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-3 h-3 bg-white rounded-full"
                />
              ))}
            </div>
            <p className="mt-8 text-xs font-bold opacity-70 uppercase tracking-widest">Redirecting to Orders Tab</p>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHostFlex && (
          <HostFlexDrawer
            userShare={myEffectiveTotal}
            safeTotal={safeTotal}
            participantCount={safe.targetAmount}
            onCoverLock={async () => {
              if (currentUser) {
                const fullOrderItems = myOrder.map(c => {
                  const addOnsTotal = c.selectedAddOns.reduce((s, a) => s + (a.price || 0), 0);
                  return {
                    menuItemId: c.item.id,
                    name: c.item.name,
                    price: c.item.price + addOnsTotal,
                    quantity: c.quantity,
                    modifiers: JSON.stringify(c.selectedAddOns),
                    specialNotes: c.specialNotes
                  };
                });
                await fetch(`/api/consumer/safes/${safeId}/lockin`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: currentUser.id,
                    isHostCoverMode: true,
                    sharedItems: sharedItems.map(si => ({
                      name: si.item.name,
                      price: si.item.price,
                      includedUserIds: si.includedUserIds
                    })),
                    orderItems: {
                      userId: currentUser.id,
                      userName: currentUser.name || currentUser.username,
                      userAvatar: currentUser.avatar,
                      items: fullOrderItems,
                      total: fullOrderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
                    }
                  })
                });
              }
              // Tell server host chose cover lock, then checkout
              await fetch(`/api/consumer/safes/${safeId}/trigger-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCoveredByHost: true })
              });
              handleHostCoverLock();
            }}
            onPayShare={async () => {
              if (currentUser) {
                const fullOrderItems = myOrder.map(c => {
                  const addOnsTotal = c.selectedAddOns.reduce((s, a) => s + (a.price || 0), 0);
                  return {
                    menuItemId: c.item.id,
                    name: c.item.name,
                    price: c.item.price + addOnsTotal,
                    quantity: c.quantity,
                    modifiers: JSON.stringify(c.selectedAddOns),
                    specialNotes: c.specialNotes
                  };
                });
                await fetch(`/api/consumer/safes/${safeId}/lockin`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: currentUser.id,
                    isHostCoverMode: false,
                    sharedItems: sharedItems.map(si => ({
                      name: si.item.name,
                      price: si.item.price,
                      includedUserIds: si.includedUserIds
                    })),
                    orderItems: {
                      userId: currentUser.id,
                      userName: currentUser.name || currentUser.username,
                      userAvatar: currentUser.avatar,
                      items: fullOrderItems,
                      total: fullOrderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
                    }
                  })
                });
              }
              await fetch(`/api/consumer/safes/${safeId}/trigger-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCoveredByHost: false })
              });
              handlePayShare();
            }}
            onClose={() => setShowHostFlex(false)}
          />
        )}
      </AnimatePresence>

      {/* Inline Split Modal */}
      <AnimatePresence>
        {itemToSplit && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border-4 border-black p-6 w-full max-w-sm brutal-shadow-md"
            >
              <h3 className="font-display font-black text-2xl uppercase mb-2">Split {itemToSplit?.name}</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Choose who helps pay the {itemToSplit?.price} EGP share for this item.</p>

              <button
                onClick={() => {
                  if (itemToSplit) {
                    setSharedItems(prev => [...prev, { item: itemToSplit, includedUserIds: ['all'] }]);
                    removeFromOrder(itemToSplit.id); // Remove from solo order
                    setItemToSplit(null);
                  }
                }}
                className="w-full py-3 mb-4 bg-volt-green border-4 border-black font-display font-black uppercase tracking-wide rounded-xl active:translate-y-1 active:shadow-none brutal-shadow-sm transition-all text-black"
              >
                Split With Everyone
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="h-0.5 flex-1 bg-gray-200"></div>
                <div className="font-display font-black text-gray-400">OR</div>
                <div className="h-0.5 flex-1 bg-gray-200"></div>
              </div>

              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                <p className="text-xs font-display font-bold text-gray-400 uppercase tracking-widest px-1">Specific Crew Members</p>
                {safe.participants.map(p => (
                  <label key={p.userId} className="flex items-center gap-3 p-3 border-2 border-black rounded-xl hover:bg-gray-50 transition-colors cursor-pointer data-[state=checked]:bg-volt-green/10" data-state={splitWith.includes(p.userId) ? 'checked' : 'unchecked'}>
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-black text-volt-green focus:ring-black focus:ring-offset-0"
                      onChange={(e) => {
                        if (e.target.checked) setSplitWith(prev => [...prev, p.userId]);
                        else setSplitWith(prev => prev.filter(id => id !== p.userId));
                      }}
                    />
                    <img src={p.avatar} className="w-8 h-8 rounded-full border-2 border-black bg-gray-200" alt="avatar" />
                    <span className="font-display font-bold text-sm text-black uppercase">{p.name} {p.userId === currentUser?.id ? "(YOU)" : ""}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setItemToSplit(null); setSplitWith([]); }}
                  className="flex-1 py-3 bg-white text-black border-4 border-black font-display font-black uppercase rounded-xl active:translate-y-1 active:shadow-none brutal-shadow-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (itemToSplit) {
                      const forceIncludeMe = splitWith.includes(currentUser?.id || 'user1') ? splitWith : [...splitWith, currentUser?.id || 'user1'];
                      setSharedItems(prev => [...prev, { item: itemToSplit, includedUserIds: forceIncludeMe }]);
                      removeFromOrder(itemToSplit.id); // Remove from solo order
                      setItemToSplit(null);
                      setSplitWith([]);
                    }
                  }}
                  disabled={splitWith.length === 0}
                  className="flex-[2] py-3 bg-black text-white font-display font-black uppercase rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                  Split Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ItemOptionsModal 
        isOpen={!!itemWithOptions}
        onClose={() => {
          setItemWithOptions(null);
          setIsSplitting(false);
        }}
        item={itemWithOptions}
        onConfirm={(addons, notes) => {
          if (itemWithOptions) {
            const addOnsTotal = addons.reduce((sum, a) => sum + (a.price || 0), 0);
            if (isSplitting) {
              const modifiedItem = { ...itemWithOptions, price: itemWithOptions.price + addOnsTotal };
              setItemToSplit(modifiedItem);
              setItemWithOptions(null);
              setIsSplitting(false);
            } else {
              confirmAddToOrder(itemWithOptions, addons, notes);
              setItemWithOptions(null);
            }
          }
        }}
      />
    </motion.div>
  );
}
