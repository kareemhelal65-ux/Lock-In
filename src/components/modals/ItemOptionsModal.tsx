import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageSquare, Plus } from 'lucide-react';
import type { MenuItem } from '@/types';

interface ItemOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onConfirm: (selectedAddOns: any[], specialNotes: string) => void;
}

export default function ItemOptionsModal({ isOpen, onClose, item, onConfirm }: ItemOptionsModalProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');

  if (!item) return null;

  const availableAddOns = typeof item.addOns === 'string' 
    ? JSON.parse(item.addOns || '[]') 
    : (item.addOns || []);

  const toggleAddOn = (addon: any) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.name === addon.name);
      if (exists) {
        return prev.filter(a => a.name !== addon.name);
      }
      return [...prev, addon];
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedAddOns, specialNotes);
    // Reset state for next time
    setSelectedAddOns([]);
    setSpecialNotes('');
    onClose();
  };

  const currentTotal = item.price + selectedAddOns.reduce((acc, a) => acc + (a.price || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white border-4 border-black w-full max-w-lg overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl"
          >
            {/* Header */}
            <div className="p-4 border-b-4 border-black bg-volt-green flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-lg p-1 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <div>
                  <h2 className="font-display font-black text-xl uppercase leading-none">{item.name}</h2>
                  <p className="font-display font-bold text-sm text-black/60 uppercase mt-1">{item.price} EGP Base</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto no-scrollbar">
              {/* Add-ons Section */}
              {availableAddOns.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-black/40">Customize Your Item</h3>
                    <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded uppercase">Optional</span>
                  </div>
                  <div className="space-y-2">
                    {availableAddOns.map((addon: any, idx: number) => {
                      const isSelected = selectedAddOns.find(a => a.name === addon.name);
                      const isSoldOut = addon.inStock === false;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => !isSoldOut && toggleAddOn(addon)}
                          disabled={isSoldOut}
                          className={`w-full p-4 border-2 border-black rounded-xl flex items-center justify-between transition-all ${
                            isSoldOut ? 'bg-gray-200 opacity-60 cursor-not-allowed grayscale' :
                            isSelected ? 'bg-volt-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 border-2 border-black rounded flex items-center justify-center ${
                              isSoldOut ? 'bg-gray-300' :
                              isSelected ? 'bg-black text-white' : 'bg-white'
                            }`}>
                              {isSelected && <Check className="w-4 h-4" />}
                              {isSoldOut && <X className="w-3 h-3 text-black/40" />}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="font-display font-bold text-sm uppercase">{addon.name}</span>
                              {isSoldOut && <span className="text-[10px] font-black text-electric-red uppercase">Sold Out</span>}
                            </div>
                          </div>
                          <span className="font-display font-black text-sm">+{addon.price} EGP</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Notes Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-black/40" />
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-black/40">Special Notes</h3>
                </div>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. No pickles, extra napkins, etc."
                  className="w-full h-32 p-4 border-2 border-black rounded-xl font-body text-sm focus:ring-4 focus:ring-volt-green/20 outline-none resize-none bg-gray-50"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black bg-gray-50 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-display font-black uppercase text-black/40 tracking-widest">Final Amount</p>
                <p className="font-display font-black text-2xl">{currentTotal} EGP</p>
              </div>
              <button
                onClick={handleConfirm}
                className="flex-[1.5] bg-black text-white py-4 px-6 rounded-xl font-display font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-black/90 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]"
              >
                <Plus className="w-5 h-5 text-volt-green" />
                Add to Bag
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
