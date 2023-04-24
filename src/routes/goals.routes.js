import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import { GoalController } from "../controllers/goal.controller.js";

const initExpensesRoutes = (app, sm) => {
	const router = Router();
	app.use("/goals", router);
	router.post("/createGoal", jwtMiddleware, sm, GoalController.createGoal);
	router.get("/readAllGoals", jwtMiddleware, sm, GoalController.getAllGoals);
	router.get("/readGoal/:id", jwtMiddleware, sm, GoalController.getGoal);
	router.put("/updateGoal/:id", jwtMiddleware, sm, GoalController.updateGoal);
	router.delete(
		"/deleteGoal/:id",
		jwtMiddleware,
		sm,
		GoalController.deleteGoal
	);
};

export default initExpensesRoutes;
