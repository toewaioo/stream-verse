import React from 'react';

export default function CastGrid({ actors, directors, writers }) {
    const renderPerson = (personRole) => {
        const person = personRole.person;
        if (!person) return null;

        return (
            <div key={personRole.id} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
                <div className="aspect-[2/3] overflow-hidden">
                    <img
                        src={person.avatar_url || '/images/placeholder-avatar.jpg'}
                        alt={person.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-bold truncate text-shadow-sm">{person.name}</h4>
                    {personRole.character_name && (
                        <p className="text-gray-300 text-xs truncate mt-0.5">as <span className="text-blue-400">{personRole.character_name}</span></p>
                    )}
                    <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold text-gray-400 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
                        {personRole.role_type}
                    </span>
                </div>
            </div>
        );
    };

    const Section = ({ title, icon, items, color }) => {
        if (!items || items.length === 0) return null;

        return (
            <div className="mb-12 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20`}>
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-gray-400 font-medium ml-auto">
                        {items.length}
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {items.map(renderPerson)}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
            <Section
                title="Directors"
                items={directors}
                color="blue"
                icon={
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                }
            />

            <Section
                title="Writers"
                items={writers}
                color="purple"
                icon={
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                }
            />

            <Section
                title="Cast"
                items={actors}
                color="green"
                icon={
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                }
            />
        </div>
    );
}
