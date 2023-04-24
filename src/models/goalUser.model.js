import { DataTypes } from "sequelize";
import initDb from "../config/database.config.js";
import User from "./user.model.js";
import SavingsGoal from "./goal.model.js";
const db = await initDb();

const goalUser = db.define("goalUser", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});
User.belongsToMany(SavingsGoal, {
	through: "goalUser",
	foreignKey: "user_id",
});

SavingsGoal.belongsToMany(User, {
	through: "goalUser",
	foreignKey: "goal_id",
});

export default goalUser;
