import Password from '../../assets/Images/authentication-2-99.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
    const [showTimer, setShowTimer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (showTimer && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [showTimer, timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSubmitted) {
            try {
                const response = await axios.post('https://vetcare-backend.azurewebsites.net/api/Auth/RequestPasswordReset', {
                    email: email,
                });
                console.log('Correo enviado:', response.data);

                // Activar el cronómetro después de que se envía el correo
                setShowTimer(true);
                setIsSubmitted(true); // Marcar como enviado para no reiniciar el cronómetro
                setTimeLeft(300); // Reiniciar el cronómetro a 5 minutos
            } catch (error) {
                console.error('Error al enviar el correo:', error);
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Si el tiempo ha expirado, reactiva el botón de submit
        if (timeLeft <= 0) {
            setIsSubmitted(false);
        }
    };

    // Convertir los segundos en minutos y segundos
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className='w-full min-h-screen h-fluid bg-cPurple register relative flex'>
            <div className='w-full h-fluid md:w-1/2 min-h-screen flex flex-col justify-center items-center bg-cWhite rounded-tr-3xl rounded-br-3xl p-4 md:p-10 relative z-10 space-y-4'>
                <div>
                    <h2 className="text-center text-cPurple text-4xl md:text-7xl font-MontserratBold">
                        Password recovery
                    </h2>
                    <p className="text-cGray text-lg md:text-2xl font-MontserratRegular text-center mt-4">
                        Enter your email to reset your password
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4 custom'>
                    <input
                        type="email"
                        name="email"
                        placeholder='Example@gmail.com'
                        value={email}
                        onChange={handleEmailChange}
                        className="w-3/5 md:min-w-96 p-4 h-14 rounded-2xl border border-cPurple text-cGray bg-cWhite text-base md:text-base font-MontserratRegular"
                    />

                    <button
                        type="submit"
                        className="flex items-center justify-center w-3/5 md:min-w-96 h-14 rounded-2xl border border-cPurple bg-cPurple text-cWhite text-base md:text-xl font-MontserratRegular p-4"
                        disabled={isSubmitted && timeLeft > 0} // Deshabilitar si está enviado y el tiempo no ha expirado
                    >
                        Submit
                    </button>
                </form>

                {showTimer && (
                    <div>

                        {timeLeft > 0 ? (
                            <>
                                <p className="text-cGray text-lg md:text-2xl font-MontserratRegular text-center mt-4">
                                    The code sent to your email is valid for
                                </p>
                                <div className="text-cPurple text-lg md:text-6xl font-MontserratBold text-center mt-4">
                                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                </div>
                                <p className="text-cPurple text-lg md:text-2xl font-MontserratBold text-center mt-2">
                                    minutes
                                </p>
                            </>
                        ) : (
                            <p className="text-cPurple text-lg md:text-4xl font-MontserratBold text-center mt-4">Time used up</p>
                        )}
                    </div>
                )}

            </div>

            <div className='hidden md:flex justify-center items-end w-1/2 relative'>
                <img src={Password} alt="password" />
            </div>
        </div>
    );
};

export default PasswordRecovery;
