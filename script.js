let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit');
let popupClose = popup.querySelector('.popup__close');

function openPopup() {
popup.classList.add('popup_opened');
}

function closePopup() {
 popup.classList.remove('popup_opened');  
}

editButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);


let formElement = popup.querySelector('.popup__container');

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