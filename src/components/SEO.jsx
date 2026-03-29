
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO Component for dynamic head management.
 * Handles Titles, Descriptions, Canonical URLs and JSON-LD Schema.
 */
const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage,
  schema 
}) => {
  const siteTitle = "bevpedia.in";
  const fullTitle = title ? `${title} | ${siteTitle}` : `Beverage Encyclopedia | ${siteTitle}`;
  const defaultDesc = "Professional hospitality resources, cocktail recipes, spirits knowledge, and WSET study material.";

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDesc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
