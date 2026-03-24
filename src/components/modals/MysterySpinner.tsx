import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Trophy, Users } from 'lucide-react';

interface MysterySpinnerProps {
  onComplete: (discount: number) => void;
  isSquadSpinner?: boolean; // If true, max is 10%
  squadTotal?: number; // For squad spinner, show the discount amount
}

// NERFED: Standard Mystery Cop only goes up to 20%
const standardDiscounts = [5, 10, 15, 20];

// Squad Spinner maxes at 10%
const squadDiscounts = [2, 4, 6, 8, 10];

export default function MysterySpinner({ 
  onComplete, 
  isSquadSpinner = false,
  squadTotal = 0 
}: MysterySpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(true);
  const [finalDiscount, setFinalDiscount] = useState<number | null>(null);
  const [displayDiscount, setDisplayDiscount] = useState(isSquadSpinner ? 2 : 5);
  const spinRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const discounts = isSquadSpinner ? squadDiscounts : standardDiscounts;

  useEffect(() => {
    // Rapid cycling effect
    let speed = 50;
    let count = 0;
    
    const spin = () => {
      setDisplayDiscount(prev => {
        const currentIndex = discounts.indexOf(prev);
        return discounts[(currentIndex + 1) % discounts.length];
      });
      
      count++;
      
      // Slow down gradually
      if (count > 30) speed = 100;
      if (count > 40) speed = 200;
      if (count > 48) speed = 400;
      
      if (count < 50) {
        spinRef.current = setTimeout(spin, speed);
      } else {
        // Land on final discount
        const final = discounts[Math.floor(Math.random() * discounts.length)];
        setFinalDiscount(final);
        setDisplayDiscount(final);
        setIsSpinning(false);
        
        // Auto close after showing result
        setTimeout(() => {
          onComplete(final);
        }, 2500);
      }
    };

    spin();

    return () => {
      if (spinRef.current) clearTimeout(spinRef.current);
    };
  }, [discounts, onComplete]);

  const discountAmount = squadTotal > 0 && finalDiscount 
    ? Math.round(squadTotal * (finalDiscount / 100))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-charcoal/90 backdrop-blur-md"
    >
      <div className="text-center px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {isSquadSpinner ? (
              <Users className="w-8 h-8 text-volt-green" />
            ) : (
              <Sparkles className="w-8 h-8 text-electric-red" />
            )}
          </div>
          <h2 className="font-display font-extrabold text-3xl text-white uppercase mb-2">
            {isSquadSpinner ? 'Squad Spinner' : 'Mystery Cop'}
          </h2>
          <p className="text-white/60 text-sm">
            {isSpinning 
              ? 'Spinning for your discount...' 
              : squadTotal > 0 
                ? `You saved ${discountAmount} EGP!`
                : 'You locked in!'}
          </p>
        </motion.div>

        {/* Spinner Display */}
        <div className="relative mb-8">
          {/* Glow Effect */}
          <div className={`absolute inset-0 blur-3xl rounded-full ${
            isSquadSpinner ? 'bg-volt-green/30' : 'bg-electric-red/30'
          }`} />
          
          {/* Main Display */}
          <motion.div
            animate={isSpinning ? {
              scale: [1, 1.02, 1],
            } : {
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.3 }}
            className="relative bg-white border-4 border-deep-charcoal rounded-sticker p-8 shadow-brutal-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`font-display font-extrabold text-7xl ${
                isSquadSpinner 
                  ? 'text-volt-green' 
                  : finalDiscount === 20 ? 'text-volt-green' : 'text-electric-red'
              }`}>
                {displayDiscount}
              </span>
              <span className="font-display font-extrabold text-4xl text-deep-charcoal">
                %
              </span>
            </div>
            <p className="text-cool-gray text-sm mt-2 font-display uppercase tracking-wider">
              OFF
            </p>
            
            {/* Squad Total Discount */}
            {squadTotal > 0 && !isSpinning && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-deep-charcoal/20">
                <p className="text-xs text-cool-gray uppercase">Squad Total Discount</p>
                <p className="font-display font-extrabold text-2xl text-volt-green">
                  {discountAmount} EGP
                </p>
              </div>
            )}
          </motion.div>

          {/* Sparkles */}
          <AnimatePresence>
            {!isSpinning && finalDiscount && finalDiscount >= (isSquadSpinner ? 8 : 18) && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: 360 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 80}%`,
                    }}
                  >
                    <Sparkles className={`w-8 h-8 ${isSquadSpinner ? 'text-volt-green' : 'text-electric-red'}`} />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Result Message */}
        <AnimatePresence>
          {!isSpinning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {finalDiscount && finalDiscount >= (isSquadSpinner ? 8 : 18) ? (
                <div className={`flex items-center justify-center gap-2 mb-4 ${
                  isSquadSpinner ? 'text-volt-green' : 'text-electric-red'
                }`}>
                  <Trophy className="w-6 h-6" />
                  <span className="font-display font-extrabold text-xl uppercase">
                    {isSquadSpinner ? 'SQUAD SAVED BIG!' : 'MAXIMUM SAVE!'}
                  </span>
                  <Trophy className="w-6 h-6" />
                </div>
              ) : (
                <div className={`flex items-center justify-center gap-2 mb-4 ${
                  isSquadSpinner ? 'text-volt-green' : 'text-electric-red'
                }`}>
                  <Zap className="w-6 h-6" />
                  <span className="font-display font-extrabold text-xl uppercase">
                    NICE SAVE!
                  </span>
                  <Zap className="w-6 h-6" />
                </div>
              )}
              <p className="text-white/60 text-sm">
                Redirecting to checkout...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spinning Indicators */}
        {isSpinning && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full animate-bounce ${
              isSquadSpinner ? 'bg-volt-green' : 'bg-electric-red'
            }`} style={{ animationDelay: '0s' }} />
            <div className={`w-3 h-3 rounded-full animate-bounce ${
              isSquadSpinner ? 'bg-volt-green' : 'bg-electric-red'
            }`} style={{ animationDelay: '0.1s' }} />
            <div className={`w-3 h-3 rounded-full animate-bounce ${
              isSquadSpinner ? 'bg-volt-green' : 'bg-electric-red'
            }`} style={{ animationDelay: '0.2s' }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
