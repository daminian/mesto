export class Card {
    constructor({ data }, cardSelector, handleCardClick, handleCardLike, deleteCardClick, userId) {
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes;
        this._id = data._id;
        this._author = data.owner;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._deleteCardClick = deleteCardClick;
        this._clickLike = () => {
            this._handleCardLike({
                id: this._id,
                like: this._element.querySelector('.cards__like').classList.contains('cards__like_active')
            })
        }
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
            this._clickLike();
        })
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._deleteCardClick();
        })
    }


    handleLike(count) {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
        this._element.querySelector('.cards__like-counter').textContent = count;
    }

    handleDeleteCard() {
        this._element.querySelector('.cards__photo').removeEventListener('click', () => {
            this._handleCardClick()
        });
        this._element.querySelector('.cards__like').removeEventListener('click', () => {
            this._clickLike()
        });
        this._element.querySelector('.cards__trash').removeEventListener('click', () => {
            this._deleteCardClick()
        });
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardPhoto = this._element.querySelector('.cards__photo');
        this._cardName = this._element.querySelector('.cards__name');
        this._likeCounter = this._element.querySelector('.cards__like-counter');
        this._eventListener();
        if (this._author._id !== this._userId) {
            this._element.querySelector('.cards__trash').remove();
        }

        if (this._like.some((user) => (user._id === this._userId))) {
            this._element.querySelector('.cards__like').classList.add('cards__like_active')
        }
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._name;
        this._cardName.textContent = this._name;
        this._likeCounter.textContent = this._like.length;

        return this._element;
    }
}