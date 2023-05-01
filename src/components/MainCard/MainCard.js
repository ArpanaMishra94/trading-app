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

    // Fetches the current price of a cryptocurrency with the given ID from the API.
    const fetchPrice = async (id) => {
        try {
            // Call the getCoinPrice API function to get the current price of the cryptocurrency
            const { data } = await getCoinPrice(id);

            // Extract the INR price of the cryptocurrency from the response data
            const inrPrice = data[`${id}`]['inr'];

            // Update the state with the current price and mark the loading as completed
            setCurrentPrice(inrPrice);
            setLoading(false);
        }
        catch (error) {
            // Log any errors that occurred while fetching the price and mark the loading as completed
            console.log(error);
            setLoading(false);
        }
    }

    // Calculates the estimated number of coins based on the current price and amount which we entered.
    const calcEstimateCoins = () => {

        // Get the current price from the state
        const currPrice = currentPrice;

        // Initialize the number of coins to zero
        let numberOfCoins = 0;

        // If the current price is zero, set the number of coins to zero as well
        if (currPrice === 0) {
            numberOfCoins = 0;
        }
        else {
            // Calculate the estimated number of coins based on the amount and current price
            numberOfCoins = (amount / currentPrice).toFixed(2);
        }

        // Set the estimated number of coins in the state
        setEstimateCoins(numberOfCoins);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    // A hook that fetches the price of a cryptocurrency with the given ID every 5 seconds.
    useEffect(() => {

        // Set up a timer to fetch the price every 5 seconds
        const timer = setInterval(() => {
            fetchPrice(coin.id);
        }, 5000)

        // Clean up the timer when the component unmounts or when the ID of the cryptocurrency changes
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
