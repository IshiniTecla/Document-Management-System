import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar1 from "../../components/Navbar1";
import Footer from "../../components/Footer";
import "./UploadFiles.css";

export const FileUpload = () => {
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [file, setFile] = useState(null);
    const [uploads, setUploads] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/uploads");
                setUploads(response.data);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Failed to load uploads.");
            }
        };

        fetchUploads();
    }, []);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!file && !editingId) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("deadline", deadline);
        if (file) formData.append("file", file);

        try {
            if (editingId) {
                // Update existing upload
                await axios.put(`http://localhost:5000/api/uploads/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setUploads((prevUploads) =>
                    prevUploads.map((upload) =>
                        upload._id === editingId ? { ...upload, name, deadline } : upload
                    )
                );
                setSuccess("File updated successfully!");
            } else {
                // Create new upload
                const response = await axios.post("http://localhost:5000/api/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setUploads([...uploads, response.data.upload]);
                setSuccess("File uploaded successfully!");
            }

            setName("");
            setDeadline("");
            setFile(null);
            setEditingId(null);
        } catch (err) {
            console.error("Upload Error:", err);
            setError(err.response?.data?.message || "Error uploading file.");
        }
    };

    const handleEdit = (upload) => {
        setName(upload.name);
        setDeadline(upload.deadline);
        setEditingId(upload._id);
        setSuccess("");
        setError("");
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/uploads/${id}`);
            setUploads((prevUploads) => prevUploads.filter((upload) => upload._id !== id));
            setSuccess("File deleted successfully!");
        } catch (err) {
            console.error("Delete Error:", err);
            setError("Error deleting file.");
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="file-upload-container">
                <h2>{editingId ? "Edit File" : "File Upload"}</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}

                <form onSubmit={handleSubmit} className="file-upload-form">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Deadline:</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    <label>File:</label>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">{editingId ? "Update" : "Upload"}</button>
                </form>

                <h4>Uploaded Files</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploads.map((upload) => (
                            <tr key={upload._id}>
                                <td>{upload.name}</td>
                                <td>{new Date(upload.deadline).toLocaleDateString()}</td>
                                <td>{upload.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(upload)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDelete(upload._id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
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

