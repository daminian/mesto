// Wrappers
export const editProfile = document.querySelector('.popup-profile');
export const addCard = document.querySelector('.popup-add');
export const cardPopup = document.querySelector('.popup-card');
export const avatarEdit = document.querySelector('.popup-avatar');
export const deleteCardPopup = document.querySelector('.popup-delete-card');

// Open Button
export const profileEditButton = document.querySelector('.profile__edit');
export const addButton = document.querySelector('.profile__add');

// DOM Elements
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar')

// Card Template
export const grid = '.grid';
export const cardTemplate = document.querySelector('.template-card');
export const cardCounter = document.querySelector('.cards__like-counter');

// Form data
export const EditProfileForm = editProfile.querySelector('.popup__form');
export const nameInput = editProfile.querySelector('.popup__name');
export const jobInput = editProfile.querySelector('.popup__job');

export const addCardForm = addCard.querySelector('.popup__form');
export const mestoInput = addCard.querySelector('.popup__mesto');
export const linkInput = addCard.querySelector('.popup__links');

export const cardImage = cardPopup.querySelector('.popup__image');
export const cardName = cardPopup.querySelector('.popup__name');

export const avatarEditForm = avatarEdit.querySelector('.popup__form');
export const avatarInput = avatarEdit.querySelector('.popup__avatar-links');

export const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};