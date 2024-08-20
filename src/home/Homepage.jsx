import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const images = [
  '/bedd1.png',
  '/bedd2.png',
  '/bedd3.png',
];

export const Homepage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated when component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(loggedIn === 'true');
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleContactosClick = () => {
    navigate('/contactos');
  };

  const handleDashboardClick = () => {
    navigate('/graficas');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-logo">
          <span>
            SLEEP 
            <img src="logo.png" alt="Logo" className="logo-image" />  
            TRACK
          </span>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <li><a href="#" className="inic" onClick={handleHomeClick}>INICIO</a></li>
          {isAuthenticated ? (
            <>
              <li><a href="#" onClick={handleDashboardClick}>DASHBOARD</a></li>
              <li><a href="#" onClick={handleLogoutClick}>CERRAR SESIÓN</a></li>
            </>
          ) : (
            <li><a href="#" onClick={handleLoginClick}>INGRESAR</a></li>
          )}
          <li><a href="#" onClick={handleContactosClick}>CONTACTANOS</a></li>
        </ul>
      </nav>
      <div className="carousel-container">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
                <div className="carousel-caption">
                  <h3>Descansa mejor, vive mejor</h3>
                  <p>Tu sueño, nuestra misión.</p>
                  {!isAuthenticated && (
                    <button type="button" className="login-button1" onClick={handleLoginClick}>Ingresar</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="cel-imagen">
          <img src="/cel.jpg" alt="Celular 1" className="celu1" />
          <img src="/cel2.jpg" alt="Celular 2" className="celu2" />
          <img src="/cel3.jpg" alt="Celular 3" className="celu3" />
          <img src="/cel6.jpg" alt="Celular 3" className="celu4" />
          <img src="/cel5.jpg" alt="Celular 3" className="celu5" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
