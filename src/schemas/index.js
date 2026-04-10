/**
 * Structured Data Templates for Bevpedia
 * Use these for <SEO structuredData={...} /> prop
 * 
 * Copy the relevant template and fill in your data
 */

// ============ COCKTAIL PAGE SCHEMA ============
export const cocktailSchema = (cocktail) => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": cocktail.name,
  "description": cocktail.description || `Recipe for ${cocktail.name}`,
  "image": cocktail.image || `https://bevpedia.in/images/cocktails/${cocktail.slug}.jpg`,
  "author": {
    "@type": "Organization",
    "name": "Bevpedia",
    "url": "https://bevpedia.in"
  },
  "prepTime": "PT5M",
  "cookTime": "PT0M",
  "totalTime": "PT5M",
  "recipeYield": cocktail.servings || "1 serving",
  "recipeCategory": "Beverage",
  "recipeCuisine": "International",
  "recipeIngredient": cocktail.ingredients?.map(ing => 
    typeof ing === 'string' ? ing : `${ing.amount} ${ing.unit || ''} ${ing.name}`.trim()
  ) || [],
  "recipeInstructions": cocktail.instructions?.map((step, idx) => ({
    "@type": "HowToStep",
    "position": idx + 1,
    "text": step
  })) || [],
  "aggregateRating": cocktail.rating ? {
    "@type": "AggregateRating",
    "ratingValue": cocktail.rating,
    "ratingCount": cocktail.ratingCount || 1,
    "bestRating": "5",
    "worstRating": "1"
  } : undefined,
  "keywords": cocktail.keywords || `${cocktail.name}, cocktail recipe, bartending`
});

// ============ SPIRIT PAGE SCHEMA ============
export const spiritSchema = (spirit) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": spirit.name,
  "description": spirit.description || `Professional guide to ${spirit.name}`,
  "image": spirit.image || `https://bevpedia.in/images/spirits/${spirit.slug}.jpg`,
  "brand": {
    "@type": "Brand",
    "name": "Bevpedia"
  },
  "url": `https://bevpedia.in/spirits/${spirit.slug}`,
  "category": "Beverage",
  "keywords": spirit.keywords || `${spirit.name}, spirit, alcohol, bartending`,
  "aggregateRating": spirit.rating ? {
    "@type": "AggregateRating",
    "ratingValue": spirit.rating,
    "ratingCount": spirit.ratingCount || 1,
    "bestRating": "5",
    "worstRating": "1"
  } : undefined,
  "author": {
    "@type": "Organization",
    "name": "Bevpedia",
    "url": "https://bevpedia.in"
  }
});

// ============ WINE PAGE SCHEMA ============
export const wineSchema = (wine) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": wine.name,
  "description": wine.description || `Wine guide for ${wine.name}`,
  "image": wine.image || `https://bevpedia.in/images/wines/${wine.slug}.jpg`,
  "brand": {
    "@type": "Brand",
    "name": "Bevpedia"
  },
  "url": `https://bevpedia.in/wines/${wine.slug}`,
  "category": "Wine",
  "keywords": wine.keywords || `${wine.name}, wine, viticulture`,
  "aggregateRating": wine.rating ? {
    "@type": "AggregateRating",
    "ratingValue": wine.rating,
    "ratingCount": wine.ratingCount || 1,
    "bestRating": "5",
    "worstRating": "1"
  } : undefined
});

// ============ BEER PAGE SCHEMA ============
export const beerSchema = (beer) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": beer.name,
  "description": beer.description || `Beer guide for ${beer.name}`,
  "image": beer.image || `https://bevpedia.in/images/beers/${beer.slug}.jpg`,
  "brand": {
    "@type": "Brand",
    "name": "Bevpedia"
  },
  "url": `https://bevpedia.in/beers/${beer.slug}`,
  "category": "Beer",
  "keywords": beer.keywords || `${beer.name}, beer, brewing`,
  "aggregateRating": beer.rating ? {
    "@type": "AggregateRating",
    "ratingValue": beer.rating,
    "ratingCount": beer.ratingCount || 1,
    "bestRating": "5",
    "worstRating": "1"
  } : undefined
});

// ============ ARTICLE PAGE SCHEMA ============
export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description || article.summary,
  "image": article.image || `https://bevpedia.in/images/articles/${article.slug}.jpg`,
  "author": {
    "@type": "Person",
    "name": article.author || "Bevpedia Team"
  },
  "datePublished": article.publishedDate || new Date().toISOString().split('T')[0],
  "dateModified": article.updatedDate || article.publishedDate || new Date().toISOString().split('T')[0],
  "publisher": {
    "@type": "Organization",
    "name": "Bevpedia",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bevpedia.in/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://bevpedia.in/articles/${article.slug}`
  },
  "articleBody": article.content || article.body || "",
  "keywords": article.keywords || "beverage, education"
});

// ============ GLOSSARY TERM PAGE SCHEMA ============
export const glossarySchema = (term) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": term.term,
  "description": term.definition,
  "url": `https://bevpedia.in/glossary/${term.slug}`,
  "inLanguage": "en-US"
});

// ============ TECHNIQUE PAGE SCHEMA ============
export const techniqueSchema = (technique) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": technique.name,
  "description": technique.description,
  "image": technique.image || `https://bevpedia.in/images/techniques/${technique.slug}.jpg`,
  "step": technique.steps?.map((step, idx) => ({
    "@type": "HowToStep",
    "position": idx + 1,
    "text": step,
    "image": step.image || undefined
  })) || [],
  "tool": technique.tools || [],
  "estimatedCost": technique.estimatedCost || undefined,
  "totalTime": technique.duration || undefined
});

// ============ BREADCRUMB SCHEMA ============
// Use on all product pages to show hierarchy
export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "name": item.name,
    "item": `https://bevpedia.in${item.url}`
  }))
});

// ============ FREQUENTLY ASKED QUESTIONS ============
// Use on category pages or if you have FAQ sections
export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// ============ EXAMPLE USAGE IN YOUR COMPONENTS ============

/*
// CocktailPage.jsx
import SEO from './components/SEO';
import { cocktailSchema, breadcrumbSchema } from './schemas';

function CocktailPage({ cocktail }) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Cocktails', url: '/cocktails' },
    { name: cocktail.name, url: `/cocktails/${cocktail.slug}` }
  ];

  const structuredData = cocktailSchema(cocktail);

  return (
    <>
      <SEO
        title={cocktail.name}
        description={`Learn how to make ${cocktail.name} - perfect for bartenders and enthusiasts`}
        image={cocktail.image}
        keywords={`${cocktail.name}, cocktail, recipe, ${cocktail.mainSpirit}`}
        structuredData={structuredData}
      />
      
      <div>
        <h1>{cocktail.name}</h1>
        <p>{cocktail.description}</p>
        
        <h2>Ingredients</h2>
        <ul>
          {cocktail.ingredients.map(ing => (
            <li key={ing.name}>{ing.amount} {ing.unit} {ing.name}</li>
          ))}
        </ul>
        
        <h2>Instructions</h2>
        <ol>
          {cocktail.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
        
        {cocktail.related && (
          <div>
            <h2>Similar Cocktails</h2>
            <ul>
              {cocktail.related.map(rel => (
                <li key={rel.id}>
                  <a href={`/cocktails/${rel.slug}`}>{rel.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
*/
