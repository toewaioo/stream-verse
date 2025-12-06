import React, { useEffect } from "react";
import StaticPageLayout from "@/Layouts/StaticPageLayout";
import { router } from "@inertiajs/react";

export default function Privacy({ title, description }) {
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.BackButton.show();

        tg.onEvent("backButtonClicked", () => {
            window.history.back();
            //const prevRoute =
            //     sessionStorage.getItem("tgPrevRoute") || route("home");
            // router.visit(prevRoute, {
            //     preserveState: true,
            //     preserveScroll: true,
            // });
        });
        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick();
        };
    }, []);
    return (
        <StaticPageLayout title={title} description={description}>
            <div className="prose prose-invert prose-lg max-w-none">
                <section className="mb-12">
                    <p className="text-gray-400 text-sm mb-8">
                        <strong>Last Updated:</strong> November 30, 2025
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        At Cineverse, we are committed to protecting your
                        privacy and ensuring the security of your personal
                        information. This Privacy Policy explains how we
                        collect, use, disclose, and safeguard your data when you
                        use our platform.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Information We Collect
                    </h2>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">
                        Personal Information
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        We collect information that you provide directly to us,
                        including:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
                        <li>
                            Name and email address when you create an account
                        </li>
                        <li>Payment information for subscription services</li>
                        <li>Communication preferences and feedback</li>
                        <li>Profile information and viewing preferences</li>
                    </ul>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">
                        Usage Information
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        We automatically collect certain information about your
                        device and how you interact with our platform:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Viewing history and watch time</li>
                        <li>Search queries and content interactions</li>
                        <li>Device information and IP address</li>
                        <li>Browser type and operating system</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        How We Use Your Information
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        We use the collected information for various purposes:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>To provide and maintain our streaming service</li>
                        <li>
                            To personalize your viewing experience and recommend
                            content
                        </li>
                        <li>
                            To process your transactions and manage
                            subscriptions
                        </li>
                        <li>
                            To communicate with you about updates, promotions,
                            and support
                        </li>
                        <li>
                            To improve our platform and develop new features
                        </li>
                        <li>
                            To detect, prevent, and address technical issues and
                            security threats
                        </li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Information Sharing and Disclosure
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        We do not sell your personal information. We may share
                        your information in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>
                            <strong>Service Providers:</strong> With trusted
                            third parties who assist in operating our platform
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> When required
                            by law or to protect our rights
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> In connection
                            with mergers, acquisitions, or asset sales
                        </li>
                        <li>
                            <strong>With Your Consent:</strong> When you
                            explicitly agree to share your information
                        </li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Data Security
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        We implement appropriate technical and organizational
                        measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or
                        destruction. This includes:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments and updates</li>
                        <li>Restricted access to personal information</li>
                        <li>Secure payment processing systems</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Your Rights and Choices
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        You have certain rights regarding your personal
                        information:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>
                            <strong>Access:</strong> Request access to your
                            personal data
                        </li>
                        <li>
                            <strong>Correction:</strong> Update or correct
                            inaccurate information
                        </li>
                        <li>
                            <strong>Deletion:</strong> Request deletion of your
                            personal data
                        </li>
                        <li>
                            <strong>Opt-out:</strong> Unsubscribe from marketing
                            communications
                        </li>
                        <li>
                            <strong>Data Portability:</strong> Request a copy of
                            your data in a portable format
                        </li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Cookies and Tracking Technologies
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We use cookies and similar tracking technologies to
                        enhance your experience, analyze usage patterns, and
                        deliver personalized content. You can control cookie
                        settings through your browser preferences.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Children's Privacy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our service is not intended for children under 13 years
                        of age. We do not knowingly collect personal information
                        from children under 13. If you believe we have collected
                        such information, please contact us immediately.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Changes to This Privacy Policy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We may update this Privacy Policy from time to time. We
                        will notify you of any changes by posting the new
                        Privacy Policy on this page and updating the "Last
                        Updated" date.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                        Contact Us
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        If you have any questions or concerns about this Privacy
                        Policy or our data practices, please contact us at:
                    </p>
                    <div className="bg-white/5 p-6 border border-white/10">
                        <p className="text-white">
                            Email: privacy@cineverse.com
                        </p>
                        <p className="text-white">
                            Address: 123 Cinema Street, Entertainment City, EC
                            12345
                        </p>
                    </div>
                </section>
            </div>
        </StaticPageLayout>
    );
}
