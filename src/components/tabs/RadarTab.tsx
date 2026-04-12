import { motion } from 'framer-motion';
import {
  Clock,
  AlertTriangle,
  Zap,
  UserPlus,
  CheckCircle2,
  Flame,
  Loader2,
  MapPin,
  Bike,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import type { Notification, DeliveryRequest } from '@/types';

interface RadarTabProps {
  onJoinSafe: (safeId: string) => void;
}

function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}


export default function RadarTab({ onJoinSafe }: RadarTabProps) {
  const { currentUser, notifications, markNotificationRead } = useApp();
  const [invites, setInvites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Delivery requests
  const [deliveryRequests, setDeliveryRequests] = useState<DeliveryRequest[]>([]);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);


  const fetchInvites = useCallback(async () => {
    if (!currentUser?.id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/consumer/${currentUser.id}/invites`);
      if (res.ok) {
        const data = await res.json();
        setInvites(data.invites || []);
      }
    } catch (err) {
      console.error('Error fetching invites', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.id]);

  const fetchDeliveryRequests = useCallback(async () => {
    setDeliveryLoading(true);
    try {
      const res = await fetch(`/api/consumer/delivery-requests?userId=${currentUser?.id || ''}`);
      if (res.ok) {
        const data = await res.json();
        setDeliveryRequests(data.deliveryRequests || []);
      }
    } catch (err) {
      console.error('Error fetching delivery requests', err);
    } finally {
      setDeliveryLoading(false);
    }
  }, [currentUser?.id]);

  const handleAcceptDelivery = async (requestId: string) => {
    if (!currentUser?.id) return;
    setAcceptingId(requestId);
    try {
      const res = await fetch(`/api/consumer/delivery-requests/${requestId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      if (res.ok) {

        setDeliveryRequests(prev => prev.filter(r => r.id !== requestId));
      } else {
        const data = await res.json();
        alert(data.error || 'Could not accept delivery');
      }
    } catch {
      alert('Could not accept delivery');
    } finally {
      setAcceptingId(null);
    }
  };

  useEffect(() => {
    fetchInvites();
    fetchDeliveryRequests();
    const pollInterval = setInterval(() => {
      fetchInvites();
      fetchDeliveryRequests();
    }, 3000);
    return () => clearInterval(pollInterval);
  }, [fetchInvites, fetchDeliveryRequests]);


  const getIcon = (type: string) => {
    switch (type) {
      case 'safe_expiring':
      case 'safe_invite':
        return <Clock className="w-5 h-5 text-electric-red" />;
      case 'streak_dying':
        return <AlertTriangle className="w-5 h-5 text-electric-red" />;
      case 'drop_available':
        return <Zap className="w-5 h-5 text-volt-green" />;
      case 'friend_joined':
        return <UserPlus className="w-5 h-5 text-volt-green" />;
      case 'order_confirmed':
        return <CheckCircle2 className="w-5 h-5 text-volt-green" />;
      default:
        return <Flame className="w-5 h-5 text-electric-red" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'safe_expiring':
      case 'safe_invite':
      case 'streak_dying':
        return 'bg-electric-red/10';
      case 'drop_available':
      case 'friend_joined':
      case 'order_confirmed':
        return 'bg-volt-green/20';
      default:
        return 'bg-white';
    }
  };

  const vaultNotifications = notifications.filter(n => n.type === 'safe_invite').slice(0, 10);

  return (
    <div className="min-h-screen bg-sneaker-white pt-4 px-4 pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-extrabold text-3xl text-deep-charcoal uppercase tracking-tight">
          Radar
        </h1>
        <p className="text-cool-gray text-sm font-body">Stay on top of your Sawas</p>
      </div>

      {/* ── Help a Friend (Delivery Requests) ────────────────────────── */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider flex items-center gap-2">
              <Bike className="w-4 h-4 text-purple-500" />
              Help a Friend — Earn 100 🔥 pts
            </h2>
          </div>
          {deliveryLoading && <Loader2 className="w-4 h-4 animate-spin text-cool-gray" />}
        </div>

        {deliveryRequests.length === 0 ? (
          <div className="brutal-card p-5 text-center text-cool-gray bg-white">
            <Bike className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-display font-bold">No delivery requests right now.</p>
            <p className="text-xs mt-1 font-bold opacity-60">Check back soon — earn 100 Hype Points per delivery!</p>
          </div>
        ) : (
          deliveryRequests.map((req: any, index: number) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border-4 border-purple-500 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(168,85,247,0.4)]"
            >
              {/* Status bar */}
              <div className="px-4 py-2 bg-purple-50 border-b-2 border-purple-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse inline-block" />
                <span className="font-display font-black text-xs uppercase text-purple-600">
                  Campus Delivery Available
                </span>
              </div>

              <div className="p-4">
                {/* Requester + Restaurant */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={req.requesterAvatar}
                    alt={req.requesterName}
                    className="w-10 h-10 rounded-full border-2 border-black"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-black text-sm truncate">{req.requesterName} needs help</p>
                    <p className="text-cool-gray text-xs font-bold uppercase truncate">{req.restaurantName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-cool-gray font-bold">{formatTimeAgo(req.createdAt)}</span>
                  </div>
                </div>

                {/* Deliver to location */}
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2 mb-4">
                  <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <p className="text-sm font-bold text-purple-800 leading-snug">{req.campusLocation}</p>
                </div>

                {/* Accept button */}
                {req.requesterId === currentUser?.id ? (
                  <div className="w-full bg-cool-gray/10 border-2 border-cool-gray/20 text-cool-gray font-display font-black uppercase text-xs py-3 rounded-xl flex items-center justify-center gap-2">
                    Your Own Request
                  </div>
                ) : (
                  <button
                    onClick={() => handleAcceptDelivery(req.id)}
                    disabled={acceptingId === req.id}
                    className="w-full bg-purple-500 border-2 border-black text-white font-display font-black uppercase text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-60"
                  >
                    {acceptingId === req.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Bike className="w-4 h-4" />
                    }
                    Accept & Deliver · +100 🔥
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ── Live Friend Invites ───────────────────────────────────────── */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider">
            Live Sawa Invites
          </h2>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-cool-gray" />}
        </div>

        {invites.length === 0 ? (
          <div className="brutal-card p-6 text-center text-cool-gray bg-white">
            <UserPlus className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-display font-bold">No live invites to join Sawas right now.</p>
          </div>
        ) : (
          invites.map((invite: any, index: number) => (
            <motion.div
              key={invite.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="brutal-card p-4 border-volt-green bg-volt-green/10"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-volt-green rounded-full border-2 border-deep-charcoal">
                    <Zap className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm">{invite.hostName} invited you to sync up!</h3>
                    <p className="text-xs text-cool-gray uppercase font-bold">{invite.restaurantName}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onJoinSafe(invite.safeId)}
                    className="flex-1 bg-deep-charcoal text-white font-display font-bold text-sm py-2 rounded-xl active:scale-95 transition-transform"
                  >
                    Accept & Join
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ── Other Notifications ───────────────────────────────────────── */}
      <div className="space-y-3 pb-8">
        <h2 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider">
          Other Alerts
        </h2>

        {vaultNotifications.length === 0 ? (
          <div className="brutal-card p-6 text-center text-cool-gray bg-white">
            <Clock className="w-6 h-6 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-bold">You're all caught up.</p>
          </div>
        ) : (
          vaultNotifications.map((notification: Notification, index: number) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => markNotificationRead(notification.id)}
              className={`brutal-card p-3 ${getBgColor(notification.type)} ${!notification.read ? 'border-electric-red shadow-[4px_4px_0px_0px_rgba(255,59,48,0.2)]' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0 bg-white`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display font-bold text-sm text-deep-charcoal">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-electric-red rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-cool-gray mt-0.5 leading-tight">
                    {notification.message}
                  </p>
                  <span className="text-[10px] text-cool-gray/60 mt-1 block font-bold uppercase">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                  {/* Join Safe button for invite notifications */}
                  {notification.type === 'safe_invite' && notification.safeId && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(notification.id);
                        onJoinSafe(notification.safeId!);
                      }}
                      className="mt-2 w-full bg-volt-green border-2 border-black font-display font-black uppercase text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      whileTap={{ scale: 0.95 }}
                    >
                      <UserPlus className="w-4 h-4" />
                      Join Sawa
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
