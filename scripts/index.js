import { initialCards } from './initial-cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Wrappers
const editProfile = document.querySelector('.popup-profile');
const addCard = document.querySelector('.popup-add');
const cardPopup = document.querySelector('.popup-card');

// Open Button
const profileEditButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');

// Submit Button
const editPopupSubmit = editProfile.querySelector('.popup__button');
const addCardPopupSubmit = addCard.querySelector('.popup__button');

// Close Button
const editPopupClose = editProfile.querySelector('.popup__close');
const addCardClose = addCard.querySelector('.popup__close');
const cardClose = cardPopup.querySelector('.popup__close');

// DOM Elements
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Card Template
const grid = document.querySelector('.grid');

// Form data
const EditProfileForm = editProfile.querySelector('.popup__form');
const nameInput = editProfile.querySelector('.popup__name');
const jobInput = editProfile.querySelector('.popup__job');

const addCardForm = addCard.querySelector('.popup__form');
const mestoInput = addCard.querySelector('.popup__mesto');
const linkInput = addCard.querySelector('.popup__links');

const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Functions

function renderCard(item) {
    grid.prepend(item);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', escapeClosePopup);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', escapeClosePopup);
}

function setProfileInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editProfile);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    const newcard = new Card({ name: mestoInput.value, link: linkInput.value }, '.template-card');
    const newcardElement = newcard.generateCard();
    renderCard(newcardElement);
    addCardForm.reset();
    closePopup(addCard);
}

export default function escapeClosePopup(evt) {
    const popupActive = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {
        closePopup(popupActive);
    }

}

// Редактор Профеля
editProfile.addEventListener('submit', profileFormSubmitHandler);
profileEditButton.addEventListener('click', () => {
    setProfileInfo();
    openPopup(editProfile);
})
editPopupClose.addEventListener('click', () => {
    closePopup(editProfile);
})
editProfile.addEventListener('click', (evt) => {
    if (evt.target === editProfile) {
        closePopup(editProfile);
    }
})
// Добавление карточек
initialCards.forEach((item) => {
    const card = new Card(item, '.template-card');
    const cardElement = card.generateCard();

    renderCard(cardElement);
});

addCard.addEventListener('submit', addCardFormSubmitHandler);
addButton.addEventListener('click', () => {
    openPopup(addCard);
})
addCardClose.addEventListener('click', () => {
    closePopup(addCard);
    addCardForm.reset();
})
addCard.addEventListener('click', (evt) => {
    if (evt.target === addCard) {
        closePopup(addCard)
    }
})
// Просмотр фото
cardClose.addEventListener('click', () => {
    closePopup(cardPopup);
})
cardPopup.addEventListener('click', (evt) => {
    if (evt.target === cardPopup) {
        closePopup(cardPopup)
    }
})

const ProfileValidate = new FormValidator(formObject, EditProfileForm);
ProfileValidate.enableValidation()

const AddCardValidate = new FormValidator(formObject, addCardForm);
AddCardValidate.enableValidation()