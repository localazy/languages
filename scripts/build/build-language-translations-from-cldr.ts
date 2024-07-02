import fse from 'fs-extra';
import cldrList from "../../src/language-lists/cldr-multilingual-language-list.json"


export type ParsedLanguageLocale = {
  languageCode: string;
  region?: string;
  script?: string;
};

const languages = ['cs', 'es'];

const substringBefore = (value: string, before: string, missingDelimiterValue?: string): string => {
  const beforeIndex = value.indexOf(before);
  const substringBefore = value.substring(0, beforeIndex);

  if (beforeIndex === -1) {
    return missingDelimiterValue !== undefined ? missingDelimiterValue : value;
  }

  return substringBefore;
};

const substringAfter = (value: string, after: string, missingDelimiterValue?: string): string => {
  const afterIndex = value.indexOf(after);
  const afterLength = after.length;
  const substringAfter = value.substring(afterIndex + afterLength);

  if (afterIndex === -1) {
    return missingDelimiterValue !== undefined ? missingDelimiterValue : value;
  }

  return substringAfter;
};



const parseLanguageLocale = (localeCode: string): ParsedLanguageLocale => {
  const languageCode = substringBefore(substringBefore(localeCode, "_"), "#");
  const region = substringBefore(substringAfter(localeCode, "_", ""), "#");
  const script = substringAfter(localeCode, "#", "");

  return {
    languageCode,
    region,
    script,
  };
};

const firstUpperCaseData = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

languages.forEach(language => {
  const englishFileName = `./src/language-lists/translations/en.json`;
  const translationFileName = `./src/language-lists/translations/${language}.json`;
  fse.ensureFileSync(translationFileName);
  fse.ensureFileSync(englishFileName);
  const translationFile = fse.readFileSync(translationFileName, 'utf8');
  const translationFileData = JSON.parse(translationFile || "{}");

  const englishFile = fse.readFileSync(englishFileName, 'utf8');
  const englishFileData = JSON.parse(englishFile || "{}");

  Object.keys(englishFileData).forEach((locale) => {
    const {languageCode, region, script} = parseLanguageLocale(locale);
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
          translation += ")";
        }
      }
    }

    if (script) {
      const scriptTranslations = cldrList.scripts[script];
      if (scriptTranslations && scriptTranslations[language]) {
        translation += region ? ", " : " (";
        translation += firstUpperCaseData(scriptTranslations[language]);
        translation += ")";
      }
    }

    console.log(locale, translation)
    console.log("____")
    translationFileData[locale] = translation;
  });



  fse.writeFileSync(translationFileName, JSON.stringify(translationFileData, null, 2), 'utf8');
});