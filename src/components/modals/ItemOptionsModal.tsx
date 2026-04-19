import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageSquare, Plus, AlertCircle } from 'lucide-react';
import type { MenuItem, AddOnGroup, LegacyAddOn, SelectedChoice } from '@/types';

interface ItemOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onConfirm: (selectedChoices: SelectedChoice[], specialNotes: string) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Parse the raw addOns field (string JSON or array) into a normalised array */
function parseAddOns(raw: any): AddOnGroup[] | LegacyAddOn[] {
  let parsed: any = raw;
  if (typeof raw === 'string') {
    try { parsed = JSON.parse(raw); } catch { return []; }
  }
  if (!Array.isArray(parsed) || parsed.length === 0) return [];
  return parsed;
}

/** True if the parsed array uses the new group format */
function isGroupFormat(addOns: any[]): addOns is AddOnGroup[] {
  return addOns.length > 0 && typeof addOns[0] === 'object' && 'groupName' in addOns[0];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ItemOptionsModal({ isOpen, onClose, item, onConfirm }: ItemOptionsModalProps) {
  // Map of groupName → selected option name(s)
  const [groupSelections, setGroupSelections] = useState<Record<string, string[]>>({});
  const [legacySelections, setLegacySelections] = useState<LegacyAddOn[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [attemptedConfirm, setAttemptedConfirm] = useState(false);

  if (!item) return null;

  const rawAddOns = parseAddOns(item.addOns);
  const useGroups = isGroupFormat(rawAddOns);
  const groups = useGroups ? (rawAddOns as AddOnGroup[]) : [];
  const legacyOptions = useGroups ? [] : (rawAddOns as LegacyAddOn[]);

  // ── Validation ──────────────────────────────────────────────────────────────

  const missingRequired: string[] = [];
  if (useGroups) {
    groups.forEach(g => {
      if (g.required) {
        const sel = groupSelections[g.groupName] || [];
        if (sel.length === 0) missingRequired.push(g.groupName);
      }
    });
  }
  const canConfirm = missingRequired.length === 0;

  // ── Current total ───────────────────────────────────────────────────────────

  let addOnTotal = 0;
  if (useGroups) {
    groups.forEach(g => {
      const sel = groupSelections[g.groupName] || [];
      sel.forEach(name => {
        const opt = g.options.find(o => o.name === name);
        if (opt) addOnTotal += opt.price || 0;
      });
    });
  } else {
    addOnTotal = legacySelections.reduce((s, a) => s + (a.price || 0), 0);
  }
  const currentTotal = item.price + addOnTotal;

  // ── Selection handlers ──────────────────────────────────────────────────────

  const handleGroupSelect = (group: AddOnGroup, optionName: string) => {
    setGroupSelections(prev => {
      const current = prev[group.groupName] || [];
      if (group.maxSelect === 1) {
        // Radio: always replace
        return { ...prev, [group.groupName]: [optionName] };
      }
      // Checkbox with cap
      if (current.includes(optionName)) {
        return { ...prev, [group.groupName]: current.filter(n => n !== optionName) };
      }
      if (current.length >= group.maxSelect) return prev; // cap reached
      return { ...prev, [group.groupName]: [...current, optionName] };
    });
  };

  const handleLegacyToggle = (addon: LegacyAddOn) => {
    setLegacySelections(prev => {
      const exists = prev.find(a => a.name === addon.name);
      if (exists) return prev.filter(a => a.name !== addon.name);
      return [...prev, addon];
    });
  };

  // ── Confirm ─────────────────────────────────────────────────────────────────

  const handleConfirm = () => {
    if (!canConfirm) {
      setAttemptedConfirm(true);
      return;
    }

    let selectedChoices: SelectedChoice[] = [];
    if (useGroups) {
      groups.forEach(g => {
        const sel = groupSelections[g.groupName] || [];
        sel.forEach(name => {
          const opt = g.options.find(o => o.name === name);
          if (opt) selectedChoices.push({ groupName: g.groupName, option: opt });
        });
      });
    } else {
      // Legacy: wrap each selected flat add-on as a SelectedChoice
      selectedChoices = legacySelections.map(a => ({
        groupName: 'Add-ons',
        option: { name: a.name, price: a.price, inStock: a.inStock }
      }));
    }

    onConfirm(selectedChoices, specialNotes);
    // Reset
    setGroupSelections({});
    setLegacySelections([]);
    setSpecialNotes('');
    setAttemptedConfirm(false);
    onClose();
  };

  const handleClose = () => {
    setGroupSelections({});
    setLegacySelections([]);
    setSpecialNotes('');
    setAttemptedConfirm(false);
    onClose();
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white border-4 border-black w-full max-w-lg overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl"
          >
            {/* Header */}
            <div className="p-4 border-b-4 border-black bg-volt-green flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-lg p-1 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <div>
                  <h2 className="font-display font-black text-xl uppercase leading-none">{item.name}</h2>
                  <p className="font-display font-bold text-sm text-black/60 uppercase mt-1">{item.price} EGP Base</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto no-scrollbar">

              {/* ── NEW: Choice Groups ─────────────────────────────────────── */}
              {useGroups && groups.map((group) => {
                const sel = groupSelections[group.groupName] || [];
                const isMissing = attemptedConfirm && group.required && sel.length === 0;
                const isRadio = group.maxSelect === 1;

                return (
                  <div key={group.groupName} className="mb-6">
                    {/* Group header */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-black text-sm uppercase tracking-wider text-black/70">
                        {group.groupName}
                      </h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase border-2 ${
                        group.required
                          ? 'bg-electric-red text-white border-electric-red'
                          : 'bg-black text-white border-black'
                      }`}>
                        {group.required ? 'Required' : 'Optional'}
                      </span>
                    </div>

                    {/* Missing indicator */}
                    {isMissing && (
                      <motion.div
                        initial={{ x: -4 }}
                        animate={{ x: [4, -4, 4, -4, 0] }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 text-electric-red text-xs font-bold mb-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        Please select an option
                      </motion.div>
                    )}

                    {/* Options */}
                    <div className="space-y-2">
                      {group.options.map((opt) => {
                        const isSelected = sel.includes(opt.name);
                        const isSoldOut = opt.inStock === false;

                        return (
                          <button
                            key={opt.name}
                            onClick={() => !isSoldOut && handleGroupSelect(group, opt.name)}
                            disabled={isSoldOut}
                            className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition-all ${
                              isSoldOut
                                ? 'bg-gray-200 opacity-60 cursor-not-allowed grayscale border-gray-300'
                                : isMissing && !isSelected
                                ? 'border-electric-red/60 bg-red-50 hover:bg-red-100'
                                : isSelected
                                ? 'bg-volt-green border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1'
                                : 'bg-gray-50 border-black hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Radio vs Checkbox indicator */}
                              <div className={`flex items-center justify-center border-2 border-black transition-all ${
                                isRadio
                                  ? 'w-6 h-6 rounded-full'
                                  : 'w-6 h-6 rounded'
                              } ${isSoldOut ? 'bg-gray-300' : isSelected ? 'bg-black text-white' : 'bg-white'}`}>
                                {isSelected && !isRadio && <Check className="w-4 h-4" />}
                                {isSelected && isRadio && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                {isSoldOut && <X className="w-3 h-3 text-black/40" />}
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="font-display font-bold text-sm uppercase">{opt.name}</span>
                                {isSoldOut && <span className="text-[10px] font-black text-electric-red uppercase">Sold Out</span>}
                              </div>
                            </div>
                            <span className="font-display font-black text-sm">
                              {opt.price > 0 ? `+${opt.price} EGP` : 'Included'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* ── LEGACY: Flat optional add-ons ────────────────────────── */}
              {!useGroups && legacyOptions.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-black/40">Customize Your Item</h3>
                    <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded uppercase">Optional</span>
                  </div>
                  <div className="space-y-2">
                    {legacyOptions.map((addon, idx) => {
                      const isSelected = legacySelections.find(a => a.name === addon.name);
                      const isSoldOut = addon.inStock === false;

                      return (
                        <button
                          key={idx}
                          onClick={() => !isSoldOut && handleLegacyToggle(addon)}
                          disabled={isSoldOut}
                          className={`w-full p-4 border-2 border-black rounded-xl flex items-center justify-between transition-all ${
                            isSoldOut ? 'bg-gray-200 opacity-60 cursor-not-allowed grayscale' :
                            isSelected ? 'bg-volt-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 border-2 border-black rounded flex items-center justify-center ${
                              isSoldOut ? 'bg-gray-300' :
                              isSelected ? 'bg-black text-white' : 'bg-white'
                            }`}>
                              {isSelected && <Check className="w-4 h-4" />}
                              {isSoldOut && <X className="w-3 h-3 text-black/40" />}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="font-display font-bold text-sm uppercase">{addon.name}</span>
                              {isSoldOut && <span className="text-[10px] font-black text-electric-red uppercase">Sold Out</span>}
                            </div>
                          </div>
                          <span className="font-display font-black text-sm">+{addon.price} EGP</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Notes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-black/40" />
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-black/40">Special Notes</h3>
                </div>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. No pickles, extra napkins, etc."
                  className="w-full h-32 p-4 border-2 border-black rounded-xl font-body text-sm focus:ring-4 focus:ring-volt-green/20 outline-none resize-none bg-gray-50"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black bg-gray-50 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-display font-black uppercase text-black/40 tracking-widest">Final Amount</p>
                <p className="font-display font-black text-2xl">{currentTotal} EGP</p>
              </div>
              <button
                onClick={handleConfirm}
                className={`flex-[1.5] py-4 px-6 rounded-xl font-display font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all ${
                  canConfirm
                    ? 'bg-black text-white hover:bg-black/90 active:scale-95 shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Plus className={`w-5 h-5 ${canConfirm ? 'text-volt-green' : 'text-gray-400'}`} />
                {canConfirm ? 'Add to Bag' : `Select ${missingRequired[0] || 'Options'}`}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
