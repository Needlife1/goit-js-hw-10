import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import hide from './index.js';

const API_KEY = (axios.defaults.headers.common['x-api-key'] =
  'live_CUCOLm21UCy9orHPDO7z4czTQ8rqIZblhzUJGEzSA0aFuo2RHqEUXHliZ5E99oE3');

const loader = document.querySelector('.loader');

function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?x-api-key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
        hide(loader);
        return;
      }
      return response.json();
    }
  );
}

function fetchCatByBreed(id) {
  return fetch(` https://api.thecatapi.com/v1/images/${id}`).then(response => {
    if (!response.ok) {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      hide(loader);
      return;
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
