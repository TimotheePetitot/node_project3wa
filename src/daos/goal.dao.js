import Goal from "../models/goal.model.js";
import User from "../models/user.model.js";

// Create
const createGoal = async (
	name,
	description,
	total_amount,
	saving_amount,
	active,
	start_date,
	end_date,
	amount_by_frequency,
	type,
	frequency,
	author_id,
	userIds
) => {
	try {
		const newGoal = new Goal({
			name,
			description,
			total_amount,
			saving_amount,
			active,
			start_date,
			end_date,
			amount_by_frequency,
			type,
			frequency,
			author_id,
		});

		const savedGoal = await newGoal.save();
		await savedGoal.addUsers(userIds);
		return savedGoal;
	} catch (error) {
		return {
			error: `Erreur lors de la création de l'objectif : ${error.message}`,
		};
	}
};

// READ
const getAllGoals = async () => {
	try {
		const goals = await Goal.findAll({
			include: {
				model: User,
				as: "Users",
				attributes: ["id", "pseudo", "user_img"],
				through: { attributes: [] }, // pour exclure les attributs de la table de relations
			},
		});
		return goals;
	} catch (error) {
		return {
			error: `Erreur lors de la récupération des objectifs : ${error.message}`,
		};
	}
};

const getGoalById = async (id) => {
	try {
		const goal = await Goal.findByPk(id, {
			include: {
				model: User,
				as: "Users",
				attributes: ["id", "pseudo", "user_img"],
				through: { attributes: [] }, // pour exclure les attributs de la table de relations
			},
		});
		return goal;
	} catch (error) {
		return {
			error: `Erreur lors de la récupération de l'objectif: ${error.message}`,
		};
	}
};

// UPDATE
const updateGoal = async (
	id,
	name,
	description,
	total_amount,
	saving_amount,
	active,
	start_date,
	end_date,
	amount_by_frequency,
	type,
	frequency
) => {
	try {
		const goal = await Goal.findByPk(id);
		if (!goal) {
			console.error(`Impossible de retrouver l'objectif avec l'ID ${id}`);
		}

		await goal.update({
			name,
			description,
			total_amount,
			saving_amount,
			active,
			start_date,
			end_date,
			amount_by_frequency,
			type,
			frequency,
		});

		return goal;
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la mise à jour de l'a dépense avec l'ID ${id}: ${error.message}`
		);
	}
};

// DELETE
const deleteGoal = async (id) => {
	try {
		const goal = await Goal.findByPk(id);
		if (!goal) {
			return { error: `Goal with id ${id} not found` };
		}
		await goal.destroy();
		return { message: `Goal with id ${id} deleted successfully` };
	} catch (error) {
		return {
			error: `Erreur lors de la suppression de l'objectif: ${error.message}`,
		};
	}
};

export const GoalDAO = {
	createGoal,
	getAllGoals,
	getGoalById,
	updateGoal,
	deleteGoal,
};
