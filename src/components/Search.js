import React, { useEffect, useState } from 'react'
import './Search.css'
import { BsSearch } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import { getCoins } from '../APIs'

const Search = ({ coin, setCoin, toggleModal }) => {
    const [coins, setCoins] = useState([]);

    const fetchCoins = async () => {
        try {
            const { data } = await getCoins();
            setCoins(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCoins();
    }, [])

    const renderCoins = ({ name, symbol, image }) => (
        // eslint-disable-next-line no-sequences
        <li key={symbol} onClick={() => (setCoin({ name, symbol, image }), toggleModal())
        }>
            <div className='search-element'>
                <img src={image} alt='' />
                <div className='name-check'>
                    <span>{name}</span>
                    <div>
                        <GoCheck size={20} id='checkIcon' />
                    </div>

                </div>
            </div>
        </li >
    )

    return (
        <div className='search-container'>
            <div className='input-wrapper'>
                <BsSearch size={20} style={{ color: "#D2D2D2" }} />
                <input placeholder='Search Chains' />
            </div>
            <div className='dataResult'>
                <ul>
                    {
                        coins.map(renderCoins)
                    }
                </ul>
            </div>
        </div>

    )
}

export default Search
