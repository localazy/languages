import fse from 'fs-extra'

function buildTranslationsIndex() {
  const translationFolder = fse.readdirSync('./src/language-lists/translations');
  let indexContent = "";

  translationFolder.forEach((file) => {
    const languageName = /(.*)\.json/.exec(file)?.[1];
    const exportName = `${languageName}_localized_list`;
    indexContent += `import * as ${exportName} from "./translations/${file}";\n`;
    indexContent += `export { ${exportName} };\n\n`;
  })

  fse.writeFileSync('./src/language-lists/translated-language-lists.ts', indexContent, { encoding: 'utf8'})
}

buildTranslationsIndex();