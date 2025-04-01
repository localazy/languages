import { Language } from '../models/language';
import localazyLanguages from '../data/localazy-languages.json';

export const findLocalazyLanguageByLocale = (locale: string): Language | undefined => {
  return getLocalazyLanguages().find((language) => language.locale === locale);
};

export const getLocalazyLanguages = (): Language[] => localazyLanguages;
