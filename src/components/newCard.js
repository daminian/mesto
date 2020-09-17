import { cardTemplate } from '../utils/constants.js';
import { cardList, cardImagePopup, cardDeletePopup } from '../pages/index.js';
import { Card } from './Card.js';
import { api } from '../pages/index.js';

let itemsCard = []
const addClassCard = function(item, card) {
    itemsCard.unshift({
        id: item._id,
        class: card
    })
}

export let itemDelete
const generateCard = function(item, userId) {
    const card = new Card({ data: item }, cardTemplate,
        () => cardImagePopup.open(item),
        (card) => {
            if (card.like) {
                deliteLike(card)
            } else {
                likeCard(card)
            }
        },
        () => {
            itemDelete = item;
            cardDeletePopup.open()
        },
        userId);
    addClassCard(item, card)
    const cardElement = card.generateCard();
    return cardElement
}
export const createCard = function(item, userId) {
    const cardElement = generateCard(item, userId)
    cardList.addItem(cardElement);
}

export const newCard = function(item) {
    api.postNewCard(item)
        .then((res) => {
            createCard(res, res.owner._id)
        })
}

const likeCard = function(card) {
    api.addLike(card.id)
        .then((res) => {
            itemsCard.find((item) => (item.id === res._id)).class.handleLike(res.likes.length);
        })
        .catch((err) => {
            console.log('Ошибка: ' + err)
        })
}

const deliteLike = function(card) {
    api.deliteLike(card.id)
        .then((res) => {
            itemsCard.find((item) => (item.id === res._id)).class.handleLike(res.likes.length)
        })
}

export const deleteCard = function(item) {
    api.deleteCard(item)
        .then((res) => {
            const classCard = itemsCard.find((card) => (card.id === item));
            classCard.class.handleDeleteCard();
            itemsCard = itemsCard.filter(item => item !== classCard);
            console.log(res)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            cardDeletePopup.close();
        })
}