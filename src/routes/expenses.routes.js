import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import { ExpenseController } from "../controllers/expense.controller.js";

const initExpensesRoutes = (app, sm) => {
	const router = Router();
	app.use("/expenses", router);
	router.post(
		"/createExpense",
		jwtMiddleware,
		sm,
		ExpenseController.createExpense
	);
	router.get(
		"/readAllExpenses",
		jwtMiddleware,
		sm,
		ExpenseController.getAllExpenses
	);
	router.get(
		"/readExpense/:id",
		jwtMiddleware,
		sm,
		ExpenseController.getExpense
	);
	router.put(
		"/updateExpense/:id",
		jwtMiddleware,
		sm,
		ExpenseController.updateExpense
	);
	router.delete(
		"/deleteExpense/:id",
		jwtMiddleware,
		sm,
		ExpenseController.deleteExpense
	);
};

export default initExpensesRoutes;
