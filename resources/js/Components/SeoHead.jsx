import { Head } from "@inertiajs/react";

/**
 * SeoHead Component
 * 
 * A comprehensive SEO component that manages:
 * - Page titles
 * - Meta descriptions
 * - Open Graph tags (for social media)
 * - Twitter Cards
 * - Canonical URLs
 * - Structured data (JSON-LD)
 */
export default function SeoHead({
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
    structuredData = null,
    author = null,
    publishedTime = null,
    modifiedTime = null,
}) {
    const appName = "Cineverse";
    const fullTitle = title ? `${title} - ${appName}` : appName;
    const defaultDescription = "Your Ultimate Movie & Series Destination - Stream and download the latest movies and TV series";
    const metaDescription = description || defaultDescription;
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph Tags (Facebook, LinkedIn, etc.) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={type} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            {image && <meta property="og:image" content={image} />}
            {image && <meta property="og:image:alt" content={title || appName} />}
            <meta property="og:site_name" content={appName} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Additional SEO Meta Tags */}
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Head>
    );
}
