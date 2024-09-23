import React, { useState, useEffect } from 'react';
import Dog from '../../assets/Images/img-login.png';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Iniciar sesión
    const handleLogin = async () => {
        try {
            const response = await fetch('https://vetcare-backend.azurewebsites.net/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Asegúrate de que estos campos son los correctos
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || 'Error en el login');
                return;
            }
    
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Login exitoso');
            window.location.href = '/Home';
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Ocurrió un error, por favor intenta de nuevo.');
        }
    };

    // Detectar "Enter" para login
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password]);

    // Redirigir a /register con el botón de Sign Up
    const handleSignUp = () => {
        window.location.href = '/register';
    };

    // Manejo de "Forgot Password"
    const handleForgotPassword = async () => {
        if (!email) {
            alert('Por favor ingresa tu correo antes de continuar.');
            return;
        }

        try {
            const response = await fetch('https://vetcare-backend.azurewebsites.net/api/Auth/RequestPasswordReset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert('Revisa tu correo por favor.');
            } else {
                alert('Error al solicitar el restablecimiento de la contraseña.');
            }
        } catch (error) {
            console.error('Error al solicitar el restablecimiento de contraseña:', error);
            alert('Ocurrió un error, por favor intenta de nuevo.');
        }
    };

    return (
        <div className="w-full h-screen bg-cGreen flex flex-col md:flex-row login">
            {/* Sección de formulario */}
            <div className="w-full md:w-3/2 lg:w-1/2 h-full flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-4 md:p-10">
                <h2 className="text-center text-cGreen text-4xl md:text-7xl font-MontserratBold">
                    Welcome back!
                </h2>
                <p className="text-cBlack text-lg md:text-3xl font-MontserratRegular text-center mt-4">
                    Please give us basic information. Thanks!
                </p>
                <input 
                    type="email" 
                    name="email" 
                    placeholder='Example@gmail.com' 
                    value={email}
                    onChange={handleInputChange}
                    className="w-3/5 md:min-w-96 p-4 h-12 mt-8 rounded-lg border-2 border-cGreen text-cBlack text-base md:text-xl font-MontserratRegular" 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder='********' 
                    value={password}
                    onChange={handleInputChange}
                    className="w-3/5 md:min-w-96 p-4 h-12 mt-6 rounded-lg border-2 border-cGreen text-cBlack text-base md:text-xl font-MontserratRegular" 
                />
                <p 
                    onClick={handleForgotPassword}
                    className="text-cGreen text-sm md:text-lg mt-2 cursor-pointer">
                    Forgot Password?
                </p>
                <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-8 mt-10 w-72 md:w-auto'>
                    <button 
                        type="button" 
                        onClick={handleSignUp}
                        className="flex items-center justify-center w-full md:min-w-64 h-12 rounded-full border-2 border-cGreen text-cGreen text-base md:text-xl font-MontserratRegular p-4">
                        Sign up
                    </button>
                    <button 
                        type='button'
                        onClick={handleLogin} 
                        className="flex items-center justify-center w-full md:min-w-64 h-12 rounded-full border-2 border-cGreen bg-cGreen text-cWhite text-base md:text-xl font-MontserratRegular p-4">
                        Log in
                    </button>
                </div>
            </div>

            {/* Sección de imagen */}
            <div className="hidden md:flex justify-end items-end w-1/2 h-full login-image">
                <img src={Dog} alt="Dog" className="max-w-xl h-auto" />
            </div>
        </div>
    );
}

export default Login;
