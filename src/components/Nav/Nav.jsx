import React from "react";
import './Nav.css';
import logo from './../../assets/logo.png';

const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <img src={logo} alt="logo" className="flash-logo"/>
                <p className="flash-logo-text">FlashType</p>
            </div>
            <div className="nav-right">
                <a 
                    href="http://theleanprogrammer.com/aam"
                    target="_blank"
                    className="nav-aam-link"
                    rel = "noreferrer"
                >
                    AAM
                </a>
            </div>
        </div>
    );
}


export default Nav;