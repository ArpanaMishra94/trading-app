import React, { useState, createContext } from 'react';

const INITIAL_STATE = {
    name: 'Ethereum',
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    symbol: "eth",
    id: "ethereum"
}

export const CoinContext = createContext(INITIAL_STATE);

const CoinProvider = ({ children }) => {
    const [coin, setCoin] = useState(INITIAL_STATE);
    console.log(children);

    return (
        <CoinContext.Provider value={{ coin, setCoin }}>
            {children}
        </CoinContext.Provider>
    )
}

export default CoinProvider;