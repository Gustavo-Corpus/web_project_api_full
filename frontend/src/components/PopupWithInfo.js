import Popup from './Popup.js';
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

class PopupWithInfo extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = this._popup.querySelector('.popup__status-title');
    this._popupImage = this._popup.querySelector('.popup__status-image');
  }

  setStatus(isSuccess) {
    if (isSuccess) {
      this._popupTitle.textContent = "¡Correcto! Ya estás registrado.";
      this._popupImage.src = successIcon;
      this._popupImage.alt = "Éxito";
    } else {
      this._popupTitle.textContent = "Algo salió mal. Por favor, inténtalo de nuevo.";
      this._popupImage.src = errorIcon;
      this._popupImage.alt = "Error";
    }
  }
}

export default PopupWithInfo;