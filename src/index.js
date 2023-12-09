import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//DOM links
const breedSelectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

function catBreed(data) {
    fetchBreeds(data).then(data => {
    loaderElement.classList.replace('loader', 'is-hidden');

    let optionsMarkup = data.map(({ name, id}) => {
        return `<option value = '${id}'>${name}</option>`;
    });
    breedSelectElement.insertAdjacentHTML('beforeend', optionsMarkup);
    breedSelectElement.classList.remove('is-hidden');

    })
    .catch(onError);
}

catBreed();

function createMarkup(event) {
    loaderElement.classList.replace('is-hidden', 'loader');
    breedSelectElement.classList.add('is-hidden');
    catInfoElement.classList.add('is-hidden');

    const breedId = event.target.value;

    fetchCatByBreed(breedId).then(data => {
        loaderElement.classList.replace('loader', 'is-hidden');
        breedSelectElement.classList.remove('is-hidden');

        const { url, breeds } = data[0];
        const { name, description, temperament } = breeds[0];

        catInfoElement.innerHTML =`
        <img src="${url}" alt="${name}" width="400"/>
        <div class="box">
            <h2 class="title">${name}</h2>
            <p class="text">${description}</p>
            <p class="subtitle"><strong>Temperament:</strong> ${temperament}</p>
        </div>`;

        catInfoElement.classList.remove('is-hidden');
        Notify.success('rawwwrr', {position: 'left-top', timeout: 1000});
    })
    .catch(onError);
}

breedSelectElement.addEventListener('change', createMarkup);

function onError() {
    errorElement.classList.remove('is-hidden');
    breedSelectElement.classList.add('is-hidden');
}