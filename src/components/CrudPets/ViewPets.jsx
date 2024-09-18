import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import './ViewPets.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Importación correcta
import DogCat from '../../assets/Images/dog-and-cat.png';
import Plus from '../../assets/Images/plus-white.png';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                // Obtén el token desde el localStorage
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error("No se encontró un token de usuario");
                    return;
                }

                // Decodifica el token para obtener el user_id
                const decoded = jwtDecode(token); 
                const userId = decoded.Id || decoded.id;  // Asegúrate de que el campo sea correcto

                console.log("User ID:", userId);

                // Llamada a la API para obtener las mascotas del usuario
                const response = await axios.get(`https://vetcarecode.azurewebsites.net/api/v1/Pet/petByUserId/${userId}`);
                
                console.log("Response:", response.data);
                
                // Actualiza el estado con los datos obtenidos de la API
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        fetchPets();
    }, []);

    const goToAddPet = () => {
        navigate("/add-pet");
    };

    const petInfo = (id) => {
        navigate(`/pets/${id}`);
    };

    return (
        <div className="bg-cWhite w-full h-fluid min-h-screen">
            <Nav />
            <main className="flex flex-col items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                    {pets.length > 0 ? (
                        pets.map((pet, index) => {
                            const colorClass = index % 4 === 0 || index % 4 === 3 ? 'bg-cPurple' : 'bg-cGreen';
                            const imgBgClass = index % 4 === 0 || index % 4 === 3 ? 'purple-bg' : 'green-bg';

                            return (
                                <div
                                    key={pet.id}
                                    className={`relative ${colorClass} ${imgBgClass} rounded-custom p-4 shadow-md flex items-center w-[550px] h-72 cards`}
                                >
                                    <div className="ml-10">
                                        <h2 className="text-cYellow font-bold text-7xl capitalize">{pet.name}</h2>
                                        <button
                                            onClick={() => petInfo(pet.id)}
                                            className="mt-6 text-cYellow px-7 py-2 rounded-full hover:scale-105 transition duration-300 font-MontserratSemibold border-2 border-cYellow learn">
                                            Learn more
                                        </button>
                                    </div>
                                    <img
                                        src={pet.imagePath}
                                        alt={pet.name}
                                        className="w-80 h-80 object-cover ml-10 mb-24"
                                        onError={(e) => { e.target.src = DogCat; }}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p className="font-MontserratRegular text-5xl mt-10 text-center text-cGray">
                            You do not have any registered pet yet.
                        </p>
                    )}
                </div>
                <button
                    onClick={goToAddPet}
                    className="fixed bottom-4 right-4 bg-cGreen text-white px-4 py-2 rounded-full shadow-lg hover:bg w-14 h-14 flex justify-center items-center">
                    <img src={Plus} alt="Add user" />
                </button>
            </main>
        </div>
    );
};

export default PetList;
