export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = this._cardSelector
            .content
            .querySelector('.cards')
            .cloneNode(true);

        return cardElement;
    }

    _eventListener() {
        this._element.querySelector('.cards__photo').addEventListener('click', () => {
            this._handleCardClick();
        })
        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._likeToggler();
        })
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._deleteCard();
        })
    }


    _likeToggler() {
        this._cardLike.classList.toggle('cards__like_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardPhoto = this._element.querySelector('.cards__photo');
        this._cardName = this._element.querySelector('.cards__name');
        this._eventListener();

        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._name;
        this._cardName.textContent = this._name;

        return this._element;
    }
}