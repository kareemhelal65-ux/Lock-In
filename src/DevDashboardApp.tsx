import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Activity, Target, Zap, 
    CreditCard, Trophy, Users, TrendingUp, 
    Clock, DollarSign, ArrowLeft, ShieldAlert
} from 'lucide-react';

import WarRoomPanel from './components/dev/WarRoomPanel';
import OperationsHub from './components/dev/OperationsHub';
import StrategicAnalytics from './components/dev/StrategicAnalytics';
import HypeEngine from './components/dev/HypeEngine';
import CardManagement from './components/dev/CardManagement';
import LeaderboardCommand from './components/dev/LeaderboardCommand';
import SocialSafePulse from './components/dev/SocialSafePulse';
import RetentionMetrics from './components/dev/RetentionMetrics';
import VendorFriction from './components/dev/VendorFriction';
import FinancialHealth from './components/dev/FinancialHealth';
import PayoutsTab from './components/dev/PayoutsTab';

interface DevDashboardProps {
    onBack: () => void;
}

export default function DevDashboardApp({ onBack }: DevDashboardProps) {
    const [isAuthorized, setIsAuthorized] = useState(() => {
        return sessionStorage.getItem('dev_auth') === 'true';
    });
    const [passkey, setPasskey] = useState('');
    const [authError, setAuthError] = useState(false);

    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('devActiveTab') || 'war-room';
    });
    
    useEffect(() => {
        localStorage.setItem('devActiveTab', activeTab);
    }, [activeTab]);

    const [morningCoffee, setMorningCoffee] = useState<any>(null);

    useEffect(() => {
        if (isAuthorized) {
            fetch('/api/admin/morning-coffee')
                .then(res => res.json())
                .then(data => setMorningCoffee(data))
                .catch(console.error);
        }
    }, [isAuthorized]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passkey === 'e7naexecutivessawa@2026') {
            setIsAuthorized(true);
            sessionStorage.setItem('dev_auth', 'true');
            setAuthError(false);
        } else {
            setAuthError(true);
            setPasskey('');
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-deep-charcoal flex items-center justify-center p-6 bg-[url('/grid.svg')] bg-repeat pt-safe">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white border-8 border-black p-8 brutal-shadow-lg"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-electric-red text-white flex items-center justify-center border-4 border-black shrink-0">
                            <ShieldAlert className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="font-display font-black text-3xl uppercase leading-none">WAR ROOM</h1>
                            <p className="font-bold text-xs mt-1 uppercase text-gray-500">Nuclear Access Only</p>
                        </div>
                    </div>

                    <p className="text-sm font-bold uppercase mb-6 leading-relaxed">
                        This center regulates core platform mechanics. Unauthorized access is strictly prohibited.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase mb-1 tracking-widest">Executive Passkey</label>
                            <input 
                                type="password" 
                                value={passkey}
                                onChange={(e) => setPasskey(e.target.value)}
                                placeholder="••••••••••••"
                                className={`w-full bg-gray-100 border-4 border-black p-4 font-black text-xl tracking-[0.2em] focus:outline-none focus:bg-volt-green/10 transition-colors ${authError ? 'border-electric-red' : ''}`}
                                autoFocus
                            />
                            {authError && (
                                <p className="text-electric-red text-[10px] font-black uppercase mt-2 animate-bounce">Access Denied: Invalid Passkey</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button 
                                type="submit"
                                className="w-full bg-black text-white p-4 font-display font-black text-xl uppercase tracking-widest brutal-shadow-sm hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
                            >
                                Authorize
                            </button>
                            <button 
                                type="button"
                                onClick={onBack}
                                className="w-full bg-white text-black p-3 font-bold text-sm uppercase border-2 border-black hover:bg-gray-100 transition-colors"
                            >
                                Abandon Control
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Shield v2.04</span>
                        <span>IP Encrypted</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    const tabs = [
        { id: 'war-room', label: 'War Room', icon: ShieldAlert },
        { id: 'operations', label: 'Operations Hub', icon: Activity },
        { id: 'analytics', label: 'Strategic Analytics', icon: Target },
        { id: 'hype', label: 'Hype Engine', icon: TrendingUp },
        { id: 'cards', label: 'Card Management', icon: CreditCard },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'social', label: 'Social Hub Pulse', icon: Users },
        { id: 'retention', label: 'Retention', icon: LayoutDashboard },
        { id: 'vendor-friction', label: 'Vendor Friction', icon: Clock },
        { id: 'financial', label: 'Financial Health', icon: DollarSign },
        { id: 'payouts', label: 'Vendor Payouts', icon: DollarSign },
    ];

    return (
        <div className="flex h-screen bg-[#F4F4F5] font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 bg-deep-charcoal text-white flex flex-col brutal-shadow-md z-10 border-r-4 border-black relative">
                <div className="p-6 border-b-4 border-black bg-electric-red">
                    <h1 className="font-display font-black text-3xl uppercase tracking-tighter">Dev Control</h1>
                    <p className="font-bold text-xs mt-1 opacity-90 uppercase">Admin Nuclear Options</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 font-bold transition-all ${
                                    isActive 
                                    ? 'bg-volt-green text-black border-black brutal-shadow-sm translate-x-1' 
                                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="uppercase text-sm tracking-wider">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="p-4 border-t-4 border-black bg-deep-charcoal">
                    <button 
                        onClick={onBack}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-white text-black border-2 border-black rounded-lg font-bold uppercase hover:bg-gray-200 transition-colors brutal-shadow-sm active:translate-y-1 active:shadow-none"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Exit Dashboard
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-[url('/grid.svg')] bg-repeat">
                
                {/* Morning Coffee Top Bar */}
                <div className="h-24 bg-white border-b-4 border-black brutal-shadow-sm flex items-center px-8 justify-between shrink-0 z-0">
                    <div>
                        <h2 className="font-display font-black text-2xl uppercase">Morning Coffee Report</h2>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Today vs Last Week</p>
                    </div>
                    
                    {morningCoffee ? (
                        <div className="flex gap-8">
                            <div className="flex flex-col items-end" title="Total number of active group orders created today vs 7 days ago. Tracks network vitality.">
                                <span className="text-xs font-bold text-gray-500 uppercase cursor-help border-b border-dashed border-gray-400">Active Group Orders</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-black text-2xl">{morningCoffee.groupOrders.today}</span>
                                    <span className={`text-sm font-bold py-0.5 px-2 rounded-full border-2 border-black ${morningCoffee.groupOrders.today >= morningCoffee.groupOrders.lastWeek ? 'bg-volt-green' : 'bg-electric-red text-white'}`}>
                                        {morningCoffee.groupOrders.today >= morningCoffee.groupOrders.lastWeek ? '📈' : '📉'} 
                                        {Math.abs(morningCoffee.groupOrders.today - morningCoffee.groupOrders.lastWeek)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end" title="Average minutes from order creation to completion status. Lower means faster turnaround.">
                                <span className="text-xs font-bold text-gray-500 uppercase cursor-help border-b border-dashed border-gray-400">Avg Delivery Time</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-black text-2xl">{morningCoffee.deliveryTime.today}m</span>
                                    <span className={`text-sm font-bold py-0.5 px-2 rounded-full border-2 border-black ${morningCoffee.deliveryTime.today <= morningCoffee.deliveryTime.lastWeek ? 'bg-volt-green' : 'bg-electric-red text-white'}`}>
                                        {morningCoffee.deliveryTime.today <= morningCoffee.deliveryTime.lastWeek ? '📈' : '⚠️'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end" title="Count of new perk cards claimed by users today. Indicates engagement with gamification.">
                                <span className="text-xs font-bold text-gray-500 uppercase cursor-help border-b border-dashed border-gray-400">New Card Claims</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-black text-2xl">{morningCoffee.cardClaims.today}</span>
                                    <span className={`text-sm font-bold py-0.5 px-2 rounded-full border-2 border-black ${morningCoffee.cardClaims.today >= morningCoffee.cardClaims.lastWeek ? 'bg-volt-green' : 'bg-electric-red text-white'}`}>
                                        {morningCoffee.cardClaims.today >= morningCoffee.cardClaims.lastWeek ? '📈' : '📉'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm font-bold animate-pulse uppercase">Fetching Report...</div>
                    )}
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white border-4 border-black rounded-xl p-8 brutal-shadow-lg min-h-full"
                        >
                            <h2 className="font-display font-black text-4xl mb-6 uppercase border-b-4 border-black pb-4 inline-block pr-8">
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h2>
                            
                            {activeTab === 'war-room' && <WarRoomPanel />}
                            {activeTab === 'operations' && <OperationsHub />}
                            {activeTab === 'analytics' && <StrategicAnalytics />}
                            {activeTab === 'hype' && <HypeEngine />}
                            {activeTab === 'cards' && <CardManagement />}
                            {activeTab === 'leaderboard' && <LeaderboardCommand />}
                            {activeTab === 'social' && <SocialSafePulse />}
                            {activeTab === 'retention' && <RetentionMetrics />}
                            {activeTab === 'vendor-friction' && <VendorFriction />}
                            {activeTab === 'financial' && <FinancialHealth />}
                            {activeTab === 'payouts' && <PayoutsTab />}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
