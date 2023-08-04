import fse from 'fs-extra'

async function buildTranslationsIndex() {
  const translationFolder = fse.readdirSync('./src/translations');

  const indexFile = translationFolder.reduce((acc, file) => {
    if (file === 'index.ts') return acc;
    const language = /(.*)\.json/.exec(file)?.[1];
    let sanitizedLanguage = language?.replace(/[-#]/g, '_') || '';
    sanitizedLanguage = sanitizedLanguage === 'new' ? 'new_' : sanitizedLanguage;
    let exportDts = `import * as ${sanitizedLanguage} from "./${file}";\n`;
    exportDts += `export {${sanitizedLanguage}};\n`;
    acc.push(exportDts);
    return acc;
  }, [] as string[])

  fse.writeFileSync('./src/translations/index.ts', indexFile.join('\n'))
}

buildTranslationsIndex();