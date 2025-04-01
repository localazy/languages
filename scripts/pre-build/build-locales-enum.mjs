#!/usr/bin/env node

import fse from 'fs-extra';
import localazyLanguages from '../../src/data/localazy-languages.json' with { type: 'json' };
import { Logger } from '../utils/logger.mjs';
import { basename } from 'path';
import { fileURLToPath } from 'url';

const logger = new Logger(basename(fileURLToPath(import.meta.url)));

async function runCommand() {
  logger.info('Building Locales Enum');
  let content = 'export enum Locales {\n';
  localazyLanguages.forEach((language, index) => {
    const sanitizedLanguage = language.name
      .replace(/&/g, 'and')
      .replace(/[)(,.]/g, '')
      .replace(/[\s]/g, '_')
      .replace(/[-#’']/g, '_')
      .toUpperCase();
    content += `\t${sanitizedLanguage} = "${language.locale}"`;
    if (index !== localazyLanguages.length - 1) {
      content += ',\n';
    } else {
      content += '\n';
    }
  });

  content += '}\n';

  fse.writeFileSync('./src/enums/locales.ts', content, { encoding: 'utf-8' });
  logger.success('Built Locales Enum');
}

runCommand().catch((err) => {
  // eslint-disable-next-line no-console
  logger.error(err);
  process.exit(1);
});
