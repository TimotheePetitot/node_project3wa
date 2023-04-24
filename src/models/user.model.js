import { DataTypes } from "sequelize";
import { ERRORS } from "../utils/errors.utils.js";
import { USER_ROLE } from "../constants/user.constants.js";
import initDb from "../config/database.config.js";

const db = await initDb();

const User = db.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 50], // La longueur doit être comprise entre 2 et 50 caractères
				notNull: {
					msg: ERRORS.empty, // Message d'erreur personnalisé
				},
			},
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 50],
				notNull: {
					msg: ERRORS.empty,
				},
			},
		},
		pseudo: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [2, 50],
				notNull: {
					msg: ERRORS.empty,
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: ERRORS.notValid, // Message d'erreur personnalisé pour une adresse email non valide
				},
				notNull: {
					msg: ERRORS.empty,
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [8, 255],
					msg: "Le mot de passe doit avoir entre 8 et 255 caractères",
				},
				notNull: {
					msg: "Le mot de passe est obligatoire",
				},
			},
		},
		salary: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
			validate: {
				isDecimal: {
					args: [true],
					msg: "Le salaire doit être un nombre décimal valide strictment supérieur à 0",
				},
				min: {
					args: [0],
					msg: "Le salaire ne peut pas être négatif",
				},
			},
		},
		user_saving: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
			validate: {
				isDecimal: {
					args: [true],
					msg: "L'épargne doit être un nombre décimal valide strictment supérieur à 0",
				},
				min: {
					args: [0],
					msg: "L'épargne ne peut pas être négative",
				},
			},
		},
		user_img: {
			type: DataTypes.ENUM(
				"/Avatar/avatar1.png",
				"/Avatar/avatar2.png",
				"/Avatar/avatar3.png",
				"/Avatar/avatar4.png",
				"/Avatar/avatar5.png"
			),
			allowNull: false,
			defaultValue: "/Avatar/avatar1.png",
			validate: {
				notNull: {
					msg: ERRORS.empty,
				},
			},
		},
		role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: USER_ROLE.member,
			message: ERRORS.notValid,
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

export default User;
