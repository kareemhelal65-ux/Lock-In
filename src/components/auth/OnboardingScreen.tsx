import { useState } from 'react';

interface OnboardingScreenProps {
    onComplete: (data: any) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=hype');

    const randomizeAvatar = () => {
        const seed = Math.random().toString(36).substring(7);
        setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ username, name, avatar: avatarUrl });
    };

    return (
        <div className="min-h-screen bg-volt-green flex flex-col items-center justify-center p-6 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="w-full max-w-sm brutal-card p-8 bg-white shadow-brutal-lg">
                <h2 className="text-3xl font-display font-bold uppercase mb-1 tracking-tight">Set Your Vibe</h2>
                <p className="text-cool-gray mb-8 text-sm font-bold uppercase tracking-wider">Who are you in the squad?</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Avatar Selection */}
                    <div className="flex flex-col items-center mb-2">
                        <div className="relative group">
                            <img
                                src={avatarUrl}
                                alt="Avatar Preview"
                                className="w-24 h-24 rounded-full border-2 border-deep-charcoal object-cover bg-sneaker-white shadow-brutal-sm"
                            />
                            <button
                                type="button"
                                onClick={randomizeAvatar}
                                className="absolute bottom-0 right-0 w-8 h-8 bg-electric-red rounded-full border-2 border-deep-charcoal flex items-center justify-center text-white hover:scale-110 hover:bg-white hover:text-electric-red transition-all cursor-pointer shadow-sm"
                                title="Randomize Avatar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                            </button>
                        </div>
                        <span className="text-[10px] font-bold mt-3 uppercase text-cool-gray">Roll new fit</span>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 text-deep-charcoal">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="JOHN DOE"
                            className="w-full p-4 font-bold uppercase border-2 border-deep-charcoal rounded-none bg-sneaker-white focus:outline-none focus:bg-white focus:shadow-brutal-sm transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 text-deep-charcoal">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="@HYPEBEAST"
                            className="w-full p-4 font-bold uppercase border-2 border-deep-charcoal rounded-none bg-sneaker-white focus:outline-none focus:bg-white focus:shadow-brutal-sm transition-all"
                            required
                        />
                    </div>

                    <button type="submit" className="brutal-btn-dark w-full mt-4 py-4 cursor-pointer hover:-translate-y-1">
                        LOCK IT IN
                    </button>
                </form>
            </div>
        </div>
    );
}
