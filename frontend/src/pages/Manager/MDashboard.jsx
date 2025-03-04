import React, { useState, useEffect } from 'react';
import Navbar1 from '../../components/Navbar1';
import Footer from '../../components/Footer';
import './MDashboard.css';
import { io } from 'socket.io-client';
import axios from 'axios';
import { NavLink, Link, useParams } from 'react-router-dom';

const socket = io("http://localhost:5000", {
    transports: ["websocket"],  // Ensure websocket is used
});

export const MDashboard = () => {
    const [editMeeting, setEditMeeting] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [attendees, setAttendees] = useState('');
    const [meetings, setMeetings] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [manager, setManager] = useState(null);
    const { email } = useParams();

    // WebSocket connection
    useEffect(() => {
        socket.on("newMeeting", (notification) => {
            setNotifications((prev) => [...prev, notification]);
        });

        return () => {
            socket.off("newMeeting");
        };
    }, []);

    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:5000/managers/email/${email}`)
                .then((res) => setManager(res.data.data))
                .catch((err) => console.log(err));
        }
    }, [email]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/meetings");
                console.log("Fetched Meetings:", response.data);
                setMeetings(response.data.data || []);
            } catch (error) {
                console.error("Error fetching meetings:", error);
                setMeetings([]);
            }
        };

        fetchMeetings();
    }, []);

    // Handle meeting scheduling
    const handleScheduleMeeting = async (e) => {
        e.preventDefault();

        if (!title || !date || !time || !attendees) {
            alert("All fields are required");
            return;
        }

        const attendeesArray = attendees.split(",").map(a => a.trim()); // Convert to array

        const meetingData = { title, date, time, attendees: attendeesArray };
        console.log("Sending Data:", meetingData);

        try {
            const response = await axios.post("http://localhost:5000/api/meetings", meetingData, {
                headers: { "Content-Type": "application/json" },
            });

            // Check if the response has the expected structure
            if (response.data && response.data.message) {
                alert(response.data.message);
            } else {
                console.error("Unexpected API Response:", response);

            }

            // Add the new meeting to the meetings state
            if (response.data && response.data.data) {
                setMeetings(prevMeetings => [...prevMeetings, response.data.data]);
            }

            // Clear form fields
            setTitle('');
            setDate('');
            setTime('');
            setAttendees('');
        } catch (error) {
            console.error("Error scheduling meeting:", error.response?.data || error);
            alert(error.response?.data?.message || "Error scheduling meeting");
        }
    };

    // Handle meeting deletion
    const handleDeleteMeeting = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/meetings/${id}`);
            setMeetings(meetings.filter((meeting) => meeting._id !== id));

        } catch (err) {
            console.error('Error deleting meeting:', err);

        }
    };

    // Handle meeting edit
    const handleEditMeeting = (id) => {
        const meetingToEdit = meetings.find((meeting) => meeting._id === id);
        setEditMeeting(meetingToEdit);
        setTitle(meetingToEdit.title);
        setDate(meetingToEdit.date);
        setTime(meetingToEdit.time);
        setAttendees(meetingToEdit.attendees.join(", ")); // Convert to string
    };

    return (
        <>
            <Navbar1 />
            <div className="dashboard-container">
                <div className="side-nav">
                    <h2>Menu</h2>
                    <ul>
                        <li><Link to="#" className="inactive-link">Notifications</Link></li>
                        <li><Link to="#" className="inactive-link">Schedule Meetings</Link></li>
                        <li>{manager?.email && (
                            <NavLink to={`/document-overview/${manager.email}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                Document Overview
                            </NavLink>
                        )}</li>

                        <li>
                            {manager?.email && (
                                <NavLink to={`/inventory/${manager.email}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                    Inventory
                                </NavLink>
                            )}
                        </li>
                        <li>
                            <NavLink
                                to={`/file-upload/${manager?.email}`}
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Upload Documents
                            </NavLink>
                        </li>

                    </ul>
                </div>

                <div className="main-content">
                    <h2>Welcome, {manager?.name}!</h2>

                    {/* Notifications Section */}
                    <div className="notification-bar">
                        <h2>Notifications</h2>
                        <ul>
                            {notifications.length > 0 ? (
                                notifications.map((notif, index) => <li key={index}>{notif}</li>)
                            ) : (
                                <li>No new notifications.</li>
                            )}
                        </ul>
                    </div>

                    {/* Schedule Meetings Section */}
                    <div className="schedule-meetings">
                        <h2>{editMeeting ? 'Edit Meeting' : 'Schedule a Team Meeting'}</h2>
                        <form onSubmit={handleScheduleMeeting}>
                            <label>Meeting Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                            <label>Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                            <label>Time</label>
                            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

                            <label>Attendees (comma-separated emails)</label>
                            <input type="text" value={attendees} onChange={(e) => setAttendees(e.target.value)} />

                            <button type="submit">{editMeeting ? 'Update' : 'Schedule'}</button>
                        </form>
                    </div>

                    {/* Scheduled Meetings Table */}
                    <div className="scheduled-meetings">
                        <h2>Scheduled Meetings</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Attendees</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meetings && Array.isArray(meetings) && meetings.length > 0 ? (
                                    meetings.map((meeting, index) => (
                                        meeting ? (
                                            <tr key={meeting._id || index}>
                                                <td>{meeting.title || 'No Title'}</td>
                                                <td>{meeting.date ? new Date(meeting.date).toLocaleDateString() : 'No Date'}</td>
                                                <td>{meeting.time || 'No Time'}</td>

                                                <td>
                                                    {meeting.attendees && meeting.attendees.length > 0 ? (
                                                        meeting.attendees.join(", ")
                                                    ) : "No Attendees"}
                                                </td>
                                                <td>
                                                    <button onClick={() => handleEditMeeting(meeting._id)}><i className="fas fa-edit"></i></button>
                                                    <button onClick={() => handleDeleteMeeting(meeting._id)}><i className="fas fa-trash-alt"></i></button>
                                                </td>
                                            </tr>
                                        ) : null
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No meetings scheduled</td>
                                    </tr>
                                )}
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};


