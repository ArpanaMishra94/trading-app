import axios from "axios";
import URL from '../constants';

const getCoinPrice = async (id) => {
    const response = await axios.get(
        `${URL}/simple/price?vs_currencies=inr&ids=${id}`
    )
    return response;
}

export default getCoinPrice;