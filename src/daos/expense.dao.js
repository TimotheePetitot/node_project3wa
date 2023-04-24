import ExpenseModel from "../models/expense.model.js";

const createExpense = async (
	name,
	description,
	amount,
	purchased_date,
	type,
	author_id
) => {
	try {
		const newExpense = ExpenseModel.create({
			name,
			description,
			amount,
			purchased_date,
			type,
			author_id,
		});

		const savedExpense = (await newExpense).save();

		return savedExpense;
	} catch (error) {
		console.error(
			`Erreur lors de la création de la dépense : ${error.message}`
		);
		return {
			error: `Erreur lors de la création de la dépense : ${error.message}`,
		};
	}
};

const getAllExpenses = async () => {
	try {
		const expenses = await ExpenseModel.findAll();
		return expenses;
	} catch (error) {
		console.error(
			`Erreur lors de la récupération des dépenses : ${error.message}`
		);
		return { error: "Erreur lors de la récupération des dépenses." };
	}
};

const getExpenseById = async (id) => {
	try {
		const expense = await ExpenseModel.findByPk(id);
		return expense;
	} catch (error) {
		console.error(
			`Erreur lors de la récupération de la dépense : ${error.message}`
		);
		return {
			error: `Erreur lors de la récupération de la dépense : ${error.message}`,
		};
	}
};

const updateExpense = async (
	expenseId,
	name,
	description,
	amount,
	purchased_date,
	type
) => {
	try {
		const expense = await ExpenseModel.findByPk(expenseId);
		if (!expense) {
			console.error(
				`Impossible de retrouver la dépense avec l'ID ${expenseId}`
			);
		}

		await expense.update({
			name,
			description,
			amount,
			purchased_date,
			type,
		});

		return expense;
	} catch (error) {
		console.error(
			`Une erreur s'est produite lors de la mise à jour de l'a dépense avec l'ID ${expenseId} : ${error.message}`
		);
	}
};

const deleteExpense = async (id) => {
	try {
		const expense = await ExpenseModel.findByPk(id);
		if (!expense) {
			return { error: `Expense with id ${id} not found` };
		}
		await expense.destroy();
		return { message: `Expense with id ${id} deleted successfully` };
	} catch (error) {
		console.error(
			`Erreur lors de la suppression de la dépense : ${error.message}`
		);
		return {
			error: `Erreur lors de la suppression de la dépense : ${error.message}`,
		};
	}
};

export const ExpenseDAO = {
	createExpense,
	getAllExpenses,
	getExpenseById,
	updateExpense,
	deleteExpense,
};
