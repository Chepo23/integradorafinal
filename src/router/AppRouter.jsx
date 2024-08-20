import React from 'react';
import { Homepage } from '../home/Homepage.jsx';
import { Login } from '../Login/login.jsx';
import { Registro } from '../Registro/registro.jsx'
import { Graficas } from '../Graficas/graficas.jsx'
import { Contactos } from '../Contactos/contactos.jsx'
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/graficas' element={<Graficas />} />
        <Route path='/contactos' element={<Contactos />} />
      </Routes>
    </>
  );    
};
