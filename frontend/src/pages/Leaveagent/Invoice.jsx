import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar1 from "../../components/Navbar1";
import Footer from "../../components/Footer";
import "./Invoice.css";

export const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        file: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [editingInvoiceId, setEditingInvoiceId] = useState(null);

    const categories = [
        "Water Bill Payments",
        "Fuel Payments",
        "Impress Payments",
    ];

    useEffect(() => {
        fetchInvoices();
    }, [selectedCategory]);

    const fetchInvoices = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/invoices", {
                params: { category: selectedCategory },
            });
            setInvoices(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure file is present before submitting
        if (!formData.file) {
            alert("Please upload a file.");
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("file", formData.file);  // Attach the file here

        try {
            if (editMode) {
                await axios.put(`http://localhost:5000/api/invoices/${editingInvoiceId}`, data);
                setEditMode(false);
                setEditingInvoiceId(null);
            } else {
                await axios.post("http://localhost:5000/api/invoices/add", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            // Reset form after submission
            setFormData({ title: "", category: "", file: null });
            fetchInvoices();
        } catch (error) {
            console.error("Error uploading invoice:", error);
            alert("Error uploading invoice. Please try again.");
        }
    };


    const handleEdit = (invoice) => {
        setFormData({
            title: invoice.title,
            category: invoice.category,
            file: null,
        });
        setEditMode(true);
        setEditingInvoiceId(invoice._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/invoices/${id}`);
            fetchInvoices();
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="invoice-page-container">
                <h2>Invoice Management</h2>

                {/* Upload Form */}
                <form className="invoice-form" onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <label>File:</label>
                    <input type="file" onChange={handleFileChange} required />

                    <button type="submit">{editMode ? "Update Invoice" : "Upload Invoice"}</button>
                </form>

                {/* Filter by Category */}
                <label htmlFor="category-select">Filter by Category:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Invoice Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice.title}</td>
                                <td>{invoice.category}</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(invoice)}><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(invoice._id)}><i className="fas fa-trash-alt"></i></button>
                                    <a
                                        href={`http://localhost:5000/api/invoices/file/${invoice._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-link"
                                    >
                                        <i className="fas fa-eye"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

