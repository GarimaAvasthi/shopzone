import {createContext,useContext,useState,useEffect} from "react";

const CartContext=createContext();
export const useCart=()=>useContext(CartContext);

export const CartProvider=({children})=>{

const [cart,setCart]=useState(()=>{
const saved=localStorage.getItem("cart");
return saved?JSON.parse(saved):[];
});
const clearCart=()=>setCart([]);


useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart));
},[cart]);

const addToCart=(product)=>{

setCart(prev=>{

const exist=prev.find(i=>i.id===product.id);

if(exist){

return prev.map(i=>
i.id===product.id
? {...i,qty:(i.qty||1)+1}
: i
);

}

return [...prev,{...product,qty:1}];

});
};

const removeFromCart=id=>{
setCart(prev=>prev.filter(i=>i.id!==id));
};

const updateQty=(id,qty)=>{
if(qty<1) return;
setCart(prev=>prev.map(i=>i.id===id?{...i,qty}:i));
};

const total=cart.reduce(
(s,i)=>s+i.price*(i.qty||1),
0
);

return(
<CartContext.Provider value={{cart,addToCart,removeFromCart,updateQty,total, clearCart}}>
{children}
</CartContext.Provider>
);
};
