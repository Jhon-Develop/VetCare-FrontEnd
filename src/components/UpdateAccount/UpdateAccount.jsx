import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa useParams
import { jwtDecode } from 'jwt-decode';
import Cat from '../../assets/Images/img-register.png';

const UpdateAccount = () => {
    const { id } = useParams(); // Obtén el ID de la URL
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        documentTypeId: '',
        documentNumber: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        password: '',
    });

    const [documentTypes, setDocumentTypes] = useState([]);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateAge = (birthDate) => {
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const month = today.getMonth() - birthDateObj.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
            return age - 1;
        }
        return age;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.documentTypeId) newErrors.documentTypeId = 'Document type is required';
        if (!formData.documentNumber) newErrors.documentNumber = 'Document number is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.email || !validateEmail(formData.email)) newErrors.email = 'Valid email is required';

        const age = validateAge(formData.birthDate);
        if (!formData.birthDate) {
            newErrors.birthDate = 'Date of birth is required';
        } else if (age < 18) {
            newErrors.birthDate = 'You must be at least 18 years old';
        }

        if (formData.password && !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters, include a number, an uppercase letter, a lowercase letter, and a special character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/users/${id}`); // Usa el ID de la URL
            const user = response.data;
            setFormData({
                name: user.name || '',
                lastName: user.lastName || '',
                documentTypeId: user.documentTypeId || '',
                documentNumber: user.documentNumber || '',
                phoneNumber: user.phoneNumber || '',
                email: user.email || '',
                birthDate: user.birthDate || '',
                password: '',
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchDocumentTypes = async () => {
        try {
            const response = await axios.get('https://vetcare-backend.azurewebsites.net/api/v1/DocumentTypes');
            setDocumentTypes(response.data);
        } catch (error) {
            console.error('Error fetching document types:', error);
        }
    };

    const updateUserData = async () => {
        try {
            const updatedData = { ...formData };
            if (!updatedData.password) {
                delete updatedData.password;
            }
            const response = await axios.put(`https://vetcare-backend.azurewebsites.net/api/v1/users/${id}`, updatedData); // Usa el ID de la URL
            alert('Account updated successfully!');
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update account');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            updateUserData();
        } else {
            console.error('Form has errors, please fix them.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        fetchUserData();
        fetchDocumentTypes();
    }, [id]); // Ejecutar nuevamente si el ID cambia

    return (
        <div>
            <div className="w-full h-fluid min-h-screen bg-cGreen flex flex-col md:flex-row login relative">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-8 relative z-10">
                    <h2 className="text-center text-cGreen text-4xl md:text-7xl font-bold">
                        Update Account
                    </h2>
                    <p className="text-cGray text-lg md:text-2xl text-center mt-4">
                        Please give us basic information. Thanks!
                    </p>
                    <form onSubmit={handleSubmit} className="w-full mt-4">
                        <div className='flex flex-col items-center space-y-4'>
                            {Object.entries(formData).map(([key, value]) => (
                                key !== 'password' ? (
                                    <input
                                        key={key}
                                        type={key === 'birthDate' ? 'date' : 'text'}
                                        name={key}
                                        placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base font-MontserratRegular"
                                    />
                                ) : (
                                    <input
                                        key={key}
                                        type="password"
                                        name={key}
                                        placeholder="Password (optional)"
                                        value={value}
                                        onChange={handleInputChange}
                                        className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base font-MontserratRegular"
                                    />
                                )
                            ))}
                            <button type="submit" className="bg-cGreen text-white w-3/5 md:min-w-96 h-14 rounded-2xl hover:bg-green-600 transition duration-200 font-MontserratSemibold">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="hidden md:flex justify-end items-end w-1/2 h-full relative">
                    <img
                        src={Cat}
                        alt="Cat"
                        className="cat-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;
