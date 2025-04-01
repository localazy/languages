#!/usr/bin/env node

import fse from 'fs-extra';
import cldrList from '../../src/data/cldr-multilingual-language-list.json' with { type: 'json' };
import { Logger } from '../utils/logger.mjs';
import { basename } from 'path';
import { fileURLToPath } from 'url';
import { readEnvFile } from '../utils/resolve-env-file.mjs';

const logger = new Logger(basename(fileURLToPath(import.meta.url)));

/**
 * @typedef {Object} ParsedLanguageLocale
 * @property {string} languageCode
 * @property {string?} region
 * @property {string?} script
 */

/**
 * @description Get the substring before the first occurrence of a specified delimiter.
 * If the delimiter is not found, return the original string or a specified missing delimiter value.
 * @param {string} value - The string to search in.
 * @param {string} before - The delimiter to search for.
 * @param {string} [missingDelimiterValue] - The value to return if the delimiter is not found.
 * @return {string} - The substring before the delimiter or the original string/missing value.
 */
const substringBefore = (value, before, missingDelimiterValue) => {
  const beforeIndex = value.indexOf(before);
  const substringBefore = value.substring(0, beforeIndex);

  if (beforeIndex === -1) {
    return missingDelimiterValue !== undefined ? missingDelimiterValue : value;
  }

  return substringBefore;
};

/**
 * @description Get the substring after the first occurrence of a specified delimiter.
 * If the delimiter is not found, return the original string or a specified missing delimiter value.
 * @param {string} value - The string to search in.
 * @param {string} after - The delimiter to search for.
 */
const substringAfter = (value, after, missingDelimiterValue) => {
  const afterIndex = value.indexOf(after);
  const afterLength = after.length;
  const substringAfter = value.substring(afterIndex + afterLength);

  if (afterIndex === -1) {
    return missingDelimiterValue !== undefined ? missingDelimiterValue : value;
  }

  return substringAfter;
};

/**
 * Parses a locale code string into its language code, region, and script components.
 *
 * @param {string} localeCode - The locale code string (e.g. "en_US#Latn").
 * @returns {ParsedLanguageLocale} An object with properties: languageCode, region, and script.
 */
const parseLanguageLocale = (localeCode) => {
  const languageCode = substringBefore(substringBefore(localeCode, '_'), '#');
  const region = substringBefore(substringAfter(localeCode, '_', ''), '#');
  const script = substringAfter(localeCode, '#', '');

  return {
    languageCode,
    region,
    script,
  };
};

/**
 * Capitalizes the first letter of the provided text.
 *
 * @param {string} text - The text to capitalize.
 * @returns {string} The text with the first character in uppercase.
 */
const firstUpperCaseData = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

async function runCommand() {
  const envFile = readEnvFile();
  const languages = envFile.GENERATE_LOCALES?.split(',') || [];

  logger.info(`Building Language Translations from CLDR into {languages}`);
  languages.forEach((language) => {
    const englishFileName = `./src/data/translations/en.json`;
    const translationFileName = `./src/data/translations/${language}.json`;
    fse.ensureFileSync(translationFileName);
    fse.ensureFileSync(englishFileName);
    const translationFile = fse.readFileSync(translationFileName, 'utf8');
    const translationFileData = JSON.parse(translationFile || '{}');

    const englishFile = fse.readFileSync(englishFileName, 'utf8');
    const englishFileData = JSON.parse(englishFile || '{}');

    Object.keys(englishFileData).forEach((locale) => {
      const { languageCode, region, script } = parseLanguageLocale(locale);
      const languageTranslations = cldrList.languages[languageCode];
      let translation = '';
      if (languageTranslations && languageTranslations[language]) {
        translation = firstUpperCaseData(languageTranslations[language]);
      }

      if (region) {
        const regionTranslations = cldrList.regions[region];
        if (regionTranslations && regionTranslations[language]) {
          translation += ` (${firstUpperCaseData(regionTranslations[language])}`;

          if (!script) {
            translation += ')';
          }
        }
      }

      if (script) {
        const scriptTranslations = cldrList.scripts[script];
        if (scriptTranslations && scriptTranslations[language]) {
          translation += region ? ', ' : ' (';
          translation += firstUpperCaseData(scriptTranslations[language]);
          translation += ')';
        }
      }

      translationFileData[locale] = translation;
    });

    fse.writeFileSync(translationFileName, `${JSON.stringify(translationFileData, null, 2)}\n`, 'utf8');
  });
  logger.success(`Built Language Translations from CLDR in ${languages.join(', ')}`);
}

runCommand().catch((err) => {
  // eslint-disable-next-line no-console
  logger.error(err);
  process.exit(1);
});
