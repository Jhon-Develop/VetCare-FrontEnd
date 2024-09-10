import React from 'react'
import Home from '../../assets/Images/home.png';
import User from '../../assets/Images/user-white.png';
import Pet from '../../assets/Images/footprint-white.png';
import File from '../../assets/Images/folder-white.png';
import Trash from '../../assets/Images/delete.png';
import Edit from '../../assets/Images/edit.png';
import Header from '../../components/Nav/Nav.jsx';

const AdministratorPets = () => {
    // Users data
    const users = [
        { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
        { name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
        { name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
        { name: "Whitney Francis", title: "Copywriter", email: "whitney.francis@example.com", role: "Admin" },
        { name: "Leonard Krasner", title: "Senior Designer", email: "leonard.krasner@example.com", role: "Owner" },
        { name: "Floyd Miles", title: "Principal Designer", email: "floyd.miles@example.com", role: "Member" },

    ]

    return (
        <div className=" h-screen w-full relative min-h-screen">
            <Header />

            {/* Sidebar */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-cPurple w-16 rounded-full flex flex-col items-center py-6 space-y-8">
                <button className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={Home} alt="Home" className="text-white w-6 h-6" />
                </button>
                <button className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={User} alt="User" className="text-white w-6 h-6" />
                </button>
                <button className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={Pet} alt="Pet" className="text-white w-6 h-6" />
                </button>
                <button className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={File} alt="File" className="text-white w-6 h-6" />
                </button>
            </div>

            {/* Main content area */}
            <main className="p-4">
                <div className="p-8 w-5/6 mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-MontserratSemibold text-cPurple">Users</h1>
                        </div>
                        <button className="bg-cPurple hover:bg-[#A03ACF] text-white w-32 h-10 rounded-lg md:text-xl font-MontserratLight">Add user</button>
                    </div>
                    <div className=" shadow-lg ring-1 ring-cBlack/5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-cPurple sm:pl-6">Name</th>
                                    <th className="px-3 py-3.5 text-left text-lg font-semibold text-cPurple">Title</th>
                                    <th className="px-3 py-3.5 text-left text-lg font-semibold text-cPurple">Email</th>
                                    <th className="px-3 py-3.5 text-left text-lg font-semibold text-cPurple">Role</th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 ">
                                {users.map((user) => (
                                    <tr key={user.email}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium sm:pl-6">{user.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-base text-gray-500">{user.title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-base text-gray-500">{user.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-base text-gray-500">{user.role}</td>
                                        <td className="relative py-4 pl-3 pr-4 flex justify-center items-center sm:pr-6 space-x-4">
                                            <button ><img className='w-6 h-6 ' src={Edit} alt="Editar" /></button>
                                            <button className='bg-cPurple w-8 h-8 flex justify-center items-center rounded-lg'><img className='w-6 h-6 ' src={Trash} alt="Eliminar" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdministratorPets;
