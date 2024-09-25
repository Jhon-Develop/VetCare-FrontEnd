import React, { useState, useEffect } from 'react';
import { List, X } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';
import SidebarUser from '../SidebarUser/SidebarUser';
import './Nav.css';

const Nav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userId = extractUserIdFromToken(token);
            const expiration = extractExpirationFromToken(token);
            const now = Date.now();
            if (now > expiration) {
                localStorage.removeItem('token');
                window.location.href = '/';
                return;
            }
            fetch(`https://vetcare-backend.azurewebsites.net/api/v1/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setUser({
                        name: data.name || 'NA',
                        lastName: data.lastName || 'NA'
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data', error);
                });
        }
    }, []);

    const extractUserIdFromToken = (token) => {
        try {
            const base64Payload = token.split('.')[1];
            const decodedPayload = atob(base64Payload);
            const payload = JSON.parse(decodedPayload);
            return payload.Id;
        } catch (error) {
            console.error("Error extracting user ID from token", error);
            return null;
        }
    };

    const extractExpirationFromToken = (token) => {
        try {
            const base64Payload = token.split('.')[1];
            const decodedPayload = atob(base64Payload);
            const payload = JSON.parse(decodedPayload);
            return payload.exp * 1000;
        } catch (error) {
            console.error("Error extracting expiration from token", error);
            return Date.now();
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const getInitials = (user) => {
        if (!user || !user.name || !user.lastName) {
            return 'NA';
        }
        return `${user.name[0]}${user.lastName[0]}`.toUpperCase();
    };

    const handleProfile = () => {
        setIsSidebarOpen(true);
        setIsDropdownOpen(false);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <>
            {isSidebarOpen && (
                <SidebarUser
                    userId={extractUserIdFromToken(localStorage.getItem('token'))}
                    onClose={closeSidebar}
                />
            )}

            {!isSidebarOpen && (
                <nav className="nav flex items-center justify-around p-4 h-28 bg-cWhite shadow-lg">
                    <div className="font-MontserratBold text-5xl text-cPurple">
                        <Link to="/Home">VetCare</Link>
                    </div>

                    <ul className="navBox hidden md:flex space-x-6 font-MontserratSemibold">
                        <li>
                            <Link to="/services" className={`navBoxLink ${selectedOption === 'services' ? 'active' : ''}`} onClick={() => handleOptionClick('services')}>Services</Link>
                        </li>
                        <li>
                            <Link to="/about-us" className={`navBoxLink ${selectedOption === 'about-us' ? 'active' : ''}`} onClick={() => handleOptionClick('about-us')}>About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`navBoxLink ${selectedOption === 'contact' ? 'active' : ''}`} onClick={() => handleOptionClick('contact')}>Contact</Link>
                        </li>
                    </ul>

                    <div className="hidden md:flex items-center">
                        <button
                            onClick={handleProfile}
                            className="circle bg-cPurple text-white flex items-center justify-center rounded-full w-12 h-12 text-xl font-bold">
                            {getInitials(user)}
                        </button>
                    </div>

                    <button className="md:hidden flex items-center navButtonHamburger" onClick={toggleDropdown}>
                        {isDropdownOpen ? <X className='icon' /> : <List className='icon' />}
                    </button>
                </nav>
            )}

            <ul className={`navDropdown ${isDropdownOpen ? 'openNav' : 'closedNav'} md:hidden`}>
                <li><Link to="/services" className={`navBoxLink ${selectedOption === 'services' ? 'active' : ''}`} onClick={() => handleOptionClick('services')}>Services</Link></li>
                <li><Link to="/about-us" className={`navBoxLink ${selectedOption === 'about-us' ? 'active' : ''}`} onClick={() => handleOptionClick('about-us')}>About Us</Link></li>
                <li><Link to="/contact" className={`navBoxLink ${selectedOption === 'contact' ? 'active' : ''}`} onClick={() => handleOptionClick('contact')}>Contact</Link></li>
                <li><Link to="#" className={`navBoxLink ${selectedOption === 'profile' ? 'active' : ''}`} onClick={handleProfile}>My Profile</Link></li>
            </ul>
        </>
    );
};

export default Nav;
