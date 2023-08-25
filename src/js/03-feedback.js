import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const userData = {};

const fillFormInputes = () => {
  const dataLocal = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (dataLocal === null) {
    return;
  }
  for (const prop in dataLocal) {
    formEl.elements[prop].value = dataLocal[prop];
  }
};

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

const onFormSubmit = event => {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  formEl.reset();
};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);
