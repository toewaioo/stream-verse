import React, { useState } from 'react';
import StaticPageLayout from '@/Layouts/StaticPageLayout';

export default function Contact({ title, description }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <StaticPageLayout title={title} description={description}>
            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Get in Touch
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        Have questions, suggestions, or feedback? We'd love to hear from you.
                        Fill out the form and our team will get back to you as soon as possible.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Email</h3>
                                <p className="text-gray-400 text-sm">support@cineverse.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Address</h3>
                                <p className="text-gray-400 text-sm">123 Cinema Street<br />Entertainment City, EC 12345</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Business Hours</h3>
                                <p className="text-gray-400 text-sm">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday - Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Send Us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                                placeholder="Your message here..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </StaticPageLayout>
    );
}
