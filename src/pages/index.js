import {
    editProfile,
    addCard,
    cardPopup,
    profileEditButton,
    addButton,
    profileName,
    profileJob,
    profileAvatar,
    grid,
    EditProfileForm,
    nameInput,
    jobInput,
    addCardForm,
    mestoInput,
    linkInput,
    formObject,
    avatarEdit,
    avatarInput,
    avatarEditForm,
    deleteCardPopup,
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { createCard, newCard, deleteCard, itemDelete } from '../components/newCard.js';

//Css
import './index.css';

//Валидация
const profileValidate = new FormValidator(formObject, EditProfileForm);
profileValidate.enableValidation()

const addCardValidate = new FormValidator(formObject, addCardForm);
addCardValidate.enableValidation()

const avatarValidate = new FormValidator(formObject, avatarEditForm);
avatarValidate.enableValidation()

// Api
export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: '8ba8ee25-f796-4e6c-83bd-8c6087015f7d'
})

api.getAppInfo()
    .then(([cards, user]) => {
        const cardList = new Section({
            items: cards,
            renderer: (item) => {
                createCard(item, user._id)
            }
        }, grid);
        profileInfo.setUserInfo(user);
        cardList.renderItems(cards, user._id);
    })
    .catch((err) => {
        console.log(err)
    })

// Модалка с картинкой
export const cardImagePopup = new PopupWithImage(cardPopup);
cardImagePopup.setEventListeners();

//Рендер карточек
export const cardList = new Section({
    items: api.getInitialCards(),
    renderer: (item, userId) => {
        createCard(item, userId)
    }
}, grid);

// Добавление карточек
const addCardPopup = new PopupWithForm({
    handleSubmitForm: (item) => {
        newCard(item = {
            name: mestoInput.value,
            link: linkInput.value,
        })
    }
}, addCard);
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
    addCardPopup.open();
})

// Удаление карточки
export const cardDeletePopup = new PopupWithForm({
    handleSubmitForm: () => {
        deleteCard(itemDelete._id);
    }
}, deleteCardPopup)
cardDeletePopup.setEventListeners();

// Информация о пользователе
const profileInfo = new UserInfo(profileName, profileJob, profileAvatar);

// Редактор Профеля
const profilePopup = new PopupWithForm({
    handleSubmitForm: () => {
        api.appDateProfileInfo({
            name: nameInput.value,
            about: jobInput.value
        })
        profileInfo.setUserInfo({
            name: nameInput.value,
            about: jobInput.value,
            avatar: profileAvatar.src
        })
    }
}, editProfile);
profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const autorInfo = profileInfo.getUserInfo();
    nameInput.value = autorInfo.name.textContent
    jobInput.value = autorInfo.job.textContent
    profilePopup.open();
})

//Редактор аватарки 
const avatarEditPopup = new PopupWithForm({
    handleSubmitForm: () => {
        api.appDateAvatar(avatarInput.value);
        profileAvatar.src = avatarInput.value;
    }
}, avatarEdit)
avatarEditPopup.setEventListeners();

profileAvatar.addEventListener('click', () => {
    avatarInput.value = profileAvatar.src
    avatarEditPopup.open()
})