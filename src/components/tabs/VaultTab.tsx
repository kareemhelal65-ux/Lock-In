import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Crown, Flame, Wallet, Share2, Settings, XCircle, Diamond, Sprout,
  TrendingUp, Users, ChevronRight, Sparkles, Search, UserPlus, Loader2, Plus, LogOut
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

import VaultInventory from '@/components/vault/VaultInventory';
import ProfileEditorModal from '@/components/modals/ProfileEditorModal';
import GambleWheel from '@/components/modals/GambleWheel';

export default function VaultTab() {
  const { currentUser, setCurrentUser, hypeScore, sawaCurrency, pointsUntilGamble, keysAvailable, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'vault' | 'leaderboard' | 'friends'>('overview');
  const [showEditor, setShowEditor] = useState(false);
  const [isGambleOpen, setIsGambleOpen] = useState(false);

  // Friends state
  const [friends, setFriends] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const res = await fetch(`/api/consumer/${currentUser.id}/friends`);
      const data = await res.json();
      if (res.ok) setFriends(data.friends || []);
    } catch (err) { console.error('Error fetching friends', err); }
  }, [currentUser?.id]);

  const fetchPendingRequests = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const res = await fetch(`/api/consumer/friends/requests/${currentUser.id}`);
      const data = await res.json();
      if (res.ok) setPendingRequests(data.requests || []);
    } catch (err) { console.error('Error fetching requests', err); }
  }, [currentUser?.id]);

  const fetchSuggestions = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const res = await fetch(`/api/consumer/friends/suggestions/${currentUser.id}`);
      const data = await res.json();
      if (res.ok) setSuggestions(data.suggestions || []);
    } catch (err) { console.error('Error fetching suggestions', err); }
  }, [currentUser?.id]);

  useEffect(() => {
    if (activeTab === 'friends') {
      fetchFriends();
      fetchPendingRequests();
      fetchSuggestions();
    }
  }, [activeTab, fetchFriends, fetchPendingRequests, fetchSuggestions]);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/consumer/friends/search?q=${encodeURIComponent(searchQuery)}&userId=${currentUser?.id || ''}`);
        const data = await res.json();
        if (res.ok) setSearchResults(data.users || []);
      } catch (err) { console.error('Search error', err); }
      finally { setIsSearching(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, currentUser?.id]);

  const handleSendRequest = async (friendId: string) => {
    setProcessingId(friendId);
    try {
      const res = await fetch('/api/consumer/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id, friendId })
      });
      if (res.ok || res.status === 409) {
        setRequestedIds(prev => new Set([...prev, friendId]));
        addNotification({
          id: `notif-${Date.now()}`,
          type: 'order_confirmed', // Reusing a type that shows generic success for now
          title: 'Request Sent!',
          message: 'Friend request has been sent.',
          timestamp: new Date(),
          read: false,
        });
      }
    } catch (err) { console.error('Send request error', err); }
    finally { setProcessingId(null); }
  };

  const handleAcceptRequest = async (requesterId: string) => {
    setProcessingId(requesterId);
    try {
      const res = await fetch('/api/consumer/friends/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id, requesterId })
      });
      if (res.ok) {
        setPendingRequests(prev => prev.filter(r => r.id !== requesterId));
        fetchFriends();
      }
    } catch (err) { console.error('Accept error', err); }
    finally { setProcessingId(null); }
  };

  const handleRejectRequest = async (requesterId: string) => {
    setProcessingId(requesterId);
    try {
      await fetch('/api/consumer/friends/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id, requesterId })
      });
      setPendingRequests(prev => prev.filter(r => r.id !== requesterId));
    } catch (err) { console.error('Reject error', err); }
    finally { setProcessingId(null); }
  };

// Leaderboard state
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [leaderboardScope, setLeaderboardScope] = useState<'friends' | 'global'>('global');

  const fetchLeaderboard = useCallback(async () => {
    try {
      const endpoint = leaderboardScope === 'friends' 
        ? `/api/consumer/leaderboard/friends/${currentUser?.id || ''}`
        : `/api/consumer/leaderboard?period=${leaderboardPeriod}`;
      
      const res = await fetch(endpoint);
      const data = await res.json();
      if (res.ok) setLeaderboardData(data.leaderboard || []);
    } catch (err) { console.error('Error fetching leaderboard', err); }
  }, [leaderboardPeriod, leaderboardScope, currentUser?.id]);

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetchLeaderboard();
    }
  }, [activeTab, fetchLeaderboard]);

  const handleBuyCard = async (type: string) => {
    try {
      const res = await fetch('/api/consumer/vault/buy-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id, cardType: type })
      });
      const data = await res.json();
      if (res.ok) {
        addNotification({
          id: `vault-${Date.now()}`,
          type: 'gift_received',
          title: 'Card Acquired!',
          message: `${data.user.inventory[data.user.inventory.length - 1].card.name} has been added to your Arsenal.`,
          timestamp: new Date(),
          read: false
        });
        
        // Update user state reactively
        if (data.user) {
          setCurrentUser(data.user);
        }
      } else {
        alert(data.error || 'Failed to buy card');
      }
    } catch (e) {
      console.error('Buy card error', e);
    }
  };



  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-volt-green" fill="#CCFF00" />;
    if (rank === 2) return <Crown className="w-5 h-5 text-cool-gray" fill="#6E727A" />;
    if (rank === 3) return <Crown className="w-5 h-5 text-amber-600" fill="#D97706" />;
    return <span className="w-5 h-5 flex items-center justify-center font-display font-bold text-sm">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-sneaker-white pt-4 px-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-deep-charcoal uppercase tracking-tight">Profile</h1>
          <p className="text-cool-gray text-sm font-body">Your stats, streaks & glory</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowEditor(true)} className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center hover:bg-sneaker-white transition-colors brutal-shadow-sm active:translate-y-1 active:shadow-none">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={() => { localStorage.removeItem('currentUser'); window.location.reload(); }} className="w-10 h-10 bg-electric-red text-white border-2 border-deep-charcoal rounded-full flex items-center justify-center hover:bg-red-600 transition-colors brutal-shadow-sm active:translate-y-1 active:shadow-none" title="Log Out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="brutal-card p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full border-2 border-deep-charcoal" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-display font-bold text-xl">{currentUser.name}</h2>
              <Share2 className="w-4 h-4 text-cool-gray" />
            </div>
            <p className="text-cool-gray font-display text-xs uppercase tracking-wider">@{currentUser.username}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Wallet className="w-4 h-4 text-cool-gray" />
                <span className="font-display font-bold">{sawaCurrency} SC</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {(['overview', 'inventory', 'vault', 'leaderboard', 'friends'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 py-2 px-4 rounded-pill font-display font-bold text-xs uppercase tracking-wider border-2 transition-all ${activeTab === tab ? 'bg-deep-charcoal text-white border-deep-charcoal' : 'bg-white text-deep-charcoal border-deep-charcoal/30'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="brutal-card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display font-black text-2xl uppercase">SAWA Vault</h3>
                <div className="bg-deep-charcoal border-2 border-volt-green/50 px-3 py-1 rounded-xl flex items-center gap-2">
                  <span className="font-display font-bold text-volt-green text-sm">{sawaCurrency}</span>
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">SC</span>
                </div>
              </div>
              <p className="text-cool-gray text-xs mb-6">Spend SAWA Currency (SC) earned from orders and deliveries to unlock powerful cards.</p>
              
              <div className="space-y-4">
                <div className="bg-zinc-900 p-4 border-2 border-cool-gray/30 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-cool-gray/20 text-white px-3 py-1 text-[10px] font-black tracking-widest rounded-bl-xl">1000 SC</div>
                   <h4 className="font-display font-bold text-white text-lg">Hype Hub Discount</h4>
                   <p className="text-cool-gray text-xs mb-3 mt-1">Get 15% off your next SAWA order.</p>
                   <button onClick={() => handleBuyCard('HYPE_HUB')} disabled={sawaCurrency < 1000} className="w-full bg-volt-green text-deep-charcoal font-black uppercase py-3 rounded-lg disabled:opacity-50 disabled:bg-cool-gray/30 transition-colors">Purchase</button>
                </div>
                
                <div className="bg-zinc-900 p-4 border-2 border-electric-red/50 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-electric-red text-white px-3 py-1 text-[10px] font-black tracking-widest rounded-bl-xl">5000 SC</div>
                   <h4 className="font-display font-bold text-white text-lg">The Feast</h4>
                   <p className="text-cool-gray text-xs mb-3 mt-1">A free SAWA meal (up to 150 EGP off).</p>
                   <button onClick={() => handleBuyCard('THE_FEAST')} disabled={sawaCurrency < 5000} className="w-full bg-electric-red text-white font-black uppercase py-3 rounded-lg disabled:opacity-50 disabled:bg-cool-gray/30 transition-colors">Purchase</button>
                </div>

                <div className="bg-zinc-900 p-4 border-2 border-volt-green/30 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-volt-green/20 text-white px-3 py-1 text-[10px] font-black tracking-widest rounded-bl-xl">2500 SC</div>
                   <h4 className="font-display font-bold text-white text-lg">Hub Breach</h4>
                   <p className="text-cool-gray text-xs mb-3 mt-1">Experimental: Zero service fees on your next order.</p>
                   <button onClick={() => handleBuyCard('HUB_BREACH')} disabled={sawaCurrency < 2500} className="w-full bg-white text-deep-charcoal font-black uppercase py-3 rounded-lg disabled:opacity-50 disabled:bg-cool-gray/30 transition-colors">Purchase</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="brutal-card p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold uppercase text-sm tracking-wider text-deep-charcoal/60">Hype Score</h3>
                <TrendingUp className="w-5 h-5 text-volt-green" />
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="font-display font-extrabold text-5xl text-deep-charcoal">{hypeScore}</span>
                <span className="text-cool-gray text-sm mb-2">pts</span>
              </div>
              <div className="progress-brutal"><div className="progress-brutal-fill" style={{ width: `${Math.min(100, (hypeScore / 1000) * 100)}%` }} /></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="brutal-card p-4 mb-6 border-electric-red">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-electric-red" />
                  <span className="font-display font-bold text-sm uppercase">Points to Spin the Wheel</span>
                </div>
                <span className="font-display font-extrabold">{pointsUntilGamble}<span className="text-cool-gray">/250</span></span>
              </div>
              <div className="progress-brutal"><div className="progress-brutal-fill bg-electric-red" style={{ width: `${((250 - pointsUntilGamble) / 250) * 100}%` }} /></div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-cool-gray">{keysAvailable} keys in inventory</p>
                <div className="flex gap-4">
                  <button onClick={() => keysAvailable > 0 && setIsGambleOpen(true)} disabled={keysAvailable === 0} className={`text-xs font-display font-bold ${keysAvailable > 0 ? 'text-volt-green underline cursor-pointer' : 'text-cool-gray opacity-50'}`}>SPIN WHEEL →</button>
                  <button onClick={() => setActiveTab('inventory')} className="text-xs text-electric-red font-display font-bold">View Arsenal →</button>
                </div>
              </div>
            </motion.div>

            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider">Friendship Streaks</h3>
                <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded uppercase">Live Data</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(currentUser?.streaks || []).map((streak: any, index: number) => {
                  const locksTogether = streak.locksTogether || 0;
                  const count = Math.max(0, locksTogether - 1); // 1 streak = 2nd order together
                  // Tiered visuals: 0-19 Seedling, 20-39 Flame, 40+ Diamond
                  const tier = count >= 40 ? 'diamond' : count >= 20 ? 'flame' : 'seedling';
                  const tierConfig = {
                    seedling: { icon: Sprout, bg: 'bg-green-50', border: 'border-green-400', accent: 'bg-green-400', color: 'text-green-600', label: 'Seedling' },
                    flame:    { icon: Flame,  bg: 'bg-orange-50', border: 'border-orange-500', accent: 'bg-orange-500', color: 'text-orange-600', label: 'On Fire' },
                    diamond:  { icon: Diamond, bg: 'bg-blue-50', border: 'border-blue-500', accent: 'bg-blue-500', color: 'text-blue-600', label: 'Unbreakable' },
                  }[tier];
                  const TierIcon = tierConfig.icon;

                  return (
                    <motion.div 
                      key={streak.friendId} 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: index * 0.1 }}
                      className={`brutal-card p-4 relative overflow-hidden ${streak.isActive ? `${tierConfig.bg} ${tierConfig.border}` : 'bg-gray-50 border-gray-300 grayscale opacity-70 scale-95'}`}
                    >
                      {/* Background Decoration */}
                      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 ${streak.isActive ? tierConfig.accent : 'bg-gray-400'}`} />
                      
                      <div className="flex flex-col items-center relative z-10">
                        <div className="relative mb-3">
                          <div className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                            <TierIcon className={`w-7 h-7 ${streak.isActive ? tierConfig.color : 'text-gray-400'}`} />
                          </div>
                          <motion.div 
                            className="absolute -bottom-1 -right-1"
                            animate={streak.isActive && tier === 'flame' ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <img src={streak.friendAvatar} alt={streak.friendName} className="w-8 h-8 rounded-full border-2 border-black bg-white" />
                          </motion.div>
                        </div>

                        <h4 className="font-display font-black text-sm uppercase tracking-tight mb-1 truncate w-full text-center">
                          {streak.friendName}
                        </h4>
                        
                        <div className="flex items-center gap-2">
                          <span className={`font-display font-black text-4xl italic ${streak.isActive ? 'text-black' : 'text-gray-400'}`}>
                            {count}
                          </span>
                          <span className="font-display font-bold text-[10px] uppercase text-cool-gray leading-none pt-1">
                            Streak
                          </span>
                        </div>

                        <div className={`mt-3 px-3 py-1 rounded-full border-2 border-black font-display font-black text-[9px] uppercase tracking-widest flex items-center gap-1 ${streak.isActive ? 'bg-white' : 'bg-gray-200'}`}>
                          {streak.isActive ? (
                            <>
                              <div className={`w-1.5 h-1.5 rounded-full ${tierConfig.accent} animate-pulse`} />
                              {tierConfig.label}
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-500" />
                              RELATIONSHIP DEAD
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && <VaultInventory />}

        {activeTab === 'leaderboard' && (
          <div className="space-y-3">
            {/* Scope Toggle */}
            <div className="flex bg-deep-charcoal/5 p-1 rounded-2xl mb-4 border-2 border-black/5">
              {(['friends', 'global'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setLeaderboardScope(s)}
                  className={`flex-1 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-tighter transition-all ${
                    leaderboardScope === s
                      ? 'bg-black text-white shadow-lg'
                      : 'text-deep-charcoal/40 hover:text-deep-charcoal/60'
                  }`}
                >
                  {s === 'friends' ? 'Squad' : 'World'}
                </button>
              ))}
            </div>

            {/* Period Tabs (Only for Global) */}
            {leaderboardScope === 'global' && (
              <div className="flex gap-2 mb-3">
                {(['weekly', 'monthly'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setLeaderboardPeriod(p)}
                    className={`flex-1 py-2 px-3 rounded-pill font-display font-bold text-[10px] uppercase tracking-wider border-2 transition-all ${
                      leaderboardPeriod === p
                        ? 'bg-volt-green text-deep-charcoal border-deep-charcoal'
                        : 'bg-white text-deep-charcoal border-deep-charcoal/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider">
                {leaderboardScope === 'friends' ? 'Squad Standings' : 'Global Leaderboard'}
              </h3>
              <span className="text-xs text-cool-gray">Ranked by Hype</span>
            </div>
            {leaderboardData.length === 0 ? (
               <div className="brutal-card p-6 text-center">
                  <Users className="w-10 h-10 text-cool-gray mx-auto mb-2" />
                  <p className="font-display font-bold text-sm text-cool-gray">No users found for this period.</p>
               </div>
            ) : (
              leaderboardData.map((entry, index) => (
                <motion.div key={entry.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                  className={`brutal-card p-3 flex items-center gap-3 ${entry.id === currentUser?.id ? 'border-volt-green bg-volt-green/10' : ''}`}
                >
                  <div className="w-8 h-8 flex items-center justify-center">{getRankIcon(index + 1)}</div>
                  <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full border-2 border-deep-charcoal" />
                  <div className="flex-1">
                    <p className="font-display font-bold text-sm">{entry.name}{entry.id === currentUser?.id && <span className="text-volt-green text-xs ml-1">(YOU)</span>}</p>
                    <p className="text-[10px] text-cool-gray">@{entry.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold">{entry.hypeScore}</p>
                    <p className="text-[10px] text-cool-gray">pts</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="space-y-4">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-electric-red text-white text-[10px] font-black rounded-full flex items-center justify-center">{pendingRequests.length}</span>
                  Friend Requests
                </h3>
                <div className="space-y-2">
                  {pendingRequests.map((req: any) => (
                    <motion.div key={req.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      className="brutal-card p-3 flex items-center gap-3 border-electric-red/40"
                    >
                      <img src={req.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.username}`} alt={req.name}
                        className="w-10 h-10 rounded-full border-2 border-deep-charcoal" />
                      <div className="flex-1">
                        <p className="font-display font-bold text-sm">{req.name}</p>
                        <p className="text-xs text-cool-gray">@{req.username}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(req.id)}
                          disabled={processingId === req.id}
                          className="text-xs font-bold bg-volt-green text-deep-charcoal border-2 border-deep-charcoal rounded-full px-3 py-1 hover:bg-[#b0f200] disabled:opacity-50"
                        >{processingId === req.id ? '...' : '✓ Accept'}</button>
                        <button
                          onClick={() => handleRejectRequest(req.id)}
                          disabled={processingId === req.id}
                          className="text-xs font-bold bg-white text-electric-red border-2 border-electric-red rounded-full px-3 py-1 hover:bg-red-50 disabled:opacity-50"
                        >✕ Reject</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && searchQuery.length === 0 && (
              <div className="mb-6">
                <h3 className="font-display font-bold text-sm uppercase text-volt-green tracking-wider mb-4">Suggested Mutuals</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {suggestions.map((user: any) => (
                    <div key={user.id} className="flex-shrink-0 w-32 text-center brutal-card p-3 bg-white">
                      <div className="relative mb-2">
                        <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.name} className="w-16 h-16 rounded-full border-2 border-deep-charcoal mx-auto" />
                        <button
                          onClick={() => handleSendRequest(user.id)}
                          disabled={requestedIds.has(user.id) || processingId === user.id}
                          className="absolute -bottom-1 -right-1 w-8 h-8 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center shadow-brutal-sm hover:scale-110 transition-transform"
                        >
                          {requestedIds.has(user.id) ? '✓' : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="font-display font-black text-xs truncate whitespace-nowrap overflow-hidden w-full">{user.name}</p>
                      <p className="text-[9px] text-cool-gray font-bold uppercase mt-1">Friend of Friend</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider mb-3">Find Friends</h3>
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cool-gray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by username..."
                  className="w-full pl-9 pr-4 py-3 border-2 border-deep-charcoal rounded-xl font-display font-bold text-sm focus:outline-none focus:border-volt-green bg-white"
                />
                {isSearching && <Loader2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-cool-gray animate-spin" />}
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2 mb-4">
                  {searchResults.map((user: any) => {
                    const isFriend = friends.some((f: any) => f.id === user.id);
                    const isRequested = requestedIds.has(user.id);
                    return (
                      <motion.div key={user.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="brutal-card p-3 flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-deep-charcoal" />
                        <div className="flex-1">
                          <p className="font-display font-bold text-sm">{user.name}</p>
                          <p className="text-xs text-cool-gray">@{user.username}</p>
                        </div>
                        {isFriend ? (
                          <span className="text-xs text-volt-green font-display font-bold border-2 border-volt-green rounded-full px-3 py-1">Friends ✓</span>
                        ) : isRequested ? (
                          <span className="text-xs text-cool-gray font-display font-bold border-2 border-gray-300 rounded-full px-3 py-1">Sent ✉</span>
                        ) : (
                          <button
                            onClick={() => handleSendRequest(user.id)}
                            disabled={processingId === user.id}
                            className="flex items-center gap-1 text-xs font-display font-bold bg-deep-charcoal text-white border-2 border-deep-charcoal rounded-full px-3 py-1 hover:bg-black transition-colors disabled:opacity-50"
                          >
                            {processingId === user.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />} Add
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider">Your Crew</h3>
                <span className="text-xs text-cool-gray">{friends.length} friends</span>
              </div>
              {friends.length === 0 ? (
                <div className="brutal-card p-6 text-center">
                  <Users className="w-10 h-10 text-cool-gray mx-auto mb-2" />
                  <p className="font-display font-bold text-sm text-cool-gray">No friends yet — search above to add!</p>
                </div>
              ) : (
                friends.map((friend: any, index: number) => (
                  <motion.div key={friend.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                    className="brutal-card p-3 flex items-center gap-3 mb-3"
                  >
                    <img src={friend.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.username}`} alt={friend.name} className="w-12 h-12 rounded-full border-2 border-deep-charcoal" />
                    <div className="flex-1">
                      <p className="font-display font-bold">{friend.name}</p>
                      <p className="text-xs text-cool-gray">@{friend.username} • {friend.hypeScore} pts</p>
                    </div>

                  </motion.div>
                ))
              )}
              <motion.button className="w-full brutal-card p-4 flex items-center justify-center gap-2 text-cool-gray" whileTap={{ scale: 0.98 }}>
                <Users className="w-5 h-5" />
                <span className="font-display font-bold text-sm">Invite Friends to Sawa</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      {showEditor && (
        <ProfileEditorModal
          user={currentUser}
          onClose={() => setShowEditor(false)}
          onSave={async (data) => {
            try {
              if (!currentUser?.id) return;
              const res = await fetch('/api/consumer/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, name: data.name, username: data.username, avatarUrl: data.avatar })
              });
              const result = await res.json();
              if (res.ok) setCurrentUser(result.user);
            } catch (err) { console.error('Failed to update profile', err); }
            setShowEditor(false);
          }}
        />
      )}
      <GambleWheel 
        isOpen={isGambleOpen} 
        onClose={() => setIsGambleOpen(false)} 
      />
    </div>
  );
}
