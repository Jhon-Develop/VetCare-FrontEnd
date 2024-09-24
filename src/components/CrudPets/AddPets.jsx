import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import Dog from '../../assets/Images/pets-register.png';
import Exit from '../../assets/Images/letter-x-white.png';
import './AddPets.css';

const AddPets = () => {
    const navigate = useNavigate();

    const ClickExit = (e) => {
        e.preventDefault();
        navigate('/pets');
    };

    const [pet, setPet] = useState({
        name: '',
        breed: '',
        weight: '',
        birthDate: '',
        sex: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [uploadError, setUploadError] = useState(null); // Para manejar errores en la subida de imagen

    // Validaciones de campos vacíos
    const validateFields = () => {
        const errors = {};
        if (!pet.name) errors.name = "Name is required";
        if (!pet.breed) errors.breed = "Breed is required";
        if (!pet.weight) errors.weight = "Weight is required";
        if (!pet.birthDate) errors.birthDate = "Birthdate is required";
        if (!pet.sex) errors.sex = "Sex is required";
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setUploadError('Please upload a valid image');
                return;
            }
            setPet({ ...pet, image: file });
            setImagePreview(URL.createObjectURL(file));
            setUploadError(null);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No se encontró un token de usuario en localStorage");
            return;
        }

        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded); // Verifica el contenido del token decodificado
        const user_id = decoded.Id;
        if (!user_id) {
            console.error("No se encontró el ID de usuario (nameid) en el token decodificado");
            return;
        }

        const formData = new FormData();
        formData.append('name', pet.name);
        formData.append('breed', pet.breed);
        formData.append('weight', pet.weight);
        formData.append('birthDate', pet.birthDate);
        formData.append('sex', pet.sex);
        if (pet.image) formData.append('image', pet.image); // Verifica que la imagen esté
        formData.append('user_id', user_id);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.post('https://vetcare-backend.azurewebsites.net/api/v1/Pet/CreatePet', formData, config);

        if (response.status === 201) {
            alert('Pet successfully added');
            navigate('/pets');
        } else {
            console.error("Error en la respuesta del servidor:", response);
            alert('There was an error adding the pet. Please try again.');
        }

    } catch (error) {
        console.error("Error agregando la mascota:", error.response ? error.response.data : error.message);
        alert('There was an error adding the pet. Please try again.');
    }
};


    return (
        <div className="bg-cPurple w-full h-fluid min-h-screen flex justify-end items-end addPets">
            <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-1/2 h-fluid min-h-screen flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-4 md:p-8 sm:h-screen overflow-y-auto">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-center text-cPurple text-3xl md:text-6xl md:mt-24 font-MontserratBold">
                        We Love <br /> Your Pets!
                    </h2>
                    <p className="text-cBlack text-base md:text-2xl font-MontserratRegular text-center mt-2 md:mt-4">
                        Please give us basic information. Thanks!
                    </p>

                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        value={pet.name}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cPurple text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {errors.name && <p className="text-red-500 text-xs md:text-sm">{errors.name}</p>}

                    <input
                        type="text"
                        name="breed"
                        placeholder='Breed'
                        value={pet.breed}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cPurple text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {errors.breed && <p className="text-red-500 text-xs md:text-sm">{errors.breed}</p>}

                    <input
                        type="number"
                        name="weight"
                        placeholder='Weight'
                        value={pet.weight}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cPurple text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {errors.weight && <p className="text-red-500 text-xs md:text-sm">{errors.weight}</p>}

                    <input
                        type="date"
                        name="birthDate"
                        value={pet.birthDate}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cPurple text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                        max={new Date().toISOString().split("T")[0]} // Solo la parte de la fecha
                    />
                    {errors.birthDate && <p className="text-red-500 text-xs md:text-sm">{errors.birthDate}</p>}

                    <select
                        name="sex"
                        value={pet.sex}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cPurple text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    >
                        <option value="" disabled>Select sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.sex && <p className="text-red-500 text-xs md:text-sm">{errors.sex}</p>}

                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cPurple text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {uploadError && <p className="text-red-500 text-xs md:text-sm">{uploadError}</p>}

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-24 h-24 md:w-32 md:h-32 mt-4 object-cover"
                        />
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full md:w-4/5 h-12 md:h-14 rounded-2xl border border-cPurple bg-cPurple text-cWhite text-sm md:text-lg mt-6"
                    >
                        Add Pet
                    </button>

                </div>
            </form>
            <div className='hidden md:flex justify-end items-end w-1/2 h-full'>
                <div className='bg-cGreen w-14 h-14 lg:w-14 lg:h-14 px-4 py-2 rounded-full shadow-lg hover:bg-[#039978] transition duration-300 text-2xl lg:text-2xl fixed top-5 right-5 flex justify-center items-center text-cWhite'>
                    <button
                        onClick={ClickExit}
                        className="">
                        <img src={Exit} alt="Add user" />
                    </button>
                </div>
                <img src={Dog} alt="Dog" className="max-w-xs md:max-w-lg h-auto" />
            </div>
        </div>
    );
};

export default AddPets;
