import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Safe, Notification, Order, CardType } from '@/types';

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
  addHypeScore: (points: number) => void;
  pointsUntilGamble: number;
  keysAvailable: number;
  inventory: any[];
  setInventory: (inventory: any[]) => void;

  // Vendor On Lock
  vendorsOnLock: string[];
  toggleVendorOnLock: (vendorId: string) => void;
  incrementSawasUntilMysterySawa: () => void;
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
  const [keysAvailable, setKeysAvailable] = useState(0);
  const [inventory, setInventory] = useState<any[]>([]);
  const [vendorsOnLock, setVendorsOnLock] = useState<string[]>(['rest1']);

  // Sync state from currentUser when they log in
  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (currentUser.hypeScore !== undefined) setHypeScore(currentUser.hypeScore);
      if (currentUser.keysAvailable !== undefined) setKeysAvailable(currentUser.keysAvailable);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Auto-poll user data to instantly update Hype Points, Streaks, and Active Cards
  React.useEffect(() => {
    let active = true;
    if (!currentUser?.id) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/consumer/user/${currentUser.id}`);
        if (res.ok && active) {
          const data = await res.json();
          if (data.user) {
            setCurrentUser((prev: any) => {
              if (!prev) return data.user;
              // Only trigger a state update if meaningful gamification data changed
              if (
                prev.hypeScore !== data.user.hypeScore ||
                prev.keysAvailable !== data.user.keysAvailable ||
                JSON.stringify(prev.streaks) !== JSON.stringify(data.user.streaks) ||
                prev.activeCard?.perkCode !== data.user.activeCard?.perkCode
              ) {
                return { ...prev, ...data.user };
              }
              return prev;
            });
          }
        }
      } catch (err) {
        // Ignore fetch errors to prevent console spam
      }
    }, 5000);

    return () => {
      active = false;
      clearInterval(pollInterval);
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

  const incrementSawasUntilMysterySawa = useCallback(() => {
    // Mock implementation or state update if needed
    console.log("Incrementing sawas until mystery sawa...");
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
        addHypeScore,
        pointsUntilGamble,
        keysAvailable,
        inventory,
        setInventory,
        vendorsOnLock,
        toggleVendorOnLock,
        incrementSawasUntilMysterySawa,
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
