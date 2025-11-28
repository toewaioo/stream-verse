import React from 'react';

export default function TabNavigation({ tabs, activeTab, onTabChange }) {
    return (
        <div className="sticky top-0 z-30 bg-[#0a0e17]/80 backdrop-blur-xl border-b border-white/5 mb-8">
            <div className="container-custom">
                <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }
                            `}
                        >
                            {tab.icon && <span className="text-lg">{tab.icon}</span>}
                            {tab.label}
                            {tab.count !== undefined && tab.count > 0 && (
                                <span className={`
                                    ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                                    ${activeTab === tab.id
                                        ? 'bg-black/10 text-black'
                                        : 'bg-white/10 text-gray-300'
                                    }
                                `}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
