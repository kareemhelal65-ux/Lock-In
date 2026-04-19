// LOCK IN. - Type Definitions

// ── Add-On System ─────────────────────────────────────────────────────────────

/** A single selectable option within an add-on group (new format) */
export interface AddOnOption {
  name: string;
  price: number;
  inStock?: boolean;
}

/**
 * A named group of options from which the user selects.
 * - required: true  → user MUST pick at least one option before confirming
 * - maxSelect: 1    → radio (only one option allowed)
 * - maxSelect: N>1  → multi-select checkbox up to N
 */
export interface AddOnGroup {
  groupName: string;
  required: boolean;
  minSelect?: number; // defaults to 0 (or 1 if required)
  maxSelect: number;  // 1 = radio, N = multi-select
  options: AddOnOption[];
}

/** Legacy flat add-on (old format — treated as a single optional group) */
export interface LegacyAddOn {
  name: string;
  price: number;
  inStock?: boolean;
}

/**
 * A user's selection within a single group, stored in the cart
 * and serialised into OrderItem.modifiers.
 */
export interface SelectedChoice {
  groupName: string;
  option: AddOnOption;
}

// ─────────────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  avatar: string;
  hypeScore: number;
  sawaCurrency: number;
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
  inStock: boolean;
  isLocked: boolean;
  requiredHypeLevel: number;
  category: string;
  /** Serialised JSON: either LegacyAddOn[] OR AddOnGroup[] */
  addOns?: string | AddOnGroup[] | LegacyAddOn[];
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
  status: 'pending' | 'locked' | 'delivered' | 'AWAITING_PAYMENT' | 'AWAITING_VERIFICATION' | 'PENDING' | 'FIRE' | 'READY' | 'COMPLETED' | 'REJECTED' | 'AWAITING_DELIVERY' | 'DELIVERY_ACCEPTED' | 'ON_THE_WAY' | 'DELIVERED';
  createdAt: Date;
  safeId?: string;
  orderId?: string; // For QR code
  qrCode?: string;
  deliveryRequest?: DeliveryRequest;
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
  sawaCurrency: number;
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

export interface DeliveryRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  restaurantName: string;
  campusLocation: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  status: 'OPEN' | 'ACCEPTED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

export type TabType = 'feed' | 'explore' | 'host' | 'radar' | 'profile' | 'orders' | 'vault' | 'locks';
export type CardType = 'squad-spinner';

