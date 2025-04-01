#!/usr/bin/env node

import { config } from 'dotenv';

function resolveEnvFile() {
  return '.env';
}

/**
 * Read env file
 *
 * @returns {Record<string, string>}
 */
export function readEnvFile() {
  return config({
    path: resolveEnvFile(),
  }).parsed;
}

resolveEnvFile();
