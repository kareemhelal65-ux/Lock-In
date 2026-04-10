import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Zap,
  CreditCard,
  Wallet,
  Smartphone,
  Banknote,
  CheckCircle2
} from 'lucide-react';
import type { DeployedCard } from '@/types';
import PaymentDropzone from '../checkout/PaymentDropzone';
import { Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface CheckoutSheetProps {
  myOrder: { 
    item: { id: string; name: string; price: number }; 
    quantity: number; 
    selectedAddOns?: any[]; 
    specialNotes?: string;
  }[];
  myTotal: number;
  mySharedItems?: { name: string; fractionalPrice: number }[];
  vendorInstapay?: string;
  deployedCards: DeployedCard[];
  isHostCover?: boolean;
  safeTotal?: number;
  onClose: () => void;
  onComplete: () => void;
  orderId?: string;
  userId?: string;
  participantCount?: number;
  isSolo?: boolean;
}

export default function CheckoutSheet({
  myOrder,
  myTotal,
  mySharedItems,
  vendorInstapay,
  deployedCards,
  isHostCover,
  safeTotal,
  onClose,
  onComplete,
  orderId,
  userId,
  participantCount,
  isSolo
}: CheckoutSheetProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDropzone, setShowDropzone] = useState(false);
  const [localOrderId, setLocalOrderId] = useState('');
  const { currentUser } = useApp();

  // Card Logic
  const eligibleCards = (currentUser?.inventory || []).filter((uc: any) => !uc.isUsed && ['THE01', 'SAWA_DISCOUNT', 'SAWA_FEAST'].includes(uc.card.perkCode));
  const activePerkCard = eligibleCards.find((uc: any) => uc.id === currentUser?.activeCardId) || eligibleCards[0];
  const activePerk = activePerkCard?.card;
  
  const isZeroFee = isHostCover ? activePerk?.perkCode === 'THE01' : false; // Host uses Hub Breach
  const isDiscount = activePerk?.perkCode === 'SAWA_DISCOUNT';
  const isFeast = activePerk?.perkCode === 'SAWA_FEAST';
  const hasPerk = !!activePerk;
  const [useActivePerk, setUseActivePerk] = useState(hasPerk);

  // Calculate discounts
  const baseTotal = isHostCover && safeTotal ? safeTotal : myTotal;
  const hasSquadSpinner = deployedCards.some(c => c.type === 'squad-spinner');

  // Apply discounts (mock calculations)
  const squadSpinnerDiscount = hasSquadSpinner ? Math.round(baseTotal * 0.10) : 0; // 10% for demo
  const totalDiscount = squadSpinnerDiscount;
  const standardFee = isHostCover ? (participantCount || 1) * 5 : (isSolo ? 10 : 5);
  const serviceFee = isZeroFee && useActivePerk ? 0 : standardFee;
  
  let sawaSubsidy = 0;
  if (useActivePerk && activePerkCard) {
    if (isDiscount) sawaSubsidy = (baseTotal + serviceFee) * 0.15;
    else if (isFeast) sawaSubsidy = Math.min(activePerkCard.remainingValue ?? 150, baseTotal + serviceFee);
  }

  const finalTotal = Math.max(0, baseTotal - totalDiscount + serviceFee - sawaSubsidy);


  const handlePayment = () => {
    if (!selectedPayment) return;

    if (selectedPayment === 'instapay') {
      setShowDropzone(true);
      return;
    }

    triggerSuccess();
  };

  const triggerSuccess = async () => {
    setShowDropzone(false);
    // Fetch real order number from backend if we have an order ID
    if (orderId) {
      try {
        const res = await fetch(`/api/consumer/order/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setLocalOrderId(data.order?.orderNumber || orderId);
        } else {
          setLocalOrderId(orderId);
        }
      } catch {
        setLocalOrderId(orderId);
      }
    } else {
      setLocalOrderId('Processing...');
    }
    setShowSuccess(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-volt-green"
      >
        <div className="text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-24 h-24 bg-deep-charcoal rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-volt-green" />
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl text-deep-charcoal uppercase mb-2">
            BAG SECURED
          </h2>
          <p className="text-deep-charcoal/70 mb-6">
            Your order is synced!
          </p>

          {/* Order ID */}
          <div className="brutal-card p-4 bg-white mb-6">
            <p className="text-xs text-cool-gray uppercase mb-2">Order ID</p>
            <p className="font-display font-extrabold text-2xl text-deep-charcoal">
              {localOrderId}
            </p>
            <p className="text-xs text-cool-gray mt-4 font-bold">
              Track your order in the Orders tab
            </p>
          </div>

          <p className="text-sm text-deep-charcoal/60">
            Redirecting to Orders...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col md:items-center p-0 md:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-charcoal/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bottom-sheet max-h-[90vh]"
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-deep-charcoal/20 rounded-full" />
        </div>

        {showDropzone ? (
          <div className="p-2 md:p-6 flex-1 flex flex-col items-center justify-start bg-sneaker-white rounded-b-3xl overflow-y-auto">
            <PaymentDropzone
              expectedAmount={finalTotal}
              vendorInstapay={vendorInstapay || "@lockin_vendor"}
              orderId={orderId || ''}
              userId={userId || ''}
              perkUserCardId={useActivePerk && activePerkCard && !isHostCover ? activePerkCard.id : undefined}
              onVerifySuccess={triggerSuccess}
              onCancel={() => setShowDropzone(false)}
            />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-4 pb-4 border-b-2 border-deep-charcoal/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl uppercase">
                    Pay Your Share
                  </h2>
                  <div className={`flex justify-between text-sm ${isZeroFee && useActivePerk ? 'text-volt-green font-bold' : 'text-cool-gray'}`}>
                  <span>Service Fee {isZeroFee && useActivePerk && `(${activePerk?.name})`}</span>
                  <span className={isZeroFee && useActivePerk ? 'line-through opacity-50' : ''}>{standardFee} EGP</span>
                  {isZeroFee && useActivePerk && <span>0 EGP</span>}
                </div>
                  <p className="text-cool-gray text-sm mt-1">
                    The Drop Point
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* Solo Savings Hint */}
              {!isHostCover && (
                <div className="brutal-card p-3 mb-4 bg-volt-green/10 border-volt-green flex items-start gap-3">
                  <div className="w-8 h-8 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-display font-black text-sm text-deep-charcoal uppercase">💡 Save 5 EGP or more!</p>
                    <p className="text-xs text-deep-charcoal/70 mt-0.5">Ordering solo costs 10 EGP service fee. Start a Sawa with friends — only 5 EGP per member!</p>
                  </div>
                </div>
              )}
              {/* Your Tray */}
              <div className="brutal-card p-4 mb-4">
                <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Your Tray
                </h3>
                <div className="space-y-2">
                  {myOrder.map((item, index) => (
                    <div key={index} className="flex flex-col border-b border-gray-100 last:border-0 pb-2 mb-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-deep-charcoal/10 rounded-full flex items-center justify-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <span className="font-bold">{item.item.name}</span>
                        </span>
                        <span className="font-display font-bold">{item.item.price * item.quantity} EGP</span>
                      </div>
                      
                      {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <div className="pl-7 mt-1 space-y-0.5">
                          {item.selectedAddOns.map((addon, aIdx) => (
                            <div key={aIdx} className="flex justify-between text-[10px] text-gray-500 uppercase font-bold tracking-tight">
                              <span>+ {addon.name}</span>
                              <span>+{addon.price} EGP</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item.specialNotes && (
                        <div className="pl-7 mt-1 flex items-start gap-1">
                          <span className="text-[10px] text-electric-red font-black uppercase">Note:</span>
                          <p className="text-[10px] text-gray-500 italic leading-tight">{item.specialNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  {mySharedItems && mySharedItems.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-dashed border-deep-charcoal/20 space-y-2">
                      <span className="flex items-center gap-2 text-sm text-deep-charcoal mb-2">
                        <span className="w-5 h-5 bg-volt-green/20 text-volt-green rounded-full flex items-center justify-center text-xs font-bold">🍕</span>
                        Shared Items Contribution
                      </span>
                      {mySharedItems.map((sh, idx) => (
                        <div key={`checkout-share-${idx}`} className="flex items-center justify-between text-sm text-deep-charcoal pl-7">
                          <span>{sh.name}</span>
                          <span className="font-display font-bold">{Math.ceil(sh.fractionalPrice)} EGP</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Discounts */}
                {hasSquadSpinner && (
                  <div className="border-t-2 border-dashed border-deep-charcoal/20 pt-3 mt-3">
                    <p className="text-xs text-cool-gray mb-2">Power-Up Discounts</p>
                    <div className="flex items-center justify-between text-sm text-volt-green">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Squad Spinner
                      </span>
                      <span className="font-display font-bold">-{squadSpinnerDiscount} EGP</span>
                    </div>
                  </div>
                )}

                {/* Perk Toggle */}
                {hasPerk && !isHostCover && (
                  <div 
                    onClick={() => setUseActivePerk(!useActivePerk)}
                    className={`brutal-card p-4 mt-4 flex items-center justify-between cursor-pointer transition-all ${useActivePerk ? 'bg-volt-green border-black' : 'bg-white border-gray-300 opacity-60'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center ${useActivePerk ? 'bg-white' : 'bg-gray-100'}`}>
                        <Zap className={`w-5 h-5 ${useActivePerk ? 'text-volt-green' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs uppercase tracking-tight">{activePerk?.name}</p>
                        <p className="text-[10px] font-bold text-black/60 uppercase">{activePerk?.description}</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full border-2 border-black relative transition-colors ${useActivePerk ? 'bg-deep-charcoal' : 'bg-gray-200'}`}>
                      <motion.div 
                        initial={false}
                        animate={{ x: useActivePerk ? 24 : 2 }}
                        className="absolute top-0.5 w-4 h-4 bg-white rounded-full border-2 border-black"
                      />
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t-2 border-deep-charcoal pt-3 mt-3">
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-deep-charcoal/10">
                    <span className="text-cool-gray text-sm">Service Fee</span>
                    <span className={`font-display font-medium ${isZeroFee && useActivePerk ? 'text-volt-green' : 'text-cool-gray'}`}>{isZeroFee && useActivePerk ? '0' : `+${serviceFee}`} EGP</span>
                  </div>
                  {useActivePerk && (isDiscount || isFeast) && (
                    <div className="flex items-center justify-between mt-1 text-volt-green">
                      <span className="text-sm font-bold uppercase">{activePerk?.name}</span>
                      <span className="font-display font-bold">-{Math.round(sawaSubsidy)} EGP</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-cool-gray text-sm">Subtotal</span>
                    <span className="font-display font-bold line-through text-cool-gray">{baseTotal} EGP</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-deep-charcoal/10">
                    <span className="font-display font-bold text-lg">Total</span>
                    <span className="font-display font-extrabold text-2xl text-volt-green">{finalTotal} EGP</span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60">
                  Select Payment
                </h3>

                {/* Instapay - Purple */}
                <motion.button
                  onClick={() => setSelectedPayment('instapay')}
                  className={`w-full brutal-card p-4 flex items-center gap-4 ${selectedPayment === 'instapay'
                    ? 'border-purple-600 bg-purple-50'
                    : 'brutal-card-hover'
                    }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-purple-600 rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-display font-bold">⚡ PING INSTAPAY</h4>
                    <p className="text-xs text-cool-gray">Fastest checkout</p>
                  </div>
                  {selectedPayment === 'instapay' && (
                    <div className="w-6 h-6 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </motion.button>

                {/* Credit/Debit Card - Coming Soon */}
                <div className="relative group">
                  <motion.button
                    disabled={true}
                    className="w-full brutal-card p-4 flex items-center gap-4 bg-gray-50 opacity-60 grayscale cursor-not-allowed"
                    whileTap={{ scale: 1 }}
                  >
                    <div className="w-12 h-12 bg-deep-charcoal rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-display font-bold">CREDIT / DEBIT CARD</h4>
                      <p className="text-xs text-cool-gray">Visa, Mastercard, Meeza</p>
                    </div>
                  </motion.button>
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider z-10 rotate-3">
                    Coming Soon
                  </div>
                </div>

                {/* Apple/Google Pay - Coming Soon */}
                <div className="relative group">
                  <motion.button
                    disabled={true}
                    className="w-full brutal-card p-4 flex items-center gap-4 bg-gray-50 opacity-60 grayscale cursor-not-allowed"
                    whileTap={{ scale: 1 }}
                  >
                    <div className="w-12 h-12 bg-black rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-display font-bold">APPLE PAY / GOOGLE PAY</h4>
                      <p className="text-xs text-cool-gray">Quick mobile payment</p>
                    </div>
                  </motion.button>
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider z-10 -rotate-2">
                    Coming Soon
                  </div>
                </div>

                {/* Cash on Dropoff - Coming Soon */}
                <div className="relative group">
                  <motion.button
                    disabled={true}
                    className="w-full brutal-card p-4 flex items-center gap-4 bg-gray-50 opacity-60 grayscale cursor-not-allowed"
                    whileTap={{ scale: 1 }}
                  >
                    <div className="w-12 h-12 bg-white rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
                      <Banknote className="w-6 h-6 text-deep-charcoal" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-display font-bold text-deep-charcoal">💵 CASH ON DROPOFF</h4>
                      <p className="text-xs text-cool-gray">Pay when you receive</p>
                    </div>
                  </motion.button>
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider z-10 rotate-1">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-deep-charcoal/10">
              <motion.button
                onClick={handlePayment}
                disabled={!selectedPayment}
                className={`w-full py-4 rounded-pill font-display font-bold uppercase text-lg border-2 border-deep-charcoal transition-all ${selectedPayment
                  ? 'bg-electric-red text-white shadow-brutal-sm'
                  : 'bg-gray-200 text-cool-gray border-gray-300'
                  }`}
                whileTap={selectedPayment ? { scale: 0.95 } : {}}
              >
                <Wallet className="w-5 h-5 inline mr-2" />
                {selectedPayment ? `PAY ${finalTotal} EGP` : 'SELECT PAYMENT'}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
