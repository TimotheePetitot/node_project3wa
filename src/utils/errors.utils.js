const getErrors_simple = (errors) => {
  const keys = Object.keys(errors);
  const error = keys.reduce((toBuild, key, index) => {
    const value = errors[key];
    return index === 0 ? value : `${toBuild}, ${value}`;
  }, "");
  return error;
};

export const getErrors = (errors) =>
  Object.keys(errors).reduce(
    (toBuild, key, index) =>
      index === 0
        ? `${errors[key]} for ${key}`
        : `${toBuild}, ${errors[key]} for ${key}`,
    ""
  );

export const ERRORS = {
  required: `Ce champ est requis`,
  empty: `Ce champ ne peut pas etre vide`,
  notValid: `{VALUE} n'est pas valide`,
  betweenCharacters: `{VALUE} doit être compris entre 2 et 50 charatères`,
  betweenCharactersPw: `Le mot de passe doit être compris entre 8 et 255 charatères`,
};
