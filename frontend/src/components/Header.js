import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logoPath} alt="Around The U.S. Logo" className="header__logo" />
      <div className="header__auth-container">
        {email ? (
          <>
            <p className="header__user-email">{email}</p>
            <button className="header__logout" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to={location.pathname === '/signin' ? '/signup' : '/signin'}
            className="header__auth-link"
          >
            {location.pathname === '/signin' ? 'Regístrate' : 'Iniciar sesión'}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;