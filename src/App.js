import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidePreloader(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Wait for the animation time before removing the preloader completely
    }, 2000);

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

        </div>
      )}
    </div>
  );
}

export default App;
