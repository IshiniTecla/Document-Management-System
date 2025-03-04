import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import "./Inventory.css";

export const Inventory = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        quantity: 0,
        category: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editCode, setEditCode] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const showMessage = (text, duration = 3000) => {
        setMessage(text);
        setTimeout(() => setMessage(""), duration);
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/items");
            setItems(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "quantity" && value < 0) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = async (e) => {
        const selectedCategory = e.target.value;
        setFormData({ ...formData, category: selectedCategory });

        if (selectedCategory) {
            try {
                const response = await axios.get(`/api/items/next-code/${selectedCategory}`);
                setFormData((prevData) => ({ ...prevData, code: response.data.code }));
            } catch (error) {
                console.error("Error fetching next available code:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editMode) {
            await updateItem();
        } else {
            await addItem();
        }

        setFormData({ code: "", name: "", quantity: 0, category: "" });
        setEditMode(false);
    };

    const addItem = async () => {
        try {
            await axios.post("http://localhost:5000/api/items", formData);
            fetchItems();
            showMessage("Item added successfully!");
        } catch (error) {
            console.error("Error adding item:", error.response?.data || error);
            showMessage(error.response?.data?.error || "Error adding item.");
        }
    };

    const updateItem = async () => {
        try {
            await axios.put(`http://localhost:5000/api/items/${editCode}`, formData);
            fetchItems();
            showMessage("Item updated successfully!");
        } catch (error) {
            console.error("Error updating item:", error);
            showMessage("Error updating item.");
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditCode(item.code);
        setEditMode(true);
    };

    const handleDelete = async (code) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/items/${code}`);
            fetchItems();
            showMessage("Item deleted successfully!");
        } catch (error) {
            console.error("Error deleting item:", error);
            showMessage("Error deleting item.");
        }
    };



    return (
        <>
            <Navbar1 />
            <div className="inventory-container">
                <h1>Inventory Management</h1>

                {/* Message Display */}
                {message && <div className="message">{message}</div>}

                {/* Form to add or edit item */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Item Code"
                        required
                        disabled={editMode} // Disable code input if in edit mode
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Postage Items">Postage Items</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Safety Items">Safety Items</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Kitchen Items">Kitchen Items</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Office Items">Office Items</option>

                    </select>
                    <button type="submit">{editMode ? "Update Item" : "Add Item"}</button>
                </form>

                {/* Displaying the items in a table */}
                <table border="1">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(items) && items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.code}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(item.code)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

