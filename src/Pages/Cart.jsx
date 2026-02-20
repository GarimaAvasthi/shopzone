import {useCart} from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function Cart(){

const {cart,removeFromCart,updateQty,total}=useCart();
const navigate = useNavigate();
const {user} = useAuth();

if(cart.length === 0){
  return (
    <div className="cart-page">
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Add some items to your cart to get started!</p>
        <button 
          onClick={() => navigate("/shop")}
          className="btn-shop-now"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

return(
  <div className="cart-page">
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      
      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map(item=>(
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.thumbnail || item.image} 
                  alt={item.title}
                />
              </div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
                
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                      onChange={e=>updateQty(item.id,Number(e.target.value))}
                      className="quantity-input"
                    />
                  </div>
                  
                  <button 
                    onClick={()=>removeFromCart(item.id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="cart-item-subtotal">
                  Subtotal: <strong>${(item.price * (item.qty || 1)).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-items">
            {cart.map(item=>(
              <div key={item.id} className="summary-item">
                <img 
                  src={item.thumbnail || item.image} 
                  alt={item.title}
                  className="summary-item-image"
                />
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.title}</span>
                  <span className="summary-item-qty">Qty: {item.qty || 1}</span>
                </div>
                <span className="summary-item-price">
                  ${(item.price * (item.qty || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="summary-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row total-final">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={()=>{
              if(user){
                navigate("/checkout");
              }else{
                navigate("/login");
              }
            }}
            className="btn-checkout"
          >
            Proceed to Checkout
          </button>
          
          <button
            onClick={() => navigate("/shop")}
            className="btn-continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
