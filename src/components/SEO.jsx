import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/**
 * SEO COMPONENT FOR BEVPEDIA
 * 
 * Handles all meta tags, structured data, and canonical URLs
 */

const SEO = ({ 
  title, 
  description, 
  image, 
  keywords = '',
  author = 'Bevpedia',
  type = 'website',
  noindex = false,
  structuredData = null,
  breadcrumbs = [] // Array of { name, item }
}) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://bevpedia.in';
  
  // Canonical URL - clean, no trailing slash
  const cleanPathname = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
    
  const canonicalUrl = `${siteUrl}${cleanPathname}`;
  
  // Full title with branding
  const fullTitle = title 
    ? `${title} | Bevpedia` 
    : 'Bevpedia | Professional Beverage Encyclopedia';
  
  // Default description
  const fullDescription = description || 
    'Master spirits, wine, beer, cocktails, and professional bar techniques. Comprehensive guides for hospitality students.';
  
  // Default keywords
  const fullKeywords = keywords || 'beverage, cocktail, spirit, wine, beer, hospitality';
  
  // Default Open Graph image
  const shareImage = image || `${siteUrl}/images/og-main.jpg`;

  return (
    <Helmet>
      {/* ========== ESSENTIAL META TAGS ========== */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* ========== ROBOTS & INDEXING ========== */}
      <meta 
        name="robots" 
        content={noindex ? 'noindex, nofollow' : 'index, follow'} 
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* ========== OPEN GRAPH (FACEBOOK/WHATSAPP) ========== */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bevpedia" />

      {/* ========== TWITTER CARD ========== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={shareImage} />

      {/* ========== STRUCTURED DATA (JSON-LD) ========== */}
      
      {/* Organization Schema - on every page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bevpedia",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": "Professional beverage encyclopedia for hospitality education"
        })}
      </script>

      {/* Page-specific Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              },
              ...breadcrumbs.map((bc, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": bc.name,
                "item": bc.item.startsWith('http') ? bc.item : `${siteUrl}${bc.item}`
              }))
            ]
          })}
        </script>
      )}

      {/* ========== LANGUAGE ========== */}
      <html lang="en" />
    </Helmet>
  );
};

export default SEO;
