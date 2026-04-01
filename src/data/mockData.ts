import type { User, Restaurant, Safe, FlashDrop, Notification, LeaderboardEntry, Order, GiftOrder } from '@/types';

export const currentUser: User = {
  id: 'user1',
  name: 'You',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
  hypeScore: 842,
  socialTitle: 'The Plug',
  walletBalance: 450,
  sawasUntilMysterySawa: 7, // 7/10 until next Mystery Sawa
  mysterySawaCards: 2,
  squadSpinnerCards: 1,
  streaks: [
    {
      friendId: 'friend1',
      friendName: 'Omar',
      friendAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      lastOrderedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
      hoursRemaining: 24,
      isActive: true,
      sawasTogether: 7, // 7/10 for Squad Spinner
    },
    {
      friendId: 'friend2',
      friendName: 'Moustafa',
      friendAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moustafa',
      lastOrderedAt: new Date(Date.now() - 1000 * 60 * 60 * 40), // 40 hours ago
      hoursRemaining: 8,
      isActive: true,
      sawasTogether: 3,
    },
    {
      friendId: 'friend3',
      friendName: 'Lina',
      friendAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lina',
      lastOrderedAt: new Date(Date.now() - 1000 * 60 * 60 * 50), // 50 hours ago
      hoursRemaining: 0,
      isActive: false,
      sawasTogether: 0,
    },
  ],
};

export const restaurants: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Burger Bench',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: '15-25 min',
    activeLocks: 14,
    hypeLevelRequired: 0,
    onFeedCount: 14200,
    isOnFeed: true,
    menu: [
      {
        id: 'item1',
        name: 'Classic Smash Burger',
        description: 'Double patty, american cheese, secret sauce',
        price: 120,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
        isLocked: false,
        requiredHypeLevel: 0,
        category: 'Burgers',
      },
      {
        id: 'item2',
        name: 'Truffle Smash Burger',
        description: 'Premium beef, truffle aioli, aged cheddar',
        price: 180,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop',
        isLocked: true,
        requiredHypeLevel: 4,
        category: 'Burgers',
      },
      {
        id: 'item3',
        name: 'Loaded Fries',
        description: 'Cheese sauce, bacon bits, jalapeños',
        price: 75,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop',
        isLocked: false,
        requiredHypeLevel: 0,
        category: 'Sides',
      },
    ],
  },
  {
    id: 'rest2',
    name: 'Shawrma Zone',
    image: 'https://images.unsplash.com/photo-1644365584070-723349893169?w=400&h=300&fit=crop',
    rating: 4.6,
    deliveryTime: '10-20 min',
    activeLocks: 8,
    hypeLevelRequired: 0,
    onFeedCount: 8900,
    isOnFeed: false,
    menu: [
      {
        id: 'item4',
        name: 'Chicken Shawarma',
        description: 'Garlic sauce, pickles, tahini',
        price: 65,
        image: 'https://images.unsplash.com/photo-1644365584070-723349893169?w=200&h=200&fit=crop',
        isLocked: false,
        requiredHypeLevel: 0,
        category: 'Wraps',
      },
      {
        id: 'item5',
        name: 'Mixed Grill Plate',
        description: 'Chicken + beef, rice, grilled veggies',
        price: 150,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=200&h=200&fit=crop',
        isLocked: false,
        requiredHypeLevel: 0,
        category: 'Plates',
      },
    ],
  },
  {
    id: 'rest3',
    name: 'Pasta Lab',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    rating: 4.7,
    deliveryTime: '20-30 min',
    activeLocks: 5,
    hypeLevelRequired: 0,
    onFeedCount: 5600,
    isOnFeed: false,
    menu: [
      {
        id: 'item6',
        name: 'Truffle Alfredo',
        description: 'Creamy alfredo, truffle oil, parmesan',
        price: 140,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop',
        isLocked: true,
        requiredHypeLevel: 3,
        category: 'Pasta',
      },
      {
        id: 'item7',
        name: 'Spicy Arrabbiata',
        description: 'Tomato sauce, chili flakes, fresh basil',
        price: 95,
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&h=200&fit=crop',
        isLocked: false,
        requiredHypeLevel: 0,
        category: 'Pasta',
      },
    ],
  },
  {
    id: 'rest4',
    name: 'Crunch Box',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
    rating: 4.5,
    deliveryTime: '15-25 min',
    activeLocks: 3,
    hypeLevelRequired: 0,
    onFeedCount: 3200,
    isOnFeed: false,
    menu: [
      {
        id: 'item8',
        name: 'Spicy Crunch Box',
        description: 'Fried chicken, coleslaw, spicy mayo',
        price: 110,
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop',
        isLocked: false,
        requiredHypeLevel: 0,
        category: 'Boxes',
      },
    ],
  },
];

