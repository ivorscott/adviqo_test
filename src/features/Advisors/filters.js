const filterByOnline = (entities) =>
  entities.filter((entity) => {
    return entity.status === "Online";
  });

const filterByLanguage = (entities, language) =>
  entities.filter((entity) => {
    return entity.language === language;
  });

const filterByLanguageAndOnline = (entities, language) =>
  entities.filter((entity) => {
    return entity.language === language && entity.status === "Online";
  });

export { filterByOnline, filterByLanguage, filterByLanguageAndOnline };
