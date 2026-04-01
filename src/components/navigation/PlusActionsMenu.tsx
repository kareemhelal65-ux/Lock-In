import { motion } from 'framer-motion';
import { Plus, ShoppingBag, X } from 'lucide-react';

interface PlusActionsMenuProps {
  onClose: () => void;
  onStartSawa: () => void;
  onViewOrders: () => void;
}

const PlusActionsMenu = ({ onClose, onStartSawa, onViewOrders }: PlusActionsMenuProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-24 pointer-events-none">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
      />

      {/* Menu Card */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-xs bg-white border-4 border-black p-6 rounded-3xl brutal-shadow-lg pointer-events-auto"
      >
        <button 
          onClick={onClose}
          aria-label="Close menu"
          className="absolute -top-3 -right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg active:scale-90 transition-transform"
        >
          <X size={20} strokeWidth={3} />
        </button>

        <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-6 text-center">
          What's the move?
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => {
              onStartSawa();
              onClose();
            }}
            className="group flex items-center gap-4 p-4 bg-volt-green border-4 border-black rounded-xl brutal-shadow-sm hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
          >
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-volt-green group-hover:scale-110 transition-transform">
              <Plus size={28} strokeWidth={3} />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display font-black text-lg uppercase leading-tight">Start Sawa</span>
              <span className="text-[10px] font-bold opacity-70 uppercase">Host a group order</span>
            </div>
          </button>

          <button
            onClick={() => {
              onViewOrders();
              onClose();
            }}
            className="group flex items-center gap-4 p-4 bg-white border-4 border-black rounded-xl brutal-shadow-sm hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
          >
            <div className="w-12 h-12 bg-electric-red rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} strokeWidth={3} />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display font-black text-lg uppercase leading-tight">My Orders</span>
              <span className="text-[10px] font-bold opacity-70 uppercase">Check order status</span>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlusActionsMenu;
