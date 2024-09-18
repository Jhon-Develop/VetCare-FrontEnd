import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cat from '../../assets/Images/appointment-cat.png';
import Exit from '../../assets/Images/letter-x-white.png';
import './Appointment.css';

const Appointment = () => {
    const { id } = useParams(); // Obtiene el ID de la mascota desde la URL
    const navigate = useNavigate();
    const [appointmentTypes, setAppointmentTypes] = useState([]); // Guardar tipos de citas
    const [selectedType, setSelectedType] = useState(''); // Tipo de cita seleccionado
    const [date, setDate] = useState(''); // Fecha de la cita
    const [hour, setHour] = useState(''); // Hora de la cita
    const [description, setDescription] = useState(''); // Descripción de la cita
    const [errors, setErrors] = useState({}); // Estado para los errores

    // Fetch para obtener los tipos de citas
    useEffect(() => {
        fetch('https://vetcarecode.azurewebsites.net/api/v1/appointmentTypes/getall')
            .then(response => response.json())
            .then(data => setAppointmentTypes(data)) // Guardar los tipos de citas en el estado
            .catch(error => console.error('Error fetching appointment types:', error));
    }, []);

    // Validar fecha y hora
    const validateFields = () => {
        const today = new Date();
        const selectedDate = new Date(date);
        const selectedHour = parseInt(hour.split(':')[0], 10); // Obtener la hora en formato de 24 horas
        let validationErrors = {};

        // Validación de fecha
        if (!date) {
            validationErrors.date = "Please select a date.";
        } else if (selectedDate < today.setHours(0, 0, 0, 0)) {
            validationErrors.date = "The appointment date cannot be in the past.";
        }

        // Validación de hora
        if (!hour) {
            validationErrors.hour = "Please select a time.";
        } else if (selectedHour < 8 || selectedHour >= 20) {
            validationErrors.hour = "The appointment time must be between 8:00 AM and 8:00 PM.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; // Retorna `true` si no hay errores
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos antes de enviar la cita
        if (!validateFields()) {
            return;
        }

        const newAppointment = {
            EndDate: date,
            Hour: hour,
            appointmentType: selectedType, // Tipo de cita seleccionado
            Description: description,
            petId: id // ID de la mascota desde la URL
        };

        // Enviar los datos de la nueva cita al servidor
        fetch('https://vetcarecode.azurewebsites.net/api/v1/appointments/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
        })
        .then(response => {
            if (response.ok) {
                alert('Appointment created successfully!');
                navigate(`/pets/${id}`); // Redirigir al perfil de la mascota
            } else {
                alert('Failed to create appointment.');
            }
        })
        .catch(error => console.error('Error creating appointment:', error));
    };

    const ClickExit = (e) => {
        e.preventDefault();
        // Redirige al perfil de la mascota usando el ID obtenido
        navigate(`/pets/${id}`);
    };

    return (
        <div className='bg-cGreen w-full h-screen flex justify-end items-end appointment'>
            <form
                onSubmit={handleSubmit}
                className='w-full md:w-3/4 lg:w-1/2 h-full flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-4 md:p-8 overflow-y-auto'>
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className='text-center text-cGreen text-3xl md:text-6xl font-MontserratBold'>
                        New appointment
                    </h2>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)} // Actualiza el tipo seleccionado
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'
                        required>
                        <option disabled selected>Select the type of specialty</option>
                        {appointmentTypes.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.name} {/* Asegúrate que 'name' corresponde a la propiedad correcta del tipo */}
                            </option>
                        ))}
                    </select>

                    {/* Mostrar error de fecha si existe */}
                    <input 
                        type="date" 
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6' 
                        required 
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                    {/* Mostrar error de hora si existe */}
                    <input 
                        type="time" 
                        value={hour}
                        onChange={(e) => setHour(e.target.value)} // Actualiza la hora
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6' 
                        required 
                        />
                        {errors.hour && <p className="text-red-500 text-sm">{errors.hour}</p>}

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Actualiza la descripción
                        placeholder='Here you can enter details about what you want to be performed or reviewed.'
                        cols="30"
                        rows="10"
                        className='w-full md:w-4/5 p-3 md:p-4 h-36 md:h-40 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'
                        required
                    ></textarea>
                    
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full md:w-4/5 h-12 md:h-14 rounded-2xl border border-cGreen bg-cGreen text-cWhite text-sm md:text-xl font-MontserratRegular mt-6 md:mt-8">
                        Save
                    </button>
                    
                    <p className='text-cGreen text-xs md:text-sm mt-4 md:mt-6 max-w-60 text-center'>
                        Remember to keep your appointment
                        15 minutes in advance.
                    </p>
                </div>
            </form>
            
            <div className="hidden md:flex flex-col justify-end items-end w-1/2 h-full">
                <div className='bg-cPurple w-14 h-14 lg:w-14 lg:h-14 px-4 py-2 rounded-full shadow-lg hover:bg-[#4e066b] transition duration-300 text-2xl lg:text-2xl fixed top-5 right-5 flex justify-center items-center text-cWhite'>
                    <button
                        onClick={ClickExit}
                        className="">
                        <img src={Exit} alt="Exit" />
                    </button>
                </div>
                <img src={Cat} alt="Cat" className="max-w-70 md:max-w-xlg h-auto" />
            </div>
        </div>
    );
}

export default Appointment;