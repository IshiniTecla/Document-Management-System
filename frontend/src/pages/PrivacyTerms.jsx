import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './PrivacyTerms.css'

export const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="policy-container">
                <h1>Privacy Policy</h1>
                <p>
                    Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information.
                </p>
                <h2>Information We Collect</h2>
                <ul>
                    <li>Personal information you provide directly.</li>
                    <li>Automatically collected information, such as IP address and browser type.</li>
                </ul>
                <h2>How We Use Your Information</h2>
                <p>
                    We use your information to provide, improve, and personalize our services, communicate with you, and ensure a secure experience.
                </p>
                <h2>Data Sharing and Security</h2>
                <p>
                    We do not sell your data to third parties. We implement industry-standard measures to protect your data from unauthorized access.
                </p>
                <h2>Your Rights</h2>
                <p>
                    You have the right to access, modify, or delete your personal information. Contact us for assistance.
                </p>
                <p>
                    By using our services, you agree to this Privacy Policy. Changes to the policy will be communicated via updates on this page.
                </p>
            </div>

            <div className="terms-container">
                <h1>Terms and Conditions</h1>
                <p>
                    Welcome to our service! By accessing or using our platform, you agree to the following terms and conditions.
                </p>
                <h2>Use of Services</h2>
                <p>
                    You agree to use our services responsibly and in compliance with all applicable laws. Unauthorized use of the platform is strictly prohibited.
                </p>
                <h2>Intellectual Property</h2>
                <p>
                    All content on this platform, including text, images, and code, is our intellectual property. You may not use it without our permission.
                </p>
                <h2>Account Responsibilities</h2>
                <p>
                    You are responsible for maintaining the confidentiality of your account and for all activities under your account.
                </p>
                <h2>Limitation of Liability</h2>
                <p>
                    We are not liable for any damages arising from your use of the platform, including data loss or service interruptions.
                </p>
                <h2>Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
                </p>
                <p>
                    Thank you for using our service! If you have any questions, please contact us.
                </p>
            </div>
            <Footer />
        </>
    );
};


