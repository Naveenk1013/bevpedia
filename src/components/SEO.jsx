import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, image, type = 'website', noindex = false }) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://bevpedia.in';
  
  // Clean up trailing slashes for canonical consistency
  const cleanPathname = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
    
  const canonicalUrl = `${siteUrl}${cleanPathname}`;
  const fullTitle = title ? `${title} | Bevpedia` : 'Bevpedia | The Ultimate Professional Beverage Encyclopedia';
  const fullDescription = description || 'Master the art of hospitality with Bevpedia. Explore comprehensive guides on spirits, wine, beer, and professional bar techniques designed for industry experts and students.';
  const shareImage = image || `${siteUrl}/images/og-main.jpg`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={shareImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={shareImage} />
    </Helmet>
  );
};

export default SEO;
