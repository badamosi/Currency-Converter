import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    
    const [from, setFrom] = useState({name:""})
    const [to, setTo] = useState({name:""})
    const [input, setInput] = useState({})
    const [result, setResult] = useState(0)
    const balance = 699995
    const wallets = [
        { code: "NGN", name: "NGN Wallet" },
        { code: "USD", name: "USD Wallet" },
    ];
      

    return (
        <AppContext.Provider value={{from, setFrom, to, setTo, wallets,result, setResult, input, setInput, balance}}>
            {children}
        </AppContext.Provider>
    )
}

