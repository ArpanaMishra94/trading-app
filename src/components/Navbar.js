import React, { useState } from "react";
import logo from '../assets/logo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import './Navbar.css'

const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);

    return (
        <nav className='main-nav'>
            <div className='logo'>
                <img src={logo} alt='' />
                {/* <h2> NeoFi</h2> */}
            </div>

            <div className={
                showMediaIcons ? "menu mobile-menu" : "menu"
            }>
                <ul>
                    <li>Trade</li>
                    <li>Earn</li>
                    <li>Support</li>
                    <li>About</li>
                </ul>
            </div>

            <div className='wallet-btn'>
                <button>Connect Wallet</button>
                <div className="hamburger-menu" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                    <GiHamburgerMenu size={20} style={{ color: "#fff" }} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
