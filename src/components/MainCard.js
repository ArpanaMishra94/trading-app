import React from 'react'
import './card.css'
import { IoCaretDown } from "react-icons/io5";
import icon from '../assets/image 61.png';

const MainCard = () => {

    return (
        <main className='mainCard-container'>
            <div className='form-container'>
                <div className='form'>
                    <div className='row-1'>
                        <div className='value'>
                            <p>Current value</p>
                            <h3>₹ 24882</h3>
                        </div>
                        <div className='select'>
                            <div className='token'>
                                <img src={icon} alt='' />
                                <span>Ethereum</span>
                            </div>
                            <IoCaretDown size={18} style={{ color: "#6E56F8" }} />
                        </div>
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
