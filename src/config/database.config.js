import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
	"thimotheepetitot_project3wa_cost",
	"root",
	"",
	{
		host: "localhost",
		dialect: "mariadb",
		logging: false,
	}
);

const initDb = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log("La connexion a la bdd a réussi");
	} catch (error) {
		console.error(error);
	}
	return sequelize;
};

export default initDb;
