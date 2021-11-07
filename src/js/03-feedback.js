import throttle from 'lodash.throttle';



const refs = {
    feedbackForm: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector("input"),
    inputMessage: document.querySelector("textarea"),
    userSubmit: document.querySelector("button"),
}


const STORAGE_KEY = 'feedback-form-state';
const userData = {};


if (localStorage[STORAGE_KEY]) {

    const userLocalData = JSON.parse(localStorage[STORAGE_KEY]);

    refs.inputEmail.value = userLocalData.email;
    refs.inputMessage.value = userLocalData.message;
}


refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
    const formData = new FormData(refs.feedbackForm);

    formData.forEach((value, name) => {

        userData[name] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

    });
}


refs.feedbackForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {

    event.preventDefault();

    const userLocalData = JSON.parse(localStorage[STORAGE_KEY]);
    console.log(userLocalData);

    localStorage.removeItem(STORAGE_KEY);

    refs.inputEmail.value = "";
    refs.inputMessage.value = "";
}