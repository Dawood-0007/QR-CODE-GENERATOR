import React from 'react'
import '../assets/Navbar.css';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <h1 className='navbar-title'>QR Code Generator</h1>
        <ul className='navbar-links'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar