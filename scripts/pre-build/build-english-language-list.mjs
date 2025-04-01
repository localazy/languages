#!/usr/bin/env node

import fse from 'fs-extra';
import { basename } from 'path';
import { fileURLToPath } from 'url';
import localazyLanguages from '../../src/data/localazy-languages.json' with { type: 'json' };
import { Logger } from '../utils/logger.mjs';

const logger = new Logger(basename(fileURLToPath(import.meta.url)));

async function runCommand() {
  const filePath = './src/data/translations/en.json';
  logger.info('Building English Language List');
  const languages = {};

  localazyLanguages.forEach((language) => {
    languages[language.locale] = language.name;
  });

  fse.writeJsonSync(filePath, languages, { encoding: 'utf-8', spaces: 2 });
  logger.success(`Built English Language List in ${filePath}`);
}

runCommand().catch((err) => {
  // eslint-disable-next-line no-console
  logger.error(err);
  process.exit(1);
});
