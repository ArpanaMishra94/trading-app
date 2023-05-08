import React, { useEffect, useState, useContext } from 'react'
import './Search.css'
import { BsSearch } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import { getCoins } from '../../APIs'
import Loader from '../Loader/Loader';
import { CoinContext } from '../../context';

const Search = ({ toggleModal }) => {
    const [coins, setCoins] = useState([]);
    const [records, setRecords] = useState(coins);
    const [loading, setLoading] = useState(true);
    const { coin, setCoin } = useContext(CoinContext);


    // Fetches the list of coins from an external API and updates the states.
    const fetchCoins = async () => {
        try {
            const { data } = await getCoins();
            setCoins(data);
            setRecords(data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Filters the list of coins based on a given search string and updates the `records` state.
    const Filter = (event) => {
        setRecords(coins.filter(f => f.name.toLowerCase().includes(event.target.value)));
    }

    useEffect(() => {
        fetchCoins();
    }, [])

    const renderCoins = ({ name, symbol, image, id }) => (
        // eslint-disable-next-line no-sequences
        <li key={symbol} onClick={() => (setCoin({ name, symbol, image, id }), toggleModal())
        }>
            <div className='search-element'>
                <img src={image} alt='' />
                <div className='name-check'>
                    <span>{name}</span>
                    {
                        name === coin.name ? <div>
                            <GoCheck size={20} id='checkIcon' />
                        </div> : ''
                    }
                </div>
            </div>
        </li >
    )

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className='search-container'>
                        <div className='input-wrapper'>
                            <BsSearch size={20} style={{ color: "#D2D2D2" }} />
                            <input placeholder='Search Chains' onChange={Filter} />
                        </div>
                        <div className='dataResult'>
                            <ul>
                                {
                                    records.map(renderCoins)
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Search
