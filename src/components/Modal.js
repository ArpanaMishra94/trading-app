import React, { useState } from "react";
import { IoCaretDown, IoClose } from "react-icons/io5";
import Search from "./Search";
import './Modal.css'
import './MainCard.css'

const Modal = () => {
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState({});

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className='select'>
            <div className='token'>
                <img src={coin.image} alt='' />
                <span>{coin.name}</span>
            </div>
            <IoCaretDown size={18} style={{ color: "#6E56F8" }} onClick={toggleModal} />
            {
                modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <div className="modal-close">
                                <div className="close-button">
                                    <IoClose size={18} style={{ color: "#DCDCEC" }} onClick={toggleModal} />
                                </div>
                            </div>
                            <div className="search-bar">
                                <Search coin={coin} setCoin={setCoin} toggleModal={toggleModal} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Modal
