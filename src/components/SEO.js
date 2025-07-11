import React, { useEffect } from 'react';

/**
 * SEO component for managing meta tags and structured data
 * Compatible with React 19
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.image - Image URL for social sharing
 * @param {Object} props.product - Product data for product schema
 * @param {string} props.keywords - Keywords for SEO
 */
const SEO = ({
  title,
  description,
  canonical,
  image,
  product = null,
  keywords = ''
}) => {
  // Default values
  const defaultTitle = 'MF-Enterprises - Outdoor Gym & Playground Equipment';
  const defaultDescription = 'MF-Enterprises - Leading manufacturer of outdoor gym equipment, playground equipment, iron benches, gazebos, FRP dustbins, and boats.';
  const defaultImage = '/logo192.png';
  const siteUrl = 'https://mf-enterprises.com'; // Replace with your actual domain

  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Create product schema if product data is provided
  let productSchema = null;
  if (product) {
    productSchema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: product.images && product.images.length > 0 ? product.images[0] : defaultImage,
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'MF-Enterprises'
      },
      category: product.category === 'outdoor-gym' ? 'Outdoor Gym Equipment' :
                product.category === 'playground' ? 'Playground Equipment' :
                product.category === 'gazebos' ? 'Gazebos' :
                product.category === 'benches' ? 'Benches' :
                product.category === 'dustbins' ? 'FRP Dustbins' : 'Outdoor Equipment',
      offers: {
        '@type': 'Offer',
        url: seoUrl,
        priceCurrency: 'INR',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'MF-Enterprises'
        }
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'MF-Enterprises',
        description: 'Leading manufacturer of outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins',
        url: siteUrl
      },
      keywords: product.seo_keywords || keywords
    };

    // Add specifications if available
    if (product.specifications) {
      const specs = [];
      Object.entries(product.specifications).forEach(([key, value]) => {
        specs.push({
          '@type': 'PropertyValue',
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: value
        });
      });

      if (specs.length > 0) {
        productSchema.additionalProperty = specs;
      }
    }

    // Add features as itemListElement if available
    if (product.features && product.features.length > 0) {
      productSchema.hasFeature = product.features.map((feature, index) => ({
        '@type': 'PropertyValue',
        name: `Feature ${index + 1}`,
        value: feature
      }));
    }

    // Add subcategory if available
    if (product.subcategory) {
      productSchema.category = `${productSchema.category} - ${product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}`;
    }
  }

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MF-Enterprises',
    url: siteUrl,
    logo: `${siteUrl}/logo192.png`,
    description: 'Leading manufacturer of outdoor gym equipment, playground equipment, gazebos, benches, and FRP dustbins with high-quality iron construction and powder coating.',
    slogan: 'Quality Outdoor Equipment for Parks, Schools, and Public Spaces',
    foundingDate: '2015',
    founders: [
      {
        '@type': 'Person',
        name: 'Shahnawaz Ainuddin Qazi',
        jobTitle: 'CEO'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aurangabad',
      addressRegion: 'Maharashtra',
      addressCountry: 'India'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9021535909',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9021535909',
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi']
      }
    ],
    sameAs: [
      'https://www.facebook.com/mfenterprises',
      'https://www.instagram.com/mfenterprises'
    ]
  };

  // Update meta tags on component mount and when props change
  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update basic meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'MF-Enterprises');
    updateMetaTag('robots', 'index, follow');

    // Add geo tags for local SEO
    updateMetaTag('geo.region', 'IN-MH');
    updateMetaTag('geo.placename', 'Aurangabad, Maharashtra');
    updateMetaTag('geo.position', '19.8762;75.3433');
    updateMetaTag('ICBM', '19.8762, 75.3433');

    // Add mobile-specific meta tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black');
    updateMetaTag('format-detection', 'telephone=no');

    // Update canonical link
    updateLink('canonical', seoUrl);

    // Add alternate language links if needed
    updateLink('alternate', seoUrl, 'en');

    // Update Open Graph / Facebook meta tags
    updateMetaTag('og:type', product ? 'product' : 'website', 'property');
    updateMetaTag('og:url', seoUrl, 'property');
    updateMetaTag('og:title', seoTitle, 'property');
    updateMetaTag('og:description', seoDescription, 'property');
    updateMetaTag('og:image', seoImage, 'property');
    updateMetaTag('og:site_name', 'MF-Enterprises', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');

    if (product) {
      updateMetaTag('product:brand', 'MF-Enterprises', 'property');
      updateMetaTag('product:availability', 'in stock', 'property');
      updateMetaTag('product:condition', 'new', 'property');
      updateMetaTag('product:category', product.category, 'property');
    }

    // Update Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', seoUrl);
    updateMetaTag('twitter:title', seoTitle);
    updateMetaTag('twitter:description', seoDescription);
    updateMetaTag('twitter:image', seoImage);
    updateMetaTag('twitter:site', '@MFEnterprises');
    updateMetaTag('twitter:creator', '@MFEnterprises');

    // Update structured data
    updateStructuredData('product-schema', product ? productSchema : null);
    updateStructuredData('organization-schema', organizationSchema);

    // Add breadcrumb structured data for products
    if (product) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': product.category === 'outdoor-gym' ? 'Outdoor Gym Equipment' :
                    product.category === 'playground' ? 'Playground Equipment' :
                    product.category === 'gazebos' ? 'Gazebos' :
                    product.category === 'benches' ? 'Benches' :
                    product.category === 'dustbins' ? 'FRP Dustbins' : 'Products',
            'item': `${siteUrl}/categories/${product.category}`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': product.name,
            'item': `${siteUrl}/product/${product.id}`
          }
        ]
      };
      updateStructuredData('breadcrumb-schema', breadcrumbSchema);
    } else {
      removeElement('breadcrumb-schema');
    }

    // Cleanup function to remove schema scripts when component unmounts
    return () => {
      removeElement('product-schema');
      removeElement('organization-schema');
      removeElement('breadcrumb-schema');
    };
  }, [seoTitle, seoDescription, seoUrl, seoImage, keywords, product, productSchema, organizationSchema]);

  // Helper function to update meta tags
  const updateMetaTag = (name, content, attributeName = 'name') => {
    if (!content) return;

    // Look for existing meta tag
    let meta = document.querySelector(`meta[${attributeName}="${name}"]`);

    // Create meta tag if it doesn't exist
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attributeName, name);
      document.head.appendChild(meta);
    }

    // Update content
    meta.setAttribute('content', content);
  };

  // Helper function to update link tags
  const updateLink = (rel, href, lang = null) => {
    if (!href) return;

    // For alternate language links, we need to include the lang attribute in the selector
    const selector = lang ? `link[rel="${rel}"][hreflang="${lang}"]` : `link[rel="${rel}"]`;

    // Look for existing link
    let link = document.querySelector(selector);

    // Create link if it doesn't exist
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      if (lang) {
        link.setAttribute('hreflang', lang);
      }
      document.head.appendChild(link);
    }

    // Update href
    link.setAttribute('href', href);
  };

  // Helper function to update structured data
  const updateStructuredData = (id, data) => {
    if (!data) {
      removeElement(id);
      return;
    }

    // Look for existing script
    let script = document.getElementById(id);

    // Create script if it doesn't exist
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    // Update content
    script.textContent = JSON.stringify(data);
  };

  // Helper function to remove element
  const removeElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.parentNode.removeChild(element);
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default SEO;
