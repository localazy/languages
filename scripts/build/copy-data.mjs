#!/usr/bin/env node

import fse from 'fs-extra';
import { Logger } from '../utils/logger.mjs';
import { basename } from 'path';
import { fileURLToPath } from 'url';

const logger = new Logger(basename(fileURLToPath(import.meta.url)));

async function runCommand() {
  logger.info('Copying json data');
  await fse.copy('./src/data', './dist/data');
  logger.success('Copied /src/data to /dist/data');
}

runCommand().catch((err) => {
  logger.error(err);
  process.exit(1);
});
