import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email }); // Para depuración
    onLogin(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Iniciar sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          className="auth__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button className="auth__button" type="submit">
          Iniciar sesión
        </button>
      </form>
      <div className="auth__signin">
        <p>¿Aún no eres miembro?<Link to="/signup" className="auth__login-link">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}

export default Login;