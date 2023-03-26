import { COUNTRIES_SEAR_FIELDS } from "./constant";

function fetchCountries(countryName) {
    const searchParams = new URLSearchParams({
        fields: COUNTRIES_SEAR_FIELDS,
    });
    const url = `https://restcountries.com/v3.1/name/${countryName}?${searchParams}`;

    return fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(res);
        }

        return res.json()
    })
};

export default fetchCountries
