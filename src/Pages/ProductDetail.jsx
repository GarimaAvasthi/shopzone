import {useParams, useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import {useCart} from "../context/Cartcontext";
import {useToast} from "../context/ToastContext";
import {useAuth} from "../context/Authcontext";

export default function ProductDetail(){

const {id}=useParams();
const navigate = useNavigate();
const [p,setP]=useState(null);
const [loading, setLoading] = useState(true);
const {addToCart}=useCart();
const {showToast}=useToast();
const {user} = useAuth();

useEffect(()=>{
setLoading(true);
fetch(`https://dummyjson.com/products/${id}`)
.then(r=>r.json())
.then(data => {
  setP(data);
  setLoading(false);
})
.catch(() => {
  setLoading(false);
});
},[id]);

const handleAddToCart = () => {
  if (!user) {
    showToast("Please login to add items to cart 🔒");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return;
  }
  addToCart(p);
  showToast("Added to cart ✅");
};

if(loading) {
  return (
    <div className="product-detail-loading">
      <div className="loading-spinner"></div>
      <p>Loading product...</p>
    </div>
  );
}

if(!p) {
  return (
    <div className="product-detail-error">
      <h2>Product not found</h2>
      <button onClick={() => navigate("/shop")} className="btn-primary">
        Back to Shop
      </button>
    </div>
  );
}

return(
  <div className="product-detail-page">
    <div className="product-detail-container">
      <div className="product-detail-image-section">
        <img src={p.thumbnail} alt={p.title} className="product-detail-image"/>
        {p.images && p.images.length > 1 && (
          <div className="product-image-gallery">
            {p.images.slice(0, 4).map((img, idx) => (
              <img key={idx} src={img} alt={`${p.title} ${idx + 1}`} className="gallery-thumbnail"/>
            ))}
          </div>
        )}
      </div>

      <div className="product-detail-info">
        <div className="product-breadcrumb">
          <span onClick={() => navigate("/shop")} className="breadcrumb-link">Shop</span>
          <span className="breadcrumb-separator"> / </span>
          <span>{p.category}</span>
        </div>

        <h1 className="product-detail-title">{p.title}</h1>
        
        {p.rating && (
          <div className="product-rating-section">
            <div className="product-rating">
              <span className="rating-stars">⭐</span>
              <span className="rating-value">{p.rating.toFixed(1)}</span>
              <span className="rating-count">({p.stock} in stock)</span>
            </div>
          </div>
        )}

        <div className="product-price-section">
          <span className="product-price-main">${p.price}</span>
          {p.discountPercentage && (
            <span className="product-discount">
              {p.discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="product-description">
          <h3>Description</h3>
          <p>{p.description}</p>
        </div>

        {p.brand && (
          <div className="product-meta">
            <div className="meta-item">
              <strong>Brand:</strong> {p.brand}
            </div>
            <div className="meta-item">
              <strong>Category:</strong> {p.category}
            </div>
          </div>
        )}

        <div className="product-actions">
          <button
            className="btn-add-to-cart"
            onClick={handleAddToCart}
          >
            <span>🛒</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
