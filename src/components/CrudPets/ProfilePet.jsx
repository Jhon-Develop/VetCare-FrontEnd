import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Para obtener el id de la URL
import axios from 'axios'; // Importamos axios para las solicitudes HTTP
import Nav from '../Nav/Nav';
import Sex from '../../assets/Images/generos.png';
import Birthday from '../../assets/Images/birthday.png';
import Weight from '../../assets/Images/escala-de-peso.png';
import Footprint from '../../assets/Images/patas.png';
import Folder from '../../assets/Images/folder-white.png';

const ProfilePet = () => {
    const { id } = useParams();
    const [petData, setPetData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    // Función para obtener los datos de la mascota desde el backend
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await axios.get(`/api/pets/${id}`);
                setPetData(response.data); 
            } catch (error) {
                console.error("Error fetching pet data:", error);
            }
        };

        fetchPetData();
    }, [id]);

    // Función para obtener las citas de la mascota desde el backend
    useEffect(() => {
        const fetchAppointmentsData = async () => {
            try {
                const response = await axios.get(`/api/pets/${id}/appointments`);
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointmentsData();
    }, [id]);

    if (!petData) {
        return <p className='flex justify-center items-center mt-20 text-cPurple font-MontserratBold text-7xl'>Loading...</p>;
    }

    // Función para hacer una cita
    const makeAppointment = () => {
        navigate(`/pets/${id}/appointment`);
    };

    return (
        <div className='bg-cWhite w-full h-full'>
            <Nav />
            <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-72 mt-20 px-5">
                <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-2 grid-rows-5 gap-4 place-items-center">
                        <div className='w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end'>
                            <img src={Footprint} alt="Footprint" />
                        </div>
                        <div className='text-cPurple justify-self-start'>
                            <h2 className='font-MontserratBold text-3xl lg:text-5xl'>Breed</h2>
                            <p className='text-2xl font-MontserratRegular'>{petData.breed}</p> {/* Mostrar la raza */}
                        </div>
                        <div className="row-start-2 w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end">
                            <img src={Birthday} alt="Birthday" />
                        </div>
                        <div className="row-start-2 text-cPurple justify-self-start">
                            <h2 className='font-MontserratBold text-3xl lg:text-5xl'>Date Birthday</h2>
                            <p className='text-2xl font-MontserratRegular'>{new Date(petData.birthdate).toLocaleDateString()}</p> {/* Fecha de cumpleaños */}
                        </div>
                        <div className="row-start-3 w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end">
                            <img src={Weight} alt="Weight" />
                        </div>
                        <div className="row-start-3 text-cPurple justify-self-start">
                            <h2 className='font-MontserratBold text-3xl lg:text-5xl'>Weight</h2>
                            <p className='text-2xl font-MontserratRegular'>{petData.weight} Kg</p> {/* Peso */}
                        </div>
                        <div className="row-start-4 w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end">
                            <img src={Sex} alt="Sex" />
                        </div>
                        <div className="row-start-4 text-cPurple justify-self-start">
                            <h2 className='font-MontserratBold text-3xl lg:text-5xl'>Sex</h2>
                            <p className='text-2xl font-MontserratRegular'>{petData.sex}</p> {/* Sexo */}
                        </div>
                        <div className='row-start-5 self-start justify-self-end'>
                            <button className='bg-cWhite text-cGreen px-4 lg:px-6 py-1 lg:py-2 rounded-2xl border-2 border-cGreen'>
                                <h2 className='font-MontserratRegular text-lg lg:text-2xl'>Edit</h2>
                            </button>
                        </div>
                        <div className='row-start-5 self-start justify-self-start'>
                            <button className='bg-cGreen text-cWhite px-4 lg:px-4 py-1 lg:py-2 rounded-2xl border-2 border-cGreen'>
                                <h2 className='font-MontserratRegular text-lg lg:text-2xl'>Delete</h2>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-12 w-full lg:w-1/2 h-auto'>
                    <div className='bg-cYellow w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] rounded-full relative'>
                        <img src={petData.image} alt="Profile" className="w-full h-[420px] lg:h-[820px] object-cover absolute z-1 bottom-[-5rem]" />
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-12 mt-10 lg:mt-20'>
                <h2 className='text-cPurple font-MontserratBold text-4xl lg:text-7xl'>
                    Appointments
                </h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mb-20'>
                    {appointments.map((appointment, index) => (
                        <div key={index} className='bg-cGreen flex items-center gap-4 rounded-md p-4 w-full'>
                            <div className='w-16 h-16 lg:w-24 lg:h-24'>
                                <img src={Folder} alt="Folder" />
                            </div>
                            <div>
                                <p className='text-cWhite text-lg lg:text-2xl'>Appointment Type: {appointment.appointmentType}</p>
                                <p className='text-cWhite text-lg lg:text-2xl'>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                                <p className='text-cWhite text-lg lg:text-2xl'>Description: {appointment.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={makeAppointment}
                    className="bg-cPurple text-white w-12 h-12 lg:w-16 lg:h-14 rounded-full shadow-lg hover:bg-[#4e066b] transition duration-300 text-3xl lg:text-5xl fixed bottom-5 right-5 flex justify-center">
                    &#43;
                </button>
            </div>
        </div>
    );
}

export default ProfilePet;