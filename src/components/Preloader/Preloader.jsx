import React from 'react';
import './Preloader.css';

const Preloader = () => {
    return (
        <div className="w-full h-screen bg-cPurple flex justify-center items-center flex-col preloader">
            <h2 data-aos="fade-up" className="text-cYellow text-7xl font-MontserratBold">
                VetCare
            </h2>
            <p data-aos="fade-up" className="text-cWhite text-3xl font-ConfortaaRegular max-w-96 text-center">
                Because your pet is a member of your family
            </p>
            <button type="button" class="" disabled>
                <svg class="motion-safe:animate-spin h-7 w-7 text-cWhite mt-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </button>
        </div>
    );
}

export default Preloader;