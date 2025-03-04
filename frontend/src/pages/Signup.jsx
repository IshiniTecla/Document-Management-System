import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [NIC, setNIC] = useState('');
    const [role, setRole] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail() && validatePassword()) {
            const userData = { name, NIC, email, phone, password, role };

            let endpoint = '';
            if (role === 'manager') {
                endpoint = 'http://localhost:5000/managers';
            } else if (role === 'leaveagent') {
                endpoint = 'http://localhost:5000/leaveagents';
            } else if (role === 'salesmanager') {
                endpoint = 'http://localhost:5000/salesmanagers';
            }

            if (endpoint) {
                axios.post(endpoint, userData)
                    .then((response) => {
                        console.log(response);
                        alert('Registered successfully!');
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    };

    return (
        <div className='main'>
            <form className='signup-container' onSubmit={handleSubmit}>
                <h1>SIGN UP</h1>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='nic'>NIC</label>
                <input
                    type='text'
                    id='nic'
                    onChange={(e) => setNIC(e.target.value)}
                />

                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                {emailError && <p className='error-message'>{emailError}</p>}

                <label htmlFor='phone'>Phone</label>
                <input
                    type='text'
                    id='phone'
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {passwordError && <p className='error-message'>{passwordError}</p>}

                <label htmlFor='role'>Select Role</label>
                <select
                    id='role'
                    required
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                >
                    <option value=''>Select Role</option>
                    <option value='manager'>Manager</option>
                    <option value='salesmanager'>Sales Manager</option>
                    <option value='leaveagent'>Leave Agent</option>
                </select>

                <button type='submit'>Submit</button>

                <Link to='/logins'>
                    <h2>
                        If you have an account, <b>Sign In</b>
                    </h2>
                </Link>
            </form>
        </div>
    );
};

export default SignUp;

