import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export const LeaveagentLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Invalid email address');
        return isValid;
    };

    const validatePassword = () => {
        const isValid = password.length >= 6;
        setPasswordError(isValid ? '' : 'Password must be at least 6 characters long');
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail() && validatePassword()) {
            try {
                const response = await axios.post('http://localhost:5000/leaveagents/login', {
                    email,
                    password,
                });
                if (response.data.status) {
                    navigate(`/leaveagent-dashboard/${email}`);
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                alert('Error logging in');
            }
        }
    };

    return (
        <div className="main">
            <form className="login-container" onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error-message">{emailError}</p>}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit">Login</button>
                <Link to="/forgot-password">
                    <h2>Forgot Password?</h2>
                </Link>
                <Link to="/signup">
                    <h2>
                        Don't have an account? <b>Sign Up</b>
                    </h2>
                </Link>
            </form>
        </div>
    );
};
