<p align="center">
  <a href="https://localazy.com">
    <img src="https://localazy.com/directus9/assets/9fc36b9c-81b7-4dbf-bd82-b64cd984090f" width="285" height="50" alt="Localazy" >
  </a>
</p>
<p align="center">
  <a href="https://localazy.com/docs/api">
    <img src="https://localazy.com/directus9/assets/20866781-e69b-4e01-9456-05437487b75c" width="50" height="50" alt="localazy-api">
  </a>
</p>

<div align="center">
<a href="https://github.com/localazy/languages"><img src="https://img.shields.io/badge/@localazy-languages-066fef?style=for-the-badge" height="22" alt="@localazy/languages"></a>
<a href="https://npmjs.com/package/@localazy/languages"><img src="https://img.shields.io/github/package-json/v/localazy/languages/main?style=for-the-badge&label=version&color=066fef" height="22" alt="npm"></a>
<a href="https://github.com/localazy/languages/blob/main/LICENSE"><img src="https://img.shields.io/github/license/localazy/languages?style=for-the-badge&color=066fef" height="22" alt="license"></a>
</div>

# 📦 Localazy Languages

> This repository contains all the [ISO 639](https://www.iso.org/iso-639-language-codes.html) languages supported by [Localazy](https://localazy.com).
> There are various forms of the content you may use

## 🔧 Install

```bash
npm install @localazy/languages
# or you can use yarn or pnpm
```

## 🚀 Usage

### Locales Enum

One of the exported content is an enum file with all the locales in form of _ENGLISH_LANGUAGE_NAME = "language_code"_, e.g. `CZECH_CZECHIA = CZECH_CZECHIA = "cs_CZ"`;

```javascript
import { Locales } from '@localazy/languages';

// ...

const czechia = locales.CZECH_CZECHIA;
```

### Localazy Languages

`getLocalazyLanguages` lists all languages in Localazy.

```javascript
import { getLocalazyLanguages, Language } from "@localazy/languages";

const languages: Language[] = getLocalazyLanguages();

console.log(languages);

// prints
// [
//  {
//      "important": true,
//      "localazyId": 0,
//      "name": "Latin American Spanish",
//      "rtl": false,
//      "locale": "es_419",
//      "englishName": "Latin American Spanish"
//  },
//  ...
// ]
```

Use `findLocalazyLanguageByLocale` if you're looking for a Localazy language identified by the locale.

```javascript
import { findLocalazyLanguageByLocale } from '@localazy/languages';

console.log(findLocalazyLanguageByLocale('cs_CZ'));

// prints
// {
//       "important": false,
//       "localazyId": 61,
//       "name": "Czech (Czechia)",
//       "rtl": false,
//       "locale": "cs_CZ",
//       "englishName": "Czech (Czechia)"
// }
```

The language object implements the _Language_ type which you may import as `import { Language } from "@localazy/languages";`

### Translated language names

To get a list of all Localazy language names in given language, use `resolveTranslatedList`

```javascript
import { resolveTranslatedList } from '@localazy/languages';

const translatedLanguagesList = await resolveTranslatedList('de');

console.log(translatedLanguagesList);

// prints
// {
//  ...
//       an:"Aragonesisch"
//       ang:"Altenglisch"
//       anp:"Angika"
//       ar:"Arabisch"
//       ar_001:"Arabisch (Welt)"
//  ...
// }
```

## JSON Languages data

This repository various language related JSON data

### Localized language list

Language names translated in their language

If you miss some language or find inaccurate translation, we will appreciate your [contribution](https://localazy.com/p/localazy-languages).

```javascript
import localizedLanguagesList from '@localazy/languages/data/localized-language-list';

console.log(localizedLanguagesList);

// prints
// {
//  ...
//       "cs": "Čeština",
//       "csb": "Kashubian",
//       "cu": "Церковнослове́нскїй",
//       "cv": "Chuvash",
//       "cy": "Cymraeg",
//       "da": "Dansk",
//       "dak": "Dakota",
//       "dar": "Dargwa",
//       "dav": "Kitaita",
//       "de": "Deutsch",
//  ...
// }
```

### Localazy languages

Same data that returns `getLocalazyLanguages`, but in JSON format.

```javascript
import localazyLanguages from '@localazy/languages/data/localazy-languages';

console.log(localazyLanguages);

// prints
// [
//  {
//      "important": true,
//      "localazyId": 0,
//      "name": "Latin American Spanish",
//      "rtl": false,
//      "locale": "es_419",
//      "englishName": "Latin American Spanish"
//  },
//  ...
// ]
```

### CLDR Multilingual language list

Returns languages recognized by CLDR. For each locale, it returns all other locales in given language.

```javascript
import cldrLanguages from '@localazy/languages/data/cldr-multilingual-language-list';

console.log(cldrLanguages);

// prints
// {
//  "languages": {
//    "aa": {
//      "af": "Afar",
//      "am": "አፋርኛ",
//      "ar": "الأفارية",
//      "as": "আফাৰ",
//      "ast": "afar",
//      "az": "afar",
//      "az#Cyrl": "афар",
//      "be": "афарская",
//      "bg": "афарски",
//      "bn": "আফার",
//      "br": "afar",
//      "bs": "afarski",
//  ...
// }
```

## ℹ️ Links

- [Localazy API documentation](https://localazy.com/docs/api)
- [Articles about the Localazy API](https://localazy.com/tags/api)

## 🛟 Support

Join the [Localazy Discussion Forum](https://discuss.localazy.com/) to discuss all things localization.

If you encounter any problems or have questions, you can use our forum, GitHub issues or contact us at
team@localazy.com.

## ❤️ Localazy Ecosystem

Check out other npm packages from Localazy:

|                                                                                                                                  | NPM package                                                                      | Description                          |
| :------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------ |
| <img src="https://localazy.com/directus9/assets/3f76ff7b-0e74-4046-bb03-4ca99c3b66d5" width="50" height="50" alt="cli">          | [@localazy/cli](https://www.npmjs.com/package/@localazy/cli)                     | Localazy CLI tool.                   |
| <img src="https://localazy.com/directus9/assets/20866781-e69b-4e01-9456-05437487b75c" width="50" height="50" alt="localazy-api"> | [@localazy/api-client](https://www.npmjs.com/package/@localazy/api-client)       | Localazy API client.                 |
| <img src="https://localazy.com/directus9/assets/1dd05c76-e517-4aea-a3d8-49cfddb40056" width="50" height="50" alt="strapi">       | [@localazy/strapi-plugin](https://www.npmjs.com/package/@localazy/strapi-plugin) | The official Localazy Strapi plugin. |

Discover all available [integration options and localization examples](https://github.com/localazy).

## 📜 License

Code released under the [MIT license](LICENSE).
