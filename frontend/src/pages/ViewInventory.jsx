import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Inventory.css";

export const ViewInventory = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filters, setFilters] = useState({ code: "", category: "" });

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, items]);

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/items");
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        let filtered = items;

        if (filters.code.trim()) {
            filtered = filtered.filter(item =>
                item.code.toLowerCase().includes(filters.code.toLowerCase())
            );
        }

        if (filters.category.trim()) {
            filtered = filtered.filter(item =>
                item.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        setFilteredItems(filtered);
    };

    return (
        <>
            <Navbar />
            <div className="inventory-container">
                <h1>Item Status</h1>
                <div className="filter-container">
                    <input
                        type="text"
                        name="code"
                        value={filters.code}
                        onChange={handleFilterChange}
                        placeholder="Filter by Item Code"
                    />
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                    >
                        <option value="">Filter by Category</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Safety Items">Safety Items</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Kitchen Items">Kitchen Items</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Office Items">Office Items</option>
                    </select>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <tr key={item.code}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};
