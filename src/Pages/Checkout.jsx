import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";

export default function Checkout(){

const { cart, clearCart, total } = useCart();
const navigate = useNavigate();
const [orderPlaced, setOrderPlaced] = useState(false);

useEffect(() => {
  // If cart is empty, redirect to shop
  if (cart.length === 0 && !orderPlaced) {
    navigate("/shop");
    return;
  }
}, [cart.length, navigate, orderPlaced]);

const handlePlaceOrder = () => {
  // Place order - clear cart and show success
  clearCart();
  setOrderPlaced(true);
  
  // Redirect to home after 3 seconds
  setTimeout(() => {
    navigate("/");
  }, 3000);
};

if (orderPlaced) {
  return (
    <div className="checkout-page">
      <div className="checkout-success">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Checkout Successful!</h1>
        <p className="success-message">Your order has been placed successfully.</p>
        <p className="success-redirect">
          Redirecting to home page...
        </p>
      </div>
    </div>
  );
}

return(
  <div className="checkout-page">
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          
          <div className="checkout-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <img 
                  src={item.thumbnail || item.image} 
                  alt={item.title}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.qty || 1}</p>
                  <p className="checkout-item-price">
                    ${(item.price * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="checkout-total-section">
            <div className="checkout-total-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="checkout-total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="checkout-total-row checkout-total-final">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form className="checkout-form" onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder();
          }}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required placeholder="John Doe" />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" required placeholder="john@example.com" />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input type="text" required placeholder="123 Main Street" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" required placeholder="New York" />
              </div>
              
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" required placeholder="10001" />
              </div>
            </div>
            
            <button type="submit" className="btn-place-order">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
