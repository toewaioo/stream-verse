import React, { useState } from 'react';

export default function LinkSection({ watchLinks, downloadLinks, isVip }) {
    const [copiedLink, setCopiedLink] = useState(null);

    const getQualityBadgeClass = (quality) => {
        const q = quality?.toLowerCase();
        if (q?.includes('4k') || q?.includes('2160')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        if (q?.includes('1080')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        if (q?.includes('720')) return 'bg-green-500/20 text-green-400 border-green-500/30';
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const copyToClipboard = (url, linkId) => {
        navigator.clipboard.writeText(url);
        setCopiedLink(linkId);
        setTimeout(() => setCopiedLink(null), 2000);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '';
        const gb = bytes / (1024 ** 3);
        if (gb >= 1) return `${gb.toFixed(2)} GB`;
        const mb = bytes / (1024 ** 2);
        return `${mb.toFixed(2)} MB`;
    };

    const renderLink = (link, type = 'watch') => {
        const isLocked = link.is_vip_only && !isVip;
        const isDownload = type === 'download';

        return (
            <div
                key={link.id}
                className={`group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${isLocked ? 'opacity-75' : ''}`}
            >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getQualityBadgeClass(link.quality)}`}>
                                {link.quality}
                            </span>
                            <span className="text-white font-medium">{link.server_name}</span>
                            {link.is_vip_only && (
                                <span className="badge-vip text-[10px] px-2 py-0.5">VIP</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                            <span className="capitalize flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${link.success_rate >= 80 ? 'bg-green-500' : link.success_rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                {link.source_type || 'Direct'}
                            </span>
                            {isDownload && link.file_size && (
                                <>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                    <span>{formatFileSize(link.file_size)}</span>
                                </>
                            )}
                            {isDownload && link.file_format && (
                                <>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                    <span className="uppercase">{link.file_format}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isLocked ? (
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 cursor-not-allowed">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-bold">Unlock</span>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => copyToClipboard(link.url, link.id)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    title="Copy link"
                                >
                                    {copiedLink === link.id ? (
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg ${isDownload
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/20'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
                                        }`}
                                >
                                    {isDownload ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                            </svg>
                                            Watch
                                        </>
                                    )}
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderLinkGroup = (links, quality, type) => {
        if (!links || links.length === 0) return null;

        return (
            <div key={quality} className="mb-8 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-lg border ${getQualityBadgeClass(quality)} bg-opacity-10`}>
                        <span className="font-bold text-sm">{quality}</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {links.length} {links.length === 1 ? 'Source' : 'Sources'}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map(link => renderLink(link, type))}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in space-y-12">
            {/* Watch Links */}
            {watchLinks && Object.keys(watchLinks).length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Watch Online</h3>
                    </div>
                    {Object.entries(watchLinks)
                        .sort((a, b) => {
                            const order = { '4K': 0, '2160p': 0, '1080p': 1, '720p': 2, '480p': 3, '360p': 4 };
                            return (order[a[0]] || 99) - (order[b[0]] || 99);
                        })
                        .map(([quality, links]) => renderLinkGroup(links, quality, 'watch'))}
                </div>
            )}

            {/* Download Links */}
            {downloadLinks && Object.keys(downloadLinks).length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Download</h3>
                    </div>
                    {Object.entries(downloadLinks)
                        .sort((a, b) => {
                            const order = { '4K': 0, '2160p': 0, '1080p': 1, '720p': 2, '480p': 3, '360p': 4 };
                            return (order[a[0]] || 99) - (order[b[0]] || 99);
                        })
                        .map(([quality, links]) => renderLinkGroup(links, quality, 'download'))}
                </div>
            )}

            {/* No Links Message */}
            {(!watchLinks || Object.keys(watchLinks).length === 0) &&
                (!downloadLinks || Object.keys(downloadLinks).length === 0) && (
                    <div className="glass-card-dark text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Links Available</h3>
                        <p className="text-gray-400">We couldn't find any watch or download links for this movie yet.</p>
                        <button className="mt-6 btn-secondary">
                            Request Links
                        </button>
                    </div>
                )}
        </div>
    );
}
