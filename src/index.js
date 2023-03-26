import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

import fetchCountries from './fetchCountries';

import { DEBOUNCE_DELAY, NOTIFY_MSG } from './constant';

import './css/styles.css';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const cleanResult = () => {
    countryList.innerHTML = ''
    countryInfo.innerHTML = ''
}

const createListCountryItem = ({ flags, name }) => {
    return `
    <li class="country-list__item">
        <img src="${flags.svg}" alt="${flags.alt}">
        <span>${name.common}<span>
    <li>`
}

const renderListCounties = (countyList) => {
    const list = countyList.map(createListCountryItem);

    countryList.innerHTML = list.join('');
}

const renderCountry = ({ name, capital, population, languages, flags }) => {
    const languagesValue = Object.values(languages).join(', ');
    const capitalValue = capital[0];

    countryList.innerHTML = `
        <div class="country-info-card">
            <div class="country-info-card__header">
                <img src="${flags.svg}" alt="${flags.alt}">
                <h1>${name.common}</h1>
            </div>
            <ul class="country-info-card__description">
                <li><b>Capital:</b> ${capitalValue}</li>
                <li><b>Population:</b> ${population}</li>
                <li><b>Languages:</b> ${languagesValue}</li>
            </ul>
        </div>`
}

function handleChange(e) {
    const countryName = e.target.value.trim();

    if (!countryName) return;

    cleanResult();
    fetchCountries(countryName).then((result) => {
        if (result.length > 10) {
            Notiflix.Notify.info(NOTIFY_MSG.TOO_MANY_COUNTRIES)
            return;
        }

        if (result.length <= 10 && result.length > 1) {
            renderListCounties(result);
            return;
        }

        if (result.length === 1) {
            renderCountry(result[0])
        }
    }).catch(() => {
        Notiflix.Notify.failure(NOTIFY_MSG.NO_COUNTRIES);
    });
}


input.addEventListener('input', debounce((e) => handleChange(e), DEBOUNCE_DELAY)
);