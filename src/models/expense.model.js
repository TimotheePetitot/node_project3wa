import { DataTypes } from "sequelize";
import initDb from "../config/database.config.js";
import { ERRORS } from "../utils/errors.utils.js";
import User from "./user.model.js";

const db = await initDb();

const Expense = db.define(
	"expense",
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
					msg: "Le nom de la dépense est obligatoire",
				},
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "La description de la dépense est obligatoire",
				},
			},
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			validate: {
				isDecimal: {
					args: [true],
					msg: "Le montant de la dépense doit être un nombre décimal valide",
				},
				min: {
					args: [0],
					msg: "Le montant de la dépense ne peut pas être négatif",
				},
				notNull: {
					msg: "Le montant de la dépense est obligatoire",
				},
			},
		},
		purchased_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					args: [true],
					msg: "La date d'achat ou de début de la dépense doit être une date valide",
				},
				notNull: {
					msg: "La date d'achat ou de début de la dépense est obligatoire",
				},
			},
		},
		type: {
			type: DataTypes.ENUM(
				"/Type/Alimentation.png",
				"/Type/Transport.png",
				"/Type/Logement.png",
				"/Type/Loisir.png",
				"/Type/Travail.png",
				"/Type/Sante.png",
				"/Type/Autre.png"
			),
			allowNull: false,
			defaultValue: "/Type/Autre.png",
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
Expense.belongsTo(User, { foreignKey: "author_id" });

export default Expense;
