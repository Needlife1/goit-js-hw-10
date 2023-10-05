import './css/styles.css';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const DEBOUNCE_DELAY = 300;

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

document.addEventListener('DOMContentLoaded', fetchBreeds);
select.addEventListener('change', findsId);

fetchBreeds().then(arg => {
  renderOption(arg);
  show(select);
  hide(loader);
});

function findsId(e) {
  show(loader);
  catInfo.innerHTML = '';
  const selectedOption = e.target.value;
  fetchCatByBreed(selectedOption).then(({ url, breeds }) => {
    const infoCat = breeds[0];
    renderCatCard(url, infoCat);
    hide(loader);
  });
}

function renderOption(params) {
  console.log(params);
  const marcup = params
    .map(({ reference_image_id, name }) => {
      return `<option  value="${reference_image_id}">${name}</option>`;
    })
    .join();

  select.insertAdjacentHTML('beforeend', marcup);

  new SlimSelect({
    select: '#single',
  });
}

function renderCatCard(url, info) {
  const { name, description, temperament } = info;
  const card = `<div class="card">
  <img src="${url}" width = 400 heigth = 450></img>
  <div class="cover">
   <h1>${name}</h1>
    <p>${description}</p>
    <p><span>Temperament: </span>${temperament}</p></div>
  </div>`;

  catInfo.innerHTML = card;
}

function hide(arg) {
  arg.classList.add('is-hidden');
}

function show(arg) {
  arg.classList.remove('is-hidden');
}

export { hide };
