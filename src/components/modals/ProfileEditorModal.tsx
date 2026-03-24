import { useState } from 'react';
import { Camera, X } from 'lucide-react';

interface ProfileEditorModalProps {
    user: any;
    onClose: () => void;
    onSave: (data: any) => void;
}

export default function ProfileEditorModal({ user, onClose, onSave }: ProfileEditorModalProps) {
    const [name, setName] = useState(user.name || '');
    const [username, setUsername] = useState(user.username || '');
    const [avatarUrl, setAvatarUrl] = useState(user.avatar || '');

    const randomizeAvatar = () => {
        const seed = Math.random().toString(36).substring(7);
        setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, username, avatar: avatarUrl });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-deep-charcoal/60 backdrop-blur-sm" onClick={onClose} />

            <div className="brutal-card w-full max-w-sm bg-sneaker-white relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b-2 border-deep-charcoal bg-white">
                    <h2 className="font-display font-bold text-xl uppercase tracking-tighter">Edit Profile</h2>
                    <button onClick={onClose} className="p-1 hover:bg-cool-gray/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative group mb-3">
                            <img
                                src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'placeholder'}`}
                                alt="Avatar Preview"
                                className="w-24 h-24 rounded-full border-2 border-deep-charcoal object-cover bg-white"
                            />
                            <button
                                type="button"
                                onClick={randomizeAvatar}
                                className="absolute bottom-0 right-0 w-8 h-8 bg-volt-green rounded-full border-2 border-deep-charcoal flex items-center justify-center hover:bg-white transition-colors"
                                title="Randomize Avatar"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] font-bold uppercase text-cool-gray">Tap icon to randomize fit</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1 text-deep-charcoal">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="YOUR NAME"
                                className="w-full p-3 font-bold uppercase border-2 border-deep-charcoal rounded-none bg-white focus:outline-none focus:shadow-brutal-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase mb-1 text-deep-charcoal">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="@USERNAME"
                                className="w-full p-3 font-bold uppercase border-2 border-deep-charcoal rounded-none bg-white focus:outline-none focus:shadow-brutal-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase mb-1 text-deep-charcoal">Avatar URL (Optional)</label>
                            <input
                                type="url"
                                value={avatarUrl}
                                onChange={e => setAvatarUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full p-3 font-bold text-sm border-2 border-deep-charcoal rounded-none bg-white focus:outline-none focus:shadow-brutal-sm"
                            />
                        </div>
                    </div>

                    <button type="submit" className="brutal-btn-primary w-full mt-6 py-3">
                        SAVE CHANGES
                    </button>
                </form>
            </div>
        </div>
    );
}
