import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'
import './Logins.css'

export const Logins = () => {
    return (
        <>
            <Navbar />
            <h1 className='text-4xl text-center font-serif mt-10 mb-10'>Logins</h1>

            <div className='list-container'>
                <ul className='button-list'>
                    <li>
                        <Link to="/managerlogin">
                            <button className='b1 text-white'>Manager</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/salesmanagerlogin">
                            <button className='b1 text-white'>Sales Support Manager</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/leaveagentlogin">
                            <button className='b1 text-white'>Admin Officer</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cashierlogin">
                            <button className='b1 text-white'>Retention Manager</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/s1login">
                            <button className='b1 text-white'>Private Assistant</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/s2login">
                            <button className='b1 text-white'>Sales Person</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/accountantlogin">
                            <button className='b1 text-white'>Accountant</button>
                        </Link>
                    </li>
                </ul>
            </div>
            <Footer />
        </>
    )
}


