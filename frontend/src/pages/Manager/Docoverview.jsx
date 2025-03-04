import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from '../../components/Navbar1';
import Footer from '../../components/Footer';
import './Docoverview.css';

export const Docoverview = () => {
    const [pendingDocuments, setPendingDocuments] = useState([]);

    useEffect(() => {
        const fetchPendingDocuments = async () => {
            try {
                // Use the correct endpoint for pending uploads
                const response = await axios.get('http://localhost:5000/api/uploads/pending');
                const documents = Array.isArray(response.data) ? response.data : [];
                setPendingDocuments(documents);
            } catch (error) {
                console.error('Error fetching pending documents:', error);
            }
        };

        fetchPendingDocuments();
    }, []);

    const handleDownload = async (documentId, fileName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/uploads/${documentId}/download`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    };

    const handleSign = async (documentId) => {
        try {
            await axios.post(`http://localhost:5000/api/uploads/${documentId}/sign`);
            setPendingDocuments((prevDocs) =>
                prevDocs.filter((doc) => doc._id !== documentId)
            );
        } catch (error) {
            console.error('Error signing document:', error);
        }
    };

    const handleReject = async (documentId) => {
        try {
            await axios.post(`http://localhost:5000/api/uploads/${documentId}/reject`);
            setPendingDocuments((prevDocs) =>
                prevDocs.filter((doc) => doc._id !== documentId)
            );
        } catch (error) {
            console.error('Error rejecting document:', error);
        }
    };
    return (
        <>
            <Navbar1 />
            <div className="pending-documents">
                <h2>Pending Documents</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Uploaded At</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingDocuments.length > 0 ? (
                            pendingDocuments.map((doc) => (
                                <tr key={doc._id}>
                                    <td>{doc.name}</td>
                                    <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                                    <td>{new Date(doc.deadline).toLocaleDateString()}</td>
                                    <td>{doc.status}</td>
                                    <td>
                                        <button className="download-button" onClick={() => handleDownload(doc._id, doc.file.fileName)}>Download</button>
                                        <button className="reject-button" onClick={() => handleReject(doc._id)}>Reject</button>
                                        <button className="sign-button" onClick={() => handleSign(doc._id)}>Signed</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No pending documents.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );

};
