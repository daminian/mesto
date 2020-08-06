<<<<<<< HEAD:scripts/index.js
// Wrappers
const editProfile = document.querySelector('.popup__profile');
const addCard = document.querySelector('.popup__add');
const cardPopup = document.querySelector('.popup__card');

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
const cardTemplate = document.querySelector('.template-card').content.querySelector('.cards');

// Form data
const nameInput = editProfile.querySelector('.popup__name');
const jobInput = editProfile.querySelector('.popup__job');

const addCardForm = addCard.querySelector('.popup__form');
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
    popup.classList.toggle('popup_opened');
}

function setProfileInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(editProfile);
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

        togglePopup(cardPopup);
    });
    return cardElement;
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({ name: mestoInput.value, link: linkInput.value });
    addCardForm.reset();
    togglePopup(addCard);
}

function escapeClosePopup(evt, popup) {
    if (evt.key === 'Escape' && (popup.classList.contains('popup_opened'))
    ) togglePopup(popup);
}

initialCards.forEach((cardData) => {
    renderCard(cardData);
})

editPopupSubmit.addEventListener('click', profileFormSubmitHandler);
profileEditButton.addEventListener('click', () => {
    setProfileInfo();
    togglePopup(editProfile);
})
editPopupClose.addEventListener('click', () => {
    togglePopup(editProfile);
})

addCardPopupSubmit.addEventListener('click', addCardFormSubmitHandler);

addButton.addEventListener('click', () => {
    togglePopup(addCard);
})
addCardClose.addEventListener('click', () => {
    togglePopup(addCard);
    addCardForm.reset();
})

cardClose.addEventListener('click', () => {
    togglePopup(cardPopup);
})

document.addEventListener('keydown', (evt) => {
    const formList = Array.from(document.querySelectorAll('.popup'));
    formList.forEach((popup) => {
        escapeClosePopup(evt, popup)
    });
})

editProfile.addEventListener('click', (evt) => {
    if (evt.target === editProfile) {
        togglePopup(editProfile)
    }
})
addCard.addEventListener('click', (evt) => {
    if (evt.target === addCard) {
        togglePopup(addCard)
    }
})
cardPopup.addEventListener('click', (evt) => {
    if (evt.target === cardPopup) {
        togglePopup(cardPopup)
    }
})

=======
// Wrappers
const editProfile = document.querySelector('.popup__profile');
const addCard = document.querySelector('.popup__add');
const cardPopup = document.querySelector('.popup__card');

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
const nameInput = editProfile.querySelector('.popup__name');
const jobInput = editProfile.querySelector('.popup__job');

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
    popup.classList.toggle('popup_opened');
}

function setProfileInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(editProfile);
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

        togglePopup(cardPopup);
    });
    return cardElement;
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({ name: mestoInput.value, link: linkInput.value });

    togglePopup(addCard);
}

function escapeClosePopup(evt, popup) {
    if (evt.key === 'Escape') togglePopup(popup);
}

initialCards.forEach((cardData) => {
    renderCard(cardData);
})

editPopupSubmit.addEventListener('click', profileFormSubmitHandler);
profileEditButton.addEventListener('click', () => {
    setProfileInfo();
    togglePopup(editProfile);
})
editPopupClose.addEventListener('click', () => {
    togglePopup(editProfile);
})

addCardPopupSubmit.addEventListener('click', addCardFormSubmitHandler);
addButton.addEventListener('click', () => {
    togglePopup(addCard);
})
addCardClose.addEventListener('click', () => {
    togglePopup(addCard);
})

cardClose.addEventListener('click', () => {
    togglePopup(cardPopup);
})

addCard.addEventListener('keydown', (evt) => {
    escapeClosePopup(evt, addCard);
})

editProfile.addEventListener('keydown', (evt) => {
    escapeClosePopup(evt, editProfile);
})

editProfile.addEventListener('click', (evt) => {
    if (evt.target === editProfile) {
        togglePopup(editProfile)
    }
})
addCard.addEventListener('click', (evt) => {
    if (evt.target === addCard) {
        togglePopup(addCard)
    }
})
cardPopup.addEventListener('click', (evt) => {
    if (evt.target === cardPopup) {
        togglePopup(cardPopup)
    }
})

>>>>>>> 5f53146c05a1f35b2a0a39ac6ab688069576b368:scripts/script.js
