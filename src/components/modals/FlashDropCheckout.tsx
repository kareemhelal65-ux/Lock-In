import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, ArrowLeft, Clock, Flame, Users, User, CheckCircle2
} from 'lucide-react';
import type { FlashDrop } from '@/types';
import { useApp } from '@/context/AppContext';
import PaymentDropzone from '@/components/checkout/PaymentDropzone';

interface FlashDropCheckoutProps {
  drop: FlashDrop;
  onClose: () => void;
  onComplete: (orderId: string) => void;
}

type Step = 'choose' | 'payment' | 'screenshot' | 'success';

export default function FlashDropCheckout({ drop, onClose, onComplete }: FlashDropCheckoutProps) {
  const { currentUser } = useApp();
  const [step, setStep] = useState<Step>('choose');
  const [claimType, setClaimType] = useState<'solo' | 'lock' | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
  const [vendorInstapay, setVendorInstapay] = useState('@lockin_vendor');
  const [vendorInstapayName, setVendorInstapayName] = useState('Vendor');
  const [error, setError] = useState<string | null>(null);

  // Step 1: User chose solo or lock
  const handleChoose = async (type: 'solo' | 'lock') => {
    setClaimType(type);
    setStep('payment');
    // Fetch vendor instapay details
    try {
      const res = await fetch(`/api/vendorData/${drop.vendorId}/profile`);
      if (res.ok) {
        const data = await res.json();
        if (data.instapayAddress) setVendorInstapay(data.instapayAddress);
        if (data.instapayName) setVendorInstapayName(data.instapayName);
      }
    } catch { /* use default */ }
  };

  // Step 2: User selected payment method → create order
  const handleProceedToPayment = async () => {
    if (!selectedPayment || !currentUser?.id) return;
    setIsCreatingOrder(true);
    setError(null);
    try {
      const payload = {
        userId: currentUser.id,
        vendorId: drop.vendorId,
        totalAmount: drop.dropPrice,
        participantShare: drop.dropPrice,
        isCoveredByHost: false,
        hasPaid: false, // Payment not yet confirmed — awaiting screenshot
        items: [{
          menuItemId: null,
          name: `⚡ ${drop.itemName} (Flash Drop)`,
          price: drop.dropPrice,
          quantity: 1
        }],
        isSolo: claimType === 'solo',
        isGroupOrder: claimType === 'lock'
      };

      const res = await fetch('/api/consumer/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to create order');

      setCreatedOrderId(result.order.id);

      if (selectedPayment === 'instapay') {
        setStep('screenshot');
      } else {
        // Cash: order created, go to success
        setStep('success');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleScreenshotSuccess = () => {
    setStep('success');
    setTimeout(() => onComplete(createdOrderId), 2500);
  };

  // ── CHOOSE STEP ──────────────────────────────────────
  if (step === 'choose') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-electric-red"
      >
        <div className="px-4 py-4 border-b-2 border-white/20 flex items-center gap-3">
          <button onClick={onClose} className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display font-extrabold text-xl uppercase text-white">Claim Flash Drop</h2>
            <p className="text-white/60 text-sm">How do you want to claim?</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {/* Drop summary */}
          <div className="brutal-card p-4 mb-6 bg-white border-4 border-volt-green">
            <div className="flex items-center gap-2 mb-3">
              <div className="live-badge bg-electric-red"><Flame className="w-3 h-3" />FLASH DROP</div>
              <div className="flex items-center gap-1 text-xs text-cool-gray"><Clock className="w-3 h-3" />Limited time</div>
            </div>
            <div className="flex items-center gap-3">
              <img src={drop.image || `https://api.dicebear.com/7.x/shapes/svg?seed=${drop.itemName}`} alt={drop.itemName}
                className="w-16 h-16 rounded-lg object-cover border-2 border-deep-charcoal"
                onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${drop.itemName}`; }} />
              <div>
                <p className="font-display font-bold text-lg">{drop.itemName}</p>
                <p className="text-xs text-cool-gray">{drop.vendorName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-display font-extrabold text-2xl text-volt-green">{drop.dropPrice} EGP</span>
                  <span className="text-sm text-cool-gray line-through">{drop.originalPrice} EGP</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-display font-black text-white text-2xl uppercase mb-4">How to Claim?</h3>

          {/* Solo */}
          <motion.button onClick={() => handleChoose('solo')} whileTap={{ scale: 0.97 }}
            className="w-full brutal-card p-5 mb-4 bg-white flex items-center gap-4 text-left"
          >
            <div className="w-14 h-14 bg-deep-charcoal rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="font-display font-black text-xl text-deep-charcoal uppercase">Solo Claim</h4>
              <p className="text-sm text-cool-gray">Order just for yourself — pay & pick up</p>
            </div>
          </motion.button>

          {/* Lock */}
          <motion.button onClick={() => handleChoose('lock')} whileTap={{ scale: 0.97 }}
            className="w-full brutal-card p-5 bg-volt-green flex items-center gap-4 text-left border-4 border-deep-charcoal"
          >
            <div className="w-14 h-14 bg-deep-charcoal rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="font-display font-black text-xl text-deep-charcoal uppercase">Lock Claim</h4>
              <p className="text-sm text-deep-charcoal/70">Claim as part of a lock — group order</p>
            </div>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ── PAYMENT STEP ────────────────────────────────────
  if (step === 'payment') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-electric-red"
      >
        <div className="px-4 py-4 border-b-2 border-white/20 flex items-center gap-3">
          <button onClick={() => setStep('choose')} className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display font-extrabold text-xl uppercase text-white">
              {claimType === 'lock' ? '🔒 Lock Claim' : '👤 Solo Claim'}
            </h2>
            <p className="text-white/60 text-sm">Select payment method</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="brutal-card p-3 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-medium text-deep-charcoal">{drop.itemName}</span>
              <span className="font-display font-bold text-deep-charcoal">{drop.dropPrice} EGP</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <span className="text-xs font-bold text-cool-gray uppercase">Service Fee ({claimType === 'solo' ? 'Solo' : 'Group'})</span>
              <span className="text-xs font-bold text-deep-charcoal">{claimType === 'solo' ? '10' : '5'} EGP</span>
            </div>
            <div className="flex items-center justify-between border-t-2 border-deep-charcoal pt-2">
              <span className="font-display font-black text-deep-charcoal uppercase">Total</span>
              <span className="font-display font-black text-volt-green text-xl">{(drop.dropPrice + (claimType === 'solo' ? 10 : 5))} EGP</span>
            </div>
          </div>

          {error && <div className="brutal-card p-3 bg-red-50 border-electric-red text-electric-red text-sm font-bold">{error}</div>}

          <h3 className="font-display font-bold text-white/80 text-sm uppercase">Select Payment</h3>

          {/* Instapay */}
          <motion.button onClick={() => setSelectedPayment('instapay')} whileTap={{ scale: 0.98 }}
            className={`w-full brutal-card p-4 flex items-center gap-4 bg-white ${selectedPayment === 'instapay' ? 'border-purple-600 border-4' : ''}`}
          >
            <div className="w-12 h-12 bg-purple-600 rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-display font-bold text-deep-charcoal">⚡ INSTAPAY</h4>
              <p className="text-xs text-cool-gray">Upload receipt screenshot to confirm</p>
            </div>
            {selectedPayment === 'instapay' && <CheckCircle2 className="w-5 h-5 text-volt-green" />}
          </motion.button>

          {/* Cash — Coming Soon */}
          <motion.button onClick={() => {}} disabled whileTap={{ scale: 0.98 }}
            className="w-full brutal-card p-4 flex items-center gap-4 bg-white opacity-50 cursor-not-allowed"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold">💵</span>
            </div>
            <div className="flex-1 text-left relative overflow-hidden">
              <h4 className="font-display font-bold text-deep-charcoal">CASH ON PICKUP</h4>
              <p className="text-xs text-cool-gray font-bold uppercase">Pay at pickup</p>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-full border-2 border-red-700 animate-pulse whitespace-nowrap">
                Coming Soon
              </span>
            </div>
          </motion.button>
        </div>

        <div className="p-4 border-t-2 border-white/20">
          <motion.button onClick={handleProceedToPayment}
            disabled={!selectedPayment || isCreatingOrder}
            className={`w-full py-4 rounded-pill font-display font-bold uppercase text-lg border-2 border-deep-charcoal transition-all ${selectedPayment && !isCreatingOrder ? 'bg-volt-green text-deep-charcoal' : 'bg-white/40 text-deep-charcoal/50'}`}
            whileTap={selectedPayment && !isCreatingOrder ? { scale: 0.95 } : {}}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            {isCreatingOrder ? 'Creating Order...' : selectedPayment ? `CLAIM DROP (${drop.dropPrice + (claimType === 'solo' ? 10 : 5)} EGP)` : 'SELECT PAYMENT'}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ── SCREENSHOT STEP ─────────────────────────────────
  if (step === 'screenshot') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-sneaker-white"
      >
        <div className="px-4 py-4 border-b-4 border-black flex items-center gap-3 bg-white">
          <button onClick={() => setStep('payment')} className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display font-extrabold text-xl uppercase">Upload Payment Receipt</h2>
            <p className="text-cool-gray text-sm">Send to Instapay then upload screenshot</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="brutal-card p-4 mb-4 bg-purple-50 border-purple-300">
            <p className="text-xs font-bold text-purple-700 uppercase mb-1">Send {drop.dropPrice} EGP to:</p>
            <p className="font-display font-black text-2xl text-purple-800">{vendorInstapay}</p>
            <p className="text-sm text-purple-600">{vendorInstapayName}</p>
          </div>

          <PaymentDropzone
            expectedAmount={drop.dropPrice + (claimType === 'solo' ? 10 : 5)}
            vendorInstapay={vendorInstapay || '@lockin_vendor'}
            vendorInstapayName={vendorInstapayName}
            orderId={createdOrderId}
            userId={currentUser?.id || ''}
            onVerifySuccess={handleScreenshotSuccess}
            onCancel={() => setStep('payment')}
          />
        </div>
      </motion.div>
    );
  }

  // ── SUCCESS STEP ─────────────────────────────────────
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-electric-red"
    >
      <div className="text-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Zap className="w-12 h-12 text-electric-red" />
        </motion.div>

        <h2 className="font-display font-extrabold text-3xl text-white uppercase mb-2">DROP LOCKED!</h2>
        <p className="text-white/80 mb-6">{selectedPayment === 'instapay' ? 'Payment uploaded — awaiting vendor confirmation' : 'Cash payment — order submitted!'}</p>

        <div className="brutal-card p-4 bg-white mb-4 max-w-xs mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <img src={drop.image || `https://api.dicebear.com/7.x/shapes/svg?seed=${drop.itemName}`} alt={drop.itemName}
              className="w-12 h-12 rounded-lg object-cover border-2 border-deep-charcoal" />
            <div className="text-left">
              <p className="font-display font-bold text-deep-charcoal">{drop.itemName}</p>
              <p className="text-xs text-cool-gray">{drop.vendorName}</p>
            </div>
          </div>
          <p className="text-xs text-cool-gray text-center mt-2">Track your order in the <strong>Locks</strong> tab</p>
        </div>

        <p className="text-sm text-white/60">Closing in a moment...</p>
      </div>
    </motion.div>
  );
}
