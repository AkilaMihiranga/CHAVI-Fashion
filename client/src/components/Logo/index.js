import React from 'react';
import './style.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';

const Logo = props => {
    return (
        <Link to="/">
            <div className="Logo">
                <img src={logo} alt="Logo" />
            </div>
        </Link>

    );
}

export default Logo;