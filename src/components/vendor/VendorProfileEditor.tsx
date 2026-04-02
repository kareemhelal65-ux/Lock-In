import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { translations } from './translations';

interface VendorProfileEditorProps {
    vendorId: string;
    onClose: () => void;
    lang: 'en' | 'ar';
    onProfileUpdated?: () => void;
}

export default function VendorProfileEditor({ vendorId, onClose, lang, onProfileUpdated }: VendorProfileEditorProps) {
    const t = translations[lang];
    const [name, setName] = useState('');
    const [instapayName, setInstapayName] = useState('');
    const [instapayAddress, setInstapayAddress] = useState('');

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    // Preview URLs
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const logoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            if (type === 'logo') {
                setLogoFile(file);
                setLogoPreview(url);
            } else {
                setBannerFile(file);
                setBannerPreview(url);
            }
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setStatus('idle');

        const formData = new FormData();
        if (name) formData.append('name', name);
        if (instapayName) formData.append('instapayName', instapayName);
        if (instapayAddress) formData.append('instapayAddress', instapayAddress);
        if (logoFile) formData.append('image', logoFile);
        if (bannerFile) formData.append('bannerImage', bannerFile);

        try {
            const res = await fetch(`/api/vendorData/${vendorId}/profile`, {
                method: 'PUT',
                body: formData
            });

            if (!res.ok) throw new Error('Failed to update profile');

            setStatus('success');
            if (onProfileUpdated) onProfileUpdated();

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Profile update error:', error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-safe" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-deep-charcoal border-2 border-cool-gray/20 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 border-b-2 border-cool-gray/20 flex items-center justify-between sticky top-0 bg-deep-charcoal z-10">
                    <h2 className="font-display font-black text-2xl uppercase tracking-widest text-white">{t.merchantProfile}</h2>
                    <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-8">
                    {/* Visual Identity Section */}
                    <div>
                        <h3 className="font-display font-bold uppercase text-cool-gray mb-4">{t.visualIdentity}</h3>

                        <div className="space-y-6">
                            {/* Banner Upload */}
                            <div
                                className="relative h-40 rounded-xl border-2 border-dashed border-cool-gray/30 bg-zinc-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-volt-green/50 transition-colors overflow-hidden group"
                                onClick={() => bannerInputRef.current?.click()}
                            >
                                {bannerPreview ? (
                                    <div className="absolute inset-0 w-full h-full">
                                        <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover opacity-60" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="font-bold text-white uppercase text-sm tracking-wider">{t.changeBanner}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-cool-gray mb-2" />
                                        <span className="font-bold text-cool-gray uppercase text-sm tracking-wider">{t.uploadBanner}</span>
                                    </>
                                )}
                                <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} />
                            </div>

                            <div className={`flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 sm:-mt-16 ${lang === 'ar' ? 'mr-4 sm:mr-6' : 'ml-4 sm:ml-6'} relative z-10`}>
                                {/* Logo Upload */}
                                <div
                                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-deep-charcoal bg-zinc-900 flex flex-col items-center justify-center cursor-pointer hover:border-volt-green/50 transition-colors overflow-hidden group shadow-2xl"
                                    onClick={() => logoInputRef.current?.click()}
                                >
                                    {logoPreview ? (
                                        <>
                                            <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="w-5 h-5 text-white mb-1" />
                                                <span className="font-bold text-white uppercase text-[10px] tracking-wider">{t.edit}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-6 h-6 text-cool-gray mb-1" />
                                            <span className="font-bold text-cool-gray uppercase text-[10px] text-center px-2 tracking-wider">{t.uploadLogo}</span>
                                        </>
                                    )}
                                    <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                                </div>
                                <div className="flex-1 w-full pb-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-cool-gray mb-2">{t.displayName}</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-3 sm:p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                        placeholder={lang === 'ar' ? "أدخل اسم المتجر (تحديث اختياري)" : "Enter Store Name (Optional update)"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Secion */}
                    <div className="pt-6 border-t border-cool-gray/20">
                        <h3 className="font-display font-bold uppercase text-cool-gray mb-4">{t.financialDetails}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-cool-gray mb-2">{t.instapayInfo}</label>
                                <input
                                    type="text"
                                    value={instapayAddress}
                                    onChange={(e) => setInstapayAddress(e.target.value)}
                                    className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-3 sm:p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                    placeholder={lang === 'ar' ? "عنوان محدث اختياري" : "Optional updated address"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-cool-gray mb-2">{t.verifiedName}</label>
                                <input
                                    type="text"
                                    value={instapayName}
                                    onChange={(e) => setInstapayName(e.target.value)}
                                    className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-3 sm:p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                    placeholder={lang === 'ar' ? "اسم محدث اختياري" : "Optional updated name"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t-2 border-cool-gray/20 bg-zinc-900/50 sticky bottom-0 z-10">
                    <AnimatePresence mode="wait">
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="mb-4 flex items-center gap-2 text-electric-red text-sm font-bold bg-electric-red/10 p-3 rounded-lg border border-electric-red/20"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {t.profileUpdateError}
                            </motion.div>
                        )}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="mb-4 flex items-center gap-2 text-volt-green text-sm font-bold bg-volt-green/10 p-3 rounded-lg border border-volt-green/20"
                            >
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> {t.profileUpdated}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={handleSave}
                        disabled={isLoading || status === 'success'}
                        className="w-full bg-volt-green text-deep-charcoal font-display font-black uppercase tracking-widest text-lg py-4 px-6 rounded-xl hover:bg-[#b0f200] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-4 border-deep-charcoal border-t-transparent rounded-full animate-spin" />
                                {t.savingChanges}
                            </span>
                        ) : status === 'success' ? (
                            <span className="flex items-center gap-2">{lang === 'ar' ? 'تم الحفظ' : 'Saved'} <CheckCircle2 className="w-5 h-5" /></span>
                        ) : t.saveProfile}
                    </button>
                    <p className="text-center text-xs text-cool-gray mt-4 font-medium uppercase tracking-wider">
                        {t.verifDelayed}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
