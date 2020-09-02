export class FormValidator {
    constructor(formElements, form) {
        this._formSelector = formElements.formSelector;
        this._inputSelector = formElements.inputSelector;
        this._submitButtonSelector = formElements.submitButtonSelector;
        this._inactiveButtonClass = formElements.inactiveButtonClass;
        this._inputErrorClass = formElements.inputErrorClass;
        this._errorClass = formElements.errorClass;

        this._form = form;
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._inactiveButton(this._buttonSubmit);
        });
        this._eventListener(this._form);
    }

    _eventListener(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonSubmit = formElement.querySelector(this._submitButtonSelector);
        this._toggleButton(inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
                this._checkInputValidity(inputElement, formElement)

                this._toggleButton(inputList);
            })
        })
    }

    _hideError(inputElement, formElement) {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _showError(inputElement, formElement) {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _checkInputValidity(inputElement, formElement) {
        if (inputElement.validity.valid) {
            this._hideError(inputElement, formElement);
        } else {
            this._showError(inputElement, formElement);
        }
    }

    _isFormInvalid = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    _toggleButton(inputList) {
        if (this._isFormInvalid(inputList)) {
            this._inactiveButton()
        } else {
            this._activeButton()
        }
    }

    _inactiveButton() {
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.disabled = true;
    }

    _activeButton() {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
    }
}
