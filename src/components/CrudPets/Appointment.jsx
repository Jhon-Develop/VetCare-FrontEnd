import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cat from '../../assets/Images/appointment-cat.png';
import './Appointment.css';

const Appointment = () => {

    const navigate = useNavigate();

    const ClickExit = (e) => {
        e.preventDefault();
        navigate('/pets/:id');
    }

    return (
        <div className='bg-cGreen w-full h-screen flex justify-end items-end appointment'>
            <form
                action=""
                className='w-full md:w-3/4 lg:w-1/2 h-full flex flex-col justify-center items-center bg-cWhite rounded-tr-custom rounded-br-custom p-4 md:p-8 overflow-y-auto'>
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className='text-center text-cGreen text-3xl md:text-6xl font-MontserratBold'>
                        New appointment
                    </h2>

                    <select
                        name=""
                        id=""
                        className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'>
                        <option disabled selected>Select the type of specialty</option>
                    </select>
                    <input type="date" name="" id="" className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6' />
                    <input type="time" name="" id="" className='w-full md:w-4/5 p-3 md:p-4 h-12 md:h-14 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6' />
                    <textarea
                        name=""
                        id=""
                        placeholder='Here you can enter details about what you want to be performed or reviewed.'
                        cols="30"
                        rows="10"
                        className='w-full md:w-4/5 p-3 md:p-4 h-36 md:h-40 rounded-2xl border border-cGreen text-cBlack bg-cWhite text-sm md:text-base mt-4 md:mt-6'></textarea>
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full md:w-4/5 h-12 md:h-14 rounded-2xl border border-cGreen bg-cGreen text-cWhite text-sm md:text-xl font-MontserratRegular mt-6 md:mt-8">
                        Save
                    </button>
                    <p className='text-cGreen text-xs md:text-sm mt-4 md:mt-6 max-w-60 text-center'>
                        Remember to keep your appointment
                        15 minutes in advance.
                    </p>
                </div>
            </form>
            <div className="hidden md:flex flex-col justify-end items-end w-1/2 h-full">
                <div className='bg-cPurple w-8 h-8 lg:w-10 lg:h-8 rounded-full shadow-lg hover:bg-[#4e066b] transition duration-300 text-2xl lg:text-2xl fixed top-5 right-5 flex justify-center text-cWhite'>
                    <button
                    type='button'
                        onClick={ClickExit}>
                        X
                    </button>
                </div>
                <img src={Cat} alt="Dog" className="max-w-70 md:max-w-lg h-auto" />
            </div>
        </div>
    )
}

export default Appointment