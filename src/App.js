import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Preloader from './components/Preloader/Preloader';
import Login from './components/Login/Login';
import ProfilePet from './components/CrudPets/ProfilePet';
import { Routes, Route } from 'react-router-dom';
import Pets from './components/CrudPets/ViewPets';
import AddPets from './components/CrudPets/AddPets';
import Appointment from './components/CrudPets/Appointment';

import Register from './components/Register/Register';
import UpdateAccount from './components/UpdateAccount/UpdateAccount';
import { Sidebar } from '@phosphor-icons/react';
import SidebarUser from './components/SidebarUser/SidebarUser';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidePreloader(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Wait for the animation time before removing the preloader completely
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-cWhite transition-all duration-500 ${
            hidePreloader ? '-translate-y-full opacity-0' : ''
          }`}
        >
          <Preloader />
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/add-pet" element={<AddPets />} />
            <Route path="/pets/:id" element={<ProfilePet />} />
            <Route path="/pets/:id/appointment" element={<Appointment />} />
            <Route path="/register" element={<Register />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="/sidebar" element={<SidebarUser />} />

          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
