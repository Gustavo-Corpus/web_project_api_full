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
  const [selectedCard, setSelectedCard] = useState(null);
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
        if (res.email) {
          api.setToken(jwt);
          setEmail(res.email);
          setIsLoggedIn(true);
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
}, []);

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

  const handleCardClick = (card) => {
  setSelectedCard(card);
  };

  const handleCardLike = (card) => {
  const isLiked = card.likes.some(i => String(i._id || i) === String(currentUser._id));

  api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
};

const handleCardDelete = (card) => {
  api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log('Error deleting card:', err);
    });
};

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (userData) => {
  api.setUserInfo(userData)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('Error updating user:', err);
    });
};

const handleUpdateAvatar = (avatarData) => {
  api.setUserAvatar(avatarData.avatar)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('Error updating avatar:', err);
    });
};

const handleAddPlaceSubmit = (cardData) => {
  api.addCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('Error adding card:', err);
    });
};

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          api.setToken(data.token);
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
      if (res._id) {
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
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
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
  onSubmit={handleUpdateUser}
>
  <input
    type="text"
    name="name"
    placeholder="Nombre"
    className="popup__input"
    defaultValue={currentUser.name || ''}
    required
  />
  <input
    type="text"
    name="about"
    placeholder="Acerca de mí"
    className="popup__input"
    defaultValue={currentUser.about || ''}
    required
  />
</PopupWithForm>

<PopupWithForm
  name="add-place"
  title="Nuevo lugar"
  isOpen={isAddPlacePopupOpen}
  onClose={closeAllPopups}
  onSubmit={handleAddPlaceSubmit}
>
  <input
    type="text"
    name="name"
    placeholder="Título"
    className="popup__input"
    required
  />
  <input
    type="url"
    name="link"
    placeholder="Enlace a la imagen"
    className="popup__input"
    required
  />
</PopupWithForm>

<PopupWithForm
  name="edit-avatar"
  title="Cambiar foto de perfil"
  isOpen={isEditAvatarPopupOpen}
  onClose={closeAllPopups}
  onSubmit={handleUpdateAvatar}
>
  <input
    type="url"
    name="avatar"
    placeholder="Enlace a la imagen"
    className="popup__input"
    required
  />
</PopupWithForm>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        {selectedCard && (
  <div className={`popup popup_type_image ${selectedCard ? 'popup_opened' : ''}`}>
    <div className="popup__preview">
      <button
        type="button"
        className="popup__close-button"
        onClick={closeAllPopups}
      />
      <img
        src={selectedCard.link}
        alt={selectedCard.name}
        className="popup__image"
      />
      <p className="popup__description">{selectedCard.name}</p>
    </div>
  </div>
)}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;