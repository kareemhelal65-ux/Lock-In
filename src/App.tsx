import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Compass,
  Plus,
  Bell,
  User,
  Crown,
  Lock as LockIcon
} from 'lucide-react';
import type { TabType } from '@/types';
import { currentUser as mockCurrentUser } from '@/data/mockData';

// Tab Components
import FeedTab from '@/components/tabs/FeedTab';
import ExploreTab from '@/components/tabs/ExploreTab';
import RadarTab from '@/components/tabs/RadarTab';
import VaultTab from '@/components/tabs/VaultTab';
import LocksTab from '@/components/tabs/LocksTab';

// Modals & Flows
import HostLockModal from '@/components/modals/HostLockModal';
import TheSafeScreen from '@/components/screens/TheSafeScreen';
import MysterySpinner from '@/components/modals/MysterySpinner';
import SoloPenaltyDrawer from '@/components/modals/SoloPenaltyDrawer';
import AuthScreen from '@/components/auth/AuthScreen';
import OnboardingScreen from '@/components/auth/OnboardingScreen';
import PostCreationModal from '@/components/modals/PostCreationModal';
import VendorProfile from '@/components/vendor/VendorProfile';

// Context
import { AppProvider, useApp } from '@/context/AppContext';

import './App.css';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [showHostModal, setShowHostModal] = useState(false);
  const [showSafe, setShowSafe] = useState(false);
  const [currentSafeId, setCurrentSafeId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<'host' | 'guest'>('guest');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPostCreation, setShowPostCreation] = useState(false);
  const [showSoloPenalty, setShowSoloPenalty] = useState(false);
  const [soloPenaltyData, setSoloPenaltyData] = useState<any>(null);
  const [spinnerType, setSpinnerType] = useState<'standard' | 'squad'>('standard');
  const [showVendorProfile, setShowVendorProfile] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);


  const {
    currentUser,
    setCurrentUser,
    addNotification,
    addSafe,

    incrementLocksUntilMysteryCop,
    activeSafes
  } = useApp();

  // Restore auth from AppContext persistent state
  useEffect(() => {
    if (currentUser && !isAuthenticated) {
      setIsAuthenticated(true);
      setNeedsOnboarding(!currentUser.name || !currentUser.username);
      if (currentUser.role !== 'VENDOR' && activeTab === 'feed') {
         setActiveTab('explore');
      }
    }
  }, [currentUser, isAuthenticated, activeTab]);

  // Poll backend for lock invite notifications every 15 seconds
  useEffect(() => {
    if (!currentUser?.id) return;
    const poll = async () => {
      try {
        const res = await fetch(`/api/consumer/notifications/${currentUser.id}`);
        if (!res.ok) return;
        const data = await res.json();
        (data.notifications || []).forEach((invite: any) => {
          addNotification({
            id: invite.id,
            type: 'safe_invite',
            title: `🔒 Lock Invite from ${invite.fromUserName}`,
            message: invite.message,
            timestamp: new Date(invite.sentAt),
            read: false,
            safeId: invite.safeId || undefined,
          });
        });
      } catch { /* silent */ }
    };
    poll(); // immediate first poll
    const interval = setInterval(poll, 15000);
    return () => clearInterval(interval);
  }, [currentUser?.id]);

  // Handle actual onboarding via API
  const handleOnboardingComplete = async (data: any) => {
    try {
      if (!currentUser?.id) return;
      const res = await fetch('/api/consumer/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, name: data.name, username: data.username, avatarUrl: data.avatar })
      });
      const result = await res.json();
      if (res.ok) {
        setCurrentUser(result.user);
        setNeedsOnboarding(false);
      } else {
        console.error('Onboarding failed', result.error);
        // Might want to add error handling UI later, simply logs for now
      }
    } catch (err) {
      console.error('Onboarding network error', err);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    if (tab === 'host') {
      setShowHostModal(true);
      return;
    }
    setActiveTab(tab);
  };

  // Handle hosting a lock
  const handleHostLock = (restaurantId: string, timer: number, inviteMode: 'app' | 'link', serverSafeId?: string) => {
    setShowHostModal(false);
    const newSafeId = serverSafeId || `safe-${Date.now()}`;

    // Fetch the real restaurant data since we might only have the ID
    const fetchVendor = async () => {
      try {
        const res = await fetch(`/api/vendorData/${restaurantId}/profile`);
        if (res.ok) {
          const data = await res.json();
          const restaurant = data.vendor || { id: restaurantId, name: 'Vendor', image: '' };
          completeHostLock(restaurant);
        } else {
          completeHostLock({ id: restaurantId, name: 'Vendor', image: '' });
        }
      } catch {
        completeHostLock({ id: restaurantId, name: 'Vendor', image: '' });
      }
    };

    const completeHostLock = async (restaurant: any) => {
      let safeData;

      // Create safe on server if not already created (e.g. for link invites)
      if (!serverSafeId) {
        try {
          const res = await fetch('/api/consumer/safes/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: newSafeId,
              hostId: currentUser?.id || 'user1',
              hostName: currentUser?.name || 'You',
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              targetAmount: 5,
              timeRemaining: timer,
              expiresAt: new Date(Date.now() + timer * 1000).toISOString()
            })
          });
          if (res.ok) {
            safeData = await res.json();
          }
        } catch (e) {
          console.error('Failed to create safe on server', e);
        }
      } else {
        // Safe was already created by HostLockModal, fetch it
        try {
          const res = await fetch(`/api/consumer/safes/${serverSafeId}?userId=${currentUser?.id}`);
          if (res.ok) {
            safeData = await res.json();
          }
        } catch (e) {
          console.error('Failed to fetch pre-created safe', e);
        }
      }

      if (!safeData) {
        alert("Failed to create safe on server.");
        return;
      }

      // Hydrate local state from the server's canonical safe state
      addSafe({
        id: safeData.id,
        hostId: safeData.hostId,
        hostName: safeData.hostName,
        hostAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${safeData.hostName}`,
        restaurantId: safeData.restaurantId,
        restaurantName: safeData.restaurantName || 'Restaurant',
        restaurantImage: restaurant.image,
        timeRemaining: safeData.timeRemaining || timer,
        maxTime: safeData.maxTime || timer,
        targetAmount: safeData.targetAmount || 5,
        currentAmount: safeData.currentAmount || 0,
        participants: safeData.participants || [],
        orders: safeData.orders || [],
        status: 'active',
        deployedCards: safeData.deployedCards || []
      });

      setCurrentSafeId(newSafeId);

      if (inviteMode === 'link') {
        console.log(`Invite link for safe ${newSafeId}`);
      }

      setShowPostCreation(true);
      incrementLocksUntilMysteryCop();
      addNotification({
        id: `lock-start-${Date.now()}`,
        type: 'safe_invite',
        title: '🚀 Lock Started!',
        message: `Your lock for ${restaurant.name} is now live.`,
        timestamp: new Date(),
        read: false,
      });
    };

    fetchVendor();
  };

  // Handle joining a safe — REMOTE-FIRST SINGLETON PATTERN
  // Lobby ID is validated against Active_Sessions_Table FIRST.
  // No ghost safes are ever created locally.
  const handleJoinSafe = async (safeId: string) => {
    if (!safeId) {
      alert('No Active Safe Found');
      return;
    }

    if (!currentUser?.id) {
      alert('Please log in first');
      return;
    }

    // ── Step 1: Validate lobby_id against Active_Sessions_Table ──
    // The safeId MUST resolve to a live session on the server.
    try {
      const joinRes = await fetch(`/api/consumer/safes/${safeId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name || currentUser.username
        })
      });

      if (!joinRes.ok) {
        const errData = await joinRes.json().catch(() => ({}));
        alert(errData.error || 'No Active Safe Found');
        return; // ← Hard stop. No ghost safe created.
      }

      const safeData = await joinRes.json();
      const userRole: 'host' | 'guest' = safeData.userRole || 'guest';

      // ── Step 2: Sync sub-agent to Shared_Safe_Buffer ──
      // Check if this safe already exists locally
      const existsLocally = activeSafes.find(s => s.id === safeId);

      if (existsLocally) {
        // Safe already in local context — update it from server truth
        // (participants list may have changed)
        existsLocally.participants = safeData.participants || existsLocally.participants;
        existsLocally.orders = safeData.orders || existsLocally.orders;
      } else {
        // Hydrate local state from the server's canonical safe state
        addSafe({
          id: safeData.id,
          hostId: safeData.hostId,
          hostName: safeData.hostName,
          hostAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${safeData.hostName}`,
          restaurantId: safeData.restaurantId,
          restaurantName: safeData.restaurantName || 'Restaurant',
          restaurantImage: '',
          timeRemaining: safeData.timeRemaining || 900,
          maxTime: 900,
          targetAmount: safeData.targetAmount || 5,
          currentAmount: safeData.currentAmount || 0,
          participants: safeData.participants || [],
          orders: safeData.orders || [],
          status: 'active',
          deployedCards: safeData.deployedCards || []
        });
      }

      // ── Step 3: Store the Host_Master_Key / user role for session ──
      setCurrentSafeId(safeId);
      setCurrentUserRole(userRole);
      setShowSafe(true);

    } catch (e) {
      console.error('Failed to join safe — network error', e);
      alert('No Active Safe Found');
      // No ghost safe created on failure.
    }
  };

  // Handle confirming lock (show spinner)
  const handleConfirmLock = () => {
    setSpinnerType('standard');
    setShowSpinner(true);
  };

  // Handle spinner complete
  const handleSpinnerComplete = async (discount: number) => {
    setShowSpinner(false);
    setShowSafe(false);
    setActiveTab('locks');

    addNotification({
      id: `notif-${Date.now()}`,
      type: 'order_confirmed',
      title: 'LOCKED IN!',
      message: `You saved ${discount}% on your order!`,
      timestamp: new Date(),
      read: false,
    });

    // Streaks logic has been moved entirely to the backend upon vendor validation (FIRE)
  };

  // Handle solo order attempt
  const handleSoloOrder = (data: any) => {
    setSoloPenaltyData(data);
    setShowSoloPenalty(true);
  };

  // Handle post-creation invite sent
  const handleInviteSent = () => {
    setShowPostCreation(false);
    setShowSafe(true);
  };

  // Handle vendor profile
  const handleOpenVendor = async (restaurant: any) => {
    try {
      const res = await fetch(`/api/vendorData/${restaurant.id}/menu`);
      if (res.ok) {
        const data = await res.json();
        restaurant.menu = data.menuItems || [];
      } else {
        restaurant.menu = [];
      }
    } catch (err) {
      console.error("Failed to fetch menu items for vendor", err);
      restaurant.menu = [];
    }
    setSelectedRestaurant(restaurant);
    setShowVendorProfile(true);
  };



  // If needs onboarding (has priority over main content)
  if (needsOnboarding) {
    return (
      <OnboardingScreen onComplete={handleOnboardingComplete} />
    );
  }

  // If not authenticated (and doesn't need onboarding)
  if (!isAuthenticated) {
    return (
      <AuthScreen onLogin={(user) => {
        if (user.needsOnboarding) {
          setNeedsOnboarding(true);
          // Don't set authenticated yet, or it skips onboarding! Wait, actually, let's keep them authenticated but the needsOnboarding check above will catch them.
        }
        setIsAuthenticated(true);
        setCurrentUser(user);
      }} />
    );
  }

  // If showing The Safe screen
  if (showSafe && currentSafeId) {
    return (
      <TheSafeScreen
        safeId={currentSafeId}
        userRole={currentUserRole}
        onClose={() => {
          setShowSafe(false);
          setActiveTab('locks');
        }}
        onConfirm={handleConfirmLock}
      />
    );
  }

  // If showing Vendor Profile
  if (showVendorProfile && selectedRestaurant) {
    return (
      <VendorProfile
        restaurant={selectedRestaurant}
        onClose={() => setShowVendorProfile(false)}
        onAddToCart={(_item) => {
          // Handled internally in VendorProfile until checkout
        }}
        onCheckout={(cartData) => {
          setShowVendorProfile(false);
          handleSoloOrder(cartData);
        }}
      />
    );
  }



  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-sneaker-white">
      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex flex-col w-64 border-r-4 border-black bg-white sticky top-0 h-screen overflow-y-auto z-40 brutal-shadow-sm pb-safe p-6">
        <div className="mb-10 text-center">
          <h1 className="font-display font-black text-4xl tracking-tighter uppercase">Lock In.</h1>
          <div className="h-1 w-full bg-black mt-2"></div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <button
            onClick={() => handleTabChange('feed')}
            className={`flex items-center gap-4 p-4 rounded-xl border-4 transition-all duration-200 ${activeTab === 'feed'
              ? 'bg-volt-green border-black brutal-shadow-sm translate-x-1'
              : 'bg-transparent border-transparent hover:border-black/20 hover:bg-gray-50'
              }`}
          >
            <Home className="w-8 h-8" strokeWidth={activeTab === 'feed' ? 3 : 2} />
            <span className="font-display font-black text-xl uppercase tracking-wider">Feed</span>
          </button>

          <button
            onClick={() => handleTabChange('explore')}
            className={`flex items-center gap-4 p-4 rounded-xl border-4 transition-all duration-200 ${activeTab === 'explore'
              ? 'bg-volt-green border-black brutal-shadow-sm translate-x-1'
              : 'bg-transparent border-transparent hover:border-black/20 hover:bg-gray-50'
              }`}
          >
            <Compass className="w-8 h-8" strokeWidth={activeTab === 'explore' ? 3 : 2} />
            <span className="font-display font-black text-xl uppercase tracking-wider">Explore</span>
          </button>

          <button
            onClick={() => handleTabChange('radar')}
            className={`flex items-center gap-4 p-4 rounded-xl border-4 transition-all duration-200 ${activeTab === 'radar'
              ? 'bg-volt-green border-black brutal-shadow-sm translate-x-1'
              : 'bg-transparent border-transparent hover:border-black/20 hover:bg-gray-50'
              }`}
          >
            <div className="relative">
              <Bell className="w-8 h-8" strokeWidth={activeTab === 'radar' ? 3 : 2} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-electric-red rounded-full border-2 border-black flex items-center justify-center">
                <span className="text-[10px] font-black text-white">3</span>
              </span>
            </div>
            <span className="font-display font-black text-xl uppercase tracking-wider">Radar</span>
          </button>

          <button
            onClick={() => handleTabChange('vault')}
            className={`flex items-center gap-4 p-4 rounded-xl border-4 transition-all duration-200 ${activeTab === 'vault'
              ? 'bg-volt-green border-black brutal-shadow-sm translate-x-1'
              : 'bg-transparent border-transparent hover:border-black/20 hover:bg-gray-50'
              }`}
          >
            <div className="relative">
              <User className="w-8 h-8" strokeWidth={activeTab === 'vault' ? 3 : 2} />
              {(currentUser?.hypeScore || mockCurrentUser.hypeScore) > 800 && (
                <Crown className="absolute -top-2 -right-2 w-5 h-5 text-volt-green drop-shadow-md" fill="#CCFF00" />
              )}
            </div>
            <span className="font-display font-black text-xl uppercase tracking-wider">Vault</span>
          </button>

          <button
            onClick={() => handleTabChange('locks')}
            className={`flex items-center gap-4 p-4 rounded-xl border-4 transition-all duration-200 ${activeTab === 'locks'
              ? 'bg-volt-green border-black brutal-shadow-sm translate-x-1'
              : 'bg-transparent border-transparent hover:border-black/20 hover:bg-gray-50'
              }`}
          >
            <LockIcon className="w-8 h-8" strokeWidth={activeTab === 'locks' ? 3 : 2} />
            <span className="font-display font-black text-xl uppercase tracking-wider">Locks</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t-4 border-black border-dashed">
          <motion.button
            onClick={() => handleTabChange('host')}
            className="w-full py-4 bg-electric-red text-white flex items-center justify-center gap-3 rounded-xl border-4 border-black brutal-shadow-md hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-8 h-8" strokeWidth={3} />
            <span className="font-display font-black text-xl uppercase tracking-wider">Host A Lock</span>
          </motion.button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 pb-24 md:pb-0 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen"
          >
            {activeTab === 'feed' && (
              <FeedTab
                onStartLock={() => setShowHostModal(true)}
                onSuccess={() => setActiveTab('locks')}
              />
            )}
            {activeTab === 'explore' && (
              <ExploreTab
                onSoloOrder={handleSoloOrder}
                onHostLock={() => setShowHostModal(true)}
                onOpenVendor={handleOpenVendor}
              />
            )}
            {activeTab === 'radar' && <RadarTab onJoinSafe={handleJoinSafe} />}
            {activeTab === 'vault' && <VaultTab />}
            {activeTab === 'locks' && <LocksTab onOpenSafe={(safeId: string) => { setCurrentSafeId(safeId); setShowSafe(true); }} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation (Hidden on MD+) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black z-40 md:hidden brutal-shadow-md pt-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
        <div className="flex items-center justify-around px-2">
          {/* Left Tabs */}
          <button
            onClick={() => handleTabChange('feed')}
            className={`flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors duration-200 ${activeTab === 'feed' ? 'text-black scale-110' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6" strokeWidth={activeTab === 'feed' ? 3 : 2} />
            <span className="text-[10px] font-display font-black uppercase">Feed</span>
          </button>

          <button
            onClick={() => handleTabChange('explore')}
            className={`flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors duration-200 ${activeTab === 'explore' ? 'text-black scale-110' : 'text-gray-400'}`}
          >
            <Compass className="w-6 h-6" strokeWidth={activeTab === 'explore' ? 3 : 2} />
            <span className="text-[10px] font-display font-black uppercase">Explore</span>
          </button>

          {/* Center Action Button */}
          <div className="flex-1 flex justify-center relative -top-6">
            <motion.button
              onClick={() => handleTabChange('host')}
              className="w-16 h-16 bg-electric-red rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all duration-150 z-50 active:translate-y-1 active:shadow-none"
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-8 h-8 text-white" strokeWidth={3} />
            </motion.button>
          </div>

          {/* Right Tabs */}
          <button
            onClick={() => handleTabChange('radar')}
            className={`flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors duration-200 ${activeTab === 'radar' ? 'text-black scale-110' : 'text-gray-400'}`}
          >
            <div className="relative">
              <Bell className="w-6 h-6" strokeWidth={activeTab === 'radar' ? 3 : 2} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-electric-red rounded-full border flex items-center justify-center border-black">
              </span>
            </div>
            <span className="text-[10px] font-display font-black uppercase">Radar</span>
          </button>

          <button
            onClick={() => handleTabChange('vault')}
            className={`flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors duration-200 ${activeTab === 'vault' ? 'text-black scale-110' : 'text-gray-400'}`}
          >
            <div className="relative">
              <User className="w-6 h-6" strokeWidth={activeTab === 'vault' ? 3 : 2} />
              {(currentUser?.hypeScore || mockCurrentUser.hypeScore) > 800 && (
                <Crown className="absolute -top-2 -right-1 w-4 h-4 text-volt-green" fill="#CCFF00" />
              )}
            </div>
            <span className="text-[10px] font-display font-black uppercase">Vault</span>
          </button>

          <button
            onClick={() => handleTabChange('locks')}
            className={`flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors duration-200 ${activeTab === 'locks' ? 'text-black scale-110' : 'text-gray-400'}`}
          >
            <LockIcon className="w-6 h-6" strokeWidth={activeTab === 'locks' ? 3 : 2} />
            <span className="text-[10px] font-display font-black uppercase">Locks</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {showHostModal && (
          <HostLockModal
            onClose={() => setShowHostModal(false)}
            onHost={handleHostLock}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpinner && (
          <MysterySpinner
            onComplete={handleSpinnerComplete}
            isSquadSpinner={spinnerType === 'squad'}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPostCreation && currentSafeId && (
          <PostCreationModal
            safeId={currentSafeId}
            onClose={() => setShowPostCreation(false)}
            onInviteSent={handleInviteSent}
            onGoToSafe={() => {
              setShowPostCreation(false);
              setCurrentUserRole('host');
              setShowSafe(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSoloPenalty && soloPenaltyData && (
          <SoloPenaltyDrawer
            data={soloPenaltyData}
            onClose={() => setShowSoloPenalty(false)}
            onHostInstead={() => {
              setShowSoloPenalty(false);
              setShowHostModal(true);
            }}
            onCheckoutSolo={() => {
              setShowSoloPenalty(false);
              setActiveTab('locks');
            }}
          />
        )}
      </AnimatePresence>


    </div>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingSwitcher from '@/components/LandingSwitcher';
import VendorApp from './VendorApp';
import DevDashboardApp from './DevDashboardApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/dev/*" element={<DevDashboardApp onBack={() => window.location.href = '/'} />} />
        <Route path="/vendor/*" element={<VendorApp onBack={() => window.location.href = '/'} />} />
        <Route path="/app/*" element={
          <AppProvider>
            <AppContent />
          </AppProvider>
        } />
        {/* Redirect any other route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function HomeRoute() {
  const navigate = useNavigate();
  return (
    <LandingSwitcher 
      onSelectMode={(mode) => {
        if (mode === 'consumer') navigate('/app');
        else if (mode === 'vendor') navigate('/vendor');
        else if (mode === 'dev') navigate('/dev');
      }} 
    />
  );
}

export default App;

