import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../../assets/images/TeamCryptoLogo.png";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const user = useContext(AuthContext)
  if(!user){
    return (
      <nav className={nav ? "nav active" : "nav"}>
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label className="menu-icon" for="menu-btn">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          <li>
            <Link to="/" className="active">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/access/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="#">Acerca de CryptoChat</Link>
          </li>

        </ul>
      </nav>
    );
  // }else if(!user){
  }else{
    return(
      <nav className="nav">
        <Link className="logo">
          <img src={logo} alt="" />
        </Link>
        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label className="menu-icon" for="menu-btn">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          <li>
            <Link to="/chat">
              Chat
            </Link>
          </li>
          <li>
            <Link>
              Tareas
            </Link>
          </li>
          <li>
            <Link>
              Contactos
            </Link>
          </li>
          <li>
            <Link to="/settings">
              Ajustes
            </Link>
          </li>
          <li>
            <Link to="/">
              Cerrar Sesion
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
  
};

export default NavBar;
