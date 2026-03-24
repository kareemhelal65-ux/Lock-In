import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, CheckCircle2 } from 'lucide-react';

interface RatingModalProps {
    vendorId: string;
    vendorName: string;
    onClose: () => void;
}

export default function RatingModal({ vendorId, vendorName, onClose }: RatingModalProps) {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!selected) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/consumer/rating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId, rating: selected })
            });
            setSubmitted(true);
            setTimeout(onClose, 1800);
        } catch (err) {
            console.error('Rating error', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                className="relative w-full max-w-sm bg-white border-4 border-deep-charcoal rounded-3xl p-6 text-center"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-1">
                    <X className="w-5 h-5 text-cool-gray" />
                </button>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
                            <CheckCircle2 className="w-16 h-16 text-volt-green mx-auto mb-3" />
                            <h3 className="font-display font-black text-2xl uppercase">Thanks!</h3>
                            <p className="text-cool-gray mt-1">Your rating was saved.</p>
                        </motion.div>
                    ) : (
                        <motion.div key="rate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="font-display font-bold text-sm uppercase tracking-wider text-cool-gray mb-2">Rate Your Experience</p>
                            <h3 className="font-display font-black text-2xl uppercase mb-6">{vendorName}</h3>

                            {/* Stars */}
                            <div className="flex justify-center gap-2 mb-6">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <motion.button
                                        key={star}
                                        onMouseEnter={() => setHovered(star)}
                                        onMouseLeave={() => setHovered(0)}
                                        onClick={() => setSelected(star)}
                                        whileTap={{ scale: 0.8 }}
                                        className="p-1"
                                    >
                                        <Star
                                            className={`w-10 h-10 transition-all duration-150 ${star <= (hovered || selected)
                                                    ? 'fill-volt-green text-volt-green scale-110'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    </motion.button>
                                ))}
                            </div>

                            {selected > 0 && (
                                <p className="text-sm text-cool-gray mb-4 font-bold">
                                    {selected === 1 && 'Not great 😕'}
                                    {selected === 2 && 'Could be better 😐'}
                                    {selected === 3 && 'It was alright 🙂'}
                                    {selected === 4 && 'Pretty good! 😊'}
                                    {selected === 5 && 'Absolutely locked in! 🔥'}
                                </p>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={!selected || isSubmitting}
                                className="w-full bg-deep-charcoal text-white font-display font-black uppercase tracking-widest py-4 rounded-xl hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                            </button>
                            <button onClick={onClose} className="mt-3 text-sm text-cool-gray font-bold">Skip for now</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
