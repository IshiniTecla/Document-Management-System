import React, { useState, useEffect } from 'react';
import './LADashboard.css';
import Navbar1 from '../../components/Navbar1';
import Footer from '../../components/Footer';
import axios from 'axios';
import io from 'socket.io-client';
import { NavLink, Link, useParams } from 'react-router-dom';

const socket = io("http://localhost:5000", {
    transports: ["websocket"],  // Ensure websocket is used

});


export const LADashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [leaveagent, setLeaveagent] = useState(null);
    const [error, setError] = useState('');
    const { email } = useParams();


    useEffect(() => {
        if (email) {  // Check if email exists before making the request
            axios
                .get(`http://localhost:5000/leaveagents/email/${email}`)
                .then((res) => {
                    setLeaveagent(res.data.data); // Set leave agent data
                    console.log(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError("Error fetching leave agent data.");
                });
        }
    }, [email]); // Fetch leave agent details based on email
    useEffect(() => {
        socket.on("newMeeting", (notification) => {
            setNotifications((prev) => [...prev, notification]);
        });

        return () => {
            socket.off("newMeeting");
        };
    }, []);

    useEffect(() => {
        socket.on("new_notification", (notification) => {
            console.log("🔔 Received Notification:", notification);  // Debugging log
            setNotifications((prev) => [...prev, notification]);
        });

        return () => {
            socket.off("new_notification");
        };
    }, []);



    useEffect(() => {
        const handleNewDocument = (notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        };

        socket.on('new_document', handleNewDocument);

        return () => {
            socket.off('new_document', handleNewDocument); // Cleanup socket event
        };
    }, []);

    if (!leaveagent) {
        return <div>{error || "Loading leave agent information..."}</div>;
    }


    return (
        <>
            <Navbar1 />
            <div className="dashboard-container">
                <div className="side-nav">
                    <h2>Menu</h2>
                    <ul>

                        <li>
                            <Link to="#" className="inactive-link">
                                Notifications
                            </Link>
                        </li>


                        <li>
                            <NavLink
                                to={`/file-upload/${leaveagent?.email}`}
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Upload Documents
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to={`/invoice/${leaveagent?.email}`}
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Invoices
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to={`/inventory/${leaveagent?.email}`}
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Inventory
                            </NavLink>
                        </li>

                    </ul>
                </div>

                <div className="main-content">
                    <h2>Welcome, {leaveagent.name}!</h2>
                    <div className="notification-bar">
                        <h2>Notifications</h2>
                        <ul>
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <li key={index}>{notification.message}</li>
                                ))
                            ) : (
                                <li>No new notifications.</li>
                            )}
                        </ul>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    );
};






