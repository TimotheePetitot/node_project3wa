import { GoalDAO } from "../daos/goal.dao.js";

// Create
const createGoal = async (req, res) => {
	try {
		const {
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
			userIds,
		} = req.body;
		const decodedtype = type.replaceAll("&#x2F;", "/");
		const decodedName = name.replaceAll("&#x27;", "'");
		const decodedDescription = description.replaceAll("&#x27;", "'");
		const author_id = req.body.userId;
		const goal = await GoalDAO.createGoal(
			decodedName,
			decodedDescription,
			total_amount,
			saving_amount,
			active,
			start_date,
			end_date,
			amount_by_frequency,
			decodedtype,
			frequency,
			author_id,
			userIds
		);

		if (goal.error) {
			return res.status(403).json({ message: goal.error });
		}

		res.status(201).json({
			message: "Objectif créé avec succès.",
			goal,
		});
	} catch (error) {
		console.error(`Erreur lors de la création de l'objectif : ${error}`);
		res
			.status(500)
			.json({ message: "Erreur lors de la création de l'objectif." });
	}
};

// READ
const getAllGoals = async (req, res) => {
	try {
		const goals = await GoalDAO.getAllGoals();
		res.status(200).json({ goals });
	} catch (error) {
		console.error(`Erreur lors de la récupération des objectifs : ${error}`);
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération des objectifs." });
	}
};

const getGoal = async (req, res) => {
	try {
		const goal = await GoalDAO.getGoalById(req.params.id);
		if (!goal) {
			return res.status(404).json({ message: "L'objectif n'existe pas." });
		}
		res.status(200).json(goal);
	} catch (error) {
		console.error(`Erreur lors de la récupération de l'objectif : ${error}`);
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération de l'objectif." });
	}
};

// UPDATE
const updateGoal = async (req, res) => {
	try {
		const id = req.params.id;
		const {
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
		} = req.body;
		const decodedtype = type.replaceAll("&#x2F;", "/");
		const decodedName = name.replaceAll("&#x27;", "'");
		const decodedDescription = description.replaceAll("&#x27;", "'");
		if (!id) {
			return res
				.status(400)
				.json({ message: "Identifiant de l'objectif invalide." });
		}

		const goal = await GoalDAO.updateGoal(
			id,
			decodedName,
			decodedDescription,
			total_amount,
			saving_amount,
			active,
			start_date,
			end_date,
			amount_by_frequency,
			decodedtype,
			frequency
		);

		if (!goal) {
			res.status(404).json({ message: `Impossible de retrouver l'objectif` });
			return;
		}

		return res.status(200).json({ message: "Objectif modifié avec succès" });
	} catch (error) {
		console.error(
			`Erreur lors de la mise à jour des informations de l'objectif : ${error}`
		);
		return res.status(500).json({
			message: `Erreur lors de la mise à jour des informations de l'objectif : ${error.message}`,
		});
	}
};

//DELETE
const deleteGoal = async (req, res) => {
	try {
		const id = req.params.id;
		const goal = await GoalDAO.deleteGoal(id);
		if (!goal) {
			res.status(404).json({ message: `Impossible de retrouver l'objectif'` });
			return;
		}
		return res.status(200).json({ message: "Objectif supprimé avec succès" });
	} catch (error) {
		console.error(`Erreur lors de la suppression de l'objectif': ${error}`);
		return res.status(500).json({
			message: `Erreur lors de la suppression de l'objectif' : ${error.message}`,
		});
	}
};

export const GoalController = {
	createGoal,
	getAllGoals,
	getGoal,
	updateGoal,
	deleteGoal,
};
