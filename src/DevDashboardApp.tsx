import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Activity, Target, Zap, 
    CreditCard, Trophy, Users, TrendingUp, 
    Clock, DollarSign, ArrowLeft
} from 'lucide-react';

import GodModePanel from './components/dev/GodModePanel';
import OperationsHub from './components/dev/OperationsHub';
import StrategicAnalytics from './components/dev/StrategicAnalytics';
import HypeEngine from './components/dev/HypeEngine';
import CardManagement from './components/dev/CardManagement';
import LeaderboardCommand from './components/dev/LeaderboardCommand';
import SocialSafePulse from './components/dev/SocialSafePulse';
import RetentionMetrics from './components/dev/RetentionMetrics';
import VendorFriction from './components/dev/VendorFriction';
import FinancialHealth from './components/dev/FinancialHealth';

interface DevDashboardProps {
    onBack: () => void;
}

export default function DevDashboardApp({ onBack }: DevDashboardProps) {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('devActiveTab') || 'god-mode';
    });
    
    useEffect(() => {
        localStorage.setItem('devActiveTab', activeTab);
    }, [activeTab]);

    const [morningCoffee, setMorningCoffee] = useState<any>(null);

    useEffect(() => {
        fetch('/api/admin/morning-coffee')
            .then(res => res.json())
            .then(data => setMorningCoffee(data))
            .catch(console.error);
    }, []);

    const tabs = [
        { id: 'god-mode', label: 'God Mode', icon: Zap },
        { id: 'operations', label: 'Operations Hub', icon: Activity },
        { id: 'analytics', label: 'Strategic Analytics', icon: Target },
        { id: 'hype', label: 'Hype Engine', icon: TrendingUp },
        { id: 'cards', label: 'Card Management', icon: CreditCard },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'social', label: 'Social Hub Pulse', icon: Users },
        { id: 'retention', label: 'Retention', icon: LayoutDashboard },
        { id: 'vendor-friction', label: 'Vendor Friction', icon: Clock },
        { id: 'financial', label: 'Financial Health', icon: DollarSign },
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
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-gray-500 uppercase">Active Group Orders</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-black text-2xl">{morningCoffee.groupOrders.today}</span>
                                    <span className={`text-sm font-bold py-0.5 px-2 rounded-full border-2 border-black ${morningCoffee.groupOrders.today >= morningCoffee.groupOrders.lastWeek ? 'bg-volt-green' : 'bg-electric-red text-white'}`}>
                                        {morningCoffee.groupOrders.today >= morningCoffee.groupOrders.lastWeek ? '📈' : '📉'} 
                                        {Math.abs(morningCoffee.groupOrders.today - morningCoffee.groupOrders.lastWeek)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-gray-500 uppercase">Avg Delivery Time</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-black text-2xl">{morningCoffee.deliveryTime.today}m</span>
                                    <span className={`text-sm font-bold py-0.5 px-2 rounded-full border-2 border-black ${morningCoffee.deliveryTime.today <= morningCoffee.deliveryTime.lastWeek ? 'bg-volt-green' : 'bg-electric-red text-white'}`}>
                                        {morningCoffee.deliveryTime.today <= morningCoffee.deliveryTime.lastWeek ? '📈' : '⚠️'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-gray-500 uppercase">New Card Claims</span>
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
                            
                            {activeTab === 'god-mode' && <GodModePanel />}
                            {activeTab === 'operations' && <OperationsHub />}
                            {activeTab === 'analytics' && <StrategicAnalytics />}
                            {activeTab === 'hype' && <HypeEngine />}
                            {activeTab === 'cards' && <CardManagement />}
                            {activeTab === 'leaderboard' && <LeaderboardCommand />}
                            {activeTab === 'social' && <SocialSafePulse />}
                            {activeTab === 'retention' && <RetentionMetrics />}
                            {activeTab === 'vendor-friction' && <VendorFriction />}
                            {activeTab === 'financial' && <FinancialHealth />}

                            {(activeTab !== 'god-mode' && activeTab !== 'operations' && activeTab !== 'analytics' && activeTab !== 'hype') && (
                                <div className="text-gray-500 font-bold uppercase tracking-widest mt-12 text-center items-center justify-center flex flex-col opacity-50">
                                    <Activity className="w-16 h-16 mb-4" />
                                    Module Under Construction
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
