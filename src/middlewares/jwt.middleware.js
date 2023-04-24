import { jwtVerify } from "../utils/jwt.utils.js";

export const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const userId = jwtVerify(token);
  if (!userId) return res.status(403).json({ message: "accés non autorisé" });
  req.body = { ...req.body, userId };
  res.status(200);
  console.log("accés ok");
  next();
};
