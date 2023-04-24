import { ExpenseDAO } from "../daos/expense.dao.js";

// Create
const createExpense = async (req, res) => {
	const { name, description, amount, purchased_date, type } = req.body;
	const author_id = req.body.userId;
	try {
		const decodedtype = type.replaceAll("&#x2F;", "/");
		const decodedName = name.replaceAll("&#x27;", "'");
		const decodedDescription = description.replaceAll("&#x27;", "'");
		const expense = await ExpenseDAO.createExpense(
			decodedName,
			decodedDescription,
			amount,
			purchased_date,
			decodedtype,
			author_id
		);

		if (expense.error) {
			return res.status(403).json({ message: expense.error });
		}
		res.status(201).json({
			message: "Dépense créée avec succès.",
			expense,
		});
	} catch (error) {
		console.error(`Erreur lors de la création de la dépense : ${error}`);
		res
			.status(500)
			.json({ message: "Erreur lors de la création de la dépense." });
	}
};
// READ
const getAllExpenses = async (req, res) => {
	try {
		const expenses = await ExpenseDAO.getAllExpenses();
		res.status(200).json({ expenses });
	} catch (error) {
		console.error(`Erreur lors de la récupération des dépenses : ${error}`);
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération des dépenses." });
	}
};

const getExpense = async (req, res) => {
	try {
		const expense = await ExpenseDAO.getExpenseById(req.params.id);
		if (!expense) {
			return res.status(404).json({ message: "La dépense n'existe pas." });
		}
		res.status(200).json(expense);
	} catch (error) {
		console.error(`Erreur lors de la récupération de la dépense : ${error}`);
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération de la dépense." });
	}
};

// UPDATE
const updateExpense = async (req, res) => {
	try {
		const { token } = req.body;
		const expenseId = req.params.id;
		console.log(expenseId);
		const { name, description, amount, purchased_date, type, authorId } =
			req.body;
		if (!expenseId) {
			res.status(400).json({ message: "Identifiant de la dépense invalide." });
			return;
		}
		const decodedtype = type.replaceAll("&#x2F;", "/");
		const decodedName = name.replaceAll("&#x27;", "'");
		const decodedDescription = description.replaceAll("&#x27;", "'");
		console.log(decodedtype);
		const expense = await ExpenseDAO.updateExpense(
			expenseId,
			decodedName,
			decodedDescription,
			amount,
			purchased_date,
			decodedtype,
			authorId
		);

		if (!expense) {
			res.status(404).json({ message: `Impossible de retrouver la dépense` });
			return;
		}

		res.status(200).json({ expense, message: "Dépense modifiée avec succès" });
		console.log(expense);
		return;
	} catch (error) {
		console.error(
			`Erreur lors de la mise à jour des informations de la dépense : ${error}`
		);
		return res.status(500).json({
			message: `Erreur lors de la mise à jour des informations de la dépense : ${error.message}`,
		});
	}
};
// DELETE
const deleteExpense = async (req, res) => {
	try {
		const id = req.params.id;
		const expense = await ExpenseDAO.deleteExpense(id);
		if (!expense) {
			res.status(404).json({ message: `Impossible de retrouver la dépense` });
			return;
		}
		return res.status(200).json({ message: "Dépense supprimée avec succès" });
	} catch (error) {
		console.error(`Erreur lors de la suppression de la dépense: ${error}`);
		return res.status(500).json({
			message: `Erreur lors de la suppression de la dépense : ${error.message}`,
		});
	}
};

export const ExpenseController = {
	createExpense,
	getAllExpenses,
	getExpense,
	updateExpense,
	deleteExpense,
};
