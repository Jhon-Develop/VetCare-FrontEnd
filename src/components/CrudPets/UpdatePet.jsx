import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Dog from '../../assets/Images/pets-register.png';
import Exit from '../../assets/Images/letter-x-white.png';
import './UpdatePet.css';

const UpdatePet = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el id de la mascota de la URL

    const [pet, setPet] = useState({
        name: '',
        breed: '',
        weight: '',
        birthDate: '',
        sex: '',
        image: null,
    });

    const [originalPet, setOriginalPet] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [uploadError, setUploadError] = useState(null);

    // Cargar la información de la mascota por ID
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                };

                const response = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/Pet/petById/${id}`, config);
                const petData = response.data;

                setPet(petData);  // Llenar los campos con la data de la mascota
                setOriginalPet(petData);  // Guardar los datos originales para comparaciones
                if (petData.image) {
                    setImagePreview(petData.image); // Si ya tiene una imagen, mostrar la previa
                }
            } catch (error) {
                console.error("Error al obtener los datos de la mascota:", error);
            }
        };

        fetchPetData();
    }, [id]);

    const ClickExit = (e) => {
        e.preventDefault();
        navigate(`/pets/${id}`);
    };

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
            const user_id = decoded.Id;
            if (!user_id) {
                console.error("No se encontró el ID de usuario (nameid) en el token decodificado");
                return;
            }

            const formData = new FormData();
            formData.append('name', pet.name || originalPet.name);
            formData.append('breed', pet.breed || originalPet.breed);
            formData.append('weight', pet.weight || originalPet.weight);
            formData.append('birthDate', pet.birthDate || originalPet.birthDate);
            formData.append('sex', pet.sex || originalPet.sex);
            if (pet.image !== null && pet.image !== originalPet.image) {
                formData.append('image', pet.image);
            }
            formData.append('user_id', user_id);

            console.log("Datos del formulario:", Array.from(formData.entries())); // Verifica el contenido de FormData

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.put(`https://vetcare-backend.azurewebsites.net/api/v1/Pet/UpdatePet/${id}`, formData, config);

            console.log("Respuesta del servidor:", response); // Verifica la respuesta del servidor

            if (response.status === 200) {
                alert('Mascota actualizada exitosamente');
                navigate('/pets');
            } else {
                console.error("Error en la respuesta del servidor:", response);
                alert('Hubo un error al actualizar la mascota. Por favor, inténtalo de nuevo.');
            }

        } catch (error) {
            console.error("Error actualizando la mascota:", error.response ? error.response.data : error.message);
            alert('Hubo un error al actualizar la mascota. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="bg-cGreen w-full h-fluid min-h-screen flex justify-end items-end UpdatePets">
            <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-1/2 h-full flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-4 md:p-8 sm:h-screen overflow-y-auto">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-center text-cGreen text-3xl md:text-6xl md:mt-24 font-MontserratBold">
                        Update account
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
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {errors.name && <p className="text-red-500 text-xs md:text-sm">{errors.name}</p>}

                    <input
                        type="text"
                        name="breed"
                        placeholder='Breed'
                        value={pet.breed}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {errors.breed && <p className="text-red-500 text-xs md:text-sm">{errors.breed}</p>}

                    <input
                        type="number"
                        name="weight"
                        placeholder='Weight'
                        value={pet.weight}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    />
                    {errors.weight && <p className="text-red-500 text-xs md:text-sm">{errors.weight}</p>}

                    <input
                        type="date"
                        name="birthDate"
                        disabled
                        value={pet.birthDate}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                        max={new Date().toISOString().split("T")[0]}
                    />
                    {errors.birthDate && <p className="text-red-500 text-xs md:text-sm">{errors.birthDate}</p>}

                    <select
                        name="sex"
                        value={pet.sex}
                        onChange={handleInputChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
                    >
                        <option value="" disabled selected>Select sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.sex && <p className="text-red-500 text-xs md:text-sm">{errors.sex}</p>}

                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6"
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
                        className="flex items-center justify-center w-full md:w-4/5 h-12 md:h-14 rounded-2xl border border-transparent bg-cGreen text-cWhite text-sm md:text-lg mt-6"
                    >
                        Save
                    </button>

                </div>
            </form>
            <div className='hidden md:flex justify-end items-end w-1/2 h-full'>
                <div className='bg-cPurple w-14 h-14 lg:w-14 lg:h-14 px-4 py-2 rounded-full shadow-lg hover:bg-[#4e066b] transition duration-300 text-2xl lg:text-2xl fixed top-5 right-5 flex justify-center items-center text-cWhite'>
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

export default UpdatePet;
