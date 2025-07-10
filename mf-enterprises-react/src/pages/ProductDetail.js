import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLoading } from '../context/LoadingContext';
import { openWhatsApp } from '../utils/whatsappHelper';
import SEO from '../components/SEO';
import '../styles/ProductDetail.css';
import allProducts from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { addToCart } = useCart();
  const { startLoading, stopLoading } = useLoading();

  // Find the product by ID from our products data
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = allProducts.find(p => p.id === id);

    // If product is found, enhance it with additional details
    if (foundProduct) {
      // Add default features and specifications if not present
      const enhancedProduct = {
        ...foundProduct,
        images: [foundProduct.image || '/placeholder.jpg'],
        features: foundProduct.features || [
          'Weather-resistant powder coating',
          'Heavy-duty iron construction',
          'Low maintenance design',
          'Suitable for all environments'
        ],
        specifications: foundProduct.specifications || {
          dimensions: 'Varies by model',
          weight: 'Varies by model',
          material: 'Iron with powder coating',
          warranty: '1 year'
        }
      };

      setProduct(enhancedProduct);

      // Find related products (same category, different product)
      const related = allProducts
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 3); // Get up to 3 related products

      setRelatedProducts(related);
    }
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Add the product to cart using the context
    // The toast notification is now handled by the CartContext
    addToCart(product, quantity);
  };

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to create WhatsApp message from form data
  const createWhatsAppMessage = () => {
    // Create message
    let message = `*New Quotation Request*\n\n`;
    message += `*Product:* ${product.name}\n`;
    message += `*Product ID:* ${product.id}\n`;
    message += `*Quantity:* ${quantity}\n\n`;
    message += `*Customer Details:*\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;

    if (formData.phone) {
      message += `*Phone:* ${formData.phone}\n`;
    }

    if (formData.message) {
      message += `\n*Additional Information:*\n${formData.message}\n`;
    }

    return encodeURIComponent(message);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();

    // Show loading animation
    startLoading();

    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage();

    // Log form data
    console.log('Quote request submitted:', {
      product: product.name,
      quantity,
      ...formData
    });

    // Simulate a short delay before redirecting
    setTimeout(() => {
      // Stop loading animation
      stopLoading();

      // Show success message
      setFormSubmitted(true);

      // Open WhatsApp using the helper function
      openWhatsApp('919021535909', whatsappMessage);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setShowQuoteForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  };

  // Show loading state if product is not yet loaded
  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-loading">
          <div className="loader"></div>
          <p>Loading product information...</p>
        </div>
      </div>
    );
  }

  // Get category name for breadcrumbs
  const getCategoryName = (categoryId) => {
    const categories = {
      'outdoor-gym': 'Outdoor Gym Equipment',
      'playground': 'Playground Equipment',
      'gazebos': 'Gazebos',
      'benches': 'Benches',
      'dustbins': 'FRP Dustbins',
      'boats': 'Boats'
    };
    return categories[categoryId] || categoryId;
  };

  // Generate SEO keywords based on product data
  const generateKeywords = () => {
    // If product has predefined SEO keywords, use those
    if (product.seo_keywords) {
      return product.seo_keywords;
    }

    // Otherwise, generate keywords dynamically
    const categoryName = getCategoryName(product.category);

    // Base keywords that should be included for all products
    const baseKeywords = [
      product.name,
      `${product.name} ${categoryName}`,
      `${product.name} MF-Enterprises`,
      `${product.name} price`,
      `${product.name} cost`,
      `${product.name} manufacturer`,
      `${product.name} supplier`,
      `${product.name} India`,
      `buy ${product.name}`,
      `${product.name} for sale`,
      'MF-Enterprises',
      'outdoor equipment',
      categoryName,
      `${categoryName} manufacturer`,
      `${categoryName} supplier`,
      'iron equipment',
      'powder coating',
      'durable equipment',
      'outdoor equipment India',
      'playground manufacturer India',
      'outdoor gym equipment supplier'
    ];

    // Add subcategory if available
    if (product.subcategory) {
      baseKeywords.push(
        product.subcategory,
        `${product.subcategory} ${categoryName}`,
        `${product.name} ${product.subcategory}`,
        `${product.subcategory} manufacturer`,
        `${product.subcategory} supplier India`
      );
    }

    // Add features as keywords
    const featureKeywords = [];
    if (product.features) {
      product.features.forEach(feature => {
        // Extract key terms from features
        const terms = feature.toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .split(' ')
          .filter(term => term.length > 3);
        featureKeywords.push(...terms);

        // Add some complete phrases from features
        if (feature.length < 50) {
          featureKeywords.push(feature.toLowerCase());
        }
      });
    }

    // Add specifications as keywords
    const specKeywords = [];
    if (product.specifications) {
      Object.entries(product.specifications).forEach(([key, value]) => {
        if (typeof value === 'string') {
          // Add key-value pairs as keywords
          specKeywords.push(`${product.name} ${key}`);

          const terms = value.toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .split(' ')
            .filter(term => term.length > 3);
          specKeywords.push(...terms);

          // Add complete specification if it's short
          if (value.length < 30) {
            specKeywords.push(`${product.name} ${value.toLowerCase()}`);
            specKeywords.push(`${key} ${value.toLowerCase()}`);
          }
        }
      });
    }

    // Location-based keywords
    const locationKeywords = [
      `${product.name} near me`,
      `${categoryName} near me`,
      `${product.name} Aurangabad`,
      `${product.name} Maharashtra`,
      `${categoryName} Maharashtra`,
      `${product.name} India`
    ];

    // Usage-based keywords
    const usageKeywords = [
      `${product.name} for parks`,
      `${product.name} for schools`,
      `${product.name} for public spaces`,
      `${product.name} for residential areas`,
      `${product.name} for playgrounds`,
      `${product.name} for outdoor areas`
    ];

    // Combine all keyword types, filter out duplicates, and join with commas
    const allKeywords = [
      ...baseKeywords,
      ...featureKeywords,
      ...specKeywords,
      ...locationKeywords,
      ...usageKeywords
    ];

    // Filter out duplicates, limit to 50 keywords to avoid keyword stuffing, and join with commas
    return [...new Set(allKeywords)]
      .slice(0, 50)
      .join(', ');
  };

  // Generate SEO description
  const generateDescription = () => {
    // If the description is very short, expand it
    const baseDescription = product.description.length > 100
      ? product.description
      : `${product.name} - Premium quality ${getCategoryName(product.category).toLowerCase()} manufactured by MF-Enterprises. ${product.description}`;

    let description = `${baseDescription} `;

    // Add category and material information
    description += `This ${getCategoryName(product.category)} product is made from high-quality iron with durable powder coating for long-lasting performance in all weather conditions. `;

    // Add subcategory information if available
    if (product.subcategory) {
      description += `Part of our ${product.subcategory} collection. `;
    }

    // Add key features
    if (product.features && product.features.length > 0) {
      description += `Key features include: ${product.features.slice(0, 3).join(', ')}. `;
    }

    // Add specifications
    if (product.specifications) {
      const specs = [];

      // Add important specifications
      if (product.specifications.material) {
        specs.push(`Material: ${product.specifications.material}`);
      }

      if (product.specifications.warranty) {
        specs.push(`Warranty: ${product.specifications.warranty}`);
      }

      if (product.specifications.dimensions) {
        specs.push(`Dimensions: ${product.specifications.dimensions}`);
      }

      if (product.specifications.weight_capacity) {
        specs.push(`Weight Capacity: ${product.specifications.weight_capacity}`);
      }

      if (product.specifications.age_group) {
        specs.push(`Suitable for ${product.specifications.age_group}`);
      }

      if (specs.length > 0) {
        description += `Specifications: ${specs.join(', ')}. `;
      }
    }

    // Add call to action
    description += 'Perfect for parks, schools, and public spaces. Contact MF-Enterprises for quotation and customization options.';

    // Ensure description is not too long for meta tags (optimal is 150-160 characters)
    if (description.length > 320) {
      return description.substring(0, 317) + '...';
    }

    return description;
  };

  return (
    <div className="product-detail-container product-page no-animation">
      {/* SEO Component */}
      <SEO
        title={`${product.name} | ${getCategoryName(product.category)} | MF-Enterprises`}
        description={generateDescription()}
        canonical={`/product/${product.id}`}
        image={product.images[0]}
        product={product}
        keywords={generateKeywords()}
      />

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">›</span>
        <Link to={`/categories/${product.category}`}>{getCategoryName(product.category)}</Link>
        <span className="separator">›</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-detail-grid">
        {/* Product Images Section */}
        <div className="product-images-section">
          <div className="product-category-badge">
            {product.subcategory ? product.subcategory : product.category}
          </div>

          <div className="main-image">
            <div className="image-container">
              <img
                src={product.images[activeImageIndex]}
                alt={`MF-Enterprises ${product.name} - ${getCategoryName(product.category)} - High-quality iron construction with powder coating`}
                title={`${product.name} - Premium ${getCategoryName(product.category)} by MF-Enterprises`}
              />
            </div>
          </div>

          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${getCategoryName(product.category)} - View ${index + 1} - MF-Enterprises`}
                  title={`${product.name} - View ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info-section">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="product-id">Product ID: {product.id}</div>
          </div>

          <div className="product-description-box">
            <p className="product-description">{product.description}</p>
          </div>

          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-specifications">
            <h3>Specifications</h3>
            <table>
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="product-detail-actions">
            <div className="product-detail-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <div className="product-detail-quantity-controls">
                <button
                  className="product-detail-quantity-btn"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  className="product-detail-quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-detail-buttons">
              <button
                className="product-detail-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="product-detail-quote-btn"
                onClick={() => setShowQuoteForm(true)}
              >
                Request Quotation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>Related Products</h2>
          <div className="related-products">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="related-product-card"
              >
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="related-product-image">
                    <img
                      src={relatedProduct.image || "/placeholder.jpg"}
                      alt={`MF-Enterprises ${relatedProduct.name} - Related ${getCategoryName(product.category)} product`}
                      title={`${relatedProduct.name} - Related Product`}
                    />
                  </div>
                  <div className="related-product-info">
                    <h3>{relatedProduct.name}</h3>
                    <p>{relatedProduct.description.substring(0, 60)}...</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote Request Form Modal */}
        {showQuoteForm && (
          <div
            className="quote-form-overlay"
            onClick={() => setShowQuoteForm(false)}
          >
            <div
              className="quote-form-container"
              onClick={e => e.stopPropagation()}
            >
              <button className="close-form-btn" onClick={() => setShowQuoteForm(false)}>×</button>
              <h2>Request a Quotation</h2>
              <p>Please fill out the form below to receive a quotation for {product.name}</p>

              {formSubmitted ? (
                <div className="quote-form-success">
                  <div className="success-icon">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your quotation request is being sent via WhatsApp. If WhatsApp doesn't open automatically, please check your browser settings.</p>
                  <p className="whatsapp-note">We will get back to you shortly!</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="quote-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>

                  <div className="form-group product-summary">
                    <div className="summary-item">
                      <span>Product:</span>
                      <span>{product.name}</span>
                    </div>
                    <div className="summary-item">
                      <span>Quantity:</span>
                      <span>{quantity}</span>
                    </div>
                  </div>

                  <button type="submit" className="submit-quote-btn whatsapp-button">
                    <i className="fab fa-whatsapp"></i> Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default ProductDetail;
