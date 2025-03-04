import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State to hold search query
    const [isSearchActive, setIsSearchActive] = useState(false); // Track if search is active

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Perform your search logic here (e.g., navigate to a search results page or filter content)
        console.log('Searching for:', searchQuery);
    };

    // Handle focus and blur for styling
    const handleFocus = () => setIsSearchActive(true);
    const handleBlur = () => setIsSearchActive(false);

    return (

        <nav className='nav1 pt-4 pb-4  '>
            <div className="logo-container">
                <Link to="/">
                    <img src="/src/assets/logo.png" alt="Logo" className="logo" />
                </Link>

            </div>

            <ul className='list flex flex-row gap-10 text-lg text-black ml-64 font-bold font-serif'>

                <Link to="/"><li>Home</li></Link>
                <Link to="/inventory"><li>Inventory</li></Link>
                <Link to="/sales-dashboard"><li>Sales Dashboard</li></Link>
                <Link to="/contactus"><li>Contact Us</li></Link>


            </ul>

            <div className="auth-container flex flex-col items-end gap-2">
                <div className="flex items-center gap-4">
                    <FaUser className="text-2xl text-black" />
                    <Link to="/logins" className="login-button">Login</Link>
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                </div>
                <div className="search-bar-container">
                    <input
                        type="text"
                        className={`search-input ${isSearchActive ? 'active' : ''}`} // Apply active class if focused
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button className="search-button" onClick={handleSearchSubmit}>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
