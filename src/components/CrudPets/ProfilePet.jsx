import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Modal from '../Modal/Modal';
import Sex from '../../assets/Images/generos.png';
import Birthday from '../../assets/Images/birthday.png';
import Weight from '../../assets/Images/escala-de-peso.png';
import Footprint from '../../assets/Images/patas.png';
import Folder from '../../assets/Images/folder-white.png';
import Plus from '../../assets/Images/plus-white.png';
import DogCat from '../../assets/Images/dog-and-cat.png';

const ProfilePet = () => {
    const { id } = useParams();
    const [petData, setPetData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemType, setItemType] = useState("Pet");
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const navigate = useNavigate();

    const getAuthToken = () => {
        return localStorage.getItem("token");
    };

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const token = getAuthToken(); 
                const response = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/Pet/petById/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPetData(response.data);
            } catch (error) {
                console.error("Error fetching pet data:", error);
            }
        };

        fetchPetData();
    }, [id]);

    useEffect(() => {
        const fetchAppointmentsData = async () => {
            try {
                const token = getAuthToken(); 
                const response = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/appointments/getbypetid/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                
                // Verifica la respuesta de las citas
                console.log("Appointments response:", response.data);
                
                const appointmentsWithTypeNames = await Promise.all(response.data.map(async (appointment) => {
                    console.log("Appointment Type ID:", appointment.appointmentTypeId); // Log del ID
                    const appointmentTypeResponse = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/appointmentTypes/getbyid/${appointment.appointmentTypeId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Appointment Type Name:", appointmentTypeResponse.data.name);
                    return {
                        ...appointment,
                        typeName: appointmentTypeResponse.data.name
                    };
                }));
                setAppointments(appointmentsWithTypeNames);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointmentsData();
    }, [id]);

    useEffect(() => {
        if (deleteConfirmed) {
            const deletePet = async () => {
                try {
                    await axios.delete(`https://vetcare-backend.azurewebsites.net/api/v1/Pet/DeletePet/${id}`);
                    navigate("/pets");
                } catch (error) {
                    console.error("Error deleting pet:", error);
                } finally {
                    setDeleteConfirmed(false);
                }
            };

            deletePet();
        }
    }, [deleteConfirmed, id, navigate]);

    if (!petData) {
        return <p className='flex justify-center items-center mt-20 text-cPurple font-MontserratBold text-7xl'>Loading...</p>;
    }

    const handleDeleteClick = (type) => {
        setItemType(type);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setDeleteConfirmed(true);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const handleEditClick = () => {
        navigate(`/pets/${id}/update`);
    };

    const makeAppointment = () => {
        navigate(`/pets/${id}/appointment`);
    };

    return (
        <div className='bg-cWhite w-full h-full'>
            <Nav />
            <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-72 mt-20 px-5">
                <div className="w-full lg:w-1/2">
                    <div className='text-center'>
                        <h2 className='font-MontserratBold text-3xl lg:text-5xl text-cPurple mb-10 capitalize'>{petData.name}</h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-5 gap-4 place-items-center">
                        <div className='w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end'>
                            <img src={Footprint} alt="Footprint" />
                        </div>
                        <div className='text-cPurple justify-self-start'>
                            <h2 className='text-2xl font-MontserratRegular'>Breed</h2>
                            <p className='font-MontserratBold text-3xl lg:text-5xl capitalize'>{petData.breed}</p>
                        </div>
                        <div className="row-start-2 w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end">
                            <img src={Birthday} alt="Birthday" />
                        </div>
                        <div className="row-start-2 text-cPurple justify-self-start">
                            <h2 className='text-2xl font-MontserratRegular'>Date Birthday</h2>
                            <p className='font-MontserratBold text-3xl lg:text-5xl'>{new Date(petData.birthDate).toLocaleDateString()}</p>
                        </div>
                        <div className="row-start-3 w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end">
                            <img src={Weight} alt="Weight" />
                        </div>
                        <div className="row-start-3 text-cPurple justify-self-start">
                            <h2 className='text-2xl font-MontserratRegular'>Weight</h2>
                            <p className='font-MontserratBold text-3xl lg:text-5xl'>{petData.weight} lb</p>
                        </div>
                        <div className="row-start-4 w-14 h-14 lg:w-20 lg:h-20 flex items-end justify-self-end">
                            <img src={Sex} alt="Sex" />
                        </div>
                        <div className="row-start-4 text-cPurple justify-self-start">
                            <h2 className='text-2xl font-MontserratRegular'>Sex</h2>
                            <p className='font-MontserratBold text-3xl lg:text-5xl capitalize'>{petData.sex}</p>
                        </div>
                        <div className='row-start-5 self-start justify-self-end'>
                            <button onClick={handleEditClick} className='bg-cWhite text-cGreen px-4 lg:px-6 py-1 lg:py-2 rounded-2xl border-2 border-cGreen'>
                                <h2 className='font-MontserratRegular text-lg lg:text-2xl'>Edit</h2>
                            </button>
                        </div>
                        <div className='row-start-5 self-start justify-self-start'>
                            <button className='bg-cGreen text-cWhite px-4 lg:px-4 py-1 lg:py-2 rounded-2xl border-2 border-cGreen' onClick={() => handleDeleteClick("Pet")}>
                                <h2 className='font-MontserratRegular text-lg lg:text-2xl'>Delete</h2>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-12 w-full lg:w-1/2 h-auto'>
                    <div className='bg-cYellow w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] rounded-full relative flex justify-center items-center'>
                        <img
                            src={petData.imagePath}
                            alt={petData.name}
                            className="h-full object-cover absolute z-1 bottom-[-5rem] absolute top-0 rounded-custom"
                            onError={(e) => { e.target.src = DogCat; }}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-12 mt-10 lg:mt-20'>
                <h2 className='text-cPurple font-MontserratBold text-4xl lg:text-7xl'>
                    Appointments
                </h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mb-20'>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment.id} className='bg-cGreen flex gap-x-8 justify-center items-center rounded-2xl p-5'>
                                <div>
                                <img src={Folder} alt="Folder" className="w-10 h-10" />
                                </div>
                                <div>
                                <h2 className='font-MontserratBold text-xl text-cWhite'>Type: {appointment.typeName}</h2>
                                <h2 className='font-MontserratBold text-xl text-cWhite'>Date: {new Date(appointment.endDate).toLocaleDateString()}</h2>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-cPurple text-center font-MontserratRegular'>No appointments found.</p>
                    )}
                </div>
                <button
                    onClick={makeAppointment}
                    className="fixed bottom-4 right-4 bg-cPurple text-white px-4 py-4 rounded-full shadow-lg"
                >
                    <img src={Plus} alt="Plus" className="w-6 h-6" />
                </button>
            </div>
            {showModal && (
                <Modal
                    itemType={itemType}
                    itemId={id}
                    onDeleteSuccess={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default ProfilePet;
