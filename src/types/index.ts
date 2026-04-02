// LOCK IN. - Type Definitions

export interface User {
  id: string;
  name: string;
  avatar: string;
  hypeScore: number;
  socialTitle: string;
  walletBalance: number;
  streaks: Streak[];
  // Vault Inventory
  squadSpinnerCards: number;
}

export interface Streak {
  friendId: string;
  friendName: string;
  friendAvatar: string;
  lastOrderedAt: Date;
  hoursRemaining: number;
  isActive: boolean;
  sawasTogether: number; // 0-10 counter for Squad Spinner
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  activeLocks: number;
  hypeLevelRequired: number;
  menu: MenuItem[];
  // Vendor Cult
  onFeedCount: number; // "14.2K ON LOCK"
  onLockCount?: number; // Server-side equivalent
  isOnFeed: boolean; // User has put this vendor on lock
  status?: 'LIVE' | 'SWAMPED' | 'OFFLINE';
  instapayName?: string;
  instapayAddress?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isLocked: boolean;
  requiredHypeLevel: number;
  category: string;
  addOns?: string | any[];
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'locked' | 'delivered';
  createdAt: Date;
  safeId?: string;
  orderId?: string; // For QR code
  qrCode?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  modifiers?: string;
  specialNotes?: string;
}

export interface Safe {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  timeRemaining: number; // in seconds
  maxTime: number;
  targetAmount: number;
  currentAmount: number;
  participants: Participant[];
  orders: SafeOrder[];
  status: 'active' | 'locked' | 'expired' | 'checkout' | 'CHECKOUT_READY';
  deployedCards: DeployedCard[];
  isCoveredByHost?: boolean;
  orderId?: string;
}

export interface Participant {
  userId: string;
  name: string;
  avatar: string;
  hasLockedIn: boolean;
  hasPaid: boolean;
  sharedTotal?: number;
}

export interface SafeOrder {
  userId?: string;
  userName?: string;
  userAvatar?: string;
  items: (string | OrderItem)[];
  total?: number;
  type?: 'SHARED';
  originalPrice?: number;
  sourceUserId?: string;
  rawSharedItems?: any[];
}

export interface DeployedCard {
  type: 'squad-spinner';
  deployedBy: string;
  deployedByName: string;
  deployedAt: Date;
}

export interface FlashDrop {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorAvatar: string;
  itemName: string;
  description: string;
  originalPrice: number;
  dropPrice: number;
  quantity: number;
  quantityLeft: number;
  image: string;
  expiresAt: Date;
}

export interface Notification {
  id: string;
  type: 'safe_invite' | 'safe_expiring' | 'streak_dying' | 'drop_available' | 'friend_joined' | 'order_confirmed' | 'gift_received' | 'host_covered';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  safeId?: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  hypeScore: number;
  rank: number;
}

export interface GiftOrder {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  toUserId: string;
  toUserName: string;
  toUserAvatar: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'delivered';
  createdAt: Date;
  orderId: string;
  qrCode: string;
}

export type TabType = 'feed' | 'explore' | 'host' | 'radar' | 'profile' | 'orders' | 'vault' | 'locks';
export type CardType = 'squad-spinner';

