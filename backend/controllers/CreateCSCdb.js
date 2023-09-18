import { Country, State, City } from "country-state-city";
import fs from "fs";

const countries = Country.getAllCountries();
const states = State.getAllStates();
const cities = City.getAllCities();

// create a api call to create a db of countries, states, cities

const countryStateCity = (city) => {
  const state = states.find(
    (state) =>
      state.isoCode === city.stateCode && state.countryCode === city.countryCode
  );
  const country = countries.find(
    (country) =>
      country.isoCode === city.countryCode &&
      country.isoCode === state.countryCode
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

// fs.writeFile("./CreateCSCdb.json", JSON.stringify(data), (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

export default data;
