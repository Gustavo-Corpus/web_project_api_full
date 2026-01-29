import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({ email, onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${isMenuOpen ? 'header_opened' : ''}`}>
      {/* Logo primero en el HTML */}
      <div className="header__bar">
        <img src={logoPath} alt="Around The U.S. Logo" className="header__logo" />

        {email ? (
          <button
            className={`header__menu-btn ${
              isMenuOpen ? 'header__menu-btn_close' : ''
            }`}
            onClick={toggleMenu}
          />
        ) : (
          <Link
            to={location.pathname === '/signin' ? '/signup' : '/signin'}
            className="header__auth-link"
          >
            {location.pathname === '/signin'
              ? 'Regístrate'
              : 'Iniciar sesión'}
          </Link>
        )}
      </div>

      {/* Auth después en el HTML */}
      {email && (
        <div className="header__auth-container">
          <p className="header__user-email">{email}</p>
          <button className="header__logout" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;