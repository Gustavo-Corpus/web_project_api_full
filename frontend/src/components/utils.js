export function openPopup(popup) {
  if (popup.classList.contains("popup_image")) {
    popup.classList.add("popup_image_opened");
  } else {
    popup.classList.add("popup_opened");
  }
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", handleOverlayClick);
}

export function closePopup(popup) {
  if (popup.classList.contains("popup_image")) {
    popup.classList.remove("popup_image_opened");
  } else {
    popup.classList.remove("popup_opened");
  }
  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("mousedown", handleOverlayClick);
}

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(
      ".popup_opened, .popup_image_opened"
    );
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function handleOverlayClick(evt) {
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("popup_image_opened")
  ) {
    closePopup(evt.target);
  }
}
