import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import { UserController } from "../controllers/user.controller.js";

const initUsersRoutes = (app, sm) => {
	const router = Router();
	app.use("/users", router);

	router.get("/readAllUsers", jwtMiddleware, sm, UserController.getAllUsers);
	router.get("/readUser/:id", jwtMiddleware, sm, UserController.getUserInfos);
	router.post("/sign-up", sm, UserController.signUp);
	router.post("/sign-in", sm, UserController.signIn);
	router.post("/check-token", jwtMiddleware, sm, UserController.checkToken);
	router.put("/update/:id", jwtMiddleware, sm, UserController.updateUser);
	router.delete("/delete/:id", jwtMiddleware, sm, UserController.deleteUser);
};

export default initUsersRoutes;
