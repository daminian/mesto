import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ handleSubmitForm }, popupSelector) {
        super(popupSelector),
            this._handleSubmitForm = handleSubmitForm
        this._form = this._popup.querySelector('.popup__form')
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues())
            this.close();
        })
    }

    close() {
        super.close();

        this._form.reset();
    }

}