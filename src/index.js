import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(event) {
    let searchOutput = event.target.value.trim();
    if (searchOutput) {
        fetchCountries(searchOutput).then(renderCountryInfo).catch(onError);
    } else {
        clearMarkap();
    }
};

function renderCountryInfo(countries) {
    clearMarkap();
    let amount = countries.length;
    if (amount > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (amount > 1 && amount < 11) {
        renderCountriesMarkap(countries);
    } else if ((amount = 1)) {
        renderCountryMarkap(countries);
            }
};

function renderCountriesMarkap(countries) {
    countries.map(({ name, flags }) => {
        const listItem = `<li class ="country-list__item">
            <img class = "flag" src="${flags.svg}" alt="flag" width="60" height="30">
            </img>${name.official}</li>`;
            countryList.insertAdjacentHTML('beforeend', listItem);
        });
};

function renderCountryMarkap(countries) {
    countries.map(({ name, capital, population, flags, languages }) => {
            let langs = [];
            Object.values(languages).forEach(language => {
                langs.push(language);
            });
        const country = `<h2>
            <img class = "flag" src="${flags.svg}" alt="flag" width="60" height="30">
            </img>${name.official}</h2>
      <h3>Capital : ${capital}</h3>
      <h3>Population : ${population}</h3>
      <h3>Languages : ${langs}</h3>`;
            countryInfo.insertAdjacentHTML('beforeend', country);
        });
};

function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
};

function clearMarkap() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
};
