import React, { useState, useEffect } from 'react';
import Email from '../../assets/Images/at-sing-white.png';
import Phone from '../../assets/Images/phone-white.png';
import Document from '../../assets/Images/ensign-white.png';
import Calendar from '../../assets/Images/calendar-white.png';
import Back from '../../assets/Images/major-white.png';
import axios from 'axios';

const SidebarUser = ({ userId }) => { // Recibimos el userId como prop

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Usamos el userId en la URL de la API
        axios.get(`https://vetcarecode.azurewebsites.net/api/v1/users/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching the user!', error);
            });
    }, [userId]); // El efecto se ejecuta cuando el userId cambia

    const getInitials = (user) => {
        if (!user || !user.firstName || !user.lastName) return 'NA';
        return user.firstName[0] + user.lastName[0];
    };

    const capitalizeName = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <div className="flex h-fluid min-h-screen">
            <div className="w-5/6 bg-cWhite"></div>

            <div className="w-1/6 h-fluid min-h-screen bg-cPurple p-8 text-white flex flex-col justify-between">
                <div>
                    <div className="mb-8 flex items-center flex justify-between">
                        <button><img className="w-4 h-4" src={Back} alt="Back" /></button>
                        <h1 className="text-2xl font-bold text-cWhite">My Profile</h1>
                    </div>

                    <div className="flex items-center mb-16">
                        <div className="hidden md:flex items-center">
                            <div className="w-16 h-16 rounded-full border-2 border-cWhite flex items-center justify-center text-2xl font-bold mr-4 text-cWhite">
                                {getInitials(user)}
                            </div>
                            <div className="flex flex-col text-cWhite">
                                <h2 className=''>{user ? capitalizeName(`${user.name} ${user.lastName}`) : 'Cargando...'}</h2>
                                <p>Propietario(a)</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <img src={Email} alt="Email" className="w-10 h-10" />
                            <div>
                                <p className="text-purple-200 text-sm">Email</p>
                                <p>{user ? user.email : 'Cargando...'}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src={Phone} alt="Phone" className="w-10 h-10" />
                            <div>
                                <p className="text-purple-200 text-sm">Phone Number</p>
                                <p>{user ? user.phoneNumber : 'Cargando...'}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src={Document} alt="Document" className="w-10 h-10" />
                            <div>
                                <p className="text-purple-200 text-sm">Document Number</p>
                                <p>{user ? user.documentNumber : 'Cargando...'}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src={Calendar} alt="Calendar" className="w-10 h-10" />
                            <div>
                                <p className="text-purple-200 text-sm">Date of Birthday</p>
                                <p>{user ? new Date(user.birthDate).toLocaleDateString() : 'Cargando...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-12 flex space-x-4 flex justify-center">
                        <button className="px-6 py-2 border border-cWhite rounded-full font-semibold hover:bg-cWhite hover:text-cPurple transition-colors">
                            Delete
                        </button>
                        <button className="px-6 py-2 border border-cYellow rounded-full font-semibold hover:bg-cYellow hover:text-cPurple transition-colors">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarUser;
