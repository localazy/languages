import fse from 'fs-extra'
import { getLocalazyLanguages } from '../../src';

async function buildLocalesEnum() {
  let content = "export enum Locales {\n";
  getLocalazyLanguages().forEach((language, index) => {
    const sanitizedLanguage = language.name
    .replace(/&/g, "and")
    .replace(/[)(,.]/g, "")
    .replace(/[\s]/g, '_')
    .replace(/[-#’']/g, '_')
    .toUpperCase();
    content += `\t${sanitizedLanguage} = "${language.locale}"`;
    if (index !== getLocalazyLanguages().length - 1) {
      content += ",\n";
    } else {
      content += "\n";
    }
  });

  content += "}\n";

  fse.writeFileSync('./src/locales.ts', content, { encoding: 'utf-8'})
}

buildLocalesEnum();