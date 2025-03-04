import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUser, FaSearch } from "react-icons/fa";
import "./Navbar1.css";

const Navbar1 = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [manager, setManager] = useState(null); // Store user details

    // Fetch logged-in manager details
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("manager")); // Assuming manager details are stored
        if (storedUser) {
            setManager(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("manager"); // Clear manager details
        navigate("/");
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <nav className="nav1 pt-4 pb-4">
            <div className="logo-container">
                <Link to="/">
                    <img src="/src/assets/logo.png" alt="Logo" className="logo" />
                </Link>
            </div>

            <ul className="list flex flex-row gap-10 text-lg text-black ml-64 font-bold font-serif">
                <Link to="/"><li>Home</li></Link>
                <Link to="/inventory"><li>Inventory</li></Link>
                <Link to="/sales-dashboard"><li>Sales Dashboard</li></Link>
                <Link to="/contactus"><li>Contact Us</li></Link>
            </ul>

            <div className="auth-container flex flex-col items-end gap-2">
                <div className="flex items-center gap-4">
                    <FaUser className="text-2xl text-black" />
                    {manager ? (
                        <Link to={`/profile/${encodeURIComponent(manager.email)}`} className="account-button">
                        </Link>
                    ) : (
                        <Link to="/profile/:email" className="account-button">Profile</Link>
                    )}
                    <button className="text-2xl text-black" onClick={handleLogout}>
                        <i className="fa fa-sign-out-alt"></i>
                    </button>
                </div>
                <div className="search-bar-container">
                    <input
                        type="text"
                        className={`search-input ${isSearchActive ? "active" : ""}`}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchActive(true)}
                        onBlur={() => setIsSearchActive(false)}
                    />
                    <button className="search-button" onClick={handleSearchSubmit}>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar1;
