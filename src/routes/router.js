import initUsersRoutes from "./users.routes.js";
import initExpensesRoutes from "./expenses.routes.js";
import initGoalsRoutes from "./goals.routes.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.middleware.js";

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizeMiddleware);
  initExpensesRoutes(app, sanitizeMiddleware);
  initGoalsRoutes(app, sanitizeMiddleware);
};

export default initRoutes;
