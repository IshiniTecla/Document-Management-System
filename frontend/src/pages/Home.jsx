import React from 'react'
import { ImageSlider } from '../components/ImageSlider'
import './Home.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const Home = () => {
    return (
        <div>
            <Navbar />
            <ImageSlider />
            <div className="intro-container">
                <h2 className="intro-title">Welcome to Our Document Management System</h2>
                <p className="intro-text">
                    Our Document Management System (DMS) is designed to streamline office operations,
                    reduce paper usage, and enhance collaboration. With features tailored for managers,
                    leave agents, and sales teams, DMS empowers Sri Lanka Telecom to achieve greater
                    efficiency and sustainability.
                </p>
            </div>
            <div className="vision-mission-container">
                <div className="vision-card">
                    <h2 className="card-title">Vision</h2>
                    <p className="card-text">
                        All Sri Lankans seamlessly connected with world-class information, communication and entertainment services.
                    </p>
                    <img
                        src="src/assets/vision.svg"
                        alt="Vision"
                        className="vision-image"
                    />
                </div>
                <div className="mission-card">
                    <h2 className="card-title">Mission</h2>
                    <p className="card-text">
                        Your trusted and proven partner for innovative and exciting communication experiences delivered with passion, 1 quality and commitment.
                    </p>
                    <img
                        src="src/assets/images.png"
                        alt="Mission"
                        className="mission-image"
                    />
                </div>
            </div>
            <div className="events-calendar-container">
                <div className="events-card">
                    <h2 className="card-title">Upcoming Events</h2>
                    <ul className="events-list">
                        <li>Event 1: Digital Transformation Summit - Jan 15, 2024</li>
                        <li>Event 2: Tech Workshop for Teams - Feb 10, 2024</li>
                        <li>Event 3: Annual Sustainability Conference - Mar 5, 2024</li>
                        <li><a href="/events" className="view-more-link">View More Events</a></li>
                    </ul>
                </div>
                <div className="calendar-card">
                    <h2 className="card-title">Calendar</h2>
                    <div className="calendar-embed">

                        <iframe
                            src="https://calendar.google.com/calendar/embed?src=your_calendar_id"
                            style={{ border: 0, width: '100%', height: '300px' }}
                            frameBorder="0"
                            scrolling="no"
                            title="Calendar"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Home

