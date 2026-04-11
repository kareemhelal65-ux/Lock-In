import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Send, Clock, Tag, Flame, CheckCircle2, Megaphone, X } from 'lucide-react';
import { translations } from './translations';

interface DropStudioProps {
    vendorId: string;
    lang: 'en' | 'ar';
}

export default function DropStudio({ vendorId, lang }: DropStudioProps) {
    const t = translations[lang];

    // Announcement state
    const [announcement, setAnnouncement] = useState('');
    const [isPostingAnnouncement, setIsPostingAnnouncement] = useState(false);
    const [isClearingAnnouncement, setIsClearingAnnouncement] = useState(false);
    const [announcementSuccess, setAnnouncementSuccess] = useState(false);

    const handlePostAnnouncement = async () => {
        if (!announcement.trim()) return;
        setIsPostingAnnouncement(true);
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/announcement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: announcement })
            });
            if (res.ok) {
                setAnnouncementSuccess(true);
                setTimeout(() => setAnnouncementSuccess(false), 3000);
            }
        } catch (err) { console.error('Announcement error', err); }
        finally { setIsPostingAnnouncement(false); }
    };

    const handleClearAnnouncement = async () => {
        setIsClearingAnnouncement(true);
        try {
            await fetch(`/api/vendorData/${vendorId}/announcement`, { method: 'DELETE' });
            setAnnouncement('');
        } catch (err) { console.error('Clear announcement error', err); }
        finally { setIsClearingAnnouncement(false); }
    };

    const [form, setForm] = useState({
        title: '',
        originalPrice: '',
        dropPrice: '',
        quantity: '',
        duration: '30'
    });

    const [isPublishing, setIsPublishing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePublish = async () => {
        if (!form.title || !form.dropPrice) return;

        setIsPublishing(true);

        try {
            const res = await fetch('/api/vendorData/drops/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setForm({ title: '', originalPrice: '', dropPrice: '', quantity: '', duration: '30' });
                }, 3000);
            }
        } catch (err) {
            console.error("Failed to publish drop", err);
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 text-white custom-scrollbar pb-24 items-center flex justify-center bg-deep-charcoal relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-electric-red/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-xl w-full relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-electric-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-brutal-sm">
                        <Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter mb-2">{t.dropStudio}</h2>
                    <p className="text-cool-gray">{t.studioSub}</p>
                </div>

                {/* Announcements Section */}
                <div className="bg-zinc-900 border-2 border-volt-green/30 rounded-2xl p-4 md:p-6 shadow-2xl mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-volt-green rounded-full flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-deep-charcoal" />
                        </div>
                        <div>
                            <h3 className="font-display font-black text-xl uppercase tracking-tight">{t.announcements}</h3>
                            <p className="text-xs text-cool-gray">{t.announcementsSub}</p>
                        </div>
                    </div>
                    <textarea
                        className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 text-white text-base font-display font-bold focus:border-volt-green focus:outline-none transition-colors resize-none"
                        placeholder={t.announcementPlace}
                        rows={3}
                        value={announcement}
                        onChange={e => setAnnouncement(e.target.value)}
                        maxLength={200}
                    />
                    <div className="flex items-center justify-between mt-1 mb-3">
                        <span className="text-xs text-cool-gray">{announcement.length}/200</span>
                        {announcementSuccess && (
                            <span className="text-xs text-volt-green font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> {t.announcementLive}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePostAnnouncement}
                            disabled={!announcement.trim() || isPostingAnnouncement}
                            className="flex-1 bg-volt-green text-deep-charcoal font-display font-black uppercase tracking-widest py-3 rounded-xl hover:bg-[#b0f200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPostingAnnouncement ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                    <Send className="w-4 h-4" />
                                </motion.div>
                            ) : (
                                <Send className="w-4 h-4" />
                            )} {isPostingAnnouncement ? t.posting : t.postAnnouncement}
                        </button>
                        <button
                            onClick={handleClearAnnouncement}
                            disabled={isClearingAnnouncement}
                            className="px-4 py-3 bg-zinc-800 text-cool-gray font-display font-bold uppercase rounded-xl hover:bg-zinc-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isClearingAnnouncement ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                    <X className="w-4 h-4" />
                                </motion.div>
                            ) : (
                                <X className="w-4 h-4" />
                            )} {t.clear}
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900 border-2 border-cool-gray/30 rounded-2xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-volt-green flex flex-col items-center justify-center text-deep-charcoal"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                >
                                    <CheckCircle2 className="w-20 h-20 mb-4" />
                                </motion.div>
                                <h3 className="font-display font-black text-4xl uppercase tracking-tighter mb-2">{t.dropLive}</h3>
                                <p className="font-bold">{t.broadcastedTo.replace('{count}', '4,208')}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-6 relative z-10">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-cool-gray mb-2">{t.dropTitle}</label>
                            <input
                                type="text"
                                className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 text-white text-xl font-display font-bold focus:border-electric-red focus:outline-none transition-colors"
                                placeholder={t.dropTitlePlace}
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                            />
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-cool-gray mb-2">{t.dropPrice}</label>
                                <div className="relative">
                                    <Flame className={`w-5 h-5 text-electric-red absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2`} />
                                    <input
                                        type="number"
                                        className={`w-full bg-black border-2 border-electric-red/50 rounded-xl py-4 ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white text-xl font-display font-extrabold focus:border-electric-red focus:outline-none transition-colors`}
                                        placeholder="e.g. 99"
                                        value={form.dropPrice}
                                        onChange={e => setForm({ ...form, dropPrice: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-cool-gray mb-2">{t.origPrice}</label>
                                <div className="relative">
                                    <Tag className={`w-5 h-5 text-cool-gray absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2`} />
                                    <input
                                        type="number"
                                        className={`w-full bg-black border-2 border-cool-gray/30 rounded-xl py-4 ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-cool-gray text-xl font-display font-bold focus:border-cool-gray focus:outline-none transition-colors`}
                                        placeholder="e.g. 150"
                                        value={form.originalPrice}
                                        onChange={e => setForm({ ...form, originalPrice: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Scarcity Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-cool-gray mb-2">{t.dropQuantity}</label>
                                <input
                                    type="number"
                                    className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 text-white text-lg font-bold focus:border-electric-red focus:outline-none transition-colors"
                                    placeholder={t.dropQuantPlace}
                                    value={form.quantity}
                                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-cool-gray mb-2">{t.durationMin}</label>
                                <div className="relative">
                                    <Clock className={`w-5 h-5 text-volt-green absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2`} />
                                    <select
                                        className={`w-full bg-black border-2 border-cool-gray/30 rounded-xl py-4 ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white text-lg font-bold focus:border-electric-red focus:outline-none transition-colors appearance-none`}
                                        value={form.duration}
                                        onChange={e => setForm({ ...form, duration: e.target.value })}
                                        title={t.durationMin}
                                    >
                                        <option value="15">{t.min15}</option>
                                        <option value="30">{t.min30}</option>
                                        <option value="60">{t.hour1}</option>
                                        <option value="120">{t.hour2}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handlePublish}
                            disabled={!form.title || !form.dropPrice || isPublishing}
                            className={`w-full font-display font-black uppercase text-xl p-5 rounded-xl mt-4 flex items-center justify-center gap-3 transition-all ${!form.title || !form.dropPrice
                                ? 'bg-cool-gray/20 text-cool-gray cursor-not-allowed border-2 border-transparent'
                                : 'bg-electric-red text-white hover:bg-red-600 active:scale-[0.98] border-2 border-electric-red shadow-[0_0_20px_rgba(255,0,0,0.3)]'
                                }`}
                        >
                            {isPublishing ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                >
                                    <Send className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <>
                                    <Send className="w-6 h-6" /> {t.publishDrop}
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-cool-gray mt-4 font-bold uppercase tracking-widest">
                            {t.irreversible}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
