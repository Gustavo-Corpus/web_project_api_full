import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards } from "../utils/initialCards.js";
import { validationConfig, settings } from "../utils/config.js";
import {
  selectors,
  profileSelectors,
  popupSelectors,
  cardSelectors,
  forms,
  editProfileElements,
  addCardElements,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: profileSelectors.nameElement,
  jobSelector: profileSelectors.jobElement,
});

const imagePopup = new PopupWithImage(popupSelectors.imagePopup);
imagePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(data, cardSelectors.template, (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  cardSelectors.container
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  popupSelectors.editPopup,
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.job,
    });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupSelectors.addPopup, (formData) => {
  const cardElement = createCard({
    name: formData.title,
    link: formData.link,
  });
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

document
  .querySelector(profileSelectors.editButton)
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    editProfileElements.nameInput.value = currentUserInfo.name;
    editProfileElements.jobInput.value = currentUserInfo.job;
    editProfilePopup.open();
  });

document
  .querySelector(profileSelectors.addButton)
  .addEventListener("click", () => {
    addCardPopup.open();
  });

const editFormValidator = new FormValidator(validationConfig, forms.editForm);
const addFormValidator = new FormValidator(validationConfig, forms.addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
