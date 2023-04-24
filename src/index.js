import express from "express";
import goalUser from "./models/goalUser.model.js"; //a laisser pour faire apparaitre la table relationnelle
import initDb from "./config/database.config.js";
import initMiddlewares from "./middlewares/init.js";
import initRoutes from "./routes/router.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
	res.send("ok");
});

await initDb();
initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
	console.log(`serveur en cours d'éxécution dans le port ${PORT}`);
});
