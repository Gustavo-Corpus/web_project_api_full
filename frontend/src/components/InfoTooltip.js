import React from 'react';
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_info">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="popup__status-image"
        />
        <h2 className="popup__status-title">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;