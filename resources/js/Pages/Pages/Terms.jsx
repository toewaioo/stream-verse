import React from 'react';
import StaticPageLayout from '@/Layouts/StaticPageLayout';

export default function Terms({ title, description }) {
    return (
        <StaticPageLayout title={title} description={description}>
            <div className="prose prose-invert prose-lg max-w-none">
                <section className="mb-12">
                    <p className="text-gray-400 text-sm mb-8">
                        <strong>Last Updated:</strong> November 30, 2025
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Welcome to Cineverse. By accessing or using our platform, you agree to be bound by these Terms of Service.
                        Please read them carefully before using our services.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        By creating an account or using Cineverse, you acknowledge that you have read, understood, and agree to be
                        bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not
                        use our services.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        2. User Accounts
                    </h2>
                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Account Creation</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        To access certain features, you must create an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
                        <li>Provide accurate and complete information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Notify us immediately of any unauthorized use</li>
                        <li>Be responsible for all activities under your account</li>
                    </ul>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Age Restrictions</h3>
                    <p className="text-gray-300 leading-relaxed">
                        You must be at least 13 years old to use Cineverse. Users under 18 must have parental or guardian consent.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        3. Subscription and Payment
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Subscription terms include:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li><strong>Billing:</strong> Subscriptions are billed on a recurring basis</li>
                        <li><strong>Cancellation:</strong> You may cancel your subscription at any time</li>
                        <li><strong>Refunds:</strong> No refunds for partial subscription periods</li>
                        <li><strong>Price Changes:</strong> We reserve the right to modify pricing with advance notice</li>
                        <li><strong>Payment Methods:</strong> You must provide a valid payment method</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        4. Content and Usage
                    </h2>
                    <h3 className="text-xl font-bold text-white mb-4 mt-8">License to Use</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        We grant you a limited, non-exclusive, non-transferable license to access and view content on Cineverse
                        for personal, non-commercial use only.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Prohibited Activities</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Download, copy, or redistribute content without authorization</li>
                        <li>Use automated systems or bots to access the service</li>
                        <li>Circumvent any security or access control measures</li>
                        <li>Share account credentials with others</li>
                        <li>Use the service for any illegal or unauthorized purpose</li>
                        <li>Attempt to interfere with the proper functioning of the platform</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        5. Intellectual Property
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        All content on Cineverse, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
                        <li>Movies, series, and video content</li>
                        <li>Graphics, logos, and design elements</li>
                        <li>Text, software, and code</li>
                        <li>Trademarks and service marks</li>
                    </ul>
                    <p className="text-gray-300 leading-relaxed">
                        are owned by or licensed to Cineverse and are protected by copyright, trademark, and other intellectual
                        property laws.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        6. User Conduct
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        You agree to use Cineverse in a manner that:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Complies with all applicable laws and regulations</li>
                        <li>Respects the rights of other users and content creators</li>
                        <li>Does not involve harassment, abuse, or hate speech</li>
                        <li>Does not transmit viruses or malicious code</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        7. Termination
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We reserve the right to suspend or terminate your account at any time, with or without notice, for conduct
                        that violates these Terms of Service or is harmful to other users, us, or third parties, or for any other
                        reason at our sole discretion.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        8. Disclaimers and Limitation of Liability
                    </h2>
                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Service Availability</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        We provide the service "as is" and make no warranties regarding availability, reliability, or quality.
                        We do not guarantee uninterrupted or error-free service.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Limitation of Liability</h3>
                    <p className="text-gray-300 leading-relaxed">
                        To the fullest extent permitted by law, Cineverse shall not be liable for any indirect, incidental, special,
                        consequential, or punitive damages arising from your use of the service.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        9. Content Accuracy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        While we strive to provide accurate content information, we do not guarantee the accuracy, completeness, or
                        reliability of any content descriptions, metadata, or related information.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        10. Modifications to Terms
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes
                        by posting the updated terms on this page. Your continued use of the service after such changes constitutes
                        acceptance of the new terms.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        11. Governing Law
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in
                        which Cineverse operates, without regard to its conflict of law provisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        12. Contact Information
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        For questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-white/5 p-6 border border-white/10">
                        <p className="text-white">Email: legal@cineverse.com</p>
                        <p className="text-white">Address: 123 Cinema Street, Entertainment City, EC 12345</p>
                    </div>
                </section>
            </div>
        </StaticPageLayout>
    );
}
