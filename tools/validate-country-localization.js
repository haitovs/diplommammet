#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadScript(filePath, sandbox, exportName) {
  const source = fs.readFileSync(filePath, 'utf8');
  const suffix = exportName ? `\nthis.${exportName} = ${exportName};` : '';
  vm.runInContext(`${source}${suffix}`, sandbox, { filename: filePath });
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validate() {
  const rootDir = process.cwd();
  const countriesFile = path.join(rootDir, 'js/data/countries.js');
  const localizationFile = path.join(rootDir, 'js/data/countryLocalization.js');

  const sandbox = {
    console,
    window: {}
  };
  vm.createContext(sandbox);

  loadScript(countriesFile, sandbox, 'COUNTRIES');
  loadScript(localizationFile, sandbox, 'COUNTRY_LOCALIZATION');

  const countries = sandbox.COUNTRIES;
  const localization = sandbox.COUNTRY_LOCALIZATION || sandbox.window.COUNTRY_LOCALIZATION;

  if (!Array.isArray(countries)) {
    throw new Error('COUNTRIES array was not loaded.');
  }
  if (!localization || typeof localization !== 'object') {
    throw new Error('COUNTRY_LOCALIZATION map was not loaded.');
  }

  const errors = [];

  countries.forEach(country => {
    const entry = localization[country.id];
    if (!entry) {
      errors.push(`Missing localization entry for country id "${country.id}".`);
      return;
    }

    ['ru', 'tk'].forEach(lang => {
      const localeEntry = entry[lang];
      if (!localeEntry) {
        errors.push(`Missing locale "${lang}" for country id "${country.id}".`);
        return;
      }

      ['name', 'capital', 'continent', 'region'].forEach(field => {
        if (!isNonEmptyString(localeEntry[field])) {
          errors.push(`Invalid ${lang}.${field} for country id "${country.id}".`);
        }
      });

      if (!Array.isArray(localeEntry.facts)) {
        errors.push(`Missing ${lang}.facts array for country id "${country.id}".`);
      } else {
        if (localeEntry.facts.length !== 5) {
          errors.push(`Expected 5 facts for ${lang} in country id "${country.id}", got ${localeEntry.facts.length}.`);
        }

        localeEntry.facts.forEach((fact, index) => {
          if (!isNonEmptyString(fact)) {
            errors.push(`Invalid ${lang}.facts[${index}] for country id "${country.id}".`);
          }
        });
      }
    });
  });

  if (errors.length > 0) {
    console.error('Country localization validation failed:\n');
    errors.forEach(err => console.error(`- ${err}`));
    process.exit(1);
  }

  console.log(`Country localization validation passed for ${countries.length} countries (ru/tk).`);
}

validate();