export const activeSafes: Safe[] = [
  {
    id: 'safe1',
    hostId: 'friend1',
    hostName: 'Omar',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
    restaurantId: 'rest1',
    restaurantName: 'Burger Bench',
    restaurantImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    timeRemaining: 252, // 4:12 in seconds
    maxTime: 900,
    targetAmount: 3,
    currentAmount: 2,
    participants: [
      { userId: 'friend1', name: 'Omar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', hasLockedIn: true, hasPaid: false },
      { userId: 'friend4', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', hasLockedIn: false, hasPaid: false },
    ],
    orders: [
      { userId: 'friend1', userName: 'Omar', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', items: ['Classic Smash Burger', 'Loaded Fries'], total: 195 },
      { userId: 'friend4', userName: 'Sarah', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', items: ['Classic Smash Burger'], total: 120 },
    ],
    status: 'active',
    deployedCards: [],
  },
  {
    id: 'safe2',
    hostId: 'friend2',
    hostName: 'Moustafa',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moustafa',
    restaurantId: 'rest2',
    restaurantName: 'Shawrma Zone',
    restaurantImage: 'https://images.unsplash.com/photo-1644365584070-723349893169?w=400&h=300&fit=crop',
    timeRemaining: 480, // 8:00 in seconds
    maxTime: 600,
    targetAmount: 4,
    currentAmount: 1,
    participants: [
      { userId: 'friend2', name: 'Moustafa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moustafa', hasLockedIn: true, hasPaid: false },
    ],
    orders: [
      { userId: 'friend2', userName: 'Moustafa', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moustafa', items: ['Mixed Grill Plate'], total: 150 },
    ],
    status: 'active',
    deployedCards: [],
  },
];

export const flashDrops: FlashDrop[] = [
  {
    id: 'drop1',
    vendorId: 'rest4',
    vendorName: 'Crunch Box',
    vendorAvatar: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100&h=100&fit=crop',
    itemName: 'Spicy Crunch Box',
    description: 'Only 5 left. 50 EGP.',
    originalPrice: 110,
    dropPrice: 50,
    quantity: 5,
    quantityLeft: 2,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
    expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
  },
];

export const notifications: Notification[] = [
  {
    id: 'notif1',
    type: 'safe_expiring',
    title: "Omar's Lock expires in 4:12",
    message: 'Burger Bench - 2/3 Locked In',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    read: false,
    actionUrl: '/safe/safe1',
  },
  {
    id: 'notif2',
    type: 'streak_dying',
    title: 'WARNING: Your streak dies in 2 hours',
    message: 'Order with Moustafa to keep it alive!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: 'notif3',
    type: 'drop_available',
    title: 'New Flash Drop!',
    message: 'Spicy Crunch Box - Only 50 EGP',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: 'notif4',
    type: 'friend_joined',
    title: 'Sarah joined your Lock!',
    message: 'Burger Bench - 2/3 Locked In',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { userId: 'friend1', name: 'Omar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', hypeScore: 1250, rank: 1 },
  { userId: 'user1', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You', hypeScore: 842, rank: 2 },
  { userId: 'friend5', name: 'Yara', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yara', hypeScore: 780, rank: 3 },
  { userId: 'friend2', name: 'Moustafa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moustafa', hypeScore: 650, rank: 4 },
  { userId: 'friend4', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', hypeScore: 520, rank: 5 },
];

export const friendOrders: Order[] = [
  {
    id: 'order1',
    userId: 'friend1',
    userName: 'Omar',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
    restaurantId: 'rest1',
    restaurantName: 'Burger Bench',
    items: [
      { menuItemId: 'item1', name: 'Classic Smash Burger', quantity: 1, price: 120 },
      { menuItemId: 'item3', name: 'Loaded Fries', quantity: 1, price: 75 },
    ],
    total: 195,
    status: 'locked',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    safeId: 'safe1',
    orderId: 'ORD-7829',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORD-7829',
  },
  {
    id: 'order2',
    userId: 'friend4',
    userName: 'Sarah',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    restaurantId: 'rest3',
    restaurantName: 'Pasta Lab',
    items: [
      { menuItemId: 'item7', name: 'Spicy Arrabbiata', quantity: 1, price: 95 },
    ],
    total: 95,
    status: 'delivered',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    orderId: 'ORD-7830',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORD-7830',
  },
];

export const friends = [
  { id: 'friend1', name: 'Omar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar' },
  { id: 'friend2', name: 'Moustafa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moustafa' },
  { id: 'friend3', name: 'Lina', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lina' },
  { id: 'friend4', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'friend5', name: 'Yara', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yara' },
];

export const giftOrders: GiftOrder[] = [
  {
    id: 'gift1',
    fromUserId: 'friend1',
    fromUserName: 'Omar',
    fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
    toUserId: 'user1',
    toUserName: 'You',
    toUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    restaurantId: 'rest1',
    restaurantName: 'Burger Bench',
    items: [
      { menuItemId: 'item1', name: 'Classic Smash Burger', quantity: 1, price: 120 },
    ],
    total: 120,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    orderId: 'GIFT-4521',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GIFT-4521',
  },
];
