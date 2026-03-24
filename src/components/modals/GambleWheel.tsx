import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Sparkles, Trophy, AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface GambleWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GambleWheel({ isOpen, onClose }: GambleWheelProps) {
  const { currentUser, setCurrentUser, setInventory, addNotification } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const hasKeys = (currentUser?.keysAvailable ?? 0) > 0;

  const spin = async () => {
    if (isSpinning || !currentUser?.id || !hasKeys) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    // Add noise to rotation
    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const finalAngle = rotation + (extraSpins * 360) + Math.floor(Math.random() * 360);
    setRotation(finalAngle);

    try {
      const res = await fetch('/api/consumer/gamble/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
      });
      
      const data = await res.json();
      
      // Wait for animation to "finish"
      setTimeout(() => {
        setIsSpinning(false);
        setResult(data);
        setShowResult(true);
        if (data.updatedUser) {
          setCurrentUser(data.updatedUser);
        }
        
        if (data.type === 'CARD') {
          addNotification({
            id: `win-${Date.now()}`,
            type: 'order_confirmed',
            title: 'ARTIFACT ACQUIRED',
            message: `You won: ${data.card.name}`,
            timestamp: new Date(),
            read: false
          });
          // Refresh inventory
          fetch(`/api/consumer/user/${currentUser.id}/inventory`)
            .then(r => r.json())
            .then(inv => setInventory(inv.inventory || []));
        }
      }, 4000);
    } catch (error) {
      console.error('Spin error:', error);
      setIsSpinning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep-charcoal/95 backdrop-blur-xl"
      >
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="w-full max-w-md text-center">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tighter mb-2 italic">
            SAFE CRACKER
          </h2>
          <p className="text-volt-green font-bold text-sm tracking-widest mb-12 uppercase">
            ESTABLISH DOMINANCE. WIN ARTIFACTS.
          </p>

          <div className="relative w-80 h-80 mx-auto group">
            {/* The Turbine */}
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ 
                duration: 4, 
                ease: [0.45, 0.05, 0.55, 0.95] 
              }}
              className="w-full h-full rounded-full border-[12px] border-deep-charcoal bg-black relative overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.2)]"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 w-1 h-1/2 bg-volt-green/20 origin-bottom"
                  style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                 <Zap className="w-12 h-12 text-volt-green opacity-20" />
              </div>
            </motion.div>

            {/* The Pointer */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-volt-green clip-path-triangle z-10 border-4 border-black" 
              style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
            />
          </div>

          <div className="mt-12">
            <button
              onClick={spin}
              disabled={isSpinning || !hasKeys}
              className={`brutal-btn w-full py-6 text-2xl font-black italic uppercase transition-all ${
                !hasKeys ? 'opacity-40 grayscale cursor-not-allowed bg-cool-gray text-white' :
                isSpinning ? 'opacity-50 grayscale cursor-not-allowed' : 'bg-volt-green text-black hover:scale-105 active:scale-95'
              }`}
            >
              {!hasKeys ? 'NO KEYS — EARN MORE HYPE' : isSpinning ? 'CRACKING...' : 'PULL THE LEVER'}
            </button>
            <p className="mt-4 text-white/50 text-[10px] font-bold uppercase tracking-widest">
              {hasKeys ? 'Consumption: 1 SAFE KEY per spin' : `${currentUser?.keysAvailable ?? 0} keys available`}
            </p>
          </div>
        </div>

        {/* Result Overlay */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-6 bg-black/90 z-[110]"
            >
              <div className="brutal-card bg-white p-8 max-w-sm w-full text-center">
                {result.type === 'CARD' ? (
                  <>
                    <div className="w-20 h-20 bg-indigo-600 border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-2">ARTIFACT UNLOCKED</h3>
                    <p className="text-indigo-600 font-bold text-xl mb-4 italic underline uppercase">{result.card.name}</p>
                    <p className="text-cool-gray text-sm mb-8">{result.card.description}</p>
                  </>
                ) : result.type === 'HYPE_BOOST' ? (
                  <>
                    <div className="w-20 h-20 bg-volt-green border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Trophy className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-2">SYSTEM BOOST</h3>
                    <p className="text-volt-green font-black text-4xl mb-4 text-stroke-black">+{result.points} PTS</p>
                    <p className="text-cool-gray text-sm mb-8">Your social standing has been elevated.</p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-cool-gray/20 border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <AlertTriangle className="w-10 h-10 text-cool-gray" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-2">BIG L</h3>
                    <p className="text-cool-gray font-bold text-lg mb-8 uppercase italic">THE SAFE REMAINS SEALED.</p>
                  </>
                )}

                <button 
                  onClick={() => setShowResult(false)}
                  className="brutal-btn bg-black text-white w-full py-4 font-bold uppercase tracking-widest"
                >
                  LOCK IN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
