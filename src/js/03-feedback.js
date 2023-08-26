const formEl = document.querySelector('.feedback-form');

const email = document.querySelector('input[name="email"]'); // посилання на input (поле введення Email)
const message = document.querySelector('textarea[name="message"]'); // посилання на textarea (поле введення Message)
const LOCALSTORAGE_KEY = 'feedback-form-state'; // змінна, яка сберігає назву ключа у локальному сховищі
const inputFormData = { email: '', message: '' };
const userData = {};

const fillFormInputes = () => {
  const dataLocal = JSON.parse(localStorage.getItem('.feedback-form-state'));
  if (dataLocal === null) {
    return;
  }
  for (const prop in dataLocal) {
    formEl.elements[prop].value = dataLocal[prop];
  }
};

const onFormSubmit = event => {
  event.preventDefault();
  if (email.value.trim() === '' || message.value.trim() === '') {
    console.log('Please fill in all required fields.');
    return;
  }
  localStorage.removeItem(LOCALSTORAGE_KEY);
  email.value = '';
  message.value = '';
  console.dir('event.turget = ', event.turget);
};
formEl.addEventListener('submit', onFormSubmit);

fillFormInputes();

const onFormInput = ({ target }) => {
  const userKey = target.name;
  const userValue = target.value;
  userData[userKey] = userValue;
  const dataLocal = JSON.parse(localStorage.getItem('feedback-form-state'));
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ ...dataLocal, ...userData })
  );
};
