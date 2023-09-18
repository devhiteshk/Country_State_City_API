import { Country, State, City } from "country-state-city";

const countries = Country.getAllCountries();
const states = State.getAllStates();
const cities = City.getAllCities();

// create a api call to create a db of countries, states, cities

const countryStateCity = (city) => {
  const state = states.find((state) => state.isoCode === city.stateCode);
  const country = countries.find(
    (country) => country.isoCode === state.countryCode
  );

  return {
    csc: city.name + ", " + state.name + ", " + country.name,
    city,
    state,
    country,
  };
};

let data = [];

cities.forEach((city) => {
  data.push(countryStateCity(city));
});

export default data;
