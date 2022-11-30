import {useState, createContext, useContext} from 'react'


const ToastContext = createContext({
    showToast: null,
    hideToast: null,
    toast: {text: '', variant: 'info'},
    isToastActive: false,
})


export function ToastProvider({children}) {
    const [toast, setToast] = useState({text:'', variant: 'info'})
    const [isToastActive, setIsToastActive] = useState(false);

    const showToast = (text, variant) => {
        setToast({text, variant})
        setIsToastActive(true);
    }

    const hideToast = () => {
        setToast({text: '', variant: 'info'});
        setIsToastActive(false);
    }

    const  value = {showToast, hideToast, toast, isToastActive}

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    )
}


export default function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error("useToast must be used within ToastContextProvider")

    return context;
}