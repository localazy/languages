/* eslint-disable no-console */
import chalk from 'chalk';

// Chalk text styles
const successText = chalk.green('✔');
const warningText = chalk.yellow('⚠');
const errorText = chalk.red('✖');
const normalText = chalk.dim;

export class Logger {
  /**
   *
   * @param {string} prefix
   */
  constructor(prefix) {
    this.prefix = chalk.cyan(`[${prefix}]`);
  }

  success(message) {
    console.info([this.prefix, successText, normalText(message)].join(' '));
  }

  error(message) {
    console.error([this.prefix, errorText, normalText(message)].join(' '));
  }

  warning(message) {
    console.warn([this.prefix, warningText, normalText(message)].join(' '));
  }

  info(message) {
    console.info([this.prefix, normalText(message)].join(' '));
  }
}
