import { useState, useEffect } from 'react';
import { Plus, Gift, Flame, Edit2, Trash2, Send } from 'lucide-react';

export default function CardManagement() {
    const [cards, setCards] = useState<any[]>([]);
    const [showMintModal, setShowMintModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCard, setEditingCard] = useState<any>(null);
    const [newCard, setNewCard] = useState({
        name: '',
        description: '',
        perkCode: '',
        rarity: 'COMMON',
        dropRate: 0.1
    });

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        fetch('/api/admin/cards')
            .then(res => res.json())
            .then(data => setCards(data.cards))
            .catch(console.error);
    };

    const handleMint = async () => {
        try {
            await fetch('/api/admin/cards/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCard)
            });
            setShowMintModal(false);
            fetchCards();
        } catch (e) {
            console.error(e);
        }
    };

    const handleDrop = async (cardId: string, target: string) => {
        if (!confirm(`Airdrop this card to ${target}?`)) return;
        try {
            const res = await fetch('/api/admin/cards/drop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardId, target })
            });
            const data = await res.json();
            alert(`Dropped to ${data.droppedCount} users!`);
            fetchCards();
        } catch (e) {
            console.error(e);
        }
    };

    const handleProbabilityUpdate = async (cardId: string, rate: number) => {
        try {
            await fetch(`/api/admin/cards/${cardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dropRate: rate })
            });
            setCards(cards.map(c => c.id === cardId ? { ...c, dropRate: rate } : c));
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteCard = async (cardId: string) => {
        if (!confirm('Are you sure you want to delete this global asset from the platform?')) return;
        try {
            await fetch(`/api/admin/cards/${cardId}`, { method: 'DELETE' });
            fetchCards();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8 text-electric-red" />
                    <h3 className="font-display font-black text-2xl uppercase tracking-wider">Asset Inventory</h3>
                </div>
                <button 
                    onClick={() => setShowMintModal(true)}
                    className="bg-black text-volt-green font-black uppercase tracking-widest px-6 py-3 border-4 border-black brutal-shadow-sm hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Mint New Card
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map(card => (
                    <div key={card.id} className="bg-white border-4 border-black p-6 rounded-xl brutal-shadow-md relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-2 text-[10px] font-black uppercase ${
                            card.rarity === 'LEGENDARY' ? 'bg-volt-green' : 'bg-gray-200'
                        } border-bl-4 border-black`}>
                            {card.rarity}
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="font-display font-black text-xl uppercase mb-1">{card.name}</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase italic line-clamp-2">{card.description}</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t-2 border-black/10">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black uppercase text-gray-400">Probability</span>
                                    <span className="text-sm font-black">{(card.dropRate * 100).toFixed(1)}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0.01" 
                                    max="1.0" 
                                    step="0.01"
                                    value={card.dropRate}
                                    onChange={(e) => handleProbabilityUpdate(card.id, parseFloat(e.target.value))}
                                    className="w-full accent-black cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-between bg-gray-100 p-3 rounded border-2 border-black">
                                <div className="text-center">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase">Circulation</div>
                                    <div className="font-black">{card._count.users}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase">Perk Code</div>
                                    <div className="font-black text-electric-red text-xs">{card.perkCode}</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleDrop(card.id, 'ALL')}
                                    className="flex-1 py-2 bg-black text-volt-green border-2 border-black rounded font-black uppercase text-[10px] hover:bg-gray-800 transition-all flex items-center justify-center gap-1"
                                >
                                    <Send className="w-3 h-3" /> Airdrop All
                                </button>
                                <button onClick={() => { setEditingCard(card); setShowEditModal(true); }} className="p-2 border-2 border-black rounded hover:bg-gray-50 transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDeleteCard(card.id)} className="p-2 border-2 border-black bg-electric-red/10 text-electric-red rounded hover:bg-electric-red hover:text-white transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mint Modal */}
            {showMintModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white border-8 border-black p-8 rounded-2xl w-full max-w-lg brutal-shadow-lg scale-in">
                        <h3 className="font-display font-black text-3xl uppercase mb-6 flex items-center gap-3">
                            <Flame className="w-8 h-8 text-electric-red" /> Mint Asset
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-black uppercase text-xs mb-1">Asset Name</label>
                                <input 
                                    className="w-full p-4 border-4 border-black font-bold outline-none" 
                                    placeholder="e.g. MIDNIGHT SNACK"
                                    value={newCard.name}
                                    onChange={e => setNewCard({...newCard, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block font-black uppercase text-xs mb-1">Description</label>
                                <textarea 
                                    className="w-full p-4 border-4 border-black font-bold outline-none" 
                                    rows={2}
                                    value={newCard.description}
                                    onChange={e => setNewCard({...newCard, description: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-black uppercase text-xs mb-1">Perk Code</label>
                                    <input 
                                        className="w-full p-4 border-4 border-black font-bold outline-none" 
                                        placeholder="ZERO_FEE_1"
                                        value={newCard.perkCode}
                                        onChange={e => setNewCard({...newCard, perkCode: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block font-black uppercase text-xs mb-1">Rarity</label>
                                    <select 
                                        className="w-full p-4 border-4 border-black font-bold outline-none appearance-none"
                                        value={newCard.rarity}
                                        onChange={e => setNewCard({...newCard, rarity: e.target.value})}
                                    >
                                        <option>COMMON</option>
                                        <option>RARE</option>
                                        <option>LEGENDARY</option>
                                        <option>MYTHIC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button 
                                onClick={() => setShowMintModal(false)}
                                className="flex-1 py-4 border-4 border-black font-black uppercase hover:bg-gray-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleMint}
                                className="flex-1 py-4 bg-black text-volt-green border-4 border-black font-black uppercase brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all"
                            >
                                Mint Asset
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Modal */}
            {showEditModal && editingCard && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white border-8 border-black p-8 rounded-2xl w-full max-w-lg brutal-shadow-lg scale-in">
                        <h3 className="font-display font-black text-3xl uppercase mb-6 flex items-center gap-3">
                            <Edit2 className="w-8 h-8 text-black" /> Edit Asset
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-black uppercase text-xs mb-1">Asset Name</label>
                                <input 
                                    className="w-full p-4 border-4 border-black font-bold outline-none" 
                                    value={editingCard.name}
                                    onChange={e => setEditingCard({...editingCard, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block font-black uppercase text-xs mb-1">Description</label>
                                <textarea 
                                    className="w-full p-4 border-4 border-black font-bold outline-none" 
                                    rows={2}
                                    value={editingCard.description}
                                    onChange={e => setEditingCard({...editingCard, description: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-black uppercase text-xs mb-1">Perk Code</label>
                                    <input 
                                        className="w-full p-4 border-4 border-black font-bold outline-none" 
                                        value={editingCard.perkCode}
                                        onChange={e => setEditingCard({...editingCard, perkCode: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block font-black uppercase text-xs mb-1">Rarity</label>
                                    <select 
                                        className="w-full p-4 border-4 border-black font-bold outline-none appearance-none"
                                        value={editingCard.rarity}
                                        onChange={e => setEditingCard({...editingCard, rarity: e.target.value})}
                                    >
                                        <option>COMMON</option>
                                        <option>RARE</option>
                                        <option>LEGENDARY</option>
                                        <option>MYTHIC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button 
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 py-4 border-4 border-black font-black uppercase hover:bg-gray-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={async () => {
                                    try {
                                        await fetch(`/api/admin/cards/${editingCard.id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                name: editingCard.name,
                                                description: editingCard.description,
                                                perkCode: editingCard.perkCode,
                                                rarity: editingCard.rarity
                                            })
                                        });
                                        setShowEditModal(false);
                                        fetchCards();
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                                className="flex-1 py-4 bg-black text-volt-green border-4 border-black font-black uppercase brutal-shadow-sm active:translate-y-1 active:shadow-none transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
