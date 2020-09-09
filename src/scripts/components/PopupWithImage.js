import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(data) {
        super.open()
        this._popup.querySelector('.popup__image').src = data.link;
        this._popup.querySelector('.popup__image-title').textContent = data.name;
    }
}