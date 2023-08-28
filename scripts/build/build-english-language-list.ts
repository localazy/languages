import fse from 'fs-extra';
import {getLocalazyLanguages} from "../../src/localazy-languages";

async function buildEnglishLanguageList() {
  const languages: Record<string, string> = {};

  getLocalazyLanguages().forEach((language) => {
    languages[language.locale] = language.name;
  })

  fse.writeJsonSync('./src/language-lists/translations/en.json', languages, { encoding: 'utf-8', spaces: 2})
}

buildEnglishLanguageList();