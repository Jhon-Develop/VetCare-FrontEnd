import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../../assets/Images/home.png';
import User from '../../assets/Images/user-white.png';
import Pet from '../../assets/Images/footprint-white.png';
import File from '../../assets/Images/folder-white.png';
import Trash from '../../assets/Images/delete.png';
import Edit from '../../assets/Images/edit.png';
import plus from '../../assets/Images/plus-white.png';
import Glass from '../../assets/Images/glass.png';
import Header from '../../components/Nav/Nav.jsx';
import './AdministratorUser.css';

const AdministratorUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://vetcare-backend.azurewebsites.net/api/v1/users?pageNumber=1&pageSize=10')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleSignUp = () => {
        window.location.href = '/register';
    };

    const handleAdminUser = () => {
        window.location.href = '/admin-users';
    };

    const handleAdminPets = () => {
        window.location.href = '/admin-pets';
    };

    const handleEditUser = () => {
        window.location.href = '/updateAccount';
    };

    return (
        <div className="bg-cWhite h-fluid w-full relative min-h-screen ">
            <Header />

            {/* Sidebar */}
            <div className="absolute fixed left-4 top-1/2 -translate-y-1/2 bg-cPurple w-16 rounded-full flex flex-col items-center py-6 space-y-8 drop-shadow-lg">
                <button
                    className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={Home} alt="Home"
                        className="text-white w-6 h-6" />
                </button>
                <button
                    onClick={handleAdminUser}
                    className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={User} alt="User"
                        className="text-white w-6 h-6" />
                </button>
                <button
                    onClick={handleAdminPets}
                    className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={Pet} alt="Pet"
                        className="text-white w-6 h-6" />
                </button>
                <button
                    className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={File} alt="File"
                        className="text-white w-6 h-6" />
                </button>
            </div>

            {users.length > 0 ? (
                <main className="p-4">
                    <div className="p-8 w-5/6 mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-MontserratSemibold text-cPurple">Users</h1>
                            <div className="w-full max-w-md px-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Find user..."
                                        className="w-full py-3 pl-4 pr-10 text-cGray bg-cWhite border-none rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-cPurple"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <img src={Glass} alt="Search" className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='shadow-lg ring-1 ring-cBlack/5 sm:rounded-lg overflow-x-auto'>
                            <table className='min-w-full divide-y divide-gray-300'>
                                <thead>
                                    <tr>
                                        <th className='py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-cPurple sm:pl-6'>Name</th>
                                        <th className='px-3 py-3.5 text-left text-lg font-semibold text-cPurple'>Document Number</th>
                                        <th className='px-3 py-3.5 text-left text-lg font-semibold text-cPurple'>Email</th>
                                        <th className='px-3 py-3.5 text-left text-lg font-semibold text-cPurple'>Phone</th>
                                        <th className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {users.map((user) => (
                                        <tr key={user.email}>
                                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium sm:pl-6'>{user.name + ' ' + user.lastName}</td>
                                            <td className='whitespace-nowrap px-3 py-4 text-base text-cGray'>{user.documentNumber}</td>
                                            <td className='whitespace-nowrap px-3 py-4 text-base text-cGray'>{user.email}</td>
                                            <td className='whitespace-nowrap px-3 py-4 text-base text-cGray'>{user.phoneNumber}</td>
                                            <td className='relative py-4 pl-3 pr-4 flex justify-center items-center sm:pr-6 space-x-4'>
                                                <button onClick={handleEditUser}>
                                                    <img className='w-6 h-6 ' src={Edit} alt="Editar" />
                                                </button>
                                                <button className='bg-cPurple w-8 h-8 flex justify-center items-center rounded-lg'>
                                                    <img className='w-6 h-6 ' src={Trash} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='relative'>
                            <button
                                onClick={handleSignUp}
                                className="fixed bottom-4 right-4 bg-cGreen text-white px-4 py-2 rounded-full shadow-lg hover:bg w-14 h-14 flex justify-center items-center">
                                <img src={plus} alt="Add user" />
                            </button>
                        </div>
                    </div>
                </main>
            ) : (
                <p className="text-cBlack font-MontserratRegular text-5xl mt-10 text-center text-cGray">
                    You do not have any registered user yet.
                </p>

            )}
        </div>
    );
};

export default AdministratorUsers;
