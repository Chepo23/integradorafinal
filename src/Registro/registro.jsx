import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registro.css';

export const Registro = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="registro-container">
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
          <li><a href="#" className="reg"  onClick={handleRegistroClick}>REGISTRARSE</a></li>
          <li><a href="#" onClick={handleContactosClick}>CONTACTANOS</a></li>
        </ul>
      </nav>
      <div className="registro-box">
        <h2 className="reg">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="" value={formData.name} onChange={handleChange} />

          <label htmlFor="email">Correo Electronico</label>
          <input type="email" id="email" name="email" placeholder="" value={formData.email} onChange={handleChange} />

          <label htmlFor="phone">Numero de Telefono</label>
          <input type="tel" id="phone" name="phone" placeholder="" value={formData.phone} onChange={handleChange} />
          
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="" value={formData.password} onChange={handleChange} />

          <label htmlFor="confirm-password">Confirmar Contraseña</label>
          <input type="password" id="confirm-password" name="confirmPassword" placeholder="" value={formData.confirmPassword} onChange={handleChange} />

          <label htmlFor="age">Fecha de Nacimiento</label>
          <input type="date" id="bithDate" name="birthDate" placeholder="" value={formData.birthDate} onChange={handleChange} />
          
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
