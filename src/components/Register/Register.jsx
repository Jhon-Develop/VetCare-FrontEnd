import React, { useState } from 'react';
import Cat from '../../assets/Images/img-register.png';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        documentType: '',
        documentNumber: '',
        phoneNumber: '',
        email: '',
        dateBirthday: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // Función para validar el correo electrónico
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función para validar la contraseña segura
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Función para validar la edad (mayor de 18 años)
    const validateAge = (dateBirthday) => {
        const birthDate = new Date(dateBirthday);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    // Función para validar el formulario completo
    const validateForm = () => {
        const newErrors = {};

        // Validar nombre y apellido
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.lastname) newErrors.lastname = 'Last name is required';

        // Validar tipo de documento
        if (!formData.documentType) newErrors.documentType = 'Document type is required';

        // Validar número de documento
        if (!formData.documentNumber) newErrors.documentNumber = 'Document number is required';

        // Validar número de teléfono
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';

        // Validar email
        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        // Validar fecha de nacimiento (mayor de 18 años)
        const age = validateAge(formData.dateBirthday);
        if (!formData.dateBirthday) {
            newErrors.dateBirthday = 'Date of birth is required';
        } else if (age < 18) {
            newErrors.dateBirthday = 'You must be at least 18 years old';
        }

        // Validar contraseña segura
        if (!formData.password || !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters, include a number, an uppercase letter, a lowercase letter, and a special character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Función para enviar los datos del formulario a la API
    const submitFormData = async () => {
        try {
            const response = await fetch('https://your-api-endpoint.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Form submitted successfully!');
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit form');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            submitFormData(); // Llama a la función para enviar los datos
        } else {
            console.error('Form has errors, please fix them.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="w-full h-fit bg-cPurple flex flex-col md:flex-row register relative">
            <div className="w-full md:w-1/2 h-fit flex flex-col justify-center items-center bg-cWhite rounded-tr-3xl rounded-br-3xl p-4 md:p-10 relative z-10">
                <h2 className="text-center text-cPurple text-4xl md:text-7xl font-MontserratBold">
                    Create Account
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
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.name && <p className='font-MontserratRegular text-cPurple'>{errors.name}</p>}

                        <input
                            type="text"
                            name='lastname'
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.lastname && <p className='font-MontserratRegular text-cPurple text-center'>{errors.lastname}</p>}

                        <select
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular">
                            <option value="" disabled>Document Type</option>
                            {/* {documentTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))} */}
                        </select>
                        {errors.documentType && <p className='font-MontserratRegular text-cPurple text-center'>{errors.documentType}</p>}

                        <input
                            type="text"
                            name='documentNumber'
                            placeholder="Document Number"
                            value={formData.documentNumber}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.documentNumber && <p className='font-MontserratRegular text-cPurple text-center'>{errors.documentNumber}</p>}

                        <input
                            type="text"
                            name='phoneNumber'
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.phoneNumber && <p className='font-MontserratRegular text-cPurple text-center'>{errors.phoneNumber}</p>}

                        <input
                            type="text"
                            name='email'
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.email && <p className='font-MontserratRegular text-cPurple text-center'>{errors.email}</p>}

                        <input
                            type="date"
                            name='dateBirthday'
                            value={formData.dateBirthday}
                            onChange={handleInputChange}
                            max={new Date().toISOString().split("T")[0]}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.dateBirthday && <p className='font-MontserratRegular text-cPurple text-center'>{errors.dateBirthday}</p>}

                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        />
                        {errors.password && <p className='font-MontserratRegular text-cPurple text-center'>{errors.password}</p>}

                        <button
                            type="submit"
                            className="flex items-center justify-center w-3/5 md:min-w-96 h-14 rounded-2xl border border-cPurple bg-cPurple text-cWhite text-base md:text-xl font-MontserratRegular p-4"
                        >
                            Save
                        </button>
                    </div>
                </form>

                <p className="text-center text-cGray font-MontserratRegular text-base md:text-xl mt-7">
                    Do you have an account?{' '}
                    <a href="#" className="text-cPurple hover:underline font-MontserratRegular">
                        Login
                    </a>
                </p>
            </div>
            <div className="hidden md:flex justify-end items-end w-1/2 h-full relative">
                <img
                    src={Cat}
                    alt="Cat"
                    className="cat-image"
                />
            </div>

        </div>
    );
};

export default Register;
