const cardPopup = document.querySelector('.popup-card');
const imageNameCard = cardPopup.querySelector('.popup__image-title');
const imagePhotoCard = cardPopup.querySelector('.popup__image');
import escapeClosePopup from './index.js';

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.template-card')
            .content
            .querySelector('.cards')
            .cloneNode(true);

        return cardElement;
    }

    _eventListener() {
        this._element.querySelector('.cards__photo').addEventListener('click', () => {
            this._openPopup();
        })
        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._likeToggler();
        })
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._deleteCard();
        })
    }

    _openPopup() {
        imagePhotoCard.src = this._link;
        imageNameCard.textContent = this._name;
        cardPopup.classList.add('popup_opened');
        document.addEventListener('keydown', escapeClosePopup);
    }

    _likeToggler() {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._eventListener();

        this._element.querySelector('.cards__photo').src = this._link;
        this._element.querySelector('.cards__name').textContent = this._name;

        return this._element;
    }
}