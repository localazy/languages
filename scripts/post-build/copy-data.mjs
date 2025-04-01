#!/usr/bin/env node

import fse from 'fs-extra';
import { basename } from 'path';
import { fileURLToPath } from 'url';
import { Logger } from '../utils/logger.mjs';

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
