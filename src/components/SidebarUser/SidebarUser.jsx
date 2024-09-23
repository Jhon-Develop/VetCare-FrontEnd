import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Email from '../../assets/Images/at-sing-white.png';
import Phone from '../../assets/Images/phone-white.png';
import Document from '../../assets/Images/ensign-white.png';
import Calendar from '../../assets/Images/calendar-white.png';
import Back from '../../assets/Images/major-white.png';
import Logout from '../../assets/Images/log-out.png';
import axios from 'axios';
import Modal from '../Modal/Modal';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SidebarUser = ({ userId, onClose }) => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [itemType, setItemType] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init(); // Inicializa AOS
        axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/users/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching the user!', error));
    }, [userId]);

    const getInitials = (user) => {
        if (!user || !user.name || !user.lastName) {
            return 'NA';
        }
        return `${user.name[0]}${user.lastName[0]}`.toUpperCase();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const handleEdit = () => {
        navigate(`/updateAccount/${userId}`);
    };

    const handleDeleteClick = () => {
        setItemType("User");
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        // Aquí agrega la lógica para eliminar el usuario
        console.log('User deleted'); // Simulación de la acción de eliminar
        setShowModal(false); // Cierra el modal después de eliminar
    };

    const handleCancelDelete = () => {
        setShowModal(false); // Cierra el modal si se cancela
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-gray-200 opacity-75" onClick={onClose}></div>
            <div className='bg-cPurple w-full md:w-1/4 h-full p-8 text-white flex flex-col justify-between z-10 transition-transform transform translate-x-0 fixed top-0 right-0' data-aos="slide-left" data-aos-duration="300">
                <button onClick={onClose} className='flex items-center gap-x-2 mb-8 hover:scale-105 hover:text-cYellow text-cWhite transition duration-300 font-MontserratSemibold'>
                    <img className="w-4 h-4" src={Back} alt="Back" />
                    <h2 className="text-2xl font-bold">My Profile</h2>
                </button>

                <div className="flex items-center mb-16">
                    <div className="w-16 h-16 rounded-full border-2 border-cWhite flex items-center justify-center text-2xl font-bold mr-4 text-cWhite">
                        {getInitials(user)}
                    </div>
                    <div className="flex flex-col text-cWhite">
                        <h2 className='capitalize'>{user ? (`${user.name} ${user.lastName}`) : 'Cargando...'}</h2>
                        <p>Propietario(a)</p>
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

                <div className="mt-12 flex justify-center space-x-4">
                    <button onClick={handleDeleteClick} className="px-6 py-2 border border-cWhite rounded-full font-MontserratSemibold hover:bg-cWhite hover:text-cPurple hover:scale-105 transition duration-300">
                        Delete
                    </button>
                    <button onClick={handleEdit} className="px-6 py-2 border border-transparent rounded-full font-MontserratSemibold bg-cYellow hover:text-cPurple hover:scale-105 transition duration-300">
                        Edit
                    </button>
                </div>

                <div className='flex justify-center items-center mt-4'>
                    <button
                        type='button'
                        onClick={handleLogout}
                        className='px-6 py-2 hover:scale-105 hover:text-cYellow text-cWhite transition duration-300 font-MontserratSemibold flex items-center justify-center gap-x-2'>
                        Log out
                        <img src={Logout} alt="Logout" className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {showModal && (
                <Modal
                    itemType={itemType}
                    itemId={userId}
                    onDeleteSuccess={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default SidebarUser;
