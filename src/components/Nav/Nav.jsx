import React, { useState } from 'react';
import { List, X } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el menú desplegable
    const [selectedOption, setSelectedOption] = useState('');    // Estado para las opciones seleccionadas

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);  // Cambia el estado cuando se hace clic en el botón
    };

    const getInitials = (user) => {
        if (!user || !user.firstName || !user.lastName) return 'NA';
        return user.firstName[0] + user.lastName[0];
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);  // Cierra el menú después de seleccionar una opción
    };

    return (
        <>
            <nav className="nav flex items-center justify-around p-4 h-28 bg-cWhite shadow-lg">
                
                {/* Título VetCare */}
                <div className="font-MontserratBold text-5xl text-cPurple">
                    VetCare
                </div>

                {/* Links */}
                <ul className="navBox hidden md:flex space-x-6">
                    <li><Link to="/services" className={`navBoxLink ${selectedOption === 'services' ? 'active' : ''}`} onClick={() => handleOptionClick('services')}>Services</Link></li>
                    <li><Link to="/about-us" className={`navBoxLink ${selectedOption === 'about-us' ? 'active' : ''}`} onClick={() => handleOptionClick('about-us')}>About Us</Link></li>
                    <li><Link to="/contact" className={`navBoxLink ${selectedOption === 'contact' ? 'active' : ''}`} onClick={() => handleOptionClick('contact')}>Contact</Link></li>
                </ul> 

                {/* Logo con iniciales */}
                <div className="hidden md:flex items-center">
                    <div className="circle bg-cPurple text-white flex items-center justify-center rounded-full w-12 h-12 text-xl font-bold">
                        {getInitials(user)}
                    </div>
                </div>

                {/* Botón hamburguesa */}
                <button className="md:hidden flex items-center navButtonHamburger" onClick={toggleDropdown}>
                    {isDropdownOpen ? <X className='icon' /> : <List className='icon' />}
                </button>
            </nav>

            {/* Dropdown menú (solo visible en móvil y cuando el menú está abierto) */}
            <ul className={`navDropdown ${isDropdownOpen ? 'openNav' : 'closedNav'} md:hidden`}>
                <li><Link to="/services" className={`navBoxLink ${selectedOption === 'services' ? 'active' : ''}`} onClick={() => handleOptionClick('services')}>Services</Link></li>
                <li><Link to="/about-us" className={`navBoxLink ${selectedOption === 'about-us' ? 'active' : ''}`} onClick={() => handleOptionClick('about-us')}>About Us</Link></li>
                <li><Link to="/contact" className={`navBoxLink ${selectedOption === 'contact' ? 'active' : ''}`} onClick={() => handleOptionClick('contact')}>Contact</Link></li>
                <li><Link to="/profile" className={`navBoxLink ${selectedOption === 'profile' ? 'active' : ''}`} onClick={() => handleOptionClick('profile')}>My Profile</Link></li>
            </ul>
        </>
    );
};

export default Nav;