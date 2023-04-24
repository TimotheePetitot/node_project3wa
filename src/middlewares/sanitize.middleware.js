import escape from "validator/lib/escape.js";
import { isString } from "../utils/string.utils.js";

// La fonction sanitize est utilisée par la fonction middleware sanitizeMiddleware. Elle nettoie les propriétés de l'objet qui lui est passé en argument en utilisant la fonction isString pour détecter les chaînes de caractères et la fonction escape pour échapper ces chaînes. La fonction reduce est utilisée pour construire un nouvel objet nettoyé à partir de l'objet initial.
const sanitize = (obj) => {
  const keys = Object.keys(obj);
  const sanitized = keys.reduce((toBuild, key) => {
    const value = obj[key];
    const escaped = isString(value) ? escape(value) : value;
    return { ...toBuild, [key]: escaped };
  }, {});
  return { ...sanitized };
};

// La fonction middleware sanitizeMiddleware utilise la fonction sanitize pour nettoyer à la fois les propriétés de req.body et req.params. Ensuite, elle affiche dans la console les informations de la requête et le corps nettoyé. Enfin, elle appelle la fonction next pour passer à la prochaine fonction middleware.
export const sanitizeMiddleware = (req, res, next) => {
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);
  console.log("-------------------------------------------------");
  console.log(`url requested =`, req.originalUrl);
  console.log(`sanitized body =`, req.body);
  next();
};
