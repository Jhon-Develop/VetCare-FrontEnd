import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cat from '../../assets/Images/img-register.png';

const UpdateAccount = () => {
    const [userId, setUserId] = useState(null);
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

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.Id;
        }
        return null;
    };

    const fetchUserData = async () => {
        const id = getUserIdFromToken();
        if (!id) {
            console.error('User ID is missing');
            return;
        }
        setUserId(id);

        try {
            const response = await axios.get(`https://vetcare-backend.azurewebsites.net/api/v1/users/${id}`);
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
            const response = await axios.put(`https://vetcare-backend.azurewebsites.net/api/v1/users/${userId}`, updatedData);
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
    }, []);

    return (
        <div>
            <div className="w-full h-fit bg-cGreen flex flex-col md:flex-row login relative">
                <div className="hidden md:flex justify-end items-center w-1/2 h-full relative" data-aos="fade-left">
                    <img
                        src={Cat}
                        alt="Cat"
                        className="cat-image"
                    />
                </div>
                <div className="w-full md:w-1/2 h-fit flex flex-col justify-center items-center bg-cWhite rounded-tl-3xl rounded-bl-3xl p-4 md:p-10 relative z-10" data-aos="fade-right">
                    <h2 className="text-center text-cGreen text-4xl md:text-7xl font-MontserratBold">
                        Update Account
                    </h2>
                    <p className="text-cGray text-lg md:text-2xl font-MontserratRegular text-center mt-4">
                        Please give us basic information. Thanks!
                    </p>
                    <br />
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className='flex flex-col items-center space-y-4 custom'>
                            <input
                                type="text"
                                name='name'
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.name && <p className="text-red-500 text-xs md:text-sm">{errors.name}</p>}

                            <input
                                type="text"
                                name='lastName'
                                placeholder="LastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.lastName && <p className="text-red-500 text-xs md:text-sm">{errors.lastName}</p>}

                            <select
                                name="documentTypeId"
                                value={formData.documentTypeId}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            >
                                <option value="" disabled>Document Type</option>
                                {documentTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            {errors.documentTypeId && <p className="text-red-500 text-xs md:text-sm">{errors.documentTypeId}</p>}

                            <input
                                type="text"
                                name='documentNumber'
                                placeholder="Document Number"
                                value={formData.documentNumber}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.documentNumber && <p className="text-red-500 text-xs md:text-sm">{errors.documentNumber}</p>}

                            <input
                                type="text"
                                name='phoneNumber'
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs md:text-sm">{errors.phoneNumber}</p>}

                            <input
                                type="text"
                                name='email'
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.email && <p className="text-red-500 text-xs md:text-sm">{errors.email}</p>}

                            <input
                                type="date"
                                name='birthDate'
                                value={formData.birthDate}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.birthDate && <p className="text-red-500 text-xs md:text-sm">{errors.birthDate}</p>}

                            <input
                                type="password"
                                name='password'
                                placeholder="Password (optional)"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cGreen text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                                data-aos="zoom-in"
                            />
                            {errors.password && <p className="text-red-500 text-xs md:text-sm">{errors.password}</p>}

                            <button type="submit" className="bg-cGreen text-white w-3/5 md:min-w-96 h-14 rounded-2xl hover:bg-green-600 transition duration-200" data-aos="zoom-in">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;
