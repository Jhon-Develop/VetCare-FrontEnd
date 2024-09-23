import React, { useState, useEffect } from 'react';
import { List, X } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Obtener ID del usuario desde el token
            const userId = extractUserIdFromToken(token);

            // Verificar la expiración del token
            const expiration = extractExpirationFromToken(token);
            const now = Date.now();
            if (now > expiration) {
                localStorage.removeItem('token');
                window.location.href = '/';
                return;
            }

            // Obtener datos del usuario desde la API
            fetch(`https://vetcarecode.azurewebsites.net/api/v1/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Info user fetched from API:', data); // Verifica qué datos estás recibiendo

                    setUser({
                        name: data.name || 'NA', // Asegúrate de que estos campos existan en la respuesta de la API
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
            return payload.Id; // Cambia esto según tu estructura del token
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
            return payload.exp * 1000; // Convertir a milisegundos
        } catch (error) {
            console.error("Error extracting expiration from token", error);
            return Date.now(); // Para evitar redirecciones inesperadas
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const getInitials = (user) => {
        console.log('User data for initials:', user); // Verifica qué datos están disponibles para las iniciales
        if (!user || !user.name || !user.lastName) {
            console.log('Returning default initials: NA'); // Verifica cuando no hay datos
            return 'NA';
        }
        const initials = `${user.name[0]}${user.lastName[0]}`.toUpperCase();
        console.log('Computed initials:', initials); // Verifica las iniciales calculadas
        return initials;
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <nav className="nav flex items-center justify-around p-4 h-24 bg-cWhite shadow-lg">
                
                {/* Título VetCare */}
                <div className="font-MontserratBold text-5xl text-cPurple">
                    VetCare
                </div>

                {/* Links */}
                <ul className="navBox hidden md:flex space-x-6 font-MontserratSemibold">
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
