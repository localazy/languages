#!/usr/bin/env node

import fse from 'fs-extra';
import { exec } from 'node:child_process';
import { basename } from 'path';
import { fileURLToPath } from 'url';
import localazyLanguages from '../../src/data/localazy-languages.json' with { type: 'json' };
import { Logger } from '../utils/logger.mjs';

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

  const enumPath = './src/enums/locales.ts';
  fse.writeFileSync(enumPath, content, { encoding: 'utf-8' });

  // Format the file with Prettier
  await exec(`npx prettier ${enumPath} --write`);

  logger.success('Built Locales Enum');
}

runCommand().catch((err) => {
  logger.error(err);
  process.exit(1);
});
