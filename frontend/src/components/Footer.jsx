import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* About Section */}
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>
                        We are dedicated to providing efficient and sustainable document management solutions.
                        Our system empowers teams to collaborate and reduce paper usage effectively.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/contactus">Contact Us</a></li>
                        <li><a href="/Privacy-Terms">Privacy Policy</a></li>
                        <li><a href="/Privacy-Terms">Terms & Conditions</a></li>
                        <li><a href="/logins">Logins</a></li>
                        <li><a href="/inventory">Inventory</a></li>
                        <li><a href="/sales-dashboard">Sales Dashboard</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <h4>General Contact</h4>
                    <p>Email: pr@slt.lk</p>
                    <p>Phone: +94 112 021 000</p>
                    <p>Address: Sri Lanka Telecom PLC
                        Lotus Road, P.O.Box 503,
                        Colombo 01,
                        Sri Lanka.</p>
                    <h4>Customer Support(24X7)</h4>
                    <p>Email: 1212@slt.com.lk</p>
                    <p>Phone: 1212</p>
                    <p>Self Service: +94 112 12 12 12</p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Sri Lanka Telecom PLC. All Rights Reserved.</p>

            </div>

        </footer>
    );
};

export default Footer;
