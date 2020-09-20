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
    deleteCardForm,
    cardTemplate,
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';

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
                createCard(item, user._id, false)
            }
        }, grid);
        profileInfo.setUserInfo(user);
        cardList.renderItems(cards, user._id);
    })
    .catch((err) => {
        console.log(err)
    })

const cardList = new Section({
    items: '',
    renderer: (item) => {
        createCard(item, user._id, true)
    }
}, grid);

// Модалка с картинкой
export const cardImagePopup = new PopupWithImage(cardPopup);
cardImagePopup.setEventListeners();

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
        renderLoading(true, EditProfileForm)
        api.updateProfileInfo({
                name: nameInput.value,
                about: jobInput.value
            })
            .then(() => {
                profileInfo.setUserInfo({
                    name: nameInput.value,
                    about: jobInput.value,
                    avatar: profileAvatar.src
                })
                profilePopup.close()
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => { renderLoading(false, EditProfileForm) })
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
        renderLoading(true, avatarEditForm)
        api.updateAvatar(avatarInput.value)
            .then(() => {
                profileAvatar.src = avatarInput.value;
                avatarEditPopup.close()
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                renderLoading(false, avatarEditForm)
            })
    }
}, avatarEdit)
avatarEditPopup.setEventListeners();

profileAvatar.addEventListener('click', () => {
    avatarInput.value = profileAvatar.src
    avatarEditPopup.open()
})

let itemsCard = []
const addClassCard = function(item, card) {
    itemsCard.unshift({
        id: item._id,
        class: card
    })
}

let itemDelete
const generateCard = function(item, userId) {
    const card = new Card({ data: item }, cardTemplate,
        () => cardImagePopup.open(item),
        (card) => {
            if (card.like) {
                deliteLike(card)
            } else {
                likeCard(card)
            }
        },
        () => {
            itemDelete = item;
            cardDeletePopup.open()
        },
        userId);
    addClassCard(item, card)
    const cardElement = card.generateCard();
    return cardElement
}

const createCard = function(item, userId, position) {
    const cardElement = generateCard(item, userId)
    cardList.addItem(cardElement, position);
}

const newCard = function(item) {
    renderLoading(true, addCardForm)
    api.postNewCard(item)
        .then((res) => {
            createCard(res, res.owner._id, true)
        })
        .then(() => {
            addCardPopup.close();
        })
        .catch((err) => { console.error(err); })
        .finally(() => {
            renderLoading(false, addCardForm)
        })
}

const likeCard = function(card) {
    api.addLike(card.id)
        .then((res) => {
            itemsCard.find((item) => (item.id === res._id)).class.handleLike(res.likes.length);
        })
        .catch((err) => { console.error(err); })
}

const deliteLike = function(card) {
    api.deliteLike(card.id)
        .then((res) => {
            itemsCard.find((item) => (item.id === res._id)).class.handleLike(res.likes.length)
        })
        .catch((err) => { console.error(err); })
}

const deleteCard = function(item) {
    renderLoading(true, deleteCardForm)
    api.deleteCard(item)
        .then((res) => {
            const classCard = itemsCard.find((card) => (card.id === item));
            classCard.class.handleDeleteCard();
            itemsCard = itemsCard.filter(item => item !== classCard);
        })
        .then(() => {
            cardDeletePopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, deleteCardForm)
        })
}

const renderLoading = function(isLoading, form) {
    const button = form.querySelector('.popup__button');
    if (isLoading) {
        button.classList.add('popup__button_disabled');
        button.textContent = 'Сохранение...';
    } else {
        button.classList.remove('popup__button_disabled');
        button.textContent = 'Сохранить';
        deleteCardForm.querySelector('.popup__button').textContent = 'Да';
    }
}