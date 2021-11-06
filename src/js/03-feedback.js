import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs ={
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea'),
    submit: document.querySelector('button'),
    email: document.querySelector('input')
}

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('input', event =>{    
    formData[event.target.name] = event.target.value   
})

populateTextarea();

function onFormSubmit(event){
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY)
    // console.log('отправляем форму')
}

function onTextareaInput(event){
 const message = event.target.value;
 localStorage.setItem(STORAGE_KEY, message)
//  console.log(message)
}
function populateTextarea(){
    const saveMessage =localStorage.getItem(STORAGE_KEY);
    if(saveMessage){
        refs.textarea.value = saveMessage ;
    }
}