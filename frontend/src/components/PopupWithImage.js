import Popup from "./Popup.js";
import { settings } from "../utils/config.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__description");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    this._popup.classList.add(settings.imagePopupClass);
    super.open();
  }
}
