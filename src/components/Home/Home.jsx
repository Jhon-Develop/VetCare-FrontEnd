import React from 'react'
import './Home.CSS';
import Major from '../../assets/Images/major-white-rigth.png';
import Dog from '../../assets/Images/dog-services.png';
import SecondDog from '../../assets/Images/dog-services-2.png';
import ThridDog from '../../assets/Images/dog-services-3.png';
import Cat from '../../assets/Images/cat-services.png';
import SecondCat from '../../assets/Images/cat-services-2.png';
import ThirdCat from '../../assets/Images/cat-services-3.png';
import Whiskas from '../../assets/Images/Whiskas.png';
import Purina from '../../assets/Images/Purina.png';
import HeroDog from '../../assets/Images/HeroDog.png';

import Watch from '../../assets/Images/watch.png';
import Phone from '../../assets/Images/phone-contact.png';
import Email from '../../assets/Images/email.png';
import Address from '../../assets/Images/location.png';

import BgHome from '../../assets/Images/bg-Index.png';
import AnimalFoundation from '../../assets/Images/Animal-Foundation.png';
import AboutUs from '../../assets/Images/dog-and-cat.png';

import Instagram from '../../assets/Images/instagram.png';
import Facebook from '../../assets/Images/facebook.png';
import Gmail from '../../assets/Images/gmail.png';

import Header from '../../components/Nav/Nav.jsx';

