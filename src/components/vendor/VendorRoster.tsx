import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, ShieldAlert, Sparkles, Upload, Plus, X, Save, ImageIcon } from 'lucide-react';
import { translations } from './translations';

interface VendorRosterProps {
    vendorId: string;
    lang: 'en' | 'ar';
}

export default function VendorRoster({ vendorId, lang }: VendorRosterProps) {
    const t = translations[lang];
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!vendorId) return;
        const fetchMenu = async () => {
            try {
                const res = await fetch(`/api/vendorData/${vendorId}/menu`);
                const data = await res.json();
                if (data.menuItems) setMenuItems(data.menuItems);
            } catch (err) {
                console.error("Failed to fetch menu", err);
            }
        };
        fetchMenu();
    }, [vendorId]);

    const toggleStock = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        const previousItems = [...menuItems];
        setMenuItems(prev => prev.map(item =>
            item.id === id ? { ...item, inStock: !currentStatus } : item
        ));

        try {
            const res = await fetch(`/api/vendorData/${vendorId}/menu/${id}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inStock: !currentStatus })
            });
            if (!res.ok) throw new Error('Failed to toggle stock');
        } catch (err) {
            console.error("Failed to toggle stock", err);
            // Rollback on failure
            setMenuItems(previousItems);
            alert("Connection error: Failed to update stock status.");
        }
    };

    const startEdit = (item: any) => {
        setEditingId(item.id);
        const addOns = typeof item.addOns === 'string' ? (() => { try { return JSON.parse(item.addOns); } catch { return []; } })() : (item.addOns || []);
        setEditForm({ ...item, addOns });
        setImageFile(null);
        setImagePreview(item.image);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const saveEdit = async (id: string) => {
        setSavingId(id);
        const formData = new FormData();
        formData.append('name', editForm.name);
        formData.append('category', editForm.category);
        formData.append('price', editForm.price.toString());
        formData.append('description', editForm.description || '');
        formData.append('inStock', editForm.inStock.toString());
        formData.append('requiredHypeLevel', editForm.hypeGated ? editForm.reqHype.toString() : (editForm.requiredHypeLevel || '0').toString());
        formData.append('addOns', JSON.stringify(editForm.addOns || []));
        if (imageFile) formData.append('image', imageFile);

        try {
            const res = await fetch(`/api/vendorData/${vendorId}/menu/${id === 'new' ? '' : id}`, {
                method: id === 'new' ? 'POST' : 'PUT',
                body: formData
            });
            if (res.ok) {
                const updated = await res.json();
                if (id === 'new') {
                    setMenuItems(prev => [updated.item, ...prev]);
                } else {
                    setMenuItems(prev => prev.map(item => item.id === id ? updated.item : item));
                }
            }
        } catch (err) {
            console.error("Failed to save item", err);
        } finally {
            setSavingId(null);
            setEditingId(null);
        }
    };

    const deleteItem = async (id: string) => {
        if (!confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الصنف؟' : 'Are you sure you want to delete this item?')) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/vendorData/${vendorId}/menu/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMenuItems(prev => prev.filter(item => item.id !== id));
            }
        } catch (err) {
            console.error("Failed to delete item", err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 text-white custom-scrollbar pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter mb-1">{t.menuRoster}</h2>
                        <p className="text-cool-gray text-xs md:text-sm">{t.rosterSub}</p>
                    </div>
                    <button 
                        onClick={() => startEdit({ id: 'new', name: '', description: '', category: 'Mains', price: 0, inStock: true, hypeGated: false, reqHype: 0, addOns: [] })} 
                        className="w-full md:w-auto bg-volt-green text-deep-charcoal font-display font-black uppercase px-6 py-3 rounded-xl hover:bg-[#b0f200] transition-colors flex items-center justify-center gap-2 shadow-brutal-sm"
                    >
                        <Plus className="w-5 h-5" /> {t.newItem}
                    </button>
                </div>

                <div className="bg-zinc-900 border-2 border-cool-gray/30 rounded-2xl overflow-hidden">
                    {/* Header - Hidden on mobile */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b-2 border-cool-gray/30 bg-black/20 font-display font-bold uppercase text-xs tracking-widest text-cool-gray">
                        <div className="col-span-4">{t.tableItem}</div>
                        <div className="col-span-2">{t.tableCategory}</div>
                        <div className="col-span-2">{t.tablePrice}</div>
                        <div className="col-span-2">{t.tableStock}</div>
                        <div className="col-span-2 text-right">{t.tableActions}</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y-2 divide-cool-gray/10">
                        <AnimatePresence>
                            {(editingId === 'new' ? [editForm, ...menuItems] : menuItems).map(item => {
                                const isEditing = editingId === item.id;

                                return (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className={`flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-stretch md:items-center transition-colors ${!item.inStock && !isEditing ? 'opacity-50 bg-black/40' : 'hover:bg-white/5'
                                            } ${isEditing ? 'bg-white/10' : ''}`}
                                    >
                                        {/* Name & Hype */}
                                        <div className="md:col-span-4">
                                            {isEditing ? (
                                                <div className="space-y-4 relative pr-4 flex flex-col md:flex-row gap-4">
                                                    <div
                                                        className="w-16 h-16 bg-black rounded-lg border-2 border-cool-gray/50 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden"
                                                        onClick={() => fileInputRef.current?.click()}
                                                    >
                                                        {imagePreview ? (
                                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Upload className="w-5 h-5 text-cool-gray" />
                                                        )}
                                                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" title={lang === 'ar' ? "رفع صورة" : "Upload Image"} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            className="w-full bg-black border-2 border-cool-gray/50 rounded p-2 text-white font-bold text-sm focus:border-volt-green focus:outline-none mb-1"
                                                            placeholder={t.itemNamePlace}
                                                            value={editForm.name}
                                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                            aria-label={t.itemNamePlace}
                                                            title={t.itemNamePlace}
                                                        />
                                                        <textarea
                                                            placeholder={t.itemDescPlace}
                                                            className="w-full bg-black border-2 border-cool-gray/50 rounded p-2 text-white text-xs focus:border-volt-green focus:outline-none mb-2"
                                                            value={editForm.description}
                                                            onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                                            aria-label={t.itemDescPlace}
                                                            title={t.itemDescPlace}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <label className="flex items-center gap-1 text-xs text-cool-gray cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={editForm.hypeGated}
                                                                    onChange={e => setEditForm({ ...editForm, hypeGated: e.target.checked })}
                                                                    className="accent-volt-green"
                                                                    aria-label={t.hypeGated}
                                                                    title={t.hypeGated}
                                                                />
                                                                {t.hypeGated}
                                                            </label>
                                                            {editForm.hypeGated && (
                                                                <input
                                                                    type="number"
                                                                    className="w-20 bg-black border-2 border-cool-gray/50 rounded p-1 text-volt-green font-bold text-xs focus:border-volt-green focus:outline-none"
                                                                    placeholder={t.reqHype}
                                                                    value={editForm.reqHype}
                                                                    onChange={e => setEditForm({ ...editForm, reqHype: parseInt(e.target.value) || 0 })}
                                                                    aria-label={t.reqHype}
                                                                    title={t.reqHype}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-black rounded shrink-0 overflow-hidden">
                                                        {item.image && item.image !== '/placeholder-item.jpg' ? (
                                                            <img src={item.image.startsWith('/') ? `${item.image}` : item.image} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800 text-cool-gray/50">
                                                                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">No Image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col items-start gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-lg">{item.name}</p>
                                                            {!item.inStock && (
                                                                <span className="bg-electric-red text-white text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest">SOLD OUT</span>
                                                            )}
                                                        </div>
                                                        {item.description && (
                                                            <p className="text-xs text-cool-gray leading-tight mb-1">{item.description}</p>
                                                        )}
                                                        {(item.hypeGated || item.requiredHypeLevel > 0) && (
                                                            <span className="bg-volt-green/20 text-volt-green text-[10px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase flex items-center gap-1">
                                                                <Sparkles className="w-3 h-3" /> {item.requiredHypeLevel || item.reqHype}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Category */}
                                        <div className="md:col-span-2 flex justify-between items-center md:block">
                                            <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-cool-gray">{t.tableCategory}</span>
                                            {isEditing ? (
                                                <select
                                                    className="w-full bg-black border-2 border-cool-gray/50 rounded p-2 text-white text-sm focus:border-volt-green focus:outline-none"
                                                    value={editForm.category}
                                                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                                    aria-label={t.tableCategory}
                                                    title={t.tableCategory}
                                                >
                                                    <option>Mains</option>
                                                    <option>Sides</option>
                                                    <option>Drinks</option>
                                                    <option>Desserts</option>
                                                </select>
                                            ) : (
                                                <span className="text-cool-gray text-sm">{item.category}</span>
                                            )}
                                        </div>

                                        {/* Price */}
                                        <div className="md:col-span-2 flex justify-between items-center md:block font-display font-bold">
                                            <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-cool-gray">{t.tablePrice}</span>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    className="w-full bg-black border-2 border-cool-gray/50 rounded p-2 text-white text-sm focus:border-volt-green focus:outline-none"
                                                    value={editForm.price}
                                                    onChange={e => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })}
                                                    aria-label={t.tablePrice}
                                                    title={t.tablePrice}
                                                />
                                            ) : (
                                                <span className="text-lg">{item.price} EGP</span>
                                            )}
                                        </div>

                                        {/* Stock */}
                                        <div className="md:col-span-2 flex justify-between items-center md:block">
                                            <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-cool-gray">{t.tableStock}</span>
                                            <button
                                                onClick={() => !isEditing && toggleStock(item.id, item.inStock)}
                                                disabled={isEditing}
                                                className={`px-3 py-1.5 rounded text-xs font-black uppercase w-24 flex items-center justify-center text-center border-2 transition-colors disabled:opacity-50 ${item.inStock
                                                    ? 'bg-volt-green/20 border-volt-green text-volt-green hover:bg-volt-green hover:text-deep-charcoal'
                                                    : 'bg-electric-red/20 border-electric-red text-electric-red hover:bg-electric-red hover:text-white'
                                                    }`}
                                            >
                                                {item.inStock ? t.inStock : t.soldOut}
                                            </button>
                                        </div>

                                        {/* Actions */}
                                        <div className="md:col-span-2 flex justify-end gap-2 pt-2 md:pt-0 border-t-2 border-white/5 md:border-none">
                                            {isEditing ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEdit(item.id)}
                                                        disabled={savingId === item.id}
                                                        className="p-2 bg-volt-green text-deep-charcoal rounded hover:bg-[#b0f200] transition-colors disabled:opacity-50"
                                                        aria-label={lang === 'ar' ? "حفظ" : "Save"}
                                                        title={lang === 'ar' ? "حفظ" : "Save"}
                                                    >
                                                        {savingId === item.id ? (
                                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                                                <Save className="w-5 h-5" />
                                                            </motion.div>
                                                        ) : (
                                                            <Save className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="p-2 bg-zinc-800 text-cool-gray rounded hover:bg-zinc-700 transition-colors"
                                                        aria-label={lang === 'ar' ? "إلغاء" : "Cancel"}
                                                        title={lang === 'ar' ? "إلغاء" : "Cancel"}
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => startEdit(item)}
                                                        className="p-2 text-cool-gray hover:text-white rounded border-2 border-transparent hover:border-cool-gray/30 transition-colors"
                                                        aria-label={lang === 'ar' ? "تعديل" : "Edit"}
                                                        title={lang === 'ar' ? "تعديل" : "Edit"}
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteItem(item.id)}
                                                        disabled={deletingId === item.id}
                                                        className="p-2 text-cool-gray hover:text-electric-red rounded border-2 border-transparent hover:border-electric-red/30 transition-colors disabled:opacity-50"
                                                        aria-label={lang === 'ar' ? "حذف" : "Delete"}
                                                        title={lang === 'ar' ? "حذف" : "Delete"}
                                                    >
                                                        {deletingId === item.id ? (
                                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                                                <X className="w-5 h-5" />
                                                            </motion.div>
                                                        ) : (
                                                            <X className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Choice Groups (only in edit mode) */}
                                        {isEditing && (
                                            <div className="col-span-full mt-2 p-4 bg-black/50 rounded-xl border border-cool-gray/20 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-bold text-volt-green uppercase tracking-wider">Choice Groups</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditForm({
                                                            ...editForm,
                                                            addOns: [
                                                                ...(editForm.addOns || []),
                                                                { groupName: '', required: false, maxSelect: 1, options: [{ name: '', price: 0, inStock: true }] }
                                                            ]
                                                        })}
                                                        className="text-xs text-volt-green font-bold uppercase hover:underline flex items-center gap-1"
                                                    >
                                                        <Plus className="w-3 h-3" /> Add Group
                                                    </button>
                                                </div>

                                                {(editForm.addOns || []).map((group: any, gIdx: number) => {
                                                    // Detect legacy flat format and skip rendering as group UI (won't happen on new items)
                                                    const isGroup = 'groupName' in group;
                                                    if (!isGroup) return null; // skip legacy items (handled below)

                                                    return (
                                                        <div key={gIdx} className="p-3 bg-white/5 rounded-xl border border-cool-gray/20 space-y-3">
                                                            {/* Group header row */}
                                                            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Group name (e.g. Bread Type)"
                                                                    className="flex-1 bg-black border border-cool-gray/40 rounded px-2 py-1.5 text-white text-xs font-bold focus:border-volt-green focus:outline-none"
                                                                    value={group.groupName}
                                                                    onChange={e => {
                                                                        const updated = [...editForm.addOns];
                                                                        updated[gIdx] = { ...updated[gIdx], groupName: e.target.value };
                                                                        setEditForm({ ...editForm, addOns: updated });
                                                                    }}
                                                                />
                                                                {/* Required toggle */}
                                                                <label className="flex items-center gap-1.5 text-xs text-cool-gray cursor-pointer whitespace-nowrap">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={group.required}
                                                                        className="accent-electric-red"
                                                                        onChange={e => {
                                                                            const updated = [...editForm.addOns];
                                                                            updated[gIdx] = { ...updated[gIdx], required: e.target.checked };
                                                                            setEditForm({ ...editForm, addOns: updated });
                                                                        }}
                                                                    />
                                                                    <span className={group.required ? 'text-electric-red font-black' : ''}>Required</span>
                                                                </label>
                                                                {/* Max select */}
                                                                <div className="flex items-center gap-1 text-xs text-cool-gray whitespace-nowrap">
                                                                    <span>Max pick:</span>
                                                                    <input
                                                                        type="number"
                                                                        min={1}
                                                                        className="w-14 bg-black border border-cool-gray/40 rounded px-2 py-1 text-volt-green text-xs font-bold focus:border-volt-green focus:outline-none"
                                                                        value={group.maxSelect}
                                                                        onChange={e => {
                                                                            const updated = [...editForm.addOns];
                                                                            updated[gIdx] = { ...updated[gIdx], maxSelect: parseInt(e.target.value) || 1 };
                                                                            setEditForm({ ...editForm, addOns: updated });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-[10px] text-cool-gray/60 whitespace-nowrap">{group.maxSelect === 1 ? '→ Radio' : `→ Multi (max ${group.maxSelect})`}</span>
                                                                {/* Delete group */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setEditForm({ ...editForm, addOns: editForm.addOns.filter((_: any, i: number) => i !== gIdx) })}
                                                                    className="w-7 h-7 flex items-center justify-center bg-electric-red/10 rounded-full text-electric-red hover:bg-electric-red/30 transition-colors"
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </div>

                                                            {/* Options */}
                                                            <div className="space-y-2 pl-2 border-l-2 border-cool-gray/20">
                                                                {(group.options || []).map((opt: any, oIdx: number) => (
                                                                    <div key={oIdx} className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Option name (e.g. Syrian Bread)"
                                                                            className="flex-1 bg-black border border-cool-gray/40 rounded px-2 py-1 text-white text-xs focus:border-volt-green focus:outline-none"
                                                                            value={opt.name}
                                                                            onChange={e => {
                                                                                const updated = [...editForm.addOns];
                                                                                const opts = [...updated[gIdx].options];
                                                                                opts[oIdx] = { ...opts[oIdx], name: e.target.value };
                                                                                updated[gIdx] = { ...updated[gIdx], options: opts };
                                                                                setEditForm({ ...editForm, addOns: updated });
                                                                            }}
                                                                        />
                                                                        <div className="flex items-center gap-1 text-xs text-cool-gray">
                                                                            <span>+</span>
                                                                            <input
                                                                                type="number"
                                                                                min={0}
                                                                                placeholder="0"
                                                                                className="w-16 bg-black border border-cool-gray/40 rounded px-2 py-1 text-volt-green text-xs font-bold focus:border-volt-green focus:outline-none"
                                                                                value={opt.price}
                                                                                onChange={e => {
                                                                                    const updated = [...editForm.addOns];
                                                                                    const opts = [...updated[gIdx].options];
                                                                                    opts[oIdx] = { ...opts[oIdx], price: parseFloat(e.target.value) || 0 };
                                                                                    updated[gIdx] = { ...updated[gIdx], options: opts };
                                                                                    setEditForm({ ...editForm, addOns: updated });
                                                                                }}
                                                                            />
                                                                            <span>EGP</span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                const updated = [...editForm.addOns];
                                                                                const opts = updated[gIdx].options.filter((_: any, i: number) => i !== oIdx);
                                                                                updated[gIdx] = { ...updated[gIdx], options: opts };
                                                                                setEditForm({ ...editForm, addOns: updated });
                                                                            }}
                                                                            className="w-6 h-6 flex items-center justify-center text-electric-red/60 hover:text-electric-red transition-colors"
                                                                        >✕</button>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const updated = [...editForm.addOns];
                                                                        updated[gIdx] = {
                                                                            ...updated[gIdx],
                                                                            options: [...(updated[gIdx].options || []), { name: '', price: 0, inStock: true }]
                                                                        };
                                                                        setEditForm({ ...editForm, addOns: updated });
                                                                    }}
                                                                    className="text-[10px] text-volt-green/60 font-bold uppercase hover:text-volt-green transition-colors"
                                                                >+ Add Option</button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {/* If completely empty, show a helpful hint */}
                                                {(editForm.addOns || []).length === 0 && (
                                                    <p className="text-xs text-cool-gray/40 text-center py-2">
                                                        No choice groups yet. Add a group to let customers customize this item.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Hype Level Info Card */}
                <div className="mt-8 bg-zinc-900 border-2 border-dashed border-cool-gray/30 rounded-xl p-5 flex items-start gap-4">
                    <ShieldAlert className="w-8 h-8 text-volt-green shrink-0" />
                    <div>
                        <h4 className="font-display font-bold uppercase text-volt-green mb-1">{t.velvetRope}</h4>
                        <p className="text-cool-gray text-sm">
                            {t.velvetRopeDesc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
