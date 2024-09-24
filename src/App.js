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
import UpdatePet from './components/CrudPets/UpdatePet';
import Register from './components/Register/Register';
import UpdateAccount from './components/UpdateAccount/UpdateAccount';
import SidebarUser from './components/SidebarUser/SidebarUser';
import AdministratorPets from './components/Administrator/AdministratorPets';
import AdministratorUsers from './components/Administrator/AdministratorUsers';
import RecoveryPassword from './components/RecoveryPassword/RecoveryPassword';
import NewPassword from './components/NewPassword/NewPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home/Home';

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
            <Route path="/register" element={<Register />} />
            <Route path="/recovery-password" element={<RecoveryPassword />} />
            <Route path="/new-password" element={<NewPassword />} />

            {/* Protected Routes */}
            <Route
              path="/pets"
              element={
                <ProtectedRoute>
                  <Pets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-pet"
              element={
                <ProtectedRoute>
                  <AddPets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pets/:id"
              element={
                <ProtectedRoute>
                  <ProfilePet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pets/:id/update"
              element={
                <ProtectedRoute>
                  <UpdatePet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pets/:id/appointment"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateAccount/:id"
              element={
                <ProtectedRoute>
                  <UpdateAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-pets"
              element={
                <ProtectedRoute>
                  <AdministratorPets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <ProtectedRoute>
                  <AdministratorUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sidebar-user"
              element={
                <ProtectedRoute>
                  <SidebarUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
