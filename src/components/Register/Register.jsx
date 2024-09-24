import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cat from '../../assets/Images/img-register.png';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        documentTypeId: '',
        documentNumber: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        password: '',
        roleId: 2,
    });

    const [errors, setErrors] = useState({});
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        axios.get('https://vetcare-backend.azurewebsites.net/api/v1/DocumentTypes')
            .then(response => setDocumentTypes(response.data))
            .catch(error => console.error('Error fetching document types:', error));
    }, []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(password);

    const validateAge = (birthDate) => {
        const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
        return age >= 18;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.documentTypeId) newErrors.documentTypeId = 'Document type is required';
        if (!formData.documentNumber) newErrors.documentNumber = 'Document number is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.email || !validateEmail(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.birthDate) {
            newErrors.birthDate = 'Date of birth is required';
        } else if (!validateAge(formData.birthDate)) {
            newErrors.birthDate = 'You must be at least 18 years old';
        }
        if (!formData.password || !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitFormData = async () => {
        try {
            const response = await axios.post('https://vetcare-backend.azurewebsites.net/api/Auth/Register', {
                ...formData,
                documentTypeId: parseInt(formData.documentTypeId),
            });

            if (response.status === 200) {
                alert('Form submitted successfully!');
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error);
            if (error.response?.data?.errors) {
                console.error('Validation Errors:', error.response.data.errors);
                alert('Validation Errors: ' + JSON.stringify(error.response.data.errors));
            } else {
                alert('Failed to submit form');
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData); // Imprime el contenido del formulario
        if (validateForm()) {
            submitFormData();
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Changed ${name} to ${value}`);
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Mantenerlo como cadena para cualquier campo
        }));
    };




    return (
        <div className="w-full h-fluid min-h-screen bg-cPurple flex flex-col md:flex-row register relative">
            <div className="w-full md:w-1/2 h-fluid min-h-screen flex flex-col justify-center items-center bg-cWhite rounded-tr-3xl rounded-br-3xl p-4 md:p-10 relative z-10">
                <h2 className="text-center text-cPurple text-4xl md:text-7xl font-MontserratBold">
                    Create Account
                </h2>
                <p className="text-cGray text-lg md:text-2xl font-MontserratRegular text-center mt-4">
                    Please give us basic information. Thanks!
                </p>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className='flex flex-col items-center space-y-4 custom'>
                        <input
                            type="text"
                            name='name'
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular mt-6"
                        />
                        {errors.name && <p className='font-MontserratRegular text-cPurple'>{errors.name}</p>}

                        <input
                            type="text"
                            name='lastName'
                            placeholder="LastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.lastName && <p className='font-MontserratRegular text-cPurple'>{errors.lastName}</p>}

                        <select
                            name="documentTypeId"
                            value={formData.documentTypeId}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        >
                            <option value="" disabled>Document Type</option>
                            {documentTypes.length > 0 && documentTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>

                        {errors.documentTypeId && <p className='font-MontserratRegular text-cPurple'>{errors.documentTypeId}</p>}

                        <input
                            type="text"
                            name='documentNumber'
                            placeholder="Document Number"
                            value={formData.documentNumber}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.documentNumber && <p className='font-MontserratRegular text-cPurple'>{errors.documentNumber}</p>}

                        <input
                            type="text"
                            name='phoneNumber'
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.phoneNumber && <p className='font-MontserratRegular text-cPurple'>{errors.phoneNumber}</p>}

                        <input
                            type="text"
                            name='email'
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.email && <p className='font-MontserratRegular text-cPurple'>{errors.email}</p>}

                        <input
                            type="date"
                            name='birthDate'
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.birthDate && <p className='font-MontserratRegular text-cPurple'>{errors.birthDate}</p>}

                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.password && <p className='font-MontserratRegular text-cPurple'>{errors.password}</p>}

                        <button
                            type="submit"
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border-0 text-cWhite bg-cPurple text-base md:text-base font-MontserratRegular cursor-pointer hover:bg-cDarkPurple transition duration-200 ease-in-out">
                            Save
                        </button>
                        <p className='text-cGray text-xl'>Do you have an account? <Link to="/" className='text-cPurple'>Log in</Link></p>
                    </div>
                </form>
            </div>
            <div className="hidden md:flex justify-end items-end w-1/2 h-full relative">
                <img src={Cat} alt="Cat" className="cat-image" />
            </div>
        </div>
    );
};

export default Register;
