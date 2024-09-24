import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import './ViewPets.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Importación correcta
import DogCat from '../../assets/Images/dog-and-cat.png';
import Plus from '../../assets/Images/plus-white.png';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No se encontró un token de usuario");
                    return;
                }

                const decoded = jwtDecode(token);
                const userId = decoded.Id || decoded.id;

                const response = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/Pet/petByUserId/${userId}`);
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
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                    {pets.length > 0 ? (
                        pets.map((pet, index) => {
                            const colorClass = index % 4 === 0 || index % 4 === 3 ? 'bg-cPurple' : 'bg-cGreen';
                            const imgBgClass = index % 4 === 0 || index % 4 === 3 ? 'purple-bg' : 'green-bg';

                            return (
                                <div
                                    key={pet.id}
                                    className={`relative ${colorClass} ${imgBgClass} rounded-custom p-4 shadow-md flex items-center w-full sm:w-full md:w-[550px] h-60 sm:h-64 md:h-72 cards`}
                                >
                                    <div className="ml-4 sm:ml-8 md:ml-10">
                                        <h2 className="text-cYellow font-bold text-3xl sm:text-5xl md:text-7xl capitalize">
                                            {pet.name}
                                        </h2>
                                        <button
                                            onClick={() => petInfo(pet.id)}
                                            className="mt-4 md:mt-6 text-cYellow px-4 py-2 md:px-7 md:py-2 rounded-full hover:scale-105 transition duration-300 font-MontserratSemibold border-2 border-cYellow learn">
                                            Learn more
                                        </button>
                                    </div>
                                    <img
                                        src={pet.imagePath}
                                        alt={pet.name}
                                        className="w-32 h-32 sm:w-44 sm:h-44 md:w-72 md:h-72 object-cover mb-16 md:mb-20 rounded-custom"
                                        onError={(e) => { e.target.src = DogCat; }}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p className="font-MontserratRegular text-2xl sm:text-3xl md:text-5xl mt-10 text-center text-cGray">
                            You do not have any registered pet yet.
                        </p>
                    )}
                </div>
                <button
                    onClick={goToAddPet}
                    className="fixed bottom-4 right-4 bg-cGreen text-white rounded-full shadow-lg hover:bg-[#039978] w-12 h-12 md:w-14 md:h-14 flex justify-center items-center transition duration-300 z-10">
                    <img src={Plus} alt="Add user" className="w-6 h-6 md:w-8 md:h-8 flex " />
                </button>
            </main>
        </div>
    );
};

export default PetList;
