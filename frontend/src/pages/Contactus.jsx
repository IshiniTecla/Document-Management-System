import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import './Contact.css';

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <div className="contact-us-wrapper">
                <div className="contact-us-container">
                    <h1 className='text-4xl text-center font-serif mb-20'>Contact Us</h1>

                    <div className="contact-info">
                        <div className="info-item">
                            <h2>Address</h2>
                            <p>Kalugalla Mawatha, Kegalle.</p>
                        </div>
                        <div className="info-item">
                            <h2>Telephone</h2>
                            <p>035 2222231</p>
                        </div>
                        <div className="info-item">
                            <h2>Fax</h2>
                            <p>035 2222002</p>
                        </div>
                        <div className="info-item">
                            <h2>Email</h2>
                            <p><a href="mailto:dinushaw@slt.com.lk">dinushaw@slt.com.lk</a></p>
                        </div>
                        <div className="info-item">
                            <h2>Branch Type</h2>
                            <p>Regional Offices</p>
                        </div>
                        <div className="info-item">
                            <h2>Services Available</h2>
                            <ul>
                                <li>Bill Payment</li>
                                <li>Fault Reporting</li>
                                <li>New Connection</li>
                                <li>Purchase CPEs</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="form-container">
                        <h2>Get in Touch</h2>
                        <form className="contact-form">
                            <label>
                                Name:
                                <input type="text" placeholder="Enter your name" required />
                            </label>
                            <label>
                                Email:
                                <input type="email" placeholder="Enter your email" required />
                            </label>
                            <label>
                                Message:
                                <textarea placeholder="Enter your message" rows="5" required></textarea>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    {/* Map Section */}
                    <div className="map-container">
                        <h2>Our Location</h2>
                        <iframe
                            title="Branch Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.9987763661283!2d80.34185801440724!3d7.2495091947959775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae334f6e11c6f7d%3A0x2e2c6f6e85e6174b!2sKegalle%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1672932000000!5m2!1sen!2s"
                            width="100%"
                            height="400"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>

                    </div>

                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default ContactUs;

