import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Zap, 
  CreditCard, 
  Smartphone,
  CheckCircle2,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import type { MenuItem } from '@/types';

interface GiftingCheckoutProps {
  item: MenuItem;
  recipientName: string;
  recipientAvatar: string;
  onClose: () => void;
  onComplete: (orderId: string) => void;
}

export default function GiftingCheckout({ 
  item, 
  recipientName, 
  recipientAvatar,
  onClose, 
  onComplete 
}: GiftingCheckoutProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePayment = () => {
    if (!selectedPayment) return;
    
    const newOrderId = 'GIFT-' + Math.floor(1000 + Math.random() * 9000);
    setOrderId(newOrderId);
    setShowSuccess(true);
    
    setTimeout(() => {
      onComplete(newOrderId);
    }, 4000);
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
            <Gift className="w-12 h-12 text-volt-green" />
          </motion.div>
          
          <h2 className="font-display font-extrabold text-3xl text-deep-charcoal uppercase mb-2">
            BAG SECURED
          </h2>
          <p className="text-deep-charcoal/70 mb-4">
            {recipientName} has been notified
          </p>
          
          {/* Recipient */}
          <div className="brutal-card p-4 bg-white mb-6 inline-flex items-center gap-3">
            <img
              src={recipientAvatar}
              alt={recipientName}
              className="w-10 h-10 rounded-full border-2 border-deep-charcoal"
            />
            <div className="text-left">
              <p className="text-xs text-cool-gray">Gift sent to</p>
              <p className="font-display font-bold">{recipientName}</p>
            </div>
          </div>
          
          {/* Order ID & QR */}
          <div className="brutal-card p-4 bg-white mb-6 max-w-xs mx-auto">
            <p className="text-xs text-cool-gray uppercase mb-2">Gift Order ID</p>
            <p className="font-display font-extrabold text-2xl text-deep-charcoal mb-4">
              {orderId}
            </p>
            <div className="w-32 h-32 mx-auto bg-white border-2 border-deep-charcoal rounded-lg flex items-center justify-center">
              <QrCode className="w-24 h-24 text-deep-charcoal" />
            </div>
            <p className="text-xs text-cool-gray mt-2">
              {recipientName} will show this at pickup
            </p>
          </div>
          
          <p className="text-sm text-deep-charcoal/60">
            Redirecting to feed...
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
      className="fixed inset-0 z-50 flex flex-col bg-volt-green"
    >
      {/* Header */}
      <div className="px-4 py-4 border-b-2 border-deep-charcoal/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white border-2 border-deep-charcoal rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display font-extrabold text-xl uppercase">
              Gifting Checkout
            </h2>
            <p className="text-deep-charcoal/60 text-sm">
              Digital payment only
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Gift Details */}
        <div className="brutal-card p-4 mb-4 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={recipientAvatar}
              alt={recipientName}
              className="w-12 h-12 rounded-full border-2 border-deep-charcoal"
            />
            <div>
              <p className="text-xs text-cool-gray">Sending gift to</p>
              <p className="font-display font-bold">{recipientName}</p>
            </div>
          </div>
          
          <div className="border-t-2 border-dashed border-deep-charcoal/20 pt-3">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover border-2 border-deep-charcoal"
              />
              <div>
                <p className="font-display font-bold">{item.name}</p>
                <p className="text-xs text-cool-gray">{item.price} EGP</p>
              </div>
            </div>
          </div>
          
          <div className="border-t-2 border-deep-charcoal pt-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg">Total</span>
              <span className="font-display font-extrabold text-2xl">{item.price} EGP</span>
            </div>
          </div>
        </div>

        {/* Payment Options - NO CASH */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60">
            Select Payment
          </h3>
          
          {/* Instapay - Purple */}
          <motion.button
            onClick={() => setSelectedPayment('instapay')}
            className={`w-full brutal-card p-4 flex items-center gap-4 bg-white ${
              selectedPayment === 'instapay'
                ? 'border-purple-600'
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

          {/* Credit/Debit Card */}
          <motion.button
            onClick={() => setSelectedPayment('card')}
            className={`w-full brutal-card p-4 flex items-center gap-4 bg-white ${
              selectedPayment === 'card'
                ? 'border-deep-charcoal'
                : 'brutal-card-hover'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-deep-charcoal rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-display font-bold">CREDIT / DEBIT CARD</h4>
              <p className="text-xs text-cool-gray">Visa, Mastercard, Meeza</p>
            </div>
            {selectedPayment === 'card' && (
              <div className="w-6 h-6 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </motion.button>

          {/* Apple/Google Pay */}
          <motion.button
            onClick={() => setSelectedPayment('wallet')}
            className={`w-full brutal-card p-4 flex items-center gap-4 bg-white ${
              selectedPayment === 'wallet'
                ? 'border-deep-charcoal'
                : 'brutal-card-hover'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-black rounded-full border-2 border-deep-charcoal flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-display font-bold">APPLE PAY / GOOGLE PAY</h4>
              <p className="text-xs text-cool-gray">Quick mobile payment</p>
            </div>
            {selectedPayment === 'wallet' && (
              <div className="w-6 h-6 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </motion.button>
        </div>

        {/* No Cash Notice */}
        <div className="mt-4 brutal-card p-3 bg-deep-charcoal/10 border-deep-charcoal/20">
          <p className="text-xs text-deep-charcoal/60 text-center">
            <span className="font-display font-bold">💵 CASH DISABLED:</span> Gifts require digital payment for instant delivery
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t-2 border-deep-charcoal/10 bg-volt-green">
        <motion.button
          onClick={handlePayment}
          disabled={!selectedPayment}
          className={`w-full py-4 rounded-pill font-display font-bold uppercase text-lg border-2 border-deep-charcoal transition-all ${
            selectedPayment
              ? 'bg-deep-charcoal text-white shadow-brutal-sm'
              : 'bg-white/50 text-deep-charcoal/50 border-deep-charcoal/30'
          }`}
          whileTap={selectedPayment ? { scale: 0.95 } : {}}
        >
          <Gift className="w-5 h-5 inline mr-2" />
          {selectedPayment ? `SEND GIFT (${item.price} EGP)` : 'SELECT PAYMENT'}
        </motion.button>
      </div>
    </motion.div>
  );
}
