import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__image')
        this._popupImageText = this._popup.querySelector('.popup__image-title')
    }

    open(data) {
        super.open()
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupImageText.textContent = data.name;
    }
}
