import { DataTypes } from "sequelize";
import initDb from "../config/database.config.js";
import { ERRORS } from "../utils/errors.utils.js";
import User from "./user.model.js";

const db = await initDb();

const SavingsGoal = db.define(
	"savingsGoal",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Le nom est obligatoire",
				},
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "La description est obligatoire",
				},
			},
		},
		total_amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
			validate: {
				isDecimal: {
					args: [true],
					msg: "Le montant total doit être un nombre décimal valide",
				},
				min: {
					args: [0],
					msg: "Le montant total ne peut pas être négatif",
				},
			},
		},
		saving_amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
			validate: {
				isDecimal: {
					args: [true],
					msg: "Le montant épargné doit être un nombre décimal valide",
				},
				min: {
					args: [0],
					msg: "Le montant épargné ne peut pas être négatif",
				},
			},
		},
		amount_by_frequency: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
			validate: {
				isDecimal: {
					args: [true],
					msg: "Le montant par fréquence doit être un nombre décimal valide",
				},
				min: {
					args: [0],
					msg: "Le montant par fréquence ne peut pas être négatif",
				},
			},
		},

		start_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notNull: {
					msg: "La date de début est obligatoire",
				},
				isDate: {
					args: [true],
					msg: "La date de début doit être une date valide au format AAAA-MM-JJ",
				},
			},
		},
		end_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notNull: {
					msg: "La date de fin est obligatoire",
				},
				isDate: {
					args: [true],
					msg: "La date de fin doit être une date valide au format AAAA-MM-JJ",
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
			validate: {
				notNull: {
					msg: "Le statut est obligatoire",
				},
			},
		},
		type: {
			type: DataTypes.ENUM(
				"/GoalType/Alimentation.png",
				"/GoalType/Transport.png",
				"/GoalType/Logement.png",
				"/GoalType/Loisir.png",
				"/GoalType/Travail.png",
				"/GoalType/Sante.png",
				"/GoalType/Autre.png"
			),
			allowNull: false,
			defaultValue: "/GoalType/Autre.png",
			validate: {
				notNull: {
					msg: ERRORS.empty,
				},
			},
		},
		frequency: {
			type: DataTypes.ENUM("hebdomadaire", "mensuel", "annuel"),
			allowNull: false,
			defaultValue: "mensuel",
			validate: {
				notNull: {
					msg: ERRORS.empty,
				},
			},
		},
	},
	{
		timestamps: true,
		createdAt: "created",
		updatedAt: "updated",
	}
);
SavingsGoal.belongsTo(User, { foreignKey: "author_id" });
export default SavingsGoal;
