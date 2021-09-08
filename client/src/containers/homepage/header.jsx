import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import logo from '../../assets/images/TeamCryptoLogo.png';
const Header = () => {

  const handleAcercaClick = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }

  const handleInicioClick = () => {
    window.scrollTo(0,0)
  }
  
  const options = [
    { label: <span onClick={handleInicioClick}>Inicio</span>, direction: '#' },
    { label: 'Iniciar Sesión', direction: '/access/login' },
    { label: <span onClick={handleAcercaClick}>Acerca de CryptoChat</span>, direction: '#',},
  ];

  return (
    <div id='main'>
      <NavBar options={options} />
      <div className='name'>
        <h1>
          <span>Comunícate</span> con los miembros de tu equipo
        </h1>
        <p className='details'id={"details"}>
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
