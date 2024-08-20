import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contactos.css';

export const Contactos = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: '',
    email: '',
    motivo: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.nombre) formErrors.nombre = 'El nombre es requerido';
    if (!formValues.email) {
      formErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      formErrors.email = 'El email no es válido';
    }
    if (!formValues.motivo) formErrors.motivo = 'El motivo es requerido';
    if (!formValues.mensaje) formErrors.mensaje = 'El mensaje es requerido';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log('Form data:', formValues);
      alert('Mensaje enviado con éxito');
      // Aquí puedes enviar los datos al servidor
    }
  };

  return (
    <div className="contactos-container">
      <nav className="navbar6">
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
        <ul className={`navbar-links6 ${isOpen ? 'open' : ''}`}>
          <li><a href="javascript:void(0)" className="active" onClick={handleHomeClick}>INICIO</a></li>
          <li><a href="javascript:void(0)" className='cont' onClick={handleContactosClick}>CONTACTANOS</a></li>
        </ul>
      </nav>
      <div className="cuadro">
        <div className="cuadro-texto">
          <h2><strong>Contacto</strong></h2>
          <p className='text1'><strong>Por favor complete el formulario a continuación para ponerse en contacto.</strong></p>
          <p>Para aclarar dudas, quejas, comentarios, recomendaciones y servicio al cliente.</p>
          <p className='p-email'><strong>E-mail:</strong><br />serviciosleep25gmail.com</p>
        </div>
        <div className="cuadro-formulario">
          <form onSubmit={handleSubmit}>
            <div className="form-group2">
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder='Nombre' 
                value={formValues.nombre} 
                onChange={handleInputChange} 
              />
              {errors.nombre && <p className="error">{errors.nombre}</p>}
              
              <label htmlFor="email">E-Mail</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='E-Mail' 
                value={formValues.email} 
                onChange={handleInputChange} 
              />
              {errors.email && <p className="error">{errors.email}</p>}
              
              <label htmlFor="motivo">Motivo</label>
              <input 
                type="text" 
                id="motivo" 
                name="motivo" 
                placeholder='Motivo' 
                value={formValues.motivo} 
                onChange={handleInputChange} 
              />
              {errors.motivo && <p className="error">{errors.motivo}</p>}
              
              <label htmlFor="mensaje">Mensaje</label>
              <textarea 
                id="mensaje" 
                name="mensaje" 
                placeholder='Mensaje' 
                className='msj' 
                value={formValues.mensaje} 
                onChange={handleInputChange} 
              />
              {errors.mensaje && <p className="error">{errors.mensaje}</p>}
            </div>
            <button type="submit"><strong>Enviar</strong></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactos;
