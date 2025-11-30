import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SeoHead from '@/Components/SeoHead';
import LoadingLayout from '@/Layouts/LoadingLayout';

export default function StaticPageLayout({ title, description, children }) {
    return (
        <LoadingLayout>
            <>
                <SeoHead
                    title={title}
                    description={description}
                    type="website"
                />

                <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
                    <Navbar />

                    {/* Hero Section */}
                    <div className="relative h-[30vh] md:h-[40vh] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="container mx-auto px-6 md:px-12 text-center">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
                                    {title?.replace(' - Cineverse', '')}
                                </h1>
                                <div className="mt-4 h-1 w-24 bg-white mx-auto"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
                        <div className="max-w-4xl mx-auto">
                            {children}
                        </div>
                    </div>

                    <Footer />
                </div>
            </>
        </LoadingLayout>
    );
}
