import { motion } from 'framer-motion';
import { Lock, Store, ChevronRight } from 'lucide-react';

interface LandingSwitcherProps {
    onSelectMode: (mode: 'consumer' | 'vendor' | 'dev') => void;
}

export default function LandingSwitcher({ onSelectMode }: LandingSwitcherProps) {
    return (
        <div className="min-h-screen bg-deep-charcoal text-white flex flex-col p-6 items-center justify-center relative overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-volt-green/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-electric-red/20 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Lock className="w-12 h-12 text-volt-green" strokeWidth={3} />
                    </div>
                    <h1 className="font-display font-black text-6xl tracking-tighter uppercase leading-none">
                        SAWA
                    </h1>
                    <p className="text-cool-gray font-bold mt-4 tracking-widest uppercase text-sm">
                        Select Your Environment
                    </p>
                </div>

                <div className="space-y-4">
                    <motion.button
                        onClick={() => onSelectMode('consumer')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-volt-green text-deep-charcoal p-6 rounded-xl border-4 border-transparent hover:border-white transition-all text-left flex items-center justify-between group"
                    >
                        <div>
                            <h2 className="font-display font-black text-2xl uppercase mb-1">Consumer App</h2>
                            <p className="text-sm font-bold opacity-80">Host Sawas, deploy cards, Sawa drops.</p>
                        </div>
                        <div className="w-10 h-10 bg-deep-charcoal rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-deep-charcoal transition-colors">
                            <ChevronRight className="w-6 h-6 text-volt-green group-hover:text-deep-charcoal" />
                        </div>
                    </motion.button>

                    <motion.button
                        onClick={() => onSelectMode('vendor')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-deep-charcoal text-white p-6 rounded-xl border-4 border-cool-gray hover:border-electric-red transition-all text-left flex items-center justify-between group"
                    >
                        <div>
                            <h2 className="font-display font-black text-2xl uppercase mb-1 flex items-center gap-2">
                                <Store className="w-6 h-6 text-electric-red" />
                                Vendor Hub
                            </h2>
                            <p className="text-sm text-cool-gray">Manage inventory, strike orders, fulfill drops.</p>
                        </div>
                        <div className="w-10 h-10 bg-cool-gray/20 rounded-full flex items-center justify-center group-hover:bg-electric-red transition-colors">
                            <ChevronRight className="w-6 h-6 text-white" />
                        </div>
                    </motion.button>
                    <motion.button
                        onClick={() => onSelectMode('dev')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white text-black p-6 rounded-xl border-4 border-black hover:bg-black hover:text-white transition-all text-left flex items-center justify-between group"
                    >
                        <div>
                            <h2 className="font-display font-black text-2xl uppercase mb-1 flex items-center gap-2">
                                War Room
                            </h2>
                            <p className="text-sm font-bold text-gray-500 group-hover:text-gray-300">Dev Dashboard & Analytics</p>
                        </div>
                        <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
