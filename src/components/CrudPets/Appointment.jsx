import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ajustar el import
import axios from 'axios';
import Cat from '../../assets/Images/appointment-cat.png';
import Exit from '../../assets/Images/letter-x-white.png';
import './Appointment.css';

const Appointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchAppointmentTypes = async () => {
            try {
                const response = await axios.get('https://vetcare-backend.azurewebsites.net/api/v1/appointmentTypes/getall');
                setAppointmentTypes(response.data);
            } catch (error) {
                console.error('Error fetching appointment types:', error);
            }
        };

        fetchAppointmentTypes();
    }, []);

    const validateToken = (token) => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                navigate('/login');
                return false;
            }
            return parseInt(decodedToken.Id, 10);
        }
        return null;
    };

    const validateFields = () => {
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(date).setHours(0, 0, 0, 0);
        const [selectedHour] = hour.split(':').map(Number);
        let validationErrors = {};

        if (!selectedType) {
            validationErrors.type = "Please select an appointment type.";
        }
        if (!date) {
            validationErrors.date = "Please select a date.";
        } else if (selectedDate < today) {
            validationErrors.date = "The appointment date cannot be in the past.";
        }
        if (!hour) {
            validationErrors.hour = "Please select a time.";
        } else if (selectedHour < 8 || selectedHour >= 20) {
            validationErrors.hour = "The appointment time must be between 8:00 AM and 8:00 PM.";
        }
        if (!description) {
            validationErrors.description = "Please enter a description.";
        } else if (description.length < 10) {
            validationErrors.description = "The description must be at least 10 characters long.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Validando campos...");
        if (!validateFields()) {
            console.log("Validación fallida", errors);
            return;
        }

        const token = localStorage.getItem('token');
        console.log("Token obtenido:", token);

        const userId = validateToken(token);
        console.log("ID de usuario:", userId);

        if (!userId) return; // Stop if the token is invalid or expired

        const newAppointment = {
            endDate: new Date(`${date}T${hour}`).toISOString(),
            description,
            petId: Number(id),
            appointmentTypeId: Number(selectedType),
            userId,
        };

        console.log("Enviando los siguientes datos para crear la cita:", newAppointment);

        try {
            const response = await axios.post('https://vetcare-backend.azurewebsites.net/api/v1/appointments/create', newAppointment, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Respuesta del servidor:", response);

            if (response.status === 200) {
                alert('Appointment created successfully!'); // Mensaje en inglés
                navigate(`/pets/${id}`); // Redirigir al perfil de la mascota
            } else {
                console.log("The appointment was not created correctly. Status:", response.status);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            console.log("Details of the error:", error.response);
            if (error.response && error.response.status === 401) {
                alert('Unauthorized: Please log in again.');
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                alert(`Error: ${error.response ? error.response.data : 'Unknown error occurred'}`);
            }
        }
    };

    const ClickExit = (e) => {
        e.preventDefault();
        navigate(`/pets/${id}`);
    };

    return (
        <div className='bg-cGreen w-full h-screen flex justify-end items-end appointment'>
            <form onSubmit={handleSubmit} className='w-full md:w-3/4 lg:w-1/2 h-full flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-4 md:p-8 overflow-y-auto'>
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className='text-center text-cGreen text-3xl md:text-6xl font-MontserratBold'>
                        New appointment
                    </h2>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'
                        required
                    >
                        <option value="" disabled>Select the type of appointment</option>
                        {appointmentTypes.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'
                        required
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                    <input
                        type="time"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'
                        required
                    />
                    {errors.hour && <p className="text-red-500 text-sm">{errors.hour}</p>}

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter details about the appointment.'
                        cols="30"
                        rows="10"
                        className='w-full md:w-4/5 p-3 md:p-4 h-36 md:h-40 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'
                        required
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full md:w-4/5 h-12 md:h-14 rounded-2xl border border-cGreen bg-cGreen text-cWhite text-sm md:text-xl font-MontserratRegular mt-6 md:mt-8">
                        Save
                    </button>

                    <p className='text-cGreen text-xs md:text-sm mt-4 md:mt-6 max-w-60 text-center'>
                        Remember to keep your appointment 15 minutes in advance.
                    </p>
                </div>
            </form>

            <div className="hidden md:flex flex-col justify-end items-end w-1/2 h-full">
                <div className='bg-cPurple w-14 h-14 lg:w-14 lg:h-14 px-4 py-2 rounded-full shadow-lg hover:bg-[#4e066b] transition duration-300 text-2xl lg:text-2xl fixed top-5 right-5 flex justify-center items-center text-cWhite'>
                    <button onClick={ClickExit}>
                        <img src={Exit} alt="Exit" />
                    </button>
                </div>
                <img src={Cat} alt="Cat" className="max-w-70 md:max-w-xlg h-auto" />
            </div>
        </div>
    );
};

export default Appointment;
