import {BrowserRouter,Routes,Route,Navigate,useLocation} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/Contact";   // ⭐ ADDED

import {ToastProvider} from "./context/ToastContext";
import {CartProvider} from "./context/Cartcontext";
import {AuthProvider,useAuth} from "./context/Authcontext";

function Protected({children}){
const {user}=useAuth();
const location = useLocation();
return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default function App(){

return(

<ToastProvider>
<AuthProvider>
<CartProvider>

<BrowserRouter>

<div style={{
display:"flex",
flexDirection:"column",
minHeight:"100vh"
}}>

<Navbar/>

<main style={{flex:1}}>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/shop" element={<Shop/>}/>
<Route path="/product/:id" element={<ProductDetail/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/contact" element={<Contact/>}/>   {/* ⭐ ADDED */}

<Route path="/checkout" element={
<Protected>
<Checkout/>
</Protected>
}/>

</Routes>

</main>

<Footer/>

</div>

</BrowserRouter>

</CartProvider>
</AuthProvider>
</ToastProvider>

);
}