const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    eventListener(formElement, rest);
  })
}

const eventListener = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(inputElement, formElement, rest)

      toggleButton(inputList, buttonSubmit, rest);
    })
  })
}

const hideError = (inputElement, formElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const showError = (inputElement, formElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (inputElement, formElement, rest) => {
  if (inputElement.validity.valid) {
    hideError(inputElement, formElement, rest);
  } else {
    showError(inputElement, formElement, rest);
  }
}

const isFormInvalid = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

const toggleButton = (inputList, buttonSubmit, { ...rest }) => {
  if (isFormInvalid(inputList)) {
    inactiveButton(buttonSubmit, rest)
  } else {
    activeButton(buttonSubmit, rest)
  }
}

const inactiveButton = (buttonSubmit, { inactiveButtonClass }) => {
  buttonSubmit.classList.add(inactiveButtonClass);
  buttonSubmit.disabled = true;
}

const activeButton = (buttonSubmit, { inactiveButtonClass }) => {
  buttonSubmit.classList.remove(inactiveButtonClass);
  buttonSubmit.disabled = false;
}

enableValidation(formObject);
