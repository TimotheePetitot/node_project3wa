import cors from "cors";
import helmet from "helmet";
import express from "express";
const initMiddlewares = (app) => {
	// CORS
	const corsOrigin = "*";

	const corsOptions = {
		origin: corsOrigin,
	};

	app.use(cors(corsOptions));
	app.use(helmet());
	app.use(express.json({ limit: "50mb" }));
	app.use(express.urlencoded({ extended: true }));
};

export default initMiddlewares;
