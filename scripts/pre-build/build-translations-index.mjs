import fse from 'fs-extra';
import { Logger } from '../utils/logger.mjs';
import { basename } from 'path';
import { fileURLToPath } from 'url';

const logger = new Logger(basename(fileURLToPath(import.meta.url)));

async function runCommand() {
  logger.info('Building Translated Language Lists Index');
  const translationFolder = fse.readdirSync('./src/data/translations');
  let indexContent = '';

  translationFolder.forEach((file) => {
    const languageName = /(.*)\.json/.exec(file)?.[1];
    const exportName = `${languageName}_localized_list`;
    indexContent += `import * as ${exportName} from "./translations/${file}";\n`;
    indexContent += `export { ${exportName} };\n\n`;
  });

  fse.writeFileSync('./src/data/translated-language-lists.ts', indexContent, { encoding: 'utf8' });
  logger.success('Built Translated Language Lists Index');
}

runCommand().catch((err) => {
  // eslint-disable-next-line no-console
  logger.error(err);
  process.exit(1);
});
