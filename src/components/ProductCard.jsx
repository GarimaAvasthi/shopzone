import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/Authcontext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      showToast("Please login to add items to cart 🔒");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }
    
    addToCart(product);
    showToast("Added to cart ✅");
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="product-card-image"
          />
          {product.discountPercentage && (
            <span className="product-discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
          <div className="product-card-overlay">
            <button
              className="product-card-add-btn"
              onClick={handleAddToCart}
              title="Add to cart"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </Link>
      
      <div className="product-card-info">
        <Link to={`/product/${product.id}`} className="product-card-title-link">
          <h3 className="product-card-title">{product.title}</h3>
        </Link>
        
        <div className="product-card-rating">
          {product.rating && (
            <>
              <span className="rating-star">⭐</span>
              <span className="rating-value">{product.rating.toFixed(1)}</span>
            </>
          )}
        </div>
        
        <div className="product-card-price-section">
          <span className="product-card-price">${product.price}</span>
          {product.discountPercentage && (
            <span className="product-card-original-price">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
        
        <button
          className="product-card-quick-add"
          onClick={handleAddToCart}
        >
          Quick Add
        </button>
      </div>
    </div>
  );
}
