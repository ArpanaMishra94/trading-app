import React, { useState, useEffect } from "react";
import './MainCard.css'
import Modal from "../Modal";
import { getCoinPrice } from '../../APIs'

const MainCard = () => {

    const [coin, setCoin] = useState({
        name: 'Ethereum',
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        symbol: "eth",
        id: "ethereum"
    });

    const [currentPrice, setCurrentPrice] = useState();

    const fetchPrice = async (id) => {
        try {
            const { data } = await getCoinPrice(id);
            const inrPrice = data[`${id}`]['inr'];
            setCurrentPrice(inrPrice);
            // console.log(currentPrice);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            fetchPrice(coin.id);
        }, 5000)


        return () => {
            clearInterval(timer);
        }
    }, [coin.id])

    return (
        <main className='mainCard-container'>
            <div className='form-container'>
                <div className="notch-container">
                    <div className="list">
                        {/* <div styles="--position: 0;" data-indicator className="indicator">
                            <div className="corners"></div>
                        </div> */}
                        {/* <div className="active">
                            <div className="corners"></div>
                        </div> */}
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
                        <Modal coin={coin} setCoin={setCoin} />
                    </div>
                    <div className='row-2'>
                        <span>Amount you want to invest</span>
                        <div className='inputWithNumber'>
                            <input type='number' placeholder='0.00'></input>
                            <span>INR</span>
                        </div>
                    </div>

                    <div className='row-3'>
                        <span>Estimate Number of ETH You will Get</span>
                        <input type='number' placeholder='0.00'></input>
                    </div>

                    <button>Buy</button>
                </div>
            </div>
        </main>
    )
}

export default MainCard
