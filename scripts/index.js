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
// const inactiveButtonClass = {inactiveButtonClass: 'popup__button_disabled'}

// Close Button
const editPopupClose = editProfile.querySelector('.popup__close');
const addCardClose = addCard.querySelector('.popup__close');
const cardClose = cardPopup.querySelector('.popup__close');

// DOM Elements
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Card Template
const grid = document.querySelector('.grid');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.cards');

// Form data
const nameInput = editProfile.querySelector('.popup__name');
const jobInput = editProfile.querySelector('.popup__job');

const addCardForm = addCard.querySelector('.popup__form');
const mestoInput = addCard.querySelector('.popup__mesto');
const linkInput = addCard.querySelector('.popup__links');

const imageNameCard = cardPopup.querySelector('.popup__image-title');
const imagePhotoCard = cardPopup.querySelector('.popup__image');

// Functions

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeClosePopup);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeClosePopup);
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

function renderCard(cardData) {
    grid.prepend(creatCard(cardData));
}

function creatCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.cards__photo');
    const cardName = cardElement.querySelector('.cards__name');
    const cardLikeButton = cardElement.querySelector('.cards__like');
    const cardDeleteButton = cardElement.querySelector('.cards__trash');

    cardName.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardLikeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('cards__like_active');
    });

    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    cardImage.addEventListener('click', () => {
        imagePhotoCard.src = cardImage.src;
        imageNameCard.textContent = cardName.textContent;

        openPopup(cardPopup);
    });
    return cardElement;
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({ name: mestoInput.value, link: linkInput.value });
    inactiveButton(addCardPopupSubmit, formObject);
    addCardForm.reset();
    closePopup(addCard);
}

function escapeClosePopup(evt) {
    if (evt.key === 'Escape') {
        closePopup(editProfile);
        closePopup(addCard);
        closePopup(cardPopup);
    }

}

initialCards.forEach((cardData) => {
    renderCard(cardData);
})

// Редактор Профеля
editPopupSubmit.addEventListener('click', profileFormSubmitHandler);
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
addCardPopupSubmit.addEventListener('click', addCardFormSubmitHandler);
addButton.addEventListener('click', () => {
    inactiveButton(addCardPopupSubmit, formObject);
    openPopup(addCard);
})
addCardClose.addEventListener('click', () => {
    closePopup(addCard);
    inactiveButton(addCardPopupSubmit, formObject);
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
