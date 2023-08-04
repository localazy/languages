import fse from 'fs-extra'

async function extractLanguagesList() {
  const translationFolder = fse.readdirSync('./src/translations');
  const localizedLanguages: Record<string, string> = {};

  translationFolder.forEach(( file) => {
    if (file === 'index.ts') return;
    const content = fse.readJsonSync(`./src/translations/${file}`);
    const languageName = /(.*)\.json/.exec(file)?.[1];
    const localizedLanguageName = content[languageName];

    if (localizedLanguageName) {
      localizedLanguages[languageName] = localizedLanguageName;
    }
  }, [] as string[])

  fse.writeJsonSync('./src/languages-list.json', localizedLanguages, { encoding: 'utf-8', spaces: 2})
}

extractLanguagesList();