let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit');
let popupClose = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__container');
let profilePopup = document.querySelector('.popup__profile');
let conteiner = popup.querySelector('.popup__container_profile');

function openPopup() {
    profilePopup.classList.add('popup_opened');
    let nameInput = popup.querySelector('.popup__name');
    let jobInput = popup.querySelector('.popup__job');
    let nameOutput = profile.querySelector('.profile__name');
    let jobOtput = profile.querySelector('.profile__job');
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOtput.textContent;
}

function closePopup() {
popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = popup.querySelector('.popup__name');
    let jobInput = popup.querySelector('.popup__job');
    let nameOutput = profile.querySelector('.profile__name');
    let jobOtput = profile.querySelector('.profile__job');
    nameOutput.textContent = nameInput.value;
    jobOtput.textContent = jobInput.value;
    closePopup();  
}

formElement.addEventListener('submit', formSubmitHandler);



let addPopup = document.querySelector('.popup__add');
let addButton = document.querySelector('.profile__add');
let addClose = addPopup.querySelector('.popup__close');
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

const cardTemplate = document.querySelector('#card').content;
const grid = document.querySelector('.grid');
const card = grid.querySelector('.cards__photo');
const cardPopup = document.querySelector('.popup__card');



initialCards.forEach(function cardsAdd({name, link}){
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.cards__name').textContent = name;
    cardElement.querySelector('.cards__photo').src = link;
    cardElement.querySelector('.cards__like').addEventListener('click', function (evt){
        evt.target.classList.toggle('cards__like_active');
    });
    cardElement.querySelector('.cards__trash').addEventListener('click', function (evt){
        evt.target.closest('.cards').remove();
    });
    cardElement.querySelector('.cards__photo').addEventListener('click', function(){
            cardPopup.classList.add('popup_opened');
            let image = cardPopup.querySelector('.popup__image');
            let cardName = cardPopup.querySelector('.popup__image-title');
            image.src = link;
            cardName.textContent = name;

    });
    grid.append(cardElement);
});

function openAdd() {
    addPopup.classList.add('popup_opened');
}

addButton.addEventListener('click', openAdd);



function addClosePopup() {
    addPopup.classList.remove('popup_opened');
}

addClose.addEventListener('click', addClosePopup);

let addElement = addPopup.querySelector('.popup__container')

function formSubmit (evt) {
    evt.preventDefault();
    let mestoInput = addPopup.querySelector('.popup__mesto').value;
    let linkInput = addPopup.querySelector('.popup__links').value;
    
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.cards__name').textContent = mestoInput;
    cardElement.querySelector('.cards__photo').src = linkInput;
    cardElement.querySelector('.cards__like').addEventListener('click', function (evt){
        evt.target.classList.toggle('cards__like_active');
    });
    cardElement.querySelector('.cards__trash').addEventListener('click', function (evt){
        evt.target.closest('.cards').remove();
    });
    cardElement.querySelector('.cards__photo').addEventListener('click', function(){
            cardPopup.classList.add('popup_opened');
            let image = cardPopup.querySelector('.popup__image');
            let cardName = cardPopup.querySelector('.popup__image-title');
            image.src = linkInput;
            cardName.textContent = mestoInput;
    });

    grid.prepend(cardElement);
    
    addClosePopup();  
}

addElement.addEventListener('submit', formSubmit);



function openCard() {
    cardPopup.classList.add('popup_opened');
    let image = cardPopup.querySelector('.popup__image');
    let cardName = cardPopup.querySelector('.popup__image-title');
    image.src = grid.querySelector('.cards__photo').src;
    cardName.textContent = grid.querySelector('.cards__name').textContent;
}

const cardCloseButton = document.querySelector('.popup__close_card');

function closeCard() {
    cardPopup.classList.remove('popup_opened');
}

cardCloseButton.addEventListener('click', closeCard);

