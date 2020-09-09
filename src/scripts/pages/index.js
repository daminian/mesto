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
import '../../pages/index.css';


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
const addCardPopup = new PopupWithForm({
    popupSelector: addCard,
    handleSubmitForm: (addCardForm) => {
        const newCard = new Card(addCardForm = {
            name: mestoInput.value,
            link: linkInput.value
        }, cardTemplate, () => cardImagePopup.open(addCardForm));
        const newCardElement = newCard.generateCard();
        cardList.addItem(newCardElement);
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
    renderer: (item) => {
        const card = new Card(item, cardTemplate, () => cardImagePopup.open(item));
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, grid);

cardList.renderItems();

//Валидация
const ProfileValidate = new FormValidator(formObject, EditProfileForm);
ProfileValidate.enableValidation()

const AddCardValidate = new FormValidator(formObject, addCardForm);
AddCardValidate.enableValidation()