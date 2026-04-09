import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, Zap, Lock, CreditCard, Smartphone, Banknote, CheckCircle2 } from 'lucide-react';
import PaymentDropzone from '../checkout/PaymentDropzone';
import { useApp } from '@/context/AppContext';

interface SoloPenaltyDrawerProps {
  data: {
    restaurant: any;
    cart: any[];
    total: number;
    discountedTotal: number;
  };
  onClose: () => void;
  onHostInstead: () => void;
  onCheckoutSolo: (createdOrder?: any) => void;
}

export default function SoloPenaltyDrawer({
  data,
  onClose,
  onHostInstead,
  onCheckoutSolo
}: SoloPenaltyDrawerProps) {
  const { currentUser } = useApp();
  const activePerk = currentUser?.activeCard;
  const isZeroFee = activePerk?.perkCode === 'THE01';
  const isDiscount = activePerk?.perkCode === 'SAWA_DISCOUNT';
  const isFeast = activePerk?.perkCode === 'SAWA_FEAST';
  const hasPerk = isZeroFee || isDiscount || isFeast;
  
  const standardFee = 10;

  const [showCheckout, setShowCheckout] = useState(false);
  const [useActivePerk, setUseActivePerk] = useState(hasPerk);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDropzone, setShowDropzone] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderDbId, setOrderDbId] = useState(''); // real DB id for payment-verification
  const [isProcessing, setIsProcessing] = useState(false);

  // Subsidies / Final Price Calculation
  const feeDelta = (isZeroFee && useActivePerk) ? standardFee : 0;
  let sawaSubsidy = 0;
  if (useActivePerk) {
      if (isDiscount) sawaSubsidy = (data.total + standardFee) * 0.15;
      else if (isFeast) sawaSubsidy = Math.min(activePerk?.remainingValue ?? 150, data.total + standardFee);
  }

  const finalServiceFee = isZeroFee && useActivePerk ? 0 : standardFee;
  const finalTotal = Math.max(0, data.total + finalServiceFee - sawaSubsidy);

  const handleSoloCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = async () => {
    if (!selectedPayment) return;

    if (selectedPayment === 'instapay') {
      // Create the order first, then show dropzone
      setIsProcessing(true);
      try {
        if (!currentUser?.id) throw new Error("Not logged in");

        const payload = {
          userId: currentUser.id,
          vendorId: data.restaurant.id,
          totalAmount: data.total,
          participantShare: data.total,
          isCoveredByHost: false,
          hasPaid: false, // instapay = not paid yet, pending screenshot
          useActivePerk, // NEW: Pass the choice to the backend
          items: data.cart.map(c => ({
            menuItemId: c.item.id,
            name: c.item.name,
            price: c.item.price,
            quantity: c.quantity,
            modifiers: c.modifiers,
            specialNotes: c.specialNotes
          }))
        };

        const res = await fetch('/api/consumer/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error);

        setOrderId(result.order?.orderNumber || result.order?.id || 'N/A');
        setOrderDbId(result.order?.id || '');
        setShowDropzone(true);
      } catch (err: any) {
        console.error('Failed to create order for instapay', err);
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    triggerSuccess();
  };

  const triggerSuccess = async () => {
    setShowDropzone(false);
    setIsProcessing(true);

    try {
      if (!currentUser?.id) throw new Error("Not logged in");

      // For non-instapay, create order and immediately mark as paid
      const payload = {
        userId: currentUser.id,
        vendorId: data.restaurant.id,
          totalAmount: data.total,
          participantShare: data.total,
          isCoveredByHost: false,
          hasPaid: selectedPayment !== 'cash',
          useActivePerk, // NEW: Pass the choice to the backend
          items: data.cart.map(c => ({
            menuItemId: c.item.id,
            name: c.item.name,
            price: c.item.price,
            quantity: c.quantity,
            modifiers: c.modifiers,
            specialNotes: c.specialNotes
          }))
      };

      const res = await fetch('/api/consumer/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setOrderId(result.order?.orderNumber || result.order?.id || 'N/A');
      setShowSuccess(true);

      setTimeout(() => {
        onCheckoutSolo(result.order);
      }, 2500);

    } catch (err) {
      console.error('Failed to create solo order', err);
      setOrderId('SOLO-ERR');
      setShowSuccess(true);
      setTimeout(() => onCheckoutSolo(), 2500);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInstapaySuccess = () => {
    setShowDropzone(false);
    setShowSuccess(true);
    setTimeout(() => onCheckoutSolo(), 2500);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200"
      >
        <div className="text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl text-gray-600 uppercase mb-2">
            ORDER PLACED
          </h2>
          <p className="text-gray-500 mb-6">
            {selectedPayment === 'instapay' ? 'Awaiting vendor payment verification.' : 'You paid full price. No regrets?'}
          </p>

          <div className="brutal-card p-4 bg-white border-gray-400 mb-6 max-w-xs mx-auto">
            <p className="text-xs text-gray-500 uppercase mb-2">Order ID</p>
            <p className="font-display font-extrabold text-2xl text-gray-600">
              {orderId}
            </p>
            <p className="text-xs text-gray-500 mt-4 font-bold">
              Track your order in the Orders tab
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Redirecting to Orders...
          </p>
        </div>
      </motion.div>
    );
  }

  if (showCheckout) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col md:items-center p-0 md:p-4"
      >
        <div className="absolute inset-0 bg-gray-600/90 backdrop-blur-sm" onClick={() => { setShowCheckout(false); setShowDropzone(false); }} />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="bottom-sheet bg-gray-100 relative z-10 flex flex-col"
          style={{ maxHeight: '95vh' }}
        >
          <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
          </div>

          <div className="overflow-y-auto shrink">

          {showDropzone ? (
            <div className="flex-1 flex flex-col justify-start overflow-y-auto">
              <PaymentDropzone
                expectedAmount={finalTotal}
                vendorInstapay={data.restaurant.instapayAddress || '@lockin_vendor'}
                vendorInstapayName={data.restaurant.instapayName}
                orderId={orderDbId}
                userId={currentUser?.id || ''}
                onVerifySuccess={handleInstapaySuccess}
                onCancel={() => setShowDropzone(false)}
              />
            </div>
          ) : (
            <>
              <div className="px-4 pb-4 border-b-2 border-gray-300">
                <h2 className="font-display font-extrabold text-2xl uppercase text-gray-600">
                  Solo Checkout
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  No discounts applied
                </p>
              </div>

              <div className="p-4">
                {/* Item List */}
                <div className="brutal-card p-4 mb-4 bg-white border-gray-400 max-h-48 overflow-y-auto">
                  <h3 className="font-display font-bold text-xs uppercase text-gray-400 mb-3 flex items-center gap-2">
                    📦 YOUR BAG
                  </h3>
                  <div className="space-y-4">
                    {data.cart.map((c, idx) => {
                      const addons = c.modifiers ? JSON.parse(c.modifiers) : [];
                      return (
                        <div key={idx} className="flex flex-col border-b border-gray-50 last:border-0 pb-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
                                {c.quantity}
                              </span>
                              <span className="font-bold text-gray-600">{c.item.name}</span>
                            </span>
                            <span className="font-display font-bold text-gray-600">{(c.item.price + addons.reduce((s: number, a: any) => s + a.price, 0)) * c.quantity} EGP</span>
                          </div>
                          
                          {addons.length > 0 && (
                            <div className="pl-7 mt-0.5 space-y-0.5">
                              {addons.map((addon: any, aIdx: number) => (
                                <div key={aIdx} className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                                  <span>+ {addon.name}</span>
                                  <span>+{addon.price} EGP</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {c.specialNotes && (
                            <div className="pl-7 mt-1 flex items-start gap-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase italic">Note:</span>
                              <p className="text-[10px] text-gray-400 italic leading-tight">{c.specialNotes}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Perk Toggle */}
                {hasPerk && (
                  <div 
                    onClick={() => setUseActivePerk(!useActivePerk)}
                    className={`brutal-card p-4 mb-4 flex items-center justify-between cursor-pointer transition-all ${useActivePerk ? 'bg-volt-green border-black' : 'bg-white border-gray-300 opacity-60'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center ${useActivePerk ? 'bg-white' : 'bg-gray-100'}`}>
                        <Zap className={`w-5 h-5 ${useActivePerk ? 'text-volt-green' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs uppercase tracking-tight">{activePerk?.card.name}</p>
                        <p className="text-[10px] font-bold text-black/60 uppercase">{activePerk?.card.description}</p>
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
                <div className="brutal-card p-4 mb-4 bg-white border-gray-400">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Subtotal</span>
                    <span className="font-display font-bold text-gray-600">{data.total} EGP</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${(isZeroFee && useActivePerk) ? 'text-volt-green font-bold' : 'text-gray-500'}`}>
                      Service Fee {(isZeroFee && useActivePerk) && `(${activePerk?.card.name})`}
                    </span>
                    <span className={`font-display font-bold ${(isZeroFee && useActivePerk) ? 'text-volt-green' : 'text-gray-600'}`}>
                      {(isZeroFee && useActivePerk) ? (
                        <>
                          <span className="line-through opacity-50 mr-2 text-gray-500">{standardFee} EGP</span>
                          0 EGP
                        </>
                      ) : (
                        `+${finalServiceFee} EGP`
                      )}
                    </span>
                  </div>
                  {sawaSubsidy > 0 && (
                    <div className="flex items-center justify-between mb-2 text-volt-green">
                      <span className="text-sm font-bold uppercase tracking-widest">{activePerk?.card.name}</span>
                      <span className="font-display font-bold">-{Math.round(sawaSubsidy)} EGP</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-display font-bold text-gray-600">Total</span>
                    <span className="font-display font-extrabold text-2xl text-gray-600">{Math.ceil(finalTotal)} EGP</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {[
                    { id: 'instapay', icon: Zap, label: 'INSTAPAY', sublabel: `Send to ${data.restaurant.instapayAddress || 'vendor instapay'} `, color: 'bg-gray-400' },
                    { id: 'card', icon: CreditCard, label: 'CREDIT / DEBIT CARD', sublabel: 'Visa, Mastercard', color: 'bg-gray-500' },
                    { id: 'wallet', icon: Smartphone, label: 'APPLE / GOOGLE PAY', sublabel: 'Mobile wallets', color: 'bg-gray-600' },
                    { id: 'cash', icon: Banknote, label: 'CASH ON DROPOFF', sublabel: 'Pay at pickup', color: 'bg-white', textColor: 'text-gray-600' },
                  ].map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setSelectedPayment(option.id)}
                      disabled={option.id !== 'instapay'}
                      className={`relative w-full brutal-card p-4 flex items-center gap-4 bg-white border-gray-300 ${selectedPayment === option.id ? 'border-gray-600 ring-2 ring-gray-600' : ''} ${option.id !== 'instapay' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      whileTap={option.id === 'instapay' ? { scale: 0.98 } : {}}
                    >
                      <div className={`w-12 h-12 ${option.color} rounded-full border-2 border-gray-400 flex items-center justify-center`}>
                        <option.icon className={`w-6 h-6 ${option.textColor || 'text-white'}`} />
                      </div>
                      <div className="flex-1 text-left relative overflow-hidden">
                        <h4 className="font-display font-bold text-gray-600">{option.label}</h4>
                        {option.sublabel && <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis mr-16">{option.sublabel}</p>}
                        {option.id !== 'instapay' && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-full border-2 border-red-700 animate-pulse whitespace-nowrap">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      {selectedPayment === option.id && (
                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t-2 border-gray-300 shrink-0">
                <motion.button
                  onClick={handlePayment}
                  disabled={!selectedPayment || isProcessing}
                  className={`w-full py-4 rounded-pill font-display font-bold uppercase text-lg border-2 border-gray-400 transition-all ${selectedPayment && !isProcessing ? 'bg-gray-600 text-white cursor-pointer' : 'bg-gray-200 text-gray-400 opacity-50'}`}
                  whileTap={selectedPayment && !isProcessing ? { scale: 0.95 } : {}}
                >
                  {isProcessing ? 'PROCESSING...' : `PAY ${finalTotal} EGP`}
                </motion.button>
              </div>
            </>
          )}
          </div>
        </motion.div>
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
      {/* Grey Backdrop */}
      <div className="absolute inset-0 bg-gray-600/80 backdrop-blur-sm" onClick={onClose} />

      {/* Greyed-out Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bottom-sheet bg-gray-100 relative z-10 flex flex-col"
        style={{ maxHeight: '95vh' }}
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
          <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
        </div>

        <div className="overflow-y-auto shrink">
        {/* Warning Header */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-400 rounded-full border-2 border-gray-600 flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl uppercase text-gray-600">
                  Wait!
                </h2>
                <p className="text-gray-500 text-sm">Don't be an NPC</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Price Comparison */}
          <div className="brutal-card p-4 mb-4 bg-white border-gray-400">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Solo Checkout</span>
              <span className="font-display font-bold text-xl text-gray-600">{data.total} EGP</span>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={onHostInstead}
              className="w-full brutal-btn-primary py-4 text-lg border-electric-red bg-electric-red"
              whileTap={{ scale: 0.95 }}
            >
              <Lock className="w-5 h-5 mr-2" />
              ORDER SAWA INSTEAD
            </motion.button>

            <motion.button
              onClick={handleSoloCheckout}
              className="w-full brutal-btn-primary py-4 text-lg border-electric-red bg-electric-red"
              whileTap={{ scale: 0.95 }}
            >
              Pay Full Price ({data.total} EGP)
            </motion.button>
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
