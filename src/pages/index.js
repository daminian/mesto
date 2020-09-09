import { initialCards } from '../utils/initial-cards.js';
import {
    editProfile,
    addCard,
    cardPopup,
    profileEditButton,
    addButton,
    profileName,
    profileJob,
    grid,
    EditProfileForm,
    nameInput,
    jobInput,
    addCardForm,
    mestoInput,
    linkInput,
    formObject,
    cardTemplate
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//Css
import './index.css';


// Информация о пользователе
const profileInfo = new UserInfo(profileName, profileJob);

// Редактор Профеля
const profilePopup = new PopupWithForm({
    popupSelector: editProfile,
    handleSubmitForm: () => {
        profileInfo.setUserInfo({
            name: nameInput,
            job: jobInput
        });
    }
});
profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const autorInfo = profileInfo.getUserInfo();
    nameInput.value = autorInfo.name
    jobInput.value = autorInfo.job
    profilePopup.open();
})


// Добавление карточек
function createCard(element = {name: element.name, link: element.link}) {
    const card = new Card(element, cardTemplate, () => cardImagePopup.open(element));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement); 
}

const addCardPopup = new PopupWithForm({
    popupSelector: addCard,
    handleSubmitForm: (addCardForm) => {createCard(addCardForm = {
        name: mestoInput.value,
        link: linkInput.value
    })
    }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
    addCardPopup.open();
})

// Модалка с картинкой
const cardImagePopup = new PopupWithImage(cardPopup);
cardImagePopup.setEventListeners();

//Рендер карточек
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {createCard(item);}
}, grid);

cardList.renderItems();

//Валидация
const profileValidate = new FormValidator(formObject, EditProfileForm);
profileValidate.enableValidation()

const addCardValidate = new FormValidator(formObject, addCardForm);
addCardValidate.enableValidation()