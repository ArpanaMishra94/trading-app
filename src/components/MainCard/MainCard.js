import React, { useState, useEffect } from "react";
import './MainCard.css'
import Modal from "../Modal";
import { getCoinPrice } from '../../APIs';
import Loader from "../Loader/Loader";

const MainCard = () => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [amount, setAmount] = useState(0.00);
    const [estimateCoins, setEstimateCoins] = useState(0.00);
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState({
        name: 'Ethereum',
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        symbol: "eth",
        id: "ethereum"
    });


    const fetchPrice = async (id) => {
        try {
            const { data } = await getCoinPrice(id);
            const inrPrice = data[`${id}`]['inr'];
            setCurrentPrice(inrPrice);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const calcEstimateCoins = () => {
        const currPrice = currentPrice;
        let numberOfCoins = 0;
        if (currPrice === 0) {
            numberOfCoins = 0;
        }
        else {
            numberOfCoins = (amount / currentPrice).toFixed(2);
        }
        setEstimateCoins(numberOfCoins);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            fetchPrice(coin.id);
        }, 5000)


        return () => {
            clearInterval(timer);
        }
    }, [coin.id])

    useEffect(() => {
        calcEstimateCoins();
    }, [amount])

    return (
        <main className='mainCard-container'>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className='form-container'>
                        <div className="notch-container">
                            <div className="notch">
                                <div className="icon">
                                    <img src={coin.image} alt={coin.symbol} />
                                </div>
                            </div>
                        </div>
                        <div className='form'>
                            <div className='row-1'>
                                <div className='value'>
                                    <p>Current value</p>
                                    <h3>₹ {currentPrice}</h3>
                                </div>
                                <Modal coin={coin} setCoin={setCoin} setAmount={setAmount} setEstimateCoins={setEstimateCoins} setCurrentPrice={setCurrentPrice} setLoading={setLoading} />
                            </div>
                            <div className='row-2'>
                                <span>Amount you want to invest</span>
                                <div className='inputWithNumber'>
                                    <input type='number' placeholder='0.00' name="amt" value={amount} onChange={handleChange} disabled={currentPrice === 0}></input>
                                    <span>INR</span>
                                </div>
                            </div>

                            <div className='row-3'>
                                <span>Estimate Number of {coin.name} You will Get</span>
                                <input type='number' value={estimateCoins} disabled></input>
                            </div>
                            <button>Buy</button>
                        </div>
                    </div>
                )
            }
        </main>
    )
}

export default MainCard
