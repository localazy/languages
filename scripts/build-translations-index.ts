import fse from 'fs-extra'

async function buildTranslationsIndex() {
  const translationFolder = fse.readdirSync('./src/translations');

  const indexFile = translationFolder.reduce((acc, file) => {
    if (file === 'index.ts') return acc;
    console.log(file)
    const language = /(.*)\.json/.exec(file)?.[1];
    let exportDts = `import * as ${language} from "./${file}";\n`;
    exportDts += `export {${language}}\n`;
    acc.push(exportDts);
    return acc;
  }, [] as string[])
  console.log(indexFile)

  fse.writeFileSync('./src/translations/index.ts', indexFile.join('\n'))
}

buildTranslationsIndex();