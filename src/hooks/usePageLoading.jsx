import { useState, createContext, useContext} from "react"

const PageLoadingContext = createContext({
    isLoadingActive: false,
    setIsLoadingActive: null,
})

export function PageLoadingProvider({children}) {
    const [isLoadingActive, setIsLoadingActive] = useState(false)
    const value = {isLoadingActive, setIsLoadingActive}

    return (
        <PageLoadingContext.Provider value={value}>{children}</PageLoadingContext.Provider>
    )

}

export default function usePageLoading() {
    const context = useContext(PageLoadingContext)
    if (!context) throw new Error("usePageLoading must be used within PageLoadingProvider")

    return context;
}