import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertTriangle, Loader2, X, CheckCircle2 } from 'lucide-react';

interface PaymentDropzoneProps {
    expectedAmount: number;
    vendorInstapay: string;
    vendorInstapayName?: string;
    orderId: string;
    userId: string;
    onVerifySuccess: () => void;
    onCancel: () => void;
}

export default function PaymentDropzone({
    expectedAmount,
    vendorInstapay,
    vendorInstapayName,
    orderId,
    userId,
    onVerifySuccess,
    onCancel
}: PaymentDropzoneProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorStatus, setErrorStatus] = useState<string | null>(null);
    const [uploadDone, setUploadDone] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            if (selected.size > 10 * 1024 * 1024) {
                setErrorStatus('File too large. Please upload an image under 10MB.');
                return;
            }
            setFile(selected);
            const objectUrl = URL.createObjectURL(selected);
            setPreview(objectUrl);
            setErrorStatus(null);
        }
    };

    const handleVerify = async () => {
        if (!file) return;

        setIsVerifying(true);
        setErrorStatus(null);

        try {
            // Step 1: Upload file to server
            const formData = new FormData();
            formData.append('receipt', file);

            const uploadRes = await fetch('/api/consumer/upload-receipt', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) {
                throw new Error('Failed to upload screenshot to server.');
            }

            const { url } = await uploadRes.json();

            // Step 2: Mark payment as submitted with screenshot URL
            const verifyRes = await fetch('/api/consumer/payment-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    userId,
                    amountExpected: expectedAmount,
                    receiptData: url
                }),
            });

            if (!verifyRes.ok) {
                const errData = await verifyRes.json();
                throw new Error(errData.error || 'Verification submission failed.');
            }

            setUploadDone(true);
            setTimeout(() => {
                onVerifySuccess();
            }, 400);

        } catch (error: any) {
            console.error('Upload Error:', error);
            setIsVerifying(false);
            setErrorStatus(error.message || 'Failed to upload receipt. Try a clearer screenshot.');
        }
    };

    if (uploadDone) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-20 h-20 bg-volt-green rounded-full flex items-center justify-center mb-4 border-4 border-deep-charcoal"
                >
                    <CheckCircle2 className="w-10 h-10 text-deep-charcoal" />
                </motion.div>
                <h3 className="font-display font-black text-2xl uppercase text-deep-charcoal mb-2">Receipt Uploaded!</h3>
                <p className="text-cool-gray font-bold text-sm">Pending vendor review...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border-2 border-deep-charcoal flex flex-col w-full h-full min-h-[400px] md:min-h-0 overflow-y-auto text-black">
            {/* Header */}
            <div className="p-5 border-b-2 border-deep-charcoal/10">
                <h3 className="font-display font-extrabold text-2xl uppercase text-deep-charcoal text-center">
                    Pay via InstaPay
                </h3>
            </div>

            {/* Instapay Details Box */}
            <div className="mx-5 mt-5 bg-volt-green/15 border-2 border-volt-green p-5 rounded-xl">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-deep-charcoal font-bold uppercase tracking-widest mb-1">Send Payment To</p>
                        <p className="font-display font-black text-2xl text-deep-charcoal">{vendorInstapay || 'Loading...'}</p>
                        {vendorInstapayName && (
                            <p className="text-sm text-cool-gray font-bold mt-1">{vendorInstapayName}</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-deep-charcoal font-bold uppercase tracking-widest mb-1">Amount Due</p>
                        <p className="font-display font-black text-3xl text-deep-charcoal">{expectedAmount} EGP</p>
                    </div>
                </div>
            </div>

            <p className="mx-5 mt-4 text-sm text-cool-gray font-bold">
                After sending, upload your InstaPay transfer screenshot below. The vendor will manually verify it.
            </p>

            {/* Dropzone */}
            <div className="flex-1 mx-5 mt-4 mb-4 flex flex-col min-h-[260px]">
                <div
                    className={`border-4 border-dashed rounded-xl flex-1 flex flex-col items-center justify-center transition-all cursor-pointer ${preview ? 'border-deep-charcoal bg-gray-50' : 'border-cool-gray/50 bg-gray-50 hover:bg-gray-100 hover:border-deep-charcoal'}`}
                    onClick={() => !preview && fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    {preview ? (
                        <div className="relative w-full h-full min-h-[240px] rounded-lg overflow-hidden">
                            <img src={preview} alt="Receipt preview" className="w-full h-full object-contain" />
                            {!isVerifying && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                        setPreview(null);
                                        setErrorStatus(null);
                                    }}
                                    className="absolute top-3 right-3 bg-white rounded-full p-1.5 border-2 border-deep-charcoal shadow-lg hover:scale-110 active:scale-95 transition-transform"
                                >
                                    <X className="w-5 h-5 text-electric-red" />
                                </button>
                            )}

                            <AnimatePresence>
                                {isVerifying && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-deep-charcoal/85 flex flex-col items-center justify-center text-volt-green backdrop-blur-sm"
                                    >
                                        <motion.div
                                            animate={{ y: [-5, 5, -5] }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                        >
                                            <Upload className="w-14 h-14 mb-3" />
                                        </motion.div>
                                        <p className="font-display font-bold uppercase tracking-wider animate-pulse text-lg">Uploading Receipt...</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <div className="w-24 h-24 bg-white rounded-full border-2 border-deep-charcoal flex items-center justify-center mx-auto mb-5 shadow-md">
                                <Upload className="w-12 h-12 text-deep-charcoal" />
                            </div>
                            <p className="font-display font-black text-xl text-deep-charcoal">TAP TO UPLOAD RECEIPT</p>
                            <p className="text-sm font-bold text-cool-gray mt-2">PNG, JPG, HEIC — up to 10MB</p>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {errorStatus && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mx-5 mb-3 bg-electric-red/10 border-2 border-electric-red text-electric-red p-3 rounded-lg flex items-start gap-2"
                    >
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-bold uppercase">{errorStatus}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex gap-3 p-5 border-t-2 border-deep-charcoal/10">
                <button
                    onClick={onCancel}
                    disabled={isVerifying}
                    className="flex-1 py-4 font-display font-bold uppercase border-2 border-deep-charcoal rounded-pill disabled:opacity-50 text-lg"
                >
                    Cancel
                </button>
                <button
                    onClick={handleVerify}
                    disabled={!file || isVerifying}
                    className={`flex-1 py-4 font-display font-bold uppercase border-2 border-deep-charcoal rounded-pill flex justify-center items-center gap-2 text-lg transition-all ${file && !isVerifying ? 'bg-deep-charcoal text-white hover:scale-[0.98]' : 'bg-gray-200 text-cool-gray cursor-not-allowed'}`}
                >
                    {isVerifying ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        'Submit Receipt'
                    )}
                </button>
            </div>
        </div>
    );
}
