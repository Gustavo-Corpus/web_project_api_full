import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children, buttonText = "Guardar" }) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (onSubmit) {
      const formData = new FormData(evt.target);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
    }
  };

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={handleSubmit}
        >
          {children}
          <button
            type="submit"
            className="popup__button"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;