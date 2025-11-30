import React from 'react';
import StaticPageLayout from '@/Layouts/StaticPageLayout';

export default function About({ title, description }) {
    return (
        <StaticPageLayout title={title} description={description}>
            <div className="prose prose-invert prose-lg max-w-none">
                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Welcome to Cineverse
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Cineverse is your ultimate destination for discovering and enjoying the best movies and series from around the world.
                        We are passionate about cinema and dedicated to bringing you a seamless streaming experience with a vast collection
                        of content across all genres.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        Founded with the vision of making quality entertainment accessible to everyone, we continuously update our library
                        with the latest releases, timeless classics, and hidden gems waiting to be discovered.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Our mission is to provide a premium streaming platform that combines cutting-edge technology with an extensive
                        content library. We believe that everyone deserves access to quality entertainment, and we're committed to
                        delivering an exceptional viewing experience.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        What We Offer
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">Extensive Library</h3>
                            <p className="text-gray-400 text-sm">
                                Thousands of movies and series across all genres, from action and drama to comedy and documentaries.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">High Quality</h3>
                            <p className="text-gray-400 text-sm">
                                Stream in HD and 4K quality for an immersive viewing experience on any device.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">Regular Updates</h3>
                            <p className="text-gray-400 text-sm">
                                New content added regularly, keeping you up to date with the latest releases and trending shows.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">User-Friendly</h3>
                            <p className="text-gray-400 text-sm">
                                Intuitive interface designed for easy navigation and discovery of your next favorite watch.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Join Our Community
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Become part of the Cineverse community and never miss out on the latest entertainment. Whether you're a casual
                        viewer or a dedicated cinephile, we have something for everyone.
                    </p>
                    <p className="text-gray-400 text-sm italic">
                        Thank you for choosing Cineverse. Happy watching!
                    </p>
                </section>
            </div>
        </StaticPageLayout>
    );
}
