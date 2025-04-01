#!/usr/bin/env node

import { config } from 'dotenv';

function resolveEnvFile() {
  const args = process.argv;
  const modeIndex = args.findIndex((arg) => arg.startsWith('--mode'));
  const mode = modeIndex !== -1 ? args[modeIndex + 1] : 'development';
  if (mode === 'production') {
    return '.env.production';
  }

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
