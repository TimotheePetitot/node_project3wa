import User from "../models/user.model.js";
import Goal from "../models/goal.model.js";

const createUser = async (
	lastname,
	firstname,
	pseudo,
	email,
	password,
	salary,
	user_saving,
	user_img,
	role,
	author_id
) => {
	let result = null;
	let error = `user not find `;
	try {
		const createdUser = await User.create({
			lastname,
			firstname,
			pseudo,
			email,
			password,
			salary,
			user_saving,
			user_img,
			role: email === "timothee.petitot@gmail.com" ? 1 : role,
			author_id,
		});

		return {
			message: `User ${pseudo} ajouté avec succès`,
			user: createdUser,
		};
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la création de l'utilisateur : ${error.message}`
		);
	}
	return { result, error };
};

const readAllUsers = async () => {
	try {
		const users = await User.findAll({
			include: [{ model: Goal }],
		});
		return users;
	} catch (error) {
		return {
			error: `Erreur lors de la récupération des utilisateurs : ${error.message}`,
		};
	}
};

const readById = async (userId) => {
	try {
		const user = await User.findByPk(userId, {
			include: [{ model: Goal }],
		});
		return user ? user : null;
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la lecture de l'utilisateur avec l'ID ${userId}: ${error.message}`
		);
	}
};

const readUserByEmail = async (email) => {
	try {
		const user = await User.findOne({ where: { email } });
		return user;
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la lecture de l'utilisateur avec l'email ${email}: ${error.message}`
		);
	}
};

const readUserByPseudo = async (pseudo) => {
	try {
		const user = await User.findOne({ where: { pseudo } });
		return user;
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la lecture de l'utilisateur avec le pseudo ${pseudo}: ${error.message}`
		);
	}
};

const updateUser = async (
	id,
	lastname,
	firstname,
	pseudo,
	email,
	salary,
	user_saving,
	user_img
) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			console.error(`Impossible de retrouver l'utilisateur avec l'ID ${id}`);
		}
		await user.update({
			lastname,
			firstname,
			pseudo,
			email,
			salary,
			user_saving,
			user_img,
		});

		return user;
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la mise à jour de l'utilisateur avec l'ID ${id}: ${error.message}`
		);
	}
};

// delete User
const deleteUser = async (id) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return { error: `User with id ${id} not found` };
		}
		await user.destroy();
		return { message: `User with id ${id} deleted successfully` };
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la suppression de l'utilisateur avec l'ID ${id}: ${error.message}`
		);
	}
};

export const UserDAO = {
	createUser,
	readAllUsers,
	readById,
	readUserByEmail,
	readUserByPseudo,
	updateUser,
	deleteUser,
};
