import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: ''
  });

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleRegistroClick = () => {
    navigate('/registro');
  };

  const handleContactosClick = () => {
    navigate('/contactos');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email,
        password: contrasena,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userId = response.data.userId;
      localStorage.setItem('isAuthenticated', 'true'); // Mark user as authenticated
      navigate('/', { state: { userId } });
    } catch (error) {
      if (error.response) {
        setError('Credenciales inválidas');
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/routes/usuarios/register', formData);
      alert(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="section">
      <nav className="navbar2">
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
        <ul className={`navbar-links3 ${isOpen ? 'open' : ''}`}>
          <li><a href="#" className="active" onClick={handleHomeClick}>INICIO</a></li>
          <li><a href="#" onClick={handleContactosClick}>CONTACTANOS</a></li>
        </ul>
      </nav>
      <div className="containerLogin">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0"><span><b>Iniciar Sesion</b></span><span><b>Registrarse</b></span></h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Iniciar Sesion</h4>
                        <form onSubmit={handleLogin}>
                          <div className="form-group3">
                            <input
                              type="email"
                              className="form-style2"
                              placeholder="Correo Electronico"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group3 mt-2">
                            <input
                              type="password"
                              className="form-style2"
                              placeholder="Contraseña"
                              value={contrasena}
                              onChange={(e) => setContrasena(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">Iniciar Sesion</button>
                          {error && <p className="error-message">{error}</p>}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-3pb-3">Registrarse</h4>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style3"
                              placeholder="Nombre"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="tel"
                              className="form-style3"
                              placeholder="Numero Telefonico"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-phone"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              className="form-style3"
                              placeholder="Correo Electronico"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style3"
                              placeholder="Contraseña"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style3"
                              placeholder="Confirmar Contraseña"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="date"
                              className="form-style3"
                              name="birthDate"
                              value={formData.birthDate}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-calendar-alt"></i>
                          </div>
                          <button type="submit" className="btn2 mt-4">Registrarse</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
