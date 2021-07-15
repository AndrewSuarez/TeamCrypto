import React from 'react';

const About = (props) => {
  return (
    <div id="about">
      <div className="about-image">
        <img src={props.image} alt />
      </div>
      <div className="about-text">
        <h2> {props.title} </h2>
        <p>
          CryptoChat es una aplicacion de chat y organizacion realizada con el
          fin de otorgar un medio de comunicacion eficaz para los equipos de
          profesionales que actualmente realizan sus actividades remotamente en
          coordinacion con otros miembros de sus equipos que necesitan
          organizarse y llevar un registro de sus tareas y progreso con respecto
          a sus objetivos dentro del equipo, permitiendole el acceso a
          diferentes opciones que le facilitaran llevar a cabo una mejor
          organizacion, CryptoChat ademas implementa seguridad en sus
          comunicaciones para garantizar en todo momento proteccion a los datos
          de los equipos y usuarios.
        </p>
        <button>{props.button}</button>
      </div>
    </div>
  );
};

export default About;
