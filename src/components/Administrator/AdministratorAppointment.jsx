import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Home from '../../assets/Images/home.png';
import User from '../../assets/Images/user-white.png';
import Pet from '../../assets/Images/footprint-white.png';
import File from '../../assets/Images/folder-white.png';
import Header from '../../components/Nav/Nav.jsx';

const AdministratorAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [pets, setPets] = useState({});
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [loadingPets, setLoadingPets] = useState(true);

    useEffect(() => {
        // Obtener todas las citas
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('https://vetcare-backend.azurewebsites.net/api/v1/appointments/getall?pageNumber=1&pageSize=1000');
                console.log('Appointments data:', response.data); // Verifica la respuesta
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoadingAppointments(false);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        // Obtener detalles de las mascotas por cada cita
        const fetchPetDetails = async () => {
            const petData = {};
            const petIds = [...new Set(appointments.map(appointment => appointment.petId))];

            console.log('Unique Pet IDs:', petIds); // Verifica los IDs únicos

            const petFetches = petIds.map(petId =>
                axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/Pet/petById/${petId}`)
                    .then(petResponse => {
                        petData[petId] = petResponse.data;
                    })
                    .catch(error => {
                        console.error(`Error fetching pet details for petId ${petId}:`, error);
                    })
            );

            await Promise.all(petFetches);
            setPets(petData);
            setLoadingPets(false);
        };

        if (appointments.length > 0) {
            fetchPetDetails();
        }
    }, [appointments]);

    const handleAdminUser = () => {
        window.location.href = '/admin-users';
    };

    const handleAdminPets = () => {
        window.location.href = '/admin-pets';
    };

    const handleAdminAppointments = () => {
        window.location.href = '/admin-appointment';
    };

    const handleHome = () => {
        window.location.href = '/home';
    };

    return (
        <div className="bg-cWhite h-fluid min-h-screen w-full relative min-h-screen">
            <Header />
            {/* Sidebar */}
            <div className="absolute fixed left-4 top-1/2 -translate-y-1/2 bg-cPurple w-16 rounded-full flex flex-col items-center py-6 space-y-8 drop-shadow-lg">
                <button onClick={handleHome} className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={Home} alt="Home" className="text-white w-6 h-6" />
                </button>
                <button onClick={handleAdminUser} className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={User} alt="User" className="text-white w-6 h-6" />
                </button>
                <button onClick={handleAdminPets} className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={Pet} alt="Pet" className="text-white w-6 h-6" />
                </button>
                <button onClick={handleAdminAppointments} className='hover:bg-[#A03ACF] rounded-full w-10 h-10 flex justify-center items-center'>
                    <img src={File} alt="File" className="text-white w-6 h-6" />
                </button>
            </div>

            {/* Main content area */}
            {loadingAppointments ? (
                <p className="text-cBlack font-MontserratRegular text-5xl mt-10 text-center text-cGray">
                    Loading appointments...
                </p>
            ) : appointments.length > 0 ? (
                <main className="p-4">
                    <div className="p-8 w-5/6 mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-MontserratSemibold text-cPurple">Appointments</h1>
                        </div>
                        <div className="shadow-lg ring-1 ring-cBlack/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-cPurple sm:pl-6">Start Date</th>
                                        <th className="px-3 py-3.5 text-left text-lg font-semibold text-cPurple">End Date</th>
                                        <th className="px-3 py-3.5 text-left text-lg font-semibold text-cPurple">Pet Name</th>
                                        <th className="px-3 py-3.5 text-left text-lg font-semibold text-cPurple">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {appointments.map((appointment) => {
                                        const startDate = new Date(appointment.startDate);
                                        const endDate = new Date(appointment.endDate);
                                        return (
                                            <tr key={appointment.id}>
                                                <td className='whitespace-nowrap py-4 pl-2 pr-2 text-base font-medium'>
                                                    {startDate ? format(startDate, 'Pp') : 'Sin fecha'}
                                                </td>
                                                <td className='whitespace-nowrap px-2 py-4 text-base text-cGray'>
                                                    {endDate ? format(endDate, 'Pp') : 'Sin fecha'}
                                                </td>
                                                <td className='whitespace-nowrap px-2 py-4 text-base text-cGray'>
                                                    {loadingPets ? 'Cargando...' : pets[appointment.petId] ? pets[appointment.petId].name : 'Mascota no encontrada'}
                                                </td>
                                                <td className='whitespace-nowrap px-2 py-4 text-base text-cGray'>
                                                    {appointment.description || 'Sin descripción'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            ) : (
                <p className="text-cBlack font-MontserratRegular text-5xl mt-10 text-center text-cGray">
                    No appointments recorded.
                </p>
            )}
        </div>
    );
};

export default AdministratorAppointment;
