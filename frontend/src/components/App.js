import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from '../components/Login';
import Register from '../components/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import InfoTooltip from '../components/InfoTooltip';
import * as auth from '../utils/auth';
import api from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getAppInfo()
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log('Error loading app data:', err);
        });
    }
  }, [isLoggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res.data) {
          setIsSuccess(true);
          navigate('/signin');
        } else {
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    navigate('/signin');
  };

  if (isLoading) {
    return (
      <div className="page">
        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              !isLoggedIn ?
                <Register onRegister={handleRegister} /> :
                <Navigate to="/" />
            }
          />
          <Route
            path="/signin"
            element={
              !isLoggedIn ?
                <Login onLogin={handleLogin} /> :
                <Navigate to="/" />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ?
                <Navigate to="/" /> :
                <Navigate to="/signin" />
            }
          />
        </Routes>

        <PopupWithForm
          name="edit-profile"
          title="Editar perfil"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          {/* Contenido del formulario */}
        </PopupWithForm>

        <PopupWithForm
          name="add-place"
          title="Nuevo lugar"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          {/* Contenido del formulario */}
        </PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          title="Cambiar foto de perfil"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          {/* Contenido del formulario */}
        </PopupWithForm>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;