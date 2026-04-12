import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { Safe, Notification, Order, CardType } from '@/types';
import { supabase } from '@/lib/supabase';

interface AppContextType {
  // Current User
  currentUser: any; 
  setCurrentUser: (user: any) => void;
  // Safes
  currentSafe: Safe | null;
  setCurrentSafe: (safe: Safe | null) => void;
  activeSafes: Safe[];
  addSafe: (safe: Safe) => void;
  updateSafe: (safeId: string, updates: Partial<Safe>) => void;
  lockInUser: (safeId: string, userId: string) => void;
  deployCard: (safeId: string, cardType: CardType, userId: string, userName: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  unreadCount: number;

  // Orders
  myOrders: Order[];
  addOrder: (order: Order) => void;



  // User Stats
  hypeScore: number;
  sawaCurrency: number;
  addHypeScore: (points: number) => void;
  pointsUntilGamble: number;
  keysAvailable: number;
  inventory: any[];
  setInventory: (inventory: any[]) => void;

  // Vendor On Lock
  vendorsOnLock: string[];
  toggleVendorOnLock: (vendorId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [currentSafe, setCurrentSafe] = useState<Safe | null>(null);
  const [activeSafes, setActiveSafes] = useState<Safe[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);

  const [hypeScore, setHypeScore] = useState(0);
  const [sawaCurrency, setSawaCurrency] = useState(0);
  const [keysAvailable, setKeysAvailable] = useState(0);
  const [inventory, setInventory] = useState<any[]>([]);
  const [vendorsOnLock, setVendorsOnLock] = useState<string[]>(['rest1']);

  // Sync state from currentUser when they log in
  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (currentUser.hypeScore !== undefined) setHypeScore(currentUser.hypeScore);
      if (currentUser.sawaCurrency !== undefined) setSawaCurrency(currentUser.sawaCurrency);
      if (currentUser.keysAvailable !== undefined) setKeysAvailable(currentUser.keysAvailable);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Auto-sync user data to instantly update Hype Points, Streaks, and Inventory
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/consumer/user/${currentUser.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setCurrentUser((prev: any) => {
              if (!prev) return data.user;
              // Deep comparison to avoid unnecessary re-renders
              const hasChanged = 
                prev.hypeScore !== data.user.hypeScore ||
                prev.sawaCurrency !== data.user.sawaCurrency ||
                prev.keysAvailable !== data.user.keysAvailable ||
                JSON.stringify(prev.inventory) !== JSON.stringify(data.user.inventory) ||
                prev.activeCardId !== data.user.activeCardId;
              
              return hasChanged ? { ...prev, ...data.user } : prev;
            });
          }
        }
      } catch (err) { /* silent */ }
    };

    // Initial fetch
    fetchUserData();

    // Set up Realtime listener if Supabase is connected
    let channel: any;
    if (supabase) {
      channel = supabase
        .channel(`user_sync_${currentUser.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'User', filter: `id=eq.${currentUser.id}` },
          () => {
            fetchUserData(); // Refetch full object on any change
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'UserCard', filter: `userId=eq.${currentUser.id}` },
          () => {
            fetchUserData(); // Refetch when inventory (UserCard) changes
          }
        )
        .subscribe();
    } else {
      // Fallback for local development (Reduced frequency)
      const interval = setInterval(fetchUserData, 3000);
      return () => clearInterval(interval);
    }

    return () => {
      if (channel && supabase) supabase.removeChannel(channel);
    };
  }, [currentUser?.id]);

  const pointsUntilGamble = useMemo(() => {
    return 250 - (hypeScore % 250);
  }, [hypeScore]);

  const addSafe = useCallback((safe: Safe) => {
    setActiveSafes(prev => [...prev, safe]);
  }, []);

  const updateSafe = useCallback((safeId: string, updates: Partial<Safe>) => {
    setActiveSafes(prev =>
      prev.map(safe =>
        safe.id === safeId ? { ...safe, ...updates } : safe
      )
    );
    if (currentSafe?.id === safeId) {
      setCurrentSafe(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [currentSafe]);

  const lockInUser = useCallback((safeId: string, userId: string) => {
    setActiveSafes(prev =>
      prev.map(safe => {
        if (safe.id !== safeId) return safe;
        return {
          ...safe,
          participants: safe.participants.map(p =>
            p.userId === userId ? { ...p, hasLockedIn: true } : p
          ),
        };
      })
    );
    if (currentSafe?.id === safeId) {
      setCurrentSafe(prev => prev ? {
        ...prev,
        participants: prev.participants.map(p =>
          p.userId === userId ? { ...p, hasLockedIn: true } : p
        ),
      } : null);
    }
  }, [currentSafe]);

  const deployCard = useCallback((safeId: string, cardType: CardType, userId: string, userName: string) => {
    const newCard = {
      type: cardType,
      deployedBy: userId,
      deployedByName: userName,
      deployedAt: new Date(),
    };

    setActiveSafes(prev =>
      prev.map(safe => {
        if (safe.id !== safeId) return safe;
        return {
          ...safe,
          deployedCards: [...safe.deployedCards, newCard],
        };
      })
    );

    if (currentSafe?.id === safeId) {
      setCurrentSafe(prev => prev ? {
        ...prev,
        deployedCards: [...prev.deployedCards, newCard],
      } : null);
    }
  }, [currentSafe]);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const addOrder = useCallback((order: Order) => {
    setMyOrders(prev => [order, ...prev]);
  }, []);



  const addHypeScore = useCallback((points: number) => {
    setHypeScore(prev => prev + points);
    if (currentUser?.id) {
      fetch('/api/consumer/stats', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, hypeScorePoints: points })
      }).catch(console.error);
    }
  }, [currentUser?.id]);

  const toggleVendorOnLock = useCallback((vendorId: string) => {
    setVendorsOnLock(prev => {
      if (prev.includes(vendorId)) {
        return prev.filter(id => id !== vendorId);
      }
      return [...prev, vendorId];
    });
  }, []);


  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentSafe,
        setCurrentSafe,
        activeSafes,
        addSafe,
        updateSafe,
        lockInUser,
        deployCard,
        notifications,
        addNotification,
        markNotificationRead,
        unreadCount,
        myOrders,
        addOrder,

        hypeScore,
        sawaCurrency,
        addHypeScore,
        pointsUntilGamble,
        keysAvailable,
        inventory,
        setInventory,
        vendorsOnLock,
        toggleVendorOnLock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
