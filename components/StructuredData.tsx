export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Dryland Swim Lab",
    "description": "Professional dryland training platform for amateur swimmers with expert coaching at Thousand Island Lake Training Base",
    "url": "https://drylandswimlab.com",
    "logo": "https://drylandswimlab.com/logo.png",
    "sameAs": [
      "https://twitter.com/drylandswimlab",
      "https://facebook.com/drylandswimlab"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thousand Island Lake",
      "addressRegion": "Zhejiang",
      "addressCountry": "CN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.61,
      "longitude": 119.03
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "06:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Amateurs Can Build an Actionable Training Plan: From Water Feel to Systematic Progression",
    "author": {
      "@type": "Organization",
      "name": "Dryland Swim Lab"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dryland Swim Lab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://drylandswimlab.com/logo.png"
      }
    },
    "datePublished": "2026-09-02",
    "dateModified": "2026-09-02",
    "description": "For amateur swimmers, learn how to build an actionable training plan that integrates dryland and water training",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://drylandswimlab.com/free/blog/article-1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
    </>
  );
}