const Home = () => {

    return (
        <div className="bg-cWhite h-full w-full relative">
            <Header />
            {/* Hero Section */}
            <div className='flex flex-col lg:flex-row w-full'>
                <div className="h-screen w-full lg:w-1/2 flex flex-col justify-center space-y-8 px-10 lg:px-20">
                    <h2 className='text-5xl lg:text-9xl font-MontserratBold text-cPurple'>Caring for <br />paws</h2>
                    <p className='text-xl lg:text-3xl font-MontserratRegular text-cGray'>Because your pet is a member <br />of your family!</p>
                    <button className='flex justify-around items-center bg-cGreen w-3/4 lg:w-2/5 text-lg lg:text-xl font-MontserratSemibold text-cWhite p-4 rounded-full'>
                    View my pets <img src={Major} alt="Major" className="w-6 h-6" />
                    </button>
                </div>

                <div className='hidden lg:block w-1/2 '>
                    <div className='w-full h-full flex justify-center items-center'>
                        <img src={HeroDog} alt="Hero Dog" className='w-full h-auto object-cover drop-shadow-2xl' />
                    </div>
                </div>

                {/* Mobile image for smaller screens */}
                <div className='lg:hidden w-full flex justify-center'>
                    <img src={HeroDog} alt="Hero Dog" className='w-full h-auto object-cover drop-shadow-2xl' />
                </div>
            </div>


            {/* services section */}
            <div className='flex flex-col space-y-8 justify-center items-center'>
                <div className=" text-center">
                    <h2 className='text-3xl lg:text-7xl font-MontserratBold text-cPurple'>Our services</h2>
                    <p className='text-xl lg:text-2xl font-MontserratRegular text-cGray'>At VetCare, a public veterinary clinic, we provide essential care to keep your pets healthy and happy.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 '>

                    <div className="rounded-lg w-full h-64 bg-cPurple flex items-center relative">
                        <p className='text-4xl sm:text-6xl font-MontserratSemibold text-cGreen relative text-center z-10 w-1/2'>General <br />Checkups</p>
                        <img src={Dog} alt="" className='w-1/2 h-full object-cover' />
                    </div>

                    <div className="rounded-lg w-full h-64 bg-cGreen flex items-center relative">
                        <p className='text-4xl sm:text-6xl font-MontserratSemibold text-cPurple relative text-center z-10 w-1/2'>Surgery</p>
                        <img src={Cat} alt="" className='w-1/2 h-full object-cover' />
                    </div>

                    <div className="rounded-lg w-full h-64 bg-cPurple flex items-center relative">
                        <img src={ThirdCat} alt="" className='w-1/2 h-full object-cover' />
                        <p className='text-4xl sm:text-6xl font-MontserratSemibold text-cGreen relative text-center z-10 w-1/2'>Groo <br />ming</p>
                    </div>

                    <div className="rounded-lg w-full h-64 bg-cYellow flex items-center relative">
                        <p className='text-4xl sm:text-6xl font-MontserratSemibold text-cWhite relative text-center z-10 w-1/2'>Emergency <br />Services</p>
                        <img src={SecondDog} alt="" className='w-1/2 h-full object-cover' />
                    </div>

                    <div className="rounded-lg w-full h-64 bg-cPurple flex items-center relative">
                        <p className='text-4xl sm:text-6xl font-MontserratSemibold text-cWhite relative text-center z-10 w-1/2'>Pet <br />Store</p>
                        <img src={SecondCat} alt="" className='w-1/2 h-full object-cover' />
                    </div>

                    <div className="rounded-lg w-full h-64 bg-cYellow flex items-center relative">
                        <p className='text-4xl sm:text-6xl font-MontserratSemibold text-cPurple relative text-center z-10 w-1/2'>Pet <br />Store</p>
                        <img src={ThridDog} alt="" className='w-1/2 h-full object-cover' />
                    </div>

                </div>
            </div>



            {/* section about us */}
            <div className='min-h-screen w-full flex flex-col lg:flex-row justify-center items-center px-6 lg:px-0 space-y-8 lg:space-y-0 lg:space-x-10 pt-10'>
                <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-center space-y-8 lg:pl-16'>
                    <h2 className='text-4xl sm:text-6xl lg:text-7xl xl:text-9xl font-MontserratSemibold text-cGreen text-center lg:text-left'>
                        About Us
                    </h2>
                    <p className='text-lg sm:text-xl lg:text-2xl xl:text-3xl font-MontserratRegular text-cGray w-full lg:w-4/5 text-start'>
                        We are your local public veterinary clinic committed to offering high-quality care for all pets. We rely on the generous support of private sponsors and the revenue from our pet store to continue providing affordable services to the community.
                        <br /><br />
                        Our dedicated team of professionals offers a wide range of services, from routine checkups to surgeries and emergency care. At VetCare, we believe that every pet deserves excellent care, and we’re proud to be a clinic that serves with compassion and commitment.
                    </p>
                </div>
                <div className='w-full lg:w-1/2 flex justify-center lg:justify-end items-end pb-10'>
                    <img src={AboutUs} alt="About Us" className='w-full h-auto lg:w-4/5 object-scale-down' style={{ margin: 0, padding: 0 }} />
                </div>

            </div>



            {/* section sponsors */}
            <div className='w-full h-40 bg-cGreen flex justify-around items-center'>
                <img src={Purina} alt="Purina" className='w-20 lg:w-40' />
                <img src={AnimalFoundation} alt="Animal Foundation" className='w-20 lg:w-40' />
                <img src={Whiskas} alt="Whiskas" className='w-20 lg:w-40' />
            </div>

            {/* section contact */}
            <div className='w-full h-full flex flex-col pt-10 justify-center items-center px-4 lg:px-0'>
                <div className='w-full flex flex-col items-center'>
                    <h2 className='text-4xl lg:text-6xl font-MontserratSemibold text-cPurple'>Contact Details</h2>
                    <p className='text-xl lg:text-3xl font-MontserratRegular text-center text-cGray'>Have any questions or need help with your pet?</p>
                </div>
                <div className='w-full flex flex-col lg:flex-row justify-center items-center lg:pt-10'>
                    <div className='w-full lg:w-1/2 h-96 flex justify-center items-center'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.335689827354!2d-75.5859495255211!3d6.219388426623707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429e1dab04e05%3A0x5a77c25c8a5faf3a!2sDe%20Moda%20Outlet!5e0!3m2!1ses-419!2sco!4v1727128432117!5m2!1ses-419!2sco"
                            className='border-2 border-cPurple w-full lg:w-5/6 h-full rounded-lg'
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de De Moda Outlet"
                        />


                    </div>
                    <div className='w-full lg:w-1/2 pt-10'>
                        <p className='text-xl lg:text-3xl font-MontserratRegular text-cGray w-full lg:w-1/2'>
                            We're here to assist you. Reach out to us through the following channels:
                        </p>
                        <div className='w-full flex items-center space-x-4 lg:pt-10'>
                            <div className='bg-cPurple p-2 rounded-lg'>
                                <img src={Watch} alt="Watch" className='w-10 h-10' />
                            </div>
                            <div>
                                <h3 className='text-xl lg:text-2xl font-MontserratSemibold text-cPurple'>Availability</h3>
                                <p className='text-lg lg:text-xl font-MontserratRegular text-cGray'>Daily - 24 hours</p>
                            </div>
                        </div>
                        <div className='w-full flex items-center space-x-4 pt-10'>
                            <div className='bg-cPurple p-2 rounded-lg'>
                                <img src={Phone} alt="Watch" className='w-10 h-10' />
                            </div>
                            <div>
                                <h3 className='text-xl lg:text-2xl font-MontserratSemibold text-cPurple'>Phone</h3>
                                <p className='text-lg lg:text-xl font-MontserratRegular text-cGray'>(575) 555-5555</p>
                            </div>
                        </div>
                        <div className='w-full flex items-center space-x-4 pt-10'>
                            <div className='bg-cPurple p-2 rounded-lg'>
                                <img src={Email} alt="Watch" className='w-10 h-10' />
                            </div>
                            <div>
                                <h3 className='text-xl lg:text-2xl font-MontserratSemibold text-cPurple'>Email</h3>
                                <p className='text-lg lg:text-xl font-MontserratRegular text-cGray'>vetcarepets2024@gmail.com</p>
                            </div>
                        </div>
                        <div className='w-full flex items-center space-x-4 pt-10'>
                            <div className='bg-cPurple p-2 rounded-lg'>
                                <img src={Address} alt="Watch" className='w-10 h-10' />
                            </div>
                            <div>
                                <h3 className='text-xl lg:text-2xl font-MontserratSemibold text-cPurple'>Address</h3>
                                <p className='text-lg lg:text-xl font-MontserratRegular text-cGray'>De moda outlet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section footer */}
            <div className='w-full h-auto bg-cPurple flex flex-col items-center justify-between px-4 mt-10 py-4 sm:flex-row sm:px-10 sm:py-2'>
                <div className='flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4'>
                    <h2 className='text-2xl font-MontserratSemibold text-cWhite'>VetCare</h2>
                    <p className='text-lg font-MontserratRegular text-cWhite mt-1 sm:mt-0'>© 2024 VC, Non-profit veterinarian</p>
                </div>
                <div className='flex space-x-4 mt-4 sm:mt-0'>
                    <a href=""><img src={Facebook} alt="Facebook" className='w-8 h-8 sm:w-10 sm:h-10' /></a>
                    <a href=""><img src={Instagram} alt="Instagram" className='w-8 h-8 sm:w-10 sm:h-10' /></a>
                    <a href=""><img src={Gmail} alt="Gmail" className='w-8 h-8 sm:w-10 sm:h-10' /></a>
                </div>
            </div>





        </div>
    )
}

export default Home
