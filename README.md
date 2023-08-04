# @localazy/languages
This repository contains all the [ISO 639](https://www.iso.org/iso-639-language-codes.html) languages supported by [Localazy](https://localazy.com).
There are various forms of the content you may use.

- **Maintained by:** [Localazy s.r.o.](https://localazy.com)
- **Where to get help:** [Documentation](https://localazy.com/docs)

## Insallation
```
npm i @localazy/languages
```

## TypeScript
### Locales enum
One of the exported content is an enum file with all the locales in form of *ENGLISH_LANGUAGE_NAME = "language_code"*, e.g. `CZECH_CZECHIA = CZECH_CZECHIA = "cs_CZ"`;

```javascript
import { Locales } from "@localazy/languages";

// ...

const czechia = locales.CZECH_CZECHIA;
```

### Language resolver
Second typescript file provides following functions

```javascript
import { getLocalazyLanguages } from "@localazy/languages";

console.log(getLocalazyLanguages());

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

```javascript
import { findLocalazyLanguageByLocale } from "@localazy/languages";

console.log(findLocalazyLanguageByLocale("cs_CZ"));

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

The language object implements the *Language* type which you may import as `import { Language } from "@localazy/languages";`

## JSON Languages overview
This repository also contains JSON overview of languages that have been translated in native language in Localazy.
If you miss some language or find inaccurate translation, we will appreciate your [contribution](https://localazy.com/p/localazy-languages).

You may import the languages list like this.
```javascript
import { languagesList} from "@localazy/languages";
```

## Contributing
To add translations for additional languages or to improve existing translations, join our [Localazy project](https://localazy.com/p/localazy-languages).

Otherwise you may either open a PR or create an issue.