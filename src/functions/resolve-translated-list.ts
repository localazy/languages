export const resolveTranslatedList = async (locale: string) => {
  switch (locale) {
    case 'cs':
      return (await import('../data/translations/cs.json')).default;
    case 'de':
      return (await import('../data/translations/de.json')).default;
    case 'en':
      return (await import('../data/translations/en.json')).default;
    case 'es':
      return (await import('../data/translations/es.json')).default;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
};
