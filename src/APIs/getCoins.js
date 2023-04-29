import axios from "axios";
import URL from '../constants';

const getCoins = async () => {
    const response = await axios.get(
        `${URL}/coins/markets?vs_currency=usd`
    )
    return response;
}

export default getCoins;