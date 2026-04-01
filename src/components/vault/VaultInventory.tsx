import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Sparkles, Zap, Lock, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';


export default function VaultInventory() {
  const { 
    currentUser,
    setCurrentUser,
    setInventory,
    inventory
  } = useApp();

  const [isEquipping, setIsEquipping] = React.useState<string | null>(null);

  const handleEquipCard = async (userCardId: string) => {
    if (!currentUser?.id || isEquipping) return;
    
    setIsEquipping(userCardId);
    try {
      const isCurrentlyActive = currentUser?.activeCard?.id === userCardId;
      const res = await fetch('/api/consumer/user/activate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          userCardId: isCurrentlyActive ? null : userCardId 
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Update currentUser context with the new activeCard
        setCurrentUser({
          ...currentUser,
          activeCard: isCurrentlyActive ? null : data.activeCard
        });
      }
    } catch (err) {
      console.error('Failed to equip card', err);
    } finally {
      setIsEquipping(null);
    }
  };

  useEffect(() => {
    console.log('VaultInventory: useEffect triggered', { userId: currentUser?.id });
    if (currentUser?.id) {
       console.log('VaultInventory: Fetching inventory for', currentUser.id);
       fetch(`/api/consumer/user/${currentUser.id}/inventory`)
        .then(res => {
          console.log('VaultInventory: Fetch response status', res.status);
          return res.json();
        })
        .then(data => {
          console.log('VaultInventory: Fetched data', data);
          setInventory(data.inventory || []);
        })
        .catch(err => console.error('VaultInventory: Fetch error', err));
    }
  }, [currentUser?.id, setInventory]);

  return (
    <div className="space-y-6">
      {/* Card Inventory */}
      <div>
        <h3 className="font-display font-bold text-sm uppercase text-deep-charcoal/60 tracking-wider mb-3">
          Your Arsenal ({inventory.length})
        </h3>
        
        {inventory.length === 0 ? (
          <div className="brutal-card p-8 text-center bg-white/50 border-dashed">
             <Lock className="w-10 h-10 text-cool-gray/30 mx-auto mb-2" />
             <p className="font-display font-bold text-sm text-cool-gray">No items found. Gamble to win cards!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventory.map((uc: any) => (
              <motion.div
                key={uc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`brutal-card p-4 relative overflow-hidden transition-all hover:scale-[1.02] ${
                  uc.card.rarity === 'Exotic' ? 'bg-black text-white border-volt-green shadow-[0_0_20px_rgba(57,255,20,0.3)]' :
                  uc.card.rarity === 'Legendary' ? 'bg-black text-white border-electric-red shadow-[0_0_20px_rgba(255,10,12,0.3)]' :
                  'bg-white text-deep-charcoal border-deep-charcoal'
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-14 h-14 border-4 border-black flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    uc.card.rarity === 'Exotic' ? 'bg-volt-green' : 
                    uc.card.rarity === 'Legendary' ? 'bg-electric-red' : 
                    uc.card.rarity === 'Rare' ? 'bg-indigo-600' : 'bg-cool-gray'
                  }`}>
                    <Sparkles className={`w-8 h-8 ${uc.card.rarity === 'Exotic' || uc.card.rarity === 'Legendary' || uc.card.rarity === 'Rare' ? 'text-white' : 'text-deep-charcoal'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                      <h4 className="font-display font-black text-sm uppercase tracking-tighter truncate italic">{uc.card.name}</h4>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-pill border-2 border-black inline-block whitespace-nowrap ${
                        uc.card.rarity === 'Exotic' ? 'bg-volt-green text-black' : 
                        uc.card.rarity === 'Legendary' ? 'bg-electric-red text-white' : 
                        'bg-black text-white'
                      }`}>
                        {uc.card.rarity}
                      </span>
                    </div>
                    <p className={`text-[10px] mt-1 leading-tight font-bold ${uc.card.rarity === 'Exotic' || uc.card.rarity === 'Legendary' ? 'text-white/70' : 'text-cool-gray'}`}>
                      {uc.card.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5">
                       <Zap className={`w-3 h-3 ${uc.card.rarity === 'Exotic' ? 'text-volt-green' : 'text-indigo-600'}`} />
                       <span className={`text-[8px] font-black uppercase tracking-widest ${uc.card.rarity === 'Exotic' ? 'text-volt-green' : 'text-indigo-600'}`}>
                         SLOT: {uc.card.perkCode}
                       </span>
                    </div>

                    <button
                      onClick={() => handleEquipCard(uc.id)}
                      disabled={isEquipping !== null}
                      className={`mt-4 w-full py-2 rounded-pill font-display font-black text-[10px] uppercase tracking-widest border-2 transition-all ${
                        currentUser?.activeCard?.id === uc.id
                          ? 'bg-volt-green text-black border-black'
                          : 'bg-white text-black border-black/20 hover:border-black'
                      } ${isEquipping === uc.id ? 'opacity-50' : ''}`}
                    >
                      {isEquipping === uc.id ? 'Activating...' : currentUser?.activeCard?.id === uc.id ? '✓ Equipped' : 'Equip Perk'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="brutal-card p-4 bg-deep-charcoal text-white">
        <h4 className="font-display font-bold text-sm mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-volt-green" />
          The Hype Economy
        </h4>
        <ul className="space-y-4 text-xs text-white/70">
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 bg-volt-green/20 rounded-full flex items-center justify-center shrink-0"><TrendingUp className="w-3 h-3 text-volt-green" /></div>
            <span>Acquire **1 WHEEL SPIN** for every 250 Hype Points accumulated.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 bg-volt-green/20 rounded-full flex items-center justify-center shrink-0"><Sparkles className="w-3 h-3 text-volt-green" /></div>
            <span>Access Profile via the **Wheel Spinner** to win Artifacts.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 bg-volt-green/20 rounded-full flex items-center justify-center shrink-0"><Lock className="w-3 h-3 text-volt-green" /></div>
            <span>Artifacts remain in your Arsenal until deployed in the Field.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
