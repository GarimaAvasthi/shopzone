import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

const [msg,setMsg] = useState("");

const showToast = (text)=>{
setMsg(text);
setTimeout(()=>setMsg(""),2000);
};

return(

<ToastContext.Provider value={{showToast}}>

{children}

{msg && (

<div className={`toast-notification ${msg.includes('🔒') || msg.includes('login') ? 'toast-warning' : 'toast-success'}`}>

{msg}

</div>

)}

</ToastContext.Provider>

);

};
