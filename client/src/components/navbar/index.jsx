import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

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
        {/* BORRAR DESPUES */}
        <li>
          <Link to="/chat">Chat</Link>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;
