import React, { useState } from 'react';
import axios from 'axios';
import Password from '../../assets/Images/authentication-2-99.png';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isPasswordSecure = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordSecure(newPassword)) {
            setErrorMessage(
                'Password must be at least 8 characters, include a number, an uppercase letter, a lowercase letter, and a special character.'
            );
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setErrorMessage('');

        try {
            const response = await axios.post('https://vetcare-backend.azurewebsites.net/api/Auth/ResetPassword', {
                token: token, 
                email: email, 
                newPassword: newPassword 
            });

            // Manejar la respuesta de la API
            if (response.data.success) {
                alert('Password successfully updated');
                // Redirigir al login o realizar cualquier otra acción necesaria
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error('Error connecting to API', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className='w-full min-h-screen h-fluid bg-cPurple register relative flex'>
            <div className='w-full h-fluid md:w-1/2 min-h-screen flex flex-col justify-center items-center bg-cWhite rounded-tr-3xl rounded-br-3xl p-4 md:p-10 relative z-10 space-y-4'>
                <div>
                    <h2 className="text-center text-cPurple text-4xl md:text-7xl font-MontserratBold">
                        Reset your <br />password
                    </h2>
                    <p className="text-cGray text-lg md:text-2xl font-MontserratRegular text-center mt-4 mb-8">
                        Enter your new password to log in
                    </p>
                </div>

                <form className='flex flex-col items-center space-y-4 custom' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder='example@gmail.com'
                        className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualizar el estado con el email
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder='New password'
                        className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Actualizar el estado con la nueva contraseña
                    />
                    
                    <input
                        type="password"
                        name="confirmNewPassword"
                        placeholder='Confirm new password'
                        className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)} // Actualizar el estado con la confirmación de la contraseña
                    />

                    {errorMessage && (
                        <p className='w-3/5 font-MontserratRegular text-cPurple text-center'>{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-3/5 md:min-w-96 h-14 rounded-2xl border border-cPurple bg-cPurple text-cWhite text-base md:text-xl font-MontserratRegular p-4"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className='hidden md:flex justify-center items-end w-1/2 relative'>
                <img src={Password} alt="password" />
            </div>
        </div>
    );
};

export default NewPassword;
