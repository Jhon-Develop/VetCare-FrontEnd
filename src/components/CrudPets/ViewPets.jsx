import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import './ViewPets.css';
import axios from 'axios';


const PetList = () => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    // Llamada al backend para obtener las mascotas
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('');
                console.log(response.data);
                const filteredPets = response.data.map((pet) => ({
                    id: pet.id,
                    name: pet.name,
                    image: pet.imageUrl
                }));
                setPets(filteredPets);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        fetchPets();
    }, []);

    // Función que redirige a la vista de agregar mascotas
    const goToAddPet = () => {
        navigate("/add-pet");
    };

    const petInfo = () => {
        navigate("/");
    };

    return (
        <div className="bg-cWhite w-full h-screen">
            <Nav />
            <main className="flex flex-col items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                    {pets.length > 0 ? (
                        pets.map((pet, index) => (
                            <div
                                key={pet.id}
                                className={`${index % 2 === 0 ? 'bg-cPurple' : 'bg-cGreen before:rgba(7, 216, 174, 0.707)'} rounded-custom p-4 shadow-md flex items-center w-[550px] h-72 cards`}>
                                <div className="ml-10">
                                    <h2 className="text-cYellow font-bold text-7xl">{pet.name}</h2>
                                    <button 
                                    onClick={petInfo}
                                    className="mt-6 text-cYellow px-7 py-2 rounded-full hover:scale-105 transition duration-300 font-MontserratSemibold border-2 border-cYellow learn">
                                        Learn more
                                    </button>
                                </div>
                                <img src={pet.image} alt={pet.name} className="w-80 h-80 object-cover ml-10 mb-24" />
                            </div>
                        ))
                    ) : (
                        <p className="text-cBlack font-MontserratRegular text-5xl mt-10">
                            You have no pets registered yet.
                        </p>
                    )}
                </div>
                <button
                    onClick={goToAddPet}
                    className="bg-cGreen text-white w-16 h-14 rounded-full shadow-lg hover:bg-[#039978] transition duration-300 text-5xl fixed bottom-5 right-5 flex justify-center">
                    &#43;
                </button>
            </main>
        </div>
    );
};

export default PetList;
