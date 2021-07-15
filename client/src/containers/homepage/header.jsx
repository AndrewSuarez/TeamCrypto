import React from 'react';
import NavBar from '../../components/navbar';

const Header = () => {
  return (
    <div id="main">
      <NavBar />
      <div className="name">
        <h1>
          <span>Comunícate</span> con los miembros de tu equipo
        </h1>
        <p className="details">
          Facilmente a traves de un chat inutitivo y con diversas opciones que
          les permitiran mantener una dinamica de comunicacion ideal.
        </p>
        <a href="#" className="cv-btn">
          Registrarme
        </a>
      </div>
    </div>
  );
};

export default Header;
