import React, { useState } from 'react';
import StaticPageLayout from '@/Layouts/StaticPageLayout';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors px-4"
            >
                <h3 className="text-lg font-bold text-white pr-8">{question}</h3>
                <svg
                    className={`w-6 h-6 text-white transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-4 pb-6 text-gray-300 leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default function FAQ({ title, description }) {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is Cineverse?",
            answer: "Cineverse is a comprehensive streaming platform that offers a vast collection of movies and series across all genres. We provide high-quality content with a user-friendly interface designed to enhance your viewing experience."
        },
        {
            question: "How do I watch content on Cineverse?",
            answer: "Simply browse our extensive library, select the movie or series you want to watch, and click the 'Watch Now' button. You can stream content directly in your browser without any additional downloads or plugins required."
        },
        {
            question: "Is there a subscription fee?",
            answer: "Please check our pricing page for current subscription options and plans. We offer various packages to suit different viewing needs and budgets."
        },
        {
            question: "What devices can I use to watch?",
            answer: "Cineverse is accessible on multiple devices including desktop computers, laptops, tablets, and smartphones. Our responsive design ensures a seamless experience across all screen sizes."
        },
        {
            question: "How often is new content added?",
            answer: "We regularly update our library with new movies and series. New content is added weekly, ensuring you always have fresh entertainment options to explore."
        },
        {
            question: "Can I download content for offline viewing?",
            answer: "Download availability depends on your subscription plan and content licensing agreements. Please check the specific title or your account settings for download options."
        },
        {
            question: "What video quality is available?",
            answer: "We offer multiple streaming qualities including SD, HD, and 4K where available. The quality can be adjusted based on your internet connection speed and device capabilities."
        },
        {
            question: "How do I report a technical issue?",
            answer: "If you encounter any technical issues, please visit our Contact page and fill out the support form with details about the problem. Our technical team will assist you as soon as possible."
        },
        {
            question: "Can I request specific titles?",
            answer: "Yes! We value user feedback and content requests. Please contact us through our Contact page with your suggestions, and we'll do our best to add requested titles to our library."
        },
        {
            question: "Is my personal information secure?",
            answer: "Absolutely. We take privacy and security seriously. All personal information is encrypted and stored securely. Please review our Privacy Policy for detailed information about how we protect your data."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <StaticPageLayout title={title} description={description}>
            <div>
                <div className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-4 border-b border-white/10 pb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Find answers to common questions about Cineverse. If you don't see your question here,
                        feel free to contact us directly.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </div>

                <div className="mt-12 p-6 bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-3">Still have questions?</h3>
                    <p className="text-gray-400 mb-4">
                        If you couldn't find the answer you were looking for, our support team is here to help.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </StaticPageLayout>
    );
}
