// Wrappers
const editProfile = document.querySelector('.popup__profile');
const addCard = document.querySelector('.popup__add');
const cardPopup = document.querySelector('.popup__card');

// Forms
const editForm = editProfile.querySelector('.popup__form');
const addCardForm = addCard.querySelector('.popup__form');
const cardForm = cardPopup.querySelector('.popup__form');

// Open Button
const profileEditButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');

// Submit Button
const editPopupSubmit = editProfile.querySelector('.popup__submit');
const addCardPopupSubmit = addCard.querySelector('.popup__submit');

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
const nameInput = editForm.querySelector('.popup__name');
const jobInput = editForm.querySelector('.popup__job');

const mestoInput = addCard.querySelector('.popup__mesto');
const linkInput = addCard.querySelector('.popup__links');

const imageNameCard = cardPopup.querySelector('.popup__image-title');
const imagePhotoCard = cardPopup.querySelector('.popup__image');

// Cards
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Functions

function togglePopup(popup) {
    if (!popup.classList.contains('popup_')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }

    popup.classList.toggle('popup_opened');
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(editProfile);
};

function renderCard(cardData) {
    grid.prepend(creatCard(cardData));
};

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

    cardImage.addEventListener('click',() => {
        imagePhotoCard.src  = cardImage.src;
        imageNameCard.textContent = cardName.textContent;

    togglePopup(cardPopup);
});
    return cardElement;
};

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({name: mestoInput.value, link: linkInput.value});

    togglePopup(addCard);
};

initialCards.forEach((cardData) => {
    renderCard(cardData);
});

editPopupSubmit.addEventListener('click', profileFormSubmitHandler);
profileEditButton.addEventListener('click', () => {
    togglePopup(editProfile);
});
editPopupClose.addEventListener('click', () => {
    togglePopup(editProfile);
});

addCardPopupSubmit.addEventListener('click', addCardFormSubmitHandler);
addButton.addEventListener('click', () => {
    togglePopup(addCard);
});
addCardClose.addEventListener('click', () => {
    togglePopup(addCard);
});

cardClose.addEventListener('click', () => {
    togglePopup(cardPopup);
});
