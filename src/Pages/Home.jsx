import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6")
      .then((r) => r.json())
      .then((d) => setFeaturedProducts(d.products));
  }, []);

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Home", icon: "🏠" },
    { name: "Sports", icon: "⚽" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">ShopZone</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing products at unbeatable prices. Your one-stop shop
              for everything you need.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">🛍️</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/shop"
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card"
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <span className="view-product">View Product</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                  {product.rating && (
                    <div className="product-rating">
                      ⭐ {product.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/shop" className="btn-view-all">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
