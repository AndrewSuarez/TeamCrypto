import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import logo from '../../assets/images/TeamCryptoLogo.png';
const Header = () => {
  const options = [
    { label: 'Inicio', direction: '/' },
    { label: 'Iniciar Sesión', direction: '/access/login' },
    { label: 'Acerca de CryptoChat', direction: '#' },
  ];

  return (
    <div id='main'>
      <NavBar options={options} />
      <div className='name'>
        <h1>
          <span>Comunícate</span> con los miembros de tu equipo
        </h1>
        <p className='details'>
          Facilmente a traves de un chat inutitivo y con diversas opciones que
          les permitiran mantener una dinamica de comunicacion ideal.
        </p>
        <Link to='access/signup' className='cv-btn'>
          Registrarme
        </Link>
      </div>
      <img className='mainLogo' src={logo} alt='' />
    </div>
  );
};

export default Header;
