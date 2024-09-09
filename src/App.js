import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Preloader from './components/Preloader/Preloader';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';


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
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
