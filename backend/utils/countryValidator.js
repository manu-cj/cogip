// validation.js
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json' assert { type: 'json' };

// Load the English locale for country names
countries.registerLocale(enLocale);

// Function to validate the country code
export function validateCountryCode(code) {
  return countries.isValid(code.toUpperCase());
}

// Function to validate the country name
export function validateCountryName(name) {
  const countryCode = countries.getAlpha2Code(name, 'en');
  return countryCode !== undefined;
}

export default {validateCountryName};