import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Activity } from 'lucide-react';
import VendorDashboard from '@/components/vendor/VendorDashboard';
import VendorRoster from '@/components/vendor/VendorRoster';
import DropStudio from '@/components/vendor/DropStudio';
import VendorLedger from '@/components/vendor/VendorLedger';
import VendorProfileEditor from '@/components/vendor/VendorProfileEditor';

interface VendorAppProps {
    onBack: () => void;
}

export default function VendorApp({ onBack }: VendorAppProps) {
    const [appState, setAppState] = useState<'login' | 'signup' | 'onboarding' | 'terminal'>(() => {
        const saved = localStorage.getItem('vendorAppState');
        return (saved as any) || 'login';
    });
    const [vendorStatus, setVendorStatus] = useState<'live' | 'swamped' | 'offline'>('live');
    const [activeTab, setActiveTab] = useState<'terminal' | 'roster' | 'drop' | 'ledger'>(() => {
        const saved = localStorage.getItem('vendorActiveTab');
        return (saved as any) || 'terminal';
    });
    const [showProfileEditor, setShowProfileEditor] = useState(false);

    // Vendor data
    const [ledgerPin, setLedgerPin] = useState('1234');
    const [currentVendorId, setCurrentVendorId] = useState<string | null>(() => {
        return localStorage.getItem('currentVendorId');
    });

    useEffect(() => {
        if (currentVendorId) {
            localStorage.setItem('currentVendorId', currentVendorId);
            localStorage.setItem('vendorAppState', appState);
            localStorage.setItem('vendorActiveTab', activeTab);
        } else {
            localStorage.removeItem('currentVendorId');
            localStorage.removeItem('vendorAppState');
            localStorage.removeItem('vendorActiveTab');
        }
    }, [currentVendorId, appState, activeTab]);
    const [vendorProfile, setVendorProfile] = useState<{
        instapayAddress?: string;
        instapayName?: string;
        name?: string;
        status?: string;
    }>({});

    const [onboardingForm, setOnboardingForm] = useState({
        vendorName: '',
        instapayName: '',
        instapayAddress: '',
        pin: '',
        confirmPin: ''
    });

    // Auth Forms
    const [loginForm, setLoginForm] = useState({ vendorId: '', password: '' });
    const [signupForm, setSignupForm] = useState({ vendorId: '', password: '', confirmPassword: '' });

    // Status
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch vendor profile after login
    const fetchVendorProfile = async (vendorId: string) => {
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/profile`);
            if (res.ok) {
                const data = await res.json();
                setVendorProfile(data.vendor || {});
                // Sync vendor status from DB
                const dbStatus = (data.vendor?.status || 'LIVE').toLowerCase() as 'live' | 'swamped' | 'offline';
                setVendorStatus(dbStatus);
            }
        } catch (e) {
            console.error('Failed to fetch vendor profile', e);
        }
    };

    const handleSignup = async () => {
        setErrorMessage('');
        if (signupForm.password !== signupForm.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/vendor/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vendorId: signupForm.vendorId, password: signupForm.password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Signup failed');
            setCurrentVendorId(data.vendorId);
            setAppState('onboarding');
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        setErrorMessage('');
        setIsLoading(true);
        try {
            const res = await fetch('/api/vendor/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            const vid = data.vendor.id;
            setCurrentVendorId(vid);
            await fetchVendorProfile(vid);
            setAppState('terminal');
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOnboardingSubmit = async () => {
        setErrorMessage('');
        if (!onboardingForm.pin || onboardingForm.pin !== onboardingForm.confirmPin) {
            setErrorMessage("Ledger PINs do not match or are empty.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/vendor/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vendorId: currentVendorId,
                    vendorName: onboardingForm.vendorName,
                    instapayAddress: onboardingForm.instapayAddress,
                    instapayName: onboardingForm.instapayName,
                    pin: onboardingForm.pin
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Onboarding failed');

            setLedgerPin(onboardingForm.pin);
            setVendorProfile({
                instapayAddress: onboardingForm.instapayAddress,
                instapayName: onboardingForm.instapayName,
                name: onboardingForm.vendorName
            });
            if (currentVendorId) await fetchVendorProfile(currentVendorId);
            setAppState('terminal');
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (newStatus: 'live' | 'swamped' | 'offline') => {
        setVendorStatus(newStatus);
        if (currentVendorId) {
            try {
                await fetch(`/api/vendorData/${currentVendorId}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus.toUpperCase() })
                });
            } catch (e) {
                console.error('Failed to update status', e);
            }
        }
    };

    if (appState === 'login') {
        return (
            <div className="min-h-screen bg-deep-charcoal text-white p-6 flex flex-col pt-safe">
                <button onClick={onBack} className="self-start p-2 hover:bg-white/10 rounded-full transition-colors mb-8">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                    <h1 className="font-display font-black text-5xl uppercase mb-2 text-white">Vendor Terminal</h1>
                    <p className="text-cool-gray mb-8">Enter your access credentials.</p>

                    {errorMessage && (
                        <div className="bg-electric-red/20 border-2 border-electric-red text-electric-red p-4 rounded-xl mb-6 font-bold">
                            {errorMessage}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Vendor ID</label>
                            <input
                                type="text"
                                value={loginForm.vendorId}
                                onChange={(e) => setLoginForm(prev => ({ ...prev, vendorId: e.target.value }))}
                                className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                placeholder="e.g. burgerbench"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Password</label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full bg-electric-red text-white font-display font-black uppercase tracking-widest text-xl p-4 rounded-xl mt-4 hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Authenticating...' : 'Enter Terminal'}
                        </button>
                        <button onClick={() => { setErrorMessage(''); setAppState('signup'); }} className="w-full text-cool-gray font-display font-bold uppercase text-sm mt-4 hover:text-white transition-colors">
                            Apply for a Vendor Account
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (appState === 'signup') {
        return (
            <div className="min-h-screen bg-deep-charcoal text-white p-6 flex flex-col pt-safe">
                <button onClick={() => { setErrorMessage(''); setAppState('login'); }} className="self-start p-2 hover:bg-white/10 rounded-full transition-colors mb-8">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                    <h1 className="font-display font-black text-5xl uppercase mb-2 text-white">Join Sawa</h1>
                    <p className="text-cool-gray mb-8">Setup your merchant account credentials.</p>

                    {errorMessage && (
                        <div className="bg-electric-red/20 border-2 border-electric-red text-electric-red p-4 rounded-xl mb-6 font-bold">
                            {errorMessage}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Requested Vendor ID</label>
                            <input
                                type="text"
                                value={signupForm.vendorId}
                                onChange={(e) => setSignupForm(prev => ({ ...prev, vendorId: e.target.value }))}
                                className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                placeholder="e.g. hype_kitchen"
                            />
                            <p className="text-xs text-cool-gray mt-2">Lowercase letters, numbers, and underscores only. (3-20 chars)</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Password</label>
                            <input
                                type="password"
                                value={signupForm.password}
                                onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={signupForm.confirmPassword}
                                onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="w-full bg-zinc-900 border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            onClick={handleSignup}
                            disabled={isLoading}
                            className="w-full bg-volt-green text-deep-charcoal font-display font-black uppercase tracking-widest text-xl p-4 rounded-xl mt-4 hover:bg-[#b0f200] transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Create Account'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (appState === 'onboarding') {
        return (
            <div className="min-h-screen bg-deep-charcoal text-white p-6 flex flex-col pt-safe overflow-y-auto">
                <div className="max-w-xl mx-auto w-full py-12">
                    <h1 className="font-display font-black text-4xl lg:text-5xl uppercase mb-2 text-white">Terminal Setup</h1>
                    <p className="text-cool-gray mb-10">Configure your storefront, payment ingestion, and secure the Ledger.</p>

                    {errorMessage && (
                        <div className="bg-electric-red/20 border-2 border-electric-red text-electric-red p-4 rounded-xl mb-6 font-bold">
                            {errorMessage}
                        </div>
                    )}

                    <div className="space-y-8">
                        {/* Storefront Info */}
                        <div className="space-y-4 bg-zinc-900/50 p-6 rounded-2xl border-2 border-cool-gray/20">
                            <h2 className="font-display font-black text-2xl uppercase tracking-widest text-volt-green border-b-2 border-cool-gray/20 pb-2">1. Storefront</h2>
                            <div>
                                <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={onboardingForm.vendorName}
                                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, vendorName: e.target.value }))}
                                    className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                    placeholder="e.g. Burger Bench"
                                />
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4 bg-zinc-900/50 p-6 rounded-2xl border-2 border-cool-gray/20">
                            <h2 className="font-display font-black text-2xl uppercase tracking-widest text-volt-green border-b-2 border-cool-gray/20 pb-2">2. Settlement (InstaPay)</h2>
                            <div>
                                <label className="block text-sm font-bold uppercase text-cool-gray mb-2">InstaPay Address (IPA / GPA)</label>
                                <input
                                    type="text"
                                    value={onboardingForm.instapayAddress}
                                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, instapayAddress: e.target.value }))}
                                    className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                    placeholder="e.g. burgerbench@instapay"
                                />
                                <p className="text-xs text-cool-gray mt-2">This will be shown to customers when they pay. Make sure this is correct.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Verified Full Name</label>
                                <input
                                    type="text"
                                    value={onboardingForm.instapayName}
                                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, instapayName: e.target.value }))}
                                    className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 font-display font-bold text-lg focus:border-volt-green focus:outline-none transition-colors"
                                    placeholder="e.g. Ahmed Hassan"
                                />
                            </div>
                        </div>

                        {/* Ledger Security */}
                        <div className="space-y-4 bg-zinc-900/50 p-6 rounded-2xl border-2 border-cool-gray/20">
                            <h2 className="font-display font-black text-2xl uppercase tracking-widest text-electric-red border-b-2 border-cool-gray/20 pb-2">3. Ledger Security</h2>
                            <p className="text-sm text-cool-gray leading-relaxed">
                                Create a 4-digit PIN to unlock your Ledger Vault and view financial analytics.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Admin PIN</label>
                                    <input
                                        type="password"
                                        maxLength={4}
                                        value={onboardingForm.pin}
                                        onChange={(e) => setOnboardingForm(prev => ({ ...prev, pin: e.target.value }))}
                                        className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 text-center font-display font-black text-2xl tracking-[0.5em] focus:border-electric-red focus:outline-none transition-colors"
                                        placeholder="••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold uppercase text-cool-gray mb-2">Confirm PIN</label>
                                    <input
                                        type="password"
                                        maxLength={4}
                                        value={onboardingForm.confirmPin}
                                        onChange={(e) => setOnboardingForm(prev => ({ ...prev, confirmPin: e.target.value }))}
                                        className="w-full bg-black border-2 border-cool-gray/30 rounded-xl p-4 text-center font-display font-black text-2xl tracking-[0.5em] focus:border-electric-red focus:outline-none transition-colors"
                                        placeholder="••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleOnboardingSubmit}
                            disabled={isLoading}
                            className="w-full bg-electric-red text-white font-display font-black uppercase tracking-widest text-xl p-6 rounded-xl hover:bg-red-600 transition-transform active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? 'Connecting to Database...' : 'Initialize Terminal'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Terminal view — only render if vendorId is set (prevents white screen)
    if (!currentVendorId) {
        return (
            <div className="min-h-screen bg-deep-charcoal text-white flex items-center justify-center">
                <p className="text-cool-gray font-bold uppercase tracking-widest">Loading terminal...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deep-charcoal text-white flex flex-col pt-safe">
            {/* Dashboard Topbar */}
            <header className="border-b-2 border-cool-gray/20 px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between shrink-0 bg-deep-charcoal z-20 gap-4 md:gap-0">
                <div className="flex items-center justify-between md:justify-start gap-4 md:gap-6 w-full md:w-auto">
                    <div>
                        <h1 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none">
                            SAWA
                        </h1>
                        {vendorProfile.name && (
                            <p className="text-cool-gray text-xs font-bold uppercase tracking-widest">{vendorProfile.name}</p>
                        )}
                    </div>

                    <div className="h-8 md:h-10 w-0.5 bg-cool-gray/30 mx-1 md:mx-2 hidden sm:block" />

                    <nav className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-1 flex-1 md:flex-none">
                        <button
                            onClick={() => setActiveTab('terminal')}
                            className={`font-display font-bold uppercase text-xs md:text-sm tracking-widest transition-colors whitespace-nowrap ${activeTab === 'terminal' ? 'text-white' : 'text-cool-gray hover:text-white'}`}
                        >
                            Terminal
                        </button>
                        <button
                            onClick={() => setActiveTab('roster')}
                            className={`font-display font-bold uppercase text-xs md:text-sm tracking-widest transition-colors whitespace-nowrap ${activeTab === 'roster' ? 'text-white' : 'text-cool-gray hover:text-white'}`}
                        >
                            Roster
                        </button>
                        <button
                            onClick={() => setActiveTab('drop')}
                            className={`font-display font-bold uppercase text-xs md:text-sm tracking-widest transition-colors flex items-center gap-1 whitespace-nowrap ${activeTab === 'drop' ? 'text-white' : 'text-cool-gray hover:text-white'}`}
                        >
                            <Zap className="w-3 h-3 md:w-4 md:h-4" /> Studio
                        </button>
                        <button
                            onClick={() => setActiveTab('ledger')}
                            className={`font-display font-bold uppercase text-xs md:text-sm tracking-widest transition-colors flex items-center gap-1 whitespace-nowrap ${activeTab === 'ledger' ? 'text-white' : 'text-cool-gray hover:text-white'}`}
                        >
                            <Activity className="w-3 h-3 md:w-4 md:h-4" /> Ledger
                        </button>
                    </nav>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {/* InstaPay display */}
                    {vendorProfile.instapayAddress && (
                        <div className="hidden md:flex items-center gap-2 bg-volt-green/10 border border-volt-green/30 px-3 py-1.5 rounded-lg">
                            <span className="text-xs font-bold text-volt-green uppercase tracking-widest">InstaPay</span>
                            <span className="text-xs font-black text-white">{vendorProfile.instapayAddress}</span>
                        </div>
                    )}

                    {/* Status Switcher */}
                    <div className="flex bg-zinc-900 rounded-lg p-1 border-2 border-cool-gray/30 gap-1 shrink-0">
                        <button
                            onClick={() => handleStatusChange('live')}
                            className={`px-3 md:px-4 py-1.5 rounded text-[10px] md:text-xs font-black uppercase ${vendorStatus === 'live' ? 'bg-volt-green text-deep-charcoal' : 'text-cool-gray hover:text-white'}`}
                        >Live</button>
                        <button
                            onClick={() => handleStatusChange('swamped')}
                            className={`px-3 md:px-4 py-1.5 rounded text-[10px] md:text-xs font-black uppercase ${vendorStatus === 'swamped' ? 'bg-yellow-400 text-deep-charcoal' : 'text-cool-gray hover:text-white'}`}
                        >Swamped</button>
                        <button
                            onClick={() => handleStatusChange('offline')}
                            className={`px-3 md:px-4 py-1.5 rounded text-[10px] md:text-xs font-black uppercase ${vendorStatus === 'offline' ? 'bg-electric-red text-white' : 'text-cool-gray hover:text-white'}`}
                        >Offline</button>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => setShowProfileEditor(true)}
                            className="text-[10px] md:text-xs font-bold uppercase text-volt-green border-2 border-volt-green/30 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-volt-green/10"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setCurrentVendorId(null);
                                setAppState('login');
                                onBack();
                            }}
                            className="text-[10px] md:text-xs font-bold uppercase text-cool-gray border-2 border-cool-gray/30 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:text-white"
                        >
                            Out
                        </button>

                    </div>
                </div>
            </header>

            {/* Main Vendor Content */}
            <div className="flex-1 overflow-hidden flex flex-col relative w-full bg-deep-charcoal">
                {activeTab === 'terminal' && <VendorDashboard vendorId={currentVendorId} />}
                {activeTab === 'roster' && <VendorRoster vendorId={currentVendorId} />}
                {activeTab === 'drop' && <DropStudio vendorId={currentVendorId} />}
                {activeTab === 'ledger' && <VendorLedger correctPin={ledgerPin} vendorId={currentVendorId} />}
            </div>

            {/* Profile Editor Modal */}
            <AnimatePresence>
                {showProfileEditor && (
                    <VendorProfileEditor
                        vendorId={currentVendorId}
                        onClose={() => {
                            setShowProfileEditor(false);
                            fetchVendorProfile(currentVendorId);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
