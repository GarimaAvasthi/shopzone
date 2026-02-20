import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import { useAuth } from "../context/Authcontext";

export default function Navbar(){

const {cart}=useCart();
const {user, logout}=useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/");
};

return (

<div className="navbar">
  {/* LEFT LOGO */}
  <Link to="/" className="navbar-logo">
    ShopZone
  </Link>

  {/* RIGHT MENU */}
  <div className="navbar-menu">
    <Link to="/" className="navbar-link">Home</Link>
    <Link to="/shop" className="navbar-link">Shop</Link>
    <Link to="/cart" className="navbar-link">
      🛒 Cart ({cart.length})
    </Link>
    
    {user ? (
      <button onClick={handleLogout} className="navbar-btn navbar-btn-logout">
        Logout
      </button>
    ) : (
      <Link to="/login" className="navbar-btn navbar-btn-login">
        Login
      </Link>
    )}
  </div>
</div>

);
}